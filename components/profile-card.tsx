"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

const ROLES = ["Tank", "Jungle", "Mid", "ADC", "Support"];
const RANKS = [
  "Warrior",
  "Elite",
  "Master",
  "Grand Master",
  "Epic",
  "Legend",
  "Mythic",
  "Mythic Honor",
];

export default function ProfileCard() {
  const [profileImage, setProfileImage] = useState<string>("/mlbb icon.jpg");
  const [username, setUsername] = useState("ShadowHunter");
  const [mlId, setMlId] = useState("SH#12345");
  const [selectedRole, setSelectedRole] = useState("Jungle");
  const [currentRank, setCurrentRank] = useState("Legend");
  const [highestRank, setHighestRank] = useState("Mythic");
  const [isEditing, setIsEditing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getRankColor = (rank: string) => {
    const colors: Record<string, string> = {
      Warrior: "from-slate-700 to-black",
      Elite: "from-slate-600 to-slate-800",
      Master: "from-green-700 to-black",
      "Grand Master": "from-green-600 to-slate-900",
      Epic: "from-green-500 to-black",
      Legend: "from-green-400 to-green-700",
      Mythic: "from-green-400 to-black",
      "Mythic Honor": "from-green-300 to-green-600",
    };
    return colors[rank] || "from-green-500 to-black";
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Main Profile Card */}
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-xl">
        {/* Header Background */}
        <div className="h-24 bg-linear-to-r from-primary to-primary/60"></div>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Profile Picture */}
          <div className="flex justify-center -mt-16 mb-4">
            <div className="relative">
              <img
                src={profileImage}
                alt={username}
                className="w-32 h-32 rounded-full border-4 border-card bg-card/50 object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                <Upload size={18} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Player Info */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-foreground mb-1">
              {username}
            </h1>
            <p className="text-muted-foreground text-sm font-mono mb-3">
              {mlId}
            </p>
          </div>

          {/* Role Badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-block">
              <div className="bg-primary/20 border border-primary px-4 py-2 rounded-full">
                <p className="text-xs uppercase tracking-widest text-primary font-bold">
                  {selectedRole}
                </p>
              </div>
            </div>
          </div>

          {/* Rank Section */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* Current Rank */}
            <div className="bg-card-foreground/5 border border-border rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                Current
              </p>
              <div
                className={`inline-block bg-linear-to-r ${getRankColor(currentRank)} text-white px-3 py-1 rounded-lg font-bold text-sm`}
              >
                {currentRank}
              </div>
            </div>

            {/* Highest Rank */}
            <div className="bg-card-foreground/5 border border-border rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                Peak
              </p>
              <div
                className={`inline-block bg-linear-to-r ${getRankColor(highestRank)} text-white px-3 py-1 rounded-lg font-bold text-sm`}
              >
                {highestRank}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="bg-muted/20 border border-muted rounded p-3 text-center">
              <p className="text-lg font-bold text-primary">48</p>
              <p className="text-xs text-muted-foreground">Wins</p>
            </div>
            <div className="bg-muted/20 border border-muted rounded p-3 text-center">
              <p className="text-lg font-bold text-primary">52</p>
              <p className="text-xs text-muted-foreground">Losses</p>
            </div>
            <div className="bg-muted/20 border border-muted rounded p-3 text-center">
              <p className="text-lg font-bold text-primary">48%</p>
              <p className="text-xs text-muted-foreground">WR</p>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full bg-primary text-primary-foreground font-bold py-2 rounded-lg hover:bg-primary/90 transition-colors uppercase text-sm tracking-widest"
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Edit Mode - Quick Edit Below Card */}
      {isEditing && (
        <div className="mt-4 bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 uppercase">
            Edit Profile
          </h2>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-input border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* ML ID */}
          <div className="mb-4">
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              ML ID
            </label>
            <input
              type="text"
              value={mlId}
              onChange={(e) => setMlId(e.target.value)}
              className="w-full bg-input border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`py-2 rounded font-bold text-xs uppercase tracking-widest transition-colors ${
                    selectedRole === role
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Current Rank Selection */}
          <div className="mb-4">
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Current Rank
            </label>
            <select
              value={currentRank}
              onChange={(e) => setCurrentRank(e.target.value)}
              className="w-full bg-input border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {RANKS.map((rank) => (
                <option key={rank} value={rank}>
                  {rank}
                </option>
              ))}
            </select>
          </div>

          {/* Highest Rank Selection */}
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Peak Rank
            </label>
            <select
              value={highestRank}
              onChange={(e) => setHighestRank(e.target.value)}
              className="w-full bg-input border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {RANKS.map((rank) => (
                <option key={rank} value={rank}>
                  {rank}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsEditing(false)}
            className="w-full bg-muted text-muted-foreground font-bold py-2 rounded-lg hover:bg-muted/90 transition-colors uppercase text-sm tracking-widest"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
