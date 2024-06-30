import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useState } from "react";
import useAuth from "@/controllers/useAuth";
import useNotify from "@/hooks/useNotify";
import LoadingModal from "@/common/loading/LoadingModal";
import { useAppSelector } from "@/redux/hooks";
const ChangePass = () => {
  const [currentPass, setCurrentPass] = useState("");
  const [hiddenCurrentPass, setHiddenCurrentPass] = useState(true);
  const [hidenNewPass, setHiddenNewPass] = useState(true);
  const [hiddenConfirmPass, setHiddenConfirmPass] = useState(true);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const { changePassword } = useAuth();
  const [confirmPassError, setConfirmPassError] = useState(false);
  const [confirmPassErrorMessage, setConfirmPassErrorMessage] = useState("");
  const { successNotify, errorNotify } = useNotify();
  const { id } = useAppSelector((state) => state.profile);
  const handleChange = async () => {
    setLoading(true);
    if (newPass !== confirmPass) {
      setConfirmPassError(true);
      setConfirmPassErrorMessage("Password does not match");
      setLoading(false);
      return;
    }

    const body = {
      id: id,
      currentPassword: currentPass,
      newPassword: newPass,
    };

    const response = await changePassword(body);
    setLoading(false);
    if (response.status !== 200) {
      errorNotify(response.message);
      return;
    }
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    successNotify("Change password successfully");
  };

  return (
    <>
      <LoadingModal open={loading} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          p: 1,
        }}
      >
        <Box
          sx={{
            border: "2px solid #f0f0f0",
            borderRadius: 2,
            mt: 2,
            mb: 2,
            width: {
              xs: "80%",
              md: "50%",
            },
            bgcolor: "#fff"
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
              Change Password
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
              Current Password:
            </Typography>

            <TextField
              placeholder="Current Password"
              sx={{
                width: "60%",
              }}
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              type={hiddenCurrentPass ? "password" : "text"}
              hidden={hiddenCurrentPass}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setHiddenCurrentPass(!hiddenCurrentPass)}
                    >
                      {hiddenCurrentPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
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
              New Password:
            </Typography>

            <TextField
              placeholder="New Password"
              sx={{
                width: "60%",
              }}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              type={hidenNewPass ? "password" : "text"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setHiddenNewPass(!hidenNewPass)}
                    >
                      {hidenNewPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
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
              Confirm Password:
            </Typography>

            <TextField
              placeholder="Confirm Password"
              sx={{
                width: "60%",
              }}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              error={confirmPassError}
              helperText={confirmPassErrorMessage}
              type={hiddenConfirmPass ? "password" : "text"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setHiddenConfirmPass(!hiddenConfirmPass)}
                    >
                      {hiddenConfirmPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
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
              onClick={handleChange}
            >
              Change
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChangePass;
