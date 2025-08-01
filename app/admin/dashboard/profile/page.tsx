"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";
import axios from "axios";
import SpinnerCircle from "@/components/spinner";
type UserDetails = {
  image: string;
};
export default function ProfilePage() {
  const [user, setUser] = useState<UserDetails>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "user-profile");

    try {
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      const url = res.data.url;
      setAvatarUrl(url);
      toast.success("Gambar berhasil diupload");
    } catch (error) {
      console.error("Upload gagal:", error);
      toast.error("Gagal upload gambar");
    } finally {
      setUploading(false);
    }
  };

  const getProfile = async () => {
    try {
      const res = await axiosInstance.get("/api/user/me");
      setUser(res.data);
    } catch (error) {
      console.error("Gagal mengambil data user", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setUploading(true);
      const res = await axiosInstance.patch("/api/user", {
        name,
        email,
        image: avatarUrl
      });
      setUser(res.data.data);
      toast.success("Profil berhasil disimpan");
    } catch (error) {
      console.error("Gagal simpan profil", error);
      toast.error("Gagal menyimpan profil");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-24 h-24">
              {user?.image || avatarUrl ? (
                <AvatarImage
                  src={avatarUrl || user?.image || ""}
                  alt="User Avatar"
                />
              ) : (
                <AvatarFallback>
                  {name
                    ? name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "?"}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="w-full max-w-sm text-center space-y-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Button
                onClick={() => selectedFile && handleUpload(selectedFile)}
                className="w-full"
                disabled={uploading || !selectedFile}
              >
                {uploading ? "Uploading..." : "Upload Avatar"}
              </Button>
            </div>
          </div>

          {uploading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
              <SpinnerCircle />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary cursor-pointer text-primary-foreground"
            >
              Save Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
