import { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";
import { useInView } from "../hooks/useReveal.js";
import { stats } from "../data/content.js";

function Counter({ value, suffix }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1600, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="presentation" className="relative py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        {/* Visuel décoratif */}
        <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-md">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full border border-gold/40" />
          <div className="relative h-full overflow-hidden rounded-t-full bg-gradient-to-b from-ink-3 via-ink-2 to-ink">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,color-mix(in_srgb,var(--color-gold)_35%,transparent),transparent_60%)]" />
            <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full text-gold" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth="1" opacity=".85">
                <ellipse cx="100" cy="150" rx="70" ry="18" />
                <ellipse cx="100" cy="150" rx="45" ry="11" opacity=".6" />
                <path d="M60 148c0-30 18-52 40-52s40 22 40 52" />
                <path d="M100 96v-8M94 86h12" />
              </g>
              <text x="100" y="215" textAnchor="middle" className="fill-gold font-display" fontSize="14" letterSpacing="6">
                YANKA
              </text>
            </svg>
          </div>
          <div className="animate-float absolute -right-2 bottom-10 rounded-2xl border border-line bg-ink-2/90 px-5 py-4 shadow-2xl backdrop-blur sm:-right-8">
            <p className="font-display text-3xl text-gold">★ 4,9</p>
            <p className="text-xs text-mist">Note moyenne clients</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">Notre histoire</p>
            <h2 className="title mt-4">
              L'art de recevoir,
              <br />
              <em className="text-gold">avec passion</em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-6 leading-relaxed text-cream/75">
              Né d'un rêve simple — partager le goût de l'exception — Yanka vous accueille dans un écrin
              noir et or, où chaque détail est pensé pour votre plaisir. Notre chef compose une cuisine
              créative, ancrée dans le terroir et inspirée par ses voyages.
            </p>
            <p className="mt-4 leading-relaxed text-cream/75">
              Nous travaillons main dans la main avec des producteurs locaux pour vous proposer des produits
              frais, de saison, et une carte qui se renouvelle au rythme de la nature.
            </p>
          </Reveal>
          <Reveal delay={300} className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl font-semibold text-gold sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs leading-snug text-mist sm:text-sm">{s.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
