export type Product = {
  slug: string;
  name: string;
  price: number;
  category: Category;
  sizes: string[];
  colors: string[];
  description: string;
  isNew?: boolean;
  isPromo?: boolean;
  promoPrice?: number;
  stock: number;
};

export const categories = [
  { slug: "robes", label: "Robes" },
  { slug: "ensembles", label: "Ensembles" },
  { slug: "pantalons", label: "Pantalons" },
  { slug: "jupes", label: "Jupes" },
  { slug: "sacs", label: "Sacs" },
  { slug: "accessoires", label: "Accessoires" },
] as const;

export type Category = (typeof categories)[number]["slug"];

// Données de démonstration — à remplacer par de vrais produits et photos
// via le tableau d'administration une fois Supabase connecté.
export const products: Product[] = [
  {
    slug: "ensemble-elegance",
    name: "Ensemble Élégance",
    price: 18500,
    category: "ensembles",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Noir", "Rose", "Blanc"],
    description:
      "Ensemble deux pièces en tissu fluide, coupe ajustée et finitions soignées. Parfait pour une occasion élégante ou une sortie en journée.",
    isNew: true,
    stock: 12,
  },
  {
    slug: "robe-soiree-dora",
    name: "Robe de soirée Dora",
    price: 24000,
    category: "robes",
    sizes: ["S", "M", "L"],
    colors: ["Noir", "Doré"],
    description:
      "Robe longue fendue, tissu satiné à reflets dorés. Une pièce statement pour vos soirées.",
    isPromo: true,
    promoPrice: 19900,
    stock: 5,
  },
  {
    slug: "robe-fleurie-aya",
    name: "Robe fleurie Aya",
    price: 15500,
    category: "robes",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Rose", "Blanc"],
    description: "Robe légère à motifs floraux, idéale pour la saison chaude.",
    stock: 8,
  },
  {
    slug: "pantalon-taille-haute-nour",
    name: "Pantalon taille haute Nour",
    price: 12000,
    category: "pantalons",
    sizes: ["S", "M", "L"],
    colors: ["Noir", "Beige"],
    description: "Pantalon fluide taille haute, coupe droite, très confortable.",
    stock: 15,
  },
  {
    slug: "jupe-plissee-lina",
    name: "Jupe plissée Lina",
    price: 11000,
    category: "jupes",
    sizes: ["S", "M", "L"],
    colors: ["Doré", "Noir"],
    description: "Jupe plissée mi-longue, tombé impeccable, taille élastiquée.",
    isNew: true,
    stock: 10,
  },
  {
    slug: "sac-a-main-capitale",
    name: "Sac à main Capitale",
    price: 21000,
    category: "sacs",
    sizes: [],
    colors: ["Noir", "Doré"],
    description: "Sac à main structuré, finitions dorées, bandoulière amovible.",
    stock: 6,
  },
  {
    slug: "sac-bandouliere-rosa",
    name: "Sac bandoulière Rosa",
    price: 14500,
    category: "sacs",
    sizes: [],
    colors: ["Rose poudré"],
    description: "Petit sac bandoulière, format pratique pour le quotidien.",
    stock: 0,
  },
  {
    slug: "boucles-oreilles-eclat",
    name: "Boucles d'oreilles Éclat",
    price: 6500,
    category: "accessoires",
    sizes: [],
    colors: ["Doré"],
    description: "Boucles d'oreilles pendantes plaquées or, légères à porter.",
    isNew: true,
    stock: 20,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category?: string) {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}
