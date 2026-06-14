import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";

const WORLDS = [
  { id: "forest", name: "Forest Fireflies", desc: "Dark forest, floating fireflies, soft glowing lights.", color: "bg-[#1B2A22]" },
  { id: "beach", name: "Beach Sunset", desc: "Ocean waves, sunset colors, warm orange sky.", color: "bg-[#E68A6A]" },
  { id: "aurora", name: "Northern Lights", desc: "Aurora animation, stars, peaceful atmosphere.", color: "bg-[#1E3B4D]" },
  { id: "starry", name: "Starry Night", desc: "Deep blue sky, twinkling stars, occasional shooting star.", color: "bg-[#0F172A]" },
  { id: "mountain", name: "Mountain Sunrise", desc: "Calm mountains, clouds drifting slowly, golden morning light.", color: "bg-[#D9A05B]" },
  { id: "rain", name: "Cozy Rain Evening", desc: "Rain on a window, warm yellow lights, peaceful atmosphere.", color: "bg-[#3A4556]" },
];

interface WorldSelectorProps {
  world: string;
  setWorld: (w: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function WorldSelector({ world, setWorld, onNext, onBack }: WorldSelectorProps) {
  return (
    <div className="flex flex-col h-full bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-df-beige shadow-sm">
      <div className="text-center mb-10">
        <h2 className="font-heading text-4xl text-df-navy mb-2">Choose the World</h2>
        <p className="font-body text-df-brown">Where should they open your bouquet?</p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WORLDS.map((w) => (
          <button
            key={w.id}
            onClick={() => setWorld(w.id)}
            className={`relative flex flex-col items-center p-4 rounded-2xl transition-all duration-300 border-2 text-left h-56 overflow-hidden ${
              world === w.id
                ? "border-df-dustypink shadow-lg scale-[1.02]"
                : "border-transparent shadow-sm hover:shadow-md hover:scale-[1.01]"
            }`}
          >
            {/* Visual Representation Placeholder */}
            <div className={`absolute inset-0 ${w.color} -z-10 transition-opacity ${world === w.id ? "opacity-100" : "opacity-90"}`}>
              {/* Optional: Add slight CSS patterns here to represent the worlds */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            <div className="w-full h-full flex flex-col justify-end text-white pb-2 relative z-10">
              <h3 className="font-heading text-2xl mb-1 drop-shadow-md">{w.name}</h3>
              <p className="text-xs font-body text-white/80 leading-relaxed drop-shadow-md">{w.desc}</p>
            </div>

            {world === w.id && (
              <motion.div
                layoutId="worldCheck"
                className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center text-df-navy"
              >
                <Check size={14} strokeWidth={3} />
              </motion.div>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-df-beige/50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 text-df-brown hover:text-df-navy font-body transition-colors"
        >
          <ChevronLeft size={18} /> Back
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-8 py-3 bg-df-navy text-white rounded-full font-body hover:bg-df-navy/90 transition-colors"
        >
          Next Step <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
