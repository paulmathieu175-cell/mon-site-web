import { useEffect, useState } from "react";
import { site } from "../data/content.js";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const delays = ["delay-0", "delay-150", "delay-300", "delay-500"];
  const step = (i) =>
    `transition-all duration-1000 ease-out ${delays[i]} ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`;

  return (
    <section id="accueil" className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
      {/* Décor : halos dorés + anneaux */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute right-[-10rem] bottom-[-10rem] h-[28rem] w-[28rem] rounded-full bg-gold-dark/10 blur-[100px]" />
        <svg className="animate-spin-slow absolute top-1/2 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 text-gold/10" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeWidth=".3" strokeDasharray="1 3" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth=".2" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-ink)_85%)]" />
      </div>

      <div className="container-x relative text-center">
        <p className={`eyebrow ${step(0)}`}>Cuisine raffinée · Depuis 2014</p>
        <h1 className={`mt-6 font-display text-6xl leading-[0.95] font-semibold sm:text-8xl lg:text-9xl ${step(1)}`}>
          <span className="text-gold-gradient">{site.name}</span>
        </h1>
        <div className={`gold-rule !my-8 !w-24 ${step(2)}`} />
        <p className={`mx-auto max-w-xl text-lg leading-relaxed font-light text-cream/80 sm:text-xl ${step(2)}`}>
          Une expérience gastronomique où l'élégance rencontre la générosité.
          Des produits d'exception, sublimés au fil des saisons.
        </p>
        <div className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row ${step(3)}`}>
          <a href="#contact" className="btn-gold w-full sm:w-auto">
            Réserver une table
          </a>
          <a href="#carte" className="btn-outline w-full sm:w-auto">
            Découvrir la carte
          </a>
        </div>
      </div>

      <a
        href="#presentation"
        aria-label="Faire défiler vers la présentation"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-mist uppercase transition hover:text-gold sm:flex"
      >
        Défiler
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="animate-float absolute inset-x-0 top-0 h-4 bg-gold" />
        </span>
      </a>
    </section>
  );
}
