/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  Typography,
  Grid,
  ListItemButton,
  ListItemText,
  Collapse,
  List,
  TextField,
  IconButton,
  ListItem,
  Checkbox,
  Card,
  Chip,
  Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import useCustomer from "@/controllers/useCustomer";
import { useEffect, useState } from "react";
import useNotify from "@/hooks/useNotify";
import { socket } from "@/socket";

import {
  fetchAllDishes,
  fetchOrderDetail,
  formatCurrencyVND,
  formatDate,
  formatDateTime,
  formatEmail,
  formatFullName,
  formatPhoneNumber,
  formatString,
  formatTime,
} from "@/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import { clearOrder } from "@/redux/cart/cartSlice";
type OrderItem = {
  id?: number;
  dishId: number;
  dishName: string;
  total: number;
  quantity: number;
};

type Dish = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: number;
  isSelect: boolean;
};

type Table = {
  id: number;
  name: string;
  capacity: number;
  position: string;
  description: string;
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
    cusId?: number;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    paymentStatus: string;
    email: string;
  };
  orderItems: OrderItem[];
  tables: Table[];
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

const DetailOrderComponent = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState(router.query.orderId);
  const {id} = useAppSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const { order, orderItems, tables } = useAppSelector((state) => state.cart);
  const [orderDetail, setOrderDetail] = useState<Order | null>();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [newOrderItems, setNewOrderItems] = useState<OrderItem[]>([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isChecked, setIsChecked] = useState<boolean[]>([]);
  const [quantity, setQuantity] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const { payDeposit, updateOrder, getDetailRestaurantById } = useCustomer();
  const { errorNotify, successNotify } = useNotify();
  const [key, setKey] = useState(new Set<string>());
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
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
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
  const MenuModal = () => {
    return (
      <Modal
        open={openMenu}
        onClose={() => {
          setOpenMenu(false);
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
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
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
              Dishes
            </Typography>
          </Box>
          <Box padding={5}>
            <Grid container>
              <Grid item xs={3} sm={3} md={3}></Grid>
              <Grid item xs={3} sm={3} md={3}>
                Name
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                Price
              </Grid>
              <Grid item xs={2} sm={2} md={2}></Grid>

              <Grid item xs={1} sm={1} md={1}></Grid>
            </Grid>
            <Box
              sx={{
                maxHeight: 400,
                overflow: "auto",
                marginTop: 2,
              }}
            >
              {dishes.map((dish, index) => (
                <Box key={index} padding={1}>
                  <Grid container spacing={1}>
                    <Grid item xs={3} sm={3} md={3}>
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        width={60}
                        height={60}
                      />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                      <Typography
                        sx={{
                          fontSize: "1.0em",
                          fontWeight: "bold",
                        }}
                      >
                        {dish.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
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
                    <Grid item xs={2} sm={2} md={2}>
                      <TextField
                        id="standard-basic"
                        label="Quantity"
                        variant="outlined"
                        value={quantity[index]}
                        onChange={(event) => {
                          handleSetQuantity(
                            index,
                            parseInt(event.target.value)
                          );
                        }}
                        fullWidth
                        type="number"
                        defaultValue={1}
                        inputProps={{ min: "1" }}
                        disabled={!isChecked[index]}
                      />
                    </Grid>
                    <Grid item xs={1} sm={1} md={1}>
                      <Checkbox
                        checked={isChecked[index]}
                        onChange={(event) => {
                          handleSelected(index, event.target.checked);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  };
  const fetchOrder = async (id: any) => {
    setLoading(true);
    let tmp = await fetchOrderDetail(Number(id)); // Convert orderId to number
    tmp?.orderItems.sort((a: any, b: any) => a.dishId - b.dishId);
    setOrderDetail(tmp);
    setNewOrderItems(tmp?.orderItems);
    return tmp; // return the fetched order detail
  };

  const fetchDishes = async (orderDetail: any) => {
    let tmp = await fetchAllDishes();
    tmp!.sort((a: any, b: any) => a.id - b.id);
    let isCheckedTmp: boolean[] = [];
    let quantityTmp: number[] = [];
    tmp!.forEach(() => {
      isCheckedTmp.push(false);
      quantityTmp.push(1);
    });
    let orderItems = orderDetail?.orderItems;
    orderItems?.forEach((orderItem: any) => {
      let index = tmp!.findIndex((dish) => dish.id === orderItem.dishId);
      console.log("🚀 ~ orderItems?.forEach ~ index:", index);
      if (index !== -1) {
        isCheckedTmp[index] = true;
        quantityTmp[index] = orderItem.quantity;
        tmp![index].isSelect = true;
      }
    });
    if (tmp) {
      setDishes(tmp);
    }
    setIsChecked(isCheckedTmp);
    setQuantity(quantityTmp);
  };
  const fetchRestaurantDetails = async (restaurantId: number) => {
    const response = await getDetailRestaurantById({ id: restaurantId });
    if (response.status !== 200) {
      // Handle error
      errorNotify(response.message);
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
  useEffect(() => {
    setLoading(true);
    if (orderId !== "") {
      fetchOrder(orderId)
        .then((orderDetail) => {
          fetchDishes(orderDetail);
          fetchRestaurantDetails(orderDetail?.order.restaurantId);
          if (orderDetail?.orderItems.length === 0) setOpen(false);
          else setOpen(true);
        })
        .then(() => setLoading(false));
    } else {
      setOrderDetail({
        order: order,
        orderItems: orderItems,
        tables: tables,
      });
      fetchDishes({
        order: order,
        orderItems: orderItems,
        tables: tables,
      }).then(() => setLoading(false));
      fetchRestaurantDetails(order.restaurantId);
      setOpen(true);
    }
  }, [orderId]);

  const handlePayDeposit = async () => {
    let body = {
      received: orderDetail?.order.depositAmount,
      bankCode: "",
      language: "vn",
      // orderId: parseInt(orderId as string),
      order: orderDetail!,
      type: "deposit",
    };
    console.log("🚀 ~ handlePayDeposit ~ body.order:", body.order);
    const response = await payDeposit(body);
    console.log("🚀 ~ handlePayDeposit ~ response:", response);
    if (response.status !== 200) {
      errorNotify(response.message);
      return;
    }
    let payURL = response.data;
    window.open(payURL, "_blank");
  };

  useEffect(() => {
    if (socket) {
      setLoading(true);
      socket.on("update-order", (data) => {
        if (data === "success") {
          fetchOrder(orderId)
            .then((orderDetail) => fetchDishes(orderDetail))
            .then(() => setLoading(false));
        }
      });
      socket.on("payment-res", (data) => {
        if (data.message === "success") {
          console.log("🚀 ~ socket.on ~ data:", data);
          setOrderId(data.orderId);
          fetchOrder(data.orderId)
            .then((orderDetail) => fetchDishes(orderDetail))
            .then(() => setLoading(false));
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("payment-res");
        socket.off("update-order");
      }
    };
  }, [socket]);
  const handleSetQuantity = (index: number, value: number) => {
    let tmp = [...quantity];
    tmp[index] = value;
    setQuantity(tmp);
    setNewOrderItems((prev) => {
      let tmp = [...prev];
      let itemIndex = tmp.findIndex((item) => item.dishId === dishes[index].id);
      if (itemIndex === -1) {
        tmp.push({
          id: 0,
          dishId: dishes[index].id,
          dishName: dishes[index].name,
          total: dishes[index].price * value,
          quantity: value,
        });
      } else {
        tmp[itemIndex].total = dishes[index].price * value;
        tmp[itemIndex].quantity = value;
      }
      return tmp;
    });
    setKey((prevKey) => {
      const newKey = new Set(prevKey);
      newKey.add("newOrderItems");
      return newKey;
    });
  };
  const handleDelete = (index: number) => {
    let tmp = [...isChecked];
    tmp[index] = false;
    setIsChecked(tmp);
    setNewOrderItems((prev) => {
      let tmp = [...prev];
      let itemIndex = tmp.findIndex((item) => item.dishId === dishes[index].id);
      if (itemIndex !== -1) {
        tmp.splice(itemIndex, 1);
      }
      return tmp;
    });
    let tmpDishes = [...dishes];
    tmpDishes[index].isSelect = false;
    setDishes(tmpDishes);
    setKey((prevKey) => {
      const newKey = new Set(prevKey);
      newKey.add("newOrderItems");
      return newKey;
    });
  };

  const handleSelected = (index: number, value: boolean) => {
    let tmp = [...isChecked];
    tmp[index] = value;
    let tmpDishes = [...dishes];
    tmpDishes[index].isSelect = value;
    setDishes(tmpDishes);
    setIsChecked(tmp);
    setNewOrderItems((prev) => {
      let tmp = [...prev];
      let itemIndex = tmp.findIndex((item) => item.dishId === dishes[index].id);
      if (value) {
        if (itemIndex === -1) {
          tmp.push({
            id: 0,
            dishId: dishes[index].id,
            dishName: dishes[index].name,
            total: dishes[index].price * quantity[index],
            quantity: quantity[index],
          });
        } else {
          tmp[itemIndex].total = dishes[index].price * quantity[index];
          tmp[itemIndex].quantity = quantity[index];
        }
      } else {
        if (itemIndex !== -1) {
          tmp.splice(itemIndex, 1);
        }
      }
      return tmp;
    });
    setKey((prevKey) => {
      const newKey = new Set(prevKey);
      newKey.add("newOrderItems");
      return newKey;
    });
  };
  const imageLoader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width?: number;
    quality?: number;
  }) => {
    return `https://example.com/${src}?w=${width || 250}&q=${quality || 75}`;
  };
  const handleUpdateOrder = async () => {
    setLoading(true);
    let body: {
      orderId: number | undefined;
      newOrderItems?: any[];
      newTables?: any[];
      orderStatus?: string;
    } = {
      orderId: orderDetail?.order.id,
    };
    console.log("🚀 ~ handleUpdateOrder ~ key:", key);
    if (key.has("newOrderItems")) {
      body = {
        ...body,
        newOrderItems: newOrderItems,
      };
    }

    const response = await updateOrder(body);
    if (response.status !== 200) {
      // Handle error
      errorNotify(response.data.message);
      setLoading(false);
      return;
    }
    successNotify("Update order successfully");
    setLoading(false);
    // Handle success
  };

  const handleUpdateStatus = async (status: string) => {
    setLoading(true);
    let body: {
      orderId: number | undefined;
      orderStatus: string;
      newTables?: any[];
    } = {
      orderId: orderDetail?.order.id,
      orderStatus: status,
    };
    if (status === "cancel")
      body = {
        ...body,
        newTables: [],
      };
    const response = await updateOrder(body);
    if (response.status !== 200) {
      // Handle error
      errorNotify(response.data.message);
      setLoading(false);
      return;
    }
    successNotify("Update order status successfully");
    setLoading(false);
    // Handle success
  };

  return (
    <>
      <LoadingModal />
      <MenuModal />
      <Box
        sx={{
          display: "flex",

          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          overflow: "auto",
          marginBottom: 2,
        }}
      >
        <Box
          component={Paper}
          sx={{
            width: "50%",
            padding: 1,
            bgcolor: "#FEF0F0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "200px",
            }}
          >
            <Image
              // loader={imageLoader}
              src={"/images/restaurants/res-1.jpg"}
              alt={"restaurant"}
              layout="fill"
              objectFit="cover"
            />
          </Box>
          <Box
            sx={{
              width: "90%",
              bgcolor: "#fff",
              position: "relative",
              top: "-30px",
              padding: 2,
              borderRadius: 1,
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <Chip
              label={formatString(orderDetail?.order.resStatus ?? "")}
              variant="filled"
              sx={{
                marginBottom: 1,
                bgcolor: {
                  pending: "#FFD700",
                  confirmed: "#00BFFF",
                  done: "#32CD32",
                  cancel: "#FF0000",
                }[orderDetail?.order.resStatus ?? "pending"],
                color: "#fff",
              }}
            />
            <Divider />
            <Box
              sx={{
                width: "100%",
                marginTop: 2,
                marginBottom: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {restaurant.resName}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 1,
                }}
              >
                <PlaceOutlinedIcon
                  sx={{
                    maxWidth: 20,
                    padding: "3px 0",
                    color: "grey",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 16,
                    marginLeft: 1,
                    color: "grey",
                  }}
                >
                  {restaurant.address}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
              sx={{
                p: 1,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                  }}
                >
                  Id
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  #{orderDetail?.order.id}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                  }}
                >
                  People
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  {orderDetail?.order.people}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                  }}
                >
                  Date
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  {orderDetail?.order.resDate}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                  }}
                >
                  Time
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  {orderDetail?.order.resTime}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: 14 }}>Create at</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                  {orderDetail?.order.createdAt}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                  }}
                >
                  Status
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  {formatString(orderDetail?.order.resStatus ?? "")}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: 14 }}>Full Name</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                  {formatFullName(orderDetail?.order.fullName ?? "")}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: 14 }}>Phone</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                  {formatPhoneNumber(orderDetail?.order.phoneNumber ?? "")}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: 14 }}>Email</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                  {formatEmail(orderDetail?.order.email ?? "")}
                </Typography>
              </Box>
            </Collapse>
            {orderDetail?.orderItems.length !== 0 && (
              <>
                <Divider />
                <Collapse
                  in={open}
                  timeout="auto"
                  unmountOnExit
                  sx={{
                    p: 1,
                  }}
                >
                  {orderDetail?.orderItems.map((orderItem, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ fontSize: 14 }}>
                        {orderItem.dishName} x {orderItem.quantity}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(orderItem.total)}
                      </Typography>
                    </Box>
                  ))}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: 14 }}>Total</Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                      {formatCurrencyVND(orderDetail?.order.totalAmount ?? 0)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: 14 }}>Deposit</Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                      {formatCurrencyVND(orderDetail?.order.depositAmount ?? 0)}
                    </Typography>
                  </Box>
                  {orderDetail?.order.resStatus === "pending" && (
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "red",
                        fontWeight: "bold",
                        fontStyle: "italic",
                        textAlign: "center",
                      }}
                    >
                      You need to pay deposit to confirm the reservation!
                    </Typography>
                  )}
                </Collapse>
              </>
            )}
            {orderDetail?.orderItems.length === 0 && (
              <Box
                sx={{
                  width: "100%",
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="text"
                  sx={{
                    color: "red",
                  }}
                  onClick={handleClick}
                >
                  {open ? "Hide" : "See detail"}
                </Button>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 1,
            }}
          >
            {orderDetail?.order.resStatus !== "cancel" &&
              orderDetail?.order.resStatus !== "done" && (
                <Button
                  variant="contained"
                  sx={{
                    width: {
                      xs: "45%",
                      sm: "35%",
                    },
                    color: "white",
                    bgcolor: "red",
                    fontWeight: "bold",
                    ":hover": {
                      backgroundColor: "red",
                      color: "white",
                    },
                  }}
                  onClick={() => {
                    // Handle the update order here
                    if (
                      orderDetail?.order.resStatus === "pending" &&
                      orderDetail?.orderItems.length !== 0
                    ){
                      dispatch(clearOrder());
                      router.replace("/");
                    }
                    else handleUpdateStatus("cancel");
                  }}
                >
                  Cancel
                </Button>
              )}
            {orderDetail?.order.resStatus === "pending" &&
            orderDetail?.orderItems.length !== 0 ? (
              <Button
                variant="contained"
                sx={{
                  width: {
                    xs: "45%",
                    sm: "35%",
                  },
                  color: "white",
                  bgcolor: "green",
                  fontWeight: "bold",
                  ":hover": {
                    bgcolor: "green",
                    color: "white",
                  },
                }}
                onClick={handlePayDeposit}
              >
                Pay Deposit
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  width: {
                    xs: "45%",
                    sm: "35%",
                  },
                  bgcolor: "#F0B71C",
                  color: "white",
                  fontWeight: "bold",
                  ":hover": {
                    backgroundColor: "#F0B71C",
                    color: "white",
                  },
                }}
                component={Link}
                href="/"
              >
                Back Home
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DetailOrderComponent;
{
  /* <List
          sx={{
            width: "100%",
          }}
        >
          <ListItemButton
            onClick={handleClick}
            sx={{
              backgroundColor: "#EDEEF1",
              marginBottom: 2,
            }}
          >
            <ListItemText>
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Order Detail
              </Typography>
            </ListItemText>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit sx={{ pl: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                Reservation Date
              </Grid>
              <Grid item xs={1}>
                :
              </Grid>
              <Grid item xs={7}>
                {orderDetail?.order.resDate}
              </Grid>
              <Grid item xs={4}>
                Reservation Time
              </Grid>
              <Grid item xs={1}>
                :
              </Grid>
              <Grid item xs={7}>
                {orderDetail?.order.resTime}
              </Grid>
              <Grid item xs={4}>
                Number of People
              </Grid>
              <Grid item xs={1}>
                :
              </Grid>
              <Grid item xs={7}>
                {orderDetail?.order.people}
              </Grid>
              <Grid item xs={4}>
                Reservation Status
              </Grid>
              <Grid item xs={1}>
                :
              </Grid>
              <Grid item xs={7}>
                {orderDetail?.order.resStatus}
              </Grid>
              <Grid item xs={4}>
                Payment Status
              </Grid>
              <Grid item xs={1}>
                :
              </Grid>
              <Grid item xs={7}>
                {orderDetail?.order.paymentStatus}
              </Grid>
            </Grid>
          </Collapse>
          {orderDetail?.orderItems.length !== 0 && (
            <>
              <ListItemButton
                onClick={handleClick1}
                sx={{
                  backgroundColor: "#EDEEF1",
                  marginBottom: 2,
                  marginTop: 2,
                }}
              >
                <ListItemText>
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Order Items
                  </Typography>
                </ListItemText>
                {open1 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open1} timeout="auto" unmountOnExit sx={{ pl: 4 }}>
                <Grid container>
                  <Grid item xs={3} sm={3} md={3}></Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    Name
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    Price
                  </Grid>
                  <Grid item xs={2} sm={2} md={2}>
                    Quantity
                  </Grid>
                  <Grid item xs={1} sm={1} md={1}></Grid>
                </Grid>
                {dishes.map(
                  (dish, index) =>
                    dish.isSelect && (
                      <Box key={index} padding={1}>
                        <Grid container spacing={1}>
                          <Grid item xs={3} sm={3} md={3}>
                            <Image
                              src={dish.image}
                              alt={dish.name}
                              width={60}
                              height={60}
                            />
                          </Grid>
                          <Grid item xs={3} sm={3} md={3}>
                            <Typography
                              sx={{
                                fontSize: "1.0em",
                                fontWeight: "bold",
                              }}
                            >
                              {dish.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={3} sm={3} md={3}>
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
                          <Grid item xs={2} sm={2} md={2}>
                            {/* <TextField
                          id="standard-basic"
                          label="Quantity"
                          variant="outlined"
                          value={quantity[index]}
                          onChange={(event) => {
                            handleSetQuantity(
                              index,
                              parseInt(event.target.value)
                            );
                          }}
                          fullWidth
                          type="number"
                          defaultValue={1}
                          inputProps={{ min: "1" }}
                          // disabled={orderDetail?.order.resStatus !== "pending"}
                          disabled
                        /> */
}
//             <Typography>{quantity[index]}</Typography>
//           </Grid>
//           <Grid item xs={1} sm={1} md={1}>
//             {/* {orderDetail?.order.resStatus === "pending" && (
//           <IconButton
//             aria-label="delete"
//             onClick={() => handleDelete(index)}
//           >
//             <DeleteIcon />
//           </IconButton>
//         )} */}
//           </Grid>
//         </Grid>
//       </Box>
//     )
// )}
{
  /* {orderDetail?.order.resStatus === "pending" && (
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"flex-end"}
                sx={{
                  width: "95%",
                  marginTop: 2,
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenMenu(true);
                  }}
                  sx={{
                    marginRight: 2,
                  }}
                >
                  Add dish
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // Handle the update order here
                    handleUpdateOrder();
                  }}
                >
                  Update Order
                </Button>
              </Box>
            )} */
}
//       </Collapse>{" "}
//     </>
//   )}
//   {orderDetail?.tables.length !== 0 && (
//     <>
//       <ListItemButton
//         onClick={handleClick2}
//         sx={{
//           backgroundColor: "#EDEEF1",
//           marginBottom: 2,
//           marginTop: 2,
//         }}
//       >
//         <ListItemText>
//           <Typography
//             sx={{
//               fontSize: 20,
//               fontWeight: "bold",
//             }}
//           >
//             Order Table
//           </Typography>
//         </ListItemText>
//         {open2 ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={open2} timeout="auto" unmountOnExit sx={{ pl: 4 }}>
//         <Grid container spacing={2}>
//           <Grid
//             item
//             xs={3}
//             justifyContent={"center"}
//             alignItems={"center"}
//             display={"flex"}
//             flexDirection={"row"}
//           >
//             Table
//           </Grid>
//           <Grid
//             item
//             xs={3}
//             justifyContent={"center"}
//             alignItems={"center"}
//             display={"flex"}
//             flexDirection={"row"}
//           >
//             Capacity
//           </Grid>
//           <Grid
//             item
//             xs={3}
//             justifyContent={"center"}
//             alignItems={"center"}
//             display={"flex"}
//             flexDirection={"row"}
//           >
//             Position
//           </Grid>
//           <Grid
//             item
//             xs={3}
//             justifyContent={"center"}
//             alignItems={"center"}
//             display={"flex"}
//             flexDirection={"row"}
//           >
//             Description
//           </Grid>
//         </Grid>
//         <Box mt={2}>
//           {orderDetail?.tables.map((table, index) => (
//             <Grid container spacing={2} key={index}>
//               <Grid
//                 item
//                 xs={3}
//                 justifyContent={"center"}
//                 alignItems={"center"}
//                 display={"flex"}
//                 flexDirection={"row"}
//               >
//                 {table.name}
//               </Grid>
//               <Grid
//                 item
//                 xs={3}
//                 justifyContent={"center"}
//                 alignItems={"center"}
//                 display={"flex"}
//                 flexDirection={"row"}
//               >
//                 {table.capacity}
//               </Grid>
//               <Grid
//                 item
//                 xs={3}
//                 justifyContent={"center"}
//                 alignItems={"center"}
//                 display={"flex"}
//                 flexDirection={"row"}
//               >
//                 {table.position}
//               </Grid>
//               <Grid
//                 item
//                 xs={3}
//                 justifyContent={"center"}
//                 alignItems={"center"}
//                 display={"flex"}
//                 flexDirection={"row"}
//               >
//                 {table.description}
//               </Grid>
//             </Grid>
//           ))}
//         </Box>
//       </Collapse>
//     </>
//   )}
//   {orderDetail?.orderItems.length !== 0 && (
//     <ListItem
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//         marginTop: 5,
//       }}
//     >
//       <Box
//         sx={{
//           width: "50%",
//         }}
//       >
//         <Grid container spacing={1}>
//           <Grid
//             item
//             xs={5}
//             sx={{
//               fontWeight: "bold",
//             }}
//           >
//             Total
//           </Grid>
//           <Grid item xs={1}>
//             :
//           </Grid>
//           <Grid item xs={6}>
//             {new Intl.NumberFormat("vi-VN", {
//               style: "currency",
//               currency: "VND",
//             }).format(orderDetail?.order.totalAmount || 0)}
//           </Grid>
//           <Grid
//             item
//             xs={5}
//             sx={{
//               fontWeight: "bold",
//             }}
//           >
//             Deposit
//           </Grid>
//           <Grid item xs={1}>
//             :
//           </Grid>
//           <Grid item xs={6}>
//             {new Intl.NumberFormat("vi-VN", {
//               style: "currency",
//               currency: "VND",
//             }).format(orderDetail?.order.depositAmount || 0)}
//           </Grid>
//         </Grid>
//       </Box>
//     </ListItem>
//   )}
//   {orderDetail?.order.paymentStatus === "pending" &&
//     orderDetail?.order.depositAmount !== 0 && (
//       <ListItem
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Typography
//           sx={{
//             color: "red",
//             fontSize: "1.2em",
//             fontWeight: "bold",
//           }}
//         >
//           You need to pay{" "}
//           {new Intl.NumberFormat("vi-VN", {
//             style: "currency",
//             currency: "VND",
//           }).format(orderDetail?.order.depositAmount || 0)}{" "}
//           to complete the reservation !
//         </Typography>
//       </ListItem>
//     )}
//   <ListItem
//     sx={{
//       display: "flex",
//       justifyContent: "end",
//       alignItems: "center",
//       flexDirection: "row",
//     }}
//   >
//     {orderDetail?.order.paymentStatus === "pending" &&
//       orderDetail?.order.resStatus !== "cancel" &&
//       orderDetail?.order.resStatus !== "done" &&
//       orderDetail?.order.depositAmount !== 0 && (
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handlePayDeposit}
//           sx={{
//             mr: 2,
//           }}
//         >
//           Pay Deposit
//         </Button>
//       )}

//     {orderDetail?.order.resStatus === "confirmed" && (
//       <Button
//         sx={{
//           backgroundColor: "red",
//           color: "white",
//           ":hover": {
//             backgroundColor: "#ff7f7f",
//             color: "white",
//             transition: "background-color 0.3s ease",
//           },
//         }}
//         onClick={() => {
//           // Handle the update order here
//           handleUpdateStatus("cancel");
//         }}
//       >
//         Cancel
//       </Button>
//     )}
//   </ListItem>
// </List> */}
