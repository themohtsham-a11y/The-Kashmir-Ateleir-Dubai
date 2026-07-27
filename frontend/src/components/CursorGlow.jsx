import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      setEnabled(false);
      return;
    }
    let x = 0,
      y = 0,
      cx = 0,
      cy = 0;
    const el = ref.current;
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
    };
    let raf;
    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (el) el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  if (!enabled) return null;
  return <div ref={ref} className="cursor-glow" aria-hidden />;
}
