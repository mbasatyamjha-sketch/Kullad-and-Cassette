import Clock from "@/components/Clock";
import ListenerCount from "@/components/ListenerCount";
import SocialLinks from "@/components/SocialLinks";
import Player from "@/components/Player";

const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      {/* Background */}
    {/* 100% Working Background Image */}
<img 
  src="https://files.catbox.moe/ghvzqz.png" 
  alt="Kullad and Cassette Background" 
  className="fixed inset-0 w-full h-full object-cover -z-30" 
/>
<div className="fixed inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80 -z-20 pointer-events-none" />
      {/* Grain */}
      <div
        className="grain-overlay fixed inset-0 -z-10"
        style={{ backgroundImage: `url("${GRAIN_SVG}")` }}
      />

      {/* Fixed top row */}
      <div className="fixed left-[max(1rem,env(safe-area-inset-left))] top-[max(1rem,env(safe-area-inset-top))] z-30">
        <Clock />
      </div>
      <div className="fixed left-1/2 top-[max(1rem,env(safe-area-inset-top))] z-30 hidden -translate-x-1/2 sm:block">
        <ListenerCount />
      </div>
      <div className="fixed right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-30">
        <SocialLinks />
      </div>

      {/* Centerpiece branding */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-clay-light/90 sm:text-[11px]">
          On air, always
        </span>
        <h1 className="animate-rise font-display text-5xl italic leading-none text-cream text-shadow-soft sm:text-6xl md:text-7xl">
          Kullad <span className="not-italic text-clay-light">&amp;</span> Cassette
        </h1>
        <p className="mt-5 max-w-sm text-sm text-white/60 sm:max-w-md sm:text-base">
          Chai in a kullad, songs on a cassette — a slow radio for the tapes we grew up
          rewinding.
        </p>
        <div className="mt-5 sm:hidden">
          <ListenerCount />
        </div>
      </div>

      {/* Player */}
      <div className="z-20 w-[min(94vw,32rem)] pb-3 sm:w-full sm:max-w-xl sm:pb-4">
        <Player />
      </div>

      {/* Footer */}
      <footer className="z-20 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <p className="text-xs text-white/50">Made with ❤️ by Satyam Jha</p>
      </footer>
    </main>
  );
}
