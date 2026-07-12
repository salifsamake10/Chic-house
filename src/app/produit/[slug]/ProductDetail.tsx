"use client";

import { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { buildWhatsAppLink } from "@/lib/whatsapp";

function formatFcfa(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState<string | undefined>(product.sizes[0]);
  const [color, setColor] = useState<string | undefined>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const outOfStock = product.stock <= 0;
  const price = product.isPromo && product.promoPrice ? product.promoPrice : product.price;

  const handleAdd = () => {
    addItem(product, { size, color, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const buyNowLink = buildWhatsAppLink([
    { name: product.name, price, size, color, quantity },
  ]);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="aspect-[3/4] w-full bg-gradient-to-br from-mist to-rose/40">
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-display text-2xl italic text-ink/30">Chic House</span>
        </div>
      </div>

      <div>
        <h1 className="font-display text-4xl text-ink">{product.name}</h1>
        <div className="mt-2 flex items-center gap-3">
          {product.isPromo && product.promoPrice ? (
            <>
              <span className="text-xl text-gold-deep">{formatFcfa(product.promoPrice)}</span>
              <span className="text-ink/40 line-through">{formatFcfa(product.price)}</span>
            </>
          ) : (
            <span className="text-xl text-ink/80">{formatFcfa(product.price)}</span>
          )}
        </div>

        <p className="mt-6 text-ink/70">{product.description}</p>

        {product.sizes.length > 0 && (
          <div className="mt-6">
            <p className="text-sm uppercase tracking-wide text-ink/60">Taille</p>
            <div className="mt-2 flex gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-10 w-10 border text-sm ${
                    size === s ? "border-ink bg-ink text-paper" : "border-line text-ink/70"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.colors.length > 0 && (
          <div className="mt-6">
            <p className="text-sm uppercase tracking-wide text-ink/60">Couleur</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`border px-3 py-1.5 text-sm ${
                    color === c ? "border-ink bg-ink text-paper" : "border-line text-ink/70"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <p className="text-sm uppercase tracking-wide text-ink/60">Quantité</p>
          <div className="flex items-center border border-line">
            <button
              className="h-10 w-10 text-lg"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Diminuer la quantité"
            >
              −
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              className="h-10 w-10 text-lg"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Augmenter la quantité"
            >
              +
            </button>
          </div>
        </div>

        {outOfStock ? (
          <p className="mt-8 border border-ink/20 bg-mist px-4 py-3 text-sm text-ink/60">
            Cet article est actuellement épuisé. Contactez-nous sur WhatsApp pour être informée du réassort.
          </p>
        ) : (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAdd}
              className="border border-ink px-6 py-3 text-sm uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {added ? "Ajouté ✓" : "Ajouter au panier"}
            </button>
            <a
              href={buyNowLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold px-6 py-3 text-center text-sm uppercase tracking-wide text-paper transition-colors hover:bg-gold-deep"
            >
              Commander sur WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
