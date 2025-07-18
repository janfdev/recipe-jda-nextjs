import { NextRequest, NextResponse } from "next/server";
import { categories } from "@/lib/data/data";

// Helper functions with proper typing
async function findCategory(id: number) {
  return categories.find((c) => c.id === id);
}

async function updateCategory(id: number, name: string) {
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return null;

  categories[index] = { ...categories[index], name };
  return categories[index];
}

// GET Single Category
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID format" },
        { status: 400 }
      );
    }

    const category = await findCategory(id);
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// UPDATE Category
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validate ID
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID format" },
        { status: 400 }
      );
    }

    // Validate request body
    const body = await request.json();
    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json(
        { success: false, error: "Name is required and must be a string" },
        { status: 400 }
      );
    }

    // Update category
    const updatedCategory = await updateCategory(id, body.name);
    if (!updatedCategory) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedCategory });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE Category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID format" },
        { status: 400 }
      );
    }

    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    const deletedCategory = categories.splice(index, 1)[0];
    return NextResponse.json({ success: true, data: deletedCategory });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
