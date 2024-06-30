import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";

import { IconMenu, IconUser } from "@tabler/icons-react";

import Profile from "../../header/Profile";
import Logo from "../../logo/Logo";
import { useAppSelector } from "@/redux/hooks";
import Sidebar from "@/components/sidebar/Sidebar";

const Header = () => {
  const router = useRouter();

  // const iOS = process && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const { id } = useAppSelector((state) => state.profile);
  console.log("🚀 ~ Header ~ id:", id);
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: "#AE0001",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
    position: "fixed",
    zIndex: theme.zIndex.drawer + 1,
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));
  const [open, setOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <>
      <AppBarStyled position="sticky" color="default" sx={{}}>
        <ToolbarStyled>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => setMobileSidebarOpen(true)}
            sx={{
              display: {
                lg: "none",
                xs: "inline",
              },
            }}
          >
            <IconMenu width="20" height="20" />
          </IconButton>

          <Logo />

          <Box flexGrow={1} />
          <Stack spacing={1} direction="row" alignItems="center">
            {/* <Button
						variant="contained"
						disableElevation
						color="primary"
						onClick={connect}
					>
						<AccountBalanceWalletOutlinedIcon sx={{ mr: 1 }} />
						{address ? formatAddress(address, 5) : "Connect Wallet"}
					</Button> */}
            {id != -1 ? (
              <Profile />
            ) : (
              <>
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    flexDirection: "row",
                    ":hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <IconUser width="20" height="20" color="white" />
                  <Link href="/staff/login" style={{ textDecoration: "none" }}>
                    <Typography
                      variant="h6"
                      noWrap
                      sx={{
                        mr: 5,
                        display: { xs: "none", md: "flex" },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        // letterSpacing: ".1rem",
                        color: "#fff",
                        textDecoration: "none",
                        cursor: "pointer",
                        transition: "color 0.3s ease",
                        ":hover": {
                          transform: "scale(1.1)",
                        },
                        ml: 1,
                      }}
                    >
                      Sign In
                    </Typography>
                  </Link>
                </Box>
              </>
            )}
          </Stack>
        </ToolbarStyled>
      </AppBarStyled>
      <Sidebar
        isSidebarOpen={false}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      {/* <div className={classes.toolbarMargin} /> */}
    </>
  );
};
export default Header;
