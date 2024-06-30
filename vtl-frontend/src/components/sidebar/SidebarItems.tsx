import React from "react";
import Menuitems from "./MenuItems";
import StaffMenuitems from "./StaffMenuItem";
import { useRouter } from "next/router";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useAppSelector } from "@/redux/hooks";
import NavNested from "./NavNested/NavNested";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const { pathname } = useRouter();
  const pathDirect = pathname;
  const { roleId } = useAppSelector((state) => state.profile);
  const menu = roleId === 1 ? Menuitems : StaffMenuitems;
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {menu.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
          } else if (item.nested) {
            return (
              <NavNested
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
            );
          } else
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
            );
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
