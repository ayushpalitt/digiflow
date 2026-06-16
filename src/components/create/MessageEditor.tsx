import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface MessageEditorProps {
  message: string;
  setMessage: (msg: string) => void;
  senderName?: string;
  setSenderName?: (name: string) => void;
  recipientName?: string;
  setRecipientName?: (name: string) => void;
  fontStyle: string;
  setFontStyle: (font: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const FONT_OPTIONS = [
  { id: "font-handwriting-alt", name: "Neat" },
  { id: "font-handwriting", name: "Scribble" },
  { id: "font-dancing", name: "Cursive" },
  { id: "font-typewriter", name: "Typewriter" },
  { id: "font-pacifico", name: "Bubbly" },
];

export default function MessageEditor({ 
  message, 
  setMessage, 
  senderName = "", 
  setSenderName = () => {}, 
  recipientName = "", 
  setRecipientName = () => {}, 
  fontStyle, 
  setFontStyle, 
  onNext, 
  onBack 
}: MessageEditorProps) {
  const [error, setError] = useState("");

  const words = message.trim().split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;
  // Assuming the 0/200 in screenshot is character limit, but user said "reduce the minimum words to 2", 
  // so we'll enforce word limits but also display word count. Or we can just use 200 words max.
  const MAX_WORDS = 200;

  const handleNext = () => {
    if (wordCount < 2) {
      setError(`Please write at least 2 words. You have ${wordCount}.`);
      return;
    }
    if (wordCount > MAX_WORDS) {
      setError(`Please keep it under ${MAX_WORDS} words. You have ${wordCount}.`);
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="flex flex-col h-full bg-white/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-df-beige shadow-sm overflow-y-auto custom-scrollbar">
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
        
        {/* Font Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {FONT_OPTIONS.map((font) => (
            <button
              key={font.id}
              onClick={() => setFontStyle(font.id)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                fontStyle === font.id 
                  ? "bg-df-navy text-white shadow-md" 
                  : "bg-white text-df-brown hover:bg-df-beige border border-df-beige"
              } ${font.id}`}
            >
              {font.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {/* Recipient's Name */}
          <div className="flex flex-col gap-2">
            <label className="text-df-navy font-heading text-xl">Recipient's Name</label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Who is this for?"
              className="w-full bg-white/80 border border-df-beige rounded-xl p-4 font-body text-df-navy outline-none focus:border-df-dustypink transition-colors shadow-sm text-lg placeholder:text-df-brown/50"
            />
          </div>

          {/* Your Message */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-df-navy font-heading text-xl">Your Message</label>
            <div className="w-full h-48 bg-white/80 border border-df-beige rounded-xl p-4 shadow-sm focus-within:border-df-dustypink transition-colors">
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setError("");
                }}
                placeholder="Write something sweet..."
                className={`w-full h-full bg-transparent resize-none outline-none ${fontStyle} text-2xl text-df-navy leading-loose custom-scrollbar placeholder:font-body placeholder:text-lg placeholder:text-df-brown/50 placeholder:not-italic`}
              />
            </div>
            
            <div className="absolute -bottom-6 right-2 text-sm font-body text-df-brown flex items-center gap-4">
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
              <span className={`${wordCount < 2 || wordCount > MAX_WORDS ? "text-red-400" : "text-df-sage"}`}>
                {wordCount}/{MAX_WORDS}
              </span>
            </div>
          </div>

          {/* Your Name */}
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-df-navy font-heading text-xl">Your Name</label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="From..."
              className="w-full bg-white/80 border border-df-beige rounded-xl p-4 font-body text-df-navy outline-none focus:border-df-dustypink transition-colors shadow-sm text-lg placeholder:text-df-brown/50"
            />
          </div>
        </div>

      </div>

      <div className="flex justify-between mt-10 pt-4 border-t border-df-beige/50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 text-df-brown hover:text-df-navy font-body transition-colors"
        >
          <ChevronLeft size={18} /> Back
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-8 py-3 bg-df-navy text-white rounded-full font-body hover:bg-df-navy/90 transition-colors shadow-sm"
        >
          Next Step <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
