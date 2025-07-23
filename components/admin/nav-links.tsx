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
          <SidebarMenu key={index} className="flex items-center gap-2">
            <SidebarMenuButton>
              <Link
                href={menu.url}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <menu.icon className="size-4" />
                {menu.title}
              </Link>
            </SidebarMenuButton>
          </SidebarMenu>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavLinks;
