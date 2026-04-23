"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock user profile
const MOCK_USER_PROFILE = {
  username: "ShadowHunter",
  currentRank: "Legend",
  currentRankStars: 3,
  peakRank: "Mythic",
  peakRankStars: 5,
  role: "Mid Laner",
  mlbbId: "123456789",
};

const ROLES = ["Tank", "Jungle", "Mid", "ADC", "Support"];
const RANKS = [
  "Warrior",
  "Elite",
  "Master",
  "Grand Master",
  "Epic",
  "Legend",
  "Mythic",
];

export default function LookingForTeammateePage() {
  const [squadName, setSquadName] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [requiredRank, setRequiredRank] = useState("warrior");
  const [squadDescription, setSquadDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!squadName.trim()) {
      setError("Squad name is required");
      return;
    }

    if (selectedRoles.length === 0) {
      setError("Please select at least one role");
      return;
    }

    if (!squadDescription.trim()) {
      setError("Squad description is required");
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSuccess("Squad opening posted successfully!");
      setSquadName("");
      setSelectedRoles([]);
      setRequiredRank("warrior");
      setSquadDescription("");
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black p-4 pt-20 md:p-6 md:pt-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <Link
            href="/create"
            className="flex items-center gap-2 text-green-400 hover:text-green-300 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-green-400 uppercase tracking-wider">
            Looking for Teammate
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-2">
            Build your squad by posting roles you need
          </p>
        </div>

        {/* User Profile Info */}
        <div className="bg-gray-800/50 border border-green-600/20 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-xs text-gray-400 font-semibold">USERNAME</p>
              <p className="text-green-400 font-bold">
                {MOCK_USER_PROFILE.username}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold">
                CURRENT RANK
              </p>
              <p className="text-green-400 font-bold">
                {MOCK_USER_PROFILE.currentRank}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold">PEAK RANK</p>
              <p className="text-green-300 font-bold">
                {MOCK_USER_PROFILE.peakRank}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold">MAIN ROLE</p>
              <p className="text-blue-400 font-bold">
                {MOCK_USER_PROFILE.role}
              </p>
            </div>
          </div>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-300 text-sm">
            {success}
          </div>
        )}

        {/* Form */}
        <div className="bg-gray-900 border border-green-600/30 rounded-lg p-6 md:p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Squad Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 block">
                Squad / Team Name
              </label>
              <Input
                placeholder="Your squad name"
                value={squadName}
                onChange={(e) => setSquadName(e.target.value)}
                className="bg-gray-800 border border-green-600/30 text-gray-100 placeholder-gray-500"
              />
            </div>

            {/* Roles Needed */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 block">
                Roles Needed (Select Multiple)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {ROLES.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRole(role)}
                    className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                      selectedRoles.includes(role)
                        ? "bg-green-600 text-black border border-green-400"
                        : "bg-gray-800 text-gray-300 border border-green-600/30 hover:border-green-500/50"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Required Rank */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 block">
                Minimum Required Rank
              </label>
              <select
                value={requiredRank}
                onChange={(e) => setRequiredRank(e.target.value)}
                className="w-full bg-gray-800 border border-green-600/30 text-gray-100 px-3 py-2 rounded-lg focus:border-green-500 transition-colors"
              >
                {RANKS.map((rank) => (
                  <option key={rank} value={rank.toLowerCase()}>
                    {rank}
                  </option>
                ))}
              </select>
            </div>

            {/* Squad Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 block">
                Squad Description
              </label>
              <textarea
                placeholder="Describe your squad, playstyle, goals, what you're looking for in teammates, practice schedule, etc..."
                rows={6}
                value={squadDescription}
                onChange={(e) => setSquadDescription(e.target.value)}
                className="w-full bg-gray-800 border border-green-600/30 text-gray-100 placeholder-gray-500 rounded-lg p-3 focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-colors"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold py-3 rounded-lg transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span>Posting...</span>
                  </>
                ) : (
                  "Post Squad Opening"
                )}
              </button>
              <Link
                href="/create"
                className={`px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-lg transition-colors ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
