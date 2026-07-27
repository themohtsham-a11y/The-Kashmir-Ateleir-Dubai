import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { RevealLines } from "@/components/Reveal";
import { USER_ASSETS, IMG, BRAND } from "@/lib/data";
import { HERO } from "@/constants/testIds";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    // preload
    const imgs = [USER_ASSETS.dubaiPenthouse, USER_ASSETS.arabicMajlis, IMG.villa1];
    imgs.forEach((s) => {
      const i = new Image();
      i.src = s;
    });
  }, []);

  return (
    <section
      ref={ref}
      data-testid={HERO.root}
      className="relative min-h-[110vh] w-full overflow-hidden bg-ink"
    >
      {/* Background image with slow zoom + parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <div
          className="absolute inset-0 slow-zoom bg-cover bg-center"
          style={{ backgroundImage: `url(${USER_ASSETS.dubaiPenthouse})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/55 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/40" />
      </motion.div>

      <div className="grain absolute inset-0 pointer-events-none" />

      {/* Vertical side rails */}
      <div className="hidden md:flex absolute left-6 lg:left-12 top-0 bottom-0 items-center pointer-events-none z-10">
        <span className="vert-text">The Kashmir Atelier · Since 2009</span>
      </div>
      <div className="hidden md:flex absolute right-6 lg:right-12 top-0 bottom-0 items-center pointer-events-none z-10">
        <span className="vert-text">Srinagar · Dubai · India</span>
      </div>

      {/* Hero content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 min-h-[110vh] flex flex-col justify-end pb-24 px-6 md:px-16 lg:px-20 max-w-[1600px] mx-auto"
      >
        <div className="pt-40 md:pt-48 flex-1 flex flex-col justify-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="eyebrow mb-8"
          >
            Chapter 00 · A Manifesto
          </motion.div>

          {/* Kinetic headline */}
          <h1
            data-testid={HERO.headline}
            className="font-display text-white text-[15vw] md:text-[9.2vw] leading-[0.92] tracking-[-0.03em] font-light"
          >
            <RevealLines
              lines={["We don't build", <>houses. We <em className="italic font-normal text-gold">craft</em></>, "timeless masterpieces."]}
              delay={0.6}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-10 max-w-2xl text-white/75 text-sm md:text-base leading-relaxed tracking-[0.02em]"
          >
            Luxury Architecture · Premium Construction · Bespoke Interiors · Complete
            Turnkey Solutions — from a family atelier headquartered between Srinagar
            and Dubai.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.85, duration: 1 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollTo("#contact")}
              data-testid={HERO.bookConsult}
              className="btn-gold"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTo("#projects")}
              data-testid={HERO.viewPortfolio}
              className="btn-ghost"
            >
              <span>View Portfolio</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Bottom rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="flex flex-wrap items-end justify-between gap-6 pt-16 border-t border-white/10"
        >
          <div className="grid grid-cols-3 gap-8 md:gap-14 text-white">
            <div>
              <div className="font-display text-3xl md:text-4xl text-gold">250+</div>
              <div className="text-[10px] tracking-[0.28em] uppercase text-white/60 mt-1">
                Projects
              </div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl text-gold">15+</div>
              <div className="text-[10px] tracking-[0.28em] uppercase text-white/60 mt-1">
                Years
              </div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl text-gold">2</div>
              <div className="text-[10px] tracking-[0.28em] uppercase text-white/60 mt-1">
                Studios
              </div>
            </div>
          </div>

          <button
            data-testid={HERO.scrollHint}
            onClick={() => scrollTo("#marquee")}
            className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-white/60 hover:text-gold transition-colors"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
            Scroll · Chapter 01
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
