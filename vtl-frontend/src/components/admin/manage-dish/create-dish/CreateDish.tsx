/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Card,
  Menu,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import React from "react";
import useAdmin from "@/controllers/useAdmin";
import useHelper from "@/hooks/useHelper";
import useNotify from "@/hooks/useNotify";
type Category = {
  id: number;
  name: string;
  description: string;
};
const CreateDishComponent = () => {
  const [selectFile, setSelectFile] = React.useState<File | null>(null);
  const [longPressTimeout, setLongPressTimeout] = React.useState<number | null>(
    null
  );
  const [categories, setCategories] = React.useState<Category[]>([]);

  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [dishName, setDishName] = React.useState<string>("");
  const [nameError, setNameError] = React.useState<boolean>(false);
  const [category, setCategory] = React.useState<string>("-1");
  const [categoryError, setCategoryError] = React.useState<boolean>(false);
  const [price, setPrice] = React.useState<string>("");
  const [priceError, setPriceError] = React.useState<boolean>(false);
  const [description, setDescription] = React.useState<string>("");
  const [image, setImage] = React.useState<string>("");
  const [messageError1, setMessageError1] = React.useState<string>("");
  const [messageError2, setMessageError2] = React.useState<string>("");
  const [messageError3, setMessageError3] = React.useState<string>("");
  const { createDish, getAllCategories } = useAdmin();
  const { toBase64 } = useHelper();
  const { successNotify, errorNotify } = useNotify();

  React.useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategories();
      if (response.status === 200) {
        setCategories(response.data);
      }
    };
    fetchCategories();
  }, []);

  const validateName = () => {
    if (dishName === "") {
      setNameError(true);
      setMessageError1("Dish's Name is required");
      return false;
    }
    setNameError(false);
    setMessageError1("");
    return true;
  };

  const validateCategory = () => {
    if (category === "") {
      setCategoryError(true);
      setMessageError2("Category is required");
      return false;
    }
    setCategoryError(false);
    setMessageError2("");
    return true;
  };

  const validatePrice = () => {
    if (price === "") {
      setPriceError(true);
      setMessageError3("Price is required");
      return false;
    }
    setPriceError(false);
    setMessageError3("");
    return true;
  };

  const validate = () => {
    const name = validateName();
    const category = validateCategory();
    const price = validatePrice();
    return name && category && price && selectFile !== null;
  };

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

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }
    const base64 = await toBase64(selectFile as File);
    const data = {
      name: dishName,
      categoryId: category,
      price: price,
      description: description,
      image: base64,
    };
    let response = await createDish(data);
    // console.log("🚀 ~ handleSubmit ~ response:", response)

    if (response.status !== 201) {
      errorNotify(response.message);
      return;
    }
    successNotify("Create dish successfully");
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
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
              placeholder="Dish's Name"
              variant="outlined"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              error={nameError}
              helperText={messageError1}
              fullWidth
              required
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
            <Select
              variant="outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              error={categoryError}
              fullWidth
              required
            >
              <MenuItem value="-1" disabled>
                Select Category
              </MenuItem>
              {categories.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={priceError}
              helperText={messageError3}
              fullWidth
              required
              type="number"
              inputProps={{
                min: 0,
              }}
              
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              fullWidth
              required
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
            <Typography>Dish&apos;s Image</Typography>
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
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ width: 200, height: 50, marginTop: 5 }}
              type="submit"
            >
              Create Dish
            </Button>
          </Grid>
        </>
      </Grid>
    </Box>
  );
};
export default CreateDishComponent;
