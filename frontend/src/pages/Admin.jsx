import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { LogOut, Users, Calendar, Calculator, Mail } from "lucide-react";
import { FadeUp } from "@/components/Reveal";

const TABS = [
  { k: "leads", label: "Leads", icon: Users, endpoint: "/admin/leads" },
  { k: "appointments", label: "Appointments", icon: Calendar, endpoint: "/admin/appointments" },
  { k: "quotes", label: "Quotes", icon: Calculator, endpoint: "/admin/quotes" },
];

export default function Admin() {
  const nav = useNavigate();
  const [tab, setTab] = useState("leads");
  const [rows, setRows] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("ka_user");
    if (!raw) {
      nav("/login");
      return;
    }
    const u = JSON.parse(raw);
    if (!u.is_admin) {
      toast.error("Admin access required.");
      nav("/");
      return;
    }
    setUser(u);
    api.get("/admin/stats").then((r) => setStats(r.data)).catch(() => nav("/login"));
  }, [nav]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const t = TABS.find((x) => x.k === tab);
    api
      .get(t.endpoint)
      .then((r) => setRows(r.data || []))
      .catch(() => toast.error("Failed to load"))
      .finally(() => setLoading(false));
  }, [tab, user]);

  const logout = () => {
    localStorage.removeItem("ka_token");
    localStorage.removeItem("ka_user");
    nav("/");
  };

  const cols = {
    leads: ["created_at", "name", "email", "phone", "project_type", "budget", "location", "message"],
    appointments: ["created_at", "name", "email", "phone", "service", "date", "time", "status"],
    quotes: ["created_at", "project_type", "area_sqft", "quality_tier", "location", "estimate_min", "estimate_max"],
  }[tab];

  const fmt = (k, v) => {
    if (v == null || v === "") return "—";
    if (k === "created_at") return new Date(v).toLocaleString("en-GB");
    if (k === "estimate_min" || k === "estimate_max") {
      const n = Number(v);
      return n >= 1e7 ? `₹${(n / 1e7).toFixed(2)} Cr` : `₹${(n / 1e5).toFixed(1)} L`;
    }
    return String(v);
  };

  return (
    <div data-testid="admin-root" className="bg-ink min-h-screen pt-28 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 border-b border-white/10 pb-10">
          <div>
            <div className="chapter-num mb-2 text-gold">Admin · Private</div>
            <h1 className="font-display text-white text-4xl md:text-6xl leading-tight font-light">
              Studio <em className="italic text-gold">console</em>.
            </h1>
          </div>
          <button onClick={logout} data-testid="admin-logout" className="btn-ghost">
            <LogOut className="w-4 h-4" /> <span>Sign out</span>
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-14">
            {[
              { l: "Leads", v: stats.leads },
              { l: "Appointments", v: stats.appointments },
              { l: "Quotes", v: stats.quotes },
              { l: "Users", v: stats.users },
            ].map((s) => (
              <FadeUp key={s.l}>
                <div className="glass rounded-md p-6 border-l-2 border-l-gold/60">
                  <div className="chapter-num mb-2 text-gold/80">{s.l}</div>
                  <div className="font-display text-white text-4xl md:text-5xl tabular-nums">
                    {s.v}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.k;
            return (
              <button
                key={t.k}
                onClick={() => setTab(t.k)}
                data-testid={`admin-tab-${t.k}`}
                className={`px-5 py-3 -mb-px flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase transition-colors border-b-2 ${
                  active
                    ? "border-gold text-gold"
                    : "border-transparent text-white/60 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div data-testid="admin-table" className="glass rounded-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-white/50">Loading…</div>
          ) : rows.length === 0 ? (
            <div className="p-14 text-center">
              <Mail className="w-8 h-8 text-gold mx-auto mb-3 opacity-50" />
              <div className="text-white/60">No records yet.</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-white/10">
                    {cols.map((c) => (
                      <th
                        key={c}
                        className="px-5 py-4 text-[10px] tracking-[0.24em] uppercase text-gold/80 font-normal whitespace-nowrap"
                      >
                        {c.replace("_", " ")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr
                      key={r.id || i}
                      data-testid="admin-row"
                      className="border-b border-white/5 hover:bg-white/[0.02]"
                    >
                      {cols.map((c) => (
                        <td
                          key={c}
                          className="px-5 py-4 text-white/85 align-top max-w-[280px]"
                        >
                          <div className="line-clamp-3">{fmt(c, r[c])}</div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 text-[10px] tracking-[0.28em] uppercase text-white/40">
          {rows.length} record{rows.length === 1 ? "" : "s"}
        </div>
      </div>
    </div>
  );
}
