/* eslint-disable react-hooks/purity */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Info } from "lucide-react";

const FLOWER_TYPES = [
  { id: "rose", name: "Rose", image: "/images/ghibli_rose.png" },
  { id: "tulip", name: "Tulip", image: "/images/ghibli_tulip.png" },
  { id: "lily", name: "Lily", image: "/images/ghibli_lily.png" },
  { id: "sunflower", name: "Sunflower", image: "/images/ghibli_sunflower.png" },
  { id: "daisy", name: "Daisy", image: "/images/ghibli_daisy.png" },
  { id: "lavender", name: "Lavender", image: "/images/ghibli_lavender.png" },
  { id: "orchid", name: "Orchid", image: "/images/ghibli_orchid.png" },
  { id: "cherry", name: "Cherry Blossom", image: "/images/ghibli_cherry.png" },
];

const FILLER_TYPES = [
  { id: "leaf_one", name: "Fern", image: "/images/ghibli_leaf_one.png" },
  { id: "leaf_two", name: "Eucalyptus", image: "/images/ghibli_leaf_two.png" },
  { id: "gipsy", name: "Gypsophila", image: "/images/ghibli_gipsy.png" },
];

const ALL_TYPES = [...FLOWER_TYPES, ...FILLER_TYPES];

interface BouquetBuilderProps {
  flowers: {type: string, x: number, y: number, rotation: number, scale: number, uid?: string, isManual?: boolean}[];
  setFlowers: (flowers: {type: string, x: number, y: number, rotation: number, scale: number, uid?: string, isManual?: boolean}[]) => void;
  onNext: () => void;
}
const FOCALS = ["rose", "sunflower", "lily"];
const SECONDARIES = ["tulip", "daisy", "orchid", "cherry"];
const FILLERS = ["gipsy", "lavender"];
const LEAVES = ["leaf_one", "leaf_two"];

const arrangeBouquet = (currentFlowers: any[]) => {
  const leaves = currentFlowers.filter(f => LEAVES.includes(f.type) && !f.isManual);
  const fillers = currentFlowers.filter(f => FILLERS.includes(f.type) && !f.isManual);
  const secondaries = currentFlowers.filter(f => SECONDARIES.includes(f.type) && !f.isManual);
  const focals = currentFlowers.filter(f => FOCALS.includes(f.type) && !f.isManual);
  
  const manual = currentFlowers.filter(f => f.isManual);

  leaves.forEach((f, i) => {
    const angle = leaves.length > 0 ? (i / leaves.length) * Math.PI * 2 : 0;
    f.x = Math.cos(angle) * 70;
    f.y = Math.sin(angle) * 70;
    f.rotation = angle * (180 / Math.PI) + 90; 
    f.scale = 1.3 + Math.random() * 0.2;
  });

  fillers.forEach((f, i) => {
    const angle = fillers.length > 0 ? (i / fillers.length) * Math.PI * 2 + (Math.PI / 4) : 0;
    f.x = Math.cos(angle) * 50;
    f.y = Math.sin(angle) * 50 - 20; 
    f.rotation = (Math.random() * 60) - 30;
    f.scale = 1.2 + Math.random() * 0.2;
  });

  secondaries.forEach((f, i) => {
    const angle = secondaries.length > 0 ? (i / secondaries.length) * Math.PI * 2 : 0;
    f.x = Math.cos(angle) * 40;
    f.y = Math.sin(angle) * 40;
    f.rotation = (Math.random() * 40) - 20;
    f.scale = 1.4 + Math.random() * 0.2;
  });

  focals.forEach((f, i) => {
    if (focals.length === 1) {
      f.x = 0; f.y = 0;
    } else {
      const angle = (i / focals.length) * Math.PI * 2;
      f.x = Math.cos(angle) * 15;
      f.y = Math.sin(angle) * 15;
    }
    f.rotation = (Math.random() * 30) - 15;
    f.scale = 1.7 + Math.random() * 0.2;
  });

  return [...leaves, ...fillers, ...secondaries, ...focals, ...manual];
};

