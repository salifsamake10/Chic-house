import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import ProductDetail from "./ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProduitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <ProductDetail product={product} />
    </div>
  );
}
