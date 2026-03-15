"use client";

import { useState } from "react";

const PRESETS = [5, 10, 20, 30];

interface Props {
  selected: number;
  onChange: (minutes: number) => void;
  disabled: boolean;
}

export default function DurationPicker({ selected, onChange, disabled }: Props) {
  const [customInput, setCustomInput] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const handleCustom = () => {
    const val = parseInt(customInput, 10);
    if (val > 0 && val <= 120) {
      onChange(val);
      setShowCustom(false);
      setCustomInput("");
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {PRESETS.map((min) => (
        <button
          key={min}
          onClick={() => onChange(min)}
          disabled={disabled}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
            ${selected === min
              ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
              : "bg-white/10 text-white/80 hover:bg-white/20"
            }`}
        >
          {min}分
        </button>
      ))}

      {showCustom ? (
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min={1}
            max={120}
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCustom()}
            placeholder="分"
            className="w-16 px-3 py-2 rounded-full bg-white/10 text-white text-center text-sm outline-none border border-white/20 focus:border-teal-400"
          />
          <button
            onClick={handleCustom}
            className="px-3 py-2 rounded-full bg-teal-500 text-white text-sm"
          >
            OK
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowCustom(true)}
          disabled={disabled}
          className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white/80 hover:bg-white/20 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          カスタム
        </button>
      )}
    </div>
  );
}
