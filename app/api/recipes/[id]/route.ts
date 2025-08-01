import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET Recipe by ID
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        category: { select: { name: true } },
        ingredients: { select: { id: true, name: true } },
        instructions: {
          select: { id: true, step: true, stepOrder: true },
          orderBy: { stepOrder: "asc" }
        },
        tags: { include: { tag: true } }
      }
    });

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: recipe });
  } catch (error) {
    console.error("GET recipe by ID error", error);
    return NextResponse.json(
      { error: "Failed to get recipe" },
      { status: 500 }
    );
  }
}

// PATCH (Update Recipe)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const body = await request.json();

    const {
      title,
      description,
      image,
      categoryId,
      prepTime,
      cookTime,
      servings,
      difficulty,
      rating,
      ingredients,
      instructions,
      tags
    } = body;

    // Delete existing ingredients/instructions/tags before updating
    await prisma.ingredient.deleteMany({ where: { recipeId: id } });
    await prisma.instruction.deleteMany({ where: { recipeId: id } });
    await prisma.recipeTag.deleteMany({ where: { recipeId: id } });

    const updated = await prisma.recipe.update({
      where: { id },
      data: {
        title,
        description,
        image,
        categoryId,
        prepTime,
        cookTime,
        servings,
        difficulty,
        rating,
        ingredients: {
          create: ingredients?.map((i: string) => ({ name: i })) || []
        },
        instructions: {
          create:
            instructions?.map((step: string, index: number) => ({
              step,
              stepOrder: index + 1
            })) || []
        },
        tags: {
          create:
            tags?.map((tagName: string) => ({
              tag: {
                connectOrCreate: {
                  where: { name: tagName },
                  create: { name: tagName }
                }
              }
            })) || []
        }
      }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH recipe error", error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 }
    );
  }
}

// DELETE Recipe
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    // 1. Hapus semua anak terlebih dahulu
    await prisma.comment.deleteMany({ where: { recipeId: id } });
    await prisma.savedRecipe.deleteMany({ where: { recipeId: id } });
    await prisma.recipeTag.deleteMany({ where: { recipeId: id } });
    await prisma.instruction.deleteMany({ where: { recipeId: id } });
    await prisma.ingredient.deleteMany({ where: { recipeId: id } });

    // 2. Baru hapus recipe-nya
    await prisma.recipe.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE recipe error", error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 500 }
    );
  }
}
