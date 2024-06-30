/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import useAdmin from "@/controllers/useAdmin";
import useNotify from "@/hooks/useNotify";
import { use, useEffect, useState } from "react";
import { Cancel, Close, Delete, Edit, Save } from "@mui/icons-material";
import { socket } from "@/socket";
import Grid from "@mui/material/Unstable_Grid2";
type Category = {
  id: number;
  name: string;
  description: string;
};

const ListCategory = () => {
  const { getAllCategories, updateCategory, deleteCategory } = useAdmin();
  const [categories, setCategories] = useState<Category[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>();
  const { successNotify, errorNotify } = useNotify();
  const fetchCategories = async () => {
    const response = await getAllCategories();
    if (response.status === 200) {
      setCategories(response.data);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    socket.on("update-data", (data) => {
      if (data === "success") {
        fetchCategories();
      }
    });
    return () => {
      socket.off("update-category");
    };
  }, [socket]);

  const ConfirmModal = () => {
    const handleDelete = async () => {
      if (!selectedCategory) return;
      const response = await deleteCategory({ id: selectedCategory.id });
      if (response.status === 200) {
        successNotify("Delete category successfully");
        setOpenDeleteModal(false);
        return;
      }
      errorNotify("Delete category failed");
    };
    return (
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
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
                setOpenDeleteModal(false);
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
              Are you sure you want to delete this category?
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
                // handleDeleteDish();
                setOpenDeleteModal(false);
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
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  const EditModal = () => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [categoryNameError, setCategoryNameError] = useState(false);
    const [categoryNameErrorMessage, setCategoryNameErrorMessage] =
      useState("");
    useEffect(() => {
      if (selectedCategory) {
        setCategoryName(selectedCategory.name);
        setCategoryDescription(selectedCategory.description);
      }
    }, []);
    const validateCategoryName = () => {
      if (categoryName.trim() === "") {
        setCategoryNameError(true);
        setCategoryNameErrorMessage("Category name is required");
        return false;
      } else {
        setCategoryNameError(false);
        setCategoryNameErrorMessage("");
        return true;
      }
    };

    const handleSave = async () => {
      if (categoryNameError) return;
      // Call API to update category
      let body = {
        id: selectedCategory?.id,
        name: categoryName,
        description: categoryDescription,
      };
      const response = await updateCategory(body);
      if (response.status === 200) {
        successNotify("Update category successfully");
        setOpenEditModal(false);
        return;
      }
      errorNotify("Update category failed");
    };

    return (
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              mb: 2,
            }}
          >
            <Typography variant="h3" gutterBottom>
              Edit Category
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
              onClick={() => setOpenEditModal(false)}
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
              onClick={() => handleSave()}
              startIcon={<Save />}
            >
              Save
            </Button>
          </Box>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                error={categoryNameError}
                helperText={categoryNameErrorMessage}
                onBlur={validateCategoryName}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Category Description"
                multiline
                rows={4}
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    );
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "name",
      headerName: "Category Name",
      width: 250,
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
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
            setSelectedCategory(params.row as Category);
            setOpenEditModal(true);
          }}
          showInMenu
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<Delete />}
          label="Delete"
          onClick={() => {
            setSelectedCategory(params.row as Category);
            setOpenDeleteModal(true);
          }}
          showInMenu
        />,
      ],
    },
  ];
  return (
    <>
      <EditModal />
      <ConfirmModal />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          All Categories
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
          }}
        >
          <DataGrid
            rows={categories}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            pagination
            autoHeight
            disableRowSelectionOnClick={true}
          />
        </Box>
      </Box>
    </>
  );
};

export default ListCategory;
