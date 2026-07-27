import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { FadeUp } from "@/components/Reveal";
import { Instagram, ArrowUpRight } from "lucide-react";

export default function InstagramReels() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("");

  useEffect(() => {
    api
      .get("/instagram/reels")
      .then((r) => {
        setItems(r.data.items || []);
        setSource(r.data.source || "");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative bg-ink py-32 md:py-40 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20">
        <div className="grid md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-4">
            <div className="eyebrow mb-6">Chapter 11 · Instagram</div>
          </div>
          <div className="md:col-span-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-white text-4xl md:text-6xl leading-[1.02] tracking-tight font-light">
              A view from <em className="italic text-gold">the atelier</em>.
            </h2>
            <a
              href="https://instagram.com/thekashmiratelier"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost self-start"
              data-testid="instagram-follow"
            >
              <Instagram className="w-4 h-4" /> <span>Follow @thekashmiratelier</span>
            </a>
          </div>
        </div>

        {loading ? (
          <div className="text-white/50 text-sm">Loading feed…</div>
        ) : (
          <div
            data-testid="instagram-grid"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
          >
            {items.slice(0, 6).map((it, i) => (
              <FadeUp key={it.id} delay={i * 0.04}>
                <a
                  href={it.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block aspect-square overflow-hidden rounded-sm bg-ink-700"
                >
                  <img
                    src={it.thumbnail_url || it.media_url}
                    alt={it.caption || "Instagram post"}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/60 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Instagram className="w-6 h-6 text-gold" />
                  </div>
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>
        )}
        {source === "curated" && (
          <div className="mt-6 text-[10px] tracking-[0.28em] uppercase text-white/30">
            Featured selection · Connect Instagram Graph API for live feed
          </div>
        )}
      </div>
    </section>
  );
}
