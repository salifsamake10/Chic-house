"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function formatFcfa(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Supprimer ce produit ? Cette action est irréversible.")) return;
    await supabase.from("products").delete().eq("slug", slug);
    load();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-ink">Administration</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/produits/nouveau"
            className="bg-ink px-4 py-2 text-sm uppercase tracking-wide text-paper"
          >
            + Ajouter un produit
          </Link>
          <button
            onClick={handleLogout}
            className="border border-line px-4 py-2 text-sm uppercase tracking-wide text-ink/70"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {loading ? (
        <p className="mt-8 text-ink/50">Chargement...</p>
      ) : products.length === 0 ? (
        <p className="mt-8 text-ink/50">Aucun produit pour le moment.</p>
      ) : (
        <div className="mt-8 overflow-x-auto border border-line">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-mist text-xs uppercase tracking-wide text-ink/60">
              <tr>
                <th className="px-4 py-3">Produit</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Prix</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {products.map((p) => (
                <tr key={p.slug}>
                  <td className="px-4 py-3 font-medium text-ink">{p.name}</td>
                  <td className="px-4 py-3 capitalize text-ink/70">{p.category}</td>
                  <td className="px-4 py-3 text-ink/70">
                    {formatFcfa(p.is_promo && p.promo_price ? p.promo_price : p.price)}
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
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <Link href={`/admin/produits/${p.slug}`} className="mr-4 underline">
                      Modifier
                    </Link>
                    <button onClick={() => handleDelete(p.slug)} className="text-red-600 underline">
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
