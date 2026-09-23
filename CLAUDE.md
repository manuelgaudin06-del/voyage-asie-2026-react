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

## 📱 Mobile = priorité

Manuel consultera surtout le site **sur téléphone pendant le voyage** → le rendu mobile prime.
Passe responsive faite le **2026-06-22** (déployée) :
- Sous **860 px** (`src/index.css`) : `.program-shell` passe en flex colonne (nav + cadre dans le
  flux, fond toujours absolu), onglets nav + filtres pays en `flex-wrap` centrés, accueil empilé,
  recherche pleine largeur. Le **haïku de l'accueil a été retiré** (JSX + CSS).
- Carte (`public/program.html`) : la légende (`#legend`) est **repliable** sur mobile (classe
  `is-collapsed` + bouton `#legend-toggle` caché en desktop), sinon elle recouvrait la carte.
- **Débordement horizontal des cartes corrigé** (cause = grilles `1fr` avec plancher de largeur) :
  `.place-card` et `.card-grid` passés en `minmax(0, 1fr)` + `min-width: 0` ; sous **560 px**,
  vignette photo 96→64 px, marges réduites, `overflow-wrap: anywhere` sur les textes.
- Méthode de vérif : Playwright en iPhone (390 px) **et** 320 px, + détecteur d'éléments qui
  dépassent la largeur (boucle qui compare `getBoundingClientRect().width` au viewport).
- **Reste à faire mobile** : confort tactile de la carte ; tailles texte/boutons.

## 🇹🇭 Thaïlande — ✅ DÉLÉGUÉ (2026-09-20), ne plus s'en occuper

**Décision Manuel (2026-09-20) : l'itinéraire thaïlandais est pris en charge par son collègue, dont la famille vit sur place.** Plus rien à chercher, réserver ou trancher de notre côté (ni Koh Chang, ni Koh Samet, ni Ayutthaya, ni Kanchanaburi). Ne pas remonter ce sujet comme une tâche ouverte. Si les dates/lieux définitifs arrivent un jour, il n'y aura qu'à les injecter dans `tripData.js` + `program.html`.

### (archive) Réflexion du 2026-06-30, non tranchée à l'époque

**Statut au 2026-06-30 : pas encore décidé.** Manuel trouve que
9 jours collés à Bangkok c'est dommage → envie de s'éloigner. Un ami (qui a un contact local)
recommande **Koh Chang** et **Koh Samet** (îles du golfe) + **Ayutthaya**. Koh Samet est déjà
au programme ; Koh Chang serait un **ajout** (plus grande, jungle, mais ~5-6 h de Bangkok, vers
la frontière cambodgienne → ne vaut le coup qu'avec ≥3 nuits).

**Voiture de location : écartée** pour ce voyage (inutile à Bangkok = Grab/métro ; inutile sur
les îles = scooters sur place ; ne reste que les longs transferts → un **minivan privé avec
chauffeur** fait mieux sans le stress permis international / conduite à gauche). Combo retenu si
on part sur les îles : Grab/métro à Bangkok + minivan chauffeur pour les gros trajets + scooters
sur les îles.

**Exemple de trajet "côte est / îles" proposé (13 → 22 nov.)** — Samet en escale 1 nuit sur la
route vers Koh Chang (même côte est) :

| Date | Programme | Nuit |
|---|---|---|
| 13/11 | Arrivée Bangkok ~22h | Bangkok (famille) |
| 14/11 | Bangkok essentiels (Grand Palace, Wat Pho, Wat Arun sunset), journée anti-jetlag | Bangkok |
| 15/11 | Route est → Koh Samet (Sai Kaew, coucher Ao Phai) | Koh Samet |
| 16/11 | Matin snorkel/plage → ferry → route Trat → ferry Koh Chang | Koh Chang |
| 17/11 | Koh Chang : plages côte ouest + cascade Klong Plu | Koh Chang |
| 18/11 | Koh Chang : snorkeling/bateau îles voisines (Koh Rang, Koh Wai) | Koh Chang |
| 19/11 | Matin Koh Chang → ferry + longue route retour Bangkok (~5-6 h) | Bangkok |
| 20/11 | Ayutthaya en journée (ruines UNESCO, ~1h30) | Bangkok |
| 21/11 | Bangkok (Chatuchak/Chinatown + shopping ICONSIAM) → transfert aéroport soir | — |
| 22/11 | Vol retour 00:05 → Paris | ✈️ |

- ✅ 3 nuits Koh Chang + 1 nuit Koh Samet bonus, on garde Bangkok + Ayutthaya.
- ❌ **Sacrifie Kanchanaburi** (Kwai/Erawan) — pas casable en 9 jours avec Koh Chang.
- ⚠️ Le 19/11 = grosse journée de transport.
- Variantes évoquées : zapper Samet et faire 4 nuits Koh Chang ; ou garder Kanchanaburi à la
  place de Samet (mais directions opposées = plus fatigant).

~~**Prochaine étape** : Manuel décide (garder Koh Samet seul vs ajouter Koh Chang)~~ → **caduc, délégué au collègue (20/09)**. Si besoin un jour, on
intègre dans `tripData.js` + `program.html` (ajouter lieux Koh Chang en IDs 7xxx, MAJ
`DAILY_ITINERARY`/dates, villes correctes — ⚠️ certains lieux Kanchanaburi/Ayutthaya sont
actuellement taggés `city: 'Bangkok'` par erreur dans tripData.js).

## 📋 Mises à jour futures (à faire)

1. **Alléger les icônes du menu** (⚠️ priorité, important pour le chargement **en 4G** en voyage) :
   `src/assets/icons/*.png` (icon-home, icon-map, icon-discover, icon-itinerary, icon-transport,
   icon-gallery) font ~1 Mo chacune (~6 Mo total) pour un affichage ~25 px. Confirmé à chaque
   `npm run deploy` (le build les liste). → Les convertir en **WebP** (comme les photos).
2. **Vraies photos par lieu** : trouver une source fiable pour la photo réelle de chaque lieu
   (Wikimedia bloqué localement ; piste = API d'images avec clé, ou curation manuelle).
3. **(Optionnel)** Nom de domaine perso pour une URL plus jolie.
4. **(Optionnel)** Repasser sur GitHub Actions si le PAT obtient le scope `workflow`
   (déploiement auto à chaque push au lieu de `npm run deploy` manuel).
