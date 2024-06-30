import PageContainer from "@/components/container/PageContainer";
import DetailOrderComponent from "@/components/staff/manage-order/detail/DetailOrder";
import StaffFullLayout from "@/layouts/staff/StaffFullLayout";
import { useAppSelector } from "@/redux/hooks";
import { ReactElement, useEffect } from "react";

export default function CreateNewOrder() {
  const { id, roleId } = useAppSelector((state) => state.profile);
  useEffect(() => {
    if (id === -1 || roleId !== 2) {
      window.location.href = "/staff/login";
    }
  }, [id, roleId]);
  return (
    <PageContainer title="Detail Order">
      <DetailOrderComponent />
    </PageContainer>
  );
}

CreateNewOrder.getLayout = function getLayout(page: ReactElement) {
  return <StaffFullLayout>{page}</StaffFullLayout>;
};
