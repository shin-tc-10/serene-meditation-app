"use client";

import { useState, useEffect } from "react";
import { Session, SoundType } from "@/types";

const STORAGE_KEY = "meditation_sessions";

export function useSession() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setSessions(JSON.parse(raw));
  }, []);

  const saveSession = (durationMinutes: number, sound: SoundType) => {
    const now = new Date();
    const session: Session = {
      id: crypto.randomUUID(),
      date: now.toLocaleDateString("ja-JP"),
      durationMinutes,
      sound,
      completedAt: now.toISOString(),
    };
    const updated = [session, ...sessions];
    setSessions(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearSessions = () => {
    setSessions([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMinutes, 0);

  return { sessions, saveSession, clearSessions, totalMinutes };
}
