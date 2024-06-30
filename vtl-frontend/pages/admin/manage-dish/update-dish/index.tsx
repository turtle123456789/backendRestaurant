import UpdateDishComponent from "@/components/admin/manage-dish/update-dish/UpdateDish";
import PageContainer from "@/components/container/PageContainer";
import AdminFullLayout from "@/layouts/admin/AdminFullLayout";
import { useAppSelector } from "@/redux/hooks";
import { ReactElement, useEffect } from "react";

export default function UpdateDish() {
    const { roleId } = useAppSelector((state) => state.profile);
    useEffect(() => {
      if (roleId === -1) {
        window.location.href = "/admin/login";
      }
    }, [roleId]);
    return (
        <PageContainer title="Update Dish">
            <UpdateDishComponent />
        </PageContainer>
    )
}

UpdateDish.getLayout = function getLayout(page: ReactElement) {
    return <AdminFullLayout>{page}</AdminFullLayout>;
};