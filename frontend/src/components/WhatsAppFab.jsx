import { BRAND } from "@/lib/data";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
        "Hello Kashmir Atelier, I would like to discuss a project."
      )}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      data-testid="whatsapp-fab"
      className="fixed z-40 bottom-6 left-6 w-14 h-14 rounded-full bg-gold text-ink flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute inset-0 rounded-full animate-ping bg-gold/40" />
    </a>
  );
}
