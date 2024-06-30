import UpdateRes from "@/components/admin/manage-restaurant/update-restaurant/UpdateRes";
import PageContainer from "@/components/container/PageContainer";
import AdminFullLayout from "@/layouts/admin/AdminFullLayout";
import { Box } from "@mui/material";
import { ReactElement } from "react";

export default function UpdateRestaurant() {
  const handleClose = () => {
    // handle close logic
  };

  // Assume you have a `restaurant` object from your data source
  const restaurant = {
    id: "1",
    resName: "Restaurant Name",
    resImage: "/path/to/image.jpg",
    coordinates: {
      lat: "latitude",
      lng: "longitude",
    },
    province: "Province",
    address: "Restaurant Address",
  };

  return (
    <PageContainer title="Update Restaurant">
      <Box>
        <UpdateRes restaurant={restaurant} onClose={handleClose} />
      </Box>
    </PageContainer>
  );
}

UpdateRestaurant.getLayout = function getLayout(page: ReactElement) {
  return <AdminFullLayout>{page}</AdminFullLayout>;
};
