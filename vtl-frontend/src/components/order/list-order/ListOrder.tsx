/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSelector } from "@/redux/hooks";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useCustomer from "@/controllers/useCustomer";
import useNotify from "@/hooks/useNotify";
import { Box, Tab, Tabs, Badge, Typography } from "@mui/material";
import { socket } from "@/socket";
import SubList from "./sub-list/SubList";
import LoadingModal from "@/common/loading/LoadingModal";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  style: React.CSSProperties;
}

function CustomTabPanel({
  children,
  value,
  index,
  style,
  ...other
}: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={style}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            width: "100%",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// const columns: GridColDef[] = [
//   {
//     field: "id",
//     headerName: "ID",
//     width: 90,
//     renderCell: (params: GridRenderCellParams) => (
//       <Link
//         href={{
//           pathname: "/order/detail-order",
//           query: { orderId: params.value },
//         }}
//         style={{ textDecoration: "none", color: "inherit" }}
//       >
//         {params.value}
//       </Link>
//     ),
//   },
//   { field: "resDate", headerName: "Reservation Date", width: 150 },
//   { field: "resTime", headerName: "Reservation Time", width: 150 },
//   { field: "people", headerName: "People", width: 100 },
//   {
//     field: "resStatus",
//     headerName: "Reservation Status",
//     width: 150,
//     renderCell: (params: GridRenderCellParams) => (
//       <Chip
//         label={params.value}
//         color={
//           params.value === "pending"
//             ? "primary"
//             : params.value === "confirmed"
//             ? "secondary"
//             : params.value === "seated"
//             ? "info"
//             : params.value === "done"
//             ? "success"
//             : "default"
//         }
//       />
//     ),
//   },
//   { field: "depositAmount", headerName: "Deposit Amount", width: 150 },
//   { field: "restaurantId", headerName: "Restaurant ID", width: 130 },
// ];

type Order = {
  id: string;
  resDate: string;
  resTime: string;
  people: number;
  resStatus: string;
  depositAmount: number;
  restaurantId: string;
  createdAt: string;
};

const ListOrder = () => {
  const { id } = useAppSelector((state) => state.profile);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { errorNotify } = useNotify();
  const { getOrdersByCustomerId } = useCustomer();
  const fetchData = async () => {
    const response = await getOrdersByCustomerId({
      id: id,
    });
    console.log("🚀 ~ fetchData ~ response:", response);
    if (response.status !== 200) {
      errorNotify(response.data.message);
      return;
    }
    let tmp: Order[] = [];
    response.data.forEach((element: any) => {
      tmp.push({
        id: element.id,
        resDate: element.resDate,
        resTime: element.resTime,
        people: element.people,
        resStatus: element.resStatus,
        depositAmount: element.depositAmount,
        restaurantId: element.restaurantId,
        createdAt: element.createdAt,
      });
    });
    tmp.sort((a, b) => {
      if (a.createdAt > b.createdAt) return -1;
      if (a.createdAt < b.createdAt) return 1;
      return 0;
    });
    setOrders(tmp);
  };
  useEffect(() => {
    setLoading(true);
    fetchData().then(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    setLoading(true);
    socket.on("update-order", (data) => {
      if (data === "success") fetchData().then(() => setLoading(false));
    });
    socket.on("payment-res", (data) => {
      if (data.message === "success") fetchData().then(() => setLoading(false));
    });
    return () => {
      socket.off("update-order");
      socket.off("payment-res");
    };
  }, [socket]);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const tabs = [
    {
      label: "Pending",
    },
    {
      label: "Confirmed",
    },
    {
      label: "Done",
    },
    {
      label: "Cancelled",
    },
    {
      label: "All",
    },
  ];
  return (
    <>
      <LoadingModal open={loading} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            width: "60%",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="order-history"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "red", // Directly set the indicator color to red
              },
            }}
            
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                {...a11yProps(index)}
                label={
                  <Badge
                    badgeContent={
                      orders.filter((order) => {
                        if (
                          tab.label === "Pending" ||
                          tab.label === "Confirmed"
                        )
                          return order.resStatus === tab.label.toLowerCase();
                      }).length
                    }
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: value === index ? "red" : "grey", // Custom color
                        color: "#ffffff", // Text color inside the badge
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                        color: index === value ? "black" : "grey",
                      }}
                    >
                      {tab.label}
                    </Typography>
                  </Badge>
                }
              />
            ))}
          </Tabs>
        </Box>
        <Box
          sx={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          {tabs.map((tab, index) => (
            <CustomTabPanel
              key={index}
              value={value}
              index={index}
              style={{
                width: "100%",
              }}
            >
              <SubList
                orders={orders.filter((order) => {
                  if (tab.label === "All") return order.resStatus !== "seated";
                  if (tab.label === "Cancelled")
                    return order.resStatus === "cancel";
                  return order.resStatus === tab.label.toLowerCase();
                })}
              />
            </CustomTabPanel>
          ))}
        </Box>
      </Box>
    </>
  );
};
// <Paper
//   sx={{
//     width: "100%",
//     overflow: "hidden",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//   }}
// >
//   <Box sx={{ maxHeight: 512, minHeight: 256 }}>
//     {orders.length > 0 ? (
//       <DataGrid
//         rows={orders}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         //   rowsPerPageOptions={[10]}
//         //   checkboxSelection
//         disableRowSelectionOnClick={true}
//       />
//     ) : (
//       <h1>No orders</h1>
//     )}
//   </Box>
// </Paper>

export default ListOrder;
