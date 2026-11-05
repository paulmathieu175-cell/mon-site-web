import Reveal from "./Reveal.jsx";
import Icon from "./Icon.jsx";
import { services } from "../data/content.js";

export default function Services() {
  return (
    <section id="services" className="relative bg-ink-2 py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Nos services</p>
          <h2 className="title mt-4">Une expérience sur mesure</h2>
          <div className="gold-rule" />
          <p className="text-cream/70">
            Que ce soit pour un dîner intime, un événement d'exception ou un plaisir à emporter,
            Yanka s'adapte à toutes vos envies.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 120}
              as="article"
              className="group relative overflow-hidden rounded-2xl border border-line bg-ink p-8 transition duration-500 hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_20px_50px_-20px_color-mix(in_srgb,var(--color-gold)_40%,transparent)]"
            >
              <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition duration-500 group-hover:scale-x-100" />
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold transition duration-500 group-hover:bg-gold group-hover:text-ink">
                <Icon name={s.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/65">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
