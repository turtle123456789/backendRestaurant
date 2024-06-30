/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSelector } from "@/redux/hooks";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import useCustomer from "@/controllers/useCustomer";
import { format, parse } from "date-fns";
import useNotify from "@/hooks/useNotify";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "@/redux/hooks";
import { setOrder } from "@/redux/cart/cartSlice";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { formatTime } from "@/utils";
type Time = {
  time: string;
};

const launchTime: Time[] = [
  {
    time: "10:30",
  },
  {
    time: "10:45",
  },
  {
    time: "11:00",
  },
  {
    time: "11:15",
  },
  {
    time: "11:30",
  },
  {
    time: "11:45",
  },
  {
    time: "12:00",
  },
  {
    time: "12:15",
  },
  {
    time: "12:30",
  },
  {
    time: "12:45",
  },
  {
    time: "13:00",
  },
];
const dinnerTime: Time[] = [
  {
    time: "17:00",
  },
  {
    time: "17:15",
  },
  {
    time: "17:30",
  },
  {
    time: "17:45",
  },
  {
    time: "18:00",
  },
  {
    time: "18:15",
  },
  {
    time: "18:30",
  },
  {
    time: "18:45",
  },
  {
    time: "19:00",
  },
  {
    time: "19:15",
  },
  {
    time: "19:30",
  },
  {
    time: "19:45",
  },
  {
    time: "20:00",
  },
  {
    time: "20:15",
  },
  {
    time: "20:30",
  },
  {
    time: "20:45",
  },
];

type Dish = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: number;
  isSelect: boolean;
};

type Restaurant = {
  id: number;
  name: string;
  address: string;
  provinceId: string;
  latitude: number;
  longitude: number;
  isOpen: boolean;
};

