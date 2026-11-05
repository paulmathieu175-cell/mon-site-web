// ============================================================================
//  YAKA — informations du restaurant
//  ⚠️ Remplacez les valeurs marquées « À REMPLACER » avant la mise en ligne.
// ============================================================================

export const site = {
  name: "YAKA",
  kanji: "夜",
  kanjiReading: "yoru — la nuit",
  tagline: "Le feu discret des nuits parisiennes",
  description:
    "YAKA, restaurant et bar à Paris. Une cuisine où l'Asie rencontre la France, servie dans la pénombre dorée d'une maison de nuit. Réservez votre table.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://paulmathieu175-cell.github.io/mon-site-web",

  address: {
    street: "Adresse à venir", // À REMPLACER, ex. « 12 rue de Ponthieu »
    postalCode: "75008", // À REMPLACER
    city: "Paris",
  },
  phone: "+33 1 00 00 00 00", // À REMPLACER
  phoneHref: "+33100000000", // À REMPLACER (sans espaces)
  email: "reservation@example.com", // À REMPLACER
  instagram: "", // ex. "https://www.instagram.com/yaka.paris"
  whatsapp: "", // ex. "https://wa.me/33600000000"

  /**
   * Lien de réservation en ligne (Zenchef, TheFork, SevenRooms, Resy…).
   * Laissez vide tant qu'aucun module n'est branché : les boutons
   * « Réserver » ouvriront alors un appel téléphonique, jamais un faux formulaire.
   * Peut aussi être défini via la variable NEXT_PUBLIC_RESERVATION_URL.
   */
  reservationUrl: process.env.NEXT_PUBLIC_RESERVATION_URL || "",

  hours: [
    { days: "Mardi — Samedi", time: "19h00 — 02h00", note: "Dernière commande 23h30" },
    { days: "Dimanche — Lundi", time: "Fermé" },
  ],
} as const;

export type Reservation = { href: string; external: boolean; mode: "online" | "phone" };

/** Où mène le bouton « Réserver » : module en ligne si configuré, sinon téléphone. */
export function getReservation(): Reservation {
  if (site.reservationUrl) return { href: site.reservationUrl, external: true, mode: "online" };
  return { href: `tel:${site.phoneHref}`, external: false, mode: "phone" };
}

export const navigation = [
  { href: "/", label: "Accueil", image: "bar" },
  { href: "/#univers", label: "L'univers", image: "salon" },
  { href: "/carte/", label: "La carte", image: "nigiri" },
  { href: "/#galerie", label: "Galerie", image: "chef" },
  { href: "/#reservation", label: "Réservation", image: "cocktail" },
  { href: "/#contact", label: "Contact", image: "paris" },
] as const;
