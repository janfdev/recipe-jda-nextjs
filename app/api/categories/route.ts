import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const includeCount = req.nextUrl.searchParams.get("include") === "count";

  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: "asc" },
      include: includeCount
        ? {
            _count: {
              select: { recipes: true }
            }
          }
        : undefined
    });

    const data = categories.map((cat: { id: string; name: string; _count?: { recipes: number } }) => ({
      id: cat.id,
      name: cat.name,
      count: includeCount ? cat._count?.recipes ?? 0 : undefined
    }));

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch categories", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    const newCategory = await prisma.category.create({
      data: { name }
    });

    return NextResponse.json(
      {
        success: true,
        data: newCategory
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error: "POST data failed"
      },
      { status: 500 }
    );
  }
}
