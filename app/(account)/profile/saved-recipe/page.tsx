"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import prisma from "@/lib/prisma";

export default async function SavedRecipesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const rows = await prisma.savedRecipe.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      recipe: {
        select: {
          id: true,
          title: true,
          image: true,
          _count: {
            select: {
              savedBy: true
            }
          }
        }
      }
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Saved Recipes</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map(({ recipe }) => (
          <Link
            key={recipe.id}
            href={`/recipes/details/${recipe.id}`}
            className="rounded-lg border p-3 hover:shadow"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-3">
              <h3 className="line-clamp-1 font-semibold">{recipe.title}</h3>
              <p className="text-sm text-muted-foreground">
                Disimpan oleh {recipe._count.savedBy} Pengguna
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
