import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";

const STYLES = [
  { id: "classic", name: "Classic Letter", desc: "A folded handwritten letter on cream paper.", color: "bg-[#FDFBF7]" },
  { id: "vintage", name: "Vintage Postcard", desc: "A travel-inspired postcard with stamps.", color: "bg-[#EAE0D5]" },
  { id: "pressed", name: "Pressed Flower Note", desc: "Notebook page with delicate dried flowers.", color: "bg-[#F4EFE6]" },
  { id: "journal", name: "Journal Entry", desc: "An old diary aesthetic with lines.", color: "bg-[#Fdf8ec]" },
  { id: "polaroid", name: "Polaroid Memory", desc: "A photo-inspired note layout.", color: "bg-white" },
];

interface LetterStyleSelectorProps {
  letterStyle: string;
  setLetterStyle: (style: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function LetterStyleSelector({ letterStyle, setLetterStyle, onNext, onBack }: LetterStyleSelectorProps) {
  return (
    <div className="flex flex-col h-full bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-df-beige shadow-sm">
      <div className="text-center mb-10">
        <h2 className="font-heading text-4xl text-df-navy mb-2">Choose a Canvas</h2>
        <p className="font-body text-df-brown">How should your words be presented?</p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => setLetterStyle(style.id)}
            className={`relative flex flex-col items-center p-6 rounded-2xl transition-all duration-300 border-2 text-left h-48 ${
              letterStyle === style.id
                ? "border-df-dustypink shadow-md bg-white/80 scale-[1.02]"
                : "border-transparent bg-df-cream hover:bg-white hover:scale-[1.01]"
            }`}
          >
            {/* Visual Representation Placeholder */}
            <div className={`w-full h-20 mb-4 rounded-lg shadow-sm border border-gray-100 ${style.color} relative overflow-hidden`}>
              {/* Decorative elements based on type */}
              {style.id === "journal" && (
                <div className="absolute inset-0 flex flex-col justify-center gap-2 px-4">
                  <div className="h-[1px] w-full bg-blue-100"></div>
                  <div className="h-[1px] w-full bg-blue-100"></div>
                  <div className="h-[1px] w-full bg-blue-100"></div>
                </div>
              )}
              {style.id === "pressed" && (
                <div className="absolute top-2 right-2 w-4 h-4 bg-df-sage/40 rounded-full blur-[1px]"></div>
              )}
              {style.id === "polaroid" && (
                <div className="absolute top-2 left-2 right-2 bottom-6 bg-gray-100 rounded-sm"></div>
              )}
            </div>

            <div className="w-full">
              <h3 className="font-heading text-xl text-df-navy mb-1">{style.name}</h3>
              <p className="text-xs font-body text-df-brown/80 leading-relaxed">{style.desc}</p>
            </div>

            {letterStyle === style.id && (
              <motion.div
                layoutId="styleCheck"
                className="absolute top-4 right-4 w-6 h-6 bg-df-dustypink rounded-full flex items-center justify-center text-white"
              >
                <Check size={14} />
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
