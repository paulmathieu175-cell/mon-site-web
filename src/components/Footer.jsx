import Icon from "./Icon.jsx";
import { navLinks, site } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="container-x grid gap-10 py-14 text-center sm:grid-cols-3 sm:text-left">
        <div>
          <p className="font-display text-3xl text-gold">{site.name}</p>
          <p className="mt-3 text-sm text-mist">{site.tagline}. Cuisine raffinée de saison, servie avec élégance.</p>
        </div>
        <nav aria-label="Liens du pied de page">
          <p className="eyebrow">Navigation</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-cream/70 transition hover:text-gold">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow">Suivez-nous</p>
          <div className="mt-4 flex justify-center gap-3 sm:justify-start">
            {[
              { name: "instagram", href: site.instagram, label: "Instagram" },
              { name: "facebook", href: site.facebook, label: "Facebook" },
            ].map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-gold transition hover:border-gold hover:bg-gold hover:text-ink">
                <Icon name={s.name} className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm text-mist">{site.address}</p>
        </div>
      </div>
      <div className="border-t border-line py-6 text-center text-xs text-mist">
        © {new Date().getFullYear()} {site.name}. Tous droits réservés.
      </div>
    </footer>
  );
}
