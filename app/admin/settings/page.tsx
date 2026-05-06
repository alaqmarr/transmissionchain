import prisma from "@/lib/prisma";
import { getR2StorageStats } from "@/lib/r2";
import SettingsForm from "@/components/admin/SettingsForm";
import { HardDrive } from "lucide-react";

export default async function SettingsPage() {
  const settingsRecords = await prisma.setting.findMany();
  
  // Convert array of {key, value} to an object
  const settings: Record<string, string> = {};
  for (const s of settingsRecords) {
    settings[s.key] = s.value;
  }

  // Get R2 Stats
  const r2Stats = await getR2StorageStats();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-brand-black">Platform Settings</h1>
      
      {/* Cloudflare R2 Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 flex items-center gap-6">
        <div className="bg-orange-50 p-4 rounded-full text-orange-500">
          <HardDrive className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Cloudflare R2 Storage</h2>
          {r2Stats ? (
            <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
              <p><span className="font-semibold text-brand-black">{r2Stats.formattedUsed}</span> used</p>
              <p><span className="font-semibold text-brand-black">{r2Stats.itemCount}</span> total items</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-1">Unable to fetch storage stats. Check R2 configuration in environment variables.</p>
          )}
        </div>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}
