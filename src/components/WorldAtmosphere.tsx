"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

export const WorldAtmosphere = ({ world }: { world: string }) => {
  // Memoize random values so animations don't jump on re-renders
  const forestFireflies = useMemo(() => Array.from({ length: 45 }).map(() => ({
    x: `${Math.random() * 100}%`,
    targetX: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    targetY: `${Math.random() * 100 - 30}%`,
    duration: Math.random() * 6 + 6,
    delay: Math.random() * 5,
    opacityBase: Math.random() * 0.6 + 0.2,
    size: Math.random() * 2 + 2
  })), []);

  const starryStars = useMemo(() => Array.from({ length: 200 }).map(() => {
    const isBig = Math.random() > 0.95;
    return {
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      duration: Math.random() * 2 + 1.5,
      delay: Math.random() * 5,
      size: isBig ? Math.random() * 2 + 2 : Math.random() * 1.5 + 0.5,
      isBlinking: Math.random() > 0.3
    };
  }), []);

  const starryMeteors = useMemo(() => Array.from({ length: 8 }).map((_, i) => ({
    delay: Math.random() * 8 + i * 2,
    duration: Math.random() * 0.5 + 0.5, // 0.5s to 1.0s (fast shooting star)
    topStart: Math.random() * 30, // Starts in top 30%
    leftStart: Math.random() * 50 + 50, // Starts in right 50%
    distance: Math.random() * 30 + 30, // Travels 30-60% across screen
    width: Math.random() * 10 + 5 // Length of the meteor tail
  })), []);

  const mountainClouds = useMemo(() => Array.from({ length: 6 }).map((_, i) => ({
    top: `${Math.random() * 30 + 5}%`, // 5% to 35% from top
    duration: Math.random() * 40 + 40, // 40s to 80s
    delay: -(Math.random() * 80), 
    size: Math.random() * 15 + 15, // 15% to 30% width
    opacity: Math.random() * 0.4 + 0.4 // 0.4 to 0.8 opacity
  })), []);

  const rainDrops = useMemo(() => Array.from({ length: 60 }).map(() => ({
    height: `${Math.random() * 30 + 15}px`,
    left: `${Math.random() * 120 - 10}%`,
    targetLeft: `-${Math.random() * 5 + 2}%`,
    duration: Math.random() * 0.2 + 0.3,
    delay: Math.random() * 2,
    opacity: Math.random() * 0.4 + 0.1
  })), []);

  const windowDropsStatic = useMemo(() => Array.from({ length: 40 }).map(() => ({
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.6 + 0.2
  })), []);

  const windowDropsSliding = useMemo(() => Array.from({ length: 15 }).map(() => ({
    x: `${Math.random() * 100}%`,
    startY: `${Math.random() * -20}%`,
    duration: Math.random() * 3 + 2, // 2 to 5 seconds
    delay: Math.random() * 10,
    size: Math.random() * 5 + 4
  })), []);

  if (world === "forest") {
    return (
      <>
        <div className="absolute inset-0 bg-black/50 mix-blend-overlay pointer-events-none"></div>
        {forestFireflies.map((f, i) => (
          <motion.div
            key={`firefly-${i}`}
            className="absolute rounded-full bg-[#fde047] blur-[2px] pointer-events-none"
            style={{ width: f.size, height: f.size, left: f.x, top: f.y }}
            initial={{ opacity: f.opacityBase }}
            animate={{ 
              left: [f.x, f.targetX, f.x],
              top: [f.y, f.targetY, f.y],
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
        {/* Sun glow reflecting on water */}
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-[#fde047]/20 blur-[60px] rounded-[100%] pointer-events-none mix-blend-overlay"></div>
        
        {/* Ocean Waves / Tide */}
        {/* Wave 1 */}
        <motion.div 
          className="absolute left-[-20%] right-[-20%] h-[40%] border-t-[3px] border-white/60 bg-gradient-to-b from-white/20 to-transparent blur-[4px] rounded-[100%] pointer-events-none mix-blend-overlay"
          initial={{ top: "110%", opacity: 0 }}
          animate={{ 
            top: ["100%", "70%", "80%"],
            opacity: [0, 0.7, 0],
            scaleX: [1, 1.05, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Wave 2 */}
        <motion.div 
          className="absolute left-[-30%] right-[-10%] h-[40%] border-t-[4px] border-[#fb923c]/60 bg-gradient-to-b from-[#fde047]/20 to-transparent blur-[6px] rounded-[100%] pointer-events-none mix-blend-overlay"
          initial={{ top: "110%", opacity: 0 }}
          animate={{ 
            top: ["100%", "75%", "85%"],
            opacity: [0, 0.8, 0],
            scaleX: [1, 1.08, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
        />
        {/* Wave 3 */}
        <motion.div 
          className="absolute left-[-10%] right-[-30%] h-[30%] border-t-[2px] border-white/50 bg-gradient-to-b from-white/10 to-transparent blur-[3px] rounded-[100%] pointer-events-none mix-blend-overlay"
          initial={{ top: "110%", opacity: 0 }}
          animate={{ 
            top: ["100%", "80%", "90%"],
            opacity: [0, 0.6, 0],
            scaleX: [1, 1.03, 1]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 7 }}
        />
      </>
    );
  }

  if (world === "aurora") {
    return (
      <>
        <div className="absolute inset-0 bg-[#0f172a]/60 mix-blend-overlay pointer-events-none"></div>
        
        {/* Stars in background */}
        {starryStars.slice(0, 80).map((s, i) => (
          <motion.div
            key={`aurora-star-${i}`}
            className="absolute bg-white rounded-full pointer-events-none"
            style={{ width: s.size, height: s.size, left: s.x, top: s.y, boxShadow: s.size > 2 ? `0 0 4px rgba(255,255,255,0.8)` : 'none' }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: s.isBlinking ? [0, 1, 0] : [0.3, 0.7, 0.3], 
              scale: s.isBlinking ? [0.8, 1.2, 0.8] : 1 
            }}
            transition={{ duration: s.duration, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          />
        ))}

        {/* Aurora Curtains */}
        {/* Curtain 1 - Green/Teal */}
        <motion.div 
          className="absolute top-[-10%] h-[70%] w-[150%] bg-gradient-to-t from-transparent via-[#34d399]/40 to-transparent blur-[40px] pointer-events-none mix-blend-screen origin-top"
          initial={{ left: "-50%", skewX: "-20deg" }}
          animate={{
            left: ["-50%", "-10%", "-50%"],
            skewX: ["-20deg", "-5deg", "-20deg"],
            scaleY: [1, 1.4, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Curtain 2 - Purple/Blue */}
        <motion.div 
          className="absolute top-[-15%] h-[80%] w-[120%] bg-gradient-to-t from-transparent via-[#a855f7]/30 to-transparent blur-[50px] pointer-events-none mix-blend-screen origin-top"
          initial={{ left: "0%", skewX: "15deg" }}
          animate={{
            left: ["0%", "-40%", "0%"],
            skewX: ["15deg", "30deg", "15deg"],
            scaleY: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Curtain 3 - Bright Teal Highlights */}
        <motion.div 
          className="absolute top-[0%] h-[50%] w-[80%] bg-gradient-to-b from-transparent via-[#2dd4bf]/50 to-transparent blur-[30px] pointer-events-none mix-blend-screen origin-top"
          initial={{ left: "-20%", skewX: "-40deg" }}
          animate={{
            left: ["-20%", "40%", "-20%"],
            skewX: ["-40deg", "-10deg", "-40deg"],
            scaleY: [1, 1.3, 1],
            opacity: [0.1, 0.7, 0.1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
        
        {/* Ambient bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#34d399]/10 to-transparent pointer-events-none mix-blend-overlay"></div>
      </>
    );
  }

  if (world === "starry") {
    return (
      <>
        <div className="absolute inset-0 bg-black/40 mix-blend-overlay pointer-events-none"></div>
        {/* Twinkling Stars */}
        {starryStars.map((s, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute bg-white rounded-full pointer-events-none"
            style={{ 
              width: s.size, 
              height: s.size, 
              left: s.x, 
              top: s.y,
              boxShadow: s.size > 2 ? `0 0 6px rgba(255,255,255,0.9)` : 'none'
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: s.isBlinking ? [0, 1, 0] : [0.4, 0.8, 0.4], 
              scale: s.isBlinking ? [0.8, 1.2, 0.8] : 1 
            }}
            transition={{ duration: s.duration, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          />
        ))}
        {/* Fast Meteors (Shooting Stars) */}
        {starryMeteors.map((m, i) => (
          <motion.div
            key={`meteor-${i}`}
            className="absolute h-[1px] md:h-[2px] bg-gradient-to-r from-transparent via-white/80 to-white rounded-full pointer-events-none"
            style={{ 
              width: `${m.width}%`, 
              transform: 'rotate(-35deg)',
              transformOrigin: 'right center'
            }}
            initial={{ top: `${m.topStart}%`, left: `${m.leftStart}%`, opacity: 0 }}
            animate={{ 
              top: `${m.topStart + m.distance}%`, 
              left: `${m.leftStart - m.distance}%`, 
              opacity: [0, 1, 1, 0] 
            }}
            transition={{ duration: m.duration, repeat: Infinity, repeatDelay: Math.random() * 8 + 4, ease: "easeOut", delay: m.delay }}
          />
        ))}
      </>
    );
  }

  if (world === "mountain") {
    return (
      <>
        {/* Morning sunlight glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fde047]/10 via-[#ca8a04]/10 to-transparent pointer-events-none mix-blend-overlay"></div>
        
        {/* Moving Clouds */}
        {mountainClouds.map((c, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute pointer-events-none"
            style={{ 
              top: c.top,
              opacity: c.opacity,
              width: `${c.size}%`,
              aspectRatio: "2.5 / 1",
            }}
            initial={{ left: "-40%" }}
            animate={{ left: "120%" }}
            transition={{ duration: c.duration, repeat: Infinity, ease: "linear", delay: c.delay }}
          >
            <div className="relative w-full h-full">
              {/* Base cloud */}
              <div className="absolute bottom-0 left-0 w-[100%] h-[50%] bg-white blur-[4px] md:blur-[8px] rounded-full"></div>
              {/* Left puff */}
              <div className="absolute bottom-[20%] left-[15%] w-[40%] h-[70%] bg-white blur-[4px] md:blur-[8px] rounded-full"></div>
              {/* Right puff */}
              <div className="absolute bottom-[10%] left-[45%] w-[45%] h-[90%] bg-white blur-[4px] md:blur-[8px] rounded-full"></div>
            </div>
          </motion.div>
        ))}
      </>
    );
  }

  if (world === "rain") {
    return (
      <>
        <div className="absolute inset-0 bg-[#0f172a]/40 mix-blend-overlay pointer-events-none"></div>
        
        {/* Distant falling rain */}
        {rainDrops.map((r, i) => (
          <motion.div
            key={`rain-${i}`}
            className="absolute w-[1px] md:w-[2px] rounded-full bg-gradient-to-b from-transparent via-white/30 to-white/60 pointer-events-none rotate-[10deg]"
            style={{ height: r.height, left: r.left }}
            initial={{ top: "-10%", opacity: r.opacity }}
            animate={{ left: `calc(${r.left} + ${r.targetLeft})`, top: "110%" }}
            transition={{ duration: r.duration, repeat: Infinity, ease: "linear", delay: r.delay }}
          />
        ))}

        {/* Window glass effect overlay (subtle) */}
        <div className="absolute inset-0 bg-white/5 mix-blend-overlay pointer-events-none backdrop-blur-[1px]"></div>

        {/* Static Window Drops */}
        {windowDropsStatic.map((d, i) => (
          <motion.div
            key={`drop-static-${i}`}
            className="absolute rounded-full bg-white/10 shadow-[inset_0_-1px_3px_rgba(255,255,255,0.5),0_1px_2px_rgba(0,0,0,0.2)] backdrop-blur-[2px] pointer-events-none"
            style={{ width: d.size, height: d.size, left: d.x, top: d.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, d.opacity, 0], scale: [0.8, 1, 0.8] }}
            transition={{ duration: d.duration, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
          />
        ))}

        {/* Sliding Window Drops */}
        {windowDropsSliding.map((d, i) => (
          <motion.div
            key={`drop-slide-${i}`}
            className="absolute bg-white/20 shadow-[inset_0_-2px_4px_rgba(255,255,255,0.6),0_2px_3px_rgba(0,0,0,0.2)] backdrop-blur-[4px] pointer-events-none"
            style={{ 
              width: d.size, 
              left: d.x, 
              borderRadius: '50% 50% 40% 40% / 60% 60% 40% 40%' // Tear drop shape
            }}
            initial={{ top: d.startY, opacity: 0, height: d.size * 1.2 }}
            animate={{ 
              top: ["-10%", "110%"],
              opacity: [0, 1, 1, 0],
              height: [d.size * 1.2, d.size * 2, d.size * 1.2] // Stretches as it falls
            }}
            transition={{ duration: d.duration, repeat: Infinity, ease: "easeIn", delay: d.delay }}
          />
        ))}
      </>
    );
  }

  return <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none"></div>;
};
