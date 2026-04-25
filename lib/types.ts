export type SignupFormData = {
  username: string;
  password: string;
  passwordConfirm: string;
  ign: string;
  currentRank: string;
  peakRank: string;
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

export type Scrim = {
  id: string;
  teamName: string;
  teamLogo?: string;
  region: string;
  gameType: string; // BO1, BO3, 2Games, etc.
  minRank: string;
  maxRank: string;
  time: string;
  minRankIcon?: string;
  maxRankIcon?: string;
};

export type CreateScrimFormData = {
  squadType: "full" | "open"; // Full Squad 5v5 or OpenSquad
  teamName: string;
  teamLogo?: string;
  minRank: string;
  maxRank: string;
  gameFormat: "Games" | "Best of"; // Games or Best of
  gameCount: number; // 1-100
  date: string;
  time: string;
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
  "Mythic Honor",
  "Mythic Glory",
  "Mythic Immortal",
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
