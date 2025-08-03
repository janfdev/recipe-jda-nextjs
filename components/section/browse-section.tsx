"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, UtensilsCrossed } from "lucide-react";
import React from "react";

const BrowsSectionPage = () => {
  return (
    <div className="h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <Badge className="bg-primary text-accent rounded-full py-1 border-none">
          <UtensilsCrossed className="w-4 h-4" /> Resep Indonesia
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold">
          Semua Resep
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Jelajahi berbagai resep dari kategori makanan yang beragam. Temukan
          inspirasi memasak setiap hari!
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full text-accent text-base capitalize"
          >
            Jelajahi sekarang <ArrowUpRight className="!h-5 !w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrowsSectionPage;
