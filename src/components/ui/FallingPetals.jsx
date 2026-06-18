import { useMemo } from 'react';
import './FallingPetals.css';

/**
 * Pluie de pétales de cerisier en CSS (léger, pas de WebGL).
 * Chaque pétale a une position, une vitesse et un délai aléatoires
 * pour un effet naturel. Calculé une seule fois (useMemo).
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
            animationDuration: `${p.fallDur}s, ${p.swayDur}s`,
            animationDelay: `${p.delay}s, ${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
