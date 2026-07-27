import { useState } from "react";
import { GALLERY } from "@/lib/data";
import { FadeUp } from "@/components/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

export default function Gallery() {
  const [open, setOpen] = useState(null);

  const cols = [[], [], []];
  GALLERY.forEach((img, i) => cols[i % 3].push({ img, i }));

  return (
    <section id="gallery" className="relative bg-ink py-32 md:py-44 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20">
        <div className="grid md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-4">
            <div className="eyebrow mb-6">Chapter 08 · Gallery</div>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-white text-4xl md:text-6xl leading-[1.02] tracking-tight font-light">
              A quiet <em className="italic text-gold">monograph</em>.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-4 md:gap-6">
              {col.map(({ img, i }, idx) => (
                <FadeUp key={i} delay={idx * 0.05}>
                  <button
                    onClick={() => setOpen(i)}
                    className="group relative w-full overflow-hidden rounded-sm bg-ink-700 block"
                  >
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      className={`w-full object-cover transition-transform duration-1000 group-hover:scale-105 ${
                        idx % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"
                      }`}
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/25 transition-colors" />
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="chapter-num text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </button>
                </FadeUp>
              ))}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] lightbox-backdrop flex items-center justify-center p-4 md:p-14"
            onClick={() => setOpen(null)}
          >
            <button
              className="absolute top-6 right-6 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-gold hover:border-gold"
              onClick={() => setOpen(null)}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-gold hover:border-gold"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((v) => (v - 1 + GALLERY.length) % GALLERY.length);
              }}
              aria-label="Previous"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-gold hover:border-gold"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((v) => (v + 1) % GALLERY.length);
              }}
              aria-label="Next"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <motion.img
              key={open}
              src={GALLERY[open]}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              alt=""
              className="max-h-[85vh] max-w-full object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
