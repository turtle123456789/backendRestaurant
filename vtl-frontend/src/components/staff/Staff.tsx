import { Box, Grid } from "@mui/material";
import ListTable from "./manage-table/list-table/ListTable";
import ListOrder from "./manage-order/list-order/ListOrder";

const StaffHome = () => {
  return (
    <Box
      
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ListTable />
        </Grid>
        {/* <Grid item xs={8}>
          <ListOrder />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default StaffHome;
