import type { Metadata, Viewport } from "next";
import "@fontsource-variable/cormorant/wght.css";
import "@fontsource-variable/cormorant/wght-italic.css";
import "@fontsource-variable/manrope/wght.css";
import "@fontsource/shippori-mincho/500.css";
import "lenis/dist/lenis.css";
import "./globals.css";

import { site } from "@/config/site";
import TransitionProvider from "@/components/providers/TransitionProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Intro from "@/components/Intro";
import Header from "@/components/Header";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  metadataBase: new URL(site.url.endsWith("/") ? site.url : site.url + "/"),
  title: { default: "YAKA — Restaurant & bar à Paris", template: "%s — YAKA Paris" },
  description: site.description,
  keywords: ["restaurant Paris", "restaurant japonais Paris", "cuisine asiatique", "bar à cocktails Paris", "dîner chic Paris", "YAKA"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "YAKA",
    title: "YAKA — Le feu discret des nuits parisiennes",
    description: site.description,
    images: [{ url: "images/bar-1800.webp", width: 1800, height: 1350, alt: "Le bar de YAKA dans la pénombre dorée" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "icon.svg" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "YAKA",
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  servesCuisine: ["Japonaise", "Française contemporaine"],
  priceRange: "€€€",
  acceptsReservations: true,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressCountry: "FR",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "19:00", closes: "02:00" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <noscript>
          <style>{`.intro{display:none!important}header{opacity:1!important;visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#contenu" className="sr-only z-[200] bg-champagne px-4 py-2 text-noir focus:not-sr-only focus:fixed focus:top-4 focus:left-4">
          Aller au contenu
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <TransitionProvider>
          <SmoothScroll />
          <Intro />
          <Header />
          <main id="contenu">{children}</main>
          <Cursor />
        </TransitionProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
