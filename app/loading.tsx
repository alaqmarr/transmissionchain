import GearLoader from "@/components/ui/GearLoader";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: "2s" }} />
      
      {/* Chain track decoration */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 overflow-hidden opacity-[0.03] pointer-events-none">
        <div className="animate-chain-move flex">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-8 h-4 border-2 border-brand-black rounded-md mx-1" />
          ))}
        </div>
      </div>

      {/* Loader */}
      <GearLoader size="lg" text="Loading" />
    </div>
  );
}
