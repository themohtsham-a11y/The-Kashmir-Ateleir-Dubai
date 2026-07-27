import { FadeUp } from "@/components/Reveal";
import { SERVICES } from "@/lib/data";
import { Plus } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="relative bg-ink py-32 md:py-44 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20">
        <div className="grid md:grid-cols-12 gap-10 mb-20">
          <div className="md:col-span-4">
            <div className="eyebrow mb-6">Chapter 02 · Services</div>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-white text-4xl md:text-6xl leading-[1.02] tracking-tight font-light">
              Fifty disciplines. <em className="italic text-gold">One</em> atelier.
            </h2>
            <p className="mt-8 max-w-xl text-white/60 leading-relaxed">
              A single, coordinated team spanning architecture, engineering, luxury
              construction and interiors — so no discipline is ever handed off to a
              stranger.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((g, gi) => (
            <FadeUp key={g.g} delay={gi * 0.06}>
              <div className="glass rounded-sm p-8 h-full group hover:border-gold/40 transition-colors duration-500">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="chapter-num mb-2">
                      {String(gi + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-display text-white text-3xl italic">
                      {g.g}
                    </h3>
                  </div>
                  <Plus className="w-4 h-4 text-gold opacity-60 group-hover:rotate-90 transition-transform duration-500" />
                </div>
                <div className="gold-hairline w-16 mb-6" />
                <ul className="space-y-2.5">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="text-white/75 text-[13px] flex items-center gap-3 tracking-wide hover:text-gold transition-colors cursor-default"
                    >
                      <span className="w-1 h-1 rounded-full bg-gold/60 flex-shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
