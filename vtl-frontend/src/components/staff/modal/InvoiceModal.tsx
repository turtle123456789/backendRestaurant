/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import Image from "next/legacy/image";
import { fetchAllDishes, fetchOrderDetail, formatCurrencyVND } from "@/utils";
import useCustomer from "@/controllers/useCustomer";
import Link from "next/link";
import useStaff from "@/controllers/useStaff";
import useNotify from "@/hooks/useNotify";
interface InvoiceData {
  orderId: number;
  open: boolean;
  handleClose: () => void;
}


type Invoice = {
  id: number;
  received: number;
  type: string;
  status: string;
}

type Dish = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: number;
  isSelect: boolean;
};

type OrderItem = {
  id: number;
  dishId: number;
  dishName: string;
  total: number;
  quantity: number;
};

type Table = {
  name: string;
};

type ResInfo = {
  id: string;
  resName: string;
  resImage: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  province: string;
  address: string;
};

type Order = {
  order: {
    id: number;
    resDate: string;
    resTime: string;
    people: number;
    resStatus: string;
    depositAmount: number;
    restaurantId: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
  };
  orderItems: OrderItem[];
  tables: Table[];
};



const InvoiceModal = ({
  orderId,
  open,
  handleClose,
}: InvoiceData) => {
  const invoiceData = {
    company: {
      name: "LEE HOTPOT",
      address: "Vincom Pham Ngoc Thach",
      phone: "0123456789",
      email: "leehotpot@gmail.com",
    },
    customer: {
      name: "Vu Thuy Linh",
      phone: "01234568976",
      email: "linh1000@gmail.com",
    },
    invoice: {
      number: "2000231",
      date: "23/06/2024",
    },
    items: [
      { description: "Beef", quantity: 1, unitPrice: 200000, amount: 200000 },
      { description: "Beef", quantity: 1, unitPrice: 200000, amount: 200000 },
      { description: "Beef", quantity: 1, unitPrice: 200000, amount: 200000 },
    ],
    summary: {
      subtotal: 600000,
      tax: 10,
      deposit: 100000,
      total: 470000,
      paid: 500000,
      balanceDue: 30000,
    },
  };

  // const [total, setTotal] = useState(
  //   (invoiceData.summary.subtotal - invoiceData.summary.deposit) * 1.1
  // );

  const [total, setTotal] = useState<number | undefined>(undefined);
  const [balanceDue, setBalanceDue] = useState<number | undefined>(undefined);

  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(0);
  //const [balanceDue, setBalanceDue] = useState(-total);
  const [openDialog, setOpenDialog] = useState(false);
  const [paidInput, setPaidInput] = useState("");
  const [quantity, setQuantity] = useState<number[]>([]);
  const [orderDetail, setOrderDetail] = useState<Order | null>();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isChecked, setIsChecked] = useState<boolean[]>([]);
  const [restaurant, setRestaurant] = useState<ResInfo>({
    id: "",
    resName: "",
    resImage: "",
    coordinates: {
      lat: "",
      lng: "",
    },
    province: "",
    address: "",
  });
  const [received, setReceived] = useState<number | undefined>(undefined);
  const [change, setChange] = useState<number | undefined>(undefined);
  const [type, setType] = useState<string>("");
  const { createInvoice, freeTable} = useStaff();
  const {
    getDetailRestaurantById,
  } = useCustomer();
  const { successNotify, errorNotify } = useNotify();

  

  useEffect(() => {
    setType("a");

    if (orderDetail?.order?.totalAmount !== undefined && orderDetail?.order?.depositAmount !== undefined) {
      setTotal((orderDetail.order.totalAmount - orderDetail.order.depositAmount) + 1000);
    }
  }, [orderDetail]); // Thêm phụ thuộc nếu cần
  

  useEffect(() => {
    setLoading(true);
    if (orderId == 0) {
      return;
    }
    // Make the request to get the order detail
    const fetchOrder = async () => {
      let tmp = await fetchOrderDetail(orderId);
      setOrderDetail(tmp);
      setLoading(false);
    };
    const fetchDishes = async () => {
      let tmp = await fetchAllDishes();
      if (tmp) {
        setDishes(tmp);
      }
    };
    fetchDishes().then(() => {
      setIsChecked(
        dishes.map((dish) => {
          return orderDetail?.orderItems.find((item) => {
            return item.dishId === dish.id;
          })
            ? true
            : false;
        })
      );
      setQuantity(
        dishes.map((dish) => {
          const item = orderDetail?.orderItems.find((item) => {
            return item.dishId === dish.id;
          });
          return item ? item.quantity : 1;
        })
      );
    });
    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      const response = await getDetailRestaurantById({ id: orderDetail?.order.restaurantId });
      if (response.status !== 200) {
        // Handle error
        return;
      }
      const restaurant = {
        id: response.data.id,
        resName: response.data.name,
        resImage: response.data.image,
        coordinates: {
          lat: response.data.latitude,
          lng: response.data.longitude,
        },
        province: response.data.provinceId,
        address: response.data.address,
      };
      setRestaurant(restaurant);
    };
    fetchRestaurantDetails();
  }, [orderDetail?.order.restaurantId]);

