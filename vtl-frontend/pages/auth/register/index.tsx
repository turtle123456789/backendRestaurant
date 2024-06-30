import RegisterComponent from "@/components/auth/register/Register";
import PageContainer from "@/components/container/PageContainer";
import FullLayout from "@/layouts/full/FullLayout";
import { Box } from "@mui/material";
import { ReactElement } from "react";

export default function RegisterPage() {
  return (
    <PageContainer title="Register">
      <Box>
        <RegisterComponent />
      </Box>
    </PageContainer>
  );
}

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
