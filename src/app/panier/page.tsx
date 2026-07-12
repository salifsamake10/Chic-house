"use client";

import Link from "next/link";
import { useCart, lineKey } from "@/context/CartContext";
import { buildWhatsAppLink } from "@/lib/whatsapp";

function formatFcfa(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

export default function PanierPage() {
  const { lines, updateQuantity, removeItem, total } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="font-display text-3xl text-ink">Votre panier est vide</h1>
        <p className="mt-3 text-ink/60">Parcourez la boutique pour trouver votre prochaine pièce favorite.</p>
        <Link
          href="/boutique"
          className="mt-8 inline-block bg-ink px-6 py-3 text-sm uppercase tracking-wide text-paper"
        >
          Aller à la boutique
        </Link>
      </div>
    );
  }

  const whatsappLink = buildWhatsAppLink(
    lines.map((l) => ({ name: l.name, price: l.price, size: l.size, color: l.color, quantity: l.quantity }))
  );

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="font-display text-3xl text-ink">Votre panier</h1>

      <div className="mt-8 divide-y divide-line border-y border-line">
        {lines.map((l) => {
          const key = lineKey(l.slug, l.size, l.color);
          return (
            <div key={key} className="flex items-center gap-4 py-5">
              <div className="h-20 w-16 flex-shrink-0 bg-mist" />
              <div className="flex-1">
                <p className="font-display text-lg text-ink">{l.name}</p>
                <p className="text-sm text-ink/50">
                  {[l.size && `Taille ${l.size}`, l.color].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-1 text-sm text-ink/70">{formatFcfa(l.price)}</p>
              </div>
              <div className="flex items-center border border-line">
                <button
                  className="h-9 w-9"
                  onClick={() => updateQuantity(key, l.quantity - 1)}
                  aria-label="Diminuer la quantité"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm">{l.quantity}</span>
                <button
                  className="h-9 w-9"
                  onClick={() => updateQuantity(key, l.quantity + 1)}
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(key)}
                className="text-sm text-ink/40 underline-offset-2 hover:text-ink hover:underline"
              >
                Supprimer
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-end gap-1">
        <p className="text-sm text-ink/60">Total</p>
        <p className="font-display text-3xl text-ink">{formatFcfa(total)}</p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/boutique"
          className="border border-line px-6 py-3 text-center text-sm uppercase tracking-wide text-ink/70"
        >
          Continuer mes achats
        </Link>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold px-6 py-3 text-center text-sm uppercase tracking-wide text-paper transition-colors hover:bg-gold-deep"
        >
          Commander sur WhatsApp
        </a>
      </div>
      <p className="mt-4 text-right text-xs text-ink/40">
        Vous serez redirigée vers WhatsApp pour finaliser votre commande avec Chic House.
      </p>
    </div>
  );
}
