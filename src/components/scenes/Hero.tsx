"use client";

import { useRef } from "react";
import { asset } from "@/lib/asset";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { scrollToTarget } from "@/lib/scroll";
import { images } from "@/data/images";
import { site } from "@/config/site";
import Magnetic from "../ui/Magnetic";
import ReserveLink from "../ui/ReserveLink";

// Pour une vidéo d'ambiance : déposez /public/videos/hero.mp4 et renseignez le chemin ici.
const HERO_VIDEO: string | null = null;

/** SCÈNE 01 — L'entrée. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const q = gsap.utils.selector(root);
        gsap.set(q("[data-hero-letter]"), { yPercent: 108 });
        gsap.set(q("[data-hero-fade]"), { autoAlpha: 0, y: 26 });
        gsap.set(q("[data-hero-media]"), { scale: 1.28 });
        gsap.set(q("[data-hero-line]"), { scaleX: 0 });

        const off = onIntroDone(() => {
          gsap
            .timeline()
            .to(q("[data-hero-media]"), { scale: 1, duration: 3, ease: "expo.out" }, 0)
            .to(q("[data-hero-letter]"), { yPercent: 0, duration: 1.8, stagger: 0.09, ease: "expo.out" }, 0.1)
            .to(q("[data-hero-line]"), { scaleX: 1, duration: 1.6, ease: "yaka" }, 0.5)
            .to(q("[data-hero-fade]"), { autoAlpha: 1, y: 0, duration: 1.4, stagger: 0.1, ease: "expo.out" }, 0.65);
        });

        // Profondeur au défilement : l'image s'enfonce, le logo s'élève et s'efface.
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-hero-parallax]"), { yPercent: 22, scale: 1.08, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-hero-word]"), { yPercent: -45, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-hero-veil]"), { opacity: 0.85, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-hero-content]"), { y: -80, autoAlpha: 0, ease: "none", scrollTrigger: { ...st, end: "60% top" } });
        return off;
      });
    },
    { scope: root }
  );

  const base = asset("/images/");

  return (
    <section ref={root} id="accueil" aria-label="YAKA — accueil" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-noir">
      {/* Média plein écran */}
      <div data-hero-parallax className="absolute inset-0 will-change-transform">
        <div data-hero-media className="absolute inset-0 will-change-transform">
          {HERO_VIDEO ? (
            <video className="h-full w-full object-cover" src={asset(HERO_VIDEO)} poster={`${base}bar-1800.webp`} autoPlay muted loop playsInline />
          ) : (
            <picture>
              <source media="(max-width: 767px)" srcSet={`${base}salle-900.webp`} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-hero-img
                src={`${base}bar-1800.webp`}
                srcSet={`${base}bar-900.webp 900w, ${base}bar-1800.webp 1800w`}
                sizes="100vw"
                width={images.bar.w}
                height={images.bar.h}
                alt={images.bar.alt}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </picture>
          )}
        </div>
      </div>

      {/* Atmosphère : voile, vignettage, halo doré qui dérive */}
      <div data-hero-veil className="absolute inset-0 bg-noir opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,8,8,.85)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-noir via-noir/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-soft-light">
        <div
          className="animate-drift absolute top-[10%] left-[20%] h-[70vmax] w-[70vmax] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(216,197,163,.55), transparent 60%)" }}
        />
      </div>

      {/* Contenu */}
      <div data-hero-content className="gutter relative flex h-full flex-col justify-end pb-8 sm:pb-12">
        <div className="mb-6 flex items-end justify-between gap-6 sm:mb-10">
          <div className="max-w-sm">
            <p data-hero-fade className="label mb-4 text-champagne">
              Restaurant & bar — Paris
            </p>
            <p data-hero-fade className="display text-[1.65rem] leading-tight text-ivoire italic sm:text-4xl">
              {site.tagline}.
            </p>
          </div>
          <div data-hero-fade className="hidden flex-col items-center gap-3 md:flex">
            <span className="font-jp text-5xl text-champagne [writing-mode:vertical-rl]">夜</span>
            <span className="label text-[0.6rem] text-ivoire/60 [writing-mode:vertical-rl]">{site.kanjiReading}</span>
          </div>
        </div>

        <div data-hero-line className="mb-2 h-px w-full origin-left bg-champagne/30" />

        <h1 data-hero-word className="display relative -ml-[0.04em] flex justify-between text-[33vw] leading-[0.78] sm:text-[28vw]">
          <span className="sr-only">YAKA</span>
          {["Y", "A", "K", "A"].map((l, i) => (
            <span key={i} aria-hidden="true" className="inline-block overflow-hidden pt-[0.06em]">
              <span data-hero-letter className="text-champagne-gradient inline-block">
                {l}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-6 flex flex-col-reverse items-start justify-between gap-6 sm:mt-8 sm:flex-row sm:items-center">
          <button
            type="button"
            data-hero-fade
            onClick={() => scrollToTarget("#univers")}
            className="group flex items-center gap-4 text-ivoire/70 transition-colors hover:text-champagne"
            data-cursor="Défiler"
          >
            <span className="relative h-12 w-px overflow-hidden bg-ivoire/15">
              <span className="animate-scroll-line absolute inset-0 bg-champagne" />
            </span>
            <span className="label">Découvrir</span>
          </button>

          <div data-hero-fade className="w-full sm:w-auto">
            <Magnetic className="w-full sm:w-auto">
              <ReserveLink className="group relative flex w-full items-center justify-center gap-4 overflow-hidden rounded-full border border-champagne/60 px-9 py-5 text-champagne transition-colors duration-500 hover:text-noir sm:w-auto">
                <span className="absolute inset-0 translate-y-full rounded-full bg-champagne transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:translate-y-0" />
                <span className="label relative">Réserver une table</span>
                <span className="relative transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </ReserveLink>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
