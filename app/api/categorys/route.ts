import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export let categorys = [
  {
    id: 1,
    name: "Dinner"
  },
  {
    id: 2,
    name: "Dessert"
  }
];

export async function GET() {
  return NextResponse.json(categorys);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newCategory = {
    id: Date.now(),
    name: body.name
  };

  categorys.push(newCategory);
  return NextResponse.json(newCategory, {
    status: 201
  });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  categorys = categorys.filter((item) => item.id !== body.id);
  return NextResponse.json({
    message: "Category was deleted"
  });
}
