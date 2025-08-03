"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RecipeDetailComponent from "@/components/recipes/RecipeDetail";
import RecipeComments from "@/components/recipes/RecipeComments";
import { use } from "react";

export type CommentTypes = {
  id: string;
  content: string;
  recipeId: string;
  userId: string;
  createdAt: string;
  user?: { name: string; image: string };
};

export default function RecipesDetails({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <main className="py-4 px-4 min-h-screen flex flex-col mx-auto bg-background">
      <Header />
      <section className="container mx-auto py-12 px-4 max-w-7xl">
        <RecipeDetailComponent id={id} />
        <RecipeComments recipeId={id} />
      </section>
      <Footer />
    </main>
  );
}
