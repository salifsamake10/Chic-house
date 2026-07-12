export const metadata = { title: "CGV & mentions légales — Chic House" };

export default function CgvPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-display text-4xl text-ink">
        Conditions générales de vente & mentions légales
      </h1>

      <section className="mt-8">
        <h2 className="font-display text-2xl text-ink">Mentions légales</h2>
        <p className="mt-3 text-ink/70">
          [À compléter avec les informations légales de l&apos;entité malienne : nom
          commercial, forme juridique, adresse, numéro d&apos;immatriculation si applicable.]
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl text-ink">Commandes</h2>
        <p className="mt-3 text-ink/70">
          Toute commande passée depuis le site est finalisée par échange direct sur WhatsApp.
          Les prix affichés sont en Francs CFA (XOF) et incluent [préciser : hors/avec frais de livraison].
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl text-ink">Livraison</h2>
        <p className="mt-3 text-ink/70">
          Les délais et modalités de livraison sont communiqués au cas par cas via WhatsApp
          selon la ville et le pays du client.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl text-ink">Retours et remboursements</h2>
        <p className="mt-3 text-ink/70">
          [À compléter avec la politique de retour de Chic House.]
        </p>
      </section>
    </div>
  );
}
