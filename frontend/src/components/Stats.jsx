import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/data";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

function Counter({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const mv = { v: 0 };
    const controls = animate(0, to, {
      duration: 2.2,
      ease: [0.2, 0.9, 0.2, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative bg-ink py-24 md:py-32 border-t border-white/5 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center md:text-left border-l border-gold/30 pl-6">
              <div className="font-display text-white text-5xl md:text-7xl leading-none font-light">
                <Counter to={s.n} suffix={s.suf} />
              </div>
              <div className="mt-4 text-[11px] tracking-[0.28em] uppercase text-white/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
