"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProductForm from "../ProductForm";

export default function ModifierProduitPage() {
  const params = useParams<{ slug: string }>();
  const [initial, setInitial] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("slug", params.slug)
      .single()
      .then(({ data }) => {
        setInitial(data);
        setLoading(false);
      });
  }, [params.slug]);

  if (loading) {
    return <p className="mx-auto max-w-5xl px-5 py-12 text-ink/50">Chargement...</p>;
  }
  if (!initial) {
    return <p className="mx-auto max-w-5xl px-5 py-12 text-ink/50">Produit introuvable.</p>;
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-display text-3xl text-ink">Modifier {initial.name}</h1>
      <ProductForm initial={initial} isEdit />
    </div>
  );
}
