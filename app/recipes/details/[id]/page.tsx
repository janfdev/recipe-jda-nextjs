import React from "react";
import { RecipeBlog } from "@/lib/data/data";
import { notFound } from "next/navigation";
import Image from "next/image";

export default function RecipesDetail({ params }: { params: { id: string } }) {
  const recipe = RecipeBlog.find((item) => item.id === Number(params.id));

  if (!recipe) return notFound();

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <Image src={recipe.image} alt={recipe.title} />
    </div>
  );
}
