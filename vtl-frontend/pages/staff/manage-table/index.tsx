import PageContainer from "@/components/container/PageContainer";
import CreateTable from "@/components/staff/manage-table/create/CreateTable";
import StaffFullLayout from "@/layouts/staff/StaffFullLayout";
import { useAppSelector } from "@/redux/hooks";
import { ReactElement, useEffect } from "react";

export default function ManageTable() {
  const { id, roleId } = useAppSelector((state) => state.profile);
  useEffect(() => {
    if (id === -1 || roleId !== 2) {
      window.location.href = "/staff/login";
    }
  }, [id, roleId]);
  return (
    <PageContainer title="Manage Table">
      <CreateTable />
    </PageContainer>
  );
}

ManageTable.getLayout = function getLayout(page: ReactElement) {
  return <StaffFullLayout>{page}</StaffFullLayout>;
};
