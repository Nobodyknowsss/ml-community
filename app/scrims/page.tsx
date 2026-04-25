import { Metadata } from "next";
import { mockScrims } from "@/lib/mockdata/scrims";
import { ScrimCard } from "@/components/scrim-card";

export const metadata: Metadata = {
  title: "Scrims - Game",
  description: "Find and join scrim matches",
};

export default function ScrimsPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-400 uppercase tracking-widest mb-2">
            SCRIMS
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Find and join scrim matches with teams
          </p>
        </div>

        {/* Scrim Grid - Mobile First */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockScrims.map((scrim) => (
            <ScrimCard key={scrim.id} {...scrim} />
          ))}
        </div>
      </div>
    </main>
  );
}
