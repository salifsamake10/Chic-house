import { supabase } from "@/lib/supabase";

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  description: string;
  isNew?: boolean;
  isPromo?: boolean;
  promoPrice?: number;
  stock: number;
  imageUrl?: string;
};

export const categories = [
  { slug: "robes", label: "Robes" },
  { slug: "ensembles", label: "Ensembles" },
  { slug: "pantalons", label: "Pantalons" },
  { slug: "jupes", label: "Jupes" },
  { slug: "sacs", label: "Sacs" },
  { slug: "accessoires", label: "Accessoires" },
] as const;

// Convertit une ligne de la table Supabase (snake_case) vers notre type Product (camelCase)
function mapRow(row: any): Product {
  return {
    slug: row.slug,
    name: row.name,
    price: row.price,
    category: row.category,
    sizes: row.sizes ?? [],
    colors: row.colors ?? [],
    description: row.description ?? "",
    isNew: row.is_new ?? false,
    isPromo: row.is_promo ?? false,
    promoPrice: row.promo_price ?? undefined,
    stock: row.stock ?? 0,
    imageUrl: row.image_url ?? undefined,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur lors du chargement des produits :", error.message);
    return [];
  }
  return data.map(mapRow);
}

export async function getProductsByCategory(category?: string): Promise<Product[]> {
  const query = supabase.from("products").select("*").order("created_at", { ascending: false });
  const { data, error } = category ? await query.eq("category", category) : await query;

  if (error) {
    console.error("Erreur lors du chargement des produits :", error.message);
    return [];
  }
  return data.map(mapRow);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return mapRow(data);
}