// useEffect(()=>{
//   setType("a"),
//   setChange(  (orderDetail?.order.totalAmount - orderDetail?.order.depositAmount) * 1.1),
//   setReceived(100000)
// })

const today = () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('vi-VN', options); // Hoặc mã ngôn ngữ và định dạng khác
};


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePaidChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPaidInput(event.target.value);
  };

  const handleSubmitPaid = () => {
    const paidAmount = parseFloat(paidInput);
    if (!isNaN(paidAmount) && typeof total !== 'undefined') {
      setPaid(paidAmount);
      setReceived(paidAmount);
      setBalanceDue( paidAmount - total);
      setChange( paidAmount - total);
    }
    handleCloseDialog();
  };
  // useEffect(() => {
  //   setBalanceDue( paid - total);
  //   setChange(paid - total)
  // }, [paid]);

  // useEffect(() => {
  //   // Kiểm tra nếu total không phải là undefined thì thực hiện tính toán
  //   if (typeof total !== 'undefined') {
  //     setBalanceDue(paid - total);
  //     setChange(paid - total);
  //   }
  // }, [paid, total]);


  const handleSubmit = async () => {
    const data = {
       orderId: orderId,
       received: received,
       //type: type,
      change: change,
      //orderId: "6",
      //received: 1000,
      type: "checkout",
      //change: 100,
    };
    let response = await createInvoice(data);
    console.log("🚀 ~ handleSubmit ~ response:", response)
    console.log("DATA", data)
    if (response.status !== 201) {
      errorNotify(response.message);
      return;
    }
    successNotify("Create invoice successfully");
    let res = await freeTable({orderId: orderId})
    if(res.status === 200){
      handleClose()
    }
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Enter Paid Amount</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the amount that has been paid.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="paid"
            label="Paid Amount"
            type="number"
            fullWidth
            variant="standard"
            value={paidInput}
            onChange={handlePaidChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitPaid}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="invoice-modal-title"
        aria-describedby="invoice-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            width: {
              xs: "90%",
              sm: "80%",
              md: "60%",
            },
            height: "80%",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "120px",
                height: "120px",
                position: "relative",
              }}
            >
              <Image
                src="/images/logos/logo.png"
                alt="Lee Hotpot"
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: 100 }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                height: "100px",
                pl: 2,
              }}
            >
              <Typography variant="h5">{restaurant?.resName}</Typography>
              <Typography pt={1}>{restaurant?.address}</Typography>
              <Typography pt={1}>{invoiceData.company.phone}</Typography>
              <Typography pt={1}>{invoiceData.company.email}</Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h2">Invoice</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "start",
                alignItems: "start",
              }}
            >
              <Typography>Bill to:</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  pl: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                  }}
                >
                  <Typography>{orderDetail?.order.fullName}</Typography>
                  <Typography>{orderDetail?.order.phoneNumber}</Typography>
                  <Typography>{orderDetail?.order.email}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >
                <Typography>
                  Invoice No: {invoiceData.invoice.number}
                </Typography>
                <Typography>Date: {today()}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                mt: 2,
              }}
            >
              <TableContainer>
                <Table
                  sx={{ minWidth: 650, border: "1px solid #e0e0e0" }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        Description
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        Quantity
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        Unit Price
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderDetail?.orderItems.map((row) => (
                      <TableRow key={row.dishName}>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          sx={{ border: "1px solid #e0e0e0" }}
                        >
                          {row.dishName}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ border: "1px solid #e0e0e0" }}
                        >
                          {row.quantity}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ border: "1px solid #e0e0e0" }}
                        >
                          {formatCurrencyVND(row.total/row.quantity)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ border: "1px solid #e0e0e0" }}
                        >
                          {formatCurrencyVND(row.total)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
                mt: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                  width: "50%",
                }}
              >
                <Box display={"flex"} flexDirection={"row"} width={"100%"} p={1}>
                  <Typography>Subtotal:</Typography>
                  <Box flexGrow={1} />

                  <Typography>
                    {formatCurrencyVND(orderDetail?.order.totalAmount)}
                  </Typography>
              
                </Box>
                <hr
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#000",
                    border: "none",
                  }}
                />
                <Box display={"flex"} flexDirection={"row"} width={"100%"} p={1}>
                  <Typography>Tax:</Typography>
                  <Box flexGrow={1} />

                  <Typography>{invoiceData.summary.tax} %</Typography>
                </Box>
                <hr
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#000",
                    border: "none",
                  }}
                />
                <Box display={"flex"} flexDirection={"row"} width={"100%"} p={1}>
                  <Typography>Deposit:</Typography>
                  <Box flexGrow={1} />

                  <Typography>
                    {formatCurrencyVND(orderDetail?.order.depositAmount)}
                  </Typography>
                </Box>
                <hr
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#000",
                    border: "none",
                  }}
                />
                <Box display={"flex"} flexDirection={"row"} width={"100%"}  p={1}>
                  <Typography>Total:</Typography>
                  <Box flexGrow={1} />

                  <Typography>
                    {formatCurrencyVND(total)}
                  </Typography>
                  {/* <Typography>
                    {formatCurrencyVND((1000))}
                  </Typography> */}
                </Box>
                <hr
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#000",
                    border: "none",
                  }}
                />
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  width={"100%"}
                  component={Button}
                  onClick={handleOpenDialog}
                  variant="text"
                  sx={{
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    sx={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    Paid:
                  </Typography>
                  <Box flexGrow={1} />

                  <Typography
                    sx={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    {formatCurrencyVND(paid)}
                  </Typography>
                </Box>
                <hr
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#000",
                    border: "none",
                  }}
                />
                <Box display={"flex"} flexDirection={"row"} width={"100%"} p={1}>
                  <Typography>Balance Due:</Typography>
                  <Box flexGrow={1} />

                  <Typography>{formatCurrencyVND(balanceDue)}</Typography>
                </Box>
                
              </Box>
              
            </Box>

            <Box
              component={Button}
              onClick={(handleSubmit)}
              sx={{
                backgroundColor: "#E6AC0D",
                padding: "8px",
                borderRadius: "5px",
                marginTop: "10px",
                ":hover": {
                  backgroundColor: "#AE0001",
                },
                textDecoration: "none",
                color: "#fff",
              }}
            >
              <Typography>Create invoice</Typography>
            </Box>
            
          </Box>
        </Box>
        
      </Modal>
    </>
  );
};

export default InvoiceModal;
