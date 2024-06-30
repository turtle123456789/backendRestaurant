/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import useAdmin from "../../../controllers/useAdmin";
import useNotify from "@/hooks/useNotify";
import {
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  Modal,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import Image from "next/legacy/image";
import Edit from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { Cancel, Save } from "@mui/icons-material";
import { socket } from "@/socket";
type Staff = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  roleId: number;
  restaurantId: number;
  image: string;
  createAt: string;
  updateAt: string;
};

type Restaurant = {
  id: number;
  name: string;
  address: string;
  provinceId: string;
  latitude: number;
  longitude: number;
  isOpen: boolean;
};

const CreateStaffComponent = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [resId, setResId] = React.useState(0); // [1
  const [email, setEmail] = React.useState("");
  const [resIdError, setResIdError] = React.useState(false);
  React.useState("");
  const {
    createStaff,
    getAllRestaurants,
    getAllStaff,
    editStaffById,
    deleteStaffById,
  } = useAdmin();
  const [address, setAddress] = React.useState("");
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
  const [staffs, setStaffs] = React.useState<Staff[]>([]);
  const [staffId, setStaffId] = React.useState();
  const [createModal, setCreateModal] = React.useState(false);

  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const fetchRestaurants = async () => {
    const response = await getAllRestaurants();
    if (response.status !== 200) {
      // Handle error
      return;
    }
    setRestaurants(response.data);
  };
  React.useEffect(() => {
    fetchRestaurants().then(() =>
      console.log("🚀 ~ fetchRestaurants", restaurants)
    );
  }, []);
  const fetchStaffs = async () => {
    const response = await getAllStaff();
    if (response.status !== 200) {
      // Handle error
      return;
    }
    setStaffs(response.data);
  };
  React.useEffect(() => {
    fetchStaffs();
    console.log("🚀 ~ CreateStaffComponent ~ staffs:", staffs);
  }, []);

  React.useEffect(() => {
    socket.on("create-staff", (data: any) => {
      if (data === "success") {
        fetchStaffs();
      }
    });
    socket.on("update-user-data", (data: any) => {
      if (data === "success") {
        fetchStaffs();
      }
    });
    socket.on("delete-user", (data: any) => {
      if (data === "success") {
        fetchStaffs();
      }
    });
    return () => {
      socket.off("create-staff");
      socket.off("update-user-data");
      socket.off("delete-user");
    };
  }, [socket]);
  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Avatar",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Image
          src={params.value ?? "/images/profile/user-1.jpg"}
          alt="avatar"
          width={50}
          height={50}
          objectFit="cover"
        />
      ),
    },
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    { field: "fullName", headerName: "Full Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "address", headerName: "Address", width: 150 },
    {
      field: "restaurantId",
      headerName: "Restaurant",
      width: 100,
      valueGetter: (value) => {
        const restaurant = restaurants.find(
          (restaurant) => restaurant.id === value
        );
        return `${restaurant?.name} - ${restaurant?.address}`;
      },
    },
    {
      field: "actions",
      type: "actions",
      width: 200,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={params.id}
          icon={<Edit />}
          label="Edit"
          onClick={() => {
            handleOpenEditModal(params.row as Staff);
          }}
          showInMenu
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            handleOpenConfirmModal(params.row as Staff);
          }}
          showInMenu
        />,
      ],
    },
  ];
  const { successNotify, errorNotify } = useNotify();

  const handleOpenEditModal = (params: any) => {
    let name = params?.fullName.split(" ") ?? [];
    console.log("🚀 ~ handleOpenEditModal ~ name:", name);
    let f = "";
    for (var i = 1; i < name.length; i++) {
      if (name[i] !== "") f += name[i] + " ";
    }
    setStaffId(params?.id);
    setFirstName(f ?? "");
    setLastName(params?.fullName.split(" ")[0] ?? "");
    setEmail(params?.email ?? "");
    setPhoneNumber(params?.phoneNumber ?? "");
    setAddress(params?.address ?? "");
    setResId(params?.restaurantId ?? 0);
    setEditModal(true);
  };

  const handleCloseEditModal = () => {
    setStaffId(undefined);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
    setResId(0);
    setEditModal(false);
  };

  const handleOpenConfirmModal = (params: any) => {
    setStaffId(params.id);
    setDeleteModal(true);
  };

  const handleCloseConfirmModal = () => {
    setStaffId(undefined);
    setDeleteModal(false);
  };

  const ConfirmDeleteModal = () => {
    const handleDeleteStaff = async () => {
      const response = await deleteStaffById({ id: staffId });
      if (response.status !== 200) {
        errorNotify(response.message);
        return;
      }
      successNotify("Delete staff success");
      setDeleteModal(false);
    };
    return (
      <Modal open={deleteModal} onClose={handleCloseConfirmModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            backgroundColor: "#fff",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              borderBottom: "1px solid #CED5E7",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2em",
                fontWeight: "bold",
                pl: "10px",
                pt: "10px",
                pb: "10px",
                color: "red",
              }}
            >
              Confirmation
            </Typography>
            <Box flexGrow={1} />
            <IconButton
              onClick={() => {
                setDeleteModal(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              padding: "20px",
            }}
          >
            <Typography variant="h6" sx={{ color: "red" }}>
              Are you sure you want to delete this staff?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: "20px",
              borderTop: "1px solid #CED5E7",
              padding: "10px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "red",
                color: "#fff",

                width: "10%",
                ":hover": {
                  backgroundColor: "red",
                  color: "#fff",
                },
              }}
              onClick={() => {
                handleCloseConfirmModal();
              }}
            >
              Cancel
            </Button>
            <Box flexGrow={1} />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "green",
                color: "#fff",
                ":hover": {
                  backgroundColor: "green",
                  color: "#fff",
                },
                width: "10%",
              }}
              onClick={handleDeleteStaff}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  const EditModal = () => {
    const [firstNameInModal, setFirstNameInModal] = React.useState(firstName);
    const [lastNameInModal, setLastNameInModal] = React.useState(lastName);
    const [phoneNumberInModal, setPhoneNumberInModal] =
      React.useState(phoneNumber);
    const [resIdInModal, setResIdInModal] = React.useState(resId);
    const [emailInModal, setEmailInModal] = React.useState(email);
    const [addressInModal, setAddressInModal] = React.useState(address);
    // const handleUpdateStaff = async () => {
    //   let body = {
    //     id: staffId,
    //     email: emailInModal,
    //     fullName: lastNameInModal + " " + firstNameInModal,
    //     phoneNumber: phoneNumberInModal,
    //     address: addressInModal,
    //     restaurantId: resIdInModal,
    //   };
    //   console.log("🚀 ~ handleUpdateStaff ~ body:", body);
    //   const response = await editStaffById(body);
    //   if (response.status !== 200) {
    //     errorNotify(response.message);
    //     return;
    //   }
    //   successNotify("Update staff success");
    //   handleCloseEditModal();
    // };
    const handleUpdateStaff = async () => {
      let body = {
        id: staffId,
        email: emailInModal === email ? undefined : emailInModal,
        fullName: lastNameInModal + " " + firstNameInModal,
        phoneNumber: phoneNumberInModal === phoneNumber ? undefined : phoneNumberInModal,
        address: addressInModal,
        restaurantId: resIdInModal,
      };
      console.log("🚀 ~ handleUpdateStaff ~ body:", body);
      const response = await editStaffById(body);
      if (response.status !== 200) {
        errorNotify(response.message);
        return;
      }
      successNotify("Update staff success");
      handleCloseEditModal();
    };
    return (
      <Modal open={editModal} onClose={handleCloseEditModal} id="edit">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "45%",
            backgroundColor: "#fff",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              p: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Staff Information
            </Typography>
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
              onClick={handleCloseEditModal}
              startIcon={<Cancel />}
            >
              Cancel
            </Button>
            <Box flexGrow={0.1} />
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
              onClick={() => handleUpdateStaff()}
              startIcon={<Save />}
            >
              Save
            </Button>
          </Box>
          <Box
            sx={{
              padding: "0 20px 20px 20px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  value={firstNameInModal}
                  onChange={(e) => setFirstNameInModal(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  value={lastNameInModal}
                  onChange={(e) => setLastNameInModal(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  value={phoneNumberInModal}
                  onChange={(e) => setPhoneNumberInModal(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  fullWidth
                  value={addressInModal}
                  onChange={(e) => setAddressInModal(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  fullWidth
                  value={emailInModal}
                  onChange={(e) => setEmailInModal(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  value={resIdInModal}
                  onChange={(e) =>
                    setResIdInModal(Number.parseInt(e.target.value.toString()))
                  }
                  error={resIdError}
                >
                  <MenuItem value={0}>Select restaurant</MenuItem>
                  {restaurants.map((restaurant) => (
                    <MenuItem key={restaurant.id} value={restaurant.id}>
                      {restaurant.name} - {restaurant.address}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    );
  };

  const CreateModal = () => {
    const [firstNameInModal, setFirstNameInModal] = React.useState("");
    const [lastNameInModal, setLastNameInModal] = React.useState("");
    const [phoneNumberInModal, setPhoneNumberInModal] = React.useState("");
    const [resIdInModal, setResIdInModal] = React.useState(0); // [1
    const [emailInModal, setEmailInModal] = React.useState("");
    const [passwordInModal, setPasswordInModal] = React.useState("");
    const [confirmPasswordInModal, setConfirmPasswordInModal] =
      React.useState("");
    const [firstNameError, setFirstNameError] = React.useState(false);
    const [lastNameError, setLastNameError] = React.useState(false);
    const [phoneNumberError, setPhoneNumberError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [resIdError, setResIdError] = React.useState(false);
    const [resIdErrorMessage, setResIdMessage] = React.useState(""); // [1
    const [passwordError, setPasswordError] = React.useState(false);
    const [confirmPasswordError, setConfirmPasswordError] =
      React.useState(false);
    const [firstNameErrorMessage, setFirstNameErrorMessage] =
      React.useState("");
    const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState("");
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] =
      React.useState("");
    const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
      React.useState("");
    const [addressInModal, setAddressInModal] = React.useState("");
    const [addressError, setAddressError] = React.useState(false);
    const [addressErrorMessage, setAddressErrorMessage] = React.useState("");
    const validateFirstName = () => {
      if (firstNameInModal === "") {
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
      if (lastNameInModal === "") {
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
      if (phoneNumberInModal === "") {
        setPhoneNumberError(true);
        setPhoneNumberErrorMessage("Phone number is required");
        return true;
      } else if (
        !phoneNumberInModal.match(phoneNumberRegex) ||
        phoneNumberInModal.length > 10
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
      if (emailInModal === "") {
        setEmailError(true);
        setEmailErrorMessage("Email is required");
        return true;
      } else if (!emailRegex.test(emailInModal)) {
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
      if (passwordInModal === "") {
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
      if (confirmPasswordInModal !== passwordInModal) {
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
      if (addressInModal === "") {
        setAddressError(true);
        setAddressErrorMessage("Address is required");
        return true;
      } else {
        setAddressError(false);
        setAddressErrorMessage("");
        return false;
      }
    };

    const validateResId = () => {
      if (resIdInModal === 0) {
        setResIdError(true);
        setResIdMessage("Restaurant ID is required");
        return true;
      } else {
        setResIdError(false);
        setResIdMessage("");
        return false;
      }
    };

    const handleRegister = async () => {
      let fullName = lastNameInModal + " " + firstNameInModal;
      const body = {
        email: emailInModal,
        password: passwordInModal,
        fullName: fullName,
        phoneNumber: phoneNumberInModal,
        address: addressInModal,
        restaurantId: resIdInModal,
        roleId: 2,
      };
      const response = await createStaff(body);
      if (response.status !== 201) {
        errorNotify(response.message);
        return;
      }
      successNotify("Create staff success");
      setCreateModal(false);
    };
    const handleClick = () => {
      if (
        !validateFirstName() &&
        !validateLastName() &&
        !validatePhoneNumber() &&
        !validateEmail() &&
        !validatePassword() &&
        !validateConfirmPassword() &&
        !validateAddress() &&
        !validateResId()
      ) {
        handleRegister();
      } else {
        errorNotify("Invalid input");
      }
    };

    return (
      <Modal open={createModal} onClose={() => setCreateModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            backgroundColor: "#fff",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={0} justifyContent="center">
            <Grid
              item
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
                      value={firstNameInModal}
                      onChange={(e) => setFirstNameInModal(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      label="Last Name"
                      fullWidth
                      error={lastNameError}
                      helperText={lastNameErrorMessage}
                      value={lastNameInModal}
                      onChange={(e) => setLastNameInModal(e.target.value)}
                    />{" "}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label="Phone number"
                      fullWidth
                      error={phoneNumberError}
                      helperText={phoneNumberErrorMessage}
                      value={phoneNumberInModal}
                      onChange={(e) => setPhoneNumberInModal(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label="Address"
                      fullWidth
                      error={addressError}
                      helperText={addressErrorMessage}
                      value={addressInModal}
                      onChange={(e) => setAddressInModal(e.target.value)}
                    />{" "}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label="Email"
                      fullWidth
                      error={emailError}
                      helperText={emailErrorMessage}
                      value={emailInModal}
                      onChange={(e) => setEmailInModal(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Select
                      fullWidth
                      value={resIdInModal}
                      onChange={(e) =>
                        setResIdInModal(
                          Number.parseInt(e.target.value.toString())
                        )
                      }
                      error={resIdError}
                    >
                      <MenuItem value={0}>Select restaurant</MenuItem>
                      {restaurants.map((restaurant) => (
                        <MenuItem key={restaurant.id} value={restaurant.id}>
                          {restaurant.name} - {restaurant.address}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label="Password"
                      fullWidth
                      type="password"
                      error={passwordError}
                      helperText={passwordErrorMessage}
                      value={passwordInModal}
                      onChange={(e) => setPasswordInModal(e.target.value)}
                    />{" "}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label="Confirm Password"
                      fullWidth
                      type="password"
                      error={confirmPasswordError}
                      helperText={confirmPasswordErrorMessage}
                      value={confirmPasswordInModal}
                      onChange={(e) =>
                        setConfirmPasswordInModal(e.target.value)
                      }
                    />
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
                      Create an account
                    </Button>
                  </Grid>
                  <Grid item xs={4} sm={3}></Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    );
  };
  return (
    <>
      <CreateModal />
      <EditModal />
      <ConfirmDeleteModal />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Staff Management
          </Typography>
          <Box flexGrow={1} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCreateModal(true)}
          >
            Create Staff
          </Button>
        </Box>

        <DataGrid
          rows={staffs}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
          disableRowSelectionOnClick={true}
          sx={{
            maxHeight: "80%",
          }}
        />
      </Box>
    </>
  );
};
export default CreateStaffComponent;
