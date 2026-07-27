import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { DASH } from "@/constants/testIds";
import { LogOut, CheckCircle2, Clock } from "lucide-react";
import { FadeUp } from "@/components/Reveal";
import { motion } from "framer-motion";

export default function ClientDashboard() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("ka_user");
    if (!localStorage.getItem("ka_token") || !raw) {
      nav("/login");
      return;
    }
    setUser(JSON.parse(raw));
    api
      .get("/client/projects")
      .then((r) => setProjects(r.data || []))
      .catch(() => nav("/login"))
      .finally(() => setLoading(false));
  }, [nav]);

  const logout = () => {
    localStorage.removeItem("ka_token");
    localStorage.removeItem("ka_user");
    nav("/");
  };

  return (
    <div data-testid={DASH.root} className="bg-ink min-h-screen pt-28 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16 border-b border-white/10 pb-10">
          <div>
            <div className="chapter-num mb-2 text-gold">Private · Client Portal</div>
            <h1 className="font-display text-white text-4xl md:text-6xl leading-tight font-light">
              Good day, <em className="italic text-gold">{user?.name?.split(" ")[0]}</em>.
            </h1>
            <p className="mt-3 text-white/60 max-w-lg">
              A quiet view of your commissions, updated weekly by the site director.
            </p>
          </div>
          <button
            onClick={logout}
            data-testid={DASH.logout}
            className="btn-ghost"
          >
            <LogOut className="w-4 h-4" /> <span>Sign out</span>
          </button>
        </div>

        {loading ? (
          <div className="text-white/50">Loading…</div>
        ) : (
          <div className="space-y-10">
            {projects.map((p, i) => (
              <FadeUp key={p.id} delay={i * 0.06}>
                <div data-testid={DASH.project} className="glass rounded-md p-6 md:p-10">
                  <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
                    <div>
                      <div className="chapter-num text-gold mb-2">{p.location}</div>
                      <div className="font-display text-white text-3xl md:text-4xl italic">
                        {p.name}
                      </div>
                      <div className="mt-2 text-white/60 text-sm">
                        Current stage · {p.stage}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-gold text-5xl tabular-nums">
                        {p.progress}%
                      </div>
                      <div className="chapter-num text-white/50 mt-1">Complete</div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gold"
                        initial={{ width: 0 }}
                        animate={{ width: `${p.progress}%` }}
                        transition={{ duration: 1.6, ease: [0.2, 0.9, 0.2, 1] }}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <div className="chapter-num text-white/50 mb-3">Next Milestone</div>
                      <div className="text-white flex items-start gap-3">
                        <Clock className="w-4 h-4 text-gold mt-1" />
                        <span>{p.next_milestone}</span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="chapter-num text-white/50 mb-3">Updates</div>
                      <ul className="space-y-3">
                        {p.updates.map((u, k) => (
                          <li key={k} className="flex items-start gap-3 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-white/50 text-xs tracking-wider">
                                {u.date}
                              </div>
                              <div className="text-white/85">{u.note}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
