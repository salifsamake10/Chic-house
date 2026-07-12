import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export const metadata = { title: "Contact — Chic House" };

export default function ContactPage() {
  const message = encodeURIComponent("Bonjour Chic House, j'aimerais avoir plus d'informations.");

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-display text-4xl text-ink">Contact</h1>
      <p className="mt-4 text-ink/70">
        La façon la plus rapide de nous joindre reste WhatsApp — c&apos;est aussi là que se
        finalisent toutes les commandes, quel que soit votre pays.
      </p>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block bg-gold px-6 py-3 text-sm uppercase tracking-wide text-paper transition-colors hover:bg-gold-deep"
      >
        Écrire sur WhatsApp
      </a>

      <div className="mt-12 space-y-2 border-t border-line pt-8 text-sm text-ink/60">
        <p>Chic House</p>
        <p>Basée au Mali — livraison au Sénégal, au Mali, et partout ailleurs via WhatsApp</p>
      </div>
    </div>
  );
}
