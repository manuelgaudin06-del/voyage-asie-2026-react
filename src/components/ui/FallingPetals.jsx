import { useMemo } from 'react';
import './FallingPetals.css';

/** Couleurs d'automne tirées au hasard pour chaque feuille (remplissage + nervure). */
const LEAF_COLORS = [
  { fill: '#d64b3f', vein: '#a8392f' }, // rouge
  { fill: '#f2b134', vein: '#cf8e1d' }, // jaune
  { fill: '#e8843c', vein: '#bf6526' }, // orange
];

/** Construit le data-URL SVG d'une feuille avec les couleurs fournies. */
function leafSvg({ fill, vein }) {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>` +
    `<path d='M12 2C9 6 4 8 4 13c0 4 3.6 7 8 7s8-3 8-7c0-5-5-7-8-11z' fill='${fill}'/>` +
    `<path d='M12 3.5C10 7 6 8.6 6 12.8' stroke='${vein}' stroke-width='0.6' fill='none' opacity='0.6'/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * Pluie de feuilles en CSS (léger, pas de WebGL).
 * Chaque feuille a une position, une vitesse, un délai et une couleur
 * aléatoires pour un effet naturel. Calculé une seule fois (useMemo).
 */
export function FallingPetals({ count = 16 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 12 + Math.random() * 14,
        fallDur: 9 + Math.random() * 8,
        swayDur: 3 + Math.random() * 2.5,
        delay: -Math.random() * 14, // négatif => certaines déjà en chute au chargement
        opacity: 0.55 + Math.random() * 0.4,
        color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
      })),
    [count]
  );

  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            backgroundImage: leafSvg(p.color),
            animationDuration: `${p.fallDur}s, ${p.swayDur}s`,
            animationDelay: `${p.delay}s, ${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
