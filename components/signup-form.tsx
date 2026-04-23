"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    currentRank: "Warrior",
    currentRankStars: 0,
    peakRank: "Warrior",
    peakRankStars: 0,
    role: "Mid",
    mlbbId: "",
    totalMatches: 0,
    winRate: 0,
    fbLink: "",
    avatarUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const RANKS = [
    "Warrior",
    "Elite",
    "Master",
    "Grand Master",
    "Epic",
    "Legend",
    "Mythic",
  ];
  const ROLES = ["Tank", "Jungle", "Mid", "ADC", "Support"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "totalMatches" ||
        name === "currentRankStars" ||
        name === "peakRankStars"
          ? value === ""
            ? 0
            : parseInt(value, 10)
          : name === "winRate"
            ? value === ""
              ? 0
              : parseFloat(value)
            : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Simulate form submission with local state
    setTimeout(() => {
      setShowSuccess(true);
      setIsLoading(false);
    }, 500);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    router.push("/profile");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-linear-to-br from-gray-900 to-black border border-green-600/30 rounded-lg p-8 shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-400 mb-2">
            CREATE ACCOUNT
          </h1>
          <p className="text-gray-400 text-sm">
            Start your competitive journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-600/20 border border-red-600/50 rounded text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Username & Password Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-green-400 uppercase">
              Login Credentials
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-300 block">
                Username
              </label>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose username"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-300 block">
                Password
              </label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-300 block">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  name="passwordConfirm"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Account Details Section */}
          <div className="space-y-4 pt-4 border-t border-green-600/20">
            <h3 className="text-sm font-bold text-green-400 uppercase">
              Account Details
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-300 block">
                MLBB ID
              </label>
              <Input
                name="mlbbId"
                value={formData.mlbbId}
                onChange={handleChange}
                placeholder="e.g., 232142421"
                disabled={isLoading}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-300 block">
                  Current Rank
                </label>
                <select
                  name="currentRank"
                  value={formData.currentRank}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full bg-gray-800 border border-green-600/30 text-gray-100 px-3 py-2 rounded text-sm"
                >
                  {RANKS.map((rank) => (
                    <option key={rank} value={rank}>
                      {rank}
                    </option>
                  ))}
                </select>
                {formData.currentRank === "Mythic" && (
                  <Input
                    name="currentRankStars"
                    type="number"
                    min="0"
                    max="999"
                    step="1"
                    value={formData.currentRankStars || ""}
                    onChange={handleChange}
                    placeholder="Stars (0-999)"
                    disabled={isLoading}
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-300 block">
                  Peak Rank
                </label>
                <select
                  name="peakRank"
                  value={formData.peakRank}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full bg-gray-800 border border-green-600/30 text-gray-100 px-3 py-2 rounded text-sm"
                >
                  {RANKS.map((rank) => (
                    <option key={rank} value={rank}>
                      {rank}
                    </option>
                  ))}
                </select>
                {formData.peakRank === "Mythic" && (
                  <Input
                    name="peakRankStars"
                    type="number"
                    min="0"
                    max="999"
                    step="1"
                    value={formData.peakRankStars || ""}
                    onChange={handleChange}
                    placeholder="Stars (0-999)"
                    disabled={isLoading}
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-300 block">
                Main Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full bg-gray-800 border border-green-600/30 text-gray-100 px-3 py-2 rounded text-sm"
              >
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-300 block">
                  Total Matches
                </label>
                <Input
                  name="totalMatches"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.totalMatches || ""}
                  onChange={handleChange}
                  placeholder="0"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-300 block">
                  Win Rate %
                </label>
                <Input
                  name="winRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.winRate || ""}
                  onChange={handleChange}
                  placeholder="0"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-300 block">
                Facebook Link (Optional)
              </label>
              <Input
                name="fbLink"
                type="url"
                value={formData.fbLink}
                onChange={handleChange}
                placeholder="https://facebook.com/..."
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold py-2.5 rounded-lg transition-colors uppercase tracking-widest text-sm mt-6"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-green-400 hover:text-green-300 font-semibold transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-lg p-4">
            <div className="bg-gray-900 border border-green-600/30 rounded-lg p-8 text-center max-w-sm">
              <h2 className="text-2xl font-bold text-green-400 mb-2">
                Account Created!
              </h2>
              <p className="text-gray-300 mb-6">
                Welcome {formData.username}! Redirecting to your profile...
              </p>
              <button
                onClick={handleSuccessClose}
                className="bg-green-600 hover:bg-green-500 text-black font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Go to Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
