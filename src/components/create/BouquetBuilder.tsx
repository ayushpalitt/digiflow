/* eslint-disable react-hooks/purity */
import { useState, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Info, RotateCw, FlipHorizontal, Plus, Minus, Eye, X } from "lucide-react";

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

type FlowerType = {type: string, x: number, y: number, rotation: number, scale: number, uid?: string, isManual?: boolean, flipped?: boolean};

interface BouquetBuilderProps {
  flowers: FlowerType[];
  setFlowers: Dispatch<SetStateAction<FlowerType[]>>;
  onNext: () => void;
}
const FOCALS = ["rose", "sunflower", "lily"];
const SECONDARIES = ["tulip", "daisy", "orchid", "cherry"];
const FILLERS = ["gipsy", "lavender"];
const LEAVES = ["leaf_one", "leaf_two"];

export const getFlowerZIndex = (type: string, index: number) => {
  if (LEAVES.includes(type)) return 10 + index;
  if (FILLERS.includes(type)) return 20 + index;
  if (SECONDARIES.includes(type)) return 30 + index;
  if (FOCALS.includes(type)) return 40 + index;
  return 50 + index;
};

const arrangeBouquet = (currentFlowers: any[]) => {
  const leaves = currentFlowers.filter(f => LEAVES.includes(f.type) && !f.isManual);
  const fillers = currentFlowers.filter(f => FILLERS.includes(f.type) && !f.isManual);
  const secondaries = currentFlowers.filter(f => SECONDARIES.includes(f.type) && !f.isManual);
  const focals = currentFlowers.filter(f => FOCALS.includes(f.type) && !f.isManual);
  
  const manual = currentFlowers.filter(f => f.isManual);

  // Organic, dense cluster arrangement mimicking professional composite bouquets
  leaves.forEach((f, i) => {
    const spread = leaves.length > 1 ? 120 : 0; 
    const angle = leaves.length > 1 ? -(spread / 2) + (i * (spread / (leaves.length - 1))) : 0;
    f.rotation = angle + (Math.random() * 10 - 5);
    f.x = angle * 1.2; // Fan out behind
    f.y = -60 - Math.abs(angle) * 0.4; // Push up to form a backdrop
    f.scale = 1.1 + (Math.random() * 0.2);
  });

  fillers.forEach((f, i) => {
    const spread = fillers.length > 1 ? 100 : 0;
    const angle = fillers.length > 1 ? -(spread / 2) + (i * (spread / (fillers.length - 1))) : 0;
    f.rotation = angle + (Math.random() * 20 - 10);
    f.x = angle * 0.9;
    f.y = -40 - (Math.random() * 30); // Stagger vertically
    f.scale = 0.9 + (Math.random() * 0.2);
  });

  secondaries.forEach((f, i) => {
    const spread = secondaries.length > 1 ? 80 : 0;
    const angle = secondaries.length > 1 ? -(spread / 2) + (i * (spread / (secondaries.length - 1))) : 0;
    f.rotation = angle + (Math.random() * 15 - 7.5);
    f.x = angle * 0.7;
    f.y = -20 - (i % 2 === 0 ? 15 : -5); // Zig-zag staggering
    f.scale = 1.05 + (Math.random() * 0.1);
  });

  focals.forEach((f, i) => {
    const spread = focals.length > 1 ? 50 : 0;
    const angle = focals.length > 1 ? -(spread / 2) + (i * (spread / (focals.length - 1))) : 0;
    f.rotation = angle + (Math.random() * 10 - 5);
    f.x = angle * 0.4; // Keep very tight in the center
    // Stack heavily in the front center
    f.y = i % 2 === 0 ? 10 : -10; 
    f.scale = 1.4 + (Math.random() * 0.15); // Much larger for focal presence
  });

  return [...leaves, ...fillers, ...secondaries, ...focals, ...manual];
};

