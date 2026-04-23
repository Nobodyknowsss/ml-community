"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LookingForScrimPage() {
  const [averageRank, setAverageRank] = useState("warrior");
  const [mythicStars, setMythicStars] = useState("");
  const [teamName, setTeamName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    // Validate form
    if (!teamName.trim()) {
      setError("Team name is required");
      setIsSubmitting(false);
      return;
    }
    if (!date) {
      setError("Date is required");
      setIsSubmitting(false);
      return;
    }
    if (!time) {
      setError("Time is required");
      setIsSubmitting(false);
      return;
    }
    if (!description.trim()) {
      setError("Description is required");
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setSuccess("Scrim posted successfully!");
      setTeamName("");
      setDate("");
      setTime("");
      setDescription("");
      setMythicStars("");
      setAverageRank("warrior");
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
            Looking for Scrim
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-2">
            Find players to practice and compete with
          </p>
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
            {/* Team Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 block">
                Team / Squad Name
              </label>
              <Input
                placeholder="Your team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
                className="bg-gray-800 border border-green-600/30 text-gray-100 placeholder-gray-500"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 block">
                  Date
                </label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="bg-gray-800 border border-green-600/30 text-gray-100 placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 block">
                  Time
                </label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="bg-gray-800 border border-green-600/30 text-gray-100 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Average Rank */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 block">
                Average Rank
              </label>
              <select
                value={averageRank}
                onChange={(e) => setAverageRank(e.target.value)}
                className="w-full bg-gray-800 border border-green-600/30 text-gray-100 px-3 py-2 rounded-lg focus:border-green-500 transition-colors"
              >
                <option value="warrior">Warrior</option>
                <option value="elite">Elite</option>
                <option value="master">Master</option>
                <option value="grandmaster">Grand Master</option>
                <option value="epic">Epic</option>
                <option value="legend">Legend</option>
                <option value="mythic">Mythic</option>
              </select>
            </div>

            {/* Mythic Stars (conditional) */}
            {averageRank === "mythic" && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 block">
                  Mythic Stars
                </label>
                <Input
                  type="number"
                  min="0"
                  max="999"
                  placeholder="e.g., 50"
                  value={mythicStars}
                  onChange={(e) => setMythicStars(e.target.value)}
                  className="bg-gray-800 border border-green-600/30 text-gray-100 placeholder-gray-500"
                />
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 block">
                Description / Details
              </label>
              <textarea
                placeholder="Tell others about your team, playstyle, requirements, and what you're looking for..."
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                  "Post Scrim"
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
