/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useRouter } from "next/router";
import useCustomer from "@/controllers/useCustomer";
import { useEffect, useState } from "react";
import useNotify from "@/hooks/useNotify";
import useStaff from "@/controllers/useStaff";

import { socket } from "@/socket";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/legacy/image";

type Dish = {
  dishId: number;
  dishName: string;
  quantity: number;
  price: number;
  total: number;
  image: string;
  isSelected: boolean;
};
type Table = {
  id: string;
  name: string;
};
type OrderDetail = {
  id: number;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  people: number;
  deposit: number;
  totalPrice: number;
  paymentStatus: string;
  dishes: Array<{
    dishId: number;
    dishName: string;
    quantity: number;
    total: number;
    image: string;
    isSelected: boolean;
  }>;
  tables: Table[];
};

const DetailOrderComponent = () => {
  const router = useRouter();
  const orderId = router.query.orderId;
  console.log("🚀 ~ DetailOrderComponent ~ orderId:", orderId);
  const [loading, setLoading] = useState(false);
  const { getOrderDetail, payDeposit } = useCustomer();
  const [numPerson, setNumPerson] = useState(2);
  const [chooseTable, setChooseTable] = useState(false);
  const [chooseDish, setChooseDish] = useState(false);
  const { errorNotify } = useNotify();
  const [orderDetail, setOrderDetail] = useState<OrderDetail>({
    id: 0,
    customerName: "",
    customerPhone: "",
    date: "",
    time: "",
    deposit: 0,
    totalPrice: 0,
    paymentStatus: "",
    people: 0,
    dishes: [],
    tables: [],
  });
  const [dishes, setDishes] = useState<Dish[]>([]);
  const LoadingModal = () => (
    <Modal open={loading}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    </Modal>
  );
  const fetchOrderDetail = async () => {
    setLoading(true);
    const response = await getOrderDetail({
      orderId: parseInt(orderId as string),
    });
    let tmp;
    if (response.status !== 200) {
      errorNotify(response.data.message);
      return;
    }
    const res = response.data[0];
    const { order, orderItems, tables } = res;
    console.log("🚀 ~ fetchOrderDetail ~ order:", order);
    let total = 0;
    orderItems.forEach((dish: any) => {
      total += dish.price;
    });
    let dishes = orderItems.map((dish: any) => {
      return {
        dishId: dish.dishId,
        dishName: dish.dishName,
        quantity: dish.quantity,
        total: dish.price,
        image: dish.image ?? "https://example.com",
        isSelected: true,
      };
    });
    let tb = tables.map((table: any) => {
      return {
        id: table.id,
        name: table.name,
      };
    });
    tmp = {
      id: order.id,
      customerName: order.fullName,
      customerPhone: order.phoneNumber,
      date: order.resDate,
      time: order.resTime,
      people: order.people,
      deposit: order.depositAmount,
      paymentStatus: order.paymentStatus,
      totalPrice: total,
      dishes: dishes,
      tables: tb,
    };
    setOrderDetail(tmp);
    setLoading(false);
  };
  const { getAllDishes, getAvailableTable } = useStaff();
  const [quantity, setQuantity] = useState<number[]>([]);
  const [isChecked, setIsChecked] = useState<boolean[]>([]);
  const [tableId, setTableId] = useState<string[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const handleChangeTableId = (id: string) => {
    setTableId((prevTableId) => {
      if (prevTableId.includes(id)) {
        // If the id exists, remove it
        return prevTableId.filter((tableId) => tableId !== id);
      } else {
        // If the id does not exist, add it
        return [...prevTableId, id];
      }
    });
  };
  useEffect(() => {
    const fetchDishes = async () => {
      const response = await getAllDishes();
      console.log("🚀 ~ fetchDishes ~ response:", response);
      if (response.status !== 200) {
        // Handle error
        return;
      }
      let tmp: Dish[] = [];
      response.data.map((dish: any) =>
        tmp.push({
          dishId: dish.dishId,
          dishName: dish.dishName,
          price: dish.price,
          quantity: 1,
          total: dish.price,
          image: dish.image ?? "https://example.com",
          isSelected: true,
        })
      );
      orderDetail.dishes.forEach((dish) => {
        tmp.map((d) => {
          if (d.dishId == dish.dishId) {
            d.quantity = dish.quantity;
            d.total = dish.total;
            d.isSelected = true;
          }
        });
      });
      setDishes(tmp);
      setQuantity(tmp.map(() => 1));
      setIsChecked(tmp.map((e) => e.isSelected));
    };
    fetchOrderDetail();
    fetchDishes();
  }, [orderId]);
  const { restaurantId } = useAppSelector((state) => state.profile);

  useEffect(() => {
    const fetchAvailableTables = async () => {
      let body = {
        people: numPerson,
        restaurantId: restaurantId,
      };
      const response = await getAvailableTable(body);
      if (response.status !== 200) {
        // Handle error
        return;
      }
      let tmp: Table[] = [];
      response.data.map((table: any) =>
        tmp.push({
          id: table.id,
          name: table.name,
        })
      );
      setTables(tmp);
    };
    if (numPerson) {
      fetchAvailableTables();
    }
  }, [numPerson]);

  const handlePayDeposit = async () => {
    let body = {
      amount: orderDetail.deposit,
      bankCode: "",
      language: "vn",
      orderId: parseInt(orderId as string),
    };
    const response = await payDeposit(body);
    if (response.status !== 200) {
      errorNotify(response.data.message);
      return;
    }
    let payURL = response.data;
    window.open(payURL, "_blank");
  };

  useEffect(() => {
    if (socket) {
      socket.on("payment-res", (data) => {
        console.log("🚀 ~ payment-res", data);
        if (data == "success") fetchOrderDetail();
      });
    }
    return () => {
      if (socket) {
        socket.off("payment-res");
      }
    };
  }, [socket]);
  function handleSetQuantity(index: number, arg1: number) {
    throw new Error("Function not implemented.");
  }

  function handleSelected() {
    throw new Error("Function not implemented.");
  }

  return (
    <Paper
      sx={{
        padding: "20px",
        overflow: "auto",
      }}
    >
      <LoadingModal />
      <Box mb={3} ml={5}>
        <Typography variant="h3">Order Information</Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid xs={5} sm={5} md={5} display={"flex"} justifyContent={"end"}>
          <Typography variant="h6">Customer</Typography>
        </Grid>
        <Grid xs={1} sm={1} md={1} display={"flex"} justifyContent={"start"}>
          <Typography variant="h6">:</Typography>
        </Grid>
        <Grid xs={6} sm={6} md={6}>
          <Typography variant="h6">{orderDetail.customerName}</Typography>
        </Grid>
        <Grid xs={5} sm={5} md={5} display={"flex"} justifyContent={"end"}>
          <Typography variant="h6">Phone number</Typography>
        </Grid>
        <Grid xs={1} sm={1} md={1} display={"flex"} justifyContent={"start"}>
          <Typography variant="h6">:</Typography>
        </Grid>
        <Grid xs={6} sm={6} md={6}>
          <Typography variant="h6">{orderDetail.customerPhone}</Typography>
        </Grid>
        <Grid xs={5} sm={5} md={5} display={"flex"} justifyContent={"end"}>
          <Typography variant="h6">Date</Typography>
        </Grid>
        <Grid xs={1} sm={1} md={1} display={"flex"} justifyContent={"start"}>
          <Typography variant="h6">:</Typography>
        </Grid>
        <Grid xs={6} sm={6} md={6}>
          <Typography variant="h6">{orderDetail.date}</Typography>
        </Grid>
        <Grid xs={5} sm={5} md={5} display={"flex"} justifyContent={"end"}>
          <Typography variant="h6">Time</Typography>
        </Grid>
        <Grid xs={1} sm={1} md={1} display={"flex"} justifyContent={"start"}>
          <Typography variant="h6">:</Typography>
        </Grid>
        <Grid xs={6} sm={6} md={6}>
          <Typography variant="h6">{orderDetail.time}</Typography>
        </Grid>
        <Grid xs={5} sm={5} md={5} display={"flex"} justifyContent={"end"}>
          <Typography variant="h6">Payment status</Typography>
        </Grid>
        <Grid xs={1} sm={1} md={1} display={"flex"} justifyContent={"start"}>
          <Typography variant="h6">:</Typography>
        </Grid>
        <Grid xs={6} sm={6} md={6}>
          <Typography variant="h6">{orderDetail.paymentStatus}</Typography>
        </Grid>
        {orderDetail.tables.length > 0 && (
          <Grid xs={6} sm={6} md={6}>
            <Grid xs={5} sm={5} md={5} display={"flex"} justifyContent={"end"}>
              <Typography variant="h6">Tables</Typography>
            </Grid>
            <Grid
              xs={1}
              sm={1}
              md={1}
              display={"flex"}
              justifyContent={"start"}
            >
              <Typography variant="h6">:</Typography>
            </Grid>
            <Typography variant="h6">
              {orderDetail.tables.map((table) => table.name).join(", ")}
            </Typography>
          </Grid>
        )}
      </Grid>
      {dishes.length > 0 && (
        <>
          <Box
            // display={"flex"}
            // justifyContent={"center"}
            // flexDirection={"row"}
            // alignItems={"center"}
            mb={3}
            mt={3}
            ml={5}
          >
            <Typography variant="h3">Dish Information</Typography>
          </Box>
          <Grid container spacing={2} ml={20}>
            <Grid xs={4} sm={4} md={4}>
              <Typography variant="h6">Name</Typography>
            </Grid>
            <Grid xs={4} sm={4} md={4}>
              <Typography variant="h6">Quantity</Typography>
            </Grid>
            <Grid xs={4} sm={4} md={4}>
              <Typography variant="h6">Total</Typography>
            </Grid>
            {orderDetail.dishes.map((dish, index) => (
              <>
                <Grid key={index} xs={4} sm={4} md={4}>
                  <Typography variant="h6">{dish.dishName}</Typography>
                </Grid>
                <Grid key={index} xs={4} sm={4} md={4}>
                  <Typography variant="h6">{dish.quantity}</Typography>
                </Grid>
                <Grid key={index} xs={4} sm={4} md={4}>
                  <Typography variant="h6">{dish.total}</Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
          marginTop: "20px",
        }}
      >
        {/* {orderDetail.deposit > 0 && orderDetail.paymentStatus == "pending" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handlePayDeposit();
            }}
          >
            Pay deposit
          </Button>
        )} */}
        <Button variant="contained" onClick={() => setChooseTable(true)}>
          {" "}
          Choose tables
        </Button>
        <Button variant="contained" onClick={() => setChooseDish(true)}>
          Choose dish
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent:
            orderDetail.deposit > 0 && orderDetail.paymentStatus == "pending"
              ? "space-around"
              : "center",
          alignItems: "center",
          flexDirection: "row",
          marginTop: "20px",
        }}
      >
        {/* {orderDetail.deposit > 0 && orderDetail.paymentStatus == "pending" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handlePayDeposit();
            }}
          >
            Pay deposit
          </Button>
        )} */}
        <Button>Update</Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            router.push("/staff/manage-order");
          }}
        >
          Cancel
        </Button>
      </Box>
      <Modal open={chooseTable} onClose={() => setChooseTable(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            backgroundColor: "#EDEEF1",
            border: "2px solid #000",
            padding: "20px",
            borderRadius: "10px",
            overflowY: "auto",
          }}
        >
          <Grid container spacing={2}>
            <Grid xs={2} sm={4} md={4}>
              <Typography
                sx={{
                  fontSize: "1.0em",
                  fontWeight: "bold",
                }}
              >
                Table&apos;s capacity
              </Typography>
            </Grid>
            <Grid xs={2} sm={4} md={4}>
              <Select
                value={numPerson.toString()}
                onChange={(event) => {
                  setNumPerson(parseInt(event.target.value));
                }}
                fullWidth
              >
                <MenuItem value={"2"}>2 người</MenuItem>
                <MenuItem value={"4"}>4 người</MenuItem>
                <MenuItem value={"6"}>6 người</MenuItem>
                <MenuItem value={"8"}>8 người</MenuItem>
              </Select>
            </Grid>

            <Grid xs={2} sm={12} md={12}>
              <Typography
                sx={{
                  fontSize: "1.0em",
                  fontWeight: "bold",
                }}
              >
                Chọn bàn
              </Typography>
            </Grid>
            {tables.map((table, index) => (
              <Grid key={index} xs={2} sm={3} md={3}>
                <Button
                  onClick={() => {
                    handleChangeTableId(table.id);
                  }}
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: tableId.includes(table.id) ? "#fff" : "black",
                    borderColor: "black",
                    backgroundColor: tableId.includes(table.id)
                      ? "#AE0001"
                      : "#fff",
                    ":hover": {
                      backgroundColor: "#AE0001",
                      color: "#fff",
                    },
                  }}
                >
                  {table.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={chooseDish}
        onClose={() => {
          setChooseDish(false);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            backgroundColor: "#EDEEF1",
            border: "2px solid #000",
            padding: "20px",
            borderRadius: "10px",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.8em",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#AE0001",
              }}
            >
              Chọn món
            </Typography>
          </Box>
          <Card
            sx={{
              padding: "20px",
            }}
          >
            <Grid container>
              <Grid xs={3} sm={3} md={3}></Grid>
              <Grid xs={3} sm={3} md={3}>
                Name
              </Grid>
              <Grid xs={3} sm={3} md={3}>
                Price
              </Grid>
              <Grid xs={2} sm={2} md={2}></Grid>

              <Grid xs={1} sm={1} md={1}></Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{
                maxHeight: "50vh", // Adjust this value as needed
                overflowY: "auto", // Makes the Grid scrollable vertically
                marginTop: "20px",
              }}
            >
              {dishes.map((dish, index) => (
                <>
                  <Grid key={index} xs={3} sm={3} md={3}>
                    <Image
                      src={dish.image}
                      alt={dish.dishName}
                      width={60}
                      height={60}
                    />
                  </Grid>

                  <Grid key={index} xs={3} sm={3} md={3}>
                    <Typography
                      sx={{
                        fontSize: "1.0em",
                        fontWeight: "bold",
                      }}
                    >
                      {dish.dishName}
                    </Typography>
                  </Grid>

                  <Grid key={index} xs={3} sm={3} md={3}>
                    <Typography
                      sx={{
                        fontSize: "1.0em",
                        fontWeight: "bold",
                      }}
                    >
                      {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(dish.price || 0)}
                    </Typography>
                  </Grid>
                  <Grid key={index} xs={2} sm={2} md={2}>
                    <TextField
                      id="standard-basic"
                      label="Số lượng"
                      variant="outlined"
                      value={quantity[index]}
                      onChange={(event) => {
                        handleSetQuantity(index, parseInt(event.target.value));
                      }}
                      fullWidth
                      type="number"
                      defaultValue={1}
                      disabled={!isChecked[index]}
                    />
                  </Grid>
                  <Grid key={index} xs={1} sm={1} md={1}>
                    <Checkbox
                      checked={isChecked[index]}
                      onChange={(event) => {
                        dish.isSelected = event.target.checked;
                        handleSelected();
                      }}
                    />
                  </Grid>
                </>
              ))}
            </Grid>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                fontSize: "1.0em",
                fontWeight: "bold",
                marginBottom: "10px",
                backgroundColor: "#E6AC0D",
                ":hover": {
                  backgroundColor: "#AE0001",
                },
                textAlign: "center",
                width: "200px",
                height: "50px",
              }}
              onClick={() => {
                setChooseDish(false);
              }}
            >
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
};

export default DetailOrderComponent;
