import Link from "next/link";
import { Product } from "@/data/products";

function formatFcfa(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

export default function ProductCard({ product }: { product: Product }) {
  const outOfStock = product.stock <= 0;

  return (
    <Link
      href={`/produit/${product.slug}`}
      className="group block"
      aria-label={`Voir ${product.name}`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-mist">
        {/* Placeholder image : remplacer par une vraie photo produit (Cloudinary) */}
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

      <div className="mt-3 space-y-1">
        <h3 className="gold-underline inline-block font-display text-lg text-ink">
          {product.name}
        </h3>
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
    </Link>
  );
}
