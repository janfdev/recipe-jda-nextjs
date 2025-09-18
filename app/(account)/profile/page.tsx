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
import { BookmarkCheck, CircleCheck, Pencil, Send } from "lucide-react";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  image: string;
};

type Stats = {
  commentsCount: number;
  savedCount: number;
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>();
  const [stats, setStats] = useState<Stats>({
    commentsCount: 0,
    savedCount: 0
  });

  const getProfile = async () => {
    try {
      const res = await axiosInstance.get("/api/user/me");
      setUser(res.data.data.user);
      setStats(res.data.data.stats);
    } catch (error) {
      console.error("Gagal mengambil data user", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="flex flex-col px-6 mt-7">
      <div className="flex mb-8 justify-start">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                Profil Saya
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
              <Avatar className="w-24 h-24 border-5 border-primary">
                {user?.image ? (
                  <AvatarImage src={user.image} alt="User Avatar" />
                ) : (
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>

              {/* Badge Custom */}
              <div className="flex items-center justify-center gap-2 bg-transparent border-2 border-primary rounded-full py-1 px-6">
                <CircleCheck className="text-green-500 size-5" /> Pengguna
              </div>
              
              <div className="flex flex-col">
                <div className="space-y-1 ">
                  <Label className="text-sm text-muted-foreground">Nama</Label>
                  <h2 className="text-lg font-semibold">{user?.name || "-"}</h2>
                </div>

                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <h2 className="text-lg font-semibold">
                    {user?.email || "-"}
                  </h2>
                </div>
              </div>

              <Link href={"/profile/edit"}>
                <Button variant="outline" className="gap-2">
                  <Pencil className="w-4 h-4" />
                  Edit Profil
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 px-20">
              <div
                className="flex flex-col gap-2 shadow-md p-4 rounded-xl 
                  bg-gradient-to-br from-amber-700 via-amber-500 to-amber-600 
                  text-white items-center justify-center"
              >
                <Send className="w-6 h-6" />
                <h3 className="font-semibold">Komentar</h3>
                <h4 className="text-lg font-bold">{stats.commentsCount}</h4>
              </div>

              <div
                className="flex flex-col gap-2 shadow-md p-4 rounded-xl 
                  bg-gradient-to-br from-amber-800 via-amber-500 to-amber-500 
                  text-white items-center justify-center"
              >
                <BookmarkCheck className="w-6 h-6" />
                <h3 className="font-semibold">Resep Disimpan</h3>
                <h4 className="text-lg font-bold">{stats.savedCount}</h4>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
