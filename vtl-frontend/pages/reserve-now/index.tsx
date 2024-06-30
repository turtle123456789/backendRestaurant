import PageContainer from "@/components/container/PageContainer";
import ReserveComponent from "@/components/reserve/Reserve";
import FullLayout from "@/layouts/full/FullLayout";
import { ReactElement } from "react";

export default function Reserve() {
  return (
    <PageContainer title="Reserve Now">
      <ReserveComponent />
    </PageContainer>
  );
}

Reserve.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
