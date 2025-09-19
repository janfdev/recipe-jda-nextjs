"use client";

import { GridPattern } from "../grid-pattern";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Cookie, Shrimp, UtensilsCrossed } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <section className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden px-4">
      <GridPattern
        width={50}
        height={50}
        className={cn(
          "absolute inset-0 w-full h-full",
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
        )}
      />

      <Shrimp className="float-slow absolute top-[15%] left-[10%] md:left-[20%] size-14 md:size-20 text-primary/30" />
      <Cookie className="float-fast absolute bottom-[10%] right-[10%] md:right-[20%] size-12 md:size-20 text-yellow-500/30" />

      {/* Content */}
      <div className="relative z-10 flex max-w-2xl flex-col items-center justify-center py-10 text-center">
        <Badge className="flex items-center justify-center gap-2 rounded-full border-none bg-primary px-3 py-1 text-accent">
          <UtensilsCrossed className="h-4 w-4" />
          Resep Rumahan
        </Badge>

        <h1 className="mt-6 text-4xl font-bold sm:text-5xl md:text-6xl md:leading-[1.2]">
          Temukan Resep Makanan Favorit Keluarga
        </h1>
        <p className="mt-6 text-[17px] text-muted-foreground md:text-lg">
          Mulai dari makanan tradisional hingga dessert modern, semua bisa kamu
          temukan di sini. Gratis, mudah, dan praktis!
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base text-accent">
            Jelajahi Sekarang <ArrowUpRight className="ml-2 !h-5 !w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
