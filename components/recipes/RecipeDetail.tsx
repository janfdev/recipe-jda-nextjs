"use client";

import { useRecipe } from "@/hooks/use-recipe";
import { AlarmClockCheck, ChefHat, Clock, Star, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import RecipeActionButtons from "./RecipeActionsButton";
import RecipeDetailsSkeleton from "./skeleton/RecipeDetailsSkeleton";

export default function RecipeDetailComponent({ id }: { id: string }) {
  const { recipe, loading } = useRecipe(id);

  if (loading) return <RecipeDetailsSkeleton />;

  if (!recipe) return <p>Resep tidak ditemukan</p>;

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl capitalize md:text-4xl font-bold mb-4">
              {recipe?.title}
            </h1>
            <p className="text-lg capitalize text-muted-foreground mb-4">
              {recipe?.description}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(recipe?.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 font-semibold">{recipe?.rating} / 5</span>
              </div>
            </div>

            <p className="text-sm text-primary mb-2">
              Kategori: <strong>{recipe?.category?.name || "-"}</strong>
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {recipe?.tags?.map(
                (tag: { tag: { name: string } }, index: number) => (
                  <Badge
                    key={`${index}-${tag.tag.name}`}
                    variant="secondary"
                    className="lowercase"
                  >
                    #{tag.tag.name}
                  </Badge>
                )
              )}
            </div>

            {/* Action Buttons */}
            <RecipeActionButtons />
          </div>
        </div>

        {/* Recipe Image */}
        <div className="relative">
          <Image
            src={recipe.image}
            alt={recipe?.title}
            width={1000}
            height={1000}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="flex flex-col justify-center items-center p-2">
            <div className="rounded-full p-2 bg-primary/20 mb-3">
              <Clock className="h-7 w-7 text-primary" />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-sm text-muted-foreground">Waktu Persiapan</p>
              <p className="font-semibold">{recipe?.prepTime} Menit</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col justify-center items-center p-2">
            <div className="rounded-full p-2 bg-primary/20 mb-3">
              <AlarmClockCheck className="h-7 w-7 text-primary" />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-sm text-muted-foreground">Waktu Masak</p>
              <p className="font-semibold">{recipe?.cookTime}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col justify-center  items-center p-4">
            <div className="rounded-full p-2 bg-primary/20 mb-3">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-sm text-muted-foreground">Porsi</p>
              <p className="font-semibold">{recipe?.servings}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col justify-center items-center p-4">
            <div className="rounded-full p-2 bg-primary/20 mb-3">
              <ChefHat className="h-7 w-7 text-primary" />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-sm text-muted-foreground">Kesulitan</p>
              <p className="font-semibold">{recipe?.difficulty}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Bahan dan Instruksi */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Bahan - bahan</h2>
              <ul className="space-y-3">
                {recipe?.ingredients?.map(
                  (item: { name: string }, index: number) => (
                    <li key={index} className="flex items-center">
                      <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </span>
                      <span className="flex-1 ml-3">{item.name}</span>
                    </li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Instruksi</h2>
              <ol className="space-y-4">
                {recipe?.instructions?.map(
                  (instruction: { step: string }, index: number) => (
                    <li key={index} className="flex space-x-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-relaxed pt-1">
                        {instruction.step}
                      </p>
                    </li>
                  )
                )}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
