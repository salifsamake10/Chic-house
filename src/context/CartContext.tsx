"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Product } from "@/data/products";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  addItem: (product: Product, opts: { size?: string; color?: string; quantity: number }) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "chic-house-cart";

function lineKey(slug: string, size?: string, color?: string) {
  return [slug, size ?? "", color ?? ""].join("__");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // localStorage indisponible (mode privé, etc.) -> panier en mémoire seulement
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // silencieux : le panier reste fonctionnel en mémoire même si l'écriture échoue
    }
  }, [lines, hydrated]);

  const addItem: CartContextValue["addItem"] = (product, opts) => {
    const key = lineKey(product.slug, opts.size, opts.color);
    setLines((prev) => {
      const existing = prev.find((l) => lineKey(l.slug, l.size, l.color) === key);
      if (existing) {
        return prev.map((l) =>
          lineKey(l.slug, l.size, l.color) === key
            ? { ...l, quantity: l.quantity + opts.quantity }
            : l
        );
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price: product.isPromo && product.promoPrice ? product.promoPrice : product.price,
          size: opts.size,
          color: opts.color,
          quantity: opts.quantity,
        },
      ];
    });
  };

  const updateQuantity = (key: string, quantity: number) => {
    setLines((prev) =>
      prev
        .map((l) => (lineKey(l.slug, l.size, l.color) === key ? { ...l, quantity } : l))
        .filter((l) => l.quantity > 0)
    );
  };

  const removeItem = (key: string) => {
    setLines((prev) => prev.filter((l) => lineKey(l.slug, l.size, l.color) !== key));
  };

  const clear = () => setLines([]);

  const total = useMemo(() => lines.reduce((sum, l) => sum + l.price * l.quantity, 0), [lines]);
  const count = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);

  return (
    <CartContext.Provider value={{ lines, addItem, updateQuantity, removeItem, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans un CartProvider");
  return ctx;
}

export { lineKey };
