"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { Hamburger } from "lucide-react";
import Link from "next/link";
import NavLinksUser from "./nav-links-user";
import { data } from "@/lib/data/data";
const UserSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="offcanvas" {...props} className="p-2">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!py-5"
            >
              <Link href="#">
                <div className="bg-primary text-primary-foreground rounded-full p-2 flex gap-2 items-center justify-center">
                  <Hamburger className="!size-5 text-accent" />
                  <h1 className="text-accent font-semibold">RV Dashboard</h1>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavLinksUser items={data.navUser} />
      </SidebarContent>
    </Sidebar>
  );
};

export default UserSidebar;
