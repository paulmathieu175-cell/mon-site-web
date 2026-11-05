import { useEffect, useState } from "react";
import { navLinks, site } from "../data/content.js";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#accueil");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Surligne le lien de la section visible
  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Bloque le défilement quand le menu mobile est ouvert, Échap pour fermer
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-line/70 bg-ink/85 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <a href="#accueil" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-3xl font-semibold tracking-wide text-gold transition group-hover:text-gold-light">
            {site.name}
          </span>
          <span className="hidden text-[10px] tracking-[0.3em] text-mist uppercase sm:inline">Restaurant</span>
        </a>

        <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
          {navLinks.slice(0, -1).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative text-sm tracking-wide transition hover:text-gold after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300 ${
                active === l.href ? "text-gold after:w-full" : "text-cream/80 after:w-0 hover:after:w-full"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-gold !px-5 !py-2.5">
            Réserver
          </a>
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-4 w-6">
            <span className={`absolute left-0 h-px w-6 bg-gold transition duration-300 ${open ? "top-2 rotate-45" : "top-0"}`} />
            <span className={`absolute top-2 left-0 h-px w-6 bg-gold transition duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-px w-6 bg-gold transition duration-300 ${open ? "top-2 -rotate-45" : "top-4"}`} />
          </span>
        </button>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        className={`fixed inset-x-0 top-20 bottom-0 bg-ink/97 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        style={{ height: "calc(100dvh - 5rem)" }}
      >
        <nav aria-label="Navigation mobile" className="flex h-full flex-col items-center justify-center gap-7 pb-20">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-display text-3xl transition-all duration-500 hover:text-gold ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              } ${active === l.href ? "text-gold" : "text-cream"}`}
              style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
            >
              {l.label}
            </a>
          ))}
          <a href={`tel:${site.phoneHref}`} className="btn-outline mt-4" onClick={() => setOpen(false)}>
            {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
