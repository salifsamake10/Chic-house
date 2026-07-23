import { categories, getProductsByCategory } from "@/data/products";
import BoutiqueFilters from "@/components/BoutiqueFilters";
import Link from "next/link";

export const metadata = { title: "Boutique — Chic House" };

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;
  const items = await getProductsByCategory(categorie);
  const activeLabel = categories.find((c) => c.slug === categorie)?.label;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-display text-4xl text-ink">{activeLabel ? activeLabel : "Boutique"}</h1>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/boutique" className={`border px-4 py-2 text-sm uppercase tracking-wide ${!categorie ? "border-ink bg-ink text-paper" : "border-line text-ink/70"}`}>
          Tout
        </Link>
        {categories.map((c) => (
          <Link key={c.slug} href={`/boutique?categorie=${c.slug}`} className={`border px-4 py-2 text-sm uppercase tracking-wide ${categorie === c.slug ? "border-ink bg-ink text-paper" : "border-line text-ink/70"}`}>
            {c.label}
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-16 text-center text-ink/50">Aucun article dans cette catégorie pour le moment.</p>
      ) : (
        <BoutiqueFilters products={items} />
      )}
    </div>
  );
}
