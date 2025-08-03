"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Cookie, Shrimp, UtensilsCrossed } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-[90vh] mx-auto flex items-center justify-center px-4 relative overflow-hidden">
      <Shrimp className="float-slow absolute top-[15%] left-[10%] md:left-[5%] size-14 md:size-20 text-primary/30" />
      <Cookie className="float-fast absolute bottom-[10%] right-[10%] md:right-[5%] size-12 md:size-20 text-yellow-500/30" />

      <div className="flex items-center justify-center flex-col text-center max-w-2xl py-10">
        <Badge className="bg-primary text-accent rounded-full py-1 border-none px-3 flex gap-2 items-center justify-center">
          <UtensilsCrossed className="w-4 h-4" />
          Resep Rumahan
        </Badge>

        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold">
          Temukan Resep Makanan Favorit Keluarga
        </h1>
        <p className="mt-6 text-[17px] md:text-lg text-muted-foreground">
          Mulai dari makanan tradisional hingga dessert modern, semua bisa kamu
          temukan di sini. Gratis, mudah, dan praktis!
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base text-accent">
            Jelajahi Sekarang <ArrowUpRight className="!h-5 !w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
