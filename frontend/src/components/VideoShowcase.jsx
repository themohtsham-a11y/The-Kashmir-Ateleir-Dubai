import { USER_ASSETS, IMG } from "@/lib/data";
import { FadeUp } from "@/components/Reveal";
import { Play } from "lucide-react";

export default function VideoShowcase() {
  return (
    <section className="relative bg-ink py-32 md:py-40 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20">
        <div className="grid md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-4">
            <div className="eyebrow mb-6">Chapter 09 · Motion</div>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-white text-4xl md:text-6xl leading-[1.02] tracking-tight font-light">
              Drone footage. <em className="italic text-gold">Interior tours</em>.
            </h2>
          </div>
        </div>
        <FadeUp>
          <div className="relative aspect-video rounded-sm overflow-hidden group">
            <img
              src={IMG.drone}
              alt="Villa aerial"
              className="absolute inset-0 w-full h-full object-cover slow-zoom"
            />
            <div className="absolute inset-0 bg-ink/50 group-hover:bg-ink/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="group/btn w-24 h-24 md:w-28 md:h-28 rounded-full glass-gold flex items-center justify-center transition-transform duration-700 hover:scale-110">
                <Play className="w-8 h-8 text-gold ml-1 fill-gold" />
              </button>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="chapter-num text-white mb-2">Villa Nishat · Aerial Study</div>
                <div className="font-display italic text-white text-2xl md:text-3xl">
                  "The valley, in twelve minutes."
                </div>
              </div>
              <div className="text-[10px] tracking-[0.28em] uppercase text-white/70">
                12:41 · 4K
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
