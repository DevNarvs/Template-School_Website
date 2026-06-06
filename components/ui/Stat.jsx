"use client";
import { useEffect, useRef, useState } from "react";

// Count-up stat that animates once on scroll into view.
export default function Stat({ value, suffix = "", label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          obs.unobserve(e.target);
          const duration = 1200;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(eased * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-bold tabular-nums text-brand-700 sm:text-5xl">
        {display.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-1 text-sm font-medium text-neutral-600">{label}</div>
    </div>
  );
}
