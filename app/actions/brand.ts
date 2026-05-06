"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBrand(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string; 

  if (!name) return { error: "Name is required" };

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    await prisma.brand.create({
      data: {
        name,
        slug,
        description,
        image: image || null,
      }
    });
    revalidatePath("/admin/brands");
    revalidatePath("/brands");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create brand or slug already exists" };
  }
}

export async function deleteBrand(id: string) {
  try {
    await prisma.brand.delete({ where: { id } });
    revalidatePath("/admin/brands");
    revalidatePath("/brands");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete brand (it may have products attached)" };
  }
}

export async function updateBrand(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;

  if (!name) return { error: "Name is required" };

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    await prisma.brand.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        image: image || null,
      }
    });
    revalidatePath("/admin/brands");
    revalidatePath("/brands");
    revalidatePath(`/brands/${slug}`);
    return { success: true };
  } catch (error) {
    return { error: "Failed to update brand or slug already exists" };
  }
}
