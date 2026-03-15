"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { BreathPhase } from "@/types";
import { TimerStatus } from "@/types";

const PHASES: { phase: BreathPhase; label: string; duration: number }[] = [
  { phase: "inhale", label: "吸う", duration: 4 },
  { phase: "hold", label: "止める", duration: 4 },
  { phase: "exhale", label: "吐く", duration: 4 },
];

const CYCLE = PHASES.reduce((sum, p) => sum + p.duration, 0);

interface Props {
  status: TimerStatus;
}

export default function BreathingGuide({ status }: Props) {
  const [phase, setPhase] = useState<BreathPhase>("inhale");
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    if (status !== "running") return;

    const advance = () => {
      setPhaseIndex((prev) => {
        const next = (prev + 1) % PHASES.length;
        setPhase(PHASES[next].phase);
        return next;
      });
    };

    const duration = PHASES[phaseIndex].duration * 1000;
    const timer = setTimeout(advance, duration);
    return () => clearTimeout(timer);
  }, [status, phaseIndex]);

  useEffect(() => {
    if (status === "idle" || status === "completed") {
      setPhaseIndex(0);
      setPhase("inhale");
    }
  }, [status]);

  const scale = phase === "inhale" ? 1.35 : phase === "hold" ? 1.35 : 1;
  const duration = PHASES[phaseIndex]?.duration ?? 4;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex items-center justify-center w-48 h-48">
        {/* outer glow ring */}
        <motion.div
          animate={{ scale, opacity: phase === "hold" ? 0.6 : 0.3 }}
          transition={{ duration, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-teal-400/20"
        />
        {/* main circle */}
        <motion.div
          animate={{ scale }}
          transition={{ duration, ease: "easeInOut" }}
          className="w-36 h-36 rounded-full bg-gradient-to-br from-teal-400/60 to-cyan-500/60 backdrop-blur-sm border border-white/20 flex items-center justify-center"
        >
          <motion.div
            animate={{ scale: scale * 0.6 }}
            transition={{ duration, ease: "easeInOut" }}
            className="w-16 h-16 rounded-full bg-white/20"
          />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-white/70 text-sm tracking-widest"
        >
          {status === "running"
            ? PHASES[phaseIndex].label
            : status === "completed"
            ? "完了"
            : "準備完了"}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
