import { useState } from "react";
import { TESTIMONIALS } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { FadeUp } from "@/components/Reveal";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const prev = () => setI((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setI((v) => (v + 1) % TESTIMONIALS.length);

  return (
    <section id="testimonials" className="relative bg-ink py-32 md:py-44 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-4">
            <div className="eyebrow mb-6">Chapter 06 · Testimonials</div>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-white text-4xl md:text-6xl leading-[1.02] tracking-tight font-light">
              What our <em className="italic text-gold">clients</em> quietly say.
            </h2>
          </div>
        </div>

        <FadeUp>
          <div className="relative glass-gold rounded-md p-8 md:p-16">
            <div className="font-display italic text-gold text-[10rem] leading-none absolute -top-6 left-8 opacity-30 select-none">
              &ldquo;
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
                className="relative"
              >
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: t.stars }).map((_, k) => (
                    <Star key={k} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="font-display text-white text-2xl md:text-4xl leading-[1.25] max-w-4xl italic font-light">
                  {t.q}
                </blockquote>
                <div className="mt-10 flex items-center gap-4">
                  <img
                    src={t.img}
                    alt={t.n}
                    className="w-12 h-12 rounded-full object-cover border border-gold/40"
                  />
                  <div>
                    <div className="font-display text-white text-lg">{t.n}</div>
                    <div className="text-[11px] tracking-[0.24em] uppercase text-white/50">
                      {t.r}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
              <span className="text-[11px] tracking-[0.28em] uppercase text-white/50">
                {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center hover:border-gold hover:text-gold text-white transition-all"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center hover:border-gold hover:text-gold text-white transition-all"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
