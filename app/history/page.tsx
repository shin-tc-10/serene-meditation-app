"use client";

import { useSession } from "@/hooks/useSession";
import SessionHistory from "@/components/SessionHistory";
import Link from "next/link";

export default function HistoryPage() {
  const { sessions, totalMinutes, clearSessions } = useSession();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 flex flex-col p-6">
      <div className="w-full max-w-md mx-auto flex flex-col gap-6">
        {/* header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-light tracking-widest">履歴</h1>
            <p className="text-white/30 text-xs tracking-wider">Session History</p>
          </div>
          <Link
            href="/"
            className="text-white/40 hover:text-white/70 transition-colors text-sm"
          >
            ← 戻る
          </Link>
        </div>

        <SessionHistory
          sessions={sessions}
          totalMinutes={totalMinutes}
          onClear={clearSessions}
        />
      </div>
    </main>
  );
}
