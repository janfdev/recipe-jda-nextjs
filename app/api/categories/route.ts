import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { categories } from "@/lib/data/data";

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      data: categories
    },
    {
      status: 200
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newCategory = {
      id: Date.now(),
      name: body.name
    };

    categories.push(newCategory);
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
        status: 401
      }
    );
  }
}
