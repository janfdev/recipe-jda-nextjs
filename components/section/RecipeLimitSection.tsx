"use client";

import { useLimitRecipes } from "@/hooks/useLimitRecipe";
import Link from "next/link";
import HomeRecipeSkeleton from "../recipes/skeleton/HomeRecipeSkeleton";
import { ChevronRight } from "lucide-react";
import RecipeCard from "../recipes/RecipeCard";

export default function RecipeLimitSection() {
  const { recipes, loading } = useLimitRecipes(8);

  return (
    <div className="py-4 px-4 min-h-screen flex flex-col w-full max-w-7xl mx-auto">
      <div className="flex items-center w-full justify-between pb-4">
        <h2 className="text-2xl flex items-start">Latest</h2>
        <Link href="/recipes" className="text-xs group flex items-center gap-1">
          <p>Show All Recipe</p>
          <ChevronRight
            className="group-hover:translate-x-1 transition-all"
            width={15}
          />
        </Link>
      </div>

      {loading ? (
        <HomeRecipeSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
