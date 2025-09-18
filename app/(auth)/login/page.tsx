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
  email: z.string().trim().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter")
});

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;
    if (session?.user?.role === "ADMIN") {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/");
    }
  }, [status, session?.user?.role, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    const parsed = loginSchema.safeParse({ email, password });

    if (!parsed.success) {
      const messages = parsed.error.issues.map((i) => i.message);
      messages.forEach((msg) => toast.error(msg));
      return;
    }

    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: parsed.data.email,
        password: parsed.data.password
      });

      if (res?.ok && !res?.error) {
        toast.success("Login berhasil");
      } else {
        toast.error(res?.error || "Login gagal, silahkan coba lagi");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan, silahkan coba lagi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm p-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-700">
              <Hamburger className="h-5 w-5 text-white" />
            </span>
            <h3 className="text-lg font-semibold text-amber-500">ReciVerse</h3>
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="username@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  autoComplete="current-password"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <span className="flex items-center gap-1 text-sm">
            Don&apos;t have an account?
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              Register
            </Link>
          </span>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Page;
