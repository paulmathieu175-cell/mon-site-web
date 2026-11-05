// ============================================================
//  Contenu du site — modifiez ce fichier pour personnaliser Yanka
//  (textes, carte, horaires, coordonnées, avis…)
// ============================================================

export const site = {
  name: "Yanka",
  tagline: "Restaurant gastronomique",
  phone: "01 00 00 00 00",
  phoneHref: "+33100000000",
  email: "contact@yanka.fr",
  address: "12 rue de l'Exemple, 75000 Paris",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Paris",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
};

export const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#presentation", label: "Présentation" },
  { href: "#services", label: "Services" },
  { href: "#carte", label: "La carte" },
  { href: "#avis", label: "Avis" },
  { href: "#contact", label: "Contact" },
];

export const stats = [
  { value: 12, suffix: "", label: "années de passion" },
  { value: 40, suffix: "", label: "couverts par service" },
  { value: 150, suffix: "+", label: "références de vins" },
];

export const services = [
  {
    icon: "plate",
    title: "Dîner sur place",
    text: "Un cadre intimiste aux lumières tamisées, un service attentionné et une cuisine de saison sublimée.",
  },
  {
    icon: "bag",
    title: "Vente à emporter",
    text: "Retrouvez nos plats signatures chez vous, préparés minute et soigneusement emballés.",
  },
  {
    icon: "glass",
    title: "Privatisation & événements",
    text: "Anniversaires, repas d'affaires, mariages : nous créons un menu sur mesure pour votre événement.",
  },
  {
    icon: "wine",
    title: "Accords mets & vins",
    text: "Notre sommelier vous guide parmi plus de 150 références pour sublimer chaque assiette.",
  },
];

export const menu = {
  Entrées: [
    { name: "Saint-Jacques snackées", desc: "Purée de chou-fleur, beurre noisette, caviar d'Aquitaine", price: 24 },
    { name: "Velouté de cèpes", desc: "Crème légère à la truffe noire, croûtons dorés", price: 16 },
    { name: "Tartare de bœuf Yanka", desc: "Câpres, jaune d'œuf confit, pickles maison", price: 19 },
  ],
  Plats: [
    { name: "Filet de bœuf Rossini", desc: "Foie gras poêlé, sauce Périgueux, pommes soufflées", price: 42 },
    { name: "Bar de ligne rôti", desc: "Fenouil braisé, émulsion safranée, agrumes", price: 36 },
    { name: "Risotto aux truffes", desc: "Carnaroli crémeux, parmesan 24 mois, truffe fraîche", price: 32 },
  ],
  Desserts: [
    { name: "Sphère chocolat & or", desc: "Ganache grand cru, cœur caramel, feuille d'or", price: 15 },
    { name: "Tarte citron revisitée", desc: "Meringue flambée, sablé breton, basilic", price: 13 },
    { name: "Plateau de fromages affinés", desc: "Sélection du moment, confiture de figues", price: 16 },
  ],
  Boissons: [
    { name: "Coupe de champagne", desc: "Blanc de blancs, cuvée de la maison", price: 14 },
    { name: "Cocktail signature Yanka", desc: "Gin, liqueur de sureau, citron, poivre de Timut", price: 13 },
    { name: "Accord mets & vins", desc: "3 verres sélectionnés par notre sommelier", price: 35 },
  ],
};

// ⚠️ Avis d'exemple : remplacez-les par de vrais avis de vos clients.
export const testimonials = [
  {
    name: "Camille R.",
    role: "Dîner en amoureux",
    text: "Un moment hors du temps. Chaque plat est une œuvre d'art, et le service est d'une rare élégance.",
    rating: 5,
  },
  {
    name: "Thomas L.",
    role: "Repas d'affaires",
    text: "Cadre raffiné, cuisine impeccable et accords mets-vins parfaits. Mes clients ont été conquis.",
    rating: 5,
  },
  {
    name: "Sofia M.",
    role: "Anniversaire privatisé",
    text: "L'équipe a tout organisé à la perfection. Le menu sur mesure était tout simplement sublime.",
    rating: 5,
  },
];

export const hours = [
  { day: "Lundi", time: "Fermé" },
  { day: "Mardi – Samedi", time: "12h00 – 14h30 · 19h00 – 23h00" },
  { day: "Dimanche", time: "12h00 – 15h00" },
];
