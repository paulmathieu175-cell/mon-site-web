"use client";

import { useRef } from "react";
import Img from "../ui/Img";
import Magnetic from "../ui/Magnetic";
import ReserveLink from "../ui/ReserveLink";
import { getReservation, site } from "@/config/site";
import { gsap, MOTION, SplitText, useGSAP } from "@/lib/gsap";

/** SCÈNE 06 — La réservation. */
export default function Reservation() {
  const root = useRef<HTMLElement>(null);
  const r = getReservation();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const q = gsap.utils.selector(root);
        const title = q("[data-resa-title]")[0] as HTMLElement;
        const split = SplitText.create(title, {
          type: "lines,chars",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.chars, {
              yPercent: 120,
              rotateX: -80,
              transformOrigin: "50% 100%",
              stagger: { each: 0.035, from: "center" },
              duration: 1.6,
              ease: "expo.out",
              scrollTrigger: { trigger: title, start: "top 80%", once: true },
            });
          },
        });
        gsap.fromTo(q("[data-resa-bg]"), { scale: 1.3, yPercent: -10 }, { scale: 1, yPercent: 10, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.from(q("[data-resa-fade]"), { autoAlpha: 0, y: 30, stagger: 0.12, duration: 1.4, scrollTrigger: { trigger: title, start: "top 60%", once: true } });
        gsap.from(q("[data-resa-btn]"), { scale: 0.6, autoAlpha: 0, duration: 1.6, ease: "elastic.out(1, 0.6)", scrollTrigger: { trigger: title, start: "top 55%", once: true } });
        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="reservation" className="relative overflow-hidden bg-noir py-32 sm:py-48">
      <div data-resa-bg className="absolute inset-0 opacity-30">
        <Img name="cocktail-2" sizes="100vw" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_60%,rgba(57,27,32,.85),rgba(8,8,8,.96)_70%)]" />
      <svg aria-hidden="true" viewBox="0 0 200 200" className="animate-spin-slow pointer-events-none absolute top-1/2 left-1/2 h-[140vmin] w-[140vmin] -translate-x-1/2 -translate-y-1/2 text-champagne/15">
        <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeWidth=".25" strokeDasharray=".6 2.4" />
        <circle cx="100" cy="100" r="72" fill="none" stroke="currentColor" strokeWidth=".15" />
      </svg>

      <div className="gutter relative text-center">
        <p data-resa-fade className="label text-champagne">
          06 — Réservation
        </p>
        <h2 data-resa-title className="display mx-auto mt-10 text-[clamp(3rem,10.5vw,11rem)] leading-[0.9] uppercase [perspective:800px]">
          Vivez
          <br />
          <em className="text-champagne normal-case">l&apos;expérience</em>
          <br />
          YAKA
        </h2>

        <div data-resa-btn className="mt-14 flex justify-center sm:mt-20">
          <Magnetic strength={0.4}>
            <ReserveLink className="group relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border border-champagne/60 text-champagne transition-colors duration-500 hover:text-noir sm:h-52 sm:w-52">
              <span className="absolute inset-0 scale-0 rounded-full bg-champagne transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-100" />
              <span className="relative flex flex-col items-center gap-2">
                <span className="font-jp text-2xl">予約</span>
                <span className="label">Réserver</span>
              </span>
            </ReserveLink>
          </Magnetic>
        </div>

        <div data-resa-fade className="mx-auto mt-16 grid max-w-3xl gap-8 text-sm text-ivoire/70 sm:grid-cols-3">
          <div>
            <p className="label mb-2 text-champagne/60">Téléphone</p>
            <a href={`tel:${site.phoneHref}`} className="hover:text-champagne">
              {site.phone}
            </a>
          </div>
          <div>
            <p className="label mb-2 text-champagne/60">E-mail</p>
            <a href={`mailto:${site.email}`} className="break-all hover:text-champagne">
              {site.email}
            </a>
          </div>
          <div>
            <p className="label mb-2 text-champagne/60">Horaires</p>
            <p>{site.hours[0].days}</p>
            <p>{site.hours[0].time}</p>
          </div>
        </div>
        <p data-resa-fade className="mt-10 text-xs text-ivoire/40">
          {r.mode === "online"
            ? "Réservation en ligne via notre partenaire, confirmation immédiate."
            : "Réservations par téléphone ou par e-mail. Groupes et privatisations sur demande."}
        </p>
      </div>
    </section>
  );
}
