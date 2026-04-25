"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Clock, Globe } from "lucide-react";
import { RANK_ICONS } from "@/lib/rank-icons";
import { useRouter } from "next/navigation";

interface ScrimData {
  id: number;
  squadType: string;
  teamName: string;
  teamLogo: string | null;
  minRank: string;
  maxRank: string;
  gameFormat: string;
  gameCount: number;
  date: string;
  time: string;
  author: {
    id: number;
    username: string;
    ign: string;
  };
}

export default function ScrimsPage() {
  const [scrims, setScrims] = useState<ScrimData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joiningId, setJoiningId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchScrims = async () => {
      try {
        const response = await fetch("/api/scrim/list");
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Failed to fetch scrims");
          return;
        }

        setScrims(data.scrims || []);
      } catch (err) {
        setError("Failed to fetch scrims");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScrims();
  }, []);

  const getRankIcon = (rank: string): string => {
    return RANK_ICONS[rank] || "/mlbb-ranks/warrior.png";
  };

  const formatDateTime = (date: string, time: string): string => {
    try {
      // Parse date (YYYY-MM-DD)
      const dateObj = new Date(date + "T00:00:00");
      const monthName = dateObj.toLocaleString("en-US", { month: "long" });
      const day = dateObj.getDate();

      // Parse time (HH:MM)
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;

      return `${monthName} ${day}, ${displayHour}:${minutes} ${ampm}`;
    } catch (err) {
      return `${date} ${time}`;
    }
  };

  const handleJoinScrim = async (scrimId: number) => {
    setJoiningId(scrimId);
    try {
      // Check if user is logged in
      const res = await fetch("/api/auth/session");
      
      if (!res.ok) {
        // Not logged in, redirect to signup
        router.push("/signup");
      } else {
        // User is logged in, functionality to be added later
        console.log("User joined scrim:", scrimId);
      }
    } catch (error) {
      console.error("Error checking session:", error);
      router.push("/signup");
    } finally {
      setJoiningId(null);
    }
  };

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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Loading scrims...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 mb-8">
            <p className="text-red-400 font-semibold">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && scrims.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No scrims available</p>
          </div>
        )}

        {/* Scrim Grid - Mobile First */}
        {!loading && scrims.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scrims.map((scrim) => (
              <div
                key={scrim.id}
                className="relative bg-linear-to-br from-gray-900 to-black border border-green-600/30 rounded-lg overflow-hidden hover:border-green-600/60 transition-colors"
              >
                {/* Squad Type Badge */}
                <div className="absolute top-4 left-4 bg-green-600 text-black px-3 py-1 rounded font-bold text-sm uppercase tracking-wide z-10">
                  {scrim.squadType}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Team Logo and Info */}
                  <div className="flex flex-col items-center mb-6">
                    {scrim.teamLogo ? (
                      <div className="w-24 h-24 mb-4 flex items-center justify-center relative">
                        <Image
                          src={scrim.teamLogo}
                          alt={scrim.teamName}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 mb-4 bg-gray-800 rounded-full flex items-center justify-center border border-green-600/30">
                        <span className="text-gray-500 text-2xl font-bold">
                          {scrim.teamName?.substring(0, 1) || "?"}
                        </span>
                      </div>
                    )}

                    <h3 className="text-lg font-bold text-green-400 text-center mb-2">
                      {scrim.teamName}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Globe size={16} />
                      <span className="uppercase tracking-wide">
                        {scrim.author.ign}
                      </span>
                    </div>
                  </div>

                  {/* Rank Section with Images */}
                  <div className="flex items-center justify-between mb-6 px-4">
                    <div className="text-center flex-1">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                        Min
                      </div>
                      <div className="flex flex-col items-center">
                        <Image
                          src={getRankIcon(scrim.minRank)}
                          alt={scrim.minRank}
                          width={40}
                          height={40}
                          className="mb-1"
                        />
                        <span className="text-gray-300 text-xs font-semibold">
                          {scrim.minRank}
                        </span>
                      </div>
                    </div>

                    <div className="text-green-600 text-2xl font-bold px-3">
                      »
                    </div>

                    <div className="text-center flex-1">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                        Max
                      </div>
                      <div className="flex flex-col items-center">
                        <Image
                          src={getRankIcon(scrim.maxRank)}
                          alt={scrim.maxRank}
                          width={40}
                          height={40}
                          className="mb-1"
                        />
                        <span className="text-gray-300 text-xs font-semibold">
                          {scrim.maxRank}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Game Format Info */}
                  <div className="text-center text-sm text-gray-400 border-t border-green-600/20 pt-4 mb-4">
                    <p className="font-semibold">
                      {scrim.gameFormat} - {scrim.gameCount}{" "}
                      {scrim.gameFormat === "Games" ? "Games" : "Round"}
                    </p>
                  </div>

                  {/* Date and Time Section */}
                  <div className="flex items-center justify-center gap-2 text-green-400 border-t border-green-600/30 pt-4 mb-4">
                    <Clock size={18} />
                    <span className="text-sm font-semibold">
                      {formatDateTime(scrim.date, scrim.time)}
                    </span>
                  </div>

                  {/* Join Scrim Button */}
                  <button
                    onClick={() => handleJoinScrim(scrim.id)}
                    disabled={joiningId === scrim.id}
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-green-700 text-black font-bold rounded-lg uppercase tracking-wide transition-colors"
                  >
                    {joiningId === scrim.id ? "Joining..." : "Join Scrim"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
