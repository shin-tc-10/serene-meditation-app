"use client";

import { useEffect, useState } from "react";
import { useTimer } from "@/hooks/useTimer";
import { useSound } from "@/hooks/useSound";
import { useSession } from "@/hooks/useSession";
import Timer from "@/components/Timer";
import BreathingGuide from "@/components/BreathingGuide";
import DurationPicker from "@/components/DurationPicker";
import SoundPlayer from "@/components/SoundPlayer";
import Link from "next/link";

export default function Home() {
  const [durationMinutes, setDurationMinutes] = useState(10);
  const durationSeconds = durationMinutes * 60;

  const { status, start, pause, reset, formatted, progress } =
    useTimer(durationSeconds);
  const { activeSound, volume, play, stopAll, setVolume } = useSound();
  const { saveSession } = useSession();

  // タイマー完了時の処理
  useEffect(() => {
    if (status === "completed") {
      stopAll();
      saveSession(durationMinutes, activeSound);
      if (typeof window !== "undefined" && typeof Notification !== "undefined" && Notification.permission === "granted") {
        new Notification("瞑想完了", {
          body: `${durationMinutes}分の瞑想が完了しました。お疲れさまでした。`,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // 通知許可リクエスト（iOS Safariは未サポートのためガード）
  useEffect(() => {
    if (typeof window !== "undefined" && typeof Notification !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const handleReset = () => {
    reset();
    stopAll();
  };

  const isActive = status === "running" || status === "paused";

  return (
    <main
      className="h-[100dvh] overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 flex flex-col items-center justify-between px-6"
      style={{
        paddingTop: "calc(24px + env(safe-area-inset-top))",
        paddingBottom: "calc(40px + env(safe-area-inset-bottom))",
      }}
    >
      {/* header */}
      <div className="w-full flex items-center justify-between max-w-md">
        <div>
          <h1 className="text-white text-xl font-light tracking-widest">Serene</h1>
          <p className="text-white/30 text-xs tracking-wider">瞑想タイマー</p>
        </div>
        <Link
          href="/history"
          className="text-white/40 hover:text-white/70 transition-colors text-sm"
        >
          履歴
        </Link>
      </div>

      {/* center content */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        {/* duration picker */}
        <DurationPicker
          selected={durationMinutes}
          onChange={(m) => { setDurationMinutes(m); reset(); stopAll(); }}
          disabled={isActive}
        />

        {/* breathing guide */}
        <BreathingGuide status={status} />

        {/* timer ring */}
        <Timer
          formatted={formatted}
          progress={progress}
          durationSeconds={durationSeconds}
        />

        {/* controls */}
        <div className="flex gap-4 items-center">
          {status !== "completed" ? (
            <>
              <button
                onClick={status === "running" ? pause : start}
                className="px-8 py-3 rounded-full bg-teal-500 hover:bg-teal-400 active:scale-95 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-teal-500/30 min-w-[100px]"
              >
                {status === "running" ? "一時停止" : "開始"}
              </button>
              <button
                onClick={handleReset}
                disabled={status === "idle"}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white/70 text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                リセット
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <p className="text-white/60 text-sm">瞑想完了 ✨</p>
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-sm transition-all"
              >
                もう一度
              </button>
            </div>
          )}
        </div>
      </div>

      {/* sound player */}
      <div className="w-full max-w-md">
        <p className="text-white/30 text-xs text-center mb-3 tracking-widest">SOUND</p>
        <SoundPlayer
          activeSound={activeSound}
          volume={volume}
          onPlay={play}
          onVolumeChange={setVolume}
        />
      </div>
    </main>
  );
}
