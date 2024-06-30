import PageContainer from "@/components/container/PageContainer";
import AdminFullLayout from "@/layouts/admin/AdminFullLayout";
import { Box } from "@mui/material";
import { ReactElement } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from 'react';
export default function AdminPage() {
  const { roleId } = useAppSelector((state) => state.profile);
  useEffect(() => {
    if (roleId !== 1) {
      window.location.href = "/admin/login";
    }
  }, [roleId]);
  return (
    <PageContainer title="Admin">
      <Box>
        {/* <AdminComponent />*/}
        <h1>Admin</h1>
      </Box>
    </PageContainer>
  );
}

AdminPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminFullLayout>{page}</AdminFullLayout>;
};
