import CreateStaffComponent from "@/components/admin/create-staff/CreateStaff";
import PageContainer from "@/components/container/PageContainer";
import AdminFullLayout from "@/layouts/admin/AdminFullLayout";
import { useAppSelector } from "@/redux/hooks";
import { Box } from "@mui/material";
import { ReactElement, useEffect } from "react";

export default function CreateStaffPage() {
  const { roleId } = useAppSelector((state) => state.profile);
  useEffect(() => {
    if ( roleId === -1) {
      window.location.href = "/admin/login";
    }
  }, [roleId]);
  return (
    <PageContainer title="Create Staff">
        <CreateStaffComponent />
    </PageContainer>
  );
}

CreateStaffPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminFullLayout>{page}</AdminFullLayout>;
};
