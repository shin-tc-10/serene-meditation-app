"use client";

import { Session } from "@/types";

const SOUND_LABELS: Record<string, string> = {
  rain: "🌧 雨",
  forest: "🌲 森",
  ocean: "🌊 波",
  fire: "🔥 炎",
  none: "なし",
};

interface Props {
  sessions: Session[];
  totalMinutes: number;
  onClear: () => void;
}

export default function SessionHistory({ sessions, totalMinutes, onClear }: Props) {
  if (sessions.length === 0) {
    return (
      <div className="text-center text-white/40 py-12">
        <p className="text-4xl mb-3">🧘</p>
        <p>まだセッションがありません</p>
      </div>
    );
  }

  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/10">
        <p className="text-white/50 text-sm mb-1">合計瞑想時間</p>
        <p className="text-white text-2xl font-light">
          {hours > 0 ? `${hours}時間 ` : ""}{mins}分
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/10"
          >
            <div>
              <p className="text-white/80 text-sm">{session.date}</p>
              <p className="text-white/40 text-xs">{SOUND_LABELS[session.sound]}</p>
            </div>
            <p className="text-teal-400 text-sm font-medium">{session.durationMinutes}分</p>
          </div>
        ))}
      </div>

      <button
        onClick={onClear}
        className="text-white/30 text-xs hover:text-white/60 transition-colors mt-2"
      >
        履歴を消去
      </button>
    </div>
  );
}
