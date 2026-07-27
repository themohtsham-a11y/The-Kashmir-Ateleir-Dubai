import { PROCESS } from "@/lib/data";
import { FadeUp } from "@/components/Reveal";
import { motion } from "framer-motion";

export default function ProcessTimeline() {
  return (
    <section id="process" className="relative bg-ink py-32 md:py-44 border-t border-white/5 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20">
        <div className="grid md:grid-cols-12 gap-10 mb-20">
          <div className="md:col-span-4">
            <div className="eyebrow mb-6">Chapter 05 · The Process</div>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-white text-4xl md:text-6xl leading-[1.02] tracking-tight font-light">
              From a quiet conversation, to <em className="italic text-gold">keys in linen</em>.
            </h2>
          </div>
        </div>

        <div className="relative">
          {/* horizontal gold line */}
          <motion.div
            className="hidden md:block absolute top-14 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.2, 0.9, 0.2, 1] }}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-y-14 gap-x-6 relative">
            {PROCESS.map((p, i) => (
              <FadeUp key={p.n} delay={i * 0.06}>
                <div className="flex flex-col">
                  <div className="relative flex items-center h-14 mb-4">
                    <span className="relative w-4 h-4 rounded-full bg-ink border border-gold flex items-center justify-center z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    </span>
                  </div>
                  <div className="font-display italic text-gold text-xl mb-2">
                    {p.n}
                  </div>
                  <h3 className="font-display text-white text-lg leading-snug mb-2">
                    {p.t}
                  </h3>
                  <p className="text-white/55 text-xs leading-relaxed">{p.d}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
