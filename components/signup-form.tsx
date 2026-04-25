"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { RANKS, ROLES, SignupFormData } from "@/lib/types";

export function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    password: "",
    passwordConfirm: "",
    ign: "",
    currentRank: "Warrior",
    peakRank: "Warrior",
    role: "Midlane",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "totalMatches"
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

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Signup failed");
        setIsLoading(false);
        return;
      }

      setShowSuccess(true);
      setIsLoading(false);
    } catch (err) {
      setError("An error occurred during signup. Please try again.");
      setIsLoading(false);
      console.error("Signup error:", err);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    router.push("/profile");
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-green-400 uppercase tracking-widest mb-12">
        Create Account
      </h1>

      <div className="bg-linear-to-br from-gray-900 to-black border border-green-600/30 rounded-lg p-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-gray-400 text-base">
            Start your competitive journey today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400 text-sm font-semibold">
              {error}
            </div>
          )}

          {/* Username & Password Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-green-400 uppercase tracking-wide border-b border-green-600/20 pb-3">
              Login Credentials
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 block uppercase tracking-wide">
                Username
              </label>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose username"
                className="bg-gray-800/50 border border-green-600/30 text-green-400 placeholder-gray-500"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 block uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="bg-gray-800/50 border border-green-600/30 text-green-400 placeholder-gray-500"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 block uppercase tracking-wide">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  name="passwordConfirm"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="bg-gray-800/50 border border-green-600/30 text-green-400 placeholder-gray-500"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors"
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
            <h3 className="text-sm font-bold text-green-400 uppercase tracking-wide">
              Account Details
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 block uppercase tracking-wide">
                In-Game Name (IGN)
              </label>
              <Input
                name="ign"
                value={formData.ign}
                onChange={handleChange}
                placeholder="Your in-game username"
                className="bg-gray-800/50 border border-green-600/30 text-green-400 placeholder-gray-500"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 block uppercase tracking-wide">
                MLBB ID
              </label>
              <Input
                name="mlbbId"
                value={formData.mlbbId}
                onChange={handleChange}
                placeholder="e.g., 232142421"
                className="bg-gray-800/50 border border-green-600/30 text-green-400 placeholder-gray-500"
                disabled={isLoading}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 block uppercase tracking-wide">
                  Current Rank
                </label>
                <select
                  name="currentRank"
                  value={formData.currentRank}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full bg-gray-800/50 border border-green-600/30 text-green-400 px-3 py-2 rounded text-sm"
                >
                  {RANKS.map((rank) => (
                    <option key={rank} value={rank}>
                      {rank}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 block uppercase tracking-wide">
                  Peak Rank
                </label>
                <select
                  name="peakRank"
                  value={formData.peakRank}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full bg-gray-800/50 border border-green-600/30 text-green-400 px-3 py-2 rounded text-sm"
                >
                  {RANKS.map((rank) => (
                    <option key={rank} value={rank}>
                      {rank}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 block uppercase tracking-wide">
                Main Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full bg-gray-800/50 border border-green-600/30 text-green-400 px-3 py-2 rounded text-sm"
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
                <label className="text-xs font-medium text-gray-400 block uppercase tracking-wide">
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
                  className="bg-gray-800/50 border border-green-600/30 text-green-400 placeholder-gray-500"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 block uppercase tracking-wide">
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
                  className="bg-gray-800/50 border border-green-600/30 text-green-400 placeholder-gray-500"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 block uppercase tracking-wide">
                Facebook Link (Optional)
              </label>
              <Input
                name="fbLink"
                type="url"
                value={formData.fbLink}
                onChange={handleChange}
                placeholder="https://facebook.com/..."
                className="bg-gray-800/50 border border-green-600/30 text-green-400 placeholder-gray-500"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-colors uppercase tracking-wide mt-6"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="mt-8 pt-6 border-t border-green-600/20 text-center">
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
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-linear-to-br from-gray-900 to-black border border-green-600/30 rounded-lg p-8 text-center max-w-sm">
              <h2 className="text-3xl font-bold text-green-400 mb-4 uppercase tracking-wide">
                Account Created!
              </h2>
              <p className="text-gray-300 mb-6">
                Welcome {formData.username}! Redirecting to your profile...
              </p>
              <button
                onClick={handleSuccessClose}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg transition-colors uppercase tracking-wide"
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
