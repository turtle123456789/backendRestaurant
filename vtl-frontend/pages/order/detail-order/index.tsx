import PageContainer from "@/components/container/PageContainer";
import DetailOrderComponent from "@/components/order/detail-order/DetailOrder";
import FullLayout from "@/layouts/full/FullLayout";
import { useAppSelector } from "@/redux/hooks";
import { ReactElement, useEffect } from "react";

export default function OrderDetail() {
  // const { id } = useAppSelector((state) => state.profile);
  // useEffect(() => {
  //   if (id === -1) {
  //     window.location.href = "/auth/login";
  //   }
  // }, [id]);
  return (
    <PageContainer title="Order Detail">
      <DetailOrderComponent />
    </PageContainer>
  );
}
// Path: pages/order/detail-order/index.tsx

OrderDetail.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
