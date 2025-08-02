"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import HeroPage from "@/components/section/browse-section";
import { RecipeDetailType } from "@/lib/types/type";
import axiosInstance from "@/lib/axios";
import HomeRecipeSkeleton from "@/components/recipes/skeleton/HomeRecipeSkeleton";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<RecipeDetailType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formatDateWithTime = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const recipeRes = await axiosInstance.get("/api/recipes");

        setRecipes(recipeRes.data.data);
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-4 px-4 min-h-screen flex flex-col max-w-7xl mx-auto ">
      <Header />
      <div>
        <HeroPage />
      </div>

      {isLoading ? (
       <HomeRecipeSkeleton/>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/details/${recipe.id}`}
              className="group flex cursor-pointer flex-col bg-card p-6 rounded-xl shadow-sm transition-all hover:shadow-md hover:translate-y-[-4px] hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-accent-foreground/10"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground">
                  {recipe.category?.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDateWithTime(recipe.date)}
                </span>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <Image
                  src={recipe.image}
                  alt="image"
                  width={500}
                  height={300}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="font-semibold text-lg mb-2 group-hover:text-accent-foreground transition-colors">
                  {recipe.title}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-accent-foreground/80 transition-colors">
                  {recipe.description}
                </p>
              </div>
              <div className="mt-auto pt-4 flex items-center text-xs font-medium">
                <span className="text-primary group-hover:text-accent-foreground transition-colors flex gap-2 items-center">
                  <p>Baca Resep</p>
                  <ChevronRight
                    className="group-hover:translate-x-1 transition-all"
                    size={13}
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
