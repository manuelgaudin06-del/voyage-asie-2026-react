# Modifications realisees

Date : 18 juin 2026

## Page d'accueil

- Remplacement de l'ancienne entree par une page de garde React avec decor panoramique.
- Ajout du fond peint `fond-accueil-wide.png` / `fond-accueil.png`.
- Ajout des boutons organiques dores/bleu-gris avec fonds SVG et petales decoratifs.
- Ajout d'une animation de transition depuis la page de garde vers le programme.
- Le bouton `Decouvrir le voyage` ouvre la vue `Journee`.
- Le bouton `Galerie photos` ouvre la vue `Photo`.

## Navigation et pages

- Mise en place de routes React :
  - `/`
  - `/itineraire`
  - `/journee`
  - `/photos`
  - `/restaurants`
  - `/guide`
- Ajout d'une barre de navigation persistante : `Itineraire`, `Journee`, `Photo`, `Resto`, `Guide`.
- Extraction des donnees de voyage dans `src/data/tripData.js`.
- Ajout de vues React pour les pages programme.
- Correction de l'onglet `Itineraire` pour restaurer la vraie carte interactive Leaflet via `program.html?tab=itineraire&embed=1`.

## Programme existant

- Adaptation de `public/program.html` pour accepter le mode integre `embed=1`.
- Ajout de la selection d'onglet par URL avec `?tab=...`.
- Masquage de la barre d'onglets interne quand le programme est integre dans le shell React.
- Ajustement de la vue `Journee par journee` :
  - suppression du grand fond opaque,
  - transparence pour laisser apparaitre l'image de trame,
  - palette claire inspiree du fond peint.

## Composants ajoutes

- `BoutonOrganic` : bouton organique reutilisable.
- `FallingPetals` : animation CSS de petales de cerisier.
- Donnees de voyage exportees dans `src/data/tripData.js`.

## Verifications

- `npm run build` passe.
- Verification navigateur de `/itineraire` :
  - onglet actif `itineraire`,
  - carte Leaflet visible,
  - tuiles chargees,
  - marqueurs visibles.
- Verification navigateur des routes principales pendant le developpement.

## Notes

- `program.html` reste encore un fichier historique important et volumineux.
- La migration complete vers des composants React propres devra continuer progressivement, en priorisant les vues `Photo`, `Resto`, `Journee`, puis `Guide`.
