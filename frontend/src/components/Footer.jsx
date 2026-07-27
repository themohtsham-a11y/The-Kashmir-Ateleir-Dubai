import { Link } from "react-router-dom";
import { BRAND } from "@/lib/data";
import { Instagram, Facebook, Linkedin, Youtube, MessageCircle, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-ink pt-24 pb-10 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20">
        {/* Oversized brand mark */}
        <div className="mb-16">
          <div className="font-display italic text-white text-[16vw] md:text-[10vw] leading-[0.9] tracking-tight">
            Kashmir <span className="text-gold">Atelier</span>
          </div>
          <div className="mt-2 text-[11px] tracking-[0.35em] uppercase text-white/50">
            Srinagar · Dubai · Since 2009
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 border-t border-white/10 pt-12">
          <div className="md:col-span-4">
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              An architectural, construction and interior atelier headquartered in
              Kashmir with commissions across Dubai and the Gulf. Quiet, private,
              turnkey.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Social href={BRAND.social.instagram}><Instagram className="w-4 h-4" /></Social>
              <Social href={BRAND.social.facebook}><Facebook className="w-4 h-4" /></Social>
              <Social href={BRAND.social.linkedin}><Linkedin className="w-4 h-4" /></Social>
              <Social href={BRAND.social.youtube}><Youtube className="w-4 h-4" /></Social>
              <Social href={`https://wa.me/${BRAND.whatsapp}`}><MessageCircle className="w-4 h-4" /></Social>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="chapter-num mb-4">Explore</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#about" className="hover:text-gold transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Services</a></li>
              <li><Link to="/portfolio" className="hover:text-gold transition-colors">Portfolio</Link></li>
              <li><a href="#process" className="hover:text-gold transition-colors">Process</a></li>
              <li><Link to="/blog" className="hover:text-gold transition-colors">Journal</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="chapter-num mb-4">Studio</div>
            <div className="text-white/70 text-sm leading-relaxed">
              Sangar Mall, Nishat Brein Link Road,
              <br />
              Srinagar, J&amp;K · 191121
              <br />
              India
            </div>
            <div className="mt-4 text-sm space-y-1">
              <a href={`tel:${BRAND.phoneRaw}`} className="block text-white/85 hover:text-gold">{BRAND.phone}</a>
              <a href={`mailto:${BRAND.email}`} className="block text-white/85 hover:text-gold break-all">{BRAND.email}</a>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="chapter-num mb-4">A quiet conversation?</div>
            <p className="text-white/60 text-sm mb-5">
              Send us a note. A director will reply, personally, within 24 hours.
            </p>
            <a href="#contact" className="btn-gold w-full justify-center">
              <span>Book Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] tracking-[0.24em] uppercase text-white/40">
          <div>© {new Date().getFullYear()} The Kashmir Atelier Dubai. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>Privacy</span>
            <span>·</span>
            <span>Terms</span>
            <span>·</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/80 hover:text-ink hover:bg-gold hover:border-gold transition-all"
    >
      {children}
    </a>
  );
}
