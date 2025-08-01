import { AvatarUser } from "@/components/AvatarUser";
import ModeToggle from "@/components/ui/mode-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserSidebar from "@/components/user-sidebar";

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <UserSidebar />
      <main className="w-full">
        <div className="flex items-center justify-between p-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <AvatarUser />
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default layout;
