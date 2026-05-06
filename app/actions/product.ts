"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const brandId = formData.get("brandId") as string;
  const images = formData.getAll("images") as string[];

  if (!name || !categoryId || !brandId) {
    return { error: "Name, Category, and Brand are required" };
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    await prisma.product.create({
      data: {
        name,
        slug,
        description: description || "",
        categoryId,
        brandId,
        images,
      }
    });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath(`/categories/${categoryId}`);
    revalidatePath(`/brands/${brandId}`);
    return { success: true };
  } catch (error) {
    return { error: "Failed to create product or slug already exists" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete product" };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const brandId = formData.get("brandId") as string;
  const images = formData.getAll("images") as string[];

  if (!name || !categoryId || !brandId) {
    return { error: "Name, Category, and Brand are required" };
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description: description || "",
        categoryId,
        brandId,
        images,
      }
    });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath(`/products/${slug}`);
    revalidatePath(`/categories/${categoryId}`);
    revalidatePath(`/brands/${brandId}`);
    return { success: true };
  } catch (error) {
    return { error: "Failed to update product or slug already exists" };
  }
}
