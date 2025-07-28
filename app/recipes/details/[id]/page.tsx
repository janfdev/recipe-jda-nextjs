import React, { use } from "react";
import { RecipeBlog } from "@/lib/data/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RecipesDetail({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const recipe = RecipeBlog.find((item) => item.id === Number(id));

  if (!recipe) return notFound();

  return (
    <main className="py-4 px-4 min-h-screen flex flex-col max-w-7xl mx-auto bg-background">
      <div>
        <Header />
      </div>
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

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {recipe.tags?.map((tag, index) => (
                  <Badge key={`${index}-${tag}`} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button>
                  <Heart className="h-4 w-4 mr-2" />
                  Save Recipe
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
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

        {/* Recipe Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Bahan - bahan</h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </span>
                      <span className=" flex-1 ml-3">{item.ingredient}</span>
                    </li>
                  ))}
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
                  {recipe.instruction.map((instruction, index) => (
                    <li key={index} className="flex space-x-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-relaxed pt-1">
                        {instruction.step}
                      </p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </main>
  );
}
