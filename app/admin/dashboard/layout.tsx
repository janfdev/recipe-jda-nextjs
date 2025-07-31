import { AppSidebar } from "@/components/admin/app-sidebar";
import { AvatarAdmin } from "@/components/admin/avatar-admin";
import ModeToggle from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function LayoutAdmin({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mx-1 data-[orientation=vertical]:h-4"
            />
            <h1>Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <AvatarAdmin />
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
