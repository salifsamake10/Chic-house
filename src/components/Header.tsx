"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { categories } from "@/data/products";
import SearchOverlay from "@/components/SearchOverlay";


export default function Header() {
const { count } = useCart();
const [open, setOpen] = useState(false);
const [searchOpen, setSearchOpen] = useState(false);
const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-2xl tracking-wide text-ink">
          CHIC HOUSE
        </Link>

        <nav className="hidden items-center gap-6 text-sm uppercase tracking-wide md:flex">
          <Link href="/" className="gold-underline">Accueil</Link>
          <Link href="/boutique" className="gold-underline">Boutique</Link>
          {categories.slice(0, 3).map((c) => (
            <Link key={c.slug} href={`/boutique?categorie=${c.slug}`} className="gold-underline">
              {c.label}
            </Link>
          ))}
          <Link href="/a-propos" className="gold-underline">À propos</Link>
          <Link href="/contact" className="gold-underline">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Rechercher"
            className="text-ink/70 hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          <Link href="/favoris" className="relative text-sm uppercase tracking-wide">
            Favoris
            {favorites.length > 0 && (
              <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] text-paper">
                {favorites.length}
              </span>
            )}
          </Link>

          <button
  onClick={() => setSearchOpen(true)}
  aria-label="Rechercher"
  className="text-ink/70 hover:text-ink"
>
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
</button>

<Link href="/favoris" className="relative text-sm uppercase tracking-wide">
  Favoris
  {favorites.length > 0 && (
    <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] text-paper">
      {favorites.length}
    </span>
  )}
</Link>

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
          <Link href="/" onClick={() => setOpen(false)}>Accueil</Link>
          <Link href="/boutique" onClick={() => setOpen(false)}>Boutique</Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/boutique?categorie=${c.slug}`} onClick={() => setOpen(false)}>
              {c.label}
            </Link>
          ))}
          <Link href="/a-propos" onClick={() => setOpen(false)}>À propos</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </nav>
      )}

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
        {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
