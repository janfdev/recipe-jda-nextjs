import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

let categorys = [
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

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const index = categorys.findIndex((item) => item.id === body.id);
  if (index !== -1) {
    categorys[index].name = body.name;
    return NextResponse.json(categorys[index]);
  } else {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  categorys = categorys.filter((item) => item.id !== body.id);
  return NextResponse.json({
    message: "Category was deleted"
  });
}
