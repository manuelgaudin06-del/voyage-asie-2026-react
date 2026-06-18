import './BoutonOrganic.css';

/**
 * Bouton au style « organique / peinture » repris de la maquette de Manuel :
 * contour irrégulier (border-radius asymétrique), ombres douces (relief + inset),
 * pétales de cerisier flottants, et léger soulèvement au survol.
 *
 * Props :
 *   - variant : 'voyage' (sable) | 'photos' (bleu)  → couleur + forme du contour
 *   - href    : si fourni, rend un <a> ; sinon un <button>
 *   - petals  : affiche les pétales décoratifs (actif par défaut sur le bouton voyage)
 */
const VARIANTS = {
  voyage: 'bouton-organic--voyage',
  photos: 'bouton-organic--photos',
};

export function BoutonOrganic({
  children,
  variant = 'voyage',
  href,
  onClick,
  petals,
  className = '',
  ...rest
}) {
  const showPetals = petals ?? variant === 'voyage';
  const classes = [
    'bouton-organic',
    VARIANTS[variant] || VARIANTS.voyage,
    showPetals ? 'bouton-organic--petals' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Tag = href ? 'a' : 'button';

  return (
    <Tag className={classes} href={href} onClick={onClick} {...rest}>
      <span className="bouton-organic__label">{children}</span>
      {showPetals && (
        <span className="bouton-organic__petals" aria-hidden="true">
          <span className="bouton-organic__petal bouton-organic__petal--1" />
          <span className="bouton-organic__petal bouton-organic__petal--2" />
          <span className="bouton-organic__petal bouton-organic__petal--3" />
          <span className="bouton-organic__petal bouton-organic__petal--4" />
        </span>
      )}
    </Tag>
  );
}
