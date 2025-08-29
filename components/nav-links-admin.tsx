import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function NavLinksAdmin({
  items
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {items.map((item) => (
          <Link key={item.url} href={item.url}>
            <SidebarMenu>
              <div
                className={clsx(
                  "flex gap-2 py-3 px-4 rounded-md transition-colors",
                  pathname === item.url
                    ? "bg-primary text-accent"
                    : "hover:bg-primary/20 text-primary"
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon && <item.icon className="" />}
                  <p className="text-[17px]">{item.title}</p>
                </div>
              </div>
            </SidebarMenu>
          </Link>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
