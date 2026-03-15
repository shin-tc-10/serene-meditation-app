"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { TimerStatus } from "@/types";

export function useTimer(durationSeconds: number) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const [status, setStatus] = useState<TimerStatus>("idle");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setRemaining(durationSeconds);
    setStatus("idle");
  }, [durationSeconds]);

  const start = useCallback(() => {
    if (status === "completed") return;
    setStatus("running");
  }, [status]);

  const pause = useCallback(() => {
    setStatus("paused");
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setRemaining(durationSeconds);
  }, [durationSeconds]);

  useEffect(() => {
    if (status !== "running") {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setStatus("completed");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progress = durationSeconds > 0 ? 1 - remaining / durationSeconds : 0;

  return { remaining, status, start, pause, reset, formatted, progress };
}
