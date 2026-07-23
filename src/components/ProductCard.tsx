"use client";

import Link from "next/link";
import { Product } from "@/data/products";
import { useFavorites } from "@/context/FavoritesContext";

function formatFcfa(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

export default function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const outOfStock = product.stock <= 0;
  const favorite = isFavorite(product.slug);

  return (
    <div className="group relative block">
      <Link href={`/produit/${product.slug}`} aria-label={`Voir ${product.name}`} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-mist">
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-mist to-rose/40 transition-transform duration-500 group-hover:scale-105">
            <span className="font-display text-lg italic text-ink/30">Chic House</span>
          </div>

          {product.isNew && (
            <span className="absolute left-3 top-3 bg-ink px-2 py-1 text-[11px] uppercase tracking-wider text-paper">
              Nouveau
            </span>
          )}
          {product.isPromo && !outOfStock && (
            <span className="absolute left-3 top-3 bg-gold px-2 py-1 text-[11px] uppercase tracking-wider text-paper">
              Promo
            </span>
          )}
          {outOfStock && (
            <span className="absolute inset-0 flex items-center justify-center bg-paper/70">
              <span className="border border-ink px-3 py-1 text-xs uppercase tracking-wider text-ink">
                Épuisé
              </span>
            </span>
          )}
        </div>
      </Link>

      <button
        onClick={() => toggleFavorite(product.slug)}
        aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-paper/80 text-ink transition-colors hover:bg-paper"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill={favorite ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path d="M12 21s-7.5-4.6-10-9.1C.5 8.4 2.2 5 5.6 5c1.9 0 3.4 1 4.4 2.4C11 6 12.5 5 14.4 5 17.8 5 19.5 8.4 22 11.9 19.5 16.4 12 21 12 21Z" />
        </svg>
      </button>

      <div className="mt-3 space-y-1">
        <Link href={`/produit/${product.slug}`}>
          <h3 className="gold-underline inline-block font-display text-lg text-ink">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 text-sm">
          {product.isPromo && product.promoPrice ? (
            <>
              <span className="text-gold-deep">{formatFcfa(product.promoPrice)}</span>
              <span className="text-ink/40 line-through">{formatFcfa(product.price)}</span>
            </>
          ) : (
            <span className="text-ink/70">{formatFcfa(product.price)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
