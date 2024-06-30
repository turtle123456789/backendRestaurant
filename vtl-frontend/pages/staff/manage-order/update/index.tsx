import PageContainer from "@/components/container/PageContainer";
import UpdateOrderComponent from "@/components/staff/manage-order/update/UpdateOrder";
import StaffFullLayout from "@/layouts/staff/StaffFullLayout";
import { useAppSelector } from "@/redux/hooks";
import React, { ReactElement, useEffect } from "react";
export default function UpdateOrder() {
  const { id, roleId } = useAppSelector((state) => state.profile);
  useEffect(() => {
    if (id === -1 || roleId !== 2) {
      window.location.href = "/staff/login";
    }
  }, [id, roleId]);



  return (
    <PageContainer title="Update Order" >
      <UpdateOrderComponent />
    </PageContainer>
  );
}

UpdateOrder.getLayout = function getLayout(page: ReactElement) {
  return <StaffFullLayout>{page}</StaffFullLayout>;
};
