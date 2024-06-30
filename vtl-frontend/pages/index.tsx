import type { ReactElement } from "react";
import PageContainer from "@/components/container/PageContainer";
import FullLayout from "@/layouts/full/FullLayout";
import Banner from "@/components/banner/Banner";
import { Box, Typography } from "@mui/material";
import Video from "@/components/restaurant/video/Video";
import Intro from "@/components/intro/Intro";
import ResDegree from "@/components/res-degree/ResDegree";
import ComboComp from "@/components/combo/ComboComp";

export default function Home() {
  return (
    <PageContainer title="Home">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Banner />
        <Intro />
        <ResDegree />
        <ComboComp />
        {/* <Video /> */}
      </Box>
    </PageContainer>
  );
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
