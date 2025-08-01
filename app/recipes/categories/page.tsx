"use client";

import { useEffect, useState } from "react";
import { LoadingState, RecipeDetailType } from "@/lib/types/type";
import axiosInstance from "@/lib/axios";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategorySectionPage from "@/components/section/category-section";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
    <main className="py-4 px-4 min-h-screen flex flex-col  mx-auto bg-background">
      <Header />
      <CategorySectionPage />

      <section className="container mx-auto py-20 px-4 max-w-7xl">
        <h1 className="text-2xl font-bold mb-6">Category List</h1>

        {isLoading.fetch ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-wrap gap-3 mb-10">
            <Badge
              onClick={() => setSelectedCategoryId(null)}
              className={`cursor-pointer ${
                selectedCategoryId === null ? "bg-primary text-white" : ""
              }`}
            >
              All
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`cursor-pointer ${
                  selectedCategoryId === cat.id ? "bg-primary text-white" : ""
                }`}
              >
                {cat.name} ({cat.count ?? 0})
              </Badge>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredRecipes.map((recipe) => (
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
                  alt="image"
                  width={500}
                  height={500}
                  className="w-auto h-auto object-cover rounded-lg"
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
      </section>
      <Footer />
    </main>
  );
}
