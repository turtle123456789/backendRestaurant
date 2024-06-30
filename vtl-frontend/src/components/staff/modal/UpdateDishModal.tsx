import { Box, Button, Card, Checkbox, Modal, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/legacy/image";
import { useState } from "react";

type UpdateDishModalProps = {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  selectedDishes: Dish[];
  quantity: number[];
  handleSetQuantity: (index: number, value: number) => void;
  handleSelected: () => void;
  handleCloseMenu: () => void;
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
const UpdateDishModal = ({
  openMenu,
  setOpenMenu,
  selectedDishes,
  quantity,
  handleSetQuantity,
  handleSelected,
  handleCloseMenu,
}: UpdateDishModalProps) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isChecked, setIsChecked] = useState<boolean[]>(
    []
  );
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
          width: "60%",
          height: "80%",
          backgroundColor: "#fff",
          border: "2px solid #000",
          padding: "20px",
          borderRadius: "10px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
                    {dish.price} $
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
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
