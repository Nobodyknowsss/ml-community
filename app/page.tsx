"use client";

import { useState } from "react";
import { ScrimCard, type ScrimPost } from "@/components/scrim-card";
import { PlayerCard, type PlayerPost } from "@/components/player-card";
import { SquadCard, type SquadPost } from "@/components/squad-card";

type FilterType = "scrims" | "players" | "squads";

// Mock data
const SCRIMS: ScrimPost[] = [
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

const PLAYERS: PlayerPost[] = [
  {
    id: "1",
    username: "ShadowHunter",
    avatar: "/mlbb icon.jpg",
    rank: "Legend",
    mlId: "SH#12345",
    roles: ["Mid", "Jungle"],
    description:
      "Competitive mid/jungle main looking for serious team. Can commit to practice schedule.",
    availability: "Daily 7PM-11PM",
    timestamp: "1 hour ago",
  },
  {
    id: "2",
    username: "IceBreaker",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    rank: "Mythic",
    mlId: "IB#67890",
    roles: ["Support"],
    description:
      "Dedicated support player with excellent macro. Looking for climb partners.",
    availability: "Weekends",
    timestamp: "45 minutes ago",
  },
  {
    id: "3",
    username: "FireStrike",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rank: "Epic",
    mlId: "FS#54321",
    roles: ["ADC"],
    description:
      "ADC main grinding ranked. Good mechanics and team coordination.",
    availability: "Evenings & Weekends",
    timestamp: "30 minutes ago",
  },
];

const SQUADS: SquadPost[] = [
  {
    id: "1",
    teamName: "Phoenix Rising",
    logo: "/mlbb icon.jpg",
    currentRank: "Mythic",
    rolesNeeded: ["Mid", "ADC"],
    description:
      "Competitive team actively competing in tournaments. Looking to strengthen our roster.",
    minRank: "Legend",
    playStyle: "Aggressive Early Game",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    teamName: "Shadow Crew",
    logo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    currentRank: "Epic",
    rolesNeeded: ["Jungle", "Support"],
    description:
      "Casual to competitive team. We value team chemistry and communication.",
    minRank: "Master",
    playStyle: "Balanced",
    timestamp: "1 hour ago",
  },
  {
    id: "3",
    teamName: "Dragon Slayers",
    logo: "https://images.unsplash.com/photo-1517849845537-1d51a20414de?w=100&h=100&fit=crop",
    currentRank: "Legend",
    rolesNeeded: ["Mid"],
    description:
      "New team building roster. Everyone welcome as long as you're committed!",
    minRank: "Epic",
    playStyle: "Strategic & Slow Burn",
    timestamp: "45 minutes ago",
  },
];

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("scrims");

  const filterButtons: { label: string; value: FilterType; icon: string }[] = [
    { label: "Scrims", value: "scrims", icon: "🎮" },
    { label: "Players", value: "players", icon: "👤" },
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
            Find scrims, teams, and players. Connect with the competitive
            community.
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
                onClick={() => setActiveFilter(btn.value)}
                className={`px-4 py-2 rounded-lg font-bold transition-all uppercase tracking-wide text-sm ${
                  activeFilter === btn.value
                    ? "bg-green-500 text-black border border-green-400"
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
          {/* Scrims */}
          {activeFilter === "scrims" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-green-400 mb-6">
                Available Scrims
              </h2>
              {SCRIMS.length > 0 ? (
                SCRIMS.map((scrim) => (
                  <ScrimCard key={scrim.id} scrim={scrim} />
                ))
              ) : (
                <div className="text-center text-gray-400">
                  No scrims available
                </div>
              )}
            </div>
          )}

          {/* Players */}
          {activeFilter === "players" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-green-400 mb-6">
                Players Looking for Teams
              </h2>
              {PLAYERS.length > 0 ? (
                PLAYERS.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))
              ) : (
                <div className="text-center text-gray-400">
                  No players found
                </div>
              )}
            </div>
          )}

          {/* Squads */}
          {activeFilter === "squads" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-green-400 mb-6">
                Teams Looking for Members
              </h2>
              {SQUADS.length > 0 ? (
                SQUADS.map((squad) => (
                  <SquadCard key={squad.id} squad={squad} />
                ))
              ) : (
                <div className="text-center text-gray-400">No teams found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
