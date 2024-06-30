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
  useMediaQuery,
  Button,
} from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import {
  IconBellRinging,
  IconLogin,
  IconMenu,
  IconUser,
  IconUserPlus,
} from "@tabler/icons-react";

import Profile from "./Profile";
import Logo from "../logo/Logo";
import { useAppSelector } from "@/redux/hooks";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}
const Header = ({ toggleMobileSidebar }: ItemType) => {
  const router = useRouter();
  const theme = useTheme();
  // const iOS = process && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = useState(false);
  const { id } = useAppSelector((state) => state.profile);
  console.log("🚀 ~ Header ~ id:", id);
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const handleScroll = (elementId: string) => {
    if (router.pathname === "/") {
      // If we're already on the home page, just scroll to the "list-restaurant" section
      scrollToElement(elementId);
    } else {
      // If we're not on the home page, navigate to the home page and then scroll to the "list-restaurant" section
      window.location.href = "/";
      scrollToElement(elementId);
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
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <AppBarStyled position="sticky" color="default" sx={{}}>
        <ToolbarStyled>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileSidebar}
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
          <Box flexGrow={0.1} />
          <Link href="/" style={{ textDecoration: "none" }}>
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
              }}
            >
              Home
            </Typography>
          </Link>

          <Box flexGrow={0.1} />
          {router.pathname === "/" && (
            <>
              <Typography
                variant="h6"
                noWrap
                onClick={() => handleScroll("list-restaurant")}
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
                }}
              >
                Restaurant
              </Typography>
              <Box flexGrow={0.1} />
            </>
          )}

          {router.pathname === "/" && (
            <>
              <Typography
                variant="h6"
                noWrap
                component={Link}
                href="/menu"
                // onClick={() => handleScroll("list-restaurant")}
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
                }}
              >
                Menu
              </Typography>
              <Box flexGrow={0.1} />
            </>
          )}

          {router.pathname === "/" && (
            <>
              <Typography
                variant="h6"
                noWrap
                onClick={() => handleScroll("footer")}
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
                }}
              >
                About Us
              </Typography>
              <Box flexGrow={0.1} />
            </>
          )}
          {/* {router.pathname === "/" && (
            <>
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
                }}
              >
                Near You
              </Typography>
            </>
          )} */}
          <Box flexGrow={1} />
          { router.pathname === "/" &&
            <>
              <Stack spacing={1} direction="row" alignItems="center">
                <Button
                  sx={{
                    display: { xs: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#fff",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "color 0.3s ease",
                    ":hover": {
                      transform: "scale(1.1)",
                      backgroundColor: "#E6AC0D",
                    },
                    backgroundColor: "#E6AC0D",
                  }}
                  component={Link}
                  href="/reserve-now"
                >
                  Reserve Now
                </Button>
              </Stack>
              <Box flexGrow={0.1} />
            </>
          }

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
                  <Link href="/auth/login" style={{ textDecoration: "none" }}>
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

      {/* <div className={classes.toolbarMargin} /> */}
    </>
  );
};
export default Header;
