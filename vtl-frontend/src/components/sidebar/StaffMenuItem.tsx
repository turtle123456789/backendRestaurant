import {
	IconAperture,
	IconCopy,
	IconLayoutDashboard,
	IconLogin,
	IconMoodHappy,
	IconTypography,
	IconUserPlus,
	IconUser,
} from "@tabler/icons-react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SourceIcon from "@mui/icons-material/Source";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

import { uniqueId } from "lodash";

const StaffMenuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Home",
    icon: IconLayoutDashboard,
    href: "/staff",
  },
  {
    navlabel: true,
    subheader: "Order",
  },
  {
    id: uniqueId(),
    title: "Create Order",
    icon: ListAltIcon,
    href: "/staff/manage-order/create",
  },
  {
    id: uniqueId(),
    title: "Manage Order",
    icon: SourceIcon,
    href: "/",
    nested: [
      {
        id: uniqueId(),
        title: "Current Orders",
        href: "/staff/manage-order/current-orders",
      },
      {
        id: uniqueId(),
        title: "Pre Orders",
        href: "/staff/manage-order/pre-orders",
      },
      {
        id: uniqueId(),
        title: "All Orders",
        href: "/staff/manage-order/all-orders",
      },
    ]
  },
  {
    navlabel: true,
    subheader: "Tables",
  },
  {
    id: uniqueId(),
    title: "Manage Table",
    icon: NoteAddIcon,
    href: "/staff/manage-table",
  },
  
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Log out",
    icon: IconLogin,
    href: "/staff/login",
  },
  {
    id: uniqueId(),
    title: "Profile",
    icon: IconUser,
    href: "/profile",
  },
];

export default StaffMenuitems;
;