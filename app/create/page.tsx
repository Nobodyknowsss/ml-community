"use client";

import Link from "next/link";
import { Plus, Users, Briefcase } from "lucide-react";

export default function CreatePage() {
  const options = [
    {
      id: "scrim",
      title: "Looking for Scrim",
      description:
        "Find players to practice and compete with in scrimmage matches",
      icon: Users,
      color: "from-green-500 to-green-600",
      href: "/create/scrim",
    },
    {
      id: "teammate",
      title: "Looking for Teammate",
      description: "Find a teammate that matches your skill and playstyle",
      icon: Briefcase,
      color: "from-green-700 to-green-800",
      href: "/create/team",
    },
  ];

  return (
    <div className="min-h-screen bg-black p-4 pt-20 md:p-6 md:pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-green-400 uppercase tracking-wider mb-2">
            Create Something New
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Choose what you want to do today
          </p>
        </div>

        {/* Options Grid - Mobile First */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <Link key={option.id} href={option.href} className="group">
                <div
                  className={`bg-linear-to-br ${option.color} rounded-lg p-6 md:p-8 h-full border border-green-600/30 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg`}
                >
                  {/* Icon */}
                  <div className="mb-4 md:mb-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-black/30 rounded-lg flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <Icon
                        className="text-green-300 md:group-hover:text-green-200"
                        size={24}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h2 className="text-xl md:text-2xl font-bold text-black mb-2 group-hover:text-gray-100 transition-colors">
                    {option.title}
                  </h2>
                  <p className="text-gray-900 md:text-gray-800 text-sm md:text-base leading-relaxed mb-6 group-hover:text-gray-100 transition-colors">
                    {option.description}
                  </p>

                  {/* Button */}
                  <div className="flex items-center gap-2 text-black font-semibold group-hover:gap-3 transition-all">
                    <Plus size={18} />
                    <span>Get Started</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-green-600/20">
          <h3 className="text-lg md:text-xl font-bold text-green-400 uppercase mb-4">
            💡 Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-gray-900/50 border border-green-600/20 rounded-lg p-4 md:p-6">
              <p className="text-gray-300 text-sm md:text-base">
                <span className="text-green-400 font-semibold">Posts</span> are
                great for sharing strategies, funny moments, or asking for
                advice from the community.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-green-600/20 rounded-lg p-4 md:p-6">
              <p className="text-gray-300 text-sm md:text-base">
                <span className="text-green-400 font-semibold">
                  Scrims & Teams
                </span>{" "}
                help you find like-minded players to improve your skills and
                climb ranks together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
