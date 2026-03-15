"use client";

interface Props {
  formatted: string;
  progress: number;
  durationSeconds: number;
}

export default function Timer({ formatted, progress, durationSeconds }: Props) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * (1 - progress);

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg className="absolute inset-0 -rotate-90 w-full h-full" viewBox="0 0 200 200">
        {/* background ring */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="6"
        />
        {/* progress ring */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="url(#timerGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dash}
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
        <defs>
          <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex flex-col items-center">
        <span className="text-white text-4xl font-light tracking-widest tabular-nums">
          {formatted}
        </span>
      </div>
    </div>
  );
}
