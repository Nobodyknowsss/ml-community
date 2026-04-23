"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSuccess("Post created successfully!");
      setTitle("");
      setContent("");
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
            Create Post
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-2">
            Share your thoughts with the community
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
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 block">
                Title
              </label>
              <Input
                placeholder="What's on your mind?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-800 border border-green-600/30 text-gray-100 placeholder-gray-500"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 block">
                Content
              </label>
              <textarea
                placeholder="Share your post here..."
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
                  "Post"
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
