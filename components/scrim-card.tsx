"use client";

import Image from "next/image";
import { Clock, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ScrimCardProps {
  id?: string;
  teamName?: string;
  teamLogo?: string;
  region?: string;
  gameType?: string;
  minRank?: string;
  maxRank?: string;
  time?: string;
  minRankIcon?: string;
  maxRankIcon?: string;
  scrim?: ScrimPost;
}

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

export function ScrimCard({
  teamName,
  teamLogo,
  region,
  gameType,
  minRank,
  maxRank,
  time,
  minRankIcon,
  maxRankIcon,
  scrim,
}: ScrimCardProps) {
  const router = useRouter();
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinScrim = async () => {
    setIsJoining(true);
    try {
      // Check if user is logged in
      const res = await fetch("/api/auth/session");
      
      if (!res.ok) {
        // Not logged in, redirect to signup
        router.push("/signup");
      } else {
        // User is logged in, functionality to be added later
        console.log("User joined scrim - functionality pending");
      }
    } catch (error) {
      console.error("Error checking session:", error);
      router.push("/signup");
    } finally {
      setIsJoining(false);
    }
  };
  // If scrim prop is provided, render ScrimPost format
  if (scrim) {
    return (
      <div className="bg-linear-to-br from-gray-900 to-black border border-green-600/30 rounded-lg overflow-hidden hover:border-green-600/60 transition-colors">
        <div className="p-6">
          {/* Title */}
          <h3 className="text-lg font-bold text-green-400 mb-2">
            {scrim.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {scrim.description}
          </p>

          {/* Date and Time */}
          <div className="flex gap-4 mb-4 text-sm text-gray-500">
            <span>{scrim.date}</span>
            <span>{scrim.time}</span>
          </div>

          {/* Roles */}
          <div className="flex flex-wrap gap-2 mb-4">
            {scrim.roles.map((role) => (
              <span
                key={role}
                className="px-2 py-1 bg-green-600/20 border border-green-600/50 rounded text-xs font-semibold text-green-400"
              >
                {role}
              </span>
            ))}
          </div>

          {/* Rank and Players */}
          <div className="flex justify-between items-center text-sm text-gray-400 border-t border-green-600/20 pt-4">
            <span className="font-semibold">{scrim.minRank}+</span>
            <span>
              {scrim.currentPlayers}/{scrim.maxPlayers} players
            </span>
            <span className="text-xs text-gray-500">{scrim.timestamp}</span>
          </div>

          {/* Join Scrim Button */}
          <button
            onClick={handleJoinScrim}
            disabled={isJoining}
            className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-green-700 text-black font-bold rounded-lg uppercase tracking-wide transition-colors"
          >
            {isJoining ? "Joining..." : "Join Scrim"}
          </button>
        </div>
      </div>
    );
  }

  // Default team-based format
  return (
    <div className="relative bg-linear-to-br from-gray-900 to-black border border-green-600/30 rounded-lg overflow-hidden hover:border-green-600/60 transition-colors">
      {/* Game Type Badge - Top Left */}
      {gameType && (
        <div className="absolute top-4 left-4 bg-green-600 text-black px-3 py-1 rounded font-bold text-sm uppercase tracking-wide z-10">
          {gameType}
        </div>
      )}

      {/* Card Content */}
      <div className="p-6">
        {/* Team Logo and Info */}
        <div className="flex flex-col items-center mb-6">
          {teamLogo ? (
            <div className="w-24 h-24 mb-4 flex items-center justify-center relative">
              <Image
                src={teamLogo}
                alt={teamName || "Team"}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-24 h-24 mb-4 bg-gray-800 rounded-full flex items-center justify-center border border-green-600/30">
              <span className="text-gray-500 text-2xl font-bold">
                {teamName?.substring(0, 1) || "?"}
              </span>
            </div>
          )}

          <h3 className="text-lg font-bold text-green-400 text-center mb-2">
            {teamName}
          </h3>

          {/* Region */}
          {region && (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Globe size={16} />
              <span className="uppercase tracking-wide">{region}</span>
            </div>
          )}
        </div>

        {/* Rank Section */}
        {minRank && maxRank && (
          <div className="flex items-center justify-between mb-6 px-4">
            <div className="text-center flex-1">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                Min
              </div>
              <div className="flex flex-col items-center">
                {minRankIcon && (
                  <Image
                    src={minRankIcon}
                    alt={minRank}
                    width={32}
                    height={32}
                    className="mb-1"
                  />
                )}
                <span className="text-gray-300 text-sm font-semibold">
                  {minRank}
                </span>
              </div>
            </div>

            <div className="text-green-600 text-2xl font-bold px-3">»</div>

            <div className="text-center flex-1">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                Max
              </div>
              <div className="flex flex-col items-center">
                {maxRankIcon && (
                  <Image
                    src={maxRankIcon}
                    alt={maxRank}
                    width={32}
                    height={32}
                    className="mb-1"
                  />
                )}
                <span className="text-gray-300 text-sm font-semibold">
                  {maxRank}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Time Section */}
        {time && (
          <div className="flex items-center justify-center gap-2 text-green-400 border-t border-green-600/30 pt-4">
            <Clock size={18} />
            <span className="text-sm font-semibold">{time}</span>
          </div>
        )}

        {/* Join Scrim Button */}
        <button
          onClick={handleJoinScrim}
          disabled={isJoining}
          className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-green-700 text-black font-bold rounded-lg uppercase tracking-wide transition-colors"
        >
          {isJoining ? "Joining..." : "Join Scrim"}
        </button>
      </div>
    </div>
  );
}
