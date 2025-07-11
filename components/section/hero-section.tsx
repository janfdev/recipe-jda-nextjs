"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12">
        <div>
          <Badge className="bg-gradient-to-br text-dark dark:text-white via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none">
            📘 Blog Platform v1.0
          </Badge>
          <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2]">
            Welcome to JanfLog – Your Personal Tech Blog
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg">
            Write, manage, and publish your thoughts, tutorials, and technology
            stories with ease. Built with enjoy and happiness.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <Button size="lg" className="rounded-full text-base">
              Get Started <ArrowUpRight className="!h-5 !w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <CirclePlay className="!h-5 !w-5" /> Watch Demo
            </Button>
          </div>
        </div>
        {/* <div className="w-full aspect-video bg-accent rounded-xl" /> */}
        <Image
          src={"/hero-image.jpg"}
          alt="hero-image"
          className="rounded-lg w-full"
          width={500}
          height={200}
        />
      </div>
    </div>
  );
};

export default Hero;
