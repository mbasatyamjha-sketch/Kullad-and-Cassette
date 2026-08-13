import Clock from "@/components/Clock";
import ListenerCount from "@/components/ListenerCount";
import SocialLinks from "@/components/SocialLinks";
import Player from "@/components/Player";
import ParallaxBg from "@/components/ParallaxBg";

const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function Home() {
  return (
    <main className="isolate relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      {/* Background */}
   <ParallaxBg />
<div className="fixed inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" />
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

      {/* Centerpiece Branding/Intro Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 z-10 pointer-events-none mt-10">
        
        {/* On Air text (Vintage Gold) */}
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#e8d5a5] mb-3 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
          On air, always
        </p>

        {/* Main Title (Warm White + Vintage Gold) */}
        <h1 className="flex flex-col items-center justify-center font-bold mb-4 drop-shadow-[0_4px_10px_rgba(0,0,0,1)] drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <span className="text-7xl md:text-8xl text-[#fdf8ed] tracking-wide mb-1">कुल्हड़</span>
          <span className="text-4xl md:text-5xl text-[#e8d5a5] tracking-widest mt-1">& Cassette</span>
        </h1>

        {/* Subtitle (Inside a very subtle dark glass pill for 100% readability) */}
        <div className="mt-4 bg-black/30 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10 shadow-xl">
          <p className="text-sm md:text-base text-[#fdf8ed] max-w-md leading-relaxed font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Chai in a kullad, songs on a cassette — a slow radio for the tapes we grew up rewinding.
          </p>
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
