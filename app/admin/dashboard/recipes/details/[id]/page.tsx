import { notFound } from "next/navigation";
import Image from "next/image";
import { ChefHat, Clock, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import axiosInstance from "@/lib/axios";

export default async function RecipesDetail({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await axiosInstance.get(`/api/recipes/${id}`);

  if (!res.data.success) return notFound();

  const recipe = res.data.data;

  if (!recipe) return notFound();

  return (
    <main className="py-4 px-4 min-h-screen flex flex-col max-w-7xl mx-auto bg-background">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard/recipes">
              Recipe
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {recipe.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {recipe.description}
              </p>

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(recipe.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-semibold">{recipe.rating}</span>
                </div>
              </div>

              <p className="text-sm text-primary mb-2">
                Kategori: <strong>{recipe.category?.name || "-"}</strong>
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {recipe.tags?.map(
                  (tag: { tag: { name: string } }, index: number) => (
                    <Badge key={`${index}-${tag.tag.name}`} variant="secondary">
                      {tag.tag.name}
                    </Badge>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Recipe Image */}
          <div className="relative">
            <Image
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.title}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          </div>
        </div>

        {/* Recipe Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center space-x-3 p-4">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Prep Time</p>
                <p className="font-semibold">{recipe.prepTime}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-3 p-4">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Cook Time</p>
                <p className="font-semibold">{recipe.cookTime}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-3 p-4">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Servings</p>
                <p className="font-semibold">{recipe.servings}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-3 p-4">
              <ChefHat className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <p className="font-semibold">{recipe.difficulty}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recipe Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Bahan - bahan</h2>
                <ul className="space-y-3">
                  {recipe.ingredients?.map(
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

          {/* Instructions */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Instruksi</h2>
                <ol className="space-y-4">
                  {recipe.instructions?.map(
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
    </main>
  );
}
