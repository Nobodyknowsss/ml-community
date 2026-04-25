"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export function SigninForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.error) {
        setSuccess(`Welcome back, ${data.user.username}!`);
        setFormData({ username: "", password: "" });
        // Redirect to home page after 1 second
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-green-400 uppercase tracking-widest mb-12">
        Sign In
      </h1>

      <div className="bg-linear-to-br from-gray-900 to-black border border-green-600/30 rounded-lg p-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-gray-400 text-base">
            Welcome back to the competitive arena
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400 text-sm font-semibold">
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-600/20 border border-green-600/50 rounded-lg text-green-400 text-sm font-semibold">
              {success}
            </div>
          )}

          {/* Username Field */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-gray-400 block uppercase tracking-wide"
            >
              Username
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="bg-gray-800/50 border border-green-600/30 text-green-400 placeholder-gray-500"
              disabled={isLoading}
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-400 block uppercase tracking-wide"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-colors uppercase tracking-wide mt-6"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 pt-6 border-t border-green-600/20 text-center">
          <p className="text-gray-400 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-green-400 hover:text-green-300 font-semibold transition-colors"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
