"use client";

import { useRef } from "react";
import Img from "./Img";
import type { ImageName } from "@/data/images";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

type Props = {
  name: ImageName;
  className?: string;
  /** Ratio CSS, ex. "4 / 5" */
  ratio: string;
  sizes?: string;
  /** Amplitude du parallax interne (en % de la hauteur), 0 pour désactiver */
  parallax?: number;
  /** Direction d'ouverture du masque */
  from?: "bottom" | "top" | "left" | "right";
  delay?: number;
};

const closed = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/** Photographie dévoilée par un masque animé, avec zoom inverse et parallax interne. */
export default function ImageReveal({ name, className = "", ratio, sizes = "50vw", parallax = 7, from = "bottom", delay = 0 }: Props) {
  const wrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = wrap.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const img = el.querySelector("img");
        const inner = el.querySelector("[data-inner]");
        const st = { trigger: el, start: "top 88%", once: true };
        gsap.fromTo(el, { clipPath: closed[from] }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: "yaka", delay, scrollTrigger: st });
        gsap.fromTo(img, { scale: 1.4 }, { scale: 1, duration: 2.4, ease: "expo.out", delay, scrollTrigger: st });
        if (parallax && inner) {
          gsap.fromTo(
            inner,
            { yPercent: -parallax },
            { yPercent: parallax, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
          );
        }
      });
    },
    { scope: wrap }
  );

  return (
    <div ref={wrap} className={`relative overflow-hidden bg-charbon ${className}`} style={{ aspectRatio: ratio }}>
      <div data-inner className="absolute inset-x-0 -inset-y-[10%]">
        <Img name={name} sizes={sizes} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
