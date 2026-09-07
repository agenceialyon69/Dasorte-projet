# Adriana Da Sorte — Site officiel

Portfolio / digital comp card / booking pour Adriana Da Sorte (Model · Stylist · Content Creator, Paris / Lyon).

---

## 1. Stack

**HTML / CSS / JS statique, sans framework, sans backend.**

Décision assumée : aucune donnée dynamique ni CMS serveur n'était disponible ni nécessaire pour ce périmètre. Un site statique bien construit est plus rapide, moins cher à héberger, sans dépendance de build, et modifiable par n'importe qui sachant éditer du HTML — tout en couvrant 100% du besoin (portfolio, comp card, formulaire de booking via un service tiers).

Si le projet évolue vers un vrai CMS (Adriana doit changer ses photos elle-même sans toucher au code), voir §8 "Évolution vers un CMS".

## 2. Structure du projet

```
/
├── index.html              — page principale (hero, work, profile, services, comp card, book)
├── 404.html                 — page d'erreur éditoriale
├── legal.html                — mentions légales / confidentialité (placeholders à compléter)
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/style.css        — design system complet (tokens, composants)
│   ├── js/main.js           — nav mobile, reveal au scroll, filtres galerie, lightbox, validation formulaire
│   ├── img/                 — photos (16 clichés curatés + og-cover.jpg)
│   └── pdf/comp-card.pdf    — comp card téléchargeable (recto/verso)
└── README.md
```

## 3. Design system (résumé — voir `assets/css/style.css` pour les tokens complets)

- **Couleurs** : `--paper #F5F3EE` (fond), `--ink #0A0A0A` (texte), `--warm #B9B4AB` (décoratif uniquement — contraste insuffisant pour du texte, voir §7), `--ink-soft #6B6459` (texte secondaire, contraste validé AA), `--dark #1C1C1C` (footer / sections inversées).
- **Typographie** : Bodoni Moda (display, éditorial) + DM Sans (UI, corps de texte). Deux familles maximum, chargées via Google Fonts.
- **Grille** : `.wrap` max-width 1200px. Breakpoints principaux à 900px, 780px, 640px, 560px.
- **Composants** : boutons (`.btn-solid-ink`, `.btn-ghost-ink`, variantes hero sur fond sombre), cartes services, filtres galerie, lightbox, formulaire.

## 4. Contenu — ce qui est réel vs. ce qui est un placeholder

