"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { categories } from "@/data/products";

type Initial = {
  slug?: string;
  name?: string;
  price?: number;
  category?: string;
  sizes?: string[];
  colors?: string[];
  description?: string;
  is_new?: boolean;
  is_promo?: boolean;
  promo_price?: number | null;
  stock?: number;
};

export default function ProductForm({ initial, isEdit }: { initial?: Initial; isEdit?: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: initial?.slug ?? "",
    name: initial?.name ?? "",
    price: initial?.price ?? 0,
    category: initial?.category ?? categories[0].slug,
    sizes: (initial?.sizes ?? []).join(", "),
    colors: (initial?.colors ?? []).join(", "),
    description: initial?.description ?? "",
    isNew: initial?.is_new ?? false,
    isPromo: initial?.is_promo ?? false,
    promoPrice: initial?.promo_price ?? 0,
    stock: initial?.stock ?? 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      slug: form.slug.trim(),
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category,
      sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
      description: form.description,
      is_new: form.isNew,
      is_promo: form.isPromo,
      promo_price: form.isPromo ? Number(form.promoPrice) : null,
      stock: Number(form.stock),
    };

    const { error } = isEdit
      ? await supabase.from("products").update(payload).eq("slug", initial!.slug!)
      : await supabase.from("products").insert(payload);

    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-5">
      <div>
        <label className="text-sm uppercase tracking-wide text-ink/60">Identifiant (slug)</label>
        <input
          required
          disabled={isEdit}
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          placeholder="robe-rouge-elegance"
          className="mt-1 w-full border border-line px-3 py-2 disabled:bg-mist disabled:text-ink/40"
        />
        <p className="mt-1 text-xs text-ink/40">
          Sans espaces ni accents, utilisé dans l&apos;URL. Non modifiable après création.
        </p>
      </div>

      <div>
        <label className="text-sm uppercase tracking-wide text-ink/60">Nom</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1 w-full border border-line px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm uppercase tracking-wide text-ink/60">Prix (FCFA)</label>
          <input
            required
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            className="mt-1 w-full border border-line px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm uppercase tracking-wide text-ink/60">Stock</label>
          <input
            required
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
            className="mt-1 w-full border border-line px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="text-sm uppercase tracking-wide text-ink/60">Catégorie</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="mt-1 w-full border border-line px-3 py-2"
        >
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm uppercase tracking-wide text-ink/60">
          Tailles (séparées par des virgules)
        </label>
        <input
          value={form.sizes}
          onChange={(e) => setForm({ ...form, sizes: e.target.value })}
          placeholder="S, M, L, XL"
          className="mt-1 w-full border border-line px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm uppercase tracking-wide text-ink/60">
          Couleurs (séparées par des virgules)
        </label>
        <input
          value={form.colors}
          onChange={(e) => setForm({ ...form, colors: e.target.value })}
          placeholder="Noir, Rose, Blanc"
          className="mt-1 w-full border border-line px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm uppercase tracking-wide text-ink/60">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="mt-1 w-full border border-line px-3 py-2"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isNew}
            onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
          />
          Nouveauté
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isPromo}
            onChange={(e) => setForm({ ...form, isPromo: e.target.checked })}
          />
          En promotion
        </label>
      </div>

      {form.isPromo && (
        <div>
          <label className="text-sm uppercase tracking-wide text-ink/60">Prix promo (FCFA)</label>
          <input
            type="number"
            value={form.promoPrice}
            onChange={(e) => setForm({ ...form, promoPrice: Number(e.target.value) })}
            className="mt-1 w-full border border-line px-3 py-2"
          />
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="bg-ink px-6 py-3 text-sm uppercase tracking-wide text-paper disabled:opacity-50"
      >
        {saving ? "Enregistrement..." : isEdit ? "Enregistrer les modifications" : "Créer le produit"}
      </button>
    </form>
  );
}
