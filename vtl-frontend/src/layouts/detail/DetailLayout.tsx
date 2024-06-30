import React, { useState } from "react";
import { styled, Container, Box } from "@mui/material";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Footer from "../../components/footer/Footer";
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
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "#F5F5F5",
}));

interface Props {
  children: React.ReactNode;
}

const DetailLayout: React.FC<Props> = ({ children }) => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
            
            maxWidth: "1520px"
            // width: {
            //   md: `calc(${useWindowSize().width}px- 17px)`,
            //   lg: "100%",
            //   xl: "100%",
            // },
          }}
        > */}
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
        <Footer />
      </PageWrapper>
    </MainWrapper>
  );
};

export default DetailLayout;
