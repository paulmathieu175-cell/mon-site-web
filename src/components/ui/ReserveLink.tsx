import { getReservation } from "@/config/site";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { children: React.ReactNode };

/**
 * Lien de réservation réel : module en ligne si configuré (site.reservationUrl),
 * sinon appel téléphonique. Aucun faux formulaire.
 */
export default function ReserveLink({ children, ...rest }: Props) {
  const r = getReservation();
  return (
    <a
      href={r.href}
      {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      data-cursor={r.mode === "phone" ? "Appeler" : "Réserver"}
      {...rest}
    >
      {children}
      {r.external && <span className="sr-only"> (s'ouvre dans un nouvel onglet)</span>}
    </a>
  );
}
