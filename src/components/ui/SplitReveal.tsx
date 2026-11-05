"use client";

import { useRef } from "react";
import { gsap, MOTION, SplitText, useGSAP } from "@/lib/gsap";

type Props = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  /** "lines" : révélation ligne par ligne · "chars" : lettre par lettre */
  by?: "lines" | "chars";
  delay?: number;
  start?: string;
  id?: string;
};

/** Texte révélé ligne par ligne (ou lettre par lettre) derrière un masque, à l'entrée dans l'écran. */
export default function SplitReveal({ as: Tag = "p", children, className, by = "lines", delay = 0, start = "top 86%", id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const split = SplitText.create(el, {
          type: by === "chars" ? "lines,chars" : "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            const targets = by === "chars" ? self.chars : self.lines;
            return gsap.from(targets, {
              yPercent: 115,
              rotate: by === "chars" ? 7 : 2.5,
              transformOrigin: "0% 100%",
              duration: by === "chars" ? 1.3 : 1.5,
              stagger: by === "chars" ? 0.03 : 0.11,
              ease: "expo.out",
              delay,
              scrollTrigger: { trigger: el, start, once: true },
            });
          },
        });
        return () => split.revert();
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
