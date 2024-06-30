import PageContainer from "@/components/container/PageContainer";
import MenuComp from "@/components/menu/MenuComp";
import FullLayout from "@/layouts/full/FullLayout";
import { ReactElement } from "react";

export default function Menu() {
  return (
    <PageContainer title="Menu">
      <MenuComp />
    </PageContainer>
  );
}

Menu.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
