"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import type { CreateScrimFormData } from "@/lib/types";
import { RANKS } from "@/lib/types";

export default function CreateScrimPage() {
  const [formData, setFormData] = useState<CreateScrimFormData>({
    squadType: "full",
    teamName: "",
    teamLogo: undefined,
    minRank: "Legend",
    maxRank: "Mythic",
    gameFormat: "Games",
    gameCount: 1,
    date: "",
    time: "",
  });

  const [logoPreview, setLogoPreview] = useState<string>("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setFormData({ ...formData, teamLogo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteLogo = () => {
    setLogoPreview("");
    setFormData({ ...formData, teamLogo: undefined });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "gameCount" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.teamName.trim()) {
      setError("Team name is required");
      return;
    }
    if (!formData.date) {
      setError("Date is required");
      return;
    }
    if (!formData.time) {
      setError("Time is required");
      return;
    }

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setSuccess("Scrim created successfully!");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-green-400 uppercase tracking-widest mb-12">
          Create Scrim
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Squad Type Section */}
          <section className="bg-linear-to-br from-gray-900 to-black border border-green-600/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-400 uppercase tracking-wide mb-8">
              Squad Type
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="squadType"
                  value="full"
                  checked={formData.squadType === "full"}
                  onChange={handleChange}
                  className="hidden"
                />
                <div
                  className={`p-6 rounded-lg border-2 transition-all ${
                    formData.squadType === "full"
                      ? "border-green-600 bg-green-600/10"
                      : "border-green-600/30 bg-gray-800/30 hover:border-green-600/60"
                  }`}
                >
                  <p className="text-lg font-bold text-green-400 mb-2">
                    Full Squad
                  </p>
                  <p className="text-sm text-gray-400">5v5 Complete Squad</p>
                </div>
              </label>

              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="squadType"
                  value="open"
                  checked={formData.squadType === "open"}
                  onChange={handleChange}
                  className="hidden"
                />
                <div
                  className={`p-6 rounded-lg border-2 transition-all ${
                    formData.squadType === "open"
                      ? "border-green-600 bg-green-600/10"
                      : "border-green-600/30 bg-gray-800/30 hover:border-green-600/60"
                  }`}
                >
                  <p className="text-lg font-bold text-green-400 mb-2">
                    Open Squad
                  </p>
                  <p className="text-sm text-gray-400">Looking for Players</p>
                </div>
              </label>
            </div>
          </section>

          {/* Team Information Section */}
          <section className="bg-linear-to-br from-gray-900 to-black border border-green-600/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-400 uppercase tracking-wide mb-8">
              Team Information
            </h2>

            {/* Team Logo */}
            <div className="mb-8">
              <label className="block text-gray-300 font-semibold mb-4 uppercase tracking-wide">
                Team Logo
              </label>
              <div className="flex items-center gap-6">
                {logoPreview ? (
                  <div className="relative">
                    <div className="w-24 h-24 rounded-lg border-2 border-green-600 overflow-hidden">
                      <Image
                        src={logoPreview}
                        alt="Team Logo"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleDeleteLogo}
                      className="text-red-500 hover:text-red-400 font-semibold text-sm underline transition-colors ml-4"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <label className="w-24 h-24 rounded-lg border-2 border-dashed border-green-600/50 flex items-center justify-center cursor-pointer hover:border-green-600 transition-colors">
                    <Upload size={32} className="text-green-600/50" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Team Name */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                Team Name
              </label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                placeholder="Enter team name"
                className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 placeholder-gray-500 focus:outline-none focus:border-green-600 transition-colors"
              />
            </div>
          </section>

          {/* Rank Section */}
          <section className="bg-linear-to-br from-gray-900 to-black border border-green-600/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-400 uppercase tracking-wide mb-8">
              Rank Requirements
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Min Rank */}
              <div>
                <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                  Minimum Rank
                </label>
                <select
                  name="minRank"
                  value={formData.minRank}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600 transition-colors"
                >
                  {RANKS.map((rank) => (
                    <option key={rank} value={rank}>
                      {rank}
                    </option>
                  ))}
                </select>
              </div>

              {/* Max Rank */}
              <div>
                <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                  Maximum Rank
                </label>
                <select
                  name="maxRank"
                  value={formData.maxRank}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600 transition-colors"
                >
                  {RANKS.map((rank) => (
                    <option key={rank} value={rank}>
                      {rank}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Game Type Section */}
          <section className="bg-linear-to-br from-gray-900 to-black border border-green-600/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-400 uppercase tracking-wide mb-8">
              Game Format
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Format Type */}
              <div>
                <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                  Format Type
                </label>
                <select
                  name="gameFormat"
                  value={formData.gameFormat}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600 transition-colors"
                >
                  <option value="Games">Games</option>
                  <option value="Best of">Best of</option>
                </select>
              </div>

              {/* Game Count */}
              <div>
                <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                  Number of{" "}
                  {formData.gameFormat === "Best of" ? "Games" : "Games"}
                </label>
                <input
                  type="number"
                  name="gameCount"
                  value={formData.gameCount}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600 transition-colors"
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Examples: 1 Game, 3 Games, Best of 5, Best of 7, etc.
            </p>
          </section>

          {/* Date & Time Section */}
          <section className="bg-linear-to-br from-gray-900 to-black border border-green-600/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-400 uppercase tracking-wide mb-8">
              Schedule
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Date */}
              <div>
                <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600 transition-colors"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600 transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Error Message */}
          {error && (
            <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4">
              <p className="text-red-400 text-sm font-semibold">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-4">
              <p className="text-green-400 text-sm font-semibold">{success}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-600 text-black font-bold rounded-lg uppercase tracking-wide transition-colors"
            >
              {isSubmitting ? "Creating..." : "Create Scrim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
