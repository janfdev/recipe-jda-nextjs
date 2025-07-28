import React from "react";
import { Button } from "../ui/button";
import { ArrowUpRight, Grid2x2Plus } from "lucide-react";
import { Badge } from "../ui/badge";

const CategorySectionPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <Badge className="bg-primary rounded-full py-1 border-none">
          <Grid2x2Plus />
          Kategori Resep
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold">
          Temukan Resep Menakjubkan
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Jelajahi ribuan resep lezat yang disusun berdasarkan kategori. Mulai
          dari ide sarapan cepat hingga pesta makan malam yang mewah.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base">
            Cari Kategori <ArrowUpRight className="!h-5 !w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategorySectionPage;
