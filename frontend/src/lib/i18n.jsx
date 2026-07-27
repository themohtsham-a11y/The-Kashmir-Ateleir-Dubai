import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STRINGS = {
  en: {
    dir: "ltr",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.portfolio": "Portfolio",
    "nav.process": "Process",
    "nav.testimonials": "Testimonials",
    "nav.gallery": "Gallery",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.book": "Book Consultation",
    "nav.client": "Client Portal",
    "hero.chapter": "Chapter 00 · A Manifesto",
    "hero.headline1": "We don't build",
    "hero.headline2": "houses. We",
    "hero.headline3": "craft",
    "hero.headline4": "timeless masterpieces.",
    "hero.sub": "Luxury Architecture · Premium Construction · Bespoke Interiors · Complete Turnkey Solutions — from a family atelier headquartered between Srinagar and Dubai.",
    "hero.cta.book": "Book Consultation",
    "hero.cta.portfolio": "View Portfolio",
    "hero.stats.projects": "Projects",
    "hero.stats.years": "Years",
    "hero.stats.studios": "Studios",
  },
  ar: {
    dir: "rtl",
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.services": "خدماتنا",
    "nav.projects": "المشاريع",
    "nav.portfolio": "الأعمال",
    "nav.process": "المنهجية",
    "nav.testimonials": "آراء العملاء",
    "nav.gallery": "المعرض",
    "nav.blog": "المدونة",
    "nav.contact": "تواصل",
    "nav.book": "احجز استشارة",
    "nav.client": "بوابة العميل",
    "hero.chapter": "الفصل ٠٠ · بيان",
    "hero.headline1": "نحن لا نبني",
    "hero.headline2": "منازل. نحن",
    "hero.headline3": "نصنع",
    "hero.headline4": "روائع خالدة.",
    "hero.sub": "عمارة فاخرة · بناء متميّز · تصميم داخلي مخصّص · حلول متكاملة تسليم مفتاح — من أستوديو عائلي بين سرينغار ودبي.",
    "hero.cta.book": "احجز استشارة",
    "hero.cta.portfolio": "استعرض الأعمال",
    "hero.stats.projects": "مشروعاً",
    "hero.stats.years": "سنة",
    "hero.stats.studios": "أستوديو",
  },
};

const I18nContext = createContext({ lang: "en", t: (k) => k, setLang: () => {} });

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("ka_lang") : null;
    return saved && STRINGS[saved] ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("ka_lang", lang);
    const dir = STRINGS[lang].dir;
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
    document.body.classList.toggle("rtl", dir === "rtl");
  }, [lang]);

  const value = useMemo(() => {
    const t = (k) => STRINGS[lang][k] ?? STRINGS.en[k] ?? k;
    return { lang, setLang, t, dir: STRINGS[lang].dir };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
