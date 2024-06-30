import useAdmin from "@/controllers/useAdmin";
import { useAppSelector } from "@/redux/hooks";
import { Cancel, Save } from "@mui/icons-material";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import useNotify from "@/hooks/useNotify";
import Grid from "@mui/material/Unstable_Grid2";
import useHelper from "@/hooks/useHelper";
import Image from "next/image";
import React from "react";

type ResCard = {
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

type UpdateResProps = {
  restaurant: ResCard;
  onClose: () => void;
};

const UpdateRes = ({ restaurant, onClose }: UpdateResProps) => {
  const { roleId } = useAppSelector((state) => state.profile);
  const { editRestaurant } = useAdmin();
  const { toBase64 } = useHelper();
  const { successNotify, errorNotify } = useNotify();

  React.useEffect(() => {
    if (roleId !== 1) {
      window.location.href = "/admin/login";
    }
  }, [roleId]);
  const [selectFile, setSelectFile] = React.useState<File | null>(null);
  const [longPressTimeout, setLongPressTimeout] = React.useState<number | null>(
    null
  );
  const [resName, setResName] = React.useState<string>(restaurant.resName);
  const [resAddress, setResAddress] = React.useState<string>(
    restaurant.address
  );
  const [latitude, setLatitude] = React.useState<string>(
    restaurant.coordinates.lat
  );
  const [longitude, setLongitude] = React.useState<string>(
    restaurant.coordinates.lng
  );
  const [resProvince, setResProvince] = React.useState<string>(
    restaurant.province
  );
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(
    restaurant.resImage
  );
  const [open, setOpen] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
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
    setResName(event.target.value);
  };
  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResAddress(event.target.value);
  };
  const handleChangeLatitude = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(event.target.value);
  };
  const handleChangeLongitude = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLongitude(event.target.value);
  };
  const handleChangeProvince = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResProvince(event.target.value);
  };

  const handleUpdate = async () => {
    const base64 = selectFile
      ? await toBase64(selectFile as File)
      : null;
    let body = {
      id: restaurant.id,
      name: resName,
      address: resAddress,
      provinceId: resProvince,
      latitude: latitude,
      longitude: longitude,
      image: base64,
    };
    const response = await editRestaurant(body);
    if (response.status === 200) {
      successNotify("Update restaurant successfully");
      onClose();
      return;
    }
    errorNotify(response.message);
  };

  return (
    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Typography variant="h4">Update Restaurant</Typography>
        <Box flexGrow={1} />
        <Button
          variant="outlined"
          sx={{
            borderRadius: "5px",
            borderColor: "red",
            color: "red",
            p: 1,
            ":hover": {
              color: "white",
              backgroundColor: "red",
            },
          }}
          startIcon={<Cancel />}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Box flexGrow={0.05} />
        <Button
          variant="outlined"
          sx={{
            borderRadius: "5px",
            borderColor: "green",
            color: "green",
            p: 1,
            ":hover": {
              color: "white",
              backgroundColor: "green",
            },
          }}
          startIcon={<Save />}
          onClick={handleUpdate}
        >
          Save
        </Button>
      </Box>
      <Box p={2}>
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
                fullWidth
                required
                value={resName}
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
              <Typography>Province</Typography>
            </Grid>
            <Grid xs={8} sm={8} md={8} lg={8}>
              <TextField
                placeholder="Province"
                variant="outlined"
                fullWidth
                required
                value={resProvince}
                onChange={handleChangeProvince}
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
                fullWidth
                required
                value={resAddress}
                onChange={handleChangeAddress}
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
                fullWidth
                required
                value={latitude}
                onChange={handleChangeLatitude}
              />
            </Grid>
            <Grid xs={4} sm={4} md={4} lg={4}>
              <TextField
                placeholder="Longitude"
                variant="outlined"
                fullWidth
                required
                value={longitude}
                onChange={handleChangeLongitude}
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
          </>
        </Grid>
      </Box>
    </Box>
  );
};

export default UpdateRes;
