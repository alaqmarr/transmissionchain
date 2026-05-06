import GearLoader from "@/components/ui/GearLoader";

export default function ProductsLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center pt-24">
      <GearLoader size="md" text="Loading Products" />
    </div>
  );
}
