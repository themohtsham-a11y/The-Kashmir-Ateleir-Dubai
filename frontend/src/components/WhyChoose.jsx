import { WHY_US } from "@/lib/data";
import { FadeUp } from "@/components/Reveal";

export default function WhyChoose() {
  return (
    <section id="why" className="relative bg-ink py-32 md:py-44 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20">
        <div className="grid md:grid-cols-12 gap-10 mb-20">
          <div className="md:col-span-4">
            <div className="eyebrow mb-6">Chapter 04 · Why the Atelier</div>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-white text-4xl md:text-6xl leading-[1.02] tracking-tight font-light">
              Ten reasons — <em className="italic text-gold">quietly</em>, one page.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          {WHY_US.map((w, i) => (
            <FadeUp key={w.t} delay={i * 0.04}>
              <div className="relative p-8 h-full border-t border-l border-white/10 hover:bg-white/[0.015] transition-colors">
                <div className="chapter-num mb-4">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-display text-white text-xl md:text-2xl leading-snug mb-4">
                  {w.t}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{w.d}</p>
                <div className="absolute top-0 left-0 w-4 h-px bg-gold" />
              </div>
            </FadeUp>
          ))}
          <div className="hidden lg:block border-t border-l border-r border-white/10" />
        </div>
      </div>
    </section>
  );
}