const ReserveComponent = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedDishes, setSelectedDishes] = useState<
    {
      dishId: string;
      quantity: number;
      note: string;
    }[]
  >([]);
  const [isChecked, setIsChecked] = useState<boolean[]>(
    dishes.map(() => false)
  );
  const {fullName, phoneNumber, email, id } = useAppSelector(
    (state) => state.profile
  );
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [cusFullName, setFullName] = useState(fullName);
  const [cusPhoneNumber, setPhoneNumber] = useState(phoneNumber);
  const [date, setDate] = useState<Date>(new Date());
  const [cusEmail, setEmail] = useState(email);
  const [timeSlot, setTimeSlot] = useState("Bữa trưa");
  const [numPerson, setNumPerson] = useState(1);
  const [time, setTime] = useState("00:00");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [restaurantId, setRestaurantId] = useState<number>(-1);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [quantity, setQuantity] = useState<number[]>(dishes.map(() => 1));
  const [orderId, setOrderId] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const { successNotify, errorNotify } = useNotify();
  const dispatch = useAppDispatch();
  const { bookTable, getAllDishes, getAllRestaurants } = useCustomer();

  

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await getAllRestaurants();
      if (response.status !== 200) {
        // Handle error
        return;
      }
      setRestaurants(response.data);
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const fetchDishes = async () => {
      const response = await getAllDishes();
      console.log("🚀 ~ fetchDishes ~ response:", response);
      if (response.status !== 200) {
        // Handle error
        return;
      }
      let tmp: Dish[] = [];
      response.data.map((dish: any) => {
        if(dish.categoryId === 1) {
          let base64Image = "";
        if (dish.image) {
          const imageBuffer = dish.image.data;
          base64Image = atob(Buffer.from(imageBuffer).toString("base64"));
        } else {
          base64Image = "https://example.com";
        }
        tmp.push({
          id: dish.id,
          name: dish.name,
          price: dish.price,
          description: dish.description,
          image: base64Image,
          category: dish.categoryId,
          isSelect: false,
        });
        }
      });
      setDishes(tmp);
      setQuantity(tmp.map(() => 1));
    };
    fetchDishes();
  }, []);

  const Loading = () => {
    return (
      <Dialog open={isLoading}>
        <DialogContent
          style={{ display: "flex", justifyContent: "center", padding: "24px" }}
        >
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  };
  const NotifySuccess = () => {
    return (
      <Dialog open={openDialog}>
        <DialogTitle sx={{ backgroundColor: "red", color: "white" }}>
          CREATE AND SUBMIT ORDER SUCCESSFUL!
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenDialog(false);
            router.push(`/order/detail-order?orderId=${orderId}`);
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon
            sx={{
              width: 18,
              height: 18,
            }}
          />
        </IconButton>
        <DialogContent>
          <DialogContentText>
            <Typography
              sx={{
                fontSize: "1.0em",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Please wait for Hotpot Restaurant Lee Hotpot -{" "}
              {
                restaurants.find((res: Restaurant) => res.id === restaurantId)
                  ?.address
              }{" "}
              to confirm shortly! Please keep in touch via phone number
              0366012039, email vuthuylinh23082002@gmail.com, and open the
              website to view the response results.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Button
            onClick={() => {
              setOpenDialog(false);
              router.push(`/order/detail-order?orderId=${orderId}`);
            }}
            sx={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const ConfirmModal = () => {
    return (
      <Modal open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              borderBottom: "1px solid #CED5E7",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2em",
                fontWeight: "bold",
                pl: "10px",
                pt: "10px",
                pb: "10px",
              }}
            >
              Are you sure to book this table?
            </Typography>
            <Box flexGrow={1} />
            <IconButton
              onClick={() => {
                setOpenConfirmModal(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              p: 4,
            }}
          >
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Box
                  sx={{
                    border: "1px solid #CED5E7",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.2em",
                      fontWeight: "bold",
                      pl: "10px",
                      pt: "10px",
                    }}
                  >
                    Reserve Info
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon
                        sx={{
                          minWidth: "36px",
                          p: "3px 0",
                          color: "inherit",
                        }}
                      >
                        <RestaurantOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          sx={{
                            fontSize: "1.0em",
                          }}
                        >
                          Restaurant:{" "}
                          {
                            restaurants.find(
                              (res: Restaurant) => res.id === restaurantId
                            )?.name
                          }{" "}
                          -{" "}
                          {
                            restaurants.find(
                              (res: Restaurant) => res.id === restaurantId
                            )?.address
                          }
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon
                        sx={{
                          minWidth: "36px",
                          p: "3px 0",
                          color: "inherit",
                        }}
                      >
                        <AccessTimeOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          sx={{
                            fontSize: "1.0em",
                          }}
                        >
                          Reserve Date: {format(date, "dd-MM-yyyy")}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon
                        sx={{
                          minWidth: "36px",
                          p: "3px 0",
                          color: "inherit",
                        }}
                      >
                        <AccessTimeOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText>
                        Reserve Time:{" "}
                        {format(parse(time, "HH:mm", new Date()), "HH:mm a")}
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon
                        sx={{
                          minWidth: "36px",
                          p: "3px 0",
                          color: "inherit",
                        }}
                      >
                        <PersonOutlineOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText>{numPerson}</ListItemText>
                    </ListItem>
                  </List>
                </Box>
              </Grid>
              <Grid xs={6}>
                <Box
                  sx={{
                    border: "1px solid #CED5E7",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.2em",
                      fontWeight: "bold",
                      pl: "10px",
                      pt: "10px",
                    }}
                  >
                    Customer Info
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon
                        sx={{
                          minWidth: "36px",
                          p: "3px 0",
                          color: "inherit",
                        }}
                      >
                        <PhoneOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText>Phone: {cusPhoneNumber}</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon
                        sx={{
                          minWidth: "36px",
                          p: "3px 0",
                          color: "inherit",
                        }}
                      >
                        <EmailOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText>Email: {cusEmail}</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon
                        sx={{
                          minWidth: "36px",
                          p: "3px 0",
                          color: "inherit",
                        }}
                      >
                        <AccountCircleOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText>Full name: {cusFullName}</ListItemText>
                    </ListItem>
                  </List>
                </Box>
              </Grid>
              <Grid xs={12}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "1.2em",
                      fontWeight: "bold",
                      pl: "10px",
                      pt: "10px",
                    }}
                  >
                    Selected Dishes
                  </Typography>
                  <Box p={5}>
                    <Grid container spacing={1}>
                      {dishes.map((dish, index) =>
                        dish.isSelect ? (
                          <Grid key={index} xs={2}>
                            <Chip
                              label={dish.name + "-" + quantity[index]}
                              variant="outlined"
                              onDelete={() => {
                                dish.isSelect = !dish.isSelect;
                                handleSelected();
                              }}
                              sx={{
                                width: "100%",
                              }}
                            />
                          </Grid>
                        ) : null
                      )}
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderTop: "1px solid #CED5E7",
              padding: "10px",
            }}
          >
            <Button
              onClick={() => {
                setOpenConfirmModal(false);
              }}
              sx={{
                borderRadius: "10px",
                color: "#fff",
                backgroundColor: "#F24643",
                transition: "color 0.3s ease",
                ":hover": {
                  transform: "scale(1.1)",
                  color: "#fff",
                  backgroundColor: "#F24643",
                },
              }}
            >
              Cancel
            </Button>
            <Box flexGrow={1} />
            <Button
              onClick={() => {
                setOpenConfirmModal(false);
                handleBooking();
              }}
              sx={{
                borderRadius: "10px",
                color: "#fff",
                backgroundColor: "#39B97C",
                transition: "color 0.3s ease",
                ":hover": {
                  transform: "scale(1.1)",
                  color: "#fff",
                  backgroundColor: "#39B97C",
                },
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  const handleSelected = () => {
    setIsChecked([]);
    setIsChecked(dishes.map((dish) => dish.isSelect));
  };
  const handleSetQuantity = (index: number, value: number) => {
    let tmp = [...quantity];
    tmp[index] = value;
    setQuantity(tmp);
  };
  const handleSelectedDish = () => {
    let selected: Array<{
      dishId: string;
      quantity: number;
      note: string;
    }> = [];
    dishes.map((dish, index) => {
      if (dish.isSelect) {
        selected.push({
          dishId: dish.id.toString(),
          quantity: quantity[index],
          note: "Ok",
        });
      }
    });
    setSelectedDishes(selected);
  };
  const handleCloseMenu = () => {
    handleSelectedDish();
    setOpenMenu(false);
  };

  const handleBooking = async () => {
    if (!cusFullName) {
      errorNotify("Please enter your full name!");
      return;
    }
    if (!cusPhoneNumber) {
      errorNotify("Please enter your phone number!");
      return;
    }
    if (!cusEmail) {
      errorNotify("Please enter your email!");
      return;
    }
    if (!time) {
      errorNotify("Please choose time!");
      return;
    }
    if (restaurantId === -1) {
      errorNotify("Please choose restaurant!");
      return;
    }

    setIsLoading(true);
    if (selectedDishes.length !== 0) {
      let totalAmount = 0;
      let orderItems: any = [];
      selectedDishes.map((dish) => {
        let tmp: Dish =
          dishes.find((d) => d.id === parseInt(dish.dishId)) ?? ({} as Dish);
        totalAmount += tmp?.price * dish.quantity;
        orderItems.push({
          dishId: parseInt(dish.dishId),
          dishName: tmp?.name,
          total: tmp?.price * dish.quantity,
          quantity: dish.quantity,
        });
      });
      dispatch(
        setOrder({
          order: {
            id: -1,
            resDate: format(date, "yyyy-MM-dd"),
            resTime: time,
            people: numPerson,
            resStatus: "pending",
            depositAmount: totalAmount * 0.3,
            restaurantId: restaurantId,
            fullName: cusFullName,
            phoneNumber: cusPhoneNumber,
            totalAmount: totalAmount,
            createdAt: "",
            updatedAt: "",
            paymentStatus: "pending",
            cusId:  id === -1 ? undefined : id,
            email: cusEmail,
          },
          orderItems: orderItems,
          tables: [],
        })
      );
      setIsLoading(false);
      setOrderId("");
      router.push(`/order/detail-order?orderId=${orderId}`);
    } else {
      let body = {
        id: id === -1 ? undefined : id,
        fullName: cusFullName,
        phoneNumber: cusPhoneNumber,
        resDate: format(date, "yyyy-MM-dd"),
        resTime: time,
        email: cusEmail,
        people: numPerson,
        orderItemArray: selectedDishes,
        restaurantId: restaurantId,
      };
      console.log("🚀 ~ handleBooking ~ body:", body);
      const response = await bookTable(body);
      setIsLoading(false);
      if (response.status !== 201) {
        // Handle error
        errorNotify(response.message);
        return;
      }
      // Handle success
      successNotify("Booking successfully!");
      // setOpenModal(false);
      setOrderId(response.data.id);
      setOpenDialog(true);
    }
  };
  return (
    <>
      <Loading />
      <NotifySuccess />
      <ConfirmModal />
      <Box
        sx={{
          // transform: "translate(-50%, -50%)",
          width: "100%",
          bgcolor: "background.paper",
          height: "100%",
          p: 4,
          borderRadius: "10px",
          marginBottom: "20px",
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
            Reserve Table
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid xs={6} sm={6} md={6}>
            <TextField
              id="standard-basic"
              label="Full name"
              variant="outlined"
              fullWidth
              onChange={(event) => {
                setFullName(event.target.value);
              }}
              value={cusFullName}
            />
          </Grid>
          <Grid xs={6} sm={6} md={6}>
            <TextField
              id="standard-basic"
              label="Phone number"
              variant="outlined"
              fullWidth
              onChange={(event) => {
                setPhoneNumber(event.target.value);
              }}
              value={cusPhoneNumber}
            />
          </Grid>
          <Grid xs={12} sm={12} md={12}>
            <TextField
              id="standard-basic"
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={cusEmail}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              id="date"
              label="Date"
              type="date"
              defaultValue={date.toISOString().split("T")[0]}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              inputProps={{
                min: new Date().toISOString().split("T")[0],
              }}
              onChange={(event) => {
                setDate(new Date(event.target.value));
              }}
            />
          </Grid>
          <Grid xs={4}>
            <Select
              value={timeSlot}
              onChange={(event) => {
                setTime("00:00");
                setTimeSlot(event.target.value);
              }}
              fullWidth
            >
              <MenuItem value={"Bữa trưa"}>Lunch</MenuItem>
              <MenuItem value={"Bữa tối"}>Dinner</MenuItem>
            </Select>
          </Grid>
         
          <Grid xs={4}>
            <Select
              value={time}
              onChange={(event) => {
                setTime(event.target.value);
              }}
              fullWidth
              
            >
              <MenuItem key={-1} value={"00:00"}>
                ----Choose time----
              </MenuItem>
              {timeSlot === "Bữa trưa"
                ? launchTime.map((t, index) => (
                    <MenuItem
                      key={index}
                      value={t.time}
                    >
                      <>{formatTime(t.time)}</>
                    </MenuItem>
                  ))
                : dinnerTime.map((t, index) => (
                    <MenuItem key={index} value={t.time}>
                      <>{formatTime(t.time)}</>
                    </MenuItem>
                  ))}
            </Select>
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              id="standard-basic"
              label="People"
              variant="outlined"
              fullWidth
              type="number"
              onChange={(event) => {
                setNumPerson(parseInt(event.target.value));
              }}
              value={numPerson}
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <Select
              value={restaurantId}
              onChange={(event) => {
                setRestaurantId(Number(event.target.value));
              }}
              fullWidth
            >
              <MenuItem key={-1} value={-1}>
                ----Choose restaurant----
              </MenuItem>
              {restaurants.map((restaurant, index) => (
                <MenuItem key={index} value={restaurant.id}>
                  {restaurant.name} - {restaurant.address}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid xs={12} sm={6} md={6}>
            <Typography
              sx={{
                fontSize: "1.0em",
                fontWeight: "bold",
              }}
            >
              Choose main dishes
            </Typography>
          </Grid>
          {selectedDishes.length > 0 ? (
            <Grid
              xs={12}
              sm={6}
              md={6}
              display={"flex"}
              justifyContent={"center"}
            >
              <Button
                variant="contained"
                sx={{
                  fontSize: "1.0em",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  backgroundColor: "#E6AC0D",
                  ":hover": {
                    backgroundColor: "#AE0001",
                  },
                  textAlign: "center",
                  width: "200px",
                  height: "30px",
                }}
                onClick={() => {
                  setOpenMenu(true);
                }}
              >
                Choose again
              </Button>
            </Grid>
          ) : (
            <Grid
              xs={12}
              sm={6}
              md={6}
              display={"flex"}
              justifyContent={"center"}
            >
              <Button
                variant="contained"
                sx={{
                  fontSize: "1.0em",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  backgroundColor: "#E6AC0D",
                  ":hover": {
                    backgroundColor: "#AE0001",
                  },
                  textAlign: "center",
                  width: "200px",
                  height: "30px",
                }}
                onClick={() => {
                  setOpenMenu(true);
                }}
              >
                Choose now
              </Button>
            </Grid>
          )}
          {selectedDishes.length > 0 ? (
            <>
              {dishes.map((dish, index) =>
                dish.isSelect ? (
                  <>
                    <Grid key={index} xs={4} sm={4} md={4}>
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        width={60}
                        height={60}
                      />
                    </Grid>
                    <Grid key={index} xs={4} sm={4} md={4}>
                      <Typography
                        sx={{
                          fontSize: "1.0em",
                          fontWeight: "bold",
                        }}
                      >
                        {dish.name}
                      </Typography>
                    </Grid>
                    <Grid key={index} xs={4} sm={4} md={4}>
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
                  </>
                ) : null
              )}
            </>
          ) : (
            <>
              <Grid
                xs={12}
                sm={12}
                md={12}
                lg={12}
                display={"flex"}
                justifyContent={"center"}
              >
                <Typography>
                  Choosing the main dish first will help you save more time!
                </Typography>
              </Grid>
            </>
          )}

          <Grid xs={12} sm={12} md={12}>
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
                  marginBottom: "20px",
                  backgroundColor: "#E6AC0D",
                  ":hover": {
                    backgroundColor: "#AE0001",
                  },
                  textAlign: "center",
                  width: "200px",
                  height: "50px",
                }}
                onClick={() => {
                  // handleBooking();
                  setOpenConfirmModal(true);
                }}
              >
                Reserve now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Modal open={openMenu} onClose={handleCloseMenu}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            //   border: "2px solid #000",
            //   boxShadow: 24,

            p: 4,
            borderRadius: "10px",
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
              Choose dish
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Grid container>
              <Grid xs={3}></Grid>
              <Grid xs={3}>Name</Grid>
              <Grid xs={3}>Price</Grid>
              <Grid xs={2}></Grid>

              <Grid xs={1}></Grid>
            </Grid>
            <Box
              sx={{
                height: "55vh", // Adjust this value as needed
                overflowY: "auto", // Makes the Grid scrollable vertically
                marginTop: "10px",
              }}
            >
              {dishes.map((dish, index) => (
                <Box
                  key={index}
                  p={2}
                  sx={{
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <Grid
                    container
                    spacing={1}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Grid xs={3}>
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        width={60}
                        height={60}
                      />
                    </Grid>

                    <Grid xs={3}>
                      <Typography
                        sx={{
                          fontSize: "1.0em",
                          fontWeight: "bold",
                        }}
                      >
                        {dish.name}
                      </Typography>
                    </Grid>

                    <Grid xs={3}>
                      <Typography
                        sx={{
                          fontSize: "1.0em",
                          fontWeight: "bold",
                          fontStyle: "italic",
                          color: "#AE0001",
                        }}
                      >
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(dish.price || 0)}
                      </Typography>
                    </Grid>
                    <Grid xs={2}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
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
                          disabled={!isChecked[index]}
                        />
                      </Box>
                    </Grid>
                    <Grid xs={1}>
                      <Checkbox
                        checked={isChecked[index]}
                        onChange={(event) => {
                          dish.isSelect = event.target.checked;
                          handleSelected();
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
          </Box>
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
              onClick={handleCloseMenu}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ReserveComponent;
