"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu } from "./ui/sidebar";
import { MessageSquare, User } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

const navItems = [
  {
    name: "Profile",
    url: "/user/my-profile",
    icon: User
  },
  {
    name: "Komentar Saya",
    url: "/user/my-comment",
    icon: MessageSquare
  }
];
const NavLinksUser = () => {
  const pathname = usePathname();

  return (
    <SidebarGroup className="!mt-4">
      <SidebarGroupContent className="flex flex-col gap-2">
        {navItems.map((menu, index) => (
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

export default NavLinksUser;
