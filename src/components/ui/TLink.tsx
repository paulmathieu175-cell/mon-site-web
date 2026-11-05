"use client";

import Link from "next/link";
import { usePageTransition } from "@/components/providers/TransitionProvider";

type Props = Omit<React.ComponentProps<typeof Link>, "href"> & { href: string };

/** Lien interne qui joue la transition de page (ou le défilement doux vers une ancre). */
export default function TLink({ href, onClick, children, ...rest }: Props) {
  const { navigate } = usePageTransition();
  return (
    <Link
      href={href}
      scroll={false}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
