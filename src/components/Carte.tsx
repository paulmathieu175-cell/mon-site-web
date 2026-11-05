"use client";

import { useEffect, useRef, useState } from "react";
import Img from "./ui/Img";
import SplitReveal from "./ui/SplitReveal";
import ReserveLink from "./ui/ReserveLink";
import { menu } from "@/data/menu";
import type { ImageName } from "@/data/images";
import { FINE_POINTER, gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";

/** Page « La carte » : sections éditoriales, navigation collante et aperçu photo qui suit le curseur. */
export default function Carte() {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(menu[0].id);
  const [img, setImg] = useState<ImageName | null>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      // Section active dans la navigation
      menu.forEach((s) => {
        ScrollTrigger.create({ trigger: `#${s.id}`, start: "top 45%", end: "bottom 45%", onToggle: (self) => self.isActive && setActive(s.id) });
      });
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.from(q("[data-head-fade]"), { autoAlpha: 0, y: 30, stagger: 0.1, duration: 1.4, delay: 0.4 });
        gsap.fromTo(q("[data-head-img]"), { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "yaka", delay: 0.3 });
        gsap.to(q("[data-head-img] img"), { yPercent: 15, ease: "none", scrollTrigger: { trigger: q("[data-head-img]")[0], start: "top top", end: "bottom top", scrub: true } });
        q("[data-dish]").forEach((row) => {
          gsap.from(row, { autoAlpha: 0, y: 40, duration: 1.2, scrollTrigger: { trigger: row, start: "top 92%", once: true } });
          gsap.from(row.querySelector("[data-dish-line]"), { scaleX: 0, transformOrigin: "left", duration: 1.6, ease: "yaka", scrollTrigger: { trigger: row, start: "top 92%", once: true } });
        });
      });
    },
    { scope: root }
  );

  // Aperçu flottant (desktop)
  useEffect(() => {
    const el = preview.current;
    if (!el || !window.matchMedia(FINE_POINTER).matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3" });
    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    if (!preview.current) return;
    gsap.to(preview.current.querySelector("[data-preview-inner]"), {
      scale: img ? 1 : 0.6,
      autoAlpha: img ? 1 : 0,
      rotate: img ? -3 : 0,
      duration: 0.6,
      ease: "expo.out",
    });
  }, [img]);

  return (
    <div ref={root}>
      <header className="relative flex min-h-[85svh] items-end overflow-hidden pt-32 pb-14">
        <div data-head-img className="absolute inset-0">
          <Img name="sushi-slate" priority sizes="100vw" className="h-full w-full scale-110 object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-noir/30" />
        </div>
        <div className="gutter relative w-full">
          <p data-head-fade className="label text-champagne">
            La carte · <span className="font-jp tracking-normal">お品書き</span>
          </p>
          <SplitReveal as="h1" by="chars" start="top 100%" className="display mt-6 text-[clamp(4.5rem,17vw,16rem)] leading-[0.82]">
            La carte
          </SplitReveal>
          <p data-head-fade className="mt-6 max-w-md text-ivoire/70">
            Une carte courte et de saison, pensée pour être partagée. Elle évolue au fil des arrivages et de l&apos;inspiration
            du chef.
          </p>
        </div>
      </header>

      {/* Navigation des sections */}
      <nav aria-label="Sections de la carte" className="sticky top-0 z-40 border-y border-trait bg-noir/85 backdrop-blur-md">
        <ul className="gutter flex gap-6 overflow-x-auto py-4 [scrollbar-width:none] sm:gap-10">
          {menu.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(`#${s.id}`);
                }}
                aria-current={active === s.id ? "true" : undefined}
                className={`label relative pb-1 transition-colors duration-500 ${active === s.id ? "text-champagne" : "text-ivoire/50 hover:text-ivoire"}`}
              >
                {s.title}
                <span className={`absolute -bottom-1 left-0 h-px bg-champagne transition-all duration-700 ease-[var(--ease-luxe)] ${active === s.id ? "w-full" : "w-0"}`} />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="gutter">
        {menu.map((s, si) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="grid scroll-mt-16 gap-10 border-b border-trait py-20 sm:py-28 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <p className="label text-champagne/70">0{si + 1}</p>
                <SplitReveal as="h2" id={`${s.id}-title`} className="display mt-3 text-6xl leading-[0.9] sm:text-7xl">
                  {s.title}
                </SplitReveal>
                <p className="mt-4 font-jp text-3xl text-champagne/40">{s.jp}</p>
                <p className="mt-6 max-w-xs text-sm text-ivoire/55 italic">{s.intro}</p>
              </div>
            </div>
            <ul className="lg:col-span-7 lg:col-start-6">
              {s.dishes.map((d) => (
                <li
                  key={d.name}
                  data-dish
                  className="group relative py-6"
                  onPointerEnter={() => d.image && setImg(d.image)}
                  onPointerLeave={() => setImg(null)}
                >
                  <div className="flex items-baseline gap-4">
                    <h3 className="display text-[1.75rem] leading-tight transition-[color,transform] duration-500 ease-[var(--ease-luxe)] group-hover:translate-x-2 group-hover:text-champagne sm:text-4xl">
                      {d.name}
                      {d.signature && (
                        <span className="label ml-3 align-middle text-[0.55rem] text-champagne/70" title="Plat signature">
                          Signature
                        </span>
                      )}
                    </h3>
                    <span className="mb-2 hidden flex-1 border-b border-dotted border-champagne/20 sm:block" aria-hidden="true" />
                    <p className="display ml-auto shrink-0 text-2xl text-champagne">{d.price}&nbsp;€</p>
                  </div>
                  <p className="mt-1 text-sm text-ivoire/55">{d.desc}</p>
                  <span data-dish-line className="absolute bottom-0 left-0 h-px w-full bg-trait" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="flex flex-col items-start justify-between gap-8 py-20 sm:flex-row sm:items-end">
          <p className="max-w-md text-xs leading-relaxed text-ivoire/45">
            Prix nets en euros, service compris. Carte d&apos;illustration susceptible d&apos;évoluer. La liste des allergènes est
            disponible sur simple demande auprès de notre équipe.
          </p>
          <ReserveLink className="group display inline-flex items-center gap-4 text-4xl text-champagne italic sm:text-5xl">
            Réserver une table
            <span className="text-2xl not-italic transition-transform duration-500 group-hover:translate-x-2" aria-hidden="true">
              →
            </span>
          </ReserveLink>
        </div>
      </div>

      {/* Aperçu photo qui suit le curseur */}
      <div ref={preview} aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:block">
        <div data-preview-inner className="invisible -mt-40 ml-10 h-80 w-64 overflow-hidden opacity-0 shadow-2xl">
          {img && <Img key={img} name={img} sizes="256px" alt="" className="h-full w-full object-cover" />}
        </div>
      </div>
    </div>
  );
}
