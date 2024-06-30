import PageContainer from "@/components/container/PageContainer";
import ChangePass from "@/components/profile/ChangePass";
import AdminFullLayout from "@/layouts/admin/AdminFullLayout";
import FullLayout from "@/layouts/full/FullLayout";
import StaffFullLayout from "@/layouts/staff/StaffFullLayout";
import { useAppSelector } from "@/redux/hooks";
import { ReactElement, useEffect } from "react";

export default function ChangePassword() {
  const { roleId } = useAppSelector((state) => state.profile);
  useEffect(() => {
    if (roleId === -1) {
      window.location.href = "/auth/login";
    }
  }, [roleId]);
  function Page(): ReactElement {
    return (
      <PageContainer title="Change Password">
        <ChangePass />
      </PageContainer>
    );
  }
  if (roleId === 1) {
    return (
      <AdminFullLayout>
        <Page />
      </AdminFullLayout>
    );
  }
  if (roleId === 2) {
    return (
      <StaffFullLayout>
        <Page />
      </StaffFullLayout>
    );
  }
  return (
    <FullLayout>
      <Page />
    </FullLayout>
  );
}
