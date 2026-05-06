"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string; // Will come from R2 upload eventually

  if (!name) return { error: "Name is required" };

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    await prisma.category.create({
      data: {
        name,
        slug,
        description,
        image: image || null,
      }
    });
    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create category or slug already exists" };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete category (it may have products attached)" };
  }
}

export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;

  if (!name) return { error: "Name is required" };

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        image: image || null,
      }
    });
    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    revalidatePath(`/categories/${slug}`);
    return { success: true };
  } catch (error) {
    return { error: "Failed to update category or slug already exists" };
  }
}
