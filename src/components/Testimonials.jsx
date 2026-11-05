import { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";
import Icon from "./Icon.jsx";
import { testimonials } from "../data/content.js";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
  const go = (d) => setIndex((i) => (i + d + count) % count);

  // Défilement automatique (en pause au survol / focus)
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  return (
    <section id="avis" className="relative overflow-hidden bg-ink-2 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 font-display text-[18rem] leading-none text-gold/5 select-none">
        “
      </div>
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Témoignages</p>
          <h2 className="title mt-4">Ils nous ont fait confiance</h2>
          <div className="gold-rule" />
        </Reveal>

        <Reveal
          delay={150}
          className="mx-auto mt-12 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative overflow-hidden" aria-roledescription="carrousel" aria-label="Avis clients">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <figure
                  key={t.name}
                  className="w-full shrink-0 px-2 text-center sm:px-10"
                  aria-hidden={i !== index}
                  role="group"
                  aria-roledescription="avis"
                  aria-label={`${i + 1} sur ${count}`}
                >
                  <div className="flex justify-center gap-1 text-gold" aria-label={`${t.rating} étoiles sur 5`}>
                    {Array.from({ length: t.rating }).map((_, k) => (
                      <Icon key={k} name="star" filled className="h-5 w-5" />
                    ))}
                  </div>
                  <blockquote className="mt-6 font-display text-2xl leading-snug text-cream italic sm:text-3xl">
                    « {t.text} »
                  </blockquote>
                  <figcaption className="mt-8">
                    <p className="font-semibold text-gold">{t.name}</p>
                    <p className="text-sm text-mist">{t.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button type="button" onClick={() => go(-1)} aria-label="Avis précédent" className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-gold transition hover:border-gold hover:bg-gold/10">
              <Icon name="chevronLeft" className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Afficher l'avis ${i + 1}`}
                  aria-current={i === index}
                  className="flex h-6 items-center"
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-gold" : "w-2 bg-line hover:bg-mist"}`} />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => go(1)} aria-label="Avis suivant" className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-gold transition hover:border-gold hover:bg-gold/10">
              <Icon name="chevronRight" className="h-5 w-5" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
