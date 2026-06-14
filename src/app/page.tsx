import Image from "next/image";
import Link from "next/link";
import { Sparkles, PenTool, Globe2, Send } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center">
      {/* Background Image */}
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="/images/ghibli_meadow_bg.png"
          alt="Peaceful meadow"
          fill
          className="object-cover opacity-80 mix-blend-multiply"
          priority
        />
        {/* Soft overlay to ensure text readability */}
        <div className="absolute inset-0 bg-df-cream/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-4xl px-6 pt-32 pb-20 text-center flex flex-col items-center min-h-[70vh] justify-center animate-float">
        <h1 className="font-heading text-6xl md:text-8xl text-df-navy tracking-wider mb-6">
          DIGIFLOW
        </h1>
        <p className="font-body text-xl md:text-2xl text-df-brown mb-12 italic">
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

      {/* How it Works Section */}
      <section className="w-full max-w-5xl px-6 py-24 bg-df-cream/80 backdrop-blur-md rounded-t-[3rem] border-t border-df-beige mt-auto">
        <h2 className="font-heading text-4xl text-center text-df-navy mb-16">How it Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Sparkles, title: "Build Your Bouquet", desc: "Select 5-10 hand-painted flowers." },
            { icon: PenTool, title: "Write Your Letter", desc: "Choose a style and pour your heart out." },
            { icon: Globe2, title: "Choose Your World", desc: "Set the scene for your recipient." },
            { icon: Send, title: "Share the Moment", desc: "Send a unique link to someone special." }
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-df-beige rounded-2xl flex items-center justify-center mb-6 text-df-brown group-hover:scale-110 group-hover:bg-df-dustypink group-hover:text-white transition-all duration-300 rotate-3 group-hover:rotate-6">
                <step.icon strokeWidth={1.5} size={32} />
              </div>
              <h3 className="font-heading text-2xl text-df-navy mb-2">{step.title}</h3>
              <p className="font-body text-df-brown text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
