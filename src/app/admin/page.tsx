import { products } from "@/data/products";

export const metadata = { title: "Administration — Chic House" };

function formatFcfa(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-display text-3xl text-ink">Administration</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink/60">
        Aperçu des produits actuellement en ligne. Cette page lit encore des données de
        démonstration codées en dur — l&apos;étape suivante consiste à la connecter à
        Supabase pour permettre l&apos;ajout, la modification et la suppression de produits
        directement depuis le navigateur, avec authentification.
      </p>

      <div className="mt-8 overflow-x-auto border border-line">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-mist text-xs uppercase tracking-wide text-ink/60">
            <tr>
              <th className="px-4 py-3">Produit</th>
              <th className="px-4 py-3">Catégorie</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((p) => (
              <tr key={p.slug}>
                <td className="px-4 py-3 font-medium text-ink">{p.name}</td>
                <td className="px-4 py-3 text-ink/70 capitalize">{p.category}</td>
                <td className="px-4 py-3 text-ink/70">
                  {formatFcfa(p.isPromo && p.promoPrice ? p.promoPrice : p.price)}
                </td>
                <td className="px-4 py-3 text-ink/70">{p.stock}</td>
                <td className="px-4 py-3">
                  {p.stock <= 0 ? (
                    <span className="text-red-600">Épuisé</span>
                  ) : p.stock <= 5 ? (
                    <span className="text-gold-deep">Stock faible</span>
                  ) : (
                    <span className="text-ink/50">En stock</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
