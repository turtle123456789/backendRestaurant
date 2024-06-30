import React, { useState } from "react";
import { styled, Container, Box } from "@mui/material";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Footer from "../../components/footer/Footer";
import { useRouter } from "next/router";
const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  // paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "#eeeeee",
}));

interface Props {
  children: React.ReactNode;
}

const FullLayout: React.FC<Props> = ({ children }) => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const router = useRouter();
  console.log("🚀 ~ router:", router.pathname);
  return (
    <MainWrapper>
      <Sidebar
        isSidebarOpen={false}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper>
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
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
        {router.pathname === "/" || router.pathname === "/about-us" ? (
          <Box
            sx={{
              bgcolor: router.pathname === "/" ? "#fef0f0" : "#CB2128",
              width: "100%",
            }}
          >
            <Box
              sx={{
                minHeight: "calc(100vh - 170px)",
              }}
            >
              {children}
            </Box>
          </Box>
        ) : (
          <Container
            sx={{
              paddingTop: "20px",
              maxWidth: "1200px",
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
              {children}
            </Box>
            {/* ------------------------------------------- */}
            {/* End Page */}
            {/* ------------------------------------------- */}
          </Container>
        )}
        <Footer />
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
