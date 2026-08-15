import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { RevealLines } from "@/components/Reveal";
import { USER_ASSETS, IMG, BRAND } from "@/lib/data";
import { HERO } from "@/constants/testIds";
import { useI18n } from "@/lib/i18n";

const HERO_FRAMES = [
  USER_ASSETS.dubaiPenthouse,
  USER_ASSETS.arabicMajlis,
  USER_ASSETS.villaElevations,
  USER_ASSETS.kashmirMountainHouse,
  IMG.marble,
  IMG.chandelier,
];

export default function Hero() {
  const { t } = useI18n();
  const [frame, setFrame] = useState(0);
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
    HERO_FRAMES.forEach((src) => {
      const i = new Image();
      i.src = src;
    });
    const iv = setInterval(() => {
      setFrame((f) => (f + 1) % HERO_FRAMES.length);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section
      ref={ref}
      data-testid={HERO.root}
      className="relative min-h-[110vh] w-full overflow-hidden bg-ink"
    >
      {/* Cinematic Ken-Burns slideshow — user's real work + curated imagery */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={frame}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1.14 }}
            exit={{ opacity: 0, scale: 1.18 }}
            transition={{
              opacity: { duration: 1.4, ease: [0.2, 0.9, 0.2, 1] },
              scale: { duration: 8, ease: "linear" },
            }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_FRAMES[frame]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/55 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/40" />
      </motion.div>

      {/* Frame index — bottom-left overlay, quiet reference to editorial cinema */}
      <div className="absolute bottom-24 md:bottom-32 left-6 md:left-16 lg:left-20 z-30 flex items-center gap-3 text-white/50">
        <span className="chapter-num tabular-nums text-gold">
          {String(frame + 1).padStart(2, "0")}
        </span>
        <span className="w-16 h-px bg-white/20 relative">
          <span
            className="absolute top-0 left-0 h-full bg-gold origin-left transition-all duration-[5000ms] ease-linear"
            style={{ width: "100%", animation: "none" }}
            key={frame}
          />
        </span>
        <span className="chapter-num tabular-nums">
          {String(HERO_FRAMES.length).padStart(2, "0")}
        </span>
      </div>

      <div className="grain absolute inset-0 pointer-events-none" />

      {/* Vertical side rails */}
      <div className="hidden md:flex absolute left-6 lg:left-12 top-0 bottom-0 items-center pointer-events-none z-10">
        <span className="vert-text">The Kashmir Atelier · Since 2023</span>
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
            {t("hero.chapter")}
          </motion.div>

          {/* Kinetic headline */}
          <h1
            data-testid={HERO.headline}
            className="font-display text-white text-[15vw] md:text-[9.2vw] leading-[0.92] tracking-[-0.03em] font-light"
          >
            <RevealLines
              lines={[
                t("hero.headline1"),
                <>
                  {t("hero.headline2")}{" "}
                  <em className="italic font-normal text-gold">{t("hero.headline3")}</em>
                </>,
                t("hero.headline4"),
              ]}
              delay={0.6}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-10 max-w-2xl text-white/75 text-sm md:text-base leading-relaxed tracking-[0.02em]"
          >
            {t("hero.sub")}
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
              <span>{t("hero.cta.book")}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTo("#projects")}
              data-testid={HERO.viewPortfolio}
              className="btn-ghost"
            >
              <span>{t("hero.cta.portfolio")}</span>
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
                {t("hero.stats.projects")}
              </div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl text-gold">4+</div>
              <div className="text-[10px] tracking-[0.28em] uppercase text-white/60 mt-1">
                {t("hero.stats.years")}
              </div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl text-gold">2</div>
              <div className="text-[10px] tracking-[0.28em] uppercase text-white/60 mt-1">
                {t("hero.stats.studios")}
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
