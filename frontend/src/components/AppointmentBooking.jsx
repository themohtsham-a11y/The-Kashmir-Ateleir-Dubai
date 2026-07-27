import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarClock, X, ArrowUpRight } from "lucide-react";
import { api } from "@/lib/api";
import { APPT } from "@/constants/testIds";
import { toast } from "sonner";

const SERVICES = [
  "Architecture Consultation",
  "Interior Design Consultation",
  "Site Visit — Kashmir",
  "Site Visit — Dubai",
  "Video Consultation",
];

const TIMES = ["10:00", "11:30", "13:00", "15:00", "16:30", "18:00"];

export default function AppointmentBooking() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    date: today,
    time: "11:30",
    service: SERVICES[0],
    notes: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    if (!f.name || !f.email || !f.phone) {
      toast.error("Name, email and phone are required.");
      return;
    }
    setBusy(true);
    try {
      await api.post("/appointment", f);
      setDone(true);
      toast.success("Appointment requested. A director will confirm shortly.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-testid={APPT.open}
        aria-label="Book Appointment"
        className="hidden md:inline-flex fixed z-40 bottom-40 right-6 w-14 h-14 rounded-full bg-ink border border-white/15 text-white hover:border-gold hover:text-gold transition-colors items-center justify-center"
      >
        <CalendarClock className="w-5 h-5" />
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
              className="w-full max-w-xl bg-ink border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10 glass-gold">
                <div>
                  <div className="chapter-num text-gold">Private Appointment</div>
                  <div className="font-display italic text-white text-lg">
                    Reserve a conversation.
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white hover:text-gold"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {done ? (
                <div data-testid={APPT.success} className="p-10 text-center">
                  <div className="chapter-num text-gold mb-3">Booked</div>
                  <div className="font-display italic text-white text-2xl mb-4">
                    Thank you.
                  </div>
                  <p className="text-white/70">
                    A director will confirm your appointment within a few hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="p-6 md:p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input testid={APPT.name} label="Name" value={f.name} onChange={(v) => setF({ ...f, name: v })} required />
                    <Input testid={APPT.email} label="Email" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} required />
                    <Input testid={APPT.phone} label="Phone" value={f.phone} onChange={(v) => setF({ ...f, phone: v })} required />
                    <label className="block">
                      <span className="chapter-num block mb-2">Service</span>
                      <select
                        data-testid={APPT.service}
                        value={f.service}
                        onChange={(e) => setF({ ...f, service: e.target.value })}
                        className="ka-input"
                      >
                        {SERVICES.map((s) => (
                          <option key={s} value={s} className="bg-ink">
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Input testid={APPT.date} label="Date" type="date" value={f.date} onChange={(v) => setF({ ...f, date: v })} />
                    <label className="block">
                      <span className="chapter-num block mb-2">Time</span>
                      <div data-testid={APPT.time} className="grid grid-cols-3 gap-2">
                        {TIMES.map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setF({ ...f, time: t })}
                            className={`py-2 rounded-sm border text-xs tracking-wide ${
                              f.time === t
                                ? "border-gold text-gold"
                                : "border-white/15 text-white/70 hover:border-white/30"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </label>
                    <label className="block md:col-span-2">
                      <span className="chapter-num block mb-2">Notes</span>
                      <textarea
                        data-testid={APPT.notes}
                        value={f.notes}
                        onChange={(e) => setF({ ...f, notes: e.target.value })}
                        className="ka-input min-h-[80px] resize-y"
                        placeholder="A word about your project…"
                      />
                    </label>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={busy}
                      data-testid={APPT.submit}
                      className="btn-gold"
                    >
                      <span>{busy ? "Booking…" : "Book Appointment"}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
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
        select.ka-input, input.ka-input { background: transparent; color-scheme: dark; }
      `}</style>
    </>
  );
}

function Input({ testid, label, type = "text", value, onChange, required }) {
  return (
    <label className="block">
      <span className="chapter-num block mb-2">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      <input
        data-testid={testid}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ka-input"
      />
    </label>
  );
}
