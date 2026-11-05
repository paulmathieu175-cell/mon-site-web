"use client";

import { useEffect, useRef, useState } from "react";
import { FINE_POINTER, gsap } from "@/lib/gsap";

/** Curseur personnalisé : point + anneau, avec étiquette contextuelle (data-cursor). Desktop uniquement. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia(FINE_POINTER).matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    document.documentElement.classList.add("has-cursor");
    const d = dot.current;
    const r = ring.current;
    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.55, ease: "power3" });
    let visible = false;

    const move = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([d, r], { autoAlpha: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, [role=tab]");
      const text = t?.dataset.cursor ?? "";
      setLabel(text);
      gsap.to(r, {
        scale: text ? 2.6 : t ? 1.7 : 1,
        backgroundColor: text ? "rgba(216,197,163,0.95)" : "rgba(216,197,163,0)",
        duration: 0.5,
        ease: "expo.out",
      });
      gsap.to(d, { scale: t ? 0 : 1, duration: 0.3 });
    };
    const leave = () => {
      visible = false;
      gsap.to([d, r], { autoAlpha: 0, duration: 0.3 });
    };
    const down = () => gsap.to(r, { scale: "-=0.25", duration: 0.2 });
    const up = () => gsap.to(r, { scale: "+=0.25", duration: 0.4 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] -mt-5 -ml-5 flex h-10 w-10 items-center justify-center rounded-full border border-champagne/60 opacity-0"
      >
        <span className="text-[0.32rem] font-semibold tracking-[0.2em] text-noir uppercase">{label}</span>
      </div>
      <div ref={dot} aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-[100] -mt-[3px] -ml-[3px] h-1.5 w-1.5 rounded-full bg-champagne opacity-0" />
    </>
  );
}
