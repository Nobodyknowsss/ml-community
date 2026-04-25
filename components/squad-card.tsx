"use client";

import Image from "next/image";

export interface SquadPost {
  id: string;
  teamName: string;
  logo: string;
  currentRank: string;
  rolesNeeded: string[];
  description: string;
  minRank: string;
  playStyle: string;
  timestamp: string;
}

interface SquadCardProps {
  squad: SquadPost;
}

export function SquadCard({ squad }: SquadCardProps) {
  return (
    <div className="border border-green-600/30 rounded-lg bg-linear-to-br from-gray-900 to-black p-5 hover:border-green-500/50 transition-all">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-green-600/20 border border-green-600/30">
          <Image
            src={squad.logo}
            alt={squad.teamName}
            width={56}
            height={56}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/mlbb icon.jpg";
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-green-400 mb-1">
            {squad.teamName}
          </h3>
          <div className="inline-block px-2 py-1 bg-green-600/20 border border-green-600/50 rounded text-xs font-bold text-green-300">
            {squad.currentRank}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-300 mb-4">{squad.description}</p>

      <div className="space-y-2 mb-4 text-xs">
        <div>
          <p className="text-gray-500">Min Rank Required</p>
          <p className="text-green-400 font-semibold">{squad.minRank}</p>
        </div>
        <div>
          <p className="text-gray-500">Play Style</p>
          <p className="text-green-400 font-semibold">{squad.playStyle}</p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {squad.rolesNeeded.map((role) => (
          <span
            key={role}
            className="px-2 py-1 text-xs bg-green-600/20 border border-green-600/50 text-green-300 rounded font-semibold"
          >
            {role}
          </span>
        ))}
      </div>

      <button className="w-full px-3 py-2 bg-green-600 text-black font-bold rounded text-sm hover:bg-green-500 transition-colors">
        Apply
      </button>

      <p className="text-xs text-gray-500 mt-3">{squad.timestamp}</p>
    </div>
  );
}
