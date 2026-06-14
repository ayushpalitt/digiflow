/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { ChevronLeft, Music, Loader2, Sparkles } from "lucide-react";
import { useMutation } from "convex/react";
// @ts-ignore
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

interface MusicData {
  trackUrl: string;
  title: string;
  artist: string;
  albumArt: string;
  startTime: number;
  endTime: number;
}

interface MusicIntegrationProps {
  music: MusicData | undefined;
  setMusic: (m: MusicData | undefined) => void;
  onBack: () => void;
  bouquetData: any; // All the data collected so far
}

export default function MusicIntegration({ music, setMusic, onBack, bouquetData }: MusicIntegrationProps) {
  const router = useRouter();
  const [urlInput, setUrlInput] = useState(music?.trackUrl || "");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [editLink, setEditLink] = useState("");

  const createBouquet = useMutation(api.bouquets.createBouquet);

  const handleFetchSpotify = async () => {
    if (!urlInput.includes("spotify.com")) {
      setError("Please enter a valid Spotify URL.");
      return;
    }
    
    setIsFetching(true);
    setError("");

    try {
      // Use Spotify oEmbed API to get metadata without auth
      const response = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(urlInput)}`);
      if (!response.ok) throw new Error("Could not fetch track data.");
      
      const data = await response.json();
      
      setMusic({
        trackUrl: urlInput,
        title: data.title,
        artist: data.author_name,
        albumArt: data.thumbnail_url,
        startTime: 45, // default 0:45
        endTime: 90,   // default 1:30
      });
    } catch (err) {
      setError("Failed to fetch track info. Check the URL and try again.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Call Convex mutation
      const result = await createBouquet({
        flowers: bouquetData.flowers,
        letterStyle: bouquetData.letterStyle,
        message: bouquetData.message,
        world: bouquetData.world,
        music: music,
      });

      const baseUrl = window.location.origin;
      setShareLink(`${baseUrl}/bouquet/${result.id}`);
      setEditLink(`${baseUrl}/edit/${result.id}?token=${result.editToken}`);
    } catch (err) {
      console.error(err);
      setError("Failed to generate your bouquet. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (shareLink) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white/50 backdrop-blur-sm rounded-3xl p-12 border border-df-beige shadow-sm text-center">
        <div className="w-20 h-20 bg-df-sage text-white rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce">
          <Sparkles size={32} />
        </div>
        <h2 className="font-heading text-4xl text-df-navy mb-4">Your Bouquet is Ready</h2>
        <p className="font-body text-df-brown mb-8 max-w-md">
          A unique world has been created. Share this link with your special someone.
        </p>

        <div className="w-full max-w-md mb-6">
          <label className="block text-sm font-bold text-df-navy mb-2 text-left">Share Link (For Recipient)</label>
          <div className="flex bg-white border border-df-beige rounded-xl overflow-hidden">
            <input 
              type="text" 
              readOnly 
              value={shareLink} 
              className="flex-1 px-4 py-3 outline-none font-body text-df-navy bg-transparent"
            />
            <button 
              onClick={() => navigator.clipboard.writeText(shareLink)}
              className="px-6 bg-df-navy text-white font-body hover:bg-df-navy/90 transition-colors"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="w-full max-w-md">
          <label className="block text-sm font-bold text-df-brown mb-2 text-left">Secret Edit Link (Save this!)</label>
          <div className="flex bg-white/50 border border-df-beige rounded-xl overflow-hidden">
            <input 
              type="text" 
              readOnly 
              value={editLink} 
              className="flex-1 px-4 py-2 outline-none font-body text-df-brown text-sm bg-transparent"
            />
            <button 
              onClick={() => navigator.clipboard.writeText(editLink)}
              className="px-4 bg-df-brown/10 text-df-brown font-body text-sm hover:bg-df-brown/20 transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-df-beige shadow-sm">
      <div className="text-center mb-10">
        <h2 className="font-heading text-4xl text-df-navy mb-2">Set the Mood (Optional)</h2>
        <p className="font-body text-df-brown">Add a Spotify track to play when they open it.</p>
      </div>

      <div className="flex-1 flex flex-col items-center max-w-xl mx-auto w-full">
        {!music ? (
          <div className="w-full space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Paste Spotify Track URL..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-df-beige bg-white/80 focus:border-df-dustypink outline-none font-body text-df-navy"
              />
              <button
                onClick={handleFetchSpotify}
                disabled={isFetching || !urlInput}
                className="px-6 py-3 bg-[#1DB954] text-white rounded-xl font-body font-medium hover:bg-[#1ed760] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isFetching ? <Loader2 className="animate-spin" size={18} /> : <Music size={18} />}
                Add
              </button>
            </div>
            {error && <p className="text-red-400 text-sm font-body">{error}</p>}
          </div>
        ) : (
          <div className="w-full bg-df-cream border border-df-beige rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <img src={music.albumArt} alt="Album Art" className="w-16 h-16 rounded-md shadow-sm" />
              <div className="flex-1">
                <h4 className="font-heading text-xl text-df-navy">{music.title}</h4>
                <p className="font-body text-sm text-df-brown">{music.artist}</p>
              </div>
              <button 
                onClick={() => setMusic(undefined)}
                className="text-xs text-df-brown underline hover:text-df-navy"
              >
                Remove
              </button>
            </div>

            {/* Simple Timeline Selector */}
            <div className="space-y-2">
              <label className="text-sm font-body text-df-brown font-medium">Select Clip (Seconds)</label>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-df-beige/50 h-12 rounded-lg relative overflow-hidden flex items-center px-2 border border-df-beige">
                  {/* Mock Waveform */}
                  <div className="absolute inset-0 flex items-center justify-between px-2 opacity-30">
                    {Array.from({length: 40}).map((_, i) => (
                      <div key={i} className="w-1 bg-df-brown rounded-full" style={{height: `${20 + ((i * 13) % 60)}%`}}></div>
                    ))}
                  </div>
                  {/* Selection overlay */}
                  <div className="absolute left-[30%] right-[30%] top-0 bottom-0 bg-df-dustypink/20 border-l-2 border-r-2 border-df-dustypink z-10"></div>
                </div>
                <div className="flex flex-col gap-1 w-24">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-df-brown w-8">Start</span>
                    <input 
                      type="number" 
                      value={music.startTime} 
                      onChange={(e) => setMusic({...music, startTime: Number(e.target.value)})}
                      className="w-full bg-white border border-df-beige rounded text-sm px-1 text-center"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-df-brown w-8">End</span>
                    <input 
                      type="number" 
                      value={music.endTime} 
                      onChange={(e) => setMusic({...music, endTime: Number(e.target.value)})}
                      className="w-full bg-white border border-df-beige rounded text-sm px-1 text-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-auto pt-8 border-t border-df-beige/50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 text-df-brown hover:text-df-navy font-body transition-colors"
        >
          <ChevronLeft size={18} /> Back
        </button>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 px-8 py-3 bg-df-sunset text-white rounded-full font-body hover:bg-df-sunset/90 transition-colors disabled:opacity-70 shadow-md hover:shadow-lg"
        >
          {isGenerating ? (
            <><Loader2 className="animate-spin" size={18} /> Generating...</>
          ) : (
            <><Sparkles size={18} /> Generate Bouquet</>
          )}
        </button>
      </div>
    </div>
  );
}
