import { FadeUp, RevealWords } from "@/components/Reveal";
import { USER_ASSETS, IMG } from "@/lib/data";
import { motion } from "framer-motion";

const CHAPTERS = [
  {
    n: "01",
    t: "A family of builders, since 2009.",
    d: "The Kashmir Atelier began in a walnut-lined studio in Srinagar. Fifteen years and two-hundred and fifty projects later, we remain, above all, craftsmen — architects, engineers, and interior designers who still stand on the scaffolding at 6 a.m. to check a hairline reveal.",
  },
  {
    n: "02",
    t: "European silhouettes. Kashmiri hands. Dubai standards.",
    d: "Our design philosophy borrows the ratios of Palladio, the restraint of Foster, and the material generosity of Armani Casa — and finishes them with Kashmiri walnut, aged brass, and hand-loomed textiles woven a hundred kilometres from your site.",
  },
  {
    n: "03",
    t: "Turnkey, or nothing at all.",
    d: "We do not hand you a shell. We hand you keys — architecture, structure, MEP, marble, joinery, lighting, textiles, and the first fresh flowers on the console. One director. One WhatsApp thread. One signed manifesto.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-ink py-32 md:py-44 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20">
        {/* Section head */}
        <div className="grid md:grid-cols-12 gap-10 mb-24">
          <div className="md:col-span-4">
            <div className="eyebrow mb-6">Chapter 01 · The Atelier</div>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-white text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight font-light">
              <RevealWords text="Crafting architectural excellence — quietly, and for a very small number of clients." />
            </h2>
          </div>
        </div>

        {/* Image + numbered chapters */}
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5 md:sticky md:top-28">
            <FadeUp>
              <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                <img
                  src={USER_ASSETS.arabicMajlis}
                  alt="Majlis with hand-carved ceiling"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <div className="chapter-num text-white/70">Majlis · Downtown</div>
                    <div className="font-display text-white text-lg italic">
                      A carved ceiling, a city view
                    </div>
                  </div>
                  <div className="text-gold text-xs tracking-[0.28em]">2024</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <img
                  src={IMG.marble}
                  alt="Italian marble detail"
                  className="w-full h-40 object-cover rounded-sm"
                />
                <img
                  src={IMG.interior3}
                  alt="Interior detail"
                  className="w-full h-40 object-cover rounded-sm"
                />
              </div>
            </FadeUp>
          </div>

          <div className="md:col-span-7 md:pl-10 space-y-14">
            {CHAPTERS.map((c, i) => (
              <FadeUp key={c.n} delay={i * 0.1}>
                <motion.div className="grid grid-cols-12 gap-6 border-t border-white/10 pt-10">
                  <div className="col-span-2">
                    <div className="font-display text-gold text-3xl md:text-4xl italic">
                      {c.n}
                    </div>
                  </div>
                  <div className="col-span-10">
                    <h3 className="font-display text-white text-2xl md:text-3xl leading-snug mb-4">
                      {c.t}
                    </h3>
                    <p className="text-white/70 text-base leading-relaxed max-w-2xl">
                      {c.d}
                    </p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}

            <FadeUp>
              <div className="border-t border-white/10 pt-10 flex flex-wrap items-center gap-8">
                <div>
                  <div className="chapter-num mb-2">Principal Architect</div>
                  <div className="font-display italic text-2xl text-white">
                    Zubair Wani, R.A.
                  </div>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div>
                  <div className="chapter-num mb-2">Studios</div>
                  <div className="font-display italic text-2xl text-white">
                    Srinagar · Dubai
                  </div>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div>
                  <div className="chapter-num mb-2">Founded</div>
                  <div className="font-display italic text-2xl text-white">2009</div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
