/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSelector } from "@/redux/hooks";
import { fetchAllDishes, fetchOrderDetail } from "@/utils";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import LoadingModal from "@/common/loading/LoadingModal";
import useStaff from "@/controllers/useStaff";
import useNotify from "@/hooks/useNotify";
import { socket } from "@/socket";
type OrderItem = {
  id: number;
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
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    paymentStatus: string;
  };
  orderItems: OrderItem[];
  tables: Table[];
};

const UpdateOrderComponent = () => {
  const router = useRouter();
  const [orderDetail, setOrderDetail] = useState<Order | null>();
  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [newOrderItems, setNewOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openTables, setOpenTables] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean[]>([]);
  const [quantity, setQuantity] = useState<number[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [tableSelected, setTableSelected] = useState<Table[]>([]);
  const [position, setPosition] = useState<
    "ALL" | "TANG1" | "TANG2" | "TANG3" | "TANG4"
  >("ALL");
  const [description, setDescription] = useState<
    "ALL" | "CENTER" | "NEAR WINDOW" | "NEAR DOOR" | "OUT DOOR"
  >("ALL");
  const [key, setKey] = useState(new Set<string>());
  const [tables, setTables] = useState<Table[]>([]);
  const { restaurantId } = useAppSelector((state) => state.profile);
  const { getAvailableTable, updateOrder } = useStaff();
  const { errorNotify, successNotify } = useNotify();
  const [numPerson, setNumPerson] = useState(2);
  const { orderId } = router.query;
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const fetchOrder = async () => {
    let tmp = await fetchOrderDetail(Number(orderId)); // Convert orderId to number
    console.log("🚀 ~ fetchOrder ~  tmp:", tmp);
    tmp?.orderItems.sort((a: any, b: any) => a.dishId - b.dishId);
    setOrderDetail(tmp);
    setNewOrderItems(tmp?.orderItems);
    setTableSelected(tmp?.tables);
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
  useEffect(() => {
    setLoading(true);
    fetchOrder()
      .then((orderDetail) => fetchDishes(orderDetail))
      .then(() => setLoading(false));
  }, [orderId]);
  useEffect(() => {
    if (socket) {
      socket.on("update-order", (data) => {
        if (data === "success") {
          setLoading(true);
          fetchOrder()
            .then((orderDetail) => fetchDishes(orderDetail))
            .then(() => setLoading(false));
        }
      });
      socket.on("payment-res", (data) => {
        if (data === "success") {
          setLoading(true);
          fetchOrder()
            .then((orderDetail) => fetchDishes(orderDetail))
            .then(() => setLoading(false));
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("update-order");
        socket.off("payment-res");
      }
    };
  }, [socket]);
  useEffect(() => {
    const fetchAvailableTables = async () => {
      let body = {
        people: numPerson,
        restaurantId: restaurantId,
        orderId: orderId,
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
          capacity: table.capacity,
          position: table.position,
          description: table.description,
        })
      );
      setTables(tmp);
    };
    if (numPerson) {
      fetchAvailableTables();
    }
  }, [numPerson]);

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

  const handleChangeTable = (table: any) => {
    let tmp = [...tableSelected];
    let index = tmp.findIndex((item) => item.id === table.id);
    if (index === -1) {
      tmp.push(table);
    } else {
      tmp.splice(index, 1);
    }
    setTableSelected(tmp);
    setKey((prevKey) => {
      const newKey = new Set(prevKey);
      newKey.add("newTables");
      return newKey;
    });
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
    if (key.has("newTables")) {
      let status = "confirmed";
      if (tableSelected.length !== 0) status = "seated";
      body = {
        ...body,
        newTables: tableSelected,
        orderStatus: status,
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
      <LoadingModal open={loading} />
      <Paper
        sx={{
          padding: 2,
          margin: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <List
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
                Order Id
              </Grid>
              <Grid item xs={1}>
                :
              </Grid>
              <Grid item xs={7}>
                {orderDetail?.order.id}
              </Grid>
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
              <Grid item xs={2} sm={2} md={2}></Grid>

              <Grid item xs={1} sm={1} md={1}></Grid>
            </Grid>
            {dishes.map(
              (dish, index) =>
                dish.isSelect && (
                  <Box key={index}>
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
                          disabled={
                            orderDetail?.order.resStatus === "done" ||
                            orderDetail?.order.resStatus === "cancel"
                          }
                        />
                      </Grid>
                      <Grid item xs={1} sm={1} md={1}>
                        {orderDetail?.order.resStatus !== "done" &&
                          orderDetail?.order.resStatus !== "cancel" && (
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDelete(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                      </Grid>
                    </Grid>
                  </Box>
                )
            )}
            {orderDetail?.order.resStatus !== "done" &&
              orderDetail?.order.resStatus !== "cancel" && (
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
                  >
                    Add dish
                  </Button>
                </Box>
              )}
          </Collapse>
          {orderDetail?.order.resStatus !== "done" &&
            orderDetail?.order.resStatus !== "cancel" &&
            orderDetail?.order.resStatus !== "pending" && (
              <>
                <ListItemButton
                  onClick={handleClick2}
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
                      Order Table
                    </Typography>
                  </ListItemText>
                  {open2 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={open2}
                  timeout="auto"
                  unmountOnExit
                  sx={{ pl: 4 }}
                >
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={3}
                      justifyContent={"center"}
                      alignItems={"center"}
                      display={"flex"}
                      flexDirection={"row"}
                    >
                      Table
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      justifyContent={"center"}
                      alignItems={"center"}
                      display={"flex"}
                      flexDirection={"row"}
                    >
                      Capacity
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      justifyContent={"center"}
                      alignItems={"center"}
                      display={"flex"}
                      flexDirection={"row"}
                    >
                      Position
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      justifyContent={"center"}
                      alignItems={"center"}
                      display={"flex"}
                      flexDirection={"row"}
                    >
                      Description
                    </Grid>
                  </Grid>
                  <Box mt={2}>
                    {tableSelected.map((table, index) => (
                      <Grid container spacing={2} key={index}>
                        <Grid
                          item
                          xs={3}
                          justifyContent={"center"}
                          alignItems={"center"}
                          display={"flex"}
                          flexDirection={"row"}
                        >
                          {table.name}
                        </Grid>
                        <Grid
                          item
                          xs={3}
                          justifyContent={"center"}
                          alignItems={"center"}
                          display={"flex"}
                          flexDirection={"row"}
                        >
                          {table.capacity}
                        </Grid>
                        <Grid
                          item
                          xs={3}
                          justifyContent={"center"}
                          alignItems={"center"}
                          display={"flex"}
                          flexDirection={"row"}
                        >
                          {table.position}
                        </Grid>
                        <Grid
                          item
                          xs={3}
                          justifyContent={"center"}
                          alignItems={"center"}
                          display={"flex"}
                          flexDirection={"row"}
                        >
                          {table.description}
                        </Grid>
                      </Grid>
                    ))}
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
                          setOpenTables(true);
                        }}
                      >
                        Add/Change
                      </Button>
                    </Box>
                  </Box>
                </Collapse>
              </>
            )}
          {orderDetail?.order.resStatus !== "done" &&
            orderDetail?.order.resStatus !== "cancel" && (
              <ListItem
                sx={{
                  display: "flex",

                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 5,
                }}
              >
                {orderDetail?.order.resStatus === "pending" && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      // Handle the update order here
                      handleUpdateStatus("confirmed");
                    }}
                    sx={{
                      mr: 2,
                    }}
                  >
                    Confirmed
                  </Button>
                )}

                <Button
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    ":hover": {
                      backgroundColor: "#ff7f7f",
                      color: "white",
                      transition: "background-color 0.3s ease",
                    },
                  }}
                  onClick={() => {
                    // Handle the update order here
                    handleUpdateStatus("cancel");
                  }}
                >
                  Cancel
                </Button>

                <Box flexGrow={1} />
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
              </ListItem>
            )}
        </List>
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
                  <Box key={index}>
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
                          {dish.price} $
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
        <Modal
          open={openTables}
          onClose={() => {
            setOpenTables(false);
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
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
                Tables
              </Typography>
            </Box>
            <Grid container spacing={2} alignItems={"center"} mt={5}>
              <Grid item xs={3}>
                <Typography
                  sx={{
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  Filter
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Select
                  value={numPerson.toString()}
                  onChange={(event) => {
                    setNumPerson(parseInt(event.target.value));
                  }}
                  fullWidth
                >
                  <MenuItem value={"2"}>2 people</MenuItem>
                  <MenuItem value={"4"}>4 people</MenuItem>
                  <MenuItem value={"6"}>6 people</MenuItem>
                  <MenuItem value={"8"}>8 people</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={3}>
                <Select
                  fullWidth
                  variant="outlined"
                  value={position}
                  onChange={(e) => {
                    setPosition(
                      e.target.value as
                        | "ALL"
                        | "TANG1"
                        | "TANG2"
                        | "TANG3"
                        | "TANG4"
                    );
                  }}
                  defaultValue="ALL"
                >
                  <MenuItem value={"ALL"}>ALL</MenuItem>
                  <MenuItem value={"TANG1"}>1ST FLOOR</MenuItem>
                  <MenuItem value={"TANG2"}>2ST FLOOR</MenuItem>
                  <MenuItem value={"TANG3"}>3ST FLOOR</MenuItem>
                  <MenuItem value={"TANG4"}>4ST FLOOR</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={3}>
                <Select
                  fullWidth
                  variant="outlined"
                  value={description}
                  onChange={(e) => {
                    setDescription(
                      e.target.value as
                        | "ALL"
                        | "CENTER"
                        | "NEAR WINDOW"
                        | "NEAR DOOR"
                        | "OUT DOOR"
                    );
                  }}
                  defaultValue="ALL"
                >
                  <MenuItem value={"ALL"}>ALL</MenuItem>
                  <MenuItem value={"CENTER"}>CENTER</MenuItem>
                  <MenuItem value={"NEAR WINDOW"}>NEAR WINDOW</MenuItem>
                  <MenuItem value={"NEAR DOOR"}>NEAR DOOR</MenuItem>
                  <MenuItem value={"OUT DOOR"}>OUT DOOR</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                mt: 5,
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Available
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {tables.map(
                (table, index) =>
                  numPerson === table.capacity &&
                  (position === "ALL" || table.position === position) &&
                  (description === "ALL" ||
                    table.description === description) && (
                    <Grid key={index} xs={3} pl={4} pt={2}>
                      <Button
                        onClick={() => {
                          handleChangeTable(table);
                        }}
                        variant="outlined"
                        fullWidth
                        sx={{
                          color:
                            tableSelected.findIndex(
                              (item) => item.id === table.id
                            ) !== -1
                              ? "#fff"
                              : "black",
                          borderColor: "black",
                          backgroundColor:
                            tableSelected.findIndex(
                              (item) => item.id === table.id
                            ) !== -1
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
                  )
              )}
            </Grid>
          </Box>
        </Modal>
      </Paper>
    </>
  );
};

export default UpdateOrderComponent;
