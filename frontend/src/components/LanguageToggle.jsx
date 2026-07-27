import { useI18n } from "@/lib/i18n";

export default function LanguageToggle({ variant = "default" }) {
  const { lang, setLang } = useI18n();
  const next = lang === "en" ? "ar" : "en";
  return (
    <button
      onClick={() => setLang(next)}
      data-testid="lang-toggle"
      aria-label={`Switch to ${next === "en" ? "English" : "Arabic"}`}
      className={
        variant === "menu"
          ? "text-[11px] tracking-[0.28em] uppercase text-white/70 hover:text-gold transition-colors"
          : "text-[10px] tracking-[0.28em] uppercase text-white/70 hover:text-gold border border-white/15 hover:border-gold rounded-full px-3 py-1.5 transition-all"
      }
    >
      <span className={lang === "en" ? "text-gold" : ""}>EN</span>
      <span className="mx-1 text-white/30">/</span>
      <span className={lang === "ar" ? "text-gold" : ""}>عربي</span>
    </button>
  );
}
