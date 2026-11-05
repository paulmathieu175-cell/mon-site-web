"use client";

import { useRef } from "react";
import SplitReveal from "../ui/SplitReveal";
import ImageReveal from "../ui/ImageReveal";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/** SCÈNE 02 — L'univers : grande page éditoriale, compositions superposées. */
export default function Univers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const q = gsap.utils.selector(root);
        // Idéogramme géant qui glisse lentement en arrière-plan
        gsap.fromTo(q("[data-kanji]"), { yPercent: -15 }, { yPercent: 25, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
        // Couches à vitesses différentes (profondeur)
        gsap.fromTo(q("[data-depth='1']"), { y: 120 }, { y: -120, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(q("[data-depth='2']"), { y: 40 }, { y: -40, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.from(q("[data-rule]"), { scaleX: 0, transformOrigin: "left", duration: 1.6, ease: "yaka", scrollTrigger: { trigger: q("[data-rule]")[0], start: "top 90%", once: true } });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="univers" className="relative overflow-hidden bg-noir py-28 sm:py-40">
      <span
        data-kanji
        aria-hidden="true"
        className="pointer-events-none absolute top-0 -right-[8vw] font-jp text-[70vw] leading-none text-transparent select-none sm:text-[48vw]"
        style={{ WebkitTextStroke: "1px rgba(216,197,163,.09)" }}
      >
        夜
      </span>

      <div className="gutter relative">
        <div className="flex items-center gap-6">
          <p className="label text-champagne">02 — L&apos;univers</p>
          <div data-rule className="h-px flex-1 bg-champagne/25" />
        </div>

        <SplitReveal as="h2" className="display mt-10 text-[clamp(3.4rem,11vw,11.5rem)] leading-[0.88] text-ivoire">
          Une maison
          <br />
          née de la <em className="text-champagne">nuit.</em>
        </SplitReveal>

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-6">
          {/* Texte */}
          <div className="md:col-span-4 md:col-start-1 md:pt-24">
            <SplitReveal className="display text-2xl leading-snug text-ivoire/90 italic sm:text-3xl">
              Derrière une porte sans enseigne, la ville se tait. Les lumières baissent, le bois sombre et l&apos;or prennent le relais.
            </SplitReveal>
            <SplitReveal className="mt-8 max-w-sm text-[0.95rem] leading-relaxed text-ivoire/60" delay={0.15}>
              YAKA est né d&apos;une idée simple : faire dialoguer la précision des cuisines japonaises et la générosité de la
              table parisienne. Le feu du binchotan, le geste du découpeur, le vin et le saké se répondent jusqu&apos;au bout
              de la nuit.
            </SplitReveal>
            <div className="mt-10 grid max-w-sm grid-cols-2 gap-6 border-t border-trait pt-6">
              <div>
                <p className="display text-5xl text-champagne">48</p>
                <p className="label mt-2 text-ivoire/50">Couverts</p>
              </div>
              <div>
                <p className="display text-5xl text-champagne">02h</p>
                <p className="label mt-2 text-ivoire/50">Dernier verre</p>
              </div>
            </div>
          </div>

          {/* Compositions photographiques superposées */}
          <div className="relative md:col-span-7 md:col-start-6">
            <div data-depth="2">
              <ImageReveal name="salon" ratio="4 / 5" sizes="(min-width: 768px) 55vw, 100vw" className="ml-auto w-[88%] md:w-[82%]" />
            </div>
            <div data-depth="1" className="absolute -bottom-16 left-0 z-10 w-[52%] md:-bottom-24 md:-left-10 md:w-[46%]">
              <ImageReveal name="whisky" ratio="3 / 4" sizes="(min-width: 768px) 25vw, 50vw" from="top" delay={0.2} className="shadow-[0_40px_80px_-20px_rgba(0,0,0,.8)]" />
              <p className="label mt-4 text-ivoire/50">Le comptoir — après minuit</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
