import { MARQUEE_WORDS } from "@/lib/data";

export default function Marquee({ id = "marquee" }) {
  const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <section id={id} className="relative bg-ink border-y border-white/5 overflow-hidden py-10">
      <div className="marquee-track flex items-center gap-14 whitespace-nowrap">
        {words.map((w, i) => (
          <span
            key={i}
            className="font-display text-[8vw] md:text-[6vw] leading-none text-white/8 italic tracking-tight"
            style={{ WebkitTextStroke: "1px rgba(212,175,55,0.55)", color: "transparent" }}
          >
            {w}
            <span className="text-gold mx-6 not-italic">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
