import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href="#accueil"
      aria-label="Retour en haut de la page"
      className={`fixed right-4 bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink shadow-lg transition duration-500 hover:-translate-y-1 hover:bg-gold-light sm:right-6 sm:bottom-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Icon name="arrowUp" className="h-5 w-5" />
    </a>
  );
}
