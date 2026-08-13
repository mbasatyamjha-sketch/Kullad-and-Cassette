"use client";

import { useEffect, useState } from "react";

export default function ParallaxBg() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Screen ke center se mouse kitna door hai, usko track karna
      const x = (window.innerWidth / 2 - e.clientX) / 40;
      const y = (window.innerHeight / 2 - e.clientY) / 40;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <img
      src="https://files.catbox.moe/ghvzqz.png"
      alt="Kullad and Cassette Background"
      className="fixed inset-0 w-full h-full object-cover -z-30 ease-out will-change-transform"
      style={{
        transitionDuration: '200ms',
        // scale(1.1) isliye taaki background screen se bada rahe aur hilne par kinare (edges) khali na dikhein
        transform: `translate(${position.x}px, ${position.y}px) scale(1.1)`,
      }}
    />
  );
}