export default function BouquetBuilder({ flowers, setFlowers, onNext }: BouquetBuilderProps) {
  const [error, setError] = useState("");

  const flowerCount = flowers.filter(f => FLOWER_TYPES.some(t => t.id === f.type)).length;
  const fillerCount = flowers.filter(f => FILLER_TYPES.some(t => t.id === f.type)).length;

  const addFlower = (type: string) => {
    const isFlower = FLOWER_TYPES.some(t => t.id === type);
    
    if (isFlower && flowerCount >= 10) {
      setError("Maximum 10 flowers allowed.");
      return;
    }
    if (!isFlower && fillerCount >= 10) {
      setError("Maximum 10 fillers allowed.");
      return;
    }
    setError("");
    
    
    const newFlower = { 
      uid: Math.random().toString(36).substr(2, 9), 
      type, 
      x: 0, 
      y: 0, 
      rotation: 0, 
      scale: 1, 
      isManual: false 
    };
    
    setFlowers(arrangeBouquet([...flowers, newFlower]));
  };

  const handleAutoArrange = () => {
    const resetFlowers = flowers.map(f => ({ ...f, isManual: false }));
    setFlowers(arrangeBouquet(resetFlowers));
  };



  const removeFlower = (index: number) => {
    const newFlowers = [...flowers];
    newFlowers.splice(index, 1);
    setFlowers(newFlowers);
    setError("");
  };

  const handleDragEnd = (index: number, event: any, info: any) => {
    const newFlowers = [...flowers];
    newFlowers[index].x += info.offset.x;
    newFlowers[index].y += info.offset.y;
    newFlowers[index].isManual = true; // Flag as manual so auto-arrange ignores it
    setFlowers(newFlowers);
  };

  const handleNext = () => {
    if (flowerCount < 5) {
      setError("Please add at least 5 flowers.");
      return;
    }
    if (fillerCount < 3) {
      setError("Please add at least 3 fillers (leaves or gypsophila).");
      return;
    }
    onNext();
  };

  return (
    <div className="flex flex-col h-full bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-df-beige shadow-sm">
      <div className="text-center mb-8">
        <h2 className="font-heading text-4xl text-df-navy mb-2">Gather Your Flowers</h2>
        <p className="font-body text-df-brown">Select items and drag them on the canvas to arrange your perfect bouquet.</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-8">
        {/* Flower Selection Palette */}
        <div className="w-full md:w-1/3 flex flex-col">
          <div className="bg-df-cream rounded-2xl p-4 border border-df-beige mb-4 flex-1 overflow-y-auto custom-scrollbar max-h-[400px]">
            <h3 className="text-sm font-medium text-df-navy mb-3 uppercase tracking-wider">Flowers</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {FLOWER_TYPES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => addFlower(f.id)}
                  className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white transition-colors group border border-transparent hover:border-df-beige"
                >
                  <div className="w-12 h-12 mb-2 relative group-hover:scale-110 transition-transform">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={f.image} 
                      alt={f.name} 
                      className="w-full h-full object-contain drop-shadow-sm" 
                    />
                  </div>
                  <span className="text-xs font-body text-df-navy text-center">{f.name}</span>
                </button>
              ))}
            </div>

            <h3 className="text-sm font-medium text-df-navy mb-3 uppercase tracking-wider">Fillers & Leaves</h3>
            <div className="grid grid-cols-2 gap-3">
              {FILLER_TYPES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => addFlower(f.id)}
                  className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white transition-colors group border border-transparent hover:border-df-beige"
                >
                  <div className="w-12 h-12 mb-2 relative group-hover:scale-110 transition-transform">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={f.image} 
                      alt={f.name} 
                      className="w-full h-full object-contain drop-shadow-sm" 
                    />
                  </div>
                  <span className="text-xs font-body text-df-navy text-center">{f.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-2 mt-auto">
            <div className="flex items-center gap-2 text-sm text-df-brown bg-df-beige/30 p-2 rounded-xl">
              <Info size={16} />
              <span>Flowers: {flowerCount} / 10 (Min 5)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-df-brown bg-df-beige/30 p-2 rounded-xl">
              <Info size={16} />
              <span>Fillers: {fillerCount} / 10 (Min 3)</span>
            </div>
            
            <button 
              onClick={handleAutoArrange}
              className="mt-4 w-full py-2 bg-df-navy text-white text-sm font-medium rounded-xl hover:bg-df-navy/90 transition-colors"
            >
              ✨ Auto-Arrange Bouquet
            </button>
          </div>
          
          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
                className="text-red-400 text-sm mt-3 text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Canvas Area */}
        <div className="w-full md:w-2/3 flex flex-col items-center justify-center bg-df-beige/10 rounded-2xl border-2 border-dashed border-df-beige relative min-h-[400px]">
          {flowers.length === 0 ? (
            <div className="text-df-brown/50 text-center flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-df-brown/30 mb-4" />
              <p className="font-body">Your bouquet is empty.<br/>Tap a flower to add it.</p>
            </div>
          ) : (
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute top-4 left-4 text-df-brown/60 text-sm font-body">
                Arrange your flowers here (drag to move)
              </div>
              
              {/* Vase/Wrapper placeholder */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#FBF8F1] rounded-full -z-10 shadow-sm border border-df-beige/50" />
              
              {flowers.map((f, i) => {
                const flowerData = ALL_TYPES.find((type) => type.id === f.type);
                if (!flowerData) return null;
                return (
                  <motion.div
                    key={f.uid || i}
                    layoutId={f.uid || `flower-${i}`}
                    drag
                    dragMomentum={false}
                    onDragEnd={(e, info) => handleDragEnd(i, e, info)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      x: f.x,
                      y: f.y,
                      rotate: f.rotation,
                      scale: f.scale,
                      opacity: 1 
                    }}
                    className="absolute cursor-grab active:cursor-grabbing group origin-center"
                    style={{ zIndex: i }}
                    title="Drag to arrange"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={flowerData.image} 
                      alt={flowerData.name} 
                      className="w-24 h-24 object-contain pointer-events-none drop-shadow-md" 
                    />
                    
                    {/* Remove button (shows on hover) */}
                    <button 
                      className="absolute -top-2 -right-2 bg-red-400 text-white w-6 h-6 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFlower(i);
                      }}
                      title="Remove"
                    >
                      ×
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-8 py-3 bg-df-navy text-white rounded-full font-body hover:bg-df-navy/90 transition-colors"
        >
          Next Step <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
