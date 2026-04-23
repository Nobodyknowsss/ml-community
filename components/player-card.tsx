"use client";

export interface PlayerPost {
  id: string;
  username: string;
  avatar: string;
  rank: string;
  mlId: string;
  roles: string[];
  description: string;
  availability: string;
  timestamp: string;
}

interface PlayerCardProps {
  player: PlayerPost;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="border border-green-600/30 rounded-lg bg-linear-to-br from-gray-900 to-black p-5 hover:border-green-500/50 transition-all">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-green-600/20 border border-green-600/30">
          <img
            src={player.avatar}
            alt={player.username}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/mlbb icon.jpg";
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-green-400">
              {player.username}
            </h3>
          </div>
          <p className="text-xs text-gray-400 font-mono mb-1">{player.mlId}</p>
          <div className="inline-block px-2 py-1 bg-green-600/20 border border-green-600/50 rounded text-xs font-bold text-green-300">
            {player.rank}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-300 mb-4">{player.description}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        {player.roles.map((role) => (
          <span
            key={role}
            className="px-2 py-1 text-xs bg-green-600/20 border border-green-600/50 text-green-300 rounded font-semibold"
          >
            {role}
          </span>
        ))}
      </div>

      <p className="text-xs text-gray-500 mb-3">
        📅 Available: {player.availability}
      </p>

      <button className="w-full px-3 py-2 bg-green-600 text-black font-bold rounded text-sm hover:bg-green-500 transition-colors">
        Message
      </button>

      <p className="text-xs text-gray-500 mt-3">{player.timestamp}</p>
    </div>
  );
}
