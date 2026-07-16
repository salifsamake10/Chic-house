"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";

export default function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-2xl tracking-wide text-ink">
          CHIC HOUSE
        </Link>

        <nav className="hidden items-center gap-6 text-sm uppercase tracking-wide md:flex">
          <Link href="/" className="gold-underline">
            Accueil
          </Link>
          <Link href="/boutique" className="gold-underline">
            Boutique
          </Link>
          {categories.slice(0, 3).map((c) => (
            <Link key={c.slug} href={`/boutique?categorie=${c.slug}`} className="gold-underline">
              {c.label}
            </Link>
          ))}
          <Link href="/a-propos" className="gold-underline">
            À propos
          </Link>
          <Link href="/contact" className="gold-underline">
            Contact
          </Link>
          <Link href="/admin" className="gold-underline">
            Administration
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/panier" className="relative text-sm uppercase tracking-wide">
            Panier
            {count > 0 && (
              <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] text-paper">
                {count}
              </span>
            )}
          </Link>
          <button
            className="text-sm uppercase tracking-wide md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Ouvrir le menu"
          >
            Menu
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-3 border-t border-line px-5 py-4 text-sm uppercase tracking-wide md:hidden">
          <Link href="/" onClick={() => setOpen(false)}>
            Accueil
          </Link>
          <Link href="/boutique" onClick={() => setOpen(false)}>
            Boutique
          </Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/boutique?categorie=${c.slug}`} onClick={() => setOpen(false)}>
              {c.label}
            </Link>
          ))}
          <Link href="/a-propos" onClick={() => setOpen(false)}>
            À propos
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
          <Link href="/admin" onClick={() => setOpen(false)}>
            Administration
          </Link>
        </nav>
      )}
    </header>
  );
}
