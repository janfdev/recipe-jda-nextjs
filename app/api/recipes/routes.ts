// ✅ FILE: app/api/recipes/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all recipes
export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        category: { select: { name: true } },
        ingredients: { select: { id: true, name: true } },
        instructions: {
          select: { id: true, step: true, stepOrder: true },
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
      categoryId: r.categoryId,
      category: { name: r.category?.name || "Unknown" },
      ingredients: r.ingredients.map((i) => ({ id: i.id, ingredient: i.name })),
      instruction: r.instructions.map((i) => ({ id: i.id, step: i.step })),
      tags: r.tags.map((t) => t.tag.name)
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 });
  }
}

// POST create a recipe
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
                where: { name: tagName },
                create: { name: tagName }
              }
            }
          }))
        }
      }
    });

    return NextResponse.json({ success: true, data: recipe });
  } catch (error) {
    console.error("POST /recipes error:", error);
    return NextResponse.json({ success: false, error: "Failed to create recipe" }, { status: 500 });
  }
}

// PATCH update a recipe
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

    const updated = await prisma.recipe.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}

// DELETE a recipe
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

    await prisma.recipe.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}
