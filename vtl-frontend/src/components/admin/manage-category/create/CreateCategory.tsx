import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useAdmin from "@/controllers/useAdmin";
import useNotify from "@/hooks/useNotify";

const CreateCategoryComponent = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const { createNewCategory } = useAdmin();
  const { errorNotify, successNotify } = useNotify();

  const handleCreateCategory = async () => {
    try {
      const response = await createNewCategory({
        name: categoryName,
        description: description,
      });
      if (response.status === 201) {
        successNotify("Create category successfully");
      } else {
        errorNotify("Create category failed");
      }
    } catch (error) {
      errorNotify("Create category failed");
    }
  };

  return (
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
        Create Category
      </Typography>
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          Category Name
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="outlined"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          Description
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleCreateCategory}>
        Create Category
      </Button>
    </Box>
  );
};

export default CreateCategoryComponent;
