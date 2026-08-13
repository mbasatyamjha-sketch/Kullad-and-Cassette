export default function SocialLinks() {
  return (
    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 pointer-events-auto shadow-lg">
      <a 
        href="https://www.instagram.com/kulhad.cassette" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-white/80 hover:text-[#e8d5a5] hover:scale-110 transition-all duration-300"
        title="Instagram"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
        </svg>
      </a>
    </div>
  );
}
