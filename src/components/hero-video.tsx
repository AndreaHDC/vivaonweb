"use client";

import { useSyncExternalStore, useState } from "react";
import type { Locale } from "@/content/translations";

function subscribe(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function HeroVideo({ locale }: { locale: Locale }) {
  const reducedMotion = useSyncExternalStore(subscribe, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => true);
  const [stopped, setStopped] = useState(false);
  const playing = !reducedMotion && !stopped;
  return <>
    <div className="hero-video-media" aria-hidden="true">
      {playing && <iframe src="https://player.vimeo.com/video/143764515?background=1&autoplay=1&loop=1&muted=1&dnt=1#t=28s" title="Viva! ShowReel" allow="autoplay; fullscreen" tabIndex={-1} />}
    </div>
    {!reducedMotion && <button className="hero-video-toggle" type="button" onClick={() => setStopped(!stopped)}>{locale === "it" ? (playing ? "Ferma video" : "Riproduci video") : (playing ? "Stop video" : "Play video")} <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span></button>}
  </>;
}
