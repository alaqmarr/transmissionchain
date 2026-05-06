import GearLoader from "@/components/ui/GearLoader";

export default function AdminLoading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <GearLoader size="sm" text="Loading" />
    </div>
  );
}
