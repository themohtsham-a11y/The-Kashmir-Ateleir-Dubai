import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { FadeUp, RevealWords } from "@/components/Reveal";
import { ArrowUpRight } from "lucide-react";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/blog")
      .then((r) => setPosts(r.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-ink pt-32 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20">
        <div className="mb-16 md:mb-24">
          <div className="eyebrow mb-6">The Journal</div>
          <h1 className="font-display text-white text-5xl md:text-7xl leading-[1.02] tracking-tight font-light">
            <RevealWords text="Field notes, from the atelier." />
          </h1>
          <p className="mt-6 max-w-2xl text-white/60 leading-relaxed">
            Short essays on marble, joinery, roofs made for snow, and the quiet
            arithmetic of a luxury project.
          </p>
        </div>

        {loading ? (
          <div className="text-white/50">Loading…</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((p, i) => (
              <FadeUp key={p.id} delay={i * 0.05}>
                <Link to={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-6">
                    <img
                      src={p.cover}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 chapter-num text-white bg-ink/60 backdrop-blur px-3 py-1 rounded-sm">
                      {p.read_time}
                    </div>
                  </div>
                  <div className="chapter-num text-white/50 mb-2">{p.author}</div>
                  <h2 className="font-display text-white text-2xl md:text-3xl leading-tight group-hover:text-gold transition-colors mb-3">
                    {p.title}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {p.excerpt}
                  </p>
                  <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-gold">
                    Read the essay <ArrowUpRight className="w-3 h-3" />
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
