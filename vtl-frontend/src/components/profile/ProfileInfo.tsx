/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Edit from "@mui/icons-material/Edit";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import useAuth from "@/controllers/useAuth";
import useNotify from "@/hooks/useNotify";
import useHelper from "@/hooks/useHelper";
import { setProfile } from "@/redux/profile/profileSlice";
import LoadingModal from "@/common/loading/LoadingModal";

const ProfileInfo = () => {
  const [selectFile, setSelectFile] = useState<File | null>(null);
  const [editInfo, setEditInfo] = useState<boolean>(false);
  const { image, fullName, email, phoneNumber, id } = useAppSelector(
    (state) => state.profile
  );
  const [previewUrl, setPreviewUrl] = useState<string>(
    image === "" ? "/images/profile/user-1.jpg" : image
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [newFullName, setNewFullName] = useState<string>(fullName);
  const [newEmail, setNewEmail] = useState<string>(email);
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>(phoneNumber);
  const { update } = useAuth();
  const { successNotify, errorNotify } = useNotify();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const helper = useHelper();

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

  useEffect(() => {
    setLoading(true);
    handleEditAvatar();
    setLoading(false);
  }, [selectFile]);

  const handleUpdateProfile = async () => {
    setLoading(true);
    let body: {
      id: number;
      fullName?: string;
      email?: string;
      phoneNumber?: string;
    } = {
      id: id,
      fullName: newFullName === fullName ? undefined : newFullName,
      email: newEmail === email ? undefined : newEmail,
      phoneNumber: newPhoneNumber === phoneNumber ? undefined : newPhoneNumber,
    };
    const response = await update(body);
    setLoading(false);
    if (response.status !== 200) {
      errorNotify(response.message);
      return;
    }
    let base64Image = "";
    if (response.data.image) {
      const imageBuffer = response.data.image.data;
      base64Image = atob(Buffer.from(imageBuffer).toString("base64"));
    }
    response.data.image = base64Image;
    successNotify("Update profile successfully");
    dispatch(setProfile(response.data));
    setEditInfo(false);
  };

  const handleEditAvatar = async () => {
    if (selectFile) {
      let tmp = await helper.toBase64(selectFile);
      const response = await update({
        id: id,
        image: tmp,
      });
      if (response.status !== 200) {
        errorNotify(response.message);
        return;
      }
      console.log("🚀 ~ handleEditAvatar ~ response.data:", response.data);
      successNotify("Update profile successfully");
      dispatch(setProfile(response.data));
    }
  };
  return (
    <>
      <LoadingModal open={loading} />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          bgcolor: "#fff",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Avatar
            src={previewUrl}
            alt="Avatar"
            sx={{
              width: 150,
              height: 150,
            }}
          />
          <Button variant="text" endIcon={<Edit />} onClick={handleButtonClick}>
            Edit Avatar
          </Button>
        </Box>
        <Box
          sx={{
            border: "2px solid #f0f0f0",
            borderRadius: 2,
            width: {
              xs: "80%",
              md: "50%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              p: 1,
            }}
          >
            <Typography variant="h5" sx={{ p: 1 }}>
              Profile Information
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              p: 1,
            }}
          >
            <Typography variant="h6" sx={{ width: 150 }}>
              Full Name:
            </Typography>

            <TextField
              value={newFullName}
              placeholder="Full Name"
              onChange={(e) => setNewFullName(e.target.value)}
              disabled={!editInfo}
              sx={{
                width: "60%",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              p: 1,
            }}
          >
            <Typography variant="h6" sx={{ width: 150 }}>
              Email:
            </Typography>

            <TextField
              value={newEmail}
              placeholder="Email"
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={!editInfo}
              sx={{
                width: "60%",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              p: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                width: 150,
              }}
            >
              Phone Number:
            </Typography>

            <TextField
              value={newPhoneNumber}
              placeholder="Phone Number"
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              disabled={!editInfo}
              sx={{
                width: "60%",
              }}
            />
          </Box>
        </Box>
        {editInfo ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              p: 1,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                m: 1,
                backgroundColor: "red",
                color: "#fff",
                ":hover": {
                  backgroundColor: "red",
                  color: "#fff",
                },
              }}
              startIcon={<CancelIcon />}
              onClick={() => setEditInfo(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                m: 1,
                backgroundColor: "green",
                color: "#fff",
                ":hover": {
                  backgroundColor: "green",
                  color: "#fff",
                },
              }}
              startIcon={<SaveIcon />}
              onClick={handleUpdateProfile}
            >
              Save
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              p: 1,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ m: 1 }}
              startIcon={<EditNoteIcon />}
              onClick={() => setEditInfo(true)}
            >
              Edit
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ProfileInfo;