export default function BouquetBuilder({ flowers, setFlowers, onNext }: BouquetBuilderProps) {
  const [error, setError] = useState("");
  const [activeFlower, setActiveFlower] = useState<number | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

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
      isManual: false,
      flipped: false
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

  const handleFlip = (index: number) => {
    setFlowers(prev => {
      const newF = [...prev];
      newF[index] = { 
        ...newF[index], 
        flipped: !newF[index].flipped, 
        isManual: true 
      };
      return newF;
    });
  };

  const handleScale = (index: number, delta: number) => {
    setFlowers(prev => {
      const newF = [...prev];
      const newScale = Math.max(0.5, Math.min(3, newF[index].scale + delta));
      newF[index] = { 
        ...newF[index], 
        scale: newScale, 
        isManual: true 
      };
      return newF;
    });
  };

  const handleRotateStart = (e: React.PointerEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    
    const startX = e.clientX;
    const initialRotation = flowers[index].rotation;
    
    const onPointerMove = (moveEvent: PointerEvent) => {
      // Simple linear mapping: horizontal drag directly controls rotation
      const dx = moveEvent.clientX - startX;
      
      // 1 pixel dragged = 0.8 degrees of rotation. Very smooth and steady.
      const deltaAngle = dx * 0.8;
      
      setFlowers(prev => {
        const newF = [...prev];
        newF[index].rotation = initialRotation + deltaAngle;
        newF[index].isManual = true;
        return newF;
      });
    };
    
    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
    
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
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
            
            <div className="flex gap-2 mt-4">
              <button 
                onClick={handleAutoArrange}
                className="flex-1 py-2 bg-df-navy text-white text-sm font-medium rounded-xl hover:bg-df-navy/90 transition-colors"
              >
                ✨ Auto-Arrange
              </button>
              <button 
                onClick={() => setIsPreviewMode(true)}
                className="flex-1 py-2 bg-df-sage text-white text-sm font-medium rounded-xl hover:bg-df-sage/90 transition-colors flex items-center justify-center gap-2"
              >
                <Eye size={16} /> Preview
              </button>
            </div>
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
        <div 
          className="w-full md:w-2/3 flex flex-col items-center justify-center bg-df-beige/10 rounded-2xl border-2 border-dashed border-df-beige relative min-h-[400px]"
          onPointerDown={() => setActiveFlower(null)}
        >
          {flowers.length === 0 ? (
            <div className="text-df-brown/50 text-center flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-df-brown/30 mb-4" />
              <p className="font-body">Your bouquet is empty.<br/>Tap a flower to add it.</p>
            </div>
          ) : (
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute top-4 left-4 text-df-brown/60 text-sm font-body bg-white/50 backdrop-blur-sm px-2 py-1 rounded-md z-10">
                Grid System: Snap to align
              </div>
              
              {/* Grid System Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: 'linear-gradient(#d4a373 1px, transparent 1px), linear-gradient(90deg, #d4a373 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                  backgroundPosition: 'center center'
                }}
              />
              <div className="absolute inset-0 pointer-events-none border border-df-brown/20" />
              {/* Center Crosshair */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-df-brown/40 pointer-events-none" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-df-brown/40 pointer-events-none" />

              {/* Vase/Wrapper placeholder */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#FBF8F1] rounded-full -z-20 shadow-sm border border-df-beige/50" />
              
              {flowers.map((f, i) => {
                const flowerData = ALL_TYPES.find((type) => type.id === f.type);
                if (!flowerData) return null;
                const isActive = activeFlower === i;
                
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
                    className="absolute cursor-grab active:cursor-grabbing group origin-bottom flower-container"
                    style={{ zIndex: getFlowerZIndex(f.type, i) }}
                    title="Drag to move, use button to rotate"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={`${flowerData.image}?v=2`} 
                      alt={flowerData.name} 
                      className={`w-24 h-24 object-contain pointer-events-none drop-shadow-md transition-transform duration-300`} 
                      style={{ transform: f.flipped ? 'scaleX(-1)' : 'scaleX(1)' }}
                    />
                    
                    {/* Hover Controls Popup */}
                    <div className="absolute -top-4 -right-4 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button 
                        className="bg-red-400 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-red-500 shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFlower(i);
                        }}
                        title="Remove"
                      >
                        ×
                      </button>
                      <button 
                        className="bg-green-400 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-green-500 shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFlip(i);
                        }}
                        title="Flip horizontally"
                      >
                        <FlipHorizontal size={12} />
                      </button>
                      <button 
                        className="bg-purple-400 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-purple-500 shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScale(i, 0.15);
                        }}
                        title="Increase size"
                      >
                        <Plus size={12} />
                      </button>
                      <button 
                        className="bg-orange-400 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-orange-500 shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScale(i, -0.15);
                        }}
                        title="Decrease size"
                      >
                        <Minus size={12} />
                      </button>
                      <button 
                        className="bg-blue-400 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-blue-500 shadow-sm cursor-grab active:cursor-grabbing"
                        onPointerDown={(e) => handleRotateStart(e, i)}
                        title="Drag to rotate"
                      >
                        <RotateCw size={12} />
                      </button>
                    </div>
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

      {/* Live Preview Modal */}
      <AnimatePresence>
        {isPreviewMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-df-cream w-full max-w-3xl h-[80vh] rounded-3xl shadow-2xl flex flex-col relative overflow-hidden border-2 border-df-beige"
            >
              <div className="p-4 border-b border-df-beige flex justify-between items-center bg-white/50 relative z-20">
                <div>
                  <h3 className="font-heading text-2xl text-df-navy">Final Layout Preview</h3>
                  <p className="text-sm font-body text-df-brown">This is exactly how it will appear to the recipient.</p>
                </div>
                <button 
                  onClick={() => setIsPreviewMode(false)}
                  className="p-2 bg-white hover:bg-red-50 text-red-400 hover:text-red-500 rounded-full transition-colors shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]">
                {/* Scaled-up Final Render */}
                <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center z-10">
                  {flowers.map((f, i) => {
                    const flowerData = ALL_TYPES.find(t => t.id === f.type);
                    if (!flowerData) return null;
                    return (
                      <div
                        key={i}
                        className="absolute origin-bottom"
                        style={{
                          transform: `translate(${f.x * 1.333}px, ${f.y * 1.333}px) rotate(${f.rotation}deg) scale(${f.scale})`,
                          zIndex: getFlowerZIndex(f.type, i)
                        }}
                      >
                        <img 
                          src={`${flowerData.image}?v=2`} 
                          alt={flowerData.name} 
                          className="w-32 h-32 object-contain opacity-95 pointer-events-none drop-shadow-md transition-transform"
                          style={{ transform: f.flipped ? 'scaleX(-1)' : 'scaleX(1)' }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
