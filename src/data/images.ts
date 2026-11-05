// Photographies libres de droits (licence Unsplash) — voir CREDITS.md.
// Chaque image existe en deux largeurs dans /public/images : 900 et 1800 px (WebP).

export const images = {
  bar: { alt: "Bar plongé dans la pénombre, rangées de bouteilles éclairées d'une lumière dorée", w: 1800, h: 1350 },
  salle: { alt: "Salle de restaurant sombre aux suspensions tamisées", w: 1800, h: 2718 },
  nigiri: { alt: "Nigiri de saumon tenu entre deux baguettes sur fond noir", w: 1800, h: 2250 },
  "sushi-slate": { alt: "Assortiment de sushis disposés sur une ardoise noire", w: 1800, h: 1200 },
  "sushi-dark": { alt: "Sushis et sauce soja sur une pierre sombre", w: 1800, h: 1200 },
  "sushi-board": { alt: "Planche de makis et gingembre dans une lumière feutrée", w: 1800, h: 1200 },
  cocktail: { alt: "Cocktail ambré garni de romarin sur un comptoir en bois", w: 1800, h: 1200 },
  "cocktail-2": { alt: "Cocktail aux fruits noirs et agrumes séchés sur fond sombre", w: 1800, h: 1312 },
  whisky: { alt: "Spiritueux versé sur un glaçon taillé, reflets d'ambre", w: 1800, h: 1202 },
  table: { alt: "Table dressée, verres de vin et assiette raffinée à la lueur des bougies", w: 1800, h: 1200 },
  chef: { alt: "Chef dressant une assiette sous des lampes en cuivre", w: 1800, h: 2770 },
  ramen: { alt: "Bol de ramen fumant au bouillon crémeux", w: 1800, h: 1202 },
  noodles: { alt: "Nouilles sautées et baguettes sur une assiette en bois", w: 1800, h: 1510 },
  paris: { alt: "Le pont Alexandre III et ses lampadaires au crépuscule, Paris", w: 1800, h: 1274 },
  salon: { alt: "Salon feutré éclairé de lanternes en papier, banquettes sombres et vue sur la ville", w: 1800, h: 1350 },
  lanterne: { alt: "Ruelle nocturne illuminée par une lanterne rouge", w: 1800, h: 1200 },
  dimsum: { alt: "Dim sum fumants dans des paniers vapeur en bambou", w: 1800, h: 1086 },
  gyoza: { alt: "Gyozas et petits plats asiatiques sur une table sombre", w: 1800, h: 1202 },
} as const;

export type ImageName = keyof typeof images;
