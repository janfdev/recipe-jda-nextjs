import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "reciverse";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, and Webp are allowed" },
        { status: 400 }
      );
    }

    const maxSizeImage = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSizeImage) {
      return NextResponse.json(
        { error: "File size to large. Maximum size is 5 MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await uploadToCloudinary(base64, {
      folder: `${folder}`,
      transformation: {
        quality: "auto",
        fetch_format: "auto",
        width: 1200,
        height: 1200,
        crop: "limit"
      }
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height
    });
  } catch (err) {
    console.error("Upload image error", err);
    return NextResponse.json(
      { error: "Failed to uplaod image" },
      { status: 500 }
    );
  }
}
