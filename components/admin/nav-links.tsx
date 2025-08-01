import React from "react";
import { navItemsDashboard } from "@/lib/data/data";
import Link from "next/link";
import { SidebarGroup, SidebarGroupContent, SidebarMenu } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <SidebarGroup className="!mt-4">
      <SidebarGroupContent className="flex flex-col gap-2">
        {navItemsDashboard.map((menu, index) => (
          <Link key={index} href={menu.url}>
            <SidebarMenu
              className={clsx(
                "flex gap-2 py-2 px-4 rounded-md transition-colors",
                pathname === menu.url
                  ? "bg-primary text-accent"
                  : "hover:bg-primary/10 text-primary"
              )}
            >
              <span className="flex items-center gap-3 text-lg py-2 font-medium">
                <menu.icon size={25} />
                <p>{menu.name}</p>
              </span>
            </SidebarMenu>
          </Link>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavLinks;
