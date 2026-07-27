import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, X } from "lucide-react";
import { streamAIConsult } from "@/lib/api";
import { AI } from "@/constants/testIds";

const seedId = () =>
  (typeof crypto !== "undefined" && crypto.randomUUID?.()) ||
  `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [sessionId] = useState(seedId());
  const [msgs, setMsgs] = useState([
    {
      role: "assistant",
      content:
        "Welcome. I'm the AI Design Concierge for The Kashmir Atelier Dubai. Ask about villas, penthouses, Italian marble, Kashmiri walnut, budgets, layouts — anything.",
    },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 1e6, behavior: "smooth" });
  }, [msgs, busy]);

  const send = async () => {
    const q = input.trim();
    if (!q || busy) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", content: q }, { role: "assistant", content: "" }]);
    setBusy(true);
    try {
      await streamAIConsult({
        session_id: sessionId,
        message: q,
        onChunk: (chunk) =>
          setMsgs((m) => {
            const copy = [...m];
            copy[copy.length - 1] = {
              ...copy[copy.length - 1],
              content: copy[copy.length - 1].content + chunk,
            };
            return copy;
          }),
        onDone: () => setBusy(false),
      });
    } catch {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-testid={AI.open}
        aria-label="AI Design Assistant"
        className="fixed z-40 bottom-6 right-6 w-14 h-14 rounded-full bg-ink border border-gold text-gold flex items-center justify-center shadow-2xl hover:bg-gold hover:text-ink transition-colors"
      >
        <Sparkles className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-ink/70 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              data-testid={AI.panel}
              className="w-full md:max-w-2xl bg-ink border border-white/10 rounded-t-2xl md:rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10 glass-gold">
                <div>
                  <div className="chapter-num text-gold">AI Design Concierge</div>
                  <div className="font-display italic text-white text-lg">
                    Ask the atelier
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white hover:text-gold"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div
                ref={scrollRef}
                className="h-[62vh] md:h-[520px] overflow-y-auto p-5 space-y-4 no-scrollbar"
              >
                {msgs.map((m, i) => (
                  <div
                    key={i}
                    data-testid={AI.message}
                    className={`max-w-[85%] ${
                      m.role === "user" ? "ml-auto" : "mr-auto"
                    }`}
                  >
                    {m.role === "assistant" && (
                      <div className="chapter-num mb-2 text-gold/80">Atelier</div>
                    )}
                    <div
                      className={
                        m.role === "user"
                          ? "bg-gold text-ink rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed"
                          : "bg-white/[0.03] border border-white/10 text-white/90 rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap font-editorial text-[15px]"
                      }
                    >
                      {m.content || (busy && i === msgs.length - 1 ? (
                        <span className="text-white/40 italic">writing…</span>
                      ) : (
                        ""
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 p-4 flex items-center gap-3">
                <input
                  data-testid={AI.input}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="e.g. Should a Palm Jumeirah penthouse use Statuario or Calacatta?"
                  className="flex-1 bg-transparent border-b border-white/15 focus:border-gold outline-none text-white placeholder-white/30 text-sm py-2"
                  disabled={busy}
                />
                <button
                  onClick={send}
                  disabled={busy || !input.trim()}
                  data-testid={AI.send}
                  className="w-11 h-11 rounded-full bg-gold text-ink flex items-center justify-center disabled:opacity-40 hover:scale-105 transition"
                  aria-label="Send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
