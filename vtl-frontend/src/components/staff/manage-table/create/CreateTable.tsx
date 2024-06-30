/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Select,
  TextField,
  Typography,
  Grid,
  Modal,
  IconButton,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import useStaff from "@/controllers/useStaff";
import { useAppSelector } from "@/redux/hooks";
import useNotify from "@/hooks/useNotify";
import { socket } from "@/socket";
import LoadingModal from "@/common/loading/LoadingModal";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const CreateTable = () => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [capacity, setCapacity] = useState<string>("2");
  const [position, setPosition] = useState<
    "ALL" | "TANG1" | "TANG2" | "TANG3" | "TANG4"
  >("ALL");
  const [description, setDescription] = useState<
    "ALL" | "CENTER" | "NEAR WINDOW" | "NEAR DOOR" | "OUT DOOR"
  >("ALL");
  const [position1, setPosition1] = useState<
    "TANG1" | "TANG2" | "TANG3" | "TANG4"
  >("TANG1");
  const [description1, setDescription1] = useState<
    "CENTER" | "NEAR WINDOW" | "NEAR DOOR" | "OUT DOOR"
  >("CENTER");
  const { restaurantId } = useAppSelector((state) => state.profile);
  const {
    createTable,
    getAllTablesByRestaurantId,
    handleUpdateTable,
    deleteTableById,
  } = useStaff();
  const { errorNotify, successNotify } = useNotify();
  const [tables, setTables] = useState<Table[]>([]);
  const [numPerson, setNumPerson] = useState("ALL");
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [tableId, setTableId] = useState<number>(0);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  type Table = {
    id: number;
    name: string;
    status: string;
    capacity: number;
    restaurantId: number;
    position: string;
    orderId: number | null;
    description: string;
  };
  const getAllTables = async () => {
    const response = await getAllTablesByRestaurantId({
      restaurantId: restaurantId,
    });
    console.log("🚀 ~ getAllTables ~ response:", response);
    if (response.status !== 200) {
      return;
    }
    let tmp: Table[] = [];
    response.data.forEach((table: any) => {
      tmp.push({
        id: table.id,
        name: table.name,
        status: table.isOccupied,
        capacity: table.capacity,
        restaurantId: table.restaurantId,
        position: table.position,
        orderId: table.orderId,
        description: table.description,
      });
    });
    setTables(tmp);
  };
  useEffect(() => {
    getAllTables();
  }, [restaurantId]);

  useEffect(() => {
    socket.on("new-table", (data) => {
      if (data === "success") getAllTables();
    });
    socket.on("update-table", (data) => {
      if (data.message === "success") {
        console.log("🚀 ~ useEffect ~ data", data);
        setName(data.table.name);
        setCapacity(data.table.capacity.toString());
        setPosition1(
          data.table.position as "TANG1" | "TANG2" | "TANG3" | "TANG4"
        );
        setDescription1(
          data.table.description as
            | "CENTER"
            | "NEAR WINDOW"
            | "NEAR DOOR"
            | "OUT DOOR"
        );
        getAllTables();
      }
    });
    socket.on("delete-table", (data) => {
      if (data === "success") getAllTables();
    });
    return () => {
      socket.off("new-table");
      socket.off("update-table");
      socket.off("delete-table");
    };
  }, [socket]);
  const handleCreateTable = async () => {
    if (name === "") {
      errorNotify("Name is required");
      return;
    }
    setLoading(true);
    const response = await createTable({
      name: name,
      capacity: parseInt(capacity),
      position: position,
      description: description,
      restaurantId: restaurantId,
    });
    console.log("🚀 ~ handleCreateTable ~ response:", response);
    setLoading(false);
    setOpenModalCreate(false);
    setName("");
    setCapacity("2");
    setPosition1("TANG1");
    setDescription1("CENTER");
    if (response.status !== 201) {
      errorNotify(response.message);
      return;
    }
    successNotify("Create table successfully");
  };
  const updateTable = async () => {
    setLoading(true);
    let body: any = {
      id: tableId,
      name: name,
      capacity: parseInt(capacity),
      position: position1,
      description: description1,
    };

    const response = await handleUpdateTable(body);
    setLoading(false);
    if (response.status !== 200) {
      errorNotify(response.message);
      return;
    }
    successNotify("Update table successfully");
  };

  const handleDeleteTable = async () => {
    setLoading(true);
    const response = await deleteTableById({ id: tableId });
    setLoading(false);
    if (response.status !== 200) {
      errorNotify(response.message);
      return;
    }
    successNotify("Delete table successfully");
    setConfirmDelete(false);
    setOpenModalDetail(false);
  };

  const handleOpenModalDetail = (table: Table) => {
    setTableId(table.id);
    setName(table.name);
    setCapacity(table.capacity.toString());
    setPosition1(table.position as "TANG1" | "TANG2" | "TANG3" | "TANG4");
    setDescription1(
      table.description as "CENTER" | "NEAR WINDOW" | "NEAR DOOR" | "OUT DOOR"
    );
    setOpenModalDetail(true);
  };
  const handleCloseModalDetail = () => {
    setTableId(0);
    setName("");
    setCapacity("2");
    setPosition1("TANG1");
    setDescription1("CENTER");
    setIsEdit(false);
    setOpenModalDetail(false);
  };
  const ConfirmDeleteModal = () => {
    return (
      <Modal open={confirmDelete}>
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
                setConfirmDelete(false);
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
              Are you sure you want to delete this table?
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
                setConfirmDelete(false);
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
              onClick={handleDeleteTable}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };
  return (
    <>
      <ConfirmDeleteModal />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          height: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.8em",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#AE0001",
            }}
          >
            Tables
          </Typography>
        </Box>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: "1.2em",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Filter
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Select
              value={numPerson.toString()}
              onChange={(event) => {
                setNumPerson(event.target.value);
              }}
              fullWidth
            >
              <MenuItem value={"ALL"}>All</MenuItem>
              <MenuItem value={2}>2 people</MenuItem>
              <MenuItem value={4}>4 people</MenuItem>
              <MenuItem value={6}>6 people</MenuItem>
              <MenuItem value={8}>8 people</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={3}>
            <Select
              fullWidth
              variant="outlined"
              value={position}
              onChange={(e) => {
                setPosition(
                  e.target.value as
                    | "ALL"
                    | "TANG1"
                    | "TANG2"
                    | "TANG3"
                    | "TANG4"
                );
              }}
              defaultValue="ALL"
            >
              <MenuItem value={"ALL"}>ALL</MenuItem>
              <MenuItem value={"TANG1"}>1ST FLOOR</MenuItem>
              <MenuItem value={"TANG2"}>2ST FLOOR</MenuItem>
              <MenuItem value={"TANG3"}>3ST FLOOR</MenuItem>
              <MenuItem value={"TANG4"}>4ST FLOOR</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={3}>
            <Select
              fullWidth
              variant="outlined"
              value={description}
              onChange={(e) => {
                setDescription(
                  e.target.value as
                    | "ALL"
                    | "CENTER"
                    | "NEAR WINDOW"
                    | "NEAR DOOR"
                    | "OUT DOOR"
                );
              }}
              defaultValue="ALL"
            >
              <MenuItem value={"ALL"}>ALL</MenuItem>
              <MenuItem value={"CENTER"}>CENTER</MenuItem>
              <MenuItem value={"NEAR WINDOW"}>NEAR WINDOW</MenuItem>
              <MenuItem value={"NEAR DOOR"}>NEAR DOOR</MenuItem>
              <MenuItem value={"OUT DOOR"}>OUT DOOR</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Box
          sx={{
            overflow: "auto",
            height: "70%",
            marginTop: "20px",
          }}
        >
          <Grid container spacing={2} mt={2}>
            {tables.map(
              (table, index) =>
                (numPerson === "ALL" ||
                  numPerson.toString() === table.capacity.toString()) &&
                (position === "ALL" || table.position === position) &&
                (description === "ALL" ||
                  table.description === description) && (
                  <Grid key={index} xs={3} pl={4} pt={2}>
                    <Button
                      onClick={() => {
                        // handleChangeTable(table);
                        handleOpenModalDetail(table);
                      }}
                      variant="outlined"
                      fullWidth
                    >
                      {table.name}
                    </Button>
                  </Grid>
                )
            )}
          </Grid>
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={() => setOpenModalCreate(true)}
          sx={{
            backgroundColor: "#AE0001",
            color: "#fff",
            position: "absolute",
            bottom: "5%",
            right: "5%",
            width: "20%",
          }}
        >
          Create new table
        </Button>
      </Box>
      <Modal open={openModalCreate} onClose={() => setOpenModalCreate(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            width: "60%",
            height: "60%",
            backgroundColor: "#fff",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={2} mt={2} alignItems={"center"}>
            <Grid xs={6}>
              <Typography variant="h6" pl={5}>
                Name
              </Typography>
            </Grid>
            <Grid xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={5} alignItems={"center"}>
            <Grid xs={6}>
              <Typography variant="h6" pl={5}>
                Capacity
              </Typography>
            </Grid>
            <Grid xs={6}>
              <Select
                fullWidth
                variant="outlined"
                value={capacity}
                onChange={(e) => {
                  setCapacity(e.target.value);
                }}
              >
                <MenuItem value={"2"}>2 people</MenuItem>
                <MenuItem value={"4"}>4 people</MenuItem>
                <MenuItem value={"6"}>6 people</MenuItem>
                <MenuItem value={"8"}>8 people</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={5} alignItems={"center"}>
            <Grid xs={6}>
              <Typography variant="h6" pl={5}>
                Position
              </Typography>
            </Grid>
            <Grid xs={6}>
              <Select
                fullWidth
                variant="outlined"
                value={position1}
                onChange={(e) => {
                  setPosition1(
                    e.target.value as "TANG1" | "TANG2" | "TANG3" | "TANG4"
                  );
                }}
              >
                <MenuItem value={"TANG1"}>1ST FLOOR</MenuItem>
                <MenuItem value={"TANG2"}>2ST FLOOR</MenuItem>
                <MenuItem value={"TANG3"}>3ST FLOOR</MenuItem>
                <MenuItem value={"TANG4"}>4ST FLOOR</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={5} alignItems={"center"}>
            <Grid xs={6}>
              <Typography variant="h6" pl={5}>
                Description
              </Typography>
            </Grid>
            <Grid xs={6}>
              <Select
                fullWidth
                variant="outlined"
                value={description1}
                onChange={(e) => {
                  setDescription1(
                    e.target.value as
                      | "CENTER"
                      | "NEAR WINDOW"
                      | "NEAR DOOR"
                      | "OUT DOOR"
                  );
                }}
              >
                <MenuItem value={"CENTER"}>CENTER</MenuItem>
                <MenuItem value={"NEAR WINDOW"}>NEAR WINDOW</MenuItem>
                <MenuItem value={"NEAR DOOR"}>NEAR DOOR</MenuItem>
                <MenuItem value={"OUT DOOR"}>OUT DOOR</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            fullWidth
            onClick={handleCreateTable}
            sx={{
              backgroundColor: "#AE0001",
              color: "#fff",
              position: "absolute",
              bottom: "5%",
              right: "5%",
              width: "20%",
            }}
          >
            Create new table
          </Button>
        </Box>
      </Modal>
      <LoadingModal open={loading} />
      <Modal
        id="table-detail"
        open={openModalDetail}
        onClose={() => handleCloseModalDetail()}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            width: "60%",
            height: "60%",
            backgroundColor: "#fff",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.8em",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#AE0001",
              }}
            >
              Table detail
            </Typography>
            <Box flexGrow={1} />
            {isEdit && (
              <>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsEdit(!isEdit);
                  }}
                  sx={{
                    color: "grey",

                    ":hover": {
                      color: "grey",
                    },
                  }}
                  startIcon={<CancelOutlinedIcon />}
                >
                  Cancel
                </Button>
                <Box flexGrow={0.1} />
              </>
            )}

            <Button
              variant="outlined"
              onClick={() => {
                if (isEdit) {
                  updateTable();
                }
                setIsEdit(!isEdit);
              }}
              sx={{
                color: "#fff",
                backgroundColor: isEdit ? "green" : "#178CF1",
                ":hover": {
                  backgroundColor: isEdit ? "green" : "#178CF1",
                  color: "#fff",
                },
              }}
              startIcon={isEdit ? <SaveIcon /> : <EditIcon />}
            >
              {isEdit ? "Save" : "Edit"}
            </Button>
          </Box>
          <Box>
            <Grid container spacing={2} mt={2} alignItems={"center"}>
              <Grid xs={6}>
                <Typography variant="h6" pl={5}>
                  Name
                </Typography>
              </Grid>
              <Grid xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEdit}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={2} alignItems={"center"}>
              <Grid xs={6}>
                <Typography variant="h6" pl={5}>
                  Capacity
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Select
                  fullWidth
                  variant="outlined"
                  value={capacity}
                  onChange={(e) => {
                    setCapacity(e.target.value);
                  }}
                  disabled={!isEdit}
                >
                  <MenuItem value={"2"}>2 people</MenuItem>
                  <MenuItem value={"4"}>4 people</MenuItem>
                  <MenuItem value={"6"}>6 people</MenuItem>
                  <MenuItem value={"8"}>8 people</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={2} alignItems={"center"}>
              <Grid xs={6}>
                <Typography variant="h6" pl={5}>
                  Position
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Select
                  fullWidth
                  variant="outlined"
                  value={position1}
                  onChange={(e) => {
                    setPosition1(
                      e.target.value as "TANG1" | "TANG2" | "TANG3" | "TANG4"
                    );
                  }}
                  disabled={!isEdit}
                >
                  <MenuItem value={"TANG1"}>1ST FLOOR</MenuItem>
                  <MenuItem value={"TANG2"}>2ST FLOOR</MenuItem>
                  <MenuItem value={"TANG3"}>3ST FLOOR</MenuItem>
                  <MenuItem value={"TANG4"}>4ST FLOOR</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={2} alignItems={"center"}>
              <Grid xs={6}>
                <Typography variant="h6" pl={5}>
                  Description
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Select
                  fullWidth
                  variant="outlined"
                  value={description1}
                  onChange={(e) => {
                    setDescription1(
                      e.target.value as
                        | "CENTER"
                        | "NEAR WINDOW"
                        | "NEAR DOOR"
                        | "OUT DOOR"
                    );
                  }}
                  disabled={!isEdit}
                >
                  <MenuItem value={"CENTER"}>CENTER</MenuItem>
                  <MenuItem value={"NEAR WINDOW"}>NEAR WINDOW</MenuItem>
                  <MenuItem value={"NEAR DOOR"}>NEAR DOOR</MenuItem>
                  <MenuItem value={"OUT DOOR"}>OUT DOOR</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Box>
          {isEdit && (
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#AE0001",
                color: "#fff",
                position: "absolute",
                bottom: "5%",
                left: "5%",
                width: "10%",
                ":hover": {
                  backgroundColor: "#AE0001",
                  color: "#fff",
                },
              }}
              onClick={() => {
                setConfirmDelete(true);
              }}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default CreateTable;
