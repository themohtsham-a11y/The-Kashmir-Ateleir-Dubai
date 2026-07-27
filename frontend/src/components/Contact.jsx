import { useState } from "react";
import { FadeUp } from "@/components/Reveal";
import { BRAND } from "@/lib/data";
import { api } from "@/lib/api";
import { CONTACT } from "@/constants/testIds";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

const PROJECT_TYPES = [
  "Architecture",
  "Interior Design",
  "Turnkey Villa",
  "Renovation",
  "Commercial",
  "Hospitality",
  "Consultation",
];

const BUDGETS = ["Under ₹50 L", "₹50 L – 1 Cr", "₹1 Cr – 3 Cr", "₹3 Cr – 10 Cr", "₹10 Cr +"];

export default function Contact() {
  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    project_type: "",
    budget: "",
    location: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!f.name || !f.email || !f.message) {
      toast.error("Name, email and message are required.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/contact", f);
      setSent(true);
      toast.success("Your enquiry is with our director. We'll reply within 24 hours.");
      setF({ name: "", email: "", phone: "", project_type: "", budget: "", location: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-ink py-32 md:py-44 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-4">
            <div className="eyebrow mb-6">Chapter 10 · Begin</div>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-white text-4xl md:text-6xl leading-[1.02] tracking-tight font-light">
              A quiet conversation, <em className="italic text-gold">to begin</em>.
            </h2>
            <p className="mt-6 max-w-xl text-white/60 leading-relaxed">
              Every commission begins the same way — a brief note, an unhurried call,
              a private site visit. Tell us a little; we&apos;ll do the rest.
            </p>
          </div>
        </div>

        <FadeUp>
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Left: form */}
            <form
              onSubmit={submit}
              data-testid={CONTACT.root}
              className="md:col-span-8 glass rounded-md p-6 md:p-12"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="Name" required>
                  <input
                    data-testid={CONTACT.name}
                    value={f.name}
                    onChange={(e) => setF({ ...f, name: e.target.value })}
                    className="ka-input"
                    placeholder="Your full name"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    data-testid={CONTACT.email}
                    type="email"
                    value={f.email}
                    onChange={(e) => setF({ ...f, email: e.target.value })}
                    className="ka-input"
                    placeholder="you@studio.com"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    data-testid={CONTACT.phone}
                    value={f.phone}
                    onChange={(e) => setF({ ...f, phone: e.target.value })}
                    className="ka-input"
                    placeholder="+91 · Country code"
                  />
                </Field>
                <Field label="Location">
                  <input
                    data-testid={CONTACT.location}
                    value={f.location}
                    onChange={(e) => setF({ ...f, location: e.target.value })}
                    className="ka-input"
                    placeholder="City, Country"
                  />
                </Field>
                <Field label="Project Type">
                  <select
                    data-testid={CONTACT.projectType}
                    value={f.project_type}
                    onChange={(e) => setF({ ...f, project_type: e.target.value })}
                    className="ka-input"
                  >
                    <option value="">Select…</option>
                    {PROJECT_TYPES.map((p) => (
                      <option key={p} value={p} className="bg-ink text-white">
                        {p}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Budget">
                  <select
                    data-testid={CONTACT.budget}
                    value={f.budget}
                    onChange={(e) => setF({ ...f, budget: e.target.value })}
                    className="ka-input"
                  >
                    <option value="">Select…</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b} className="bg-ink text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </Field>
                <div className="md:col-span-2">
                  <Field label="Tell us about your project" required>
                    <textarea
                      data-testid={CONTACT.message}
                      value={f.message}
                      onChange={(e) => setF({ ...f, message: e.target.value })}
                      className="ka-input min-h-[130px] resize-y"
                      placeholder="A paragraph or two. Site, brief, timeline…"
                    />
                  </Field>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
                <p className="text-[11px] tracking-[0.24em] uppercase text-white/50">
                  We reply personally, within 24 hours.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  data-testid={CONTACT.submit}
                  className="btn-gold disabled:opacity-60"
                >
                  <span>{loading ? "Sending…" : "Schedule Consultation"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              {sent && (
                <div
                  data-testid={CONTACT.success}
                  className="mt-6 text-gold text-sm border border-gold/30 rounded-sm px-4 py-3"
                >
                  Thank you. Your enquiry has reached our director.
                </div>
              )}
            </form>

            {/* Right: studio card */}
            <aside className="md:col-span-4 space-y-6">
              <div className="glass-gold rounded-md p-8">
                <div className="chapter-num mb-3">Studio · Srinagar</div>
                <div className="font-display italic text-white text-2xl leading-snug mb-6">
                  Sangar Mall,
                  <br />
                  Nishat Brein Link Road,
                  <br />
                  Srinagar, J&amp;K · 191121
                </div>
                <div className="space-y-4 text-sm">
                  <a
                    href={`tel:${BRAND.phoneRaw}`}
                    className="flex items-center gap-3 text-white/85 hover:text-gold transition-colors"
                  >
                    <Phone className="w-4 h-4 text-gold" />
                    {BRAND.phone}
                  </a>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="flex items-center gap-3 text-white/85 hover:text-gold transition-colors break-all"
                  >
                    <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                    {BRAND.email}
                  </a>
                  <a
                    href="https://maps.google.com/?q=Sangar+Mall+Nishat+Srinagar"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-white/85 hover:text-gold transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-gold" />
                    Get Directions
                  </a>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="chapter-num mb-1">Hours</div>
                  <div className="text-white/70 text-sm">Mon – Sat · 10:00 – 20:00</div>
                  <div className="text-white/50 text-xs mt-1">
                    Sundays by private appointment
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="rounded-md overflow-hidden border border-white/10">
                <iframe
                  title="Kashmir Atelier Location"
                  src="https://www.google.com/maps?q=Sangar+Mall+Nishat+Srinagar&output=embed"
                  width="100%"
                  height="260"
                  style={{ border: 0, filter: "grayscale(0.7) invert(0.92) hue-rotate(180deg)" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </aside>
          </div>
        </FadeUp>
      </div>

      <style>{`
        .ka-input {
          width: 100%;
          background: rgba(255,255,255,0.02);
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.14);
          padding: 12px 2px 10px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #fff;
          outline: none;
          transition: border-color .5s ease;
        }
        .ka-input::placeholder { color: rgba(255,255,255,.32); }
        .ka-input:focus { border-bottom-color: #D4AF37; }
        select.ka-input { background: transparent; color-scheme: dark; }
      `}</style>
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="chapter-num block mb-2">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      {children}
    </label>
  );
}
