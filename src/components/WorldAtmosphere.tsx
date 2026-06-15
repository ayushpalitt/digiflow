"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

export const WorldAtmosphere = ({ world }: { world: string }) => {
  // Memoize random values so animations don't jump on re-renders
  const forestFireflies = useMemo(() => Array.from({ length: 45 }).map(() => ({
    x: `${Math.random() * 100}vw`,
    targetX: `${Math.random() * 100}vw`,
    y: `${Math.random() * 100}vh`,
    targetY: `${Math.random() * 100 - 30}vh`,
    duration: Math.random() * 6 + 6,
    delay: Math.random() * 5,
    opacityBase: Math.random() * 0.6 + 0.2,
    size: Math.random() * 2 + 2
  })), []);

  const starryStars = useMemo(() => Array.from({ length: 150 }).map(() => ({
    x: `${Math.random() * 100}vw`,
    y: `${Math.random() * 100}vh`,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
    baseOpacity: Math.random() * 0.8 + 0.2,
    size: Math.random() > 0.9 ? 2 : 1
  })), []);

  const comets = useMemo(() => Array.from({ length: 4 }).map((_, i) => ({
    delay: i * 5 + Math.random() * 5,
    duration: Math.random() * 4 + 4,
    yStart: `${Math.random() * 40 - 20}vh`,
    yEnd: `${Math.random() * 80 + 20}vh`
  })), []);

  const mountainClouds = useMemo(() => Array.from({ length: 8 }).map((_, i) => ({
    y: `${Math.random() * 40}vh`,
    duration: 50 + Math.random() * 50,
    delay: -1 * Math.random() * 50,
    size: Math.random() * 40 + 40,
    opacity: Math.random() * 0.15 + 0.1
  })), []);

  const rainDrops = useMemo(() => Array.from({ length: 100 }).map(() => ({
    height: `${Math.random() * 40 + 20}px`,
    left: `${Math.random() * 120 - 10}vw`,
    targetLeft: `-${Math.random() * 5 + 2}vw`, // Rain falls diagonally
    duration: Math.random() * 0.3 + 0.3,
    delay: Math.random() * 2,
    opacity: Math.random() * 0.5 + 0.2
  })), []);

  if (world === "forest") {
    return (
      <>
        <div className="absolute inset-0 bg-black/50 mix-blend-overlay pointer-events-none"></div>
        {forestFireflies.map((f, i) => (
          <motion.div
            key={`firefly-${i}`}
            className="absolute rounded-full bg-[#fde047] blur-[2px] pointer-events-none"
            style={{ width: f.size, height: f.size }}
            initial={{ x: f.x, y: f.y, opacity: f.opacityBase }}
            animate={{ 
              x: [f.x, f.targetX, f.x],
              y: [f.y, f.targetY, f.y],
              opacity: [0.1, 1, 0.1],
              scale: [1, 2, 1]
            }}
            transition={{ duration: f.duration, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
          />
        ))}
      </>
    );
  }
  
  if (world === "beach") {
    return (
      <>
        <div className="absolute inset-0 bg-[#ea580c]/10 mix-blend-overlay pointer-events-none"></div>
        {/* Sun glow */}
        <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#fde047]/15 blur-[100px] rounded-full pointer-events-none"></div>
        
        {/* Multi-layered Waves */}
        <motion.div 
          className="absolute bottom-0 left-[-50%] right-[-50%] h-[35%] bg-gradient-to-t from-[#fb923c]/30 to-transparent pointer-events-none"
          animate={{ x: ["0%", "8%", "0%", "-8%", "0%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-[-50%] right-[-50%] h-[20%] bg-gradient-to-t from-[#ea580c]/30 to-transparent pointer-events-none"
          animate={{ x: ["-5%", "5%", "-5%", "10%", "-5%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </>
    );
  }

  if (world === "aurora") {
    return (
      <>
        <div className="absolute inset-0 bg-[#1e3a8a]/40 mix-blend-overlay pointer-events-none"></div>
        {/* Three intense layers of Aurora */}
        <motion.div 
          className="absolute top-[-10%] left-[-50%] w-[200%] h-[60%] bg-gradient-to-b from-[#2dd4bf]/30 via-[#a855f7]/20 to-transparent blur-[80px] rounded-[100%] pointer-events-none"
          animate={{
            x: ["0%", "-15%", "10%", "0%"],
            scaleY: [1, 1.3, 0.8, 1],
            opacity: [0.3, 0.8, 0.4, 0.3]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[5%] left-[-50%] w-[200%] h-[50%] bg-gradient-to-b from-[#34d399]/20 via-[#818cf8]/20 to-transparent blur-[80px] rounded-[100%] pointer-events-none"
          animate={{
            x: ["-10%", "15%", "-10%"],
            scaleY: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.7, 0.2]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-[15%] left-[-50%] w-[200%] h-[40%] bg-gradient-to-b from-[#c084fc]/15 via-[#2dd4bf]/10 to-transparent blur-[60px] rounded-[100%] pointer-events-none"
          animate={{
            x: ["5%", "-5%", "5%"],
            scaleY: [1, 1.4, 1],
            opacity: [0.1, 0.6, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
      </>
    );
  }

  if (world === "starry") {
    return (
      <>
        <div className="absolute inset-0 bg-black/50 mix-blend-overlay pointer-events-none"></div>
        {starryStars.map((s, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute bg-white rounded-full pointer-events-none"
            style={{ 
              width: s.size, 
              height: s.size, 
              left: s.x, 
              top: s.y,
              boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,0.8)` 
            }}
            initial={{ opacity: s.baseOpacity }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: s.duration, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          />
        ))}
        {/* Slow moving comets */}
        {comets.map((c, i) => (
          <motion.div
            key={`comet-${i}`}
            className="absolute w-64 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent -rotate-12 blur-[1px] pointer-events-none"
            initial={{ x: "120vw", y: c.yStart, opacity: 0 }}
            animate={{ x: "-40vw", y: c.yEnd, opacity: [0, 1, 1, 0] }}
            transition={{ duration: c.duration, repeat: Infinity, repeatDelay: 10, ease: "linear", delay: c.delay }}
          />
        ))}
      </>
    );
  }

  if (world === "mountain") {
    return (
      <>
        <div className="absolute inset-0 bg-[#ca8a04]/10 mix-blend-overlay pointer-events-none"></div>
        {mountainClouds.map((c, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute bg-white/30 blur-[60px] rounded-full pointer-events-none"
            style={{ width: `${c.size}vw`, height: "20vh" }}
            initial={{ x: "-60vw", y: c.y, opacity: c.opacity }}
            animate={{ x: "120vw" }}
            transition={{ duration: c.duration, repeat: Infinity, ease: "linear", delay: c.delay }}
          />
        ))}
      </>
    );
  }

  if (world === "rain") {
    return (
      <>
        <div className="absolute inset-0 bg-[#1e3a8a]/30 mix-blend-overlay pointer-events-none"></div>
        {rainDrops.map((r, i) => (
          <motion.div
            key={`rain-${i}`}
            className="absolute w-[2px] rounded-full bg-gradient-to-b from-transparent via-white/40 to-white/70 pointer-events-none rotate-[15deg]"
            style={{ height: r.height }}
            initial={{ x: r.left, y: "-10vh", opacity: r.opacity }}
            animate={{ x: `calc(${r.left} + ${r.targetLeft})`, y: "110vh" }}
            transition={{ duration: r.duration, repeat: Infinity, ease: "linear", delay: r.delay }}
          />
        ))}
      </>
    );
  }

  return <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none"></div>;
};
