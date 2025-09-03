import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  const { id } = await params;

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { content } = body;

  if (!content || !content.trim()) {
    return NextResponse.json(
      { error: "Comment content is required" },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.comment.updateMany({
      where: {
        id,
        user: { email: session.user.email }
      },
      data: { content }
    });

    if (updated.count === 0) {
      return NextResponse.json(
        { error: "Comment not found or not yours" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: "Comment updated" });
  } catch (error) {
    console.error("Failed to update :", error);
    return NextResponse.json({ error: "Faield to update" }, { status: 500 });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deleted = await prisma.comment.deleteMany({
      where: {
        id,
        user: { email: session.user.email }
      }
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { error: "Comment not found or not yours" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: "Comment deleted" });
  } catch (error) {
    console.error("Failed to delete :", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
