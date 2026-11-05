import type { ImageName } from "./images";

// Carte d'exemple — remplacez plats, descriptions et prix par les vôtres.
export type Dish = { name: string; desc: string; price: string; image?: ImageName; signature?: boolean };
export type MenuSection = { id: string; title: string; jp: string; intro: string; dishes: Dish[] };

export const menu: MenuSection[] = [
  {
    id: "ouverture",
    title: "Pour ouvrir",
    jp: "前菜",
    intro: "À partager, pour que la soirée commence.",
    dishes: [
      { name: "Edamame fumés", desc: "Fleur de sel au yuzu, piment d'Espelette", price: "9" },
      { name: "Gyozas croustillants", desc: "Wagyu, ciboulette chinoise, vinaigre noir", price: "18", image: "gyoza", signature: true },
      { name: "Tataki de thon rouge", desc: "Ponzu à la truffe, radis noir, sésame torréfié", price: "26", image: "sushi-dark" },
      { name: "Tartare de bœuf YAKA", desc: "Jaune d'œuf mariné au soja, poire nashi, shiso", price: "24" },
    ],
  },
  {
    id: "crus",
    title: "Crus & sushis",
    jp: "寿司",
    intro: "Poissons de nos côtes, découpés à la minute.",
    dishes: [
      { name: "Nigiri toro", desc: "Ventrèche de thon, braise de binchotan", price: "16", image: "nigiri", signature: true },
      { name: "Sashimi de Saint-Jacques", desc: "Agrumes de Menton, huile de nori", price: "28", image: "sushi-slate" },
      { name: "Maki crabe royal", desc: "Avocat, mayonnaise au miso blanc", price: "27", image: "sushi-board" },
      { name: "Sélection du chef", desc: "Douze pièces au gré de la marée", price: "58", image: "sushi-slate" },
    ],
  },
  {
    id: "robata",
    title: "Robata & plats",
    jp: "炉端",
    intro: "Le feu du charbon japonais, la rigueur de la cuisine française.",
    dishes: [
      { name: "Black cod au miso", desc: "Mariné 72 heures, gingembre confit", price: "46", image: "table", signature: true },
      { name: "Bœuf wagyu A5", desc: "Grillé au binchotan, sauce wasabi frais", price: "89", image: "table" },
      { name: "Ramen de minuit", desc: "Bouillon tonkotsu, œuf mariné, chashu", price: "29", image: "ramen" },
      { name: "Nouilles sautées au homard", desc: "Beurre noisette, sansho, ciboule", price: "48", image: "noodles" },
    ],
  },
  {
    id: "douceurs",
    title: "Douceurs",
    jp: "甘味",
    intro: "Une dernière note, tout en délicatesse.",
    dishes: [
      { name: "Mochi glacés", desc: "Sésame noir, matcha, fruit de la passion", price: "14" },
      { name: "Sphère chocolat & yuzu", desc: "Grand cru 70 %, sauce chaude au saké", price: "17", signature: true },
      { name: "Cheesecake japonais", desc: "Léger comme un nuage, coulis de fraises", price: "15" },
    ],
  },
  {
    id: "bar",
    title: "Le bar",
    jp: "酒",
    intro: "Après le dîner, la nuit continue au comptoir.",
    dishes: [
      { name: "Nuit d'Orient", desc: "Whisky japonais, umeshu, bitter fumé", price: "19", image: "whisky", signature: true },
      { name: "Champagne Rose", desc: "Gin, sirop de litchi, champagne, pétales", price: "21", image: "cocktail-2" },
      { name: "Yuzu Sour", desc: "Saké, yuzu, blanc d'œuf, poivre de Timut", price: "17", image: "cocktail" },
      { name: "Sans alcool — Jardin de Kyoto", desc: "Thé genmaicha, poire, citronnelle", price: "13" },
    ],
  },
];

/** Plats mis en avant dans la section « Signatures » de l'accueil. */
export const signatures: { name: string; desc: string; image: ImageName }[] = [
  { name: "Nigiri toro", desc: "Ventrèche de thon, braise de binchotan", image: "nigiri" },
  { name: "Black cod au miso", desc: "Mariné soixante-douze heures", image: "table" },
  { name: "Ramen de minuit", desc: "Bouillon tonkotsu, œuf mariné", image: "ramen" },
  { name: "Sélection du chef", desc: "Douze pièces au gré de la marée", image: "sushi-slate" },
  { name: "Nuit d'Orient", desc: "Whisky japonais, umeshu, bitter fumé", image: "whisky" },
];
