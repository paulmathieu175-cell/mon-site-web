"use client";

import { useEffect, useRef, useState } from "react";
import TLink from "./ui/TLink";
import Img from "./ui/Img";
import ReserveLink from "./ui/ReserveLink";
import { navigation, site } from "@/config/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { lockScroll } from "@/lib/scroll";

/** Menu plein écran : rideau, liens gigantesques en cascade, aperçu photographique au survol. */
export default function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [hovered, setHovered] = useState(0);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.out" } })
        .set(el, { display: "block" })
        .fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: reduce ? 0.01 : 1, ease: "yaka" })
        .from(q("[data-menu-link]"), { yPercent: 120, rotate: 4, duration: reduce ? 0.01 : 1.2, stagger: 0.06 }, "-=0.45")
        .from(q("[data-menu-index]"), { autoAlpha: 0, x: -10, duration: 0.8, stagger: 0.06 }, "<0.1")
        .from(q("[data-menu-fade]"), { autoAlpha: 0, y: 20, duration: 1, stagger: 0.08 }, "<0.2")
        .from(q("[data-menu-visual]"), { clipPath: "inset(100% 0% 0% 0%)", duration: 1.3, ease: "yaka" }, 0.35);
    },
    { scope: ref }
  );

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) {
      lockScroll(true);
      t.timeScale(1).play(0);
      const first = ref.current?.querySelector<HTMLElement>("[data-menu-close]");
      setTimeout(() => first?.focus(), 50);
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    } else if (t.progress() > 0) {
      t.timeScale(1.8).reverse();
      lockScroll(false);
    }
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      id="menu-principal"
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
      aria-hidden={!open}
      className="fixed inset-0 z-[85] hidden overflow-y-auto bg-noir"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(70% 60% at 85% 20%, rgba(57,27,32,.55), transparent 70%)" }}
      />
      <div className="gutter relative flex min-h-full flex-col pt-6 pb-8">
        <div className="flex items-center justify-between">
          <button type="button" data-menu-close onClick={onClose} className="group label flex items-center gap-4 py-3 text-champagne" data-cursor="Fermer">
            <span className="relative block h-4 w-8" aria-hidden="true">
              <span className="absolute top-1/2 left-0 h-px w-full rotate-[18deg] bg-current transition-transform duration-500 group-hover:rotate-0" />
              <span className="absolute top-1/2 left-0 h-px w-full -rotate-[18deg] bg-current transition-transform duration-500 group-hover:rotate-0" />
            </span>
            Fermer
          </button>
          <span data-menu-fade className="font-jp text-2xl text-champagne/80">
            夜
          </span>
        </div>

        <div className="mt-8 grid flex-1 items-center gap-10 lg:mt-2 lg:grid-cols-[1.25fr_0.75fr]">
          <nav aria-label="Navigation principale">
            <ul>
              {navigation.map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-trait/70 first:border-t" onMouseEnter={() => setHovered(i)}>
                  <TLink
                    href={item.href}
                    onClick={onClose}
                    onFocus={() => setHovered(i)}
                    className="group flex items-baseline gap-5 py-2 sm:gap-8 sm:py-3"
                  >
                    <span data-menu-index className="label w-8 shrink-0 text-champagne/50 transition-colors group-hover:text-champagne">
                      0{i + 1}
                    </span>
                    <span data-menu-link className="relative block">
                      <span className="display block text-[clamp(2.4rem,min(8vw,10.5svh),7rem)] leading-[1.02] text-ivoire/90 transition-[color,transform,letter-spacing] duration-700 ease-[var(--ease-luxe)] group-hover:translate-x-4 group-hover:tracking-[0.01em] group-hover:text-champagne">
                        {item.label}
                      </span>
                    </span>
                    <span className="ml-auto hidden translate-x-[-10px] text-2xl text-champagne opacity-0 transition duration-500 group-hover:translate-x-0 group-hover:opacity-100 sm:block" aria-hidden="true">
                      →
                    </span>
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <div data-menu-visual className="relative mx-auto aspect-[4/5] max-h-[62svh] w-full overflow-hidden">
              {navigation.map((item, i) => (
                <div
                  key={item.href}
                  className="absolute inset-0 transition-[opacity,transform,clip-path] duration-[1100ms] ease-[var(--ease-luxe)]"
                  style={{
                    opacity: hovered === i ? 1 : 0,
                    transform: hovered === i ? "scale(1)" : "scale(1.12)",
                    clipPath: hovered === i ? "inset(0% 0% 0% 0%)" : "inset(8% 8% 8% 8%)",
                  }}
                >
                  <Img name={item.image} sizes="35vw" alt="" className="h-full w-full object-cover" />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent" />
              <p className="label absolute bottom-5 left-5 text-champagne">{navigation[hovered].label}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 text-sm text-ivoire/60 sm:grid-cols-3">
          <div data-menu-fade>
            <p className="label mb-2 text-champagne/60">Adresse</p>
            <p>
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </p>
          </div>
          <div data-menu-fade>
            <p className="label mb-2 text-champagne/60">Horaires</p>
            {site.hours.map((h) => (
              <p key={h.days}>
                {h.days} · {h.time}
              </p>
            ))}
          </div>
          <div data-menu-fade className="sm:text-right">
            <ReserveLink onClick={onClose} className="group inline-flex items-center gap-3 text-champagne">
              <span className="display text-3xl italic">Réserver une table</span>
              <span className="transition-transform duration-500 group-hover:translate-x-2" aria-hidden="true">
                →
              </span>
            </ReserveLink>
          </div>
        </div>
      </div>
    </div>
  );
}
