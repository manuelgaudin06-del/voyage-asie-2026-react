# CLAUDE.md — Voyage Asie 2026 (React)

Site perso d'itinéraire de voyage (Corée → Japon → Thaïlande, 30/09 → 22/11/2026).
Communiquer avec Manuel **en français**. Manuel est non-technique et apprend : expliquer
clairement, par étapes, et vérifier le résultat (Playwright est installé) avant d'affirmer.

## 🚀 Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de dev → http://localhost:5173/voyage-asie-2026-react/ |
| `npm run build` | Build de prod dans `dist/` |
| `npm run preview` | Sert le `dist/` buildé (simule GitHub Pages, sous-dossier) |
| `npm run deploy` | **Déploie en ligne** : build + copie index→404.html + push branche `gh-pages` |

## 🌐 En ligne (GitHub Pages)

- URL publique : **https://manuelgaudin06-del.github.io/voyage-asie-2026-react/**
- Repo : `github.com/manuelgaudin06-del/voyage-asie-2026-react` (public).
- Méthode = **branche `gh-pages`** (Settings → Pages → Deploy from a branch → gh-pages → /root).
  PAS GitHub Actions : le PAT de Manuel n'a **pas le scope `workflow`**, donc impossible de
  pousser un fichier `.github/workflows/`. Ne pas réessayer Actions sans régler le PAT d'abord.
- **Mettre à jour le site = `npm run deploy`**. L'URL ne change jamais (liée au nom du repo).

## 🏗️ Architecture

- **`src/App.jsx`** — toute l'app React (pages Journée/Photos/Resto/Guide), composée dans
  `ProgramShell`. Routage via react-router (`main.jsx`, BrowserRouter).
- **`public/program.html`** — la page **Itinéraire** (carte Leaflet + sidebar), affichée dans
  une **iframe** (`?embed=1`). C'est un gros fichier HTML autonome, hérité, vanilla JS.
- **`src/data/tripData.js`** — toutes les données (PLACES, PLACE_TYPES, TYPE_PHOTO_FALLBACK,
  TRANSPORT_*, DAILY_PHOTO_TIPS, COUNTRY_*…). Les lieux sont les "places".

## 🔑 Conventions / pièges importants

- **Sous-dossier GitHub Pages** : `base: '/voyage-asie-2026-react/'` (vite.config) +
  `basename={import.meta.env.BASE_URL}` (BrowserRouter). Tout chemin vers un fichier de
  `public/` écrit en **chaîne** (photos, icônes, iframe, fonds) DOIT passer par le helper
  **`asset(p)`** dans App.jsx (= `BASE + p`). Les `import` d'images sont gérés auto par Vite.
  Dans `program.html`, utiliser des chemins **relatifs** (`'icons/x.png'`, `'japan.mp4'`), pas `/...`.
- **404.html** = copie d'index.html (fait par `npm run deploy`) pour que les liens directs /
  refresh sur une sous-page marchent (SPA fallback). De plus GitHub ajoute un slash final
  (`/photos`→`/photos/`) : `ProgramShell` normalise via `path = pathname.replace(/\/+$/,'')`.
- **Photos des lieux** : hébergées en **local** dans `public/photos/*.webp` (WebP compressé,
  ~11 Ko/img, 96×96 à l'affichage). `TYPE_PHOTO_FALLBACK` = un **tableau** d'images par type ;
  `typeFallbackPhoto(place)` en choisit une de façon déterministe (hash de `place.id`) → variété.
  ⚠️ **Wikimedia est bloqué sur la machine de Manuel** (HTTP 400, antivirus/pare-feu) : ne pas
  hotlinker Wikimedia. Source de DL qui marche = **loremflickr** (par mot-clé). Récupérer la
  "vraie" photo de chaque lieu précis n'est PAS fiable automatiquement (~40 % de bons résultats).
- **Transitions de page** = `framer-motion` (motion.section dans ProgramShell) : 0,5 s de
  "fond seul" puis pop élastique (spring). La **brume** = CSS `.page-reveal::before/::after`
  (index.css), décalée de 0,5 s. Régler l'intensité du pop via `damping` dans App.jsx.
- **Supabase** : retiré de `program.html` (`supabaseClient = null`). Données en localStorage.
- **Vérifier visuellement** : Playwright est en devDep. Pour tester, scripter un `.mjs` jetable
  (préfixé `_`, ignoré par git) qui charge l'URL et lit/screenshote ; nettoyer après.

## 📋 Mises à jour futures (à faire)

1. **Alléger les icônes du menu** : `src/assets/icons/*.png` (icon-home, icon-map, icon-discover,
   icon-itinerary, icon-transport, icon-gallery) font ~1 Mo chacune (~6 Mo total) pour un
   affichage ~25 px. → Les convertir en **WebP** (comme les photos) pour accélérer le chargement.
2. **Vraies photos par lieu** : trouver une source fiable pour la photo réelle de chaque lieu
   (Wikimedia bloqué localement ; piste = API d'images avec clé, ou curation manuelle).
3. **(Optionnel)** Nom de domaine perso pour une URL plus jolie.
4. **(Optionnel)** Repasser sur GitHub Actions si le PAT obtient le scope `workflow`
   (déploiement auto à chaque push au lieu de `npm run deploy` manuel).
