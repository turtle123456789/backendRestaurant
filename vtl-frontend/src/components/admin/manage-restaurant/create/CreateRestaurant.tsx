import { useAppSelector } from "@/redux/hooks";
import useHelper from "@/hooks/useHelper";
import useAdmin from "@/controllers/useAdmin";
import {
  Box,
  Button,
  Card,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import Image from "next/image";
import React from "react";
import useNotify from "@/hooks/useNotify";

type CreateRestaurantProps = {
  onClose: () => void;
};

const CreateRestaurant = ({ onClose }: CreateRestaurantProps) => {
  const { roleId } = useAppSelector((state) => state.profile);
  React.useEffect(() => {
    if (roleId === -1) {
      window.location.href = "/admin/login";
    }
  }, [roleId]);
  const [selectFile, setSelectFile] = React.useState<File | null>(null);
  const [resName, setResName] = React.useState<string>("");
  const [nameError, setNameError] = React.useState<boolean>(false);
  const [province, setProvince] = React.useState<string>("");
  const [provinceError, setProvinceError] = React.useState<boolean>(false);
  const [resAddress, setResAddress] = React.useState<string>("");
  const [addressError, setAddressError] = React.useState<boolean>(false);
  const [latitude, setLatitude] = React.useState<string>("");
  const [latitudeError, setLatitudeError] = React.useState<boolean>(false);
  const [longitude, setLongitude] = React.useState<string>("");
  const [longitudeError, setLongitudeError] = React.useState<boolean>(false);
  const [messageError1, setMessageError1] = React.useState<string>("");
  const [messageError2, setMessageError2] = React.useState<string>("");
  const [messageError3, setMessageError3] = React.useState<string>("");
  const [messageError4, setMessageError4] = React.useState<string>("");
  const [messageError5, setMessageError5] = React.useState<string>("");
  const [longPressTimeout, setLongPressTimeout] = React.useState<number | null>(
    null
  );
  const helper = useHelper();
  const admin = useAdmin();
  const { successNotify, errorNotify } = useNotify();
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const validateName = () => {
    if (resName === "") {
      setNameError(true);
      setMessageError1("Restaurant name is required");
      return false;
    }
    setNameError(false);
    setMessageError1("");
    return true;
  };

  const validateProvince = () => {
    if (province === "") {
      setProvinceError(true);
      setMessageError2("Province is required");
      return false;
    }
    setProvinceError(false);
    setMessageError2("");
    return true;
  };

  const validateAddress = () => {
    if (resAddress === "") {
      setAddressError(true);
      setMessageError3("Restaurant address is required");
      return false;
    }
    setAddressError(false);
    setMessageError3("");
    return true;
  };

  const validateLatitude = () => {
    if (latitude === "") {
      setLatitudeError(true);
      setMessageError4("Latitude is required");
      return false;
    }
    setLatitudeError(false);
    setMessageError4("");
    return true;
  };

  const validateLongitude = () => {
    if (longitude === "") {
      setLongitudeError(true);
      setMessageError5("Longitude is required");
      return false;
    }
    setLongitudeError(false);
    setMessageError5("");
    return true;
  };

  const validateForm = () => {
    return (
      validateName() &&
      validateProvince() &&
      validateAddress() &&
      validateLatitude() &&
      validateLongitude()
    );
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      let image = await helper.toBase64(selectFile!);
      const body = {
        name: resName,
        provinceId: province,
        address: resAddress,
        latitude: latitude,
        longitude: longitude,
        image: image,
      };
      console.log("🚀 ~ handleSubmit ~ body", body);
      // await admin.createRestaurant(body);
      let response = await admin.createNewRestaurant(body);
      if (response.status === 200) {
        successNotify("Create restaurant successfully");
        onClose();
      } else {
        errorNotify(response.message);
      }
    }
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <>
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
              <Typography>Restaurant Name</Typography>
            </Grid>
            <Grid xs={8} sm={8} md={8} lg={8}>
              <TextField
                placeholder="Restaurant Name"
                variant="outlined"
                value={resName}
                onChange={(e) => {
                  setResName(e.target.value);
                }}
                fullWidth
                error={nameError}
                helperText={messageError1}
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
              <Typography>Province</Typography>
            </Grid>
            <Grid xs={8} sm={8} md={8} lg={8}>
              <TextField
                placeholder="Province"
                variant="outlined"
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                }}
                error={provinceError}
                helperText={messageError2}
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
              <Typography>Restaurant Address</Typography>
            </Grid>
            <Grid xs={8} sm={8} md={8} lg={8}>
              <TextField
                placeholder="Restaurant Address"
                variant="outlined"
                value={resAddress}
                onChange={(e) => {
                  setResAddress(e.target.value);
                }}
                error={addressError}
                helperText={messageError3}
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
              <Typography>Coordinates</Typography>
            </Grid>
            <Grid xs={4} sm={4} md={4} lg={4}>
              <TextField
                placeholder="Latitude"
                variant="outlined"
                value={latitude}
                onChange={(e) => {
                  setLatitude(e.target.value);
                }}
                error={latitudeError}
                helperText={messageError4}
                fullWidth
                required
              />
            </Grid>
            <Grid xs={4} sm={4} md={4} lg={4}>
              <TextField
                placeholder="Longitude"
                variant="outlined"
                value={longitude}
                onChange={(e) => {
                  setLongitude(e.target.value);
                }}
                error={longitudeError}
                helperText={messageError5}
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
                Create Restaurant
              </Button>
            </Grid>
          </>
        </Grid>
      </>
    </Box>
  );
};

export default CreateRestaurant;
