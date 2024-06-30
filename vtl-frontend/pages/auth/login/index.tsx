import type { ReactElement } from "react";
import PageContainer from "@/components/container/PageContainer";
import FullLayout from "@/layouts/full/FullLayout";
import { Box } from "@mui/material";
import LoginComponent from "@/components/auth/login/Login";

export default function LoginPage() {
  return (
    <PageContainer title="Login">
      <Box>
        <LoginComponent isAdmin={false}/>
      </Box>
    </PageContainer>
  );
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout>{page}</FullLayout>;
}