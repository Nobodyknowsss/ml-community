"use client";

export interface ScrimPost {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  maxPlayers: number;
  currentPlayers: number;
  roles: string[];
  minRank: string;
  timestamp: string;
}

interface ScrimCardProps {
  scrim: ScrimPost;
}

export function ScrimCard({ scrim }: ScrimCardProps) {
  return (
    <div className="border border-green-600/30 rounded-lg bg-linear-to-br from-gray-900 to-black p-5 hover:border-green-500/50 transition-all">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-green-400 mb-1">{scrim.title}</h3>
        <p className="text-sm text-gray-300">{scrim.description}</p>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex gap-4 text-xs">
          <div>
            <p className="text-gray-500 mb-1">Date & Time</p>
            <p className="text-green-400 font-semibold">
              {scrim.date} at {scrim.time}
            </p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Players</p>
            <p className="text-green-400 font-semibold">
              {scrim.currentPlayers}/{scrim.maxPlayers}
            </p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Min Rank</p>
            <p className="text-green-400 font-semibold">{scrim.minRank}</p>
          </div>
        </div>
      </div>

      {scrim.roles.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {scrim.roles.map((role) => (
            <span
              key={role}
              className="px-2 py-1 text-xs bg-green-600/20 border border-green-600/50 text-green-300 rounded font-semibold"
            >
              {role}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 bg-green-600 text-black font-bold rounded text-sm hover:bg-green-500 transition-colors">
          Join
        </button>
        <button className="flex-1 px-3 py-2 border border-green-600 text-green-400 font-bold rounded text-sm hover:bg-green-600/10 transition-colors">
          Details
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-3">{scrim.timestamp}</p>
    </div>
  );
}
