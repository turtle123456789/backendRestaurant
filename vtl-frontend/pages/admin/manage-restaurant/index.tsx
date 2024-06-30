import ListRestaurant from "@/components/admin/manage-restaurant/list-restaurant/ListRestaurant";
import PageContainer from "@/components/container/PageContainer";
import AdminFullLayout from "@/layouts/admin/AdminFullLayout";
import { useAppSelector } from "@/redux/hooks";
import { Box } from "@mui/material";
import { ReactElement, useEffect } from "react";

export default function ManageRestaurant() {
  const { roleId } = useAppSelector((state) => state.profile);
  useEffect(() => {
    if (roleId === -1) {
      window.location.href = "/admin/login";
    }
  }, [roleId]);
  return (
    <PageContainer title="Manage Restaurant">
      <Box>
        <ListRestaurant />
      </Box>
    </PageContainer>
  );
}

ManageRestaurant.getLayout = function getLayout(page: ReactElement) {
  return <AdminFullLayout>{page}</AdminFullLayout>;
};
