import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET user profile
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true
    }
  });

  return NextResponse.json({
    success: true,
    data: user
  });
}
