"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, UtensilsCrossed } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12">
        <div>
          <Badge className="bg-primary rounded-full py-1 border-none flex items-center gap-1">
            <UtensilsCrossed />
            <p>Resep Rumahan</p>
          </Badge>
          <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2]">
            Temukan Resep Makanan Favorit Keluarga
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg">
            Mulai dari makanan tradisional hingga dessert modern, semua bisa
            kamu temukan di sini. Gratis, mudah, dan praktis!
          </p>
          <div className="mt-12 flex items-center gap-4">
            <Link href={"/recipes"}>
              <Button size="lg" className="rounded-full text-base">
                Get Started <ArrowUpRight className="!h-5 !w-5" />
              </Button>
            </Link>
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
