"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export default function Clock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const parsed = now?.match(/^(\d{1,2}):(\d{2})\s?(\S+)$/);

  return (
    <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur-md">
      {parsed ? (
        <span className="font-mono text-xs tracking-wide text-white/85 sm:text-sm">
          {parsed[1]}
          <span className="animate-blink">:</span>
          {parsed[2]}
          <span className="ml-1 text-white/50">{parsed[3]}</span>
          <span className="ml-1.5 hidden text-white/40 sm:inline">IST</span>
        </span>
      ) : (
        <span className="font-mono text-xs tracking-wide text-white/50 sm:text-sm">
          --:-- --
        </span>
      )}
    </div>
  );
}
