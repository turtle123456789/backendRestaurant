import AboutUsComponent from "@/components/about-us/AboutUs";
import PageContainer from "@/components/container/PageContainer";
import FullLayout from "@/layouts/full/FullLayout";
import { ReactElement } from "react";

export default function AboutUs() {
  return (
    <PageContainer title="About Us">
      <AboutUsComponent />
    </PageContainer>
  );
}

AboutUs.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
