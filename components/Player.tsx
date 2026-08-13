"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

const PLAYLIST_ID = "PL0umg_TNpoZTTdZVIi5tfX69pRmoMFGna";
const YT_HOST_ID = "kc-yt-player-host";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function attemptRandomStart(player: YT.Player, attempt = 0) {
  const playlist = player.getPlaylist();
  if (playlist && playlist.length > 0) {
    const randomIndex = Math.floor(Math.random() * playlist.length);
    player.playVideoAt(randomIndex);
    return;
  }
  if (attempt < 12) {
    window.setTimeout(() => attemptRandomStart(player, attempt + 1), 300);
  } else {
    player.playVideo();
  }
}

/* ---------- module-scope icons ---------- */

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="6.5" y="5.5" width="4" height="13" rx="1" fill="currentColor" />
      <rect x="13.5" y="5.5" width="4" height="13" rx="1" fill="currentColor" />
    </svg>
  );
}

function PrevIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 5.5v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17.5 6 8.5 12l9 6V6Z" fill="currentColor" />
    </svg>
  );
}

function NextIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M17 5.5v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6.5 6l9 6-9 6V6Z" fill="currentColor" />
    </svg>
  );
}

/* ---------- module-scope sub-components ---------- */

function VideoSurface() {
  return (
    <div
      id={YT_HOST_ID}
      className="pointer-events-none absolute left-1/2 top-0 h-full w-[178%] -translate-x-1/2"
    />
  );
}

function VinylSlot({
  slotRef,
  sizeClass,
  spinning,
}: {
  slotRef: RefObject<HTMLDivElement | null>;
  sizeClass: string;
  spinning: boolean;
}) {
  return (
    <div
      ref={slotRef}
      className={`relative shrink-0 overflow-hidden rounded-full bg-ink-soft ring-2 ring-white/15 shadow-[0_6px_20px_-4px_rgba(0,0,0,0.75)] ${sizeClass}`}
      style={{ animationPlayState: spinning ? "running" : "paused" }}
    >
      <span className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40" />
    </div>
  );
}

