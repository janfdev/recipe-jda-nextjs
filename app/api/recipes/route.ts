import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        category: { select: { name: true } },
        ingredients: { select: { id: true, name: true } },
        instructions: {
          select: {
            id: true,
            step: true,
            stepOrder: true
          },
          orderBy: { stepOrder: "asc" }
        },
        tags: { include: { tag: true } }
      },
      orderBy: { date: "desc" }
    });

    const data = recipes.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      image: r.image,
      date: r.date.toISOString(),
      categoryId: r.category,
      category: {
        name: r.category?.name || "Unknown"
      },
      ingredients: r.ingredients.map((i) => ({
        id: i.id,
        ingredient: i.name
      })),
      instruction: r.instructions.map((i) => ({
        id: i.id,
        step: i.step
      })),
      tags: r.tags.map((t) => t.tag.name)
    }));

    return NextResponse.json({
      success: true,
      data
    });
  } catch {}
}
