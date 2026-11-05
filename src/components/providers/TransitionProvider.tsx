"use client";

import { createContext, useCallback, useContext, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";

type Ctx = { navigate: (href: string) => void; pageEnter: () => void };
const TransitionContext = createContext<Ctx>({ navigate: () => {}, pageEnter: () => {} });
export const usePageTransition = () => useContext(TransitionContext);

const norm = (p: string) => (p.endsWith("/") ? p : p + "/");
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Rideau de transition entre les pages + gestion des ancres avec défilement doux. */
export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const pendingHash = useRef<string | null>(null);

  const navigate = useCallback(
    (href: string) => {
      const [path, hash] = href.split("#");
      const targetPath = norm(path || pathname);
      if (targetPath === norm(pathname)) {
        if (hash) {
          history.replaceState(null, "", `#${hash}`);
          scrollToTarget(`#${hash}`);
        } else scrollToTarget(0);
        return;
      }
      pendingHash.current = hash ? `#${hash}` : null;
      if (reduced() || !curtain.current || covering.current) {
        router.push(href);
        return;
      }
      covering.current = true;
      const el = curtain.current;
      gsap
        .timeline({ onComplete: () => router.push(path) })
        .set(el, { display: "flex", clipPath: "inset(100% 0% 0% 0%)" })
        .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "yaka" })
        .fromTo(el.querySelector("[data-curtain-mark]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.45");
    },
    [pathname, router]
  );

  const pageEnter = useCallback(() => {
    const hash = pendingHash.current ?? (window.location.hash || null);
    pendingHash.current = null;
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (hash && document.querySelector(hash)) scrollToTarget(hash, true);
      else scrollToTarget(0, true);
      const el = curtain.current;
      if (!covering.current || !el) return;
      gsap
        .timeline({
          onComplete: () => {
            covering.current = false;
            gsap.set(el, { display: "none" });
          },
        })
        .to(el.querySelector("[data-curtain-mark]"), { autoAlpha: 0, y: -30, duration: 0.5, ease: "power2.in" })
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "yaka" }, "-=0.15");
    });
  }, []);

  return (
    <TransitionContext.Provider value={{ navigate, pageEnter }}>
      {children}
      <div
        ref={curtain}
        aria-hidden="true"
        className="fixed inset-0 z-[95] hidden items-center justify-center bg-bordeaux"
        style={{ background: "radial-gradient(120% 90% at 50% 100%, #391B20 0%, #120a0b 55%, #080808 100%)" }}
      >
        <div data-curtain-mark className="flex flex-col items-center gap-4">
          <span className="font-jp text-5xl text-champagne">夜</span>
          <span className="label text-champagne/70">YAKA</span>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
