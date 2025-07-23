"use client";

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
import NavLinks from "./nav-links";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props} className="p-2">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!py-5"
            >
              <Link href="/">
                <div className="bg-primary text-primary-foreground rounded-full p-2 flex items-center justify-center">
                  <Hamburger className="!size-5" />
                </div>
                <span className="text-base font-semibold">
                  ReciVerse Board
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavLinks />
      </SidebarContent>
    </Sidebar>
  );
}
