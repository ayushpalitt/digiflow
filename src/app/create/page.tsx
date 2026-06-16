"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BouquetBuilder from "@/components/create/BouquetBuilder";
import LetterStyleSelector from "@/components/create/LetterStyleSelector";
import MessageEditor from "@/components/create/MessageEditor";
import WorldSelector from "@/components/create/WorldSelector";
import MusicIntegration from "@/components/create/MusicIntegration";
import { Sparkles, PenTool, Globe2, Music } from "lucide-react";

const steps = [
  { id: "bouquet", title: "Bouquet", icon: Sparkles },
  { id: "letter", title: "Letter", icon: PenTool },
  { id: "message", title: "Message", icon: PenTool },
  { id: "world", title: "World", icon: Globe2 },
  { id: "music", title: "Music", icon: Music },
];

export default function CreateBouquet() {
  const [currentStep, setCurrentStep] = useState(0);

  // Form State
  const [flowers, setFlowers] = useState<{type: string, x: number, y: number, rotation: number, scale: number, uid?: string, isManual?: boolean, flipped?: boolean}[]>([]);
  const [letterStyle, setLetterStyle] = useState("classic");
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [fontStyle, setFontStyle] = useState("font-handwriting-alt");
  const [world, setWorld] = useState("forest");
  const [music, setMusic] = useState<{trackUrl: string, title: string, artist: string, albumArt: string, startTime: number, endTime: number} | undefined>(undefined);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BouquetBuilder flowers={flowers} setFlowers={setFlowers} onNext={handleNext} />;
      case 1:
        return <LetterStyleSelector letterStyle={letterStyle} setLetterStyle={setLetterStyle} onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <MessageEditor message={message} setMessage={setMessage} senderName={senderName} setSenderName={setSenderName} recipientName={recipientName} setRecipientName={setRecipientName} fontStyle={fontStyle} setFontStyle={setFontStyle} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <WorldSelector world={world} setWorld={setWorld} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <MusicIntegration music={music} setMusic={setMusic} onBack={handleBack} bouquetData={{flowers, letterStyle, message, senderName, recipientName, fontStyle, world, music}} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-df-cream flex flex-col items-center py-12 px-6">
      {/* Progress Indicator */}
      <div className="w-full max-w-3xl mb-12 flex justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-df-beige -z-10 -translate-y-1/2 rounded-full"></div>
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-df-dustypink -z-10 -translate-y-1/2 transition-all duration-500 rounded-full"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive ? "bg-df-dustypink text-white shadow-md scale-110" :
                  isCompleted ? "bg-df-sage text-white" : "bg-df-beige text-df-brown"
                }`}
              >
                <step.icon size={18} />
              </div>
              <span className={`mt-2 text-xs font-body ${isActive ? "text-df-navy font-semibold" : "text-df-brown"}`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Content Area */}
      <div className="w-full max-w-4xl flex-1 flex flex-col relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
