# Chic House -- Site e-commerce (V1)

Site vitrine + boutique pour Chic House. Catalogue connecte a Supabase, panier,
recherche instantanee, favoris, filtres, produits similaires, et commande
finalisee entierement via WhatsApp (aucun paiement en ligne pour l'instant).

## Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS v4**
- **Supabase** : base de donnees (catalogue produits) + authentification (admin)
- Panier et favoris geres en `localStorage` (contextes React)

## Demarrer en local

```bash
npm install
npm run dev
```

Le site est alors accessible sur http://localhost:3000

Necessite un fichier `.env.local` a la racine (voir "Variables d'environnement" ci-dessous) -- sans lui, le site ne peut pas se connecter a Supabase.

## Variables d'environnement

Creez un fichier `.env.local` a la racine du projet (jamais pousse sur GitHub, deja exclu par `.gitignore`) :

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
```

Ces memes valeurs doivent **aussi** etre ajoutees dans **Vercel -> Settings -> Environment Variables** pour que le site fonctionne une fois deploye (les deux environnements, local et Vercel, sont independants).

## Structure du projet

```
src/
  app/
    page.tsx                     -> Accueil (hero avec photo, nouveautes, best-sellers, temoignages)
    boutique/                     -> Liste des produits, filtre par categorie (URL) + filtres taille/couleur/prix
    produit/[slug]/                -> Fiche produit + section "Vous aimerez aussi" (produits similaires)
    panier/                        -> Panier + bouton "Commander sur WhatsApp"
    favoris/                       -> Liste des favoris enregistres (localStorage)
    contact/, a-propos/, cgv/
    admin/                         -> Interface admin protegee
      login/                       -> Connexion (email/mot de passe Supabase Auth)
      produits/nouveau/             -> Formulaire d'ajout de produit
      produits/[slug]/               -> Formulaire de modification de produit
      layout.tsx                    -> Protege toutes les routes /admin/*
  components/
    Header.tsx                     -> Logo, navigation, recherche, favoris, panier
    Footer.tsx                     -> Logo, liens, infos contact
    ProductCard.tsx                 -> Vignette produit (avec bouton favori)
    SearchOverlay.tsx               -> Fenetre de recherche instantanee
    BoutiqueFilters.tsx             -> Filtres taille / couleur / prix (page Boutique)
    WhatsAppFloatingButton.tsx      -> Bouton WhatsApp flottant global
  context/
    CartContext.tsx                 -> Etat global du panier (localStorage)
    FavoritesContext.tsx            -> Etat global des favoris (localStorage)
  data/products.ts                  -> Requetes Supabase (liste, par categorie, par slug)
  lib/
    supabase.ts                     -> Client Supabase (lit .env.local)
    whatsapp.ts                     -> Construction des liens/messages WhatsApp
```

## Base de donnees Supabase

Table unique `products` avec row-level security activee :

- **Lecture** : publique (tout le monde peut voir les produits)
- **Ecriture** (insert/update/delete) : reservee aux utilisateurs authentifies (vous, via `/admin`)

Colonnes : `slug`, `name`, `price`, `category`, `sizes` (tableau), `colors` (tableau), `description`, `is_new`, `is_promo`, `promo_price`, `stock`, `image_url`, `created_at`.

## Compte admin

Cree manuellement dans **Supabase -> Authentication -> Users**. Connexion sur `/admin/login`, puis gestion complete du catalogue (ajout, modification, suppression) sur `/admin`.

## Fonctionnement des commandes

**Aucune commande n'est enregistree dans Supabase.** Le site fonctionne comme un catalogue : chaque "Ajouter au panier" reste en local (navigateur du client), et le bouton final **"Commander sur WhatsApp"** ouvre une conversation WhatsApp avec un message pre-rempli (produits, tailles, couleurs, quantites, total). La suite -- adresse, paiement, livraison -- se negocie manuellement sur WhatsApp, comme avant le site.

Le numero WhatsApp utilise partout sur le site est defini dans `src/lib/whatsapp.ts` (`WHATSAPP_NUMBER`).

## Deploiement

Le projet est connecte a GitHub (`salifsamake10/Chic-house`) et a Vercel : chaque `git push` sur la branche `main` declenche un redeploiement automatique.

```bash
git add .
git commit -m "Description du changement"
git push
```

## Points de vigilance connus

- **OneDrive** : si le projet est dans un dossier synchronise OneDrive/Google Drive/Dropbox, des erreurs de verrouillage de fichier (`.next`) peuvent apparaitre. Si ca arrive : fermez `npm run dev`, supprimez le dossier `.next`, relancez. Pour eviter le probleme durablement, sortir le projet de OneDrive.
- **Extensions de fichiers Windows** : en enregistrant une image (logo, photo), Windows peut creer un double suffixe (ex. `logo.png.jpeg` au lieu de `logo.png`). Toujours verifier avec `dir` dans PowerShell que le nom de fichier est exact.
- **Supabase en pause** : sur le plan gratuit, un projet Supabase inactif plus d'une semaine se met en pause automatiquement (erreur "521: Web server is down" ou "fetch failed"). Solution : Supabase -> ouvrir le projet -> "Restore project", patienter 1-2 minutes.
- **Copier-coller de code** : en integrant du code fourni par etapes, verifier qu'aucun bloc n'a ete colle deux fois (imports dupliques, declarations `useState` dupliquees, ou blocs JSX dupliques qui n'empechent pas le build mais dedoublent l'affichage).

## Ce qui reste a faire (V2 et au-dela)

- Remplacer les placeholders visuels restants par de vraies photos produits (Cloudinary recommande pour l'upload et l'optimisation automatique)
- Completer les CGV (`src/app/cgv/page.tsx`) avec les informations legales de l'entite malienne
- Paiement en ligne (Wave / Orange Money) pour les commandes Senegal/Mali, si le volume le justifie un jour
- Suivi de commande et historique client -- necessiterait d'abord de reintroduire un enregistrement des commandes en base, actuellement volontairement absent (choix V1 : tout passe par WhatsApp)
