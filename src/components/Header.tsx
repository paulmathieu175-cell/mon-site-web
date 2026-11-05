"use client";

import { useRef, useState } from "react";
import TLink from "./ui/TLink";
import Magnetic from "./ui/Magnetic";
import Roll from "./ui/Roll";
import ReserveLink from "./ui/ReserveLink";
import MenuOverlay from "./MenuOverlay";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";

/** En-tête transparent : se masque en descendant, réapparaît en remontant. */
export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.set(el, { autoAlpha: 0 });
      const off = onIntroDone(() => {
        gsap.fromTo(el, { autoAlpha: 0, yPercent: reduce ? 0 : -60 }, { autoAlpha: 1, yPercent: 0, duration: 1.4, delay: 0.5, ease: "expo.out" });
      });
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate(self) {
          const past = self.scroll() > window.innerHeight * 0.6;
          el.classList.toggle("is-solid", self.scroll() > 40);
          if (reduce) return;
          gsap.to(el, { yPercent: past && self.direction === 1 ? -110 : 0, duration: 0.7, ease: "expo.out", overwrite: "auto" });
        },
      });
      return () => {
        off();
        st.kill();
      };
    },
    { scope: ref }
  );

  return (
    <>
      <header
        ref={ref}
        className="group/header fixed inset-x-0 top-0 z-[80] text-ivoire transition-[background-color,backdrop-filter] duration-700 [&.is-solid]:bg-noir/40 [&.is-solid]:backdrop-blur-md"
      >
        <div className="gutter grid h-20 grid-cols-[1fr_auto_1fr] items-center sm:h-24">
          <div>
            <Magnetic>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="menu-principal"
                className="group flex items-center gap-4 py-3"
                data-cursor="Menu"
              >
                <span className="flex w-8 flex-col gap-[7px]" aria-hidden="true">
                  <span className="h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:scale-x-75" />
                  <span className="h-px w-full origin-left bg-current transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:scale-x-50" />
                </span>
                <span className="label hidden sm:inline-flex">
                  <Roll text="Menu" />
                </span>
              </button>
            </Magnetic>
          </div>

          <TLink href="/" aria-label="YAKA — retour à l'accueil" className="group flex items-center gap-3">
            <span className="display text-[1.9rem] leading-none tracking-[0.18em] sm:text-[2.2rem]">YAKA</span>
            <span className="hidden h-7 w-7 items-center justify-center border border-champagne/40 font-jp text-[0.8rem] text-champagne transition-colors duration-500 group-hover:bg-champagne group-hover:text-noir sm:flex">
              夜
            </span>
          </TLink>

          <div className="flex justify-end">
            <Magnetic>
              <ReserveLink className="group relative inline-flex items-center gap-3 overflow-hidden border border-champagne/40 px-4 py-3 text-champagne transition-colors duration-500 hover:text-noir sm:px-6">
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-champagne transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:scale-y-100" />
                <span className="label relative">
                  <Roll text="Réserver" />
                </span>
              </ReserveLink>
            </Magnetic>
          </div>
        </div>
      </header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
