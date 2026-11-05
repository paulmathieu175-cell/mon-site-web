"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Img from "../ui/Img";
import { images, type ImageName } from "@/data/images";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import { lockScroll } from "@/lib/scroll";

const columns: ImageName[][] = [
  ["sushi-slate", "lanterne", "table"],
  ["chef", "dimsum", "cocktail-2"],
  ["noodles", "whisky", "sushi-board"],
];
const all = columns.flat();

/** SCÈNE 05 — La galerie : zoom cinématographique puis mur photographique interactif. */
export default function Galerie() {
  const root = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION, desktop: "(min-width: 768px)" }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const desktop = ctx.conditions.desktop;
        const q = gsap.utils.selector(root);

        // Zoom : une fenêtre s'ouvre jusqu'au plein écran, les mots s'écartent
        gsap
          .timeline({
            scrollTrigger: { trigger: q("[data-zoom-pin]")[0], start: "top top", end: "+=130%", pin: true, scrub: 1 },
          })
          .fromTo(
            q("[data-zoom-window]"),
            { clipPath: desktop ? "inset(24% 34% 24% 34%)" : "inset(28% 14% 28% 14%)" },
            { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut" },
            0
          )
          .fromTo(q("[data-zoom-window] img"), { scale: 1.45 }, { scale: 1, ease: "power2.inOut" }, 0)
          .to(q("[data-zoom-left]"), { xPercent: -120, autoAlpha: 0, ease: "power2.in" }, 0)
          .to(q("[data-zoom-right]"), { xPercent: 120, autoAlpha: 0, ease: "power2.in" }, 0)
          .fromTo(q("[data-zoom-caption]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.7);

        // Colonnes à vitesses différentes
        const speeds = desktop ? [-60, 80, -30] : [0, 0, 0];
        q("[data-col]").forEach((col, i) => {
          gsap.fromTo(col, { y: -speeds[i] }, { y: speeds[i], ease: "none", scrollTrigger: { trigger: q("[data-grid]")[0], start: "top bottom", end: "bottom top", scrub: true } });
        });
        q("[data-tile]").forEach((tile) => {
          gsap.from(tile, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.5, ease: "yaka", scrollTrigger: { trigger: tile, start: "top 92%", once: true } });
        });
      });
    },
    { scope: root }
  );

  let index = 0;
  return (
    <section ref={root} id="galerie" className="relative bg-noir">
      <div data-zoom-pin className="relative flex h-[100svh] items-center justify-center overflow-hidden">
        <div data-zoom-window className="absolute inset-0 overflow-hidden">
          <Img name="salon" sizes="100vw" className="h-full w-full object-cover" alt={images.salon.alt} />
          <div className="absolute inset-0 bg-noir/35" />
        </div>
        <p className="label absolute top-28 left-4 z-10 text-champagne sm:left-14">05 — La galerie</p>
        <h2 className="display relative z-10 flex w-full justify-between px-4 text-[clamp(2.6rem,9vw,9rem)] leading-none sm:px-14">
          <span data-zoom-left>Dans</span>
          <span data-zoom-right className="text-champagne italic">
            l&apos;intimité
          </span>
        </h2>
        <p data-zoom-caption className="display absolute bottom-12 z-10 px-4 text-center text-2xl text-ivoire/90 italic sm:text-3xl">
          Lumières basses, voix feutrées, éclats d&apos;or.
        </p>
      </div>

      <div data-grid className="gutter grid grid-cols-2 gap-4 py-24 sm:gap-6 md:grid-cols-3 md:py-40">
        {columns.map((col, ci) => (
          <div key={ci} data-col className={`flex flex-col gap-4 sm:gap-6 ${ci === 1 ? "md:mt-40" : ""} ${ci === 2 ? "col-span-2 grid grid-cols-2 md:col-span-1 md:flex" : ""}`}>
            {col.map((name, ri) => {
              const i = index++;
              const tall = (ci + ri) % 2 === 0;
              return (
                <button
                  key={name}
                  type="button"
                  data-tile
                  data-cursor="Voir"
                  onClick={() => setCurrent(i)}
                  aria-label={`Agrandir : ${images[name].alt}`}
                  className={`group relative block w-full overflow-hidden bg-charbon ${tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                >
                  <Img
                    name={name}
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="h-full w-full object-cover brightness-[.8] grayscale-[35%] transition-[transform,filter] duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-[1.07] group-hover:brightness-100 group-hover:grayscale-0"
                  />
                  <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-noir/90 to-transparent p-4 text-left text-xs text-ivoire/80 transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:translate-y-0">
                    {images[name].alt}
                  </span>
                  <span className="absolute top-3 right-3 font-jp text-sm text-champagne opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <Lightbox index={current} onChange={setCurrent} />
    </section>
  );
}

function Lightbox({ index, onChange }: { index: number | null; onChange: (i: number | null) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const close = useCallback(() => onChange(null), [onChange]);
  const go = useCallback((d: number) => onChange(index === null ? null : (index + d + all.length) % all.length), [index, onChange]);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    ref.current?.querySelector<HTMLElement>("[data-lb-close]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, close, go]);

  useEffect(() => {
    if (!open || !ref.current) return;
    const img = ref.current.querySelector("[data-lb-img]");
    gsap.fromTo(img, { clipPath: "inset(10% 10% 10% 10%)", scale: 1.08, autoAlpha: 0.4 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, autoAlpha: 1, duration: 1, ease: "yaka" });
  }, [index, open]);

  if (!open || index === null) return null;
  const name = all[index];
  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label="Galerie photo" className="fixed inset-0 z-[88] flex flex-col bg-noir/97 backdrop-blur-sm">
      <div className="gutter flex h-20 items-center justify-between">
        <p className="label text-champagne">
          {String(index + 1).padStart(2, "0")} / {String(all.length).padStart(2, "0")}
        </p>
        <button type="button" data-lb-close onClick={close} className="label text-ivoire/80 hover:text-champagne" data-cursor="Fermer">
          Fermer ✕
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-20" onClick={(e) => e.target === e.currentTarget && close()}>
        <div data-lb-img className="relative max-h-full">
          <Img name={name} sizes="90vw" priority className="max-h-[75svh] w-auto object-contain" />
        </div>
        <button type="button" onClick={() => go(-1)} aria-label="Photo précédente" className="absolute left-2 p-4 text-3xl text-champagne/80 hover:text-champagne sm:left-6">
          ←
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Photo suivante" className="absolute right-2 p-4 text-3xl text-champagne/80 hover:text-champagne sm:right-6">
          →
        </button>
      </div>
      <p className="gutter pb-8 text-center text-sm text-ivoire/60">{images[name].alt}</p>
    </div>
  );
}
