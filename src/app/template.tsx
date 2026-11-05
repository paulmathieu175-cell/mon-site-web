"use client";

import { useEffect } from "react";
import { usePageTransition } from "@/components/providers/TransitionProvider";

/** Rejoué à chaque changement de page : termine la transition (ouverture du rideau). */
export default function Template({ children }: { children: React.ReactNode }) {
  const { pageEnter } = usePageTransition();
  useEffect(() => {
    pageEnter();
  }, [pageEnter]);
  return <>{children}</>;
}
