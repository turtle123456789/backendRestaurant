import PageContainer from "@/components/container/PageContainer";
import ListOrder from "@/components/staff/manage-order/list-order/ListOrder";
import { Box } from "@mui/material";
import { ReactElement, useEffect } from "react";
import StaffFullLayout from "@/layouts/staff/StaffFullLayout";
import { useAppSelector } from "@/redux/hooks";

export default function AllOrder() {
  const { id, roleId } = useAppSelector((state) => state.profile);
  useEffect(() => {
    if (id === -1 || roleId !== 2) {
      window.location.href = "/staff/login";
    }
  }, [id, roleId]);
  return (
    <PageContainer title="All Orders">
      <Box>
        <ListOrder filter={["all"]} />
      </Box>
    </PageContainer>
  );
}

AllOrder.getLayout = function getLayout(page: ReactElement) {
  return <StaffFullLayout>{page}</StaffFullLayout>;
};
