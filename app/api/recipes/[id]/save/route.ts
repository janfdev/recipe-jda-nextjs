import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const recipeId = (await params).id;

  await prisma.savedRecipe.upsert({
    where: { userId_recipeId: { userId, recipeId } },
    create: { userId, recipeId },
    update: {}
  });

  const savedCount = await prisma.savedRecipe.count({ where: { recipeId } });

  return NextResponse.json({ saved: true, data: savedCount }, { status: 201 });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const recipeId = (await params).id;

  await prisma.savedRecipe.deleteMany({ where: { userId, recipeId } });
  const savedCount = await prisma.savedRecipe.count({ where: { recipeId } });

  return NextResponse.json({ saved: false, data: savedCount });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;
  const recipeId = (await params).id;

  const [savedCount, savedByMe] = await Promise.all([
    prisma.savedRecipe.count({ where: { recipeId } }),
    userId
      ? prisma.savedRecipe.findUnique({
          where: { userId_recipeId: { userId, recipeId } }
        })
      : null
  ]);

  return NextResponse.json({
    count: savedCount,
    savedByMe: Boolean(savedByMe)
  });
}
