import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { content } = body;

    const updated = await prisma.comment.update({
      where: { id },
      data: { content }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update comment error", error);
    return NextResponse.json({
      success: false,
      error: "Failed to update comment"
    });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.comment.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Comment deleted" });
  } catch (error) {
    console.error("DELETE comment error", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete comment" },
      { status: 404 }
    );
  }
}
