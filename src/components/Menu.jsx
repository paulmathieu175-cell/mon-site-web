import { useRef, useState } from "react";
import Reveal from "./Reveal.jsx";
import { menu } from "../data/content.js";

const formatPrice = (p) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(p);

export default function Menu() {
  const categories = Object.keys(menu);
  const [active, setActive] = useState(categories[0]);
  const tabsRef = useRef([]);

  // Navigation au clavier entre les onglets (flèches gauche/droite)
  const onKeyDown = (e, i) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    const next = (i + dir + categories.length) % categories.length;
    setActive(categories[next]);
    tabsRef.current[next]?.focus();
  };

  return (
    <section id="carte" className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">La carte</p>
          <h2 className="title mt-4">Saveurs de saison</h2>
          <div className="gold-rule" />
        </Reveal>

        <Reveal delay={100}>
          <div role="tablist" aria-label="Catégories de la carte" className="mx-auto mt-10 flex max-w-full gap-2 overflow-x-auto pb-2 sm:justify-center">
            {categories.map((c, i) => (
              <button
                key={c}
                ref={(el) => (tabsRef.current[i] = el)}
                role="tab"
                id={`tab-${i}`}
                aria-selected={active === c}
                aria-controls="panneau-carte"
                tabIndex={active === c ? 0 : -1}
                onClick={() => setActive(c)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`shrink-0 rounded-full border px-6 py-2.5 text-sm tracking-wide transition duration-300 ${
                  active === c
                    ? "border-gold bg-gold text-ink"
                    : "border-line text-cream/75 hover:border-gold/60 hover:text-gold"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          id="panneau-carte"
          role="tabpanel"
          aria-labelledby={`tab-${categories.indexOf(active)}`}
          className="mx-auto mt-12 max-w-3xl"
        >
          <ul key={active} className="divide-y divide-line/70">
            {menu[active].map((item, i) => (
              <li
                key={item.name}
                className="group flex animate-fade-up items-start gap-4 py-6"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-xl font-semibold transition group-hover:text-gold sm:text-2xl">{item.name}</h3>
                    <span aria-hidden="true" className="hidden flex-1 border-b border-dotted border-gold/30 sm:block" />
                  </div>
                  <p className="mt-1 text-sm text-mist">{item.desc}</p>
                </div>
                <p className="font-display text-xl whitespace-nowrap text-gold sm:text-2xl">{formatPrice(item.price)}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-xs text-mist">
            Prix nets en euros, service compris. Menu dégustation sur demande. Liste des allergènes disponible auprès de notre équipe.
          </p>
        </div>
      </div>
    </section>
  );
}
