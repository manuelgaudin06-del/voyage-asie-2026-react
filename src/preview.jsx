import { createRoot } from 'react-dom/client';
import { BoutonOrganic } from './components/ui/BoutonOrganic';

// Page d'aperçu jetable pour visualiser le composant BoutonOrganic.
function Preview() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        alignItems: 'center',
        justifyContent: 'center',
        // Fond chaud rappelant la peinture, pour juger ombres + pétales.
        background:
          'radial-gradient(120% 120% at 50% 0%, #f3e4c4 0%, #e8cda0 45%, #cdb189 100%)',
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <BoutonOrganic variant="voyage" href="#">Découvrir le voyage</BoutonOrganic>
        <BoutonOrganic variant="photos" href="#">Galerie photos</BoutonOrganic>
      </div>

      <p style={{ color: '#5d6d7e', fontSize: '0.9rem', letterSpacing: '1px' }}>
        survol = soulèvement · pétales animés
      </p>
    </div>
  );
}

createRoot(document.getElementById('preview-root')).render(<Preview />);
