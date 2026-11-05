"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);
  // Courbe signature : départ décidé, arrivée très douce.
  CustomEase.create("yaka", "0.65, 0.05, 0, 1");
  gsap.defaults({ ease: "expo.out", duration: 1.2 });
  // Évite les recalculs quand la barre d'adresse mobile apparaît/disparaît.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Condition commune : animations seulement si l'utilisateur ne demande pas de réduire le mouvement. */
export const MOTION = "(prefers-reduced-motion: no-preference)";
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
