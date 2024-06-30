/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import * as React from "react";
import useAdmin from "@/controllers/useAdmin";
import useNotify from "@/hooks/useNotify";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { Add, Cancel, Close, Edit, Save } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

import { socket } from "@/socket";
import Image from "next/legacy/image";
import UpdateRes from "../update-restaurant/UpdateRes";
import CreateRestaurant from "../create/CreateRestaurant";

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

const ListRestaurant = () => {
  const [restaurants, setRestaurants] = React.useState<ResCard[]>([]);
  const [restaurant, setRestaurant] = React.useState<ResCard>();
  const [confirmModal, setConfirmModal] = React.useState(false);
  const [createModal, setCreateModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const { getAllRestaurants, deleteRestaurant } = useAdmin();
  const { successNotify, errorNotify } = useNotify();

  const fetchRestaurants = async () => {
    const response = await getAllRestaurants();
    console.log("🚀 ~ fetchRestaurants ~ response:", response);
    if (response.status !== 200) {
      errorNotify(response.message);
    }
    let tmp: ResCard[] = [];
    response.data.forEach((element: any) => {
      const imageBuffer = element.image.data;
      const base64Image = Buffer.from(imageBuffer).toString("base64");
      tmp.push({
        id: element.id,
        resName: element.name,
        resImage: `${atob(base64Image)}`,
        coordinates: {
          lat: element.latitude,
          lng: element.longitude,
        },
        province: element.provinceId,
        address: element.address,
      });
    });
    setRestaurants(tmp);
  };

  React.useEffect(() => {
    fetchRestaurants();
  }, []);

  React.useEffect(() => {
    socket.on("update-restaurant-data", (data) => {
      if (data === "success") fetchRestaurants();
    });
    return () => {
      socket.off("update-restaurant-data");
    };
  }, [socket]);

  const columns: GridColDef[] = [
    {
      field: "resImage",
      headerName: "Image",
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src={params.value as string}
            alt="restaurant image"
            width={100}
            height={100}
          />
        </Box>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "resName",
      headerName: "Name",
      width: 200,
    },

    {
      field: "province",
      headerName: "Province",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
    },
    {
      field: "actions",
      width: 200,
      type: "actions",
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
            setRestaurant(params.row as ResCard);
            setConfirmModal(true);
          }}
          showInMenu
        />,
      ],
    },
  ];
  const handleOpenEditModal = (params: GridRowParams) => {
    setRestaurant(params.row as ResCard);
    setEditModal(true);
  };
  const EditModal = () => {
    return (
      <Modal open={editModal} onClose={() => setEditModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <UpdateRes
            restaurant={restaurant!}
            onClose={() => setEditModal(false)}
          />
        </Box>
      </Modal>
    );
  };
  const ConfirmModal = () => {
    const handleDeleteRestaurant = async () => {
      const response = await deleteRestaurant({ id: restaurant?.id });
      if (response.status === 200) {
        successNotify("Delete restaurant successfully");
        setConfirmModal(false);
      } else {
        errorNotify("Delete restaurant failed");
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
              Are you sure you want to delete this restaurant?
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
              onClick={handleDeleteRestaurant}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    );
    
  }
  const CreateModal = () => {
    return (
      <Modal open={createModal} onClose={() => setCreateModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",

            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <CreateRestaurant onClose={() => setCreateModal(false)} />
        </Box>
      </Modal>
    );
  };
  return (
    <>
      <EditModal />
      <CreateModal />
      <ConfirmModal />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mb: 2,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Restaurants Management
            </Typography>
            <Box flexGrow={1} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCreateModal(true)}
              startIcon={<Add />}
            >
              Add
            </Button>
          </Box>
        </Box>
        <DataGrid
          rows={restaurants}
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
    </>
  );
};

export default ListRestaurant;
