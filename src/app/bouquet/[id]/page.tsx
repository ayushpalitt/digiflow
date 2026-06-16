/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
// @ts-ignore
import { api } from "../../../../convex/_generated/api";
// @ts-ignore
import { Id } from "../../../../convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Pause, Play, Sparkles } from "lucide-react";
import { getFlowerZIndex } from "@/components/create/BouquetBuilder";

import { useMemo } from "react";

import { WorldAtmosphere } from "@/components/WorldAtmosphere";

const ALL_TYPES = [
  { id: "rose", name: "Rose", image: "/images/ghibli_rose.png" },
  { id: "tulip", name: "Tulip", image: "/images/ghibli_tulip.png" },
  { id: "lily", name: "Lily", image: "/images/ghibli_lily.png" },
  { id: "sunflower", name: "Sunflower", image: "/images/ghibli_sunflower.png" },
  { id: "daisy", name: "Daisy", image: "/images/ghibli_daisy.png" },
  { id: "lavender", name: "Lavender", image: "/images/ghibli_lavender.png" },
  { id: "orchid", name: "Orchid", image: "/images/ghibli_orchid.png" },
  { id: "cherry", name: "Cherry Blossom", image: "/images/ghibli_cherry.png" },
  { id: "leaf_one", name: "Fern", image: "/images/ghibli_leaf_one.png" },
  { id: "leaf_two", name: "Eucalyptus", image: "/images/ghibli_leaf_two.png" },
  { id: "gipsy", name: "Gypsophila", image: "/images/ghibli_gipsy.png" },
];

export default function BouquetRecipientView() {
  const params = useParams();
  const id = params.id as Id<"bouquets">;
  
  const bouquet = useQuery(api.bouquets.getBouquet, id ? { id } : "skip");
  
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // This is a simplified audio player for the Spotify preview URL
  // If we had a real preview URL, we would play it here
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Audio logic would go here
  };

  if (bouquet === undefined) {
    return (
      <div className="min-h-screen bg-df-cream flex items-center justify-center">
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
          <Sparkles className="w-10 h-10 text-df-brown opacity-50" />
        </motion.div>
      </div>
    );
  }

  if (bouquet === null) {
    return (
      <div className="min-h-screen bg-df-cream flex flex-col items-center justify-center">
        <h1 className="font-heading text-4xl text-df-navy mb-4">Bouquet Not Found</h1>
        <p className="font-body text-df-brown">This bouquet may have withered away.</p>
      </div>
    );
  }

  // Pre-open loading screen
  if (!isOpened) {
    return (
      <div className="min-h-screen bg-df-cream flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-df-beige/50 transition-colors" onClick={() => setIsOpened(true)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-md"
        >
          <Sparkles className="w-12 h-12 text-df-dustypink mx-auto mb-8 animate-pulse" />
          <h1 className="font-heading text-4xl md:text-5xl text-df-navy mb-6">You&apos;ve received something special.</h1>
          <p className="font-body text-df-brown text-lg animate-bounce mt-12">Tap anywhere to open</p>
        </motion.div>
      </div>
    );
  }

  // Determine World Background
  const worldImages: Record<string, string> = {
    forest: "/images/world_forest.png",
    beach: "/images/world_beach.png",
    aurora: "/images/world_aurora.png",
    starry: "/images/world_starry.png",
    mountain: "/images/world_mountain.png",
    rain: "/images/world_rain.png",
  };

  return (
    <div 
      className={`min-h-screen relative overflow-hidden transition-colors duration-[3000ms] ${!worldImages[bouquet.world] ? "bg-df-cream" : ""}`}
      style={worldImages[bouquet.world] ? {
        backgroundImage: `url(${worldImages[bouquet.world]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : {}}
    >
      
      {/* World Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <WorldAtmosphere world={bouquet.world} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 md:p-12">
        
        {/* Composition Container */}
        <div className="relative flex flex-col items-center w-full max-w-lg mt-8 md:mt-12">
          
          {/* Bouquet Canvas Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center z-30 pointer-events-none"
          >
            {/* Flowers */}
            {bouquet.flowers.map((f: any, i: number) => {
              const flowerData = ALL_TYPES.find(t => t.id === f.type);
              if (!flowerData) return null;
              return (
                <motion.div
                  key={i}
                  initial={{ 
                    scale: 0, 
                    opacity: 0,
                    x: f.x * 1.333,
                    y: f.y * 1.333,
                    rotate: f.rotation
                  }}
                  animate={{ 
                    scale: f.scale, 
                    opacity: 1,
                    x: f.x * 1.333,
                    y: f.y * 1.333,
                    rotate: f.rotation
                  }}
                  transition={{ duration: 1.5, delay: 1 + i * 0.15 }}
                  className="absolute origin-bottom"
                  style={{
                    zIndex: getFlowerZIndex(f.type, i)
                  }}
                >
                  <img 
                    src={`${flowerData.image}?v=2`} 
                    alt={flowerData.name} 
                    className="w-32 h-32 object-contain opacity-95 drop-shadow-md transition-transform animate-sway"
                    style={{ transform: f.flipped ? 'scaleX(-1)' : 'scaleX(1)' }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Letter Area (Overlapping under the bouquet) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 2.5, ease: "easeOut" }}
            className="w-full bg-[#FCFAFA] p-8 md:p-12 pt-28 md:pt-36 rounded-sm shadow-xl relative -mt-40 sm:-mt-48 z-20 border border-df-beige/40"
          >
            {/* Letter texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply" 
                 style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg viewBox=\\"0 0 200 200\\" xmlns=\\"http://www.w3.org/2000/svg\\"><filter id=\\"noiseFilter\\"><feTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.85\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"/></filter><rect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23noiseFilter)\\"/></svg>")' }}>
            </div>
            
            <div className={`${bouquet.fontStyle || 'font-handwriting-alt'} text-2xl md:text-3xl text-df-navy leading-loose relative z-10 whitespace-pre-wrap mt-8 flex flex-col gap-6`}>
              {bouquet.recipientName && (
                <p>Dear {bouquet.recipientName},</p>
              )}
              <p>{bouquet.message}</p>
              {bouquet.senderName && (
                <p className="mt-4">
                  With love,
                  <br />
                  {bouquet.senderName}
                </p>
              )}
            </div>
          </motion.div>

        </div>

      </div>

      {/* Music Player */}
      {bouquet.music && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 1 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 shadow-xl"
        >
          <img src={bouquet.music.albumArt} alt="Album" className="w-10 h-10 rounded-full animate-[spin_4s_linear_infinite]" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
          <div className="hidden md:block pr-2">
            <p className="text-white font-body text-sm font-medium leading-tight shadow-black drop-shadow-md">{bouquet.music.title}</p>
            <p className="text-white/70 font-body text-xs drop-shadow-md">{bouquet.music.artist}</p>
          </div>
          <button 
            onClick={togglePlay}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors mr-1"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
          </button>
        </motion.div>
      )}
    </div>
  );
}
