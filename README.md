# Chic House -- Site e-commerce (V1)

Site vitrine + boutique pour Chic House. Version V1 : catalogue complet, panier,
et commande finalisee via WhatsApp (aucun paiement en ligne pour l'instant,
conformement au cahier des charges).

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4**
- Donnees produits en dur dans `src/data/products.ts` (a remplacer par Supabase en V2)
- Panier gere en `localStorage` via `src/context/CartContext.tsx`

## Demarrer en local

```bash
npm install
npm run dev
```

Le site est alors accessible sur http://localhost:3000

## Avant la mise en ligne -- a faire

1. **Numero WhatsApp** : remplacer la valeur `WHATSAPP_NUMBER` dans
   `src/lib/whatsapp.ts` par le vrai numero de Chic House (format
   international, ex. `22370000000`, sans `+` ni espaces).
2. **Photos produits** : les fiches produits et vignettes utilisent des
   placeholders (degrades colores). Remplacer par de vraies photos, idealement
   hebergees sur Cloudinary une fois le compte cree.
3. **Produits reels** : completer/remplacer le contenu de
   `src/data/products.ts` avec le vrai catalogue (nom, prix, tailles,
   couleurs, stock).
4. **Mentions legales** : completer `src/app/cgv/page.tsx` avec les
   informations legales de l'entite malienne.
5. **Design** : ajuster les couleurs si besoin dans
   `src/app/globals.css` (variables `--color-rose`, `--color-gold`, etc.).

## Structure du projet

```
src/
  app/
    page.tsx               -> Accueil
    boutique/               -> Liste des produits + filtre par categorie
    produit/[slug]/          -> Fiche produit
    panier/                  -> Panier + bouton "Commander sur WhatsApp"
    contact/, a-propos/, cgv/
    admin/                   -> Apercu produits (lecture seule pour l'instant)
  components/                -> Header, Footer, ProductCard, bouton WhatsApp flottant
  context/CartContext.tsx    -> Etat global du panier
  data/products.ts           -> Catalogue (a connecter a Supabase en V2)
  lib/whatsapp.ts             -> Construction des liens/messages WhatsApp
```

## Prochaines etapes (V2 -- voir le cahier des charges)

- Connecter Supabase pour gerer les produits depuis l'admin (ajout,
  modification, suppression) au lieu du fichier `products.ts` statique.
- Authentification admin (Supabase Auth) pour securiser `/admin`.
- Paiement en ligne (Wave / Orange Money) pour les commandes Senegal/Mali.
- Upload d'images vers Cloudinary depuis l'admin.
- Deploiement : Vercel pour le site, Supabase pour les donnees.

## Deploiement rapide (une fois pret)

```bash
# Pousser le projet sur GitHub, puis connecter le repo sur vercel.com
# Ou en local avec la CLI Vercel :
npx vercel
```
