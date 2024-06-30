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
import NoteAddIcon from "@mui/icons-material/NoteAdd";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Home",
    icon: IconLayoutDashboard,
    href: "/admin",
  },
  {
    navlabel: true,
    subheader: "Staff",
  },
  {
    id: uniqueId(),
    title: "Manage Staff",
    icon: ListAltIcon,
    href: "/admin/create-staff",
  },
  {
    navlabel: true,
    subheader: "Restaurant",
  },
  {
    id: uniqueId(),
    title: "Manage Restaurant",
    icon: NoteAddIcon,
    href: "/admin/manage-restaurant",
  },
  {
    navlabel: true,
    subheader: "Category",
  },
  {
    id: uniqueId(),
    title: "Create Category",
    icon: NoteAddIcon,
    href: "/admin/manage-category/create",
  },
  {
    id: uniqueId(),
    title: "All Category",
    icon: SourceIcon,
    href: "/admin/manage-category",
  },
  {
    navlabel: true,
    subheader: "Dishes",
  },
  {
    id: uniqueId(),
    title: "Manage Dish",
    icon: NoteAddIcon,
    href: "/admin/manage-dish",
  },
  // {
  //   navlabel: true,
  //   subheader: "Combo",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Create Combo",
  //   icon: NoteAddIcon,
  //   href: "/admin/manage-combo/create",
  // },
  // {
  //   id: uniqueId(),
  //   title: "All Combo",
  //   icon: SourceIcon,
  //   href: "/admin/manage-combo/create",
  // },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Log out",
    icon: IconLogin,
    href: "/admin/login",
  },
  
  {
    id: uniqueId(),
    title: "Profile",
    icon: IconUser,
    href: "/profile",
  },
];

export default Menuitems;
;