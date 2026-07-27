import { FEATURED_PROJECTS } from "@/lib/data";
import { FadeUp } from "@/components/Reveal";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="relative bg-ink py-32 md:py-44 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20">
        <div className="grid md:grid-cols-12 gap-10 mb-20">
          <div className="md:col-span-4">
            <div className="eyebrow mb-6">Chapter 03 · Featured Work</div>
          </div>
          <div className="md:col-span-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-white text-4xl md:text-6xl leading-[1.02] tracking-tight font-light">
              Six houses <em className="italic text-gold">already living</em>.
            </h2>
            <a href="/portfolio" className="btn-ghost self-start">
              <span>All Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Editorial masonry — 2/3 + 1/3 alternating rows */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-8">
          {FEATURED_PROJECTS.map((p, i) => {
            const isBig = i % 3 === 0;
            const span = isBig ? "md:col-span-7" : "md:col-span-5";
            const aspect = isBig ? "aspect-[16/10]" : "aspect-[4/5]";
            return (
              <FadeUp key={p.id} delay={i * 0.05} className={span}>
                <motion.a
                  href={`#projects`}
                  className="group relative block overflow-hidden rounded-sm bg-ink-700"
                  whileHover="hover"
                >
                  <div className={`relative w-full ${aspect} overflow-hidden`}>
                    <motion.img
                      src={p.cover}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      variants={{ hover: { scale: 1.06 } }}
                      transition={{ duration: 1.6, ease: [0.2, 0.9, 0.2, 1] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                    <div className="absolute inset-0 border border-white/5" />
                    <motion.div
                      className="absolute inset-0 border border-gold/0 pointer-events-none"
                      variants={{ hover: { borderColor: "rgba(212,175,55,0.4)" } }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>

                  {/* Side label */}
                  <div className="absolute top-6 left-6 flex flex-col gap-1">
                    <span className="chapter-num text-white/70">
                      {String(i + 1).padStart(2, "0")} / {String(FEATURED_PROJECTS.length).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] tracking-[0.28em] uppercase text-white/50">
                      {p.category}
                    </span>
                  </div>

                  {/* Footer meta */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-end justify-between gap-6">
                      <div>
                        <h3 className="font-display text-white text-2xl md:text-3xl italic mb-2">
                          {p.title}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/60 tracking-wide">
                          <span>{p.location}</span>
                          <span>·</span>
                          <span>{p.area}</span>
                          <span>·</span>
                          <span className="text-gold">{p.status}</span>
                        </div>
                        {isBig && (
                          <p className="mt-3 text-white/70 text-sm max-w-md italic">
                            {p.caption}
                          </p>
                        )}
                      </div>
                      <motion.div
                        className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center flex-shrink-0"
                        variants={{
                          hover: {
                            backgroundColor: "#D4AF37",
                            borderColor: "#D4AF37",
                            rotate: 45,
                          },
                        }}
                      >
                        <ArrowUpRight className="w-4 h-4 text-white group-hover:text-ink transition-colors" />
                      </motion.div>
                    </div>
                  </div>
                </motion.a>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
