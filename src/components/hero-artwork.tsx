"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function HeroArtwork({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const hero = element?.parentElement;
    if (!element || !hero) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (preference.matches) {
        element.style.transform = "none";
        return;
      }
      const { top, height } = hero.getBoundingClientRect();
      const offset = Math.min(Math.max(-top, 0), height) * 0.18;
      element.style.transform = `translate3d(0, ${offset}px, 0)`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, []);
  return <div ref={ref} className="hero-artwork" aria-hidden="true"><Image src={src} alt="" fill sizes="100vw" preload /></div>;
}
