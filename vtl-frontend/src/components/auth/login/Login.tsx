import PageContainer from "@/components/container/PageContainer";
import CustomTextField from "@/components/forms/theme-elements/CustomTextField";
import Logo from "@/components/shared/logo/Logo";
import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  makeStyles,
  Stack,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
} from "@mui/material";
import Link from "next/link";
import useAuth from "@/controllers/useAuth";
import { useAppDispatch } from "@/redux/hooks";
import { setProfile } from "@/redux/profile/profileSlice";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
const LoginComponent = ({ isAdmin }: { isAdmin: boolean }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [roleId, setRoleId] = useState(0);
  const dispatch = useAppDispatch();
  const { login } = useAuth();
  const { successNotify, errorNotify } = useNotify();
  const handleLogin = async () => {
    // Only proceed if both email and password are valid
    if (validateEmail() || validatePassword()) {
      return;
    }

    // Prepare the request body
    const body = {
      email,
      password,
    };

    // Make the login request
    const response = await login(body);

    // Only proceed if the response status is 200
    if (response.status !== 200) {
      errorNotify(response.message);
      return;
    }

    // If the user is an admin, only proceed if the role ID is 1
    // If the user is not an admin, only proceed if the role ID is not 1
    const { roleId } = response.data;

    if (
      (roleId === 1 && router.pathname !== "/admin/login") ||
      (roleId === 2 && router.pathname !== "/staff/login") ||
      (roleId === 3 && router.pathname !== "/auth/login")
    ) {
      errorNotify("Invalid login credentials");
      return;
    }
    // Log the response
    console.log("🚀 ~ handleLogin ~ response:", response.data);
    let base64Image = "";
    if (response.data.image) {
      const imageBuffer = response.data.image.data;
      base64Image = atob(Buffer.from(imageBuffer).toString("base64"));
    }
    response.data.image = base64Image;
    // Update the profile in the state
    dispatch(setProfile(response.data));

    successNotify("Login successful");

    if (roleId === 1) {
      router.push("/admin/");
    }
    if (roleId === 2) {
      router.push("/staff/");
    }
    if (roleId === 3) {
      router.push("/");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^([\w-]+.)+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email === "") {
      setEmailError(true);
      setEmailErrorMessage("Email is required");
      return true;
    } else if (!emailRegex.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Invalid email");
      return true;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
      return false;
    }
  };
  const validatePassword = () => {
    if (password === "") {
      setPasswordError(true);
      setPasswordErrorMessage("Password is required");
      return true;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
      return false;
    }
  };
  const router = useRouter();
  return (
    //
    <Box>
      <Grid container spacing={0} justifyContent="center">
        <Grid
          item
          xs={12}
          sm={12}
          lg={12}
          xl={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Sign in to your account
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Email"
                fullWidth
                error={emailError}
                helperText={emailErrorMessage}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                fullWidth
                type="password"
                error={passwordError}
                helperText={passwordErrorMessage}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormGroup>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember me"
                  />
                </Box>
              </FormGroup>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  background: "#AE0001",
                  "&:hover": {
                    background: "#AE0001", // Set the hover background color to the same as the normal state
                  },
                }}
                onClick={handleLogin}
                type="submit"
              >
                Sign in
              </Button>
              <Typography variant="body2" align="center">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register">Sign up</Link>
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginComponent;
