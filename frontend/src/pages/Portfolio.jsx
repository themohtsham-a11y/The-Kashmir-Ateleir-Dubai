import { useState } from "react";
import { PORTFOLIO, PORTFOLIO_CATEGORIES } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, RevealWords } from "@/components/Reveal";

export default function Portfolio() {
  const [cat, setCat] = useState("All");
  const items = cat === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.cat === cat);

  return (
    <div className="bg-ink pt-32 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20">
        <div className="mb-16">
          <div className="eyebrow mb-6">The Portfolio</div>
          <h1 className="font-display text-white text-5xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight font-light">
            <RevealWords text="A private catalogue of the atelier's work." />
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-14 border-b border-white/10 pb-8">
          {PORTFOLIO_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-[11px] tracking-[0.24em] uppercase border transition-all ${
                cat === c
                  ? "bg-gold text-ink border-gold"
                  : "text-white/70 border-white/15 hover:border-gold hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => (
              <FadeUp key={p.id} delay={i * 0.03}>
                <motion.div
                  layout
                  className="group relative aspect-[3/4] rounded-sm overflow-hidden bg-ink-700"
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="chapter-num text-white/70 mb-1">{p.cat}</div>
                    <div className="font-display italic text-white text-lg">
                      {p.title}
                    </div>
                    <div className="text-[11px] text-white/50 tracking-wide">{p.loc}</div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
