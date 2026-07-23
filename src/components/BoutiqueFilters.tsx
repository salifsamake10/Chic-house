"use client";

import { useMemo, useState } from "react";
import { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function BoutiqueFilters({ products }: { products: Product[] }) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const allSizes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.sizes))).sort(),
    [products]
  );
  const allColors = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.colors))).sort(),
    [products]
  );
  const highestPrice = useMemo(
    () => Math.max(0, ...products.map((p) => (p.isPromo && p.promoPrice ? p.promoPrice : p.price))),
    [products]
  );

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const filtered = products.filter((p) => {
    const effectivePrice = p.isPromo && p.promoPrice ? p.promoPrice : p.price;
    if (selectedSizes.length > 0 && !p.sizes.some((s) => selectedSizes.includes(s))) return false;
    if (selectedColors.length > 0 && !p.colors.some((c) => selectedColors.includes(c))) return false;
    if (maxPrice !== null && effectivePrice > maxPrice) return false;
    return true;
  });

  const hasActiveFilters = selectedSizes.length > 0 || selectedColors.length > 0 || maxPrice !== null;

  return (
    <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
      <aside className="space-y-6">
        {allSizes.length > 0 && (
          <div>
            <p className="text-sm uppercase tracking-wide text-ink/60">Taille</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {allSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => toggle(selectedSizes, setSelectedSizes, s)}
                  className={`h-9 w-9 border text-sm ${
                    selectedSizes.includes(s) ? "border-ink bg-ink text-paper" : "border-line text-ink/70"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {allColors.length > 0 && (
          <div>
            <p className="text-sm uppercase tracking-wide text-ink/60">Couleur</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {allColors.map((c) => (
                <button
                  key={c}
                  onClick={() => toggle(selectedColors, setSelectedColors, c)}
                  className={`border px-3 py-1.5 text-sm ${
                    selectedColors.includes(c) ? "border-ink bg-ink text-paper" : "border-line text-ink/70"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {highestPrice > 0 && (
          <div>
            <p className="text-sm uppercase tracking-wide text-ink/60">
              Prix max {maxPrice !== null && `— ${new Intl.NumberFormat("fr-FR").format(maxPrice)} FCFA`}
            </p>
            <input
              type="range"
              min={0}
              max={highestPrice}
              step={500}
              value={maxPrice ?? highestPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-gold"
            />
          </div>
        )}

        {hasActiveFilters && (
          <button
            onClick={() => {
              setSelectedSizes([]);
              setSelectedColors([]);
              setMaxPrice(null);
            }}
            className="text-sm text-ink/50 underline underline-offset-2 hover:text-ink"
          >
            Réinitialiser les filtres
          </button>
        )}
      </aside>

      <div>
        {filtered.length === 0 ? (
          <p className="mt-4 text-center text-ink/50">Aucun article ne correspond à ces filtres.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
