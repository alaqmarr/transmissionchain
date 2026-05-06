import prisma from "@/lib/prisma";
import GalleryManager from "./GalleryManager";

export const metadata = {
  title: "Manage Gallery | Admin",
};

export default async function AdminGalleryPage() {
  const images = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Gallery</h1>
      <GalleryManager initialImages={images} />
    </div>
  );
}
