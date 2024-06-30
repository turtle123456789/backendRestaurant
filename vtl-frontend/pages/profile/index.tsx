import PageContainer from "@/components/container/PageContainer";
import ProfileInfo from "@/components/profile/ProfileInfo";
import FullLayout from "@/layouts/full/FullLayout";
import { ReactElement, useEffect} from "react";
import { useAppSelector } from "@/redux/hooks";
import AdminFullLayout from "@/layouts/admin/AdminFullLayout";
import StaffFullLayout from "@/layouts/staff/StaffFullLayout";

export default function Profile() {
  const { roleId } = useAppSelector((state) => state.profile);
  useEffect(() => {
    if (roleId === -1) {
      window.location.href = "/auth/login";
    }
  }, [roleId]);
  function Page(): ReactElement {
    return (
      <PageContainer title="Profile">
        <ProfileInfo />
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
