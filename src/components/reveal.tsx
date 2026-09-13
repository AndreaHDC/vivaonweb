"use client";

import { useLayoutEffect, useRef } from "react";

/** Visible by default; only offscreen content is prepared for a scroll reveal. */
export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver || typeof element.animate !== "function") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Never hide something the visitor can already see, including restored scroll positions.
    if (preference.matches || element.getBoundingClientRect().top < window.innerHeight) return;
    const animation = element.animate(
      [{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 1000, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" },
    );
    animation.pause();
    animation.currentTime = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      animation.play();
      observer.disconnect();
    }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });
    const revealImmediately = () => { observer.disconnect(); animation.cancel(); };
    const stopMotion = () => { if (preference.matches) revealImmediately(); };
    // Remove the animation layer after completion; the natural styles stay visible.
    animation.onfinish = () => animation.cancel();
    element.addEventListener("focusin", revealImmediately);
    preference.addEventListener("change", stopMotion);
    observer.observe(element);
    return () => {
      observer.disconnect(); animation.cancel();
      element.removeEventListener("focusin", revealImmediately);
      preference.removeEventListener("change", stopMotion);
    };
  }, []);
  return <div className={className} ref={ref}>{children}</div>;
}
