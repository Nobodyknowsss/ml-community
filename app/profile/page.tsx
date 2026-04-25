"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { RANKS, ROLES } from "@/lib/types";

// Mock profile data
const MOCK_PROFILE = {
  id: "user-123",
  username: "ShadowHunter",
  currentRank: "Legend",
  peakRank: "Mythic",
  role: "Mid Laner",
  mlbbId: "123456789",
  totalMatches: 1247,
  winRate: 67.5,
  avatarUrl:
    "https://images.unsplash.com/photo-1535713566543-0c97ff38bfa6?w=200&h=200&fit=crop",
};

const DEFAULT_AVATARS = ["👾", "🎮", "👑", "⚡", "🔥", "💎", "🎯", "🏆"];

export default function ProfilePage() {
  const [username, setUsername] = useState(MOCK_PROFILE.username);
  const [mlbbId, setMlbbId] = useState(MOCK_PROFILE.mlbbId);
  const [role, setRole] = useState(MOCK_PROFILE.role);
  const [currentRank, setCurrentRank] = useState(MOCK_PROFILE.currentRank);
  const [peakRank, setPeakRank] = useState(MOCK_PROFILE.peakRank);
  const [totalMatches, setTotalMatches] = useState(MOCK_PROFILE.totalMatches);
  const [winRate, setWinRate] = useState(MOCK_PROFILE.winRate);
  const [avatarUrl, setAvatarUrl] = useState(MOCK_PROFILE.avatarUrl);
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("Philippines");
  const [language, setLanguage] = useState("EN");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    setAvatarUrl(MOCK_PROFILE.avatarUrl);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-green-400 uppercase tracking-widest mb-12">
          Profile Settings
        </h1>

        <form className="space-y-8">
          {/* Personal Information Section */}
          <section className="bg-linear-to-br from-gray-900 to-black border border-green-600/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-400 uppercase tracking-wide mb-8">
              Personal Information
            </h2>

            {/* Avatar Section */}
            <div className="mb-8">
              <label className="block text-gray-300 font-semibold mb-4 uppercase tracking-wide">
                My Avatar
              </label>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-lg border-2 border-green-600 overflow-hidden">
                    <Image
                      src={avatarUrl}
                      alt={username}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-500 text-black p-1 rounded-lg cursor-pointer transition-colors">
                    <Upload size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleDeletePhoto}
                  className="text-red-500 hover:text-red-400 font-semibold text-sm underline transition-colors"
                >
                  Delete photo
                </button>
              </div>

              {/* Default Avatars */}
              <div className="mt-4 flex gap-2">
                <span className="text-xs text-gray-500 uppercase tracking-wide self-center">
                  Or choose default:
                </span>
                <div className="flex gap-2">
                  {DEFAULT_AVATARS.map((avatar) => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() =>
                        setAvatarUrl(`data:text/plain;base64,${btoa(avatar)}`)
                      }
                      className="text-2xl hover:scale-110 transition-transform"
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* IGN*/}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                IGN
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600 transition-colors"
              />
            </div>

            {/* MLBB ID */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                MLBB ID
              </label>
              <input
                type="text"
                value={mlbbId}
                onChange={(e) => setMlbbId(e.target.value)}
                className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600 transition-colors"
              />
            </div>

            {/* Role */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                Main Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600 transition-colors"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Current Rank */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                Current Rank
              </label>
              <select
                value={currentRank}
                onChange={(e) => setCurrentRank(e.target.value)}
                className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600 transition-colors"
              >
                {RANKS.map((rank) => (
                  <option key={rank} value={rank}>
                    {rank}
                  </option>
                ))}
              </select>
            </div>

            {/* Peak Rank */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                Peak Rank
              </label>
              <select
                value={peakRank}
                onChange={(e) => setPeakRank(e.target.value)}
                className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600 transition-colors"
              >
                {RANKS.map((rank) => (
                  <option key={rank} value={rank}>
                    {rank}
                  </option>
                ))}
              </select>
            </div>

            {/* Total Matches */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                Total Matches
              </label>
              <input
                type="number"
                value={totalMatches}
                onChange={(e) => setTotalMatches(Number(e.target.value))}
                className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600 transition-colors"
              />
            </div>

            {/* Win Rate */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                Win Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={winRate}
                onChange={(e) => setWinRate(Number(e.target.value))}
                className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600 transition-colors"
              />
            </div>

            {/* Birthday */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                Birthday
              </label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600 transition-colors"
              />
            </div>

            {/* Language */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                Website Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600 transition-colors"
              >
                <option>EN - English</option>
                <option>ES - Spanish</option>
                <option>FR - French</option>
                <option>DE - German</option>
                <option>ZH - Chinese</option>
              </select>
            </div>

            {/* Country */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600 transition-colors"
              >
                <option>Philippines</option>
                <option>Indonesia</option>
                <option>Malaysia</option>
                <option>Singapore</option>
                <option>Thailand</option>
                <option>Vietnam</option>
              </select>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg uppercase tracking-wide transition-colors"
            >
              Save
            </button>
          </div>
        </form>

        {/* Contact Methods Section */}
        <section className="bg-linear-to-br from-gray-900 to-black border border-green-600/30 rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-green-400 uppercase tracking-wide mb-8">
            Contact Methods for Communication
          </h2>

          <p className="text-gray-400 text-sm mb-6 uppercase tracking-wide">
            Select contact methods
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <select className="flex-1 bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-600">
                <option>Select a contact method</option>
                <option>Email</option>
                <option>Phone</option>
                <option>Discord</option>
                <option>Facebook</option>
                <option>Telegram</option>
              </select>
              <input
                type="text"
                placeholder="URL"
                className="flex-1 bg-gray-800/50 border border-green-600/30 rounded-lg px-4 py-2 text-green-400 placeholder-gray-500 focus:outline-none focus:border-green-600"
              />
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 px-6 py-2 bg-green-600/20 border border-green-600/30 text-green-400 font-semibold rounded-lg hover:bg-green-600/30 transition-colors uppercase tracking-wide"
          >
            + Add Contact Method
          </button>
        </section>
      </div>
    </div>
  );
}
