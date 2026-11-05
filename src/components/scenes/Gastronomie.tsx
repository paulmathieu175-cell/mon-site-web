"use client";

import { useRef } from "react";
import SplitReveal from "../ui/SplitReveal";
import ImageReveal from "../ui/ImageReveal";
import Img from "../ui/Img";
import TLink from "../ui/TLink";
import Roll from "../ui/Roll";
import { signatures } from "@/data/menu";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/** SCÈNE 04 — La gastronomie : composition asymétrique puis défilement horizontal des signatures. */
export default function Gastronomie() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION, desktop: "(min-width: 768px)" }, (ctx) => {
        const { motion, desktop } = ctx.conditions ?? {};
        if (!motion || !desktop) return;
        const q = gsap.utils.selector(root);
        const wrap = q("[data-h-wrap]")[0] as HTMLElement;
        const track = q("[data-h-track]")[0] as HTMLElement;
        wrap.classList.add("is-pinned");
        const distance = () => track.scrollWidth - window.innerWidth;

        const move = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: q("[data-h-pin]")[0],
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        // Texte géant en contre-sens
        gsap.fromTo(q("[data-h-bg]"), { xPercent: 0 }, { xPercent: -30, ease: "none", scrollTrigger: { trigger: q("[data-h-pin]")[0], start: "top top", end: () => `+=${distance()}`, scrub: 1 } });
        // Parallax interne des images pendant le défilement horizontal
        q("[data-h-card] img").forEach((img) => {
          gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: { trigger: img, containerAnimation: move, start: "left right", end: "right left", scrub: true } });
        });
        return () => wrap.classList.remove("is-pinned");
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="gastronomie" className="relative bg-charbon">
      <div className="gutter py-28 sm:py-40">
        <p className="label text-champagne">04 — La gastronomie</p>

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <SplitReveal as="h2" className="display text-[clamp(3.2rem,9vw,9rem)] leading-[0.88] md:col-span-8">
            L&apos;Orient,
            <br />
            <em className="text-champagne">écrit</em> à la française.
          </SplitReveal>
          <div className="md:col-span-4 md:pt-6">
            <SplitReveal className="max-w-sm text-[0.95rem] leading-relaxed text-ivoire/65">
              Poissons de ligne travaillés à cru, viandes saisies sur la braise de binchotan, bouillons mijotés toute une
              journée. Une carte courte, de saison, où chaque assiette tient en quelques gestes justes.
            </SplitReveal>
            <TLink href="/carte/" className="group mt-8 inline-flex items-center gap-4 border-b border-champagne/40 pb-2 text-champagne" data-cursor="Carte">
              <span className="label">
                <Roll text="Découvrir la carte" />
              </span>
              <span className="transition-transform duration-500 group-hover:translate-x-2" aria-hidden="true">
                →
              </span>
            </TLink>
          </div>
        </div>

        {/* Composition asymétrique */}
        <div className="mt-20 grid grid-cols-12 gap-4 sm:mt-28 sm:gap-6">
          <figure className="col-span-8 md:col-span-5">
            <ImageReveal name="nigiri" ratio="4 / 5" sizes="(min-width: 768px) 40vw, 70vw" />
            <figcaption className="mt-4 flex justify-between gap-4 text-sm text-ivoire/60">
              <span className="label text-champagne/80">N° 01</span>
              <span>Nigiri toro, braise de binchotan</span>
            </figcaption>
          </figure>
          <figure className="col-span-10 col-start-3 md:col-span-6 md:col-start-7 md:mt-48">
            <ImageReveal name="ramen" ratio="3 / 2" sizes="(min-width: 768px) 50vw, 85vw" from="right" />
            <figcaption className="mt-4 flex justify-between gap-4 text-sm text-ivoire/60">
              <span className="label text-champagne/80">N° 02</span>
              <span>Ramen de minuit, bouillon tonkotsu</span>
            </figcaption>
          </figure>
          <figure className="col-span-7 col-start-1 md:col-span-4 md:col-start-4 md:-mt-24">
            <ImageReveal name="sushi-dark" ratio="1 / 1" sizes="(min-width: 768px) 33vw, 60vw" from="left" />
            <figcaption className="mt-4 flex justify-between gap-4 text-sm text-ivoire/60">
              <span className="label text-champagne/80">N° 03</span>
              <span>Sashimi, sauce soja vieillie</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Signatures — défilement horizontal */}
      <div data-h-pin className="relative overflow-hidden py-16 md:flex md:h-[100svh] md:flex-col md:justify-center md:py-0">
        <div
          data-h-bg
          aria-hidden="true"
          className="display pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-[30vw] leading-none whitespace-nowrap text-transparent select-none"
          style={{ WebkitTextStroke: "1px rgba(216,197,163,.08)" }}
        >
          Signatures 夜 Signatures 夜 Signatures
        </div>
        <div className="gutter relative mb-10 flex items-end justify-between">
          <h3 className="display text-5xl sm:text-6xl">
            Les <em className="text-champagne">signatures</em>
          </h3>
          <p className="label hidden text-ivoire/50 md:block">Faites défiler →</p>
        </div>
        <div data-h-wrap className="h-track-wrap relative">
          <ul data-h-track className="gutter flex w-max gap-5 sm:gap-8">
            {signatures.map((s, i) => (
              <li key={s.name} data-h-card className="group w-[78vw] shrink-0 snap-center sm:w-[46vw] md:w-[34vw] lg:w-[28vw]" data-cursor="Goûter">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Img name={s.image} sizes="(min-width: 768px) 34vw, 78vw" className="h-full w-full scale-[1.18] object-cover transition-[filter] duration-700 group-hover:brightness-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />
                  <span className="display absolute top-4 left-5 text-6xl text-champagne/90 italic">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h4 className="display mt-5 text-3xl transition-colors duration-500 group-hover:text-champagne">{s.name}</h4>
                <p className="mt-1 text-sm text-ivoire/55">{s.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
