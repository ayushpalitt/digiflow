import Image from "next/image";
import Link from "next/link";
import { Sparkles, PenTool, Globe2, Send } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center">
      {/* Background Image */}
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="/images/landing_bg.png"
          alt="Peaceful meadow"
          fill
          className="object-cover"
          priority
        />
        {/* Soft overlay to ensure text readability while letting the image shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-df-cream/80"></div>
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-4xl px-6 pt-32 pb-20 text-center flex flex-col items-center min-h-[70vh] justify-center animate-float">
        <h1 className="font-heading text-6xl md:text-8xl text-df-navy tracking-wider mb-6 drop-shadow-md">
          DIGIFLOW
        </h1>
        <p className="font-body text-xl md:text-2xl text-df-navy mb-12 italic drop-shadow font-medium">
          &quot;Send flowers, words, and memories.&quot;
        </p>
        <Link
          href="/create"
          className="group relative px-8 py-4 bg-df-sunset text-white font-body text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Create a Bouquet <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full"></div>
        </Link>
      </section>


    </main>
  );
}