**Réel et vérifiable** : nom, rôles (Model/Stylist/Content Creator — tels qu'affichés sur son propre profil Instagram), localisation (Paris/Lyon), @adrianadasorte (Instagram + TikTok), nombre d'abonnés (~9,5K au moment de la capture), les 16 photos (issues de captures d'écran de son profil Instagram, recadrées et sélectionnées).

**Placeholder explicite — à compléter avant mise en ligne**, jamais inventé :
- Mensurations comp card (taille, tour de poitrine/taille/hanches, pointure, cheveux, yeux) → "À renseigner"
- Email de contact → à ajouter (actuellement seuls Instagram/TikTok sont utilisés comme canaux)
- Mentions légales (raison sociale, hébergeur, directeur de publication) → voir `legal.html`
- Showreel → section prête, vidéo non fournie ("coming soon")
- "Selected Collaborations" → volontairement omise : aucune collaboration de marque vérifiée n'a été fournie. Ne pas ajouter de logo de marque sans preuve réelle d'une collaboration.

## 5. Booking form

Le formulaire (`#book`) est validé côté client (champs requis, format email, honeypot anti-spam) mais **n'est pas encore connecté à un service d'envoi réel**.

**Pour l'activer (5 minutes)** :
1. Créer un compte sur [formspree.io](https://formspree.io) (gratuit jusqu'à 50 soumissions/mois).
2. Créer un formulaire, récupérer l'ID fourni (`xxxxxxxx`).
3. Dans `index.html`, remplacer `YOUR_FORM_ID` dans l'attribut `action` du `<form id="bookForm">` par cet ID.
4. Tester un envoi réel.

Alternative : brancher n'importe quel autre service (Basin, Getform, ou une fonction serverless Vercel si le projet passe à un vrai backend).

## 6. Comp Card PDF

Généré depuis une source HTML dédiée (non incluse dans ce dépôt de production — fichier de travail). Pour régénérer le PDF après une mise à jour des mensurations : recréer le HTML recto/verso avec les nouvelles données et l'exporter en PDF A4 (n'importe quel outil d'impression HTML→PDF, ex. impression navigateur "Enregistrer en PDF").

## 7. Accessibilité — points vérifiés

- Contraste texte : `--ink` sur `--paper` = 17.85:1. `--ink-soft` sur `--paper` = 5.27:1 (AA). **`--warm` (#B9B4AB) ne doit jamais être utilisé pour du texte courant** — testé à 1.86:1 sur fond clair, très en dessous du minimum WCAG AA (4.5:1). Réservé aux bordures et éléments décoratifs.
- Navigation clavier : focus visible sur tous les liens/boutons/champs, lightbox et menu mobile fermables au clavier (Échap), navigation galerie au clavier (flèches, Entrée/Espace).
- `prefers-reduced-motion` respecté : toutes les animations (reveal au scroll, transitions) sont désactivées si l'utilisateur le demande.
- Skip-link ("Aller au contenu") en tout premier élément du DOM.
- Alt text descriptif sur chaque image (pas de "image1.jpg").

## 8. SEO

- `<title>`, meta description, canonical, Open Graph, Twitter Card, JSON-LD `Person` (uniquement des champs vérifiés — pas d'`award`, pas d'`alumniOf` inventés).
- `robots.txt` + `sitemap.xml` inclus.
- URLs actuellement réglées sur `https://dasorte-projet.vercel.app/` (domaine réel de déploiement). **Si un nom de domaine personnalisé est connecté plus tard** (ex : adrianadasorte.com), remplacer cette URL dans `index.html` (canonical, OG, JSON-LD), `robots.txt` et `sitemap.xml`.

## 9. Déploiement

Ce dépôt est prêt pour un hébergement statique (Vercel, Netlify, GitHub Pages).

**Vercel (recommandé, déjà connecté à ce dépôt)** :
Le projet est lié au dépôt GitHub `agenceialyon69/dasorte-projet` — chaque push sur la branche par défaut déclenche un déploiement automatique.

**Déploiement manuel alternatif** :
```bash
npx vercel --prod
```
(depuis la racine du projet, aucune étape de build nécessaire — site 100% statique)

## 10. Analytics (non installé par défaut)

Recommandation : [Plausible](https://plausible.io) ou [Vercel Analytics](https://vercel.com/analytics) (respectueux de la vie privée, sans bannière cookie nécessaire dans la plupart des cas). Événements à suivre en priorité : clics "Book Adriana", téléchargement comp card, clics Instagram/TikTok, soumissions formulaire.

## 11. Maintenance courante (sans compétence technique)

- **Changer une photo** : remplacer le fichier correspondant dans `assets/img/` en gardant le même nom, ou éditer `index.html` pour pointer vers un nouveau fichier.
- **Modifier un texte** : ouvrir `index.html`, chercher le texte à changer (Ctrl+F), l'éditer directement — c'est du texte brut dans des balises HTML.
- **Ajouter un lien de contact** : dans `index.html`, section `#book` et footer, dupliquer une ligne `<a class="contact-link" href="...">`.

## 12. Checklist avant mise en ligne

- [x] Site déployé et en ligne : https://dasorte-projet.vercel.app/
- [ ] Connecter un nom de domaine personnalisé si souhaité (Vercel → Project Settings → Domains), puis mettre à jour les URLs SEO (§8)
- [ ] Connecter le formulaire à Formspree (ou équivalent) — voir §5
- [ ] Renseigner les mensurations réelles ou décider de ne pas les publier
- [ ] Ajouter une vraie adresse email de contact
- [ ] Compléter `legal.html` (raison sociale, hébergeur)
- [ ] Décider d'une politique cookies/analytics et l'appliquer avant d'installer un tracker
- [ ] Fournir un showreel (30–45s) si disponible, ou laisser "coming soon"
- [ ] Vérifier les liens Instagram/TikTok pointent vers les bons comptes
- [ ] Repasser un audit Lighthouse une fois le vrai domaine actif

## 13. Ce qui n'a volontairement pas été fait

- Pas de multi-page réel (`/work`, `/profile`, etc. séparés) : le site est une page unique avec ancres, choix pragmatique pour un portfolio de cette taille. Migration possible plus tard en scindant `index.html` par section, en réutilisant le même `style.css`.
- Pas de CMS : aucune donnée à faire persister ne le justifiait à ce stade.
- Pas de "Selected Collaborations" : aucune collaboration de marque vérifiée fournie — voir §4.
