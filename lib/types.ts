export type SignupFormData = {
  username: string;
  password: string;
  passwordConfirm: string;
  currentRank: string;
  currentRankStars: number;
  peakRank: string;
  peakRankStars: number;
  role: string;
  mlbbId: string;
  totalMatches: number;
  winRate: number;
  fbLink: string;
  avatarUrl: string;
};

export type SigninFormData = {
  username: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  user?: {
    id: number;
    username: string;
    mlbbId: string;
    role: string;
    currentRank: string;
  };
};

export type SessionData = {
  id: number;
  username: string;
  mlbbId: string;
  role: string;
  currentRank: string;
  peakRank: string;
  totalMatches: number;
  winRate: number;
};

// ============ Constants ============

export const RANKS = [
  "Warrior",
  "Elite",
  "Master",
  "Grand Master",
  "Epic",
  "Legend",
  "Mythic",
] as const;

export const ROLES = [
  "Tank",
  "Jungle",
  "Midlane",
  "Explane",
  "Goldlane",
] as const;

export type Rank = (typeof RANKS)[number];
export type Role = (typeof ROLES)[number];
