"use client";

import { useEffect, useRef } from "react";

/** Progressive enhancement: content stays visible without JS or motion support. */
export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (!preference.matches && typeof element.animate === "function") {
        animation = element.animate(
          [{ opacity: 0.35, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 650, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)", fill: "none" },
        );
      }
      observer.disconnect();
    }, { threshold: 0.08 });
    const stopMotion = () => { if (preference.matches) { animation?.cancel(); observer.disconnect(); } };
    preference.addEventListener("change", stopMotion);
    observer.observe(element);
    return () => { observer.disconnect(); animation?.cancel(); preference.removeEventListener("change", stopMotion); };
  }, []);
  return <div className={className} ref={ref}>{children}</div>;
}
