"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/context/FavoritesContext";

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
  };
}

export default function FavorisPage() {
  const { favorites } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favorites.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from("products")
      .select("*")
      .in("slug", favorites)
      .then(({ data }) => {
        setProducts((data ?? []).map(mapRow));
        setLoading(false);
      });
  }, [favorites]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-display text-3xl text-ink">Mes favoris</h1>

      {loading ? (
        <p className="mt-8 text-ink/50">Chargement...</p>
      ) : products.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-ink/60">Vous n&apos;avez encore ajouté aucun favori.</p>
          <Link
            href="/boutique"
            className="mt-6 inline-block bg-ink px-6 py-3 text-sm uppercase tracking-wide text-paper"
          >
            Parcourir la boutique
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
