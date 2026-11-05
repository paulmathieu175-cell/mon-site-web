"use client";

import { useRef, useState } from "react";
import Img from "../ui/Img";
import type { ImageName } from "@/data/images";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

const chapters: { n: string; title: string; text: string; image: ImageName }[] = [
  { n: "I", title: "Le seuil", text: "Le soir tombe sur la Seine. Les lampadaires s'allument un à un, et Paris se fait confidente.", image: "paris" },
  { n: "II", title: "La table", text: "Lin épais, verres fins, flamme des bougies. On s'installe, le temps ralentit.", image: "table" },
  { n: "III", title: "Le geste", text: "Sous les lampes de cuivre, le chef dresse chaque assiette comme on calligraphie un poème.", image: "chef" },
  { n: "IV", title: "La nuit", text: "Puis le bar s'embrase doucement. Cocktails ambrés, musique feutrée : la soirée ne fait que commencer.", image: "cocktail" },
];

/** SCÈNE 03 — L'expérience : storytelling épinglé, images qui se dévoilent et zooment au défilement. */
export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(true);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION, reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        if (ctx.conditions?.reduce) {
          setAnimated(false);
          return;
        }
        const q = gsap.utils.selector(root);
        const medias = q("[data-exp-media]");
        const texts = q("[data-exp-text]");
        const nums = q("[data-exp-num]");
        gsap.set(medias.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(texts.slice(1), { autoAlpha: 0, yPercent: 40 });
        gsap.set(nums.slice(1), { opacity: 0.25 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q("[data-exp-pin]")[0],
            start: "top top",
            end: () => `+=${window.innerHeight * (chapters.length + 0.2)}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });
        medias.forEach((m, i) => {
          const img = m.querySelector("img");
          // Zoom cinématographique continu sur chaque plan
          tl.fromTo(img, { scale: i === 0 ? 1.05 : 1.3 }, { scale: 1.12, duration: 1.4 }, i === 0 ? 0 : i - 0.4);
          if (i > 0) {
            tl.to(m, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power2.inOut" }, i - 0.4)
              .to(medias[i - 1], { scale: 0.92, filter: "brightness(.4)", duration: 0.55, ease: "power2.inOut" }, i - 0.4)
              .to(texts[i - 1], { autoAlpha: 0, yPercent: -40, duration: 0.3, ease: "power2.in" }, i - 0.4)
              .to(texts[i], { autoAlpha: 1, yPercent: 0, duration: 0.35, ease: "power2.out" }, i - 0.15)
              .to(nums[i - 1], { opacity: 0.25, duration: 0.2 }, i - 0.3)
              .to(nums[i], { opacity: 1, duration: 0.2 }, i - 0.3);
          }
        });
        tl.fromTo(q("[data-exp-progress]"), { scaleY: 0 }, { scaleY: 1, duration: chapters.length, ease: "none" }, 0);
      });
    },
    { scope: root }
  );

  if (!animated) {
    return (
      <section id="experience" className="bg-noir py-24">
        <div className="gutter">
          <p className="label text-champagne">03 — L&apos;expérience</p>
          <div className="mt-12 grid gap-16">
            {chapters.map((c) => (
              <article key={c.n} className="grid gap-6 md:grid-cols-2 md:items-center">
                <Img name={c.image} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                <div>
                  <p className="label text-champagne/70">Chapitre {c.n}</p>
                  <h3 className="display mt-3 text-5xl">{c.title}</h3>
                  <p className="mt-4 max-w-md text-ivoire/70">{c.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={root} id="experience" aria-label="L'expérience YAKA" className="relative bg-noir">
      <div data-exp-pin className="relative h-[100svh] overflow-hidden">
        {chapters.map((c, i) => (
          <div key={c.n} data-exp-media className="absolute inset-0 overflow-hidden will-change-[clip-path]" style={{ zIndex: i }}>
            <Img name={c.image} sizes="100vw" alt={i === 0 ? undefined : ""} className="h-full w-full object-cover will-change-transform" />
          </div>
        ))}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-noir/85 via-noir/30 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-noir/80 via-transparent to-noir/40" />

        <div className="gutter relative z-20 flex h-full flex-col justify-between pt-28 pb-10 sm:pt-32 sm:pb-14">
          <p className="label text-champagne">03 — L&apos;expérience</p>

          <div className="relative grid min-h-[16rem] sm:min-h-[20rem]">
            {chapters.map((c) => (
              <div key={c.n} data-exp-text className="col-start-1 row-start-1 max-w-2xl self-end">
                <p className="label text-champagne/70">Chapitre {c.n}</p>
                <h3 className="display mt-3 text-[clamp(3.5rem,10vw,9.5rem)] leading-[0.85] text-ivoire">{c.title}</h3>
                <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-ivoire/75 sm:text-base">{c.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Index des chapitres + barre de progression */}
        <div className="absolute top-1/2 right-4 z-20 flex -translate-y-1/2 items-stretch gap-4 sm:right-10">
          <ol className="flex flex-col justify-between gap-6 text-right">
            {chapters.map((c) => (
              <li key={c.n} data-exp-num className="display text-lg text-champagne italic">
                {c.n}
              </li>
            ))}
          </ol>
          <div className="relative w-px bg-ivoire/15">
            <div data-exp-progress className="absolute inset-0 origin-top bg-champagne" />
          </div>
        </div>
      </div>
    </section>
  );
}
