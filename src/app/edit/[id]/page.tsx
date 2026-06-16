/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
// @ts-ignore
import { api } from "../../../../convex/_generated/api";
// @ts-ignore
import { Id } from "../../../../convex/_generated/dataModel";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import BouquetBuilder from "@/components/create/BouquetBuilder";
import LetterStyleSelector from "@/components/create/LetterStyleSelector";
import MessageEditor from "@/components/create/MessageEditor";
import WorldSelector from "@/components/create/WorldSelector";
import MusicIntegration from "@/components/create/MusicIntegration";
import { Sparkles, PenTool, Globe2, Music, Loader2 } from "lucide-react";

const steps = [
  { id: "bouquet", title: "Bouquet", icon: Sparkles },
  { id: "letter", title: "Letter", icon: PenTool },
  { id: "message", title: "Message", icon: PenTool },
  { id: "world", title: "World", icon: Globe2 },
  { id: "music", title: "Music", icon: Music },
];

export default function EditBouquet() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params.id as Id<"bouquets">;
  const token = searchParams.get("token");

  const bouquet = useQuery(api.bouquets.getBouquetForEdit, id && token ? { id, editToken: token } : "skip");
  const updateBouquet = useMutation(api.bouquets.updateBouquet);

  const [currentStep, setCurrentStep] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Form State
  const [flowers, setFlowers] = useState<any[]>([]);
  const [letterStyle, setLetterStyle] = useState("classic");
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [fontStyle, setFontStyle] = useState("font-handwriting-alt");
  const [world, setWorld] = useState("forest");
  const [music, setMusic] = useState<any>(undefined);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (bouquet) {
      setFlowers(bouquet.flowers);
      setLetterStyle(bouquet.letterStyle);
      setMessage(bouquet.message);
      setSenderName(bouquet.senderName || "");
      setRecipientName(bouquet.recipientName || "");
      setFontStyle(bouquet.fontStyle || "font-handwriting-alt");
      setWorld(bouquet.world);
      setMusic(bouquet.music);
    }
  }, [bouquet]);

  if (!token) {
    return <div className="min-h-screen flex items-center justify-center font-body">Invalid Edit Link. Token missing.</div>;
  }

  if (bouquet === undefined) {
    return (
      <div className="min-h-screen bg-df-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-df-brown" />
      </div>
    );
  }

  if (bouquet === null) {
    return <div className="min-h-screen flex items-center justify-center font-body text-red-400">Unauthorized or Bouquet Not Found.</div>;
  }

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

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateBouquet({
        id,
        editToken: token,
        flowers,
        letterStyle,
        message,
        senderName,
        recipientName,
        fontStyle,
        world,
        music
      });
      setUpdateSuccess(true);
      setTimeout(() => {
        router.push(`/bouquet/${id}`);
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
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
        return (
          <div className="flex flex-col h-full bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-df-beige shadow-sm">
            <MusicIntegration music={music} setMusic={setMusic} onBack={handleBack} bouquetData={{}} />
            
            {/* Custom Edit Action Buttons at the bottom overriding MusicIntegration's default generate button visually */}
            <div className="absolute bottom-8 right-8 flex gap-4 bg-white/50 p-2 rounded-full backdrop-blur-md">
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="flex items-center gap-2 px-8 py-3 bg-df-navy text-white rounded-full font-body hover:bg-df-navy/90 transition-colors shadow-lg"
              >
                {isUpdating ? <><Loader2 className="animate-spin" size={18} /> Saving...</> : "Update Bouquet"}
              </button>
            </div>
            
            <AnimatePresence>
              {updateSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center z-50"
                >
                  <Sparkles className="w-12 h-12 text-df-sage mb-4" />
                  <h2 className="font-heading text-3xl text-df-navy">Bouquet Updated</h2>
                  <p className="font-body text-df-brown mt-2">Redirecting to view...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-df-cream flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-4xl mb-6">
        <h1 className="font-heading text-3xl text-df-brown text-center">Edit Your Bouquet</h1>
      </div>

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
