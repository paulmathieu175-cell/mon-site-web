# YAKA — site officiel

Expérience web immersive pour YAKA, restaurant et bar à Paris : noir profond, lumières dorées, touches japonaises.

**Stack :** Next.js 16 (export statique) · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger + SplitText · Lenis.

## La direction artistique

- **Palette :** noir `#080808`, charbon `#171512`, champagne `#D8C5A3`, ivoire `#F3EDE2`, bordeaux `#391B20`.
- **Typographies (auto-hébergées) :** Cormorant (titres, très fins, italiques), Manrope (étiquettes en capitales espacées), Shippori Mincho pour les idéogrammes.
- **Signe :** 夜 (*yoru*, « la nuit »), utilisé comme sceau, en filigrane géant et dans les transitions.

## Les scènes

| Scène | Contenu et animations |
|---|---|
| Intro | Écran noir, lettres YAKA floutées qui montent, halo, balayage de lumière, ouverture par masque. Elle attend l'image du hero (2,4 s max) et passe en version courte si elle a déjà été vue pendant la visite. |
| 01 L'entrée | Hero plein écran, logo géant lettre par lettre, zoom d'ouverture, halo doré qui dérive, parallax au défilement, bouton magnétique, indicateur de défilement. |
| 02 L'univers | Titre immense révélé ligne par ligne, photos superposées à vitesses différentes, idéogramme en filigrane. |
| 03 L'expérience | Section épinglée en 4 chapitres : chaque image se dévoile par masque pendant que la précédente recule, avec un zoom continu et une barre de progression. |
| 04 La gastronomie | Composition asymétrique, puis défilement horizontal des signatures sur ordinateur (glissement natif sur mobile). |
| 05 La galerie | Zoom cinématographique (une fenêtre s'ouvre jusqu'au plein écran), colonnes en parallax, survol, visionneuse au clavier. |
| 06 La réservation | « Vivez l'expérience YAKA » lettre par lettre, grand bouton rond magnétique. |
| 07 Le footer | Logo YAKA sur toute la largeur, qui monte au défilement. |
| Page « La carte » | Navigation collante, plats révélés au défilement, photo qui suit le curseur au survol d'un plat. |

Partout : menu plein écran, curseur personnalisé (ordinateur), transitions de page par rideau, liens à lettres qui roulent.
Si l'appareil demande de **réduire les animations**, il n'y a ni intro, ni défilement inertiel, ni scènes épinglées : le contenu s'affiche simplement.

## Prévisualiser

```bash
npm install
npm run dev          # http://localhost:3000
```

Version finale : `npm run build` produit le site dans `out/`, puis `npm start` le sert localement.

## Personnaliser

- **Coordonnées, horaires, réseaux, lien de réservation :** `src/config/site.ts`. Les valeurs « À REMPLACER » sont fictives.
- **Carte et plats signatures :** `src/data/menu.ts` (carte d'exemple).
- **Photos :** déposez vos images dans `public/images/` en deux largeurs, `nom-900.webp` et `nom-1800.webp`, puis déclarez-les dans `src/data/images.ts`. Les photos actuelles sont des illustrations Unsplash (voir `CREDITS.md`).
- **Vidéo du hero :** placez `public/videos/hero.mp4` et renseignez `HERO_VIDEO` dans `src/components/scenes/Hero.tsx`.

### Réservation : aucune fonctionnalité simulée

Les boutons « Réserver » ouvrent le **lien de votre module de réservation** (Zenchef, TheFork, SevenRooms…) s'il est
renseigné dans `reservationUrl`, ou dans la variable GitHub `NEXT_PUBLIC_RESERVATION_URL`.
Sans lien, ils lancent un **appel téléphonique**.

## Publier gratuitement

**GitHub Pages (déjà configuré) :** fusionnez dans `main`, puis *Settings → Pages → Source : GitHub Actions*.
Le site sera en ligne sur `https://<compte>.github.io/mon-site-web/`.

**Vercel ou Netlify :** importez le dépôt. Commande de build : `npm run build`. Dossier publié : `out`. Vous pourrez y brancher votre nom de domaine.
