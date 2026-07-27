import { useRef, useState } from "react";
import { IMG } from "@/lib/data";
import { FadeUp } from "@/components/Reveal";

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);

  const onMove = (clientX) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(4, Math.min(96, p)));
  };

  return (
    <section className="relative bg-ink py-32 md:py-44 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-20">
        <div className="grid md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-4">
            <div className="eyebrow mb-6">Chapter 07 · Before &amp; After</div>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-white text-4xl md:text-6xl leading-[1.02] tracking-tight font-light">
              Same walls. <em className="italic text-gold">Different life</em>.
            </h2>
          </div>
        </div>

        <FadeUp>
          <div
            ref={ref}
            onMouseMove={(e) => dragging.current && onMove(e.clientX)}
            onMouseDown={(e) => {
              dragging.current = true;
              onMove(e.clientX);
            }}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onTouchMove={(e) => onMove(e.touches[0].clientX)}
            className="relative aspect-[16/9] rounded-sm overflow-hidden select-none cursor-ew-resize"
          >
            <img
              src={IMG.before}
              alt="Before renovation"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <img
                src={IMG.after}
                alt="After renovation"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <div
              className="absolute top-0 bottom-0 w-px bg-gold"
              style={{ left: `${pos}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-2xl"
              style={{ left: `${pos}%` }}
            >
              <span className="text-ink text-xl leading-none">⇄</span>
            </div>
            <div className="absolute top-4 left-4 chapter-num bg-black/40 backdrop-blur px-3 py-1 rounded">
              Before
            </div>
            <div className="absolute top-4 right-4 chapter-num text-gold bg-black/40 backdrop-blur px-3 py-1 rounded">
              After
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
