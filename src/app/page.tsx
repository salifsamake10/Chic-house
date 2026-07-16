import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getAllProducts, categories } from "@/data/products";

export default async function Home() {
  const products = await getAllProducts();
  const nouveautes = products.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mist">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:py-28 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gold-deep">
              Nouvelle collection
            </p>
            <h1 className="mt-4 font-display text-5xl italic leading-tight text-ink sm:text-6xl">
              L&apos;élégance,
              <br />à votre rythme.
            </h1>
            <p className="mt-5 max-w-md text-ink/70">
              Robes, ensembles et accessoires pensés pour sublimer chaque
              occasion. Commandez en quelques clics, finalisez sur WhatsApp.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/boutique"
                className="bg-ink px-6 py-3 text-sm uppercase tracking-wide text-paper transition-colors hover:bg-gold-deep"
              >
                Découvrir la boutique
              </Link>
              <Link
                href="/boutique?categorie=robes"
                className="gold-underline px-2 py-3 text-sm uppercase tracking-wide text-ink"
              >
                Voir les robes
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-rose/60 via-mist to-gold/20">
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-3xl italic text-ink/30">
                Chic House
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-3xl text-ink">Catégories</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/boutique?categorie=${c.slug}`}
              className="group flex aspect-square flex-col items-center justify-center gap-2 border border-line bg-mist text-center transition-colors hover:border-gold"
            >
              <span className="font-display text-lg text-ink group-hover:text-gold-deep">
                {c.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Nouveautes */}
      {nouveautes.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-3xl text-ink">Nouveautés</h2>
            <Link href="/boutique" className="gold-underline text-sm uppercase tracking-wide">
              Tout voir
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {nouveautes.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Best sellers */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-3xl text-ink">Les plus demandés</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Temoignages */}
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-3xl text-ink">Elles nous font confiance</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              { name: "Fanta, Dakar", text: "Commande reçue rapidement, la qualité est vraiment au rendez-vous." },
              { name: "Coumba, Bamako", text: "Le service client sur WhatsApp est très réactif, je recommande." },
              { name: "Assetou, Paris", text: "Superbe robe, exactement comme sur les photos." },
            ].map((t) => (
              <div key={t.name} className="border border-line bg-paper p-6">
                <p className="text-ink/70">&laquo; {t.text} &raquo;</p>
                <p className="mt-4 text-sm uppercase tracking-wide text-gold-deep">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
