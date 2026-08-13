"use client";

import { useEffect, useState } from "react";

function seedListeners() {
  return 210 + Math.floor(Math.random() * 160);
}

export default function ListenerCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(seedListeners());
    const id = window.setInterval(() => {
      setCount((prev) => {
        const base = prev ?? seedListeners();
        const delta = Math.floor(Math.random() * 9) - 4;
        return Math.max(140, base + delta);
      });
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur-md">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay-glow opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-clay-glow" />
      </span>
      <span className="font-mono text-[11px] tracking-wide text-white/75 sm:text-xs">
        {count ?? "···"} <span className="hidden text-white/50 sm:inline">tuned in</span>
        <span className="text-white/50 sm:hidden">live</span>
      </span>
    </div>
  );
}
