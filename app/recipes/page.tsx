"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import HeroPage from "@/components/section/browse-section";
import { RecipeDetailType } from "@/lib/types/type";
import axiosInstance from "@/lib/axios";
import HomeRecipeSkeleton from "@/components/recipes/skeleton/HomeRecipeSkeleton";
import RecipeCard from "@/components/recipes/RecipeCard";
import Footer from "@/components/layout/Footer";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<RecipeDetailType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    <div className="py-4 px-4 min-h-screen flex flex-col mx-auto bg-background">
      <Header />
      <HeroPage />
      <section className="container mx-auto py-20 px-4 max-w-7xl">
        {isLoading ? (
          <HomeRecipeSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default RecipesPage;
