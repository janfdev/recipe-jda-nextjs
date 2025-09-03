import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const comments = await prisma.comment.findMany({
    where: {
      user: { email: session.user.email }
    },
    include: {
      recipe: { select: { id: true, title: true, image: true } },
      user: { select: { name: true, image: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ success: true, data: comments });
}
