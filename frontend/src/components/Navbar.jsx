import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND } from "@/lib/data";
import { NAV } from "@/constants/testIds";
import { useI18n } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";

const links = [
  { label: "Home", href: "/", id: NAV.home },
  { label: "About", href: "/#about", id: NAV.about },
  { label: "Services", href: "/#services", id: NAV.services },
  { label: "Projects", href: "/#projects", id: NAV.projects },
  { label: "Portfolio", href: "/portfolio", id: NAV.portfolio },
  { label: "Process", href: "/#process", id: NAV.process },
  { label: "Testimonials", href: "/#testimonials", id: NAV.testimonials },
  { label: "Gallery", href: "/#gallery", id: NAV.gallery },
  { label: "Blog", href: "/blog", id: NAV.blog },
  { label: "Contact", href: "/#contact", id: NAV.contact },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("ka_user") || "null");
      setIsAdmin(!!u?.is_admin);
    } catch {
      setIsAdmin(false);
    }
  }, [loc.pathname]);

  const go = (href) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      if (loc.pathname !== "/") {
        nav("/");
        setTimeout(() => {
          const el = document.querySelector(href.replace("/", ""));
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 400);
      } else {
        const el = document.querySelector(href.replace("/", ""));
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      nav(href);
    }
  };

  return (
    <>
      <motion.header
        data-testid={NAV.root}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.9, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ink/85 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => go("/")}
            data-testid={NAV.logo}
            className="group flex items-center gap-3"
          >
            <span className="w-9 h-9 rounded-full border border-gold flex items-center justify-center">
              <span className="font-display text-gold text-lg italic leading-none">
                K
              </span>
            </span>
            <span className="hidden sm:flex flex-col leading-tight text-left">
              <span className="font-display text-white text-[15px] tracking-wide">
                The Kashmir Atelier
              </span>
              <span className="text-[9px] text-gold tracking-[0.35em] uppercase">
                Dubai · Srinagar
              </span>
            </span>
          </button>

          {/* Center links (desktop only, condensed) */}
          <nav className="hidden xl:flex items-center gap-8">
            {links.slice(1, 8).map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                data-testid={l.id}
                className="text-[11px] tracking-[0.28em] uppercase text-white/75 hover:text-gold transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <LanguageToggle />
            {isAdmin && (
              <Link
                to="/admin"
                data-testid="nav-admin"
                className="hidden md:inline text-[11px] tracking-[0.28em] uppercase text-gold hover:text-white transition-colors"
              >
                Admin
              </Link>
            )}
            <Link
              to="/login"
              data-testid={NAV.clientPortal}
              className="hidden md:inline text-[11px] tracking-[0.28em] uppercase text-white/70 hover:text-gold transition-colors"
            >
              {t("nav.client")}
            </Link>
            <button
              onClick={() => go("/#contact")}
              data-testid={NAV.bookCta}
              className="hidden md:inline-flex btn-gold"
            >
              <span>{t("nav.book")}</span>
            </button>
            <button
              onClick={() => setOpen(true)}
              data-testid={NAV.menuToggle}
              aria-label="Open menu"
              className="w-11 h-11 flex items-center justify-center border border-white/15 rounded-full hover:border-gold transition-colors"
            >
              <Menu className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[60] bg-ink"
          >
            <div className="grain absolute inset-0" />
            <div className="relative h-full flex flex-col">
              <div className="h-20 max-w-[1600px] w-full mx-auto px-6 md:px-12 flex items-center justify-between">
                <span className="text-[11px] tracking-[0.35em] uppercase text-gold">
                  Menu · Kashmir Atelier
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="w-11 h-11 flex items-center justify-center border border-white/15 rounded-full hover:border-gold transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="flex-1 max-w-[1600px] mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center w-full pb-16">
                <div>
                  <div className="gold-hairline w-24 mb-10" />
                  <ul className="space-y-4">
                    {links.map((l, i) => (
                      <motion.li
                        key={l.href}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15 + i * 0.045, ease: [0.2, 0.9, 0.2, 1] }}
                      >
                        <button
                          onClick={() => go(l.href)}
                          className="group flex items-baseline gap-6 text-left"
                        >
                          <span className="text-gold text-[11px] tracking-[0.28em]">
                            {String(i).padStart(2, "0")}
                          </span>
                          <span className="font-display text-4xl md:text-6xl text-white group-hover:text-gold group-hover:italic transition-all">
                            {l.label}
                          </span>
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-8">
                  <div>
                    <div className="chapter-num mb-3">Studio</div>
                    <div className="font-display text-2xl text-white leading-snug">
                      Sangar Mall, Nishat Brein
                      <br />
                      Link Road, Srinagar
                      <br />
                      Jammu &amp; Kashmir · 191121
                    </div>
                  </div>
                  <div className="gold-hairline w-24" />
                  <div className="space-y-2">
                    <div className="chapter-num">Contact</div>
                    <a
                      href={`tel:${BRAND.phoneRaw}`}
                      className="block text-white/90 hover:text-gold text-lg"
                    >
                      {BRAND.phone}
                    </a>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="block text-white/90 hover:text-gold text-lg"
                    >
                      {BRAND.email}
                    </a>
                  </div>
                  <div className="flex gap-3 pt-2">
                    {Object.entries(BRAND.social).map(([k, v]) => (
                      <a
                        key={k}
                        href={v}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] tracking-[0.28em] uppercase text-white/60 hover:text-gold border border-white/10 hover:border-gold rounded-full px-3 py-1 transition-all"
                      >
                        {k}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
