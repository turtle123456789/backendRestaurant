import { Box, Button, Card, Modal, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import React from "react";

type Dish = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};
const dish: Dish = {
  id: 1,
  name: "Chicken Curry",
  price: 12.99,
  description: "Delicious chicken curry with rice",
  image: "https://example.com/images/chicken_curry.jpg",
  category: "Main Course",
};

const UpdateDishComponent = () => {
  const [selectFile, setSelectFile] = React.useState<File | null>(null);
  const [longPressTimeout, setLongPressTimeout] = React.useState<number | null>(
    null
  );
  const [dishName, setDishName] = React.useState<string>(dish.name);
  const [dishCategory, setDishCategory] = React.useState<string>(
    dish.category
  );
  const [dishPrice, setDishPrice] = React.useState<number>(dish.price);
    const [dishDescription, setDishDescription] = React.useState<string>(
        dish.description
    );
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(
    dish.image
  );
  const [open, setOpen] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDisable, setIsDisable] = React.useState<boolean>(true);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMouseDown = () => {
    setLongPressTimeout(window.setTimeout(handleButtonClick, 1000)); // Long press is 1 second
  };

  const handleMouseUp = () => {
    if (longPressTimeout !== null) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }
  };

  const handleMouseLeave = () => {
    if (longPressTimeout !== null) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDishName(event.target.value);
  };
  const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDishDescription(event.target.value);
  };
    const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDishCategory(event.target.value);
    };

    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDishPrice(Number(event.target.value));
    }

  React.useEffect(() => {
    setIsDisable(true);
    if (
      (dishName !== dish.name ||
        dishCategory !== dish.category ||
        dishPrice !== dish.price ||
        dishDescription !== dish.description
        ) &&
      dishName &&
      dishCategory &&
      dishDescription &&
      dishPrice ||
      selectFile
    ) {
      setIsDisable(false);
    }
  }, [dishName, dishCategory, dishPrice, dishDescription, selectFile]);
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Card
        sx={{
          // justifyContent: "center",
          height: "100%",
          width: "60%",
          padding: "20px",
          // boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', // Add this line
        }}
      >
        <Grid container spacing={2}>
          <>
            <Grid
              xs={4}
              sm={4}
              md={4}
              lg={4}
              alignItems={"center"}
              display={"flex"}
            >
              <Typography>Dish&apos;s Name</Typography>
            </Grid>
            <Grid xs={8} sm={8} md={8} lg={8}>
              <TextField
                placeholder="Dish&apos;s Name"
                variant="outlined"
                fullWidth
                required
                value={dishName}
                onChange={handleChangeName}
              />
            </Grid>
            <Grid
              xs={4}
              sm={4}
              md={4}
              lg={4}
              alignItems={"center"}
              display={"flex"}
            >
              <Typography>Category</Typography>
            </Grid>
            <Grid xs={8} sm={8} md={8} lg={8}>
              <TextField
                placeholder="Category"
                variant="outlined"
                fullWidth
                required
                value={dishCategory}
                onChange={handleChangeCategory}
              />
            </Grid>
            <Grid
              xs={4}
              sm={4}
              md={4}
              lg={4}
              alignItems={"center"}
              display={"flex"}
            >
              <Typography>Price</Typography>
            </Grid>
            <Grid xs={8} sm={8} md={8} lg={8}>
              <TextField
                placeholder="Price"
                variant="outlined"
                fullWidth
                required
                value={dishPrice}
                onChange={handleChangePrice}
              />
            </Grid>
            <Grid
              xs={4}
              sm={4}
              md={4}
              lg={4}
              alignItems={"center"}
              display={"flex"}
            >
              <Typography>Description</Typography>
            </Grid>
            <Grid xs={8} sm={8} md={8} lg={8}>
              <TextField
                placeholder="Description"
                variant="outlined"
                fullWidth
                required
                value={dishDescription}
                onChange={handleChangeDescription}
              />
            </Grid>
            
            <Grid
              xs={4}
              sm={4}
              md={4}
              lg={4}
              alignItems={"center"}
              display={"flex"}
            >
              <Typography>Restaurant Image</Typography>
            </Grid>
            <Grid
              xs={8}
              sm={8}
              md={8}
              lg={8}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {previewUrl ? (
                <Box
                  onClick={handleOpen}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={320}
                    height={240}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    width: 320,
                    height: 240,
                    border: "1px dashed gray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onDoubleClick={handleButtonClick}
                >
                  Double click to select an image
                </Box>
              )}
              <Modal
                open={open}
                onClose={handleClose}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <>
                  {previewUrl && (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={480}
                      height={360}
                    />
                  )}
                </>
              </Modal>
            </Grid>
            <Grid
              xs={6}
              sm={6}
              md={6}
              lg={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => {}}
                variant="contained"
                sx={{ width: 200, height: 50, marginTop: 5 }}
                type="submit"
                disabled={isDisable}
              >
                Update Dish
              </Button>
            </Grid>
            <Grid
              xs={6}
              sm={6}
              md={6}
              lg={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => {}}
                variant="contained"
                sx={{
                  width: 200,
                  height: 50,
                  marginTop: 5,
                  backgroundColor: "red",
                  ":hover": { backgroundColor: "red" },
                }}
                type="submit"
              >
                Delete Dish
              </Button>
            </Grid>
          </>
        </Grid>
      </Card>
    </Box>
  );
};
export default UpdateDishComponent;
