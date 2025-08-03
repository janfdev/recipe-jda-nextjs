"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axiosInstance from "@/lib/axios";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>();

  const getProfile = async () => {
    try {
      const res = await axiosInstance.get("/api/user/me");
      setUser(res.data.data);
    } catch (error) {
      console.error("Gagal mengambil data user", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="flex flex-col px-6">
      <div className="flex mb-8 justify-start">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                My Profile
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold text-primary/80">
              Profil Pengguna
            </h1>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24 border-2 border-primary">
                {user?.image ? (
                  <AvatarImage src={user.image} alt="User Avatar" />
                ) : (
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="flex flex-col ">
                <div className="space-y-1 ">
                  <p className="text-sm text-muted-foreground">Nama</p>
                  <h2 className="text-lg font-semibold">{user?.name || "-"}</h2>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <h2 className="text-lg font-semibold">
                    {user?.email || "-"}
                  </h2>
                </div>
              </div>

              <Link href="/user/my-profile/update">
                <Button variant="outline" className="gap-2">
                  <Pencil className="w-4 h-4" />
                  Edit Profil
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
