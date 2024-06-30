import * as React from "react";
import useAuth from "../../../controllers/useAuth";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
const RegisterComponent = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [terms, setTerms] = React.useState(false);
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [phoneNumberError, setPhoneNumberError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [addressError, setAddressError] = React.useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] =
    React.useState("");
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    React.useState("");
  const [addressErrorMessage, setAddressErrorMessage] = React.useState("");
  const { register } = useAuth();
  const handleRegister = async () => {
    console.log({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
      address,
      terms,
    });
    const body = {
      email: email,
      password: password,
      fullName: firstName + " " + lastName,
      phoneNumber: phoneNumber,
      address: address,
    };
    const response = await register(body);
    if(response.status === 201){
      console.log("Register success");
    }
    else{
      console.log("Register failed");
    }
  };
  const handleTerms = () => {
    setTerms(!terms);
  };
  const validateFirstName = () => {
    if (firstName === "") {
      setFirstNameError(true);
      setFirstNameErrorMessage("First name is required");
      return true;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage("");
      return false;
    }
  };
  const validateLastName = () => {
    if (lastName === "") {
      setLastNameError(true);
      setLastNameErrorMessage("Last name is required");
      return true;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage("");
      return false;
    }
  };
  const validatePhoneNumber = () => {
    const phoneNumberRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (phoneNumber === "") {
      setPhoneNumberError(true);
      setPhoneNumberErrorMessage("Phone number is required");
      return true;
    } else if (
      !phoneNumber.match(phoneNumberRegex) ||
      phoneNumber.length > 10
    ) {
      setPhoneNumberError(true);
      setPhoneNumberErrorMessage("Invalid phone number");
      return true;
    } else {
      setPhoneNumberError(false);
      setPhoneNumberErrorMessage("");
      return false;
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
  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Passwords do not match");
      return true;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
      return false;
    }
  };

  const validateAddress = () => {
    if (address === "") {
      setAddressError(true);
      setAddressErrorMessage("Address is required");
      return true;
    } else {
      setAddressError(false);
      setAddressErrorMessage("");
      return false;
    }
  };

  const handleClick = () => {
    // validateFirstName();
    // validateLastName();
    // validatePhoneNumber();
    // validateEmail();
    // validatePassword();
    // validateConfirmPassword();
    if (
      !validateFirstName() &&
      !validateLastName() &&
      !validatePhoneNumber() &&
      !validateEmail() &&
      !validatePassword() &&
      !validateConfirmPassword() &&
      !validateAddress()
    ) {
      handleRegister();
      console.log("Register success");
      window.location.href = "/auth/login";
    } else {
      console.log("Register failed");
    }
  };

  return (
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
              Create an account
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  error={firstNameError}
                  helperText={firstNameErrorMessage}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  error={lastNameError}
                  helperText={lastNameErrorMessage}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />{" "}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Phone number"
                  fullWidth
                  error={phoneNumberError}
                  helperText={phoneNumberErrorMessage}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Address"
                  fullWidth
                  error={addressError}
                  helperText={addressErrorMessage}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />{" "}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Email"
                  fullWidth
                  error={emailError}
                  helperText={emailErrorMessage}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Password"
                  fullWidth
                  type="password"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />{" "}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Confirm Password"
                  fullWidth
                  type="password"
                  error={confirmPasswordError}
                  helperText={confirmPasswordErrorMessage}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
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
                      label="I agree to the terms and conditions"
                    />
                  </Box>
                </FormGroup>
              </Grid>
              <Grid item xs={4} sm={3}></Grid>
              <Grid item xs={4} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    borderRadius: 3,
                    padding: "12px",
                  }}
                  onClick={handleClick}
                >
                  Sign up
                </Button>
              </Grid>
              <Grid item xs={4} sm={3}></Grid>
            </Grid>
            {/* <Stack spacing={2}>
              <TextField label="Email" fullWidth />
              <TextField label="Password" fullWidth type="password" />
              <TextField label="Confirm Password" fullWidth type="password" />
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
                    label="I agree to the terms and conditions"
                  />
                </Box>
              </FormGroup>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  borderRadius: 3,
                  padding: "12px",
                }}
              >
                Sign up
              </Button>
            <Typography variant="body2" align="center">
                Already have an account?{" "}
                <Link href="auth/login" >
                    Sign in
                </Link>
            </Typography>
            </Stack> */}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterComponent;
