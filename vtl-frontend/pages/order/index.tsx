import PageContainer from "@/components/container/PageContainer";
import ListOrder from "@/components/order/list-order/ListOrder";
import FullLayout from "@/layouts/full/FullLayout";
import { useAppSelector } from "@/redux/hooks";
import { ReactElement, useEffect } from "react";

export default function OrderPage() {
  const { id } = useAppSelector((state) => state.profile);
  useEffect(() => {
    if (id === -1) {
      window.location.href = "/auth/login";
    }
  }, [id]);
  return (
    <PageContainer title="Order">
        <ListOrder />
    </PageContainer>
  );
}

OrderPage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
