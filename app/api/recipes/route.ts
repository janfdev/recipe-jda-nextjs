import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        category: { select: { id: true, name: true } },
        ingredients: true,
        instructions: {
          orderBy: { stepOrder: "asc" }
        },
        tags: {
          include: { tag: true }
        }
      },
      orderBy: { date: "desc" }
    });

    const data = recipes.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      image: r.image,
      date: r.date.toISOString(),
      category: r.category
        ? { id: r.category.id, name: r.category.name }
        : { id: "unknown", name: "Unknown" },
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

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET data recipe error :", error);
    return NextResponse.json({ error: "GET Recipe error" }, { status: 500 });
  }
}

// Create recipe
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      image,
      categoryId,
      prepTime,
      cookTime,
      servings,
      difficulty,
      ingredients,
      instructions,
      tags
    } = body;

    const recipe = await prisma.recipe.create({
      data: {
        title,
        description,
        image,
        categoryId,
        prepTime,
        cookTime,
        servings,
        difficulty,
        ingredients: {
          create: ingredients.map((i: string) => ({ name: i }))
        },
        instructions: {
          create: instructions.map((step: string, index: number) => ({
            step,
            stepOrder: index + 1
          }))
        },
        tags: {
          create: tags.map((tagName: string) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName.toLowerCase() },
                create: { name: tagName.toLowerCase() }
              }
            }
          }))
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: recipe
    });
  } catch (error) {
    console.error("POST /recipes error", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}
