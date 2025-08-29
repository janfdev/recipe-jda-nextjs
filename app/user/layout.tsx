import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import UserSidebar from "@/components/user-sidebar";

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)"
        } as React.CSSProperties
      }
    >
      <UserSidebar variant="inset" />
      <SidebarInset>
        <main className="w-full">
          <SiteHeader />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default layout;
