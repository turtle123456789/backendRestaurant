import { Box, Button, List, Typography } from "@mui/material";
import ListDish from "./list-dish/ListDish";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";

const ManageDishComponent = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <ListDish />
      </Grid>
      <Grid
        xs={12}
        sm={12}
        md={12}
        lg={12}
        display={"flex"}
        justifyContent={"center"}
      >
        <Link href="/admin/manage-dish/create-dish" style={{textDecoration: 'none'}}>
          <Button variant="contained" color="primary">
            Add Dish
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default ManageDishComponent;
