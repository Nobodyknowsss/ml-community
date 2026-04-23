"use client";

import { useState } from "react";
import { ScrimCard, type ScrimPost } from "@/components/scrim-card";
import { SquadCard, type SquadPost } from "@/components/squad-card";

type FilterType = "scrims" | "squads";

// Mock data
const MOCK_SCRIMS: ScrimPost[] = [
  {
    id: "1",
    title: "Casual Scrim - All Welcome",
    description:
      "Just a chill scrim for players to warm up and practice. No rage, no toxicity!",
    date: "Today",
    time: "8:00 PM",
    maxPlayers: 5,
    currentPlayers: 3,
    roles: ["Mid", "ADC"],
    minRank: "Master",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    title: "Competitive Scrim - Ranked Teams",
    description: "High level competitive scrim. Serious teams only!",
    date: "Tomorrow",
    time: "7:30 PM",
    maxPlayers: 5,
    currentPlayers: 5,
    roles: ["Support"],
    minRank: "Legend",
    timestamp: "1 hour ago",
  },
  {
    id: "3",
    title: "Beginner Friendly Scrim",
    description: "Perfect for newer players to learn and improve.",
    date: "Tomorrow",
    time: "6:00 PM",
    maxPlayers: 5,
    currentPlayers: 2,
    roles: ["Any"],
    minRank: "Elite",
    timestamp: "30 minutes ago",
  },
];

const MOCK_SQUADS: SquadPost[] = [
  {
    id: "1",
    teamName: "Shadow Hunters",
    logo: "/mlbb icon.jpg",
    currentRank: "Legend",
    rolesNeeded: ["Tank", "Jungle"],
    description:
      "Looking for aggressive Tank and Jungle players to dominate ranked!",
    minRank: "Master",
    playStyle: "Aggressive",
    timestamp: "1 hour ago",
  },
  {
    id: "2",
    teamName: "Phoenix Rising",
    logo: "/mlbb icon.jpg",
    currentRank: "Epic",
    rolesNeeded: ["Support", "ADC"],
    description: "Climbing to Legend. Need coordinated Support and ADC pair.",
    minRank: "Epic",
    playStyle: "Balanced",
    timestamp: "30 minutes ago",
  },
];

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("scrims");
  const [isLoading, setIsLoading] = useState(false);
  const scrims = MOCK_SCRIMS;
  const squads = MOCK_SQUADS;

  const handleFilterChange = (filter: FilterType) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveFilter(filter);
      setIsLoading(false);
    }, 300);
  };

  const filterButtons: { label: string; value: FilterType; icon: string }[] = [
    { label: "Scrims", value: "scrims", icon: "🎮" },
    { label: "Teams", value: "squads", icon: "👥" },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="bg-linear-to-b from-green-900/20 to-black border-b border-green-600/20 pt-20 pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
            Join the Community
          </h1>
          <p className="text-gray-400">
            Find scrims and teams. Connect with the competitive community.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="sticky top-16 bg-black border-b border-green-600/20 px-4 py-4 z-40">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-2 md:gap-4">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => handleFilterChange(btn.value)}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg font-bold transition-all uppercase tracking-wide text-sm disabled:opacity-60 ${
                  activeFilter === btn.value
                    ? "bg-green-600 text-black border border-green-400"
                    : "bg-gray-900 text-green-400 border border-green-600/30 hover:border-green-500/50"
                }`}
              >
                <span className="mr-1">{btn.icon}</span>
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Loading Spinner */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-green-600/30 border-t-green-500 rounded-full animate-spin"></div>
                <p className="text-green-400 font-semibold">Loading...</p>
              </div>
            </div>
          )}

          {/* Scrims */}
          {!isLoading && activeFilter === "scrims" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-green-400 mb-6">
                Available Scrims
              </h2>
              {scrims.length > 0 ? (
                scrims.map((scrim) => (
                  <ScrimCard key={scrim.id} scrim={scrim} />
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">
                  No scrims available yet. Be the first to post one!
                </div>
              )}
            </div>
          )}

          {/* Squads */}
          {!isLoading && activeFilter === "squads" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-green-400 mb-6">
                Teams Looking for Members
              </h2>
              {squads.length > 0 ? (
                squads.map((squad) => (
                  <SquadCard key={squad.id} squad={squad} />
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">
                  No teams available yet. Be the first to post one!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
