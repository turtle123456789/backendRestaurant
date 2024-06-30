import React, { useState } from "react";
import { styled, Container, Box, Toolbar } from "@mui/material";

import Sidebar from "../../components/sidebar/Sidebar";
import Header from "@/components/admin/header/Header";
import Footer from "@/components/footer/Footer";
const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
  "&::-webkit-scrollbar": {
    display: "none !important",
    width: "none  !important", // Hide scrollbar for Webkit browsers
  },
  "-ms-overflow-style": "none !important", // IE and Edge
  "scrollbar-width": "none !important",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  // paddingBottom: "60px",
  // flexDirection: "column",
  backgroundColor: "transparent",
}));

interface Props {
  children: React.ReactNode;
}

const AdminFullLayout: React.FC<Props> = ({ children }) => {
  return (
    <MainWrapper className="mainwrapper">
      <PageWrapper className="page-wrapper">
        <Header />
        {/* <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1518px"
            // width: {
            //   md: `calc(${useWindowSize().width}px- 17px)`,
            //   lg: "100%",
            //   xl: "100%",
            // },
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)"  }}>{children}</Box>
        </Container> */}
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
            flexGrow: 1,
          }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              minHeight: "calc(100vh - 170px)",
            }}
          >
            <Toolbar />
            {children}
          </Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
        {/* <Footer /> */}
      </PageWrapper>
    </MainWrapper>
  );
};

export default AdminFullLayout;
