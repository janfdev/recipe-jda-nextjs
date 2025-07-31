import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: "asc" }
    });
    return NextResponse.json(
      {
        success: true,
        data: categories
      },
      {
        status: 200
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to fetch"
      },
      {
        status: 500
      }
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
      {
        status: 201
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error: "POST data failed"
      },
      {
        status: 500
      }
    );
  }
}
