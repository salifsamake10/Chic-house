import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-mist">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Chic House" width={40} height={40} className="rounded-full" />
            <h4 className="font-display text-xl">CHIC HOUSE</h4>
          </div>
          <p className="mt-3 text-sm text-ink/60">
            Mode élégante, livrée avec soin au Sénégal, au Mali, et partout dans le monde via WhatsApp.
          </p>
        </div>
        <div>
          <h5 className="text-sm uppercase tracking-wide text-ink/80">Navigation</h5>
          <ul className="mt-3 space-y-2 text-sm text-ink/60">
            <li><Link href="/boutique" className="gold-underline">Boutique</Link></li>
            <li><Link href="/a-propos" className="gold-underline">À propos</Link></li>
            <li><Link href="/contact" className="gold-underline">Contact</Link></li>
            <li><Link href="/cgv" className="gold-underline">CGV & mentions légales</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm uppercase tracking-wide text-ink/80">Nous contacter</h5>
          <p className="mt-3 text-sm text-ink/60">
            Toutes les commandes sont finalisées sur WhatsApp. Écrivez-nous directement depuis une fiche produit ou votre panier.
          </p>
        </div>
      </div>
      <div className="border-t border-line px-5 py-4 text-center text-xs text-ink/40">
        © {new Date().getFullYear()} Chic House. Tous droits réservés.
      </div>
    </footer>
  );
}
