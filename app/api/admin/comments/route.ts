import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const comments = await prisma.comment.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, image: true } },
        recipe: { select: { title: true } }
      }
    });

    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    console.error("GET admin comments error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
