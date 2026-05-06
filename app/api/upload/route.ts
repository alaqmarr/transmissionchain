import { NextResponse } from "next/server";
import { r2Client, R2_BUCKET_NAME } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${crypto.randomBytes(16).toString('hex')}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: uniqueFileName,
      Body: buffer,
      ContentType: file.type,
    });

    await r2Client.send(command);

    // Assuming a custom domain is set up for the R2 bucket, or a public URL structure
    // e.g. https://pub-xxxxxxxxxxxxxxxxxxxxxxxx.r2.dev
    const publicDomain = process.env.R2_PUBLIC_DOMAIN || `https://pub-your-r2-domain.r2.dev`;
    const publicUrl = `${publicDomain}/${uniqueFileName}`;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
