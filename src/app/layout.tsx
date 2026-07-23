import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { FavoritesProvider } from "@/context/FavoritesContext";
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chic House -- Boutique de mode",
  description:
    "Chic House : robes, ensembles, sacs et accessoires. Commande simple via WhatsApp, livraison au Senegal, au Mali et partout dans le monde.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${cormorant.variable} ${manrope.variable} antialiased`}>
        <FavoritesProvider>
  <CartProvider>
    <Header />
    <main className="min-h-[60vh]">{children}</main>
    <Footer />
    <WhatsAppFloatingButton />
  </CartProvider>
</FavoritesProvider>
      </body>
    </html>
  );
}
