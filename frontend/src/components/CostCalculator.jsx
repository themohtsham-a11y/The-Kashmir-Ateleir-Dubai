import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, X, ArrowUpRight, Download, Mail } from "lucide-react";
import { api } from "@/lib/api";
import { CALC } from "@/constants/testIds";
import { FadeUp } from "@/components/Reveal";
import { generateQuotePDF } from "@/lib/pdf";
import { toast } from "sonner";

const TIERS = [
  { v: "premium", label: "Premium", note: "Considered specification, curated finishes." },
  { v: "luxury", label: "Luxury", note: "Italian marble, brand-name joinery." },
  { v: "ultra_luxury", label: "Ultra-Luxury", note: "Bespoke, one-of-one, atelier-grade." },
];

const PROJECT_TYPES = ["Villa", "Apartment", "Penthouse", "Commercial", "Restaurant", "Office"];

export default function CostCalculator() {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({
    project_type: "Villa",
    area_sqft: 3000,
    quality_tier: "luxury",
    location: "Srinagar",
    name: "",
    email: "",
    phone: "",
  });
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [emailFormOpen, setEmailFormOpen] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [emailBusy, setEmailBusy] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = async () => {
    if (!emailTo || !result?.id) {
      toast.error("Enter a valid email.");
      return;
    }
    setEmailBusy(true);
    try {
      await api.post(`/quote/${result.id}/email`, { quote_id: result.id, email: emailTo });
      setEmailSent(true);
      toast.success("Your PDF estimate is queued.");
    } catch (err) {
      toast.error("Failed to queue. Please try again.");
    } finally {
      setEmailBusy(false);
    }
  };

  const inr = (n) =>
    n >= 1e7
      ? `₹${(n / 1e7).toFixed(2)} Cr`
      : n >= 1e5
      ? `₹${(n / 1e5).toFixed(1)} L`
      : `₹${n.toLocaleString("en-IN")}`;

  const submit = async () => {
    setBusy(true);
    try {
      const payload = {
        project_type: f.project_type,
        area_sqft: Number(f.area_sqft),
        quality_tier: f.quality_tier,
        location: f.location,
      };
      if (f.name) payload.name = f.name;
      if (f.email) payload.email = f.email;
      if (f.phone) payload.phone = f.phone;
      const { data } = await api.post("/quote", payload);
      setResult(data);
    } catch (err) {
      // toast handled at UI level via error state
      // eslint-disable-next-line no-console
      console.error("quote error", err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-testid={CALC.open}
        className="hidden md:inline-flex fixed z-40 bottom-24 right-6 flex-col items-center justify-center w-14 h-14 rounded-full bg-ink border border-white/15 text-white hover:border-gold hover:text-gold transition-colors"
        aria-label="Cost Calculator"
      >
        <Calculator className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-ink/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-ink border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10 glass-gold">
                <div>
                  <div className="chapter-num text-gold">Cost Estimator</div>
                  <div className="font-display italic text-white text-lg">
                    A ballpark, quietly.
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white hover:text-gold"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="chapter-num block mb-2">Project Type</span>
                    <select
                      data-testid={CALC.projectType}
                      value={f.project_type}
                      onChange={(e) => setF({ ...f, project_type: e.target.value })}
                      className="ka-input"
                    >
                      {PROJECT_TYPES.map((p) => (
                        <option key={p} value={p} className="bg-ink">
                          {p}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="chapter-num block mb-2">Area (sqft)</span>
                    <input
                      data-testid={CALC.area}
                      type="number"
                      value={f.area_sqft}
                      onChange={(e) => setF({ ...f, area_sqft: e.target.value })}
                      className="ka-input"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="chapter-num block mb-2">Quality Tier</span>
                    <div data-testid={CALC.tier} className="grid grid-cols-3 gap-3">
                      {TIERS.map((t) => (
                        <button
                          type="button"
                          key={t.v}
                          onClick={() => setF({ ...f, quality_tier: t.v })}
                          className={`p-4 rounded-sm border text-left transition-all ${
                            f.quality_tier === t.v
                              ? "border-gold bg-gold/5"
                              : "border-white/15 hover:border-white/30"
                          }`}
                        >
                          <div
                            className={`font-display italic ${
                              f.quality_tier === t.v ? "text-gold" : "text-white"
                            }`}
                          >
                            {t.label}
                          </div>
                          <div className="text-[11px] text-white/50 mt-1">{t.note}</div>
                        </button>
                      ))}
                    </div>
                  </label>
                  <label className="block md:col-span-2">
                    <span className="chapter-num block mb-2">Location</span>
                    <input
                      data-testid={CALC.location}
                      value={f.location}
                      onChange={(e) => setF({ ...f, location: e.target.value })}
                      className="ka-input"
                      placeholder="City, Country"
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <p className="text-[11px] tracking-[0.24em] uppercase text-white/50">
                    Indicative only. A detailed BOQ follows any commission.
                  </p>
                  <button
                    onClick={submit}
                    disabled={busy}
                    data-testid={CALC.submit}
                    className="btn-gold"
                  >
                    <span>{busy ? "Estimating…" : "Estimate"}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {result && (
                  <FadeUp>
                    <div
                      data-testid={CALC.result}
                      className="mt-2 glass-gold rounded-md p-6"
                    >
                      <div className="chapter-num mb-2 text-gold">Estimated Range</div>
                      <div className="font-display italic text-white text-3xl md:text-5xl leading-tight">
                        {inr(result.estimate_min)}
                        <span className="text-white/60"> — </span>
                        {inr(result.estimate_max)}
                      </div>
                      <p className="mt-3 text-white/60 text-sm">
                        For a {result.area_sqft.toLocaleString("en-IN")} sqft{" "}
                        {result.project_type.toLowerCase()} at {result.quality_tier.replace("_", "-")} tier in {result.location}.
                      </p>

                      <div className="mt-5 pt-5 border-t border-gold/20 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            generateQuotePDF(result);
                            toast.success("PDF downloaded.");
                          }}
                          data-testid="calc-download-pdf"
                          className="btn-gold"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download PDF</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setEmailFormOpen(true)}
                          data-testid="calc-email-open"
                          className="btn-ghost"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Email me a copy</span>
                        </button>
                      </div>

                      {emailFormOpen && (
                        <div className="mt-5 pt-5 border-t border-white/10">
                          <div className="chapter-num mb-3">Delivery</div>
                          <div className="flex flex-wrap gap-3 items-end">
                            <label className="flex-1 min-w-[220px] block">
                              <input
                                type="email"
                                value={emailTo}
                                onChange={(e) => setEmailTo(e.target.value)}
                                placeholder="your@email.com"
                                data-testid="calc-email-to"
                                className="ka-input"
                              />
                            </label>
                            <button
                              type="button"
                              onClick={sendEmail}
                              disabled={emailBusy}
                              data-testid="calc-email-send"
                              className="btn-gold"
                            >
                              <span>{emailBusy ? "Sending…" : "Send"}</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                          {emailSent && (
                            <div
                              data-testid="calc-email-success"
                              className="mt-3 text-gold text-xs tracking-wide"
                            >
                              Queued. A director will send your PDF shortly.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </FadeUp>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        .ka-input:focus { border-bottom-color: #D4AF37; }
        select.ka-input { background: transparent; color-scheme: dark; }
      `}</style>
    </>
  );
}
