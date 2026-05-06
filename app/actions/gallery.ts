"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createGalleryImage(formData: FormData) {
  const imageUrl = formData.get("imageUrl") as string;
  const caption = formData.get("caption") as string;

  if (!imageUrl) return { error: "Image is required" };

  try {
    await prisma.gallery.create({
      data: {
        imageUrl,
        caption: caption || null,
      }
    });
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { success: true };
  } catch (error) {
    return { error: "Failed to save gallery image" };
  }
}

export async function deleteGalleryImage(id: string) {
  try {
    await prisma.gallery.delete({ where: { id } });
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete gallery image" };
  }
}
