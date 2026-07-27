import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get(`/blog/${slug}`)
      .then((r) => setPost(r.data))
      .catch(() => setError(true));
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen bg-ink flex flex-col items-center justify-center text-center px-6">
        <div className="font-display text-white text-4xl mb-4">Essay not found.</div>
        <Link to="/blog" className="btn-ghost">
          <span>Back to Journal</span>
        </Link>
      </div>
    );
  }
  if (!post) return <div className="min-h-screen bg-ink pt-40 text-center text-white/50">Loading…</div>;

  return (
    <article className="bg-ink pt-32 pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-white/60 hover:text-gold mb-10">
          <ArrowLeft className="w-3 h-3" /> Back to Journal
        </Link>
        <div className="chapter-num mb-4 text-gold">{post.author} · {post.read_time}</div>
        <h1 className="font-display text-white text-4xl md:text-6xl leading-[1.05] tracking-tight font-light mb-10">
          {post.title}
        </h1>
        <div className="aspect-[16/10] overflow-hidden rounded-sm mb-12">
          <img src={post.cover} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="font-editorial text-white/85 text-xl md:text-2xl leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </article>
  );
}
