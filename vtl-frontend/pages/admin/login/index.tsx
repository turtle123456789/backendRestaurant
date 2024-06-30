import type { ReactElement } from "react";
import PageContainer from "@/components/container/PageContainer";
import AdminFullLayout from "@/layouts/admin/AdminFullLayout";
import { Box } from "@mui/material";
import LoginComponent from "@/components/auth/login/Login";

export default function LoginPage() {
  return (
    <PageContainer title="Login">
      <Box>
        <LoginComponent isAdmin={true}/>
      </Box>
    </PageContainer>
  );
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
    return <AdminFullLayout>{page}</AdminFullLayout>;
}