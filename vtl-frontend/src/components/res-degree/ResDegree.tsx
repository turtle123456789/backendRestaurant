import ListRestaurants from "@/components/restaurant/list/ListRestaurants";
import { Box, Tooltip, Typography } from "@mui/material";

const ResDegree = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        bgcolor: "#CB2128",
      }}
      id="list-restaurant"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#fff", pl: 5, pt: 2, pb: 2, fontSize: 30 }}
        >
          Restaurants
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: 1300
        }}
      >
        <ListRestaurants />
      </Box>
    </Box>
  );
};

export default ResDegree;
