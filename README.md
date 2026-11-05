# Yanka — Site du restaurant

Site vitrine moderne (noir & or) réalisé avec **React 19**, **Tailwind CSS 4** et **Vite**.

## Sections
Accueil · Présentation · Services · La carte (onglets) · Témoignages (carrousel) · Contact & réservation (formulaire validé) · Pied de page.

## Prévisualiser sur votre ordinateur
Prérequis : [Node.js](https://nodejs.org) 20 ou plus.

```bash
npm install      # une seule fois
npm run dev      # puis ouvrez http://localhost:5173
```

Pour tester la version finale optimisée :
```bash
npm run build
npm run preview  # http://localhost:4173
```

## Personnaliser
Presque tout le contenu se trouve dans **`src/data/content.js`** : nom, téléphone, e-mail, adresse,
horaires, carte et prix, services, avis clients.
⚠️ Les avis fournis sont des exemples : remplacez-les par de vrais avis.
Pensez aussi à mettre à jour les informations Google (bloc `application/ld+json`) dans `index.html`.

Couleurs et polices : bloc `@theme` dans `src/index.css`.

## Recevoir les messages du formulaire
Sans configuration, le formulaire valide les champs et affiche une confirmation, mais n'envoie rien.
1. Créez un formulaire gratuit sur [formspree.io](https://formspree.io) et copiez son identifiant (ex. `xyzabcd`).
2. En local : créez un fichier `.env` contenant `VITE_FORMSPREE_ID=xyzabcd`.
3. Sur GitHub : *Settings → Secrets and variables → Actions → Variables* → ajoutez `VITE_FORMSPREE_ID`.

## Publier gratuitement
### GitHub Pages (déjà configuré)
1. Fusionnez cette branche dans `main`.
2. Sur GitHub : *Settings → Pages → Source : **GitHub Actions***.
3. Chaque mise à jour de `main` publie le site sur `https://<votre-pseudo>.github.io/mon-site-web/`.

### Alternatives : Netlify ou Vercel
Importez le dépôt sur [netlify.com](https://netlify.com) ou [vercel.com](https://vercel.com) :
commande de build `npm run build`, dossier `dist`. Les deux offrent un nom de domaine gratuit
et permettent de brancher votre propre domaine (ex. `yanka.fr`).

## Structure
```
index.html              SEO : titre, description, Open Graph, données structurées
public/                 favicon, robots.txt, en-têtes de sécurité (_headers pour Netlify)
src/data/content.js     tout le contenu modifiable
src/components/         Header, Hero, About, Services, Menu, Testimonials, Contact, Footer…
src/hooks/useReveal.js  animations d'apparition au défilement
.github/workflows/      publication automatique sur GitHub Pages
```
