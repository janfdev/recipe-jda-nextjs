"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hamburger } from "lucide-react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerName, setRegisterName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    }
  });

  const handleRegister = async () => {
    setIsLoading(true);
    console.log("Register user: ", { email: registerEmail });

    const res = await axiosInstance.post("/api/auth/signup", {
      name: registerName,
      email: registerEmail,
      password: registerPassword
    });

    if (res.data.success) {
      localStorage.setItem("Email Register", registerEmail);
      await signIn("credentials", {
        redirect: true,
        email: registerEmail,
        password: registerPassword,
        name: registerName,
        callbackUrl: "/"
      });
    } else {
      setIsLoading(false);
      console.log("Failed");
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center">
      <Card className="max-w-sm w-full p-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <span className="flex w-8 h-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-700">
              <Hamburger className="w-5 h-5 text-white" />
            </span>
            <h3 className="font-semibold text-lg text-amber-500">ReciVerse</h3>
          </CardTitle>
        </CardHeader>
        <CardDescription className="text-center">
          Please input your name, email
        </CardDescription>
        <CardContent>
          <form action="">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="johndoe"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="username@example.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="********"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={handleRegister}>
            {isLoading ? "Loading..." : "Register"}
          </Button>
          <span className="text-sm flex items-center gap-1">
            Already have an account?
            <Link href={"/login"} className="font-semibold hover:underline">
              <p>Login</p>
            </Link>{" "}
          </span>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Page;
