import { NextRequest, NextResponse } from "next/server";
import { categorys } from "../route";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = await context.params.id;
  const categoryId = Number(id);
  const category = categorys.find((item) => item.id === categoryId);

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(category);
}

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = await context.params.id;
  const categoryId = Number(id);
  const body = await request.json();

  const index = categorys.findIndex((item) => item.id === categoryId);
  if (index === -1) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  categorys[index].name = body.name;

  return NextResponse.json(categorys[index]);
}
