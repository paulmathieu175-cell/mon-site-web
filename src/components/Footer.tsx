"use client";

import { useRef } from "react";
import TLink from "./ui/TLink";
import Roll from "./ui/Roll";
import ReserveLink from "./ui/ReserveLink";
import { navigation, site } from "@/config/site";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/** SCÈNE 07 — Le footer, avec le logo YAKA géant sur toute la largeur. */
export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const q = gsap.utils.selector(ref);
        gsap.from(q("[data-footer-letter]"), {
          yPercent: 100,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: q("[data-footer-word]")[0], start: "top bottom", end: "bottom bottom", scrub: 1 },
        });
        gsap.from(q("[data-footer-col]"), {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.2,
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        });
      });
    },
    { scope: ref }
  );

  const year = new Date().getFullYear();

  return (
    <footer ref={ref} id="contact" className="relative overflow-hidden border-t border-trait bg-noir pt-24 sm:pt-32">
      <div className="gutter grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div data-footer-col>
          <p className="label mb-5 text-champagne/60">Adresse</p>
          <address className="not-italic leading-relaxed text-ivoire/80">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
        </div>
        <div data-footer-col>
          <p className="label mb-5 text-champagne/60">Horaires</p>
          <dl className="space-y-3 text-ivoire/80">
            {site.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd className="text-ivoire/50">
                  {h.time}
                  {"note" in h && h.note ? <span className="block text-xs">{h.note}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div data-footer-col>
          <p className="label mb-5 text-champagne/60">Contact</p>
          <ul className="space-y-2 text-ivoire/80">
            <li>
              <a href={`tel:${site.phoneHref}`} className="group">
                <Roll text={site.phone} />
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="group break-all">
                <Roll text={site.email} />
              </a>
            </li>
            {site.instagram && (
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="group">
                  <Roll text="Instagram" />
                </a>
              </li>
            )}
            {site.whatsapp && (
              <li>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="group">
                  <Roll text="WhatsApp" />
                </a>
              </li>
            )}
          </ul>
        </div>
        <nav data-footer-col aria-label="Navigation secondaire">
          <p className="label mb-5 text-champagne/60">Naviguer</p>
          <ul className="grid grid-cols-2 gap-2 text-ivoire/80 lg:grid-cols-1">
            {navigation.map((n) => (
              <li key={n.href}>
                <TLink href={n.href} className="group">
                  <Roll text={n.label} />
                </TLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="gutter mt-16 flex flex-col items-start justify-between gap-6 border-t border-trait pt-8 sm:flex-row sm:items-center">
        <ReserveLink className="group display inline-flex items-center gap-4 text-3xl text-champagne italic sm:text-4xl">
          Réserver une table
          <span className="text-xl not-italic transition-transform duration-500 group-hover:translate-x-2" aria-hidden="true">
            →
          </span>
        </ReserveLink>
        <p className="label text-ivoire/40">
          <span className="font-jp tracking-normal">夜</span> — {site.kanjiReading}
        </p>
      </div>

      <div data-footer-word aria-hidden="true" className="mt-10 overflow-hidden select-none">
        <svg viewBox="0 0 1000 245" className="block w-full text-champagne">
          <defs>
            <linearGradient id="footer-gold" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#8a7350" />
              <stop offset=".45" stopColor="#F3EDE2" />
              <stop offset="1" stopColor="#6f5b3f" />
            </linearGradient>
          </defs>
          {["Y", "A", "K", "A"].map((l, i) => (
            <text
              key={i}
              data-footer-letter
              x={125 + i * 250}
              y="232"
              textAnchor="middle"
              fill="url(#footer-gold)"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 330 }}
            >
              {l}
            </text>
          ))}
        </svg>
      </div>

      <div className="gutter flex flex-col gap-2 border-t border-trait py-6 text-xs text-ivoire/40 sm:flex-row sm:justify-between">
        <p>© {year} YAKA — Restaurant & bar, Paris.</p>
        <p>Photographies : Unsplash (images d'illustration).</p>
      </div>
    </footer>
  );
}
