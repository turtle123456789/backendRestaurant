import PageContainer from "@/components/container/PageContainer";
import AdminFullLayout from "@/layouts/admin/AdminFullLayout";
import { ReactElement } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import ManageDishComponent from "@/components/admin/manage-dish/ManageDish";
import ListDish from "@/components/admin/manage-dish/list-dish/ListDish";
export default function ManageDish() {
  const { roleId } = useAppSelector((state) => state.profile);
  useEffect(() => {
    if (roleId === -1) {
      window.location.href = "/admin/login";
    }
  }, [roleId]);
  return (
    <PageContainer title="Manage Dish">
      <ListDish />
    </PageContainer>
  );
}

ManageDish.getLayout = function getLayout(page: ReactElement) {
  return <AdminFullLayout>{page}</AdminFullLayout>;
};
