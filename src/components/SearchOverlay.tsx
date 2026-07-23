"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Result = {
  slug: string;
  name: string;
  price: number;
  category: string;
};

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("products")
      .select("slug, name, price, category")
      .then(({ data }) => {
        setAllProducts(data ?? []);
        setLoading(false);
      });
  }, []);

  const results =
    query.trim().length === 0
      ? []
      : allProducts.filter((p) =>
          p.name.toLowerCase().includes(query.trim().toLowerCase())
        );

  return (
    <div className="fixed inset-0 z-50 bg-ink/40" onClick={onClose}>
      <div
        className="mx-auto mt-24 max-w-xl bg-paper p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line pb-3">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink/40" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full text-lg outline-none placeholder:text-ink/30"
          />
          <button onClick={onClose} aria-label="Fermer la recherche" className="text-ink/40 hover:text-ink">
            ✕
          </button>
        </div>

        <div className="mt-4 max-h-96 overflow-y-auto">
          {loading ? (
            <p className="py-6 text-center text-sm text-ink/40">Chargement du catalogue...</p>
          ) : query.trim().length === 0 ? (
            <p className="py-6 text-center text-sm text-ink/40">
              Commencez à taper pour rechercher un produit.
            </p>
          ) : results.length === 0 ? (
            <p className="py-6 text-center text-sm text-ink/40">Aucun résultat pour « {query} ».</p>
          ) : (
            <ul className="divide-y divide-line">
              {results.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/produit/${r.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between py-3 hover:text-gold-deep"
                  >
                    <span>{r.name}</span>
                    <span className="text-sm text-ink/50">
                      {new Intl.NumberFormat("fr-FR").format(r.price)} FCFA
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
