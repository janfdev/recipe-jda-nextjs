"use client";

import { useEffect, useState } from "react";
import { LoadingState, RecipeDetailType } from "@/lib/types/type";
import axiosInstance from "@/lib/axios";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategorySectionPage from "@/components/section/category-section";
import { Badge } from "@/components/ui/badge";
import RecipeCard from "@/components/recipes/RecipeCard";
export default function CategoriesPage() {
  const [categories, setCategories] = useState<
    { id: string; name: string; count: number }[]
  >([]);
  const [recipes, setRecipes] = useState<RecipeDetailType[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const [isLoading, setIsLoading] = useState<LoadingState>({
    fetch: false,
    add: false,
    edit: false,
    delete: false
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading((prev) => ({ ...prev, fetch: true })); // Tambahkan ini

      try {
        const [categoryRes, recipeRes] = await Promise.all([
          axiosInstance.get("/api/categories?include=count"),
          axiosInstance.get("/api/recipes")
        ]);
        setCategories(categoryRes.data.data);
        setRecipes(recipeRes.data.data);
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setIsLoading((prev) => ({ ...prev, fetch: false }));
      }
    };

    fetchData();
  }, []);

  const filteredRecipes = selectedCategoryId
    ? recipes.filter((r) => r.categoryId === selectedCategoryId)
    : recipes;

  console.log(selectedCategoryId);

  return (
    <main className="py-4 px-4 min-h-screen flex flex-col mx-auto bg-background">
      <Header />
      <CategorySectionPage />

      <section className="container mx-auto py-20 px-4 max-w-7xl">
        <h1 className="text-2xl font-bold mb-6">Category List</h1>

        {isLoading.fetch ? (
          <div>Loading...</div>
        ) : (
          <div className="flex items-center justify-center flex-wrap gap-3 mb-10">
            <Badge
              onClick={() => setSelectedCategoryId(null)}
              className={`cursor-pointer ${
                selectedCategoryId === null
                  ? "bg-primary text-white"
                  : "text-accent bg-primary"
              }`}
            >
              All
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`cursor-pointer ${
                  selectedCategoryId === cat.id
                    ? "bg-primary text-white"
                    : "bg-primary text-accent"
                }`}
              >
                {cat.name} ({cat.count ?? 0})
              </Badge>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
