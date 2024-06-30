/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {  useEffect, useRef, useState } from "react";
import useAdmin from "@/controllers/useAdmin";
import { fetchAllDishes } from "@/utils";
import Image from "next/legacy/image";
import { Cancel, Close, Edit, Save } from "@mui/icons-material";
import { socket } from "@/socket";
import CreateDishComponent from "../create-dish/CreateDish";
import useHelper from "@/hooks/useHelper";
import useNotify from "@/hooks/useNotify";
import Grid from "@mui/material/Unstable_Grid2";

type Category = {
  id: number;
  name: string;
  description: string;
};

type Dish = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

const ListDish = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const { getAllCategories, editDishById, deleteDishById } = useAdmin();
  const [dish, setDish] = useState<Dish>();

  const { toBase64 } = useHelper();
  const { successNotify, errorNotify } = useNotify();
  const fetchDishes = async () => {
    let tmp = await fetchAllDishes();
    if (tmp) {
      setDishes(tmp);
    }
  };

  const fetchCategories = async () => {
    const response = await getAllCategories();
    if (response.status === 200) {
      setCategories(response.data);
    }
  };
  useEffect(() => {
    fetchCategories().then(() => console.log(categories));
  }, []);
  useEffect(() => {
    fetchDishes();
  }, []);
  useEffect(() => {
    socket.on("update-dish-list", (data) => {
      if (data === "success") fetchDishes();
    });
    return () => {
      socket.off("update-dish-list");
    };
  }, [socket]);
  const CreateModal = () => {
    return (
      <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              mb: 2,
            }}
          >
            <Typography variant="h3" gutterBottom>
              Create Dish
            </Typography>
          </Box>
          <CreateDishComponent />
        </Box>
      </Modal>
    );
  };

  const ConfirmModal = () => {
    const handleDeleteDish = async () => {
      const response = await deleteDishById({id:dish?.id});
      if (response.status === 200) {
        successNotify("Delete dish successfully");
        setConfirmModal(false);
      } else {
        errorNotify("Delete dish failed");
      }
    }
    return (
      <Modal open={confirmModal} onClose={() => setConfirmModal(false)}>
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
                setConfirmModal(false);
              }}
            >
              <Close />
            </IconButton>
          </Box>
          <Box
            sx={{
              padding: "20px",
            }}
          >
            <Typography variant="h6" sx={{ color: "red" }}>
              Are you sure you want to delete this dish?
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
                // handleCloseConfirmModal();
                setConfirmModal(false);
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
              // onClick={handleDeleteStaff}
              onClick={handleDeleteDish}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    );
    
  }

  const EditModal = () => {
    const [selectFile, setSelectFile] = useState<File | null>(null);
    const [longPressTimeout, setLongPressTimeout] = useState<number | null>(
      null
    );
    const [previewUrl, setPreviewUrl] = useState<string | null>(
      dish?.image ?? null
    );
    const [open, setOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dishName, setDishName] = useState<string>(dish?.name ?? "");
    const [nameError, setNameError] = useState<boolean>(false);
    const [category, setCategory] = useState<string>(dish?.category ?? "-1");
    const [categoryError, setCategoryError] = useState<boolean>(false);
    const [price, setPrice] = useState<string>(dish?.price.toString() ?? "");
    const [priceError, setPriceError] = useState<boolean>(false);
    const [description, setDescription] = useState<string>(
      dish?.description ?? ""
    );
    const [messageError1, setMessageError1] = useState<string>("");
    const [messageError2, setMessageError2] = useState<string>("");
    const [messageError3, setMessageError3] = useState<string>("");
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
      if (category === "-1") {
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

      const base64 = selectFile
        ? await toBase64(selectFile as File)
        : dish?.image;
      const data = {
        id: dish?.id,
        name: dishName,
        categoryId: category,
        price: price,
        description: description,
        image: base64,
      };
      const response = await editDishById(data);
      if (response.status === 200) {
        successNotify("Edit dish successfully");
        setEditModal(false);
      } else {
        errorNotify("Edit dish failed");
      }
    };
    return (
      <Modal open={editModal} onClose={() => setEditModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              mb: 2,
            }}
          >
            <Typography variant="h3" gutterBottom>
              Edit Dish
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
              onClick={() => setEditModal(false)}
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
              onClick={() => handleSubmit()}
              startIcon={<Save />}
            >
              Save
            </Button>
          </Box>
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
              </>
            </Grid>
          </Box>
        </Box>
      </Modal>
    );
  };

  const handleOpenEditModal = (params: any) => {
    setDish(params.row as Dish);
    setEditModal(true);
  };
  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Avatar",
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Image
          src={params.value ?? "/images/profile/user-1.jpg"}
          alt="avatar"
          width={50}
          height={50}
          objectFit="fill"
        />
      ),
    },
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      valueFormatter: (value) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value || 0);
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      valueGetter: (value) => {
        return categories.find((category) => category.id === value)?.name;
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
          onClick={() => handleOpenEditModal(params)}
          showInMenu
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            setDish(params.row as Dish);
            setConfirmModal(true);
          }}
          showInMenu
        />,
      ],
    },
  ];
  return (
    <>
      <CreateModal />
      <EditModal />
      <ConfirmModal />
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
            Dish Management
          </Typography>
          <Box flexGrow={1} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenCreateModal(true)}
          >
            Create Dish
          </Button>
        </Box>
        <Box
          sx={{
            width: "80%",
          }}
        >
          <DataGrid
            rows={dishes}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            //   rowsPerPageOptions={[10]}
            //   checkboxSelection
            disableRowSelectionOnClick={true}
          />
        </Box>
      </Box>
    </>
  );
};
export default ListDish;
