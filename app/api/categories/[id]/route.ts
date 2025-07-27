import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { success: false, error: "Invalid ID format" },
      { status: 400 }
    );
  }

  try {
    const category = await prisma.category.findUnique({ where: { id } });

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error("GET /categories/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { success: false, error: "Invalid ID format" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { name } = body;

  if (!name || typeof name !== "string") {
    return NextResponse.json(
      { success: false, error: "Name is required and must be a string" },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.category.update({
      where: { id },
      data: { name }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("PATCH /categories/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { success: false, error: "Invalid ID format" },
      { status: 400 }
    );
  }

  try {
    const deleted = await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true, data: deleted });
  } catch (err) {
    console.error("DELETE /categories/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Delete failed" },
      { status: 500 }
    );
  }
}
