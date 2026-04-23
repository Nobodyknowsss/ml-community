"use client";

// Mock profile data
const MOCK_PROFILE = {
  id: "user-123",
  username: "ShadowHunter",
  currentRank: "Legend",
  currentRankStars: 3,
  peakRank: "Mythic",
  peakRankStars: 5,
  role: "Mid Laner",
  mlbbId: "123456789",
  totalMatches: 1247,
  winRate: 67.5,
  fbLink: "https://facebook.com/shadowhunter",
  avatarUrl:
    "https://images.unsplash.com/photo-1535713566543-0c97ff38bfa6?w=200&h=200&fit=crop",
  createdAt: "2023-06-15",
  updatedAt: "2024-04-20",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black p-6 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-green-400 uppercase tracking-wide">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-gray-900 border border-green-600/30 rounded-lg p-8 shadow-lg">
          {/* Header with Avatar */}
          <div className="flex flex-col md:flex-row gap-8 pb-8 border-b border-green-600/20">
            {/* Avatar */}
            <div className="shrink-0">
              <img
                src={MOCK_PROFILE.avatarUrl}
                alt={MOCK_PROFILE.username}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/mlbb icon.jpg";
                }}
                className="w-32 h-32 rounded-lg border-2 border-green-600 object-cover"
              />
            </div>

            {/* User Info */}
            <div className="grow">
              <h2 className="text-3xl font-bold text-green-400 mb-2 uppercase">
                {MOCK_PROFILE.username}
              </h2>
              <p className="text-gray-400 mb-4">
                MLBB ID: {MOCK_PROFILE.mlbbId}
              </p>

              {/* Rank Badges */}
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="px-4 py-2 bg-green-600/20 border border-green-600/50 rounded-lg">
                  <p className="text-xs text-gray-400 font-semibold">
                    CURRENT RANK
                  </p>
                  <p className="text-lg font-bold text-green-400">
                    {MOCK_PROFILE.currentRank}
                    {MOCK_PROFILE.currentRankStars > 0 && (
                      <span className="text-sm text-gray-400 ml-1">
                        ({MOCK_PROFILE.currentRankStars})
                      </span>
                    )}
                  </p>
                </div>
                <div className="px-4 py-2 bg-green-600/20 border border-green-600/50 rounded-lg">
                  <p className="text-xs text-gray-400 font-semibold">
                    PEAK RANK
                  </p>
                  <p className="text-lg font-bold text-green-300">
                    {MOCK_PROFILE.peakRank}
                    {MOCK_PROFILE.peakRankStars > 0 && (
                      <span className="text-sm text-gray-400 ml-1">
                        ({MOCK_PROFILE.peakRankStars})
                      </span>
                    )}
                  </p>
                </div>
                <div className="px-4 py-2 bg-blue-600/20 border border-blue-600/50 rounded-lg">
                  <p className="text-xs text-gray-400 font-semibold">
                    MAIN ROLE
                  </p>
                  <p className="text-lg font-bold text-blue-400">
                    {MOCK_PROFILE.role}
                  </p>
                </div>
              </div>

              {/* Facebook Link */}
              {MOCK_PROFILE.fbLink &&
                MOCK_PROFILE.fbLink !== "https://facebook.com" && (
                  <a
                    href={MOCK_PROFILE.fbLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 text-sm font-semibold underline"
                  >
                    View Facebook Profile
                  </a>
                )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm font-semibold mb-2">
                TOTAL MATCHES
              </p>
              <p className="text-4xl font-bold text-green-400">
                {MOCK_PROFILE.totalMatches}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm font-semibold mb-2">
                WIN RATE
              </p>
              <p className="text-4xl font-bold text-green-400">
                {MOCK_PROFILE.winRate}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm font-semibold mb-2">
                ACCOUNT AGE
              </p>
              <p className="text-xl font-bold text-green-400">
                {new Date(MOCK_PROFILE.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
