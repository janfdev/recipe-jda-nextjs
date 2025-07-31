import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import prisma from "@/lib/prisma";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(5)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = schema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists"
        },
        {
          status: 400
        }
      );
    }

    // Hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "USER"
      }
    });

    return NextResponse.json(
      {
        success: true,
        user
      },
      {
        status: 201
      }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      {
        error: "Registration failed"
      },
      {
        status: 500
      }
    );
  }
}
