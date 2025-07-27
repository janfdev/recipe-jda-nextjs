"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from "./ui/dropdown-menu";
import axios from "axios";
import { Mail, UserCircle, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
const Profile = () => {
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const handleInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/me");
        setUserInfo(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!userInfo) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback className="uppercase">
            {handleInitials(userInfo.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-4">
        <DropdownMenuLabel>User Info</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>
          <UserCircle />
          <h3 className="capitalize text-[15px] font-bold">{userInfo.name}</h3>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          <Mail />
          <p className=" text-[15px] font-bold">{userInfo.email}</p>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-500 cursor-pointer flex items-center justify-between gap-3 text-white py-1.5 px-2 w-full rounded-md"
          >
            <LogOutIcon />
            <p>Logout</p>
          </button>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
