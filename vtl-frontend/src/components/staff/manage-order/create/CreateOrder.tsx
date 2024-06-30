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
  Card,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { useAppSelector } from "@/redux/hooks";
import { format } from "date-fns";
import React from "react";
import useStaff from "@/controllers/useStaff";
import useNotify from "@/hooks/useNotify";

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
const CreateOrder = () => {
  const { successNotify, errorNotify } = useNotify();
  const { restaurantId } = useAppSelector((state) => state.profile);
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
  const [cusFullName, setFullName] = useState("");
  const [cusPhoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [timeSlot, setTimeSlot] = useState("Bữa trưa");
  const [numPerson, setNumPerson] = useState(1);
  const [time, setTime] = useState(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  });
  const [tableId, setTableId] = useState<string[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const { getAllDishes, getAvailableTable, createNewOrder } = useStaff();
  const [quantity, setQuantity] = useState<number[]>(dishes.map(() => 1));
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
          numPerson: table.capacity,
          status: table.isOccupied,
        })
      );
      setTables(tmp);
    };
    if (numPerson) {
      fetchAvailableTables();
    }
  }, [numPerson]);

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
    let body = {
      fullName: cusFullName ?? "",
      phoneNumber: cusPhoneNumber ?? "",
      resDate: format(date, "yyyy-MM-dd"),
      resTime: time,
      people: numPerson,
      orderItemArray: selectedDishes,
      restaurantId: restaurantId,
      tables: tableId,
    };
    console.log("🚀 ~ handleBooking ~ body:", body);
    const response = await createNewOrder(body);
    console.log("🚀 ~ handleBooking ~ response:", response)
    if (response.status !== 201) {
      // Handle error
      errorNotify(response.message);
      setOpenModal(false);
      return;
    }
    // Handle success
    successNotify("Booking successfully!");
    setTables([]);
    setPhoneNumber("");
    setFullName("");
    setNumPerson(1);
    setIsChecked(dishes.map(() => false));
    setSelectedDishes([]);
    let tmp = dishes;
    isChecked.forEach((value,index) => tmp[index].isSelect = value);
    setDishes(tmp);
    setOpenModal(false);
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            maxHeight: "70vh", // Adjust this value as needed
            overflowY: "auto", // Makes the Grid scrollable vertically
          }}
        >
          <Grid xs={2} sm={6} md={6}>
            <TextField
              id="standard-basic"
              label="Full Name"
              variant="outlined"
              fullWidth
              onChange={(event) => {
                setFullName(event.target.value);
              }}
              value={cusFullName}
            />
          </Grid>
          <Grid xs={2} sm={6} md={6}>
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
          <Grid xs={2} sm={4} md={4}>
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
              disabled={true}
            />
          </Grid>
          <Grid xs={2} sm={4} md={4}>
            <TextField
              id="time"
              label="Time"
              type="time"
              defaultValue={time}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              onChange={(event) => {
                setTime(event.target.value);
              }}
              disabled={true}
            />
          </Grid>
          <Grid xs={2} sm={4} md={4}>
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

          <Grid xs={12} sm={12} md={12}>
            <Typography
              sx={{
                fontSize: "1.0em",
                fontWeight: "bold",
              }}
            >
              Choose table
            </Typography>
          </Grid>
          {tables.map((table, index) =>
            numPerson === table.numPerson && table.status == false ? (
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
            ) : null
          )}
          <Grid xs={12} sm={12} md={12}></Grid>
          <Grid xs={2} sm={6} md={6}>
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
              xs={2}
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
              xs={2}
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

export default CreateOrder;
