import PageContainer from "@/components/container/PageContainer";
import StaffHome from "@/components/staff/Staff";
import StaffFullLayout from "@/layouts/staff/StaffFullLayout";
import { useAppSelector } from "@/redux/hooks";
import { ReactElement, useEffect } from "react";

export default function Staff() {
  const { id, roleId } = useAppSelector((state) => state.profile);
  useEffect(() => {
    if (id === -1 || roleId !== 2) {
      window.location.href = "/staff/login";
    }
  }, [id, roleId]);
  return (
    <PageContainer title="Staff">
      <StaffHome />
    </PageContainer>
  );
}

Staff.getLayout = function getLayout(page: ReactElement) {
  return <StaffFullLayout>{page}</StaffFullLayout>;
};
