"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LoadingState, RecipeTypes } from "@/lib/types/type";
import axiosInstance from "@/lib/axios";

const RecipeSection = () => {
  const [recipes, setRecipes] = useState<RecipeTypes[]>([]);
  const [isLoading, setIsLoading] = useState<LoadingState>({
    fetch: false,
    add: false,
    edit: false,
    delete: false
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading((prev) => ({ ...prev, fetch: true }));

      try {
        const recipeRes = await axiosInstance.get("/api/recipes");

        setRecipes(recipeRes.data.data);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setIsLoading((prev) => ({ ...prev, fetch: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-4 px-4 min-h-screen flex flex-col w-full max-w-7xl mx-auto">
      <div className="flex items-center w-full justify-between pb-4">
        <h2 className="text-2xl flex items-start justify-items-start ">
          Latest
        </h2>
        <Link
          href={"/recipes"}
          className="text-xs group flex items-center gap-1"
        >
          <p>Show All Recipe</p>
          <ChevronRight
            className="group-hover:translate-x-1 transition-all"
            width={15}
          />
        </Link>
      </div>
      {isLoading.fetch ? (
        <div>Loading Recipes....</div>
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
                  {recipe.date}
                </span>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  width={500}
                  height={300}
                  className="w-auto h-auto rounded-lg"
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
                  <p>Read article</p>
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

export default RecipeSection;
