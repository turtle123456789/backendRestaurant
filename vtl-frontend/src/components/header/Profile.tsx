import React, { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  ListItemAvatar,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useAppSelector } from "@/redux/hooks";
import LockIcon from "@mui/icons-material/Lock";
import { Logout } from "@mui/icons-material";
const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const { image, fullName, roleId } = useAppSelector((state) => state.profile);
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={image !== "" ? image : "/images/profile/user-1.jpg"}
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "350px",
          },
        }}
      >
        <MenuItem>
          <ListItemAvatar>
            <Avatar
              src={image !== "" ? image : "/images/profile/user-1.jpg"}
              alt="image"
              sx={{
                width: 35,
                height: 35,
              }}
            />
          </ListItemAvatar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ListItemText primary={fullName} />
          </Box>
        </MenuItem>
        <Divider />

        <MenuItem>
          <ListItemButton component={Link} href={"/profile"}>
            <ListItemIcon>
              <IconUser width={20} />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
            <ListItemIcon>
              <NavigateNextIcon />
            </ListItemIcon>
          </ListItemButton>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemButton component={Link} href={"/profile/change-password"}>
            <ListItemIcon>
              <LockIcon width={20} />
            </ListItemIcon>
            <ListItemText primary="Change password" />
            <ListItemIcon>
              <NavigateNextIcon />
            </ListItemIcon>
          </ListItemButton>
        </MenuItem>
        <Divider />
        {roleId === 3 && (
          <>
            <MenuItem>
              <ListItemButton component={Link} href={"/order"}>
                <ListItemIcon>
                  <CalendarMonthIcon width={20} />
                </ListItemIcon>
                <ListItemText>Order History</ListItemText>
                <ListItemIcon>
                  <NavigateNextIcon />
                </ListItemIcon>
              </ListItemButton>
            </MenuItem>
            <Divider />
          </>
        )}
        <Box mt={1} py={1} px={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => (window.location.href = "/")}
            fullWidth
            endIcon={<Logout />}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
