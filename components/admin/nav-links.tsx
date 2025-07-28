import React from "react";
import { navItemsDashboard } from "@/lib/data/data";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton
} from "../ui/sidebar";
const NavLinks = () => {
  return (
    <SidebarGroup className="!mt-4">
      <SidebarGroupContent className="flex flex-col gap-2">
        {navItemsDashboard.map((menu, index) => (
          <Link key={index} href={menu.url}>
            <SidebarMenu className="flex items-center gap-2">
              <SidebarMenuButton
                className="flex items-center gap-2 text-sm font-medium
               "
              >
                <menu.icon className="size-4" />
                {menu.title}
              </SidebarMenuButton>
            </SidebarMenu>
          </Link>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavLinks;
