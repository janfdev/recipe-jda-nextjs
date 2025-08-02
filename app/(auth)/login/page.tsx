"use client";

import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import z from "zod";
const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter")
});
const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const handleLogin = async () => {
    setIsLoading(true);

    const validation = loginSchema.safeParse({
      email: email,
      password: password
    });

    if (!validation.success) {
      setIsLoading(false);
      validation.error.issues.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    });

    setIsLoading(true);

    if (res?.ok && !res?.error) {
      toast.success("Login Berhasil");
      router.push("/");
    } else {
      console.log("Login error: ", res?.error || "Unknown error");
      toast.error("Login Gagal, silahkan coba kembali");
    }

    setIsLoading(false);
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
          Enter your email below to login to your account
        </CardDescription>
        <CardContent>
          <form action="">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="username@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            onClick={handleLogin}
          >
            {isLoading ? "Loading...." : "Login"}
          </Button>
          <span className="text-sm flex items-center gap-1">
            Dont have an account?
            <Link href={"/register"} className="font-semibold hover:underline">
              <p>Register</p>
            </Link>{" "}
          </span>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Page;
