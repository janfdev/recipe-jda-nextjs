import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z, ZodError } from "zod";
import prisma from "@/lib/prisma";

const schema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  name: z.string().min(5, "Nama minimal 5 karakter")
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
          status: 409 // 409 Conflict — lebih semantis untuk duplikat data
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
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: err.issues[0]?.message ?? "Data tidak valid"
        },
        { status: 400 }
      );
    }
    console.error("Signup error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Registration failed"
      },
      {
        status: 500
      }
    );
  }
}
