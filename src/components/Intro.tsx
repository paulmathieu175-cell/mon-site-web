"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";
import { lockScroll } from "@/lib/scroll";

const LETTERS = ["Y", "A", "K", "A"];

/**
 * Séquence d'ouverture : écran noir → lettres YAKA → balayage de lumière →
 * ouverture par masque sur le hero. Version courte si déjà vue pendant la session,
 * ignorée si l'utilisateur préfère réduire le mouvement.
 */
export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let seen = false;
      try {
        seen = sessionStorage.getItem("yaka-intro") === "1";
        sessionStorage.setItem("yaka-intro", "1");
      } catch {}

      const finish = () => {
        gsap.set(el, { display: "none" });
        lockScroll(false);
        ScrollTrigger.refresh();
      };

      if (reduce || pathname !== "/") {
        markIntroDone();
        gsap.to(el, { autoAlpha: 0, duration: reduce ? 0 : 0.6, onComplete: finish });
        return;
      }

      lockScroll(true);
      // Chargement intelligent : on attend l'image du hero, mais jamais plus de 2,4 s.
      const heroImg = document.querySelector<HTMLImageElement>("[data-hero-img]");
      const ready = Promise.race([
        heroImg ? heroImg.decode().catch(() => undefined) : Promise.resolve(),
        new Promise((r) => setTimeout(r, 2400)),
      ]);

      const tl = gsap.timeline({ paused: true });
      if (seen) {
        gsap.set(q("[data-intro-letter], [data-intro-rule], [data-intro-caption]"), { autoAlpha: 0 });
      } else {
        tl.from(q("[data-intro-letter]"), {
          yPercent: 120,
          rotate: 8,
          filter: "blur(14px)",
          duration: 1.4,
          stagger: 0.09,
          ease: "expo.out",
        })
          .from(q("[data-intro-glow]"), { autoAlpha: 0, scale: 0.6, duration: 1.6, ease: "power2.out" }, 0)
          .from(q("[data-intro-rule]"), { scaleX: 0, duration: 1.1, ease: "yaka" }, 0.45)
          .from(q("[data-intro-caption]"), { autoAlpha: 0, y: 12, duration: 0.9 }, 0.65)
          .fromTo(q("[data-intro-light]"), { xPercent: -160 }, { xPercent: 420, duration: 1.3, ease: "power2.inOut" }, 0.55)
          .addPause("+=0.05", () => {
            ready.then(() => tl.play());
          })
          .to(q("[data-intro-letter]"), { yPercent: -120, duration: 0.75, stagger: 0.05, ease: "power3.in" })
          .to(q("[data-intro-rule], [data-intro-caption], [data-intro-glow]"), { autoAlpha: 0, duration: 0.4 }, "<");
      }
      tl.add(() => markIntroDone(), seen ? 0 : "-=0.25")
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: seen ? 1 : 1.2, ease: "yaka" }, "<")
        .add(finish);

      if (seen) ready.then(() => tl.play());
      else tl.play();

      return () => lockScroll(false);
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="intro fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-noir"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div
        data-intro-glow
        className="pointer-events-none absolute top-1/2 left-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(216,197,163,.28), rgba(57,27,32,.35) 45%, transparent 70%)" }}
      />
      <div className="relative overflow-hidden px-[2vw]">
        <div className="display flex text-[26vw] leading-[0.9] sm:text-[17vw] lg:text-[13vw]" style={{ letterSpacing: "0.04em" }}>
          {LETTERS.map((l, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.06em]">
              <span data-intro-letter className="text-champagne-gradient inline-block">
                {l}
              </span>
            </span>
          ))}
        </div>
        <span
          data-intro-light
          className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-ivoire/25 to-transparent mix-blend-overlay"
        />
      </div>
      <div data-intro-rule className="mt-6 h-px w-28 origin-center bg-champagne/60" />
      <p data-intro-caption className="label mt-5 text-champagne/70">
        <span className="font-jp text-sm tracking-normal">夜</span>&nbsp;&nbsp;Paris
      </p>
    </div>
  );
}
