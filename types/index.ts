export type SoundType = "rain" | "forest" | "ocean" | "fire" | "none";

export interface SoundOption {
  id: SoundType;
  label: string;
  emoji: string;
  file: string;
}

export interface Session {
  id: string;
  date: string;
  durationMinutes: number;
  sound: SoundType;
  completedAt: string;
}

export type TimerStatus = "idle" | "running" | "paused" | "completed";

export type BreathPhase = "inhale" | "hold" | "exhale";
