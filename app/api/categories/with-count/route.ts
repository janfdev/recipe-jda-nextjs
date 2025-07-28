import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { recipes: true }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: categories.map((c) => ({
        id: c.id,
        name: c.name,
        count: c._count.recipes
      }))
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    });
  }
}
