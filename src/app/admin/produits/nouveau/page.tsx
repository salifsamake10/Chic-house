import ProductForm from "../ProductForm";

export default function NouveauProduitPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-display text-3xl text-ink">Ajouter un produit</h1>
      <ProductForm />
    </div>
  );
}