function SeekBar({
  ratio,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  ratio: number;
  onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: ReactPointerEvent<HTMLDivElement>) => void;
}) {
  const pct = Math.min(100, Math.max(0, ratio * 100));
  return (
    <div
      className="seek-track touch-none relative flex h-6 w-full cursor-pointer items-center select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
    >
      <div className="relative h-[3px] w-full rounded-full bg-white/15">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-clay-light shadow-[0_0_10px_1px_rgba(232,147,76,0.65)]"
          style={{ width: `${pct}%` }}
        />
        <div
          className="seek-knob absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-cream shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
          style={{ left: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function PrevNextButton({
  onClick,
  label,
  className,
  children,
}: {
  onClick: () => void;
  label: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex items-center justify-center rounded-full text-cream/85 transition-colors hover:bg-white/10 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}

function PlayButton({
  isPlaying,
  onClick,
  sizeClass,
  iconClass,
}: {
  isPlaying: boolean;
  onClick: () => void;
  sizeClass: string;
  iconClass: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPlaying ? "Pause" : "Play"}
      className={`flex items-center justify-center rounded-full bg-gradient-to-b from-clay-light to-clay text-ink ring-1 ring-white/25 shadow-[0_8px_20px_-4px_rgba(193,101,47,0.75)] transition-transform active:scale-95 ${sizeClass}`}
    >
      {isPlaying ? (
        <PauseIcon className={iconClass} />
      ) : (
        <PlayIcon className={`${iconClass} translate-x-[1px]`} />
      )}
    </button>
  );
}

/* ---------- main component ---------- */

export default function Player() {
  const playerRef = useRef<YT.Player | null>(null);
  const desktopSlotRef = useRef<HTMLDivElement>(null);
  const mobileSlotRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [title, setTitle] = useState("Tuning in\u2026");
  const [artist, setArtist] = useState("Kullad and Cassette Radio");
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragRatio, setDragRatio] = useState(0);

  // Track breakpoint (both layout blocks are always mounted; this decides
  // which one hosts the live video surface via a portal).
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 640px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Boot the YouTube IFrame API once.
  useEffect(() => {
    function syncTrackInfo(player: YT.Player) {
      const data = player.getVideoData();
      if (data?.title) setTitle(data.title);
      if (data?.author) setArtist(data.author);
      const d = player.getDuration();
      if (Number.isFinite(d)) setDuration(d);
    }

    function handleReady(event: YT.PlayerEvent) {
      event.target.setShuffle(true);
      attemptRandomStart(event.target);
      syncTrackInfo(event.target);
    }

    function handleStateChange(event: YT.OnStateChangeEvent) {
      const state = event.data;
      if (state === window.YT.PlayerState.PLAYING) {
        setIsPlaying(true);
        syncTrackInfo(event.target);
      } else if (state === window.YT.PlayerState.PAUSED) {
        setIsPlaying(false);
      } else if (state === window.YT.PlayerState.ENDED) {
        event.target.nextVideo();
      }
    }

    function handleError() {
      playerRef.current?.nextVideo();
    }

    function initPlayer() {
      if (playerRef.current) return;
      playerRef.current = new window.YT.Player(YT_HOST_ID, {
        width: "100%",
        height: "100%",
        playerVars: {
          listType: "playlist",
          list: PLAYLIST_ID,
          autoplay: 1,
          controls: 0,
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
          disablekb: 1,
        },
        events: {
          onReady: handleReady,
          onStateChange: handleStateChange,
          onError: handleError,
        },
      });
    }

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        initPlayer();
      };
    }
  }, []);

  // Progress ticker.
  useEffect(() => {
    if (!isPlaying || isDragging) return;
    const id = window.setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      setElapsed(player.getCurrentTime());
      const d = player.getDuration();
      if (Number.isFinite(d)) setDuration(d);
    }, 500);
    return () => window.clearInterval(id);
  }, [isPlaying, isDragging]);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;
    if (player.getPlayerState() === 1) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const playPrev = () => playerRef.current?.previousVideo();
  const playNext = () => playerRef.current?.nextVideo();

  const seekToRatio = (ratio: number) => {
    const player = playerRef.current;
    if (!player) return;
    const dur = player.getDuration() || duration;
    const target = Math.max(0, Math.min(1, ratio)) * dur;
    player.seekTo(target, true);
  };

  const ratioFromEvent = (e: ReactPointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0) return 0;
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  };

  const handleSeekDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const ratio = ratioFromEvent(e);
    setIsDragging(true);
    setDragRatio(ratio);
    setElapsed(ratio * duration);
  };

  const handleSeekMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const ratio = ratioFromEvent(e);
    setDragRatio(ratio);
    setElapsed(ratio * duration);
  };

  const handleSeekUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const ratio = ratioFromEvent(e);
    setIsDragging(false);
    seekToRatio(ratio);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
  };

  const progressRatio = isDragging ? dragRatio : duration > 0 ? elapsed / duration : 0;
  const displayElapsed = isDragging ? dragRatio * duration : elapsed;

  const portalTarget = mounted
    ? (isDesktop ? desktopSlotRef.current : mobileSlotRef.current)
    : null;

  return (
    <>
      {/* DESKTOP — floating glass pill */}
      <div className="hidden sm:flex items-center gap-4 rounded-full border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] p-3 pr-5 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-3xl backdrop-saturate-[1.7]">
        <VinylSlot slotRef={desktopSlotRef} sizeClass="h-20 w-20 animate-spin-slow" spinning={isPlaying} />

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-cream">{title}</p>
            <p className="truncate text-[12.5px] text-white/70">{artist}</p>
          </div>
          <SeekBar
            ratio={progressRatio}
            onPointerDown={handleSeekDown}
            onPointerMove={handleSeekMove}
            onPointerUp={handleSeekUp}
          />
          <div className="flex items-center justify-between font-mono text-[10.5px] tabular-nums text-white/55">
            <span>{formatTime(displayElapsed)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 pl-1">
          <PrevNextButton onClick={playPrev} label="Previous track" className="h-9 w-9">
            <PrevIcon className="h-4 w-4" />
          </PrevNextButton>
          <PlayButton
            isPlaying={isPlaying}
            onClick={togglePlay}
            sizeClass="h-11 w-11 mx-0.5"
            iconClass="h-5 w-5"
          />
          <PrevNextButton onClick={playNext} label="Next track" className="h-9 w-9">
            <NextIcon className="h-4 w-4" />
          </PrevNextButton>
        </div>
      </div>

      {/* MOBILE — stacked card */}
      <div className="sm:hidden flex w-full flex-col gap-3 rounded-[26px] border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] p-4 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-3xl backdrop-saturate-[1.7]">
        <div className="flex items-center gap-3">
          <VinylSlot slotRef={mobileSlotRef} sizeClass="h-16 w-16 animate-spin-slow" spinning={isPlaying} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold text-cream">{title}</p>
            <p className="truncate text-[12.5px] text-white/70">{artist}</p>
          </div>
        </div>

        <SeekBar
          ratio={progressRatio}
          onPointerDown={handleSeekDown}
          onPointerMove={handleSeekMove}
          onPointerUp={handleSeekUp}
        />

        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <span className="font-mono text-[10.5px] tabular-nums text-white/55">
            {formatTime(displayElapsed)}
            <span className="text-white/35"> / {formatTime(duration)}</span>
          </span>

          <div className="flex items-center gap-2 justify-self-center">
            <PrevNextButton onClick={playPrev} label="Previous track" className="h-11 w-11">
              <PrevIcon className="h-5 w-5" />
            </PrevNextButton>
            <PlayButton
              isPlaying={isPlaying}
              onClick={togglePlay}
              sizeClass="h-[52px] w-[52px] mx-1"
              iconClass="h-6 w-6"
            />
            <PrevNextButton onClick={playNext} label="Next track" className="h-11 w-11">
              <NextIcon className="h-5 w-5" />
            </PrevNextButton>
          </div>

          <span />
        </div>
      </div>

      {portalTarget ? createPortal(<VideoSurface />, portalTarget) : null}
    </>
  );
}
