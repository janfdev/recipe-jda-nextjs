import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const [user, commentsCount, savedCount] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: userId
      },
      select: { id: true, name: true, email: true, image: true }
    }),
    prisma.comment.count({ where: { userId } }),
    prisma.savedRecipe.count({ where: { userId } })
  ]);

  return NextResponse.json({
    data: {
      user,
      stats: {
        commentsCount,
        savedCount
      }
    }
  });
}
