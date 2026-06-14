import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface MessageEditorProps {
  message: string;
  setMessage: (msg: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function MessageEditor({ message, setMessage, onNext, onBack }: MessageEditorProps) {
  const [error, setError] = useState("");

  const words = message.trim().split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;

  const handleNext = () => {
    if (wordCount < 50) {
      setError(`Please write at least 50 words. You have ${wordCount}.`);
      return;
    }
    if (wordCount > 150) {
      setError(`Please keep it under 150 words. You have ${wordCount}.`);
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="flex flex-col h-full bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-df-beige shadow-sm">
      <div className="text-center mb-8">
        <h2 className="font-heading text-4xl text-df-navy mb-2">Pen Your Thoughts</h2>
        <p className="font-body text-df-brown">Speak from the heart (50 - 150 words).</p>
      </div>

      <div className="flex-1 flex flex-col items-center max-w-2xl mx-auto w-full">
        <div className="w-full relative flex-1 bg-df-cream/80 border border-df-beige rounded-2xl p-6 shadow-inner focus-within:border-df-dustypink transition-colors">
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setError("");
            }}
            placeholder="Dear friend..."
            className="w-full h-full bg-transparent resize-none outline-none font-handwriting-alt text-2xl text-df-navy leading-loose custom-scrollbar"
          />
          
          <div className="absolute bottom-4 right-6 text-sm font-body text-df-brown flex items-center gap-4">
            <AnimatePresence>
              {error && (
                <motion.span 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400"
                >
                  {error}
                </motion.span>
              )}
            </AnimatePresence>
            <span className={`${wordCount < 50 || wordCount > 150 ? "text-red-400" : "text-df-sage"}`}>
              {wordCount} / 150
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-df-beige/50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 text-df-brown hover:text-df-navy font-body transition-colors"
        >
          <ChevronLeft size={18} /> Back
        </button>
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
