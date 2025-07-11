"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col gap-5 items-center justify-center">
      <DotLottieReact
        src="https://lottie.host/eff86760-6da3-4790-92a6-d06d8d880ec5/SvuSEbrrgS.lottie"
        loop
        autoplay
        className="w-xl"
      />
      <h1 className="text-9xl">404</h1>
      <p>Not Found</p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
