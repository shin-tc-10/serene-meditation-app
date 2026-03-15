"use client";

import { SoundOption, SoundType } from "@/types";

const SOUNDS: SoundOption[] = [
  { id: "rain", label: "雨", emoji: "🌧", file: "/sounds/rain.mp3" },
  { id: "forest", label: "森", emoji: "🌲", file: "/sounds/forest.mp3" },
  { id: "ocean", label: "波", emoji: "🌊", file: "/sounds/ocean.mp3" },
  { id: "fire", label: "炎", emoji: "🔥", file: "/sounds/fire.mp3" },
];

interface Props {
  activeSound: SoundType;
  volume: number;
  onPlay: (sound: SoundType) => void;
  onVolumeChange: (vol: number) => void;
}

export default function SoundPlayer({ activeSound, volume, onPlay, onVolumeChange }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex gap-3 flex-wrap justify-center">
        {SOUNDS.map((s) => (
          <button
            key={s.id}
            onClick={() => onPlay(s.id)}
            className={`flex flex-col items-center gap-1 px-4 py-3 rounded-2xl transition-all duration-200 min-w-[64px]
              ${activeSound === s.id
                ? "bg-teal-500/40 border border-teal-400/60 shadow-lg shadow-teal-500/20"
                : "bg-white/10 border border-white/10 hover:bg-white/20"
              }`}
          >
            <span className="text-2xl">{s.emoji}</span>
            <span className="text-white/70 text-xs">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 w-full max-w-xs">
        <span className="text-white/50 text-sm">🔈</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="flex-1 h-1.5 rounded-full appearance-none bg-white/20 accent-teal-400 cursor-pointer"
        />
        <span className="text-white/50 text-sm">🔊</span>
      </div>
    </div>
  );
}
