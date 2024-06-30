/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox,
  CircularProgress,
  Card,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useAppSelector } from "@/redux/hooks";
import { format } from "date-fns";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useCustomer from "@/controllers/useCustomer";
import useNotify from "@/hooks/useNotify";
import CloseIcon from "@mui/icons-material/Close";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
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

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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
  id: string;
  name: string;
  numPerson: number;
  status: boolean;
};

const DetailRestaurant = () => {
  const { successNotify, errorNotify } = useNotify();
  const [openDialog, setOpenDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
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
  const { id, fullName, phoneNumber } = useAppSelector(
    (state) => state.profile
  );

  const [value, setValue] = useState(0);
  const [cusFullName, setFullName] = useState(fullName);
  const [cusPhoneNumber, setPhoneNumber] = useState(phoneNumber);
  const [date, setDate] = useState<Date>(new Date());
  const [email, setEmail] = useState("");
  const [timeSlot, setTimeSlot] = useState("Bữa trưa");
  const [numPerson, setNumPerson] = useState(1);
  const [time, setTime] = useState("");
  const [tableId, setTableId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tables, setTables] = useState<Table[]>([]);
  const router = useRouter();
  const [quantity, setQuantity] = useState<number[]>(dishes.map(() => 1));
  const restaurantId = router.query.restaurantId;
  const [orderId, setOrderId] = useState("");
  const {
    getDetailRestaurantById,
    getTableAvailable,
    bookTable,
    getAllDishes,
  } = useCustomer();

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
              {restaurant.address} to confirm shortly! Please keep in touch via
              phone number 0366012039, email vuthuylinh23082002@gmail.com, and
              open the website to view the response results.
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

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      const response = await getDetailRestaurantById({ id: restaurantId });
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
  }, [restaurantId]);
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
      });
      setDishes(tmp);
      setQuantity(tmp.map(() => 1));
    };
    fetchDishes();
  }, []);
  useEffect(() => {
    const fetchAvailableTables = async () => {
      let body = {
        resDate: format(date, "yyyy-MM-dd"),
        resTime: time,
        people: numPerson,
        restaurantId: restaurantId,
      };
      const response = await getTableAvailable(body);
      if (response.status !== 200) {
        // Handle error
        return;
      }
      let tmp: Table[] = [];
      response.data.map((table: any) =>
        tmp.push({
          id: table.id,
          name: table.name,
          numPerson: table.capacity,
          status: table.isOccupied,
        })
      );
      setTables(tmp);
    };
    if (date && time && numPerson) {
      fetchAvailableTables();
    }
  }, [date, time, numPerson]);
  const handleClick = () => {
    // if (id === -1) {
    //   setOpenDialog(true);
    // } else {
    //   setOpenModal(true);
    // }
    setOpenModal(true);
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
    setIsLoading(true);
    let body = {
      fullName: cusFullName,
      phoneNumber: cusPhoneNumber,
      tableId: tableId,
      resDate: format(date, "yyyy-MM-dd"),
      resTime: time,
      email: email,
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
    setOpenModal(false);
    setOrderId(response.data.id);
    setOpenDialog(true);
  };
  return (
    <>
      <Loading />
      <NotifySuccess />
      <Grid container spacing={2}>
        <Grid xs={8} display={"flex"} flexDirection={"column"}>
          <Image
            src={restaurant!.resImage}
            alt={restaurant!.resName}
            width={512}
            height={384}
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#eee",
              borderRadius: "10px",
            }}
          />
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "100%",
              marginTop: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5em",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#AE0001",
              }}
            >
              {restaurant!.resName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <FmdGoodIcon />
              <Typography
                sx={{
                  fontSize: "1.0em",
                  fontWeight: "bold",
                }}
              >
                {restaurant!.address}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "1.0em",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Description: Lorem ipsum dolor sit amet, consectetur adipiscing
            </Typography>
            <Typography
              sx={{
                fontSize: "1.0em",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Average price: 600 $
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={(event: React.SyntheticEvent, newValue: number) => {
                  setValue(newValue);
                }}
                aria-label="basic tabs example"
              >
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              Item One
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Item Two
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              Item Three
            </CustomTabPanel>
          </Box>
        </Grid>
        <Grid xs={4}>
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
              width: "60%",
              height: "50px",
              marginLeft: "20px",
            }}
            // width={414}
            // height={176}
            onClick={handleClick}
          >
            Reserve Now
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
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
              Reserve Table
            </Typography>
          </Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            sx={{
              maxHeight: "70vh", // Adjust this value as needed
              overflowY: "auto",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
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
                value={email}
              />
            </Grid>
            <Grid xs={4} sm={4} md={4}>
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
            <Grid xs={4} sm={4} md={4}>
              <Select
                value={timeSlot}
                onChange={(event) => {
                  setTimeSlot(event.target.value);
                }}
                fullWidth
              >
                <MenuItem value={"Bữa trưa"}>Lunch</MenuItem>
                <MenuItem value={"Bữa tối"}>Dinner</MenuItem>
              </Select>
            </Grid>
            <Grid xs={4} sm={4} md={4}>
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
            <Grid xs={12} sm={12} md={12}>
              <Typography
                sx={{
                  fontSize: "1.0em",
                  fontWeight: "bold",
                }}
              >
                Choose time
              </Typography>
            </Grid>
            {timeSlot === "Bữa trưa"
              ? launchTime.map((t, index) => (
                  <Grid key={index} xs={6} sm={3} md={3}>
                    <Button
                      onClick={() => {
                        setTime(t.time);
                      }}
                      variant="outlined"
                      fullWidth
                      sx={{
                        color: time === t.time ? "#fff" : "black",
                        borderColor: "black",
                        backgroundColor: time === t.time ? "#AE0001" : "#fff",
                        ":hover": {
                          backgroundColor: "#AE0001",
                          color: "#fff",
                        },
                      }}
                    >
                      {t.time}
                    </Button>
                  </Grid>
                ))
              : dinnerTime.map((t, index) => (
                  <Grid key={index} xs={6} sm={3} md={3}>
                    <Button
                      onClick={() => {
                        setTime(t.time);
                      }}
                      variant="outlined"
                      fullWidth
                      sx={{
                        color: time === t.time ? "#fff" : "black",
                        borderColor: "black",
                        backgroundColor: time === t.time ? "#AE0001" : "#fff",
                        ":hover": {
                          backgroundColor: "#AE0001",
                          color: "#fff",
                        },
                      }}
                    >
                      {t.time}
                    </Button>
                  </Grid>
                ))}
            {/* <Grid xs={2} sm={12} md={12}>
              <Typography
                sx={{
                  fontSize: "1.0em",
                  fontWeight: "bold",
                }}
              >
                Chọn bàn
              </Typography>
            </Grid>
            {tables.map((table, index) =>
              numPerson <= table.numPerson && table.status == false ? (
                <Grid key={index} xs={2} sm={3} md={3}>
                  <Button
                    onClick={() => {
                      setTableId(table.id);
                    }}
                    variant="outlined"
                    fullWidth
                    sx={{
                      color: tableId === table.id ? "#fff" : "black",
                      borderColor: "black",
                      backgroundColor:
                        tableId === table.id ? "#AE0001" : "#fff",
                      ":hover": {
                        backgroundColor: "#AE0001",
                        color: "#fff",
                      },
                    }}
                  >
                    {table.name}
                  </Button>
                </Grid>
              ) : null
            )}
            <Grid xs={12} sm={12} md={12}></Grid> */}
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
                          {dish.price} $
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
          </Grid>
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
                handleBooking();
              }}
            >
              Reserve now
            </Button>
          </Box>
        </Box>
      </Modal>
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
                      alt={dish.name}
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
                      {dish.name}
                    </Typography>
                  </Grid>

                  <Grid key={index} xs={3} sm={3} md={3}>
                    <Typography
                      sx={{
                        fontSize: "1.0em",
                        fontWeight: "bold",
                      }}
                    >
                      {dish.price} VND
                    </Typography>
                  </Grid>
                  <Grid key={index} xs={2} sm={2} md={2}>
                    <TextField
                      id="standard-basic"
                      label="Quantity"
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
                        dish.isSelect = event.target.checked;
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

export default DetailRestaurant;
