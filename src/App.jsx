import { useCallback, useEffect, useRef, useState } from 'react';
import './index.css';
import createGlobe from 'cobe';
import { VideoText } from './components/ui/VideoText';

const PHASE1_MS = 1000; // durée de l'expansion plein écran de la vidéo

// Marqueurs du globe. clickable => déclenche la transition au clic (pays du voyage).
const TRIP_MARKERS = [
  { location: [48.8566, 2.3522], size: 0.05, clickable: false }, // Paris (départ)
  { location: [37.5665, 126.9780], size: 0.08, clickable: true }, // Séoul
  { location: [35.6762, 139.6503], size: 0.08, clickable: true }, // Tokyo
  { location: [34.6937, 135.5023], size: 0.06, clickable: true }, // Osaka
  { location: [35.0116, 135.7681], size: 0.06, clickable: true }, // Kyoto
  { location: [13.7563, 100.5018], size: 0.08, clickable: true }, // Bangkok
];

const THETA = 0.2;
const DEG = Math.PI / 180;
const MARKER_RADIUS = 0.8; // ee (0.8) + markerElevation (0) — d'après la source de cobe

/**
 * Reproduit la projection interne de cobe (fonctions U + O décodées du shader) :
 * convertit [lat, lng] en coordonnées écran normalisées [0,1] et indique si le
 * point est sur la face avant (visible) du globe.
 */
function projectMarker([lat, lng], phi, theta, aspect) {
  const latR = lat * DEG;
  const a = lng * DEG - Math.PI;
  const o = Math.cos(latR);
  const tx = -o * Math.cos(a) * MARKER_RADIUS;
  const ty = Math.sin(latR) * MARKER_RADIUS;
  const tz = o * Math.sin(a) * MARKER_RADIUS;

  const ct = Math.cos(theta), st = Math.sin(theta);
  const cp = Math.cos(phi), sp = Math.sin(phi);

  const c = cp * tx + sp * tz;
  const s = sp * st * tx + ct * ty - cp * st * tz;
  const depth = -sp * ct * tx + st * ty + cp * ct * tz;

  const x01 = (c / aspect + 1) / 2;
  const y01 = (-s + 1) / 2;
  const hidden = depth >= 0 || c * c + s * s >= 0.64;
  return { x01, y01, visible: !hidden };
}

function App() {
  const canvasRef = useRef();
  const videoBgRef = useRef();
  const phiRef = useRef(2.0);
  const leavingRef = useRef(false);
  const [leaving, setLeaving] = useState(false);

  // ---- Phase 1 : la vidéo derrière les lettres s'agrandit en plein écran ----
  const startLeaving = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);

    try {
      // Indique à program.html d'afficher le voile vidéo d'arrivée (handoff fluide).
      sessionStorage.setItem('voyage_from_home', '1');
    } catch (err) {
      /* sessionStorage indisponible : la navigation reste fonctionnelle */
    }

    const vt = videoBgRef.current;
    if (vt) {
      vt.style.animation = 'none'; // coupe l'animation d'entrée (fadeBlur) pour libérer le transform
      const r = vt.getBoundingClientRect();
      Object.assign(vt.style, {
        position: 'fixed',
        margin: '0',
        transform: 'none',
        top: `${r.top}px`,
        left: `${r.left}px`,
        width: `${r.width}px`,
        height: `${r.height}px`,
        zIndex: '60',
        transition: 'none',
      });
      vt.classList.add('is-leaving'); // déclenche le fondu du masque blanc => vidéo plein cadre

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';
          vt.style.transition = `top ${PHASE1_MS}ms ${ease}, left ${PHASE1_MS}ms ${ease}, width ${PHASE1_MS}ms ${ease}, height ${PHASE1_MS}ms ${ease}`;
          vt.style.top = '0px';
          vt.style.left = '0px';
          vt.style.width = '100vw';
          vt.style.height = '100dvh';
        })
      );
    }

    window.setTimeout(() => {
      window.location.href = '/program.html';
    }, PHASE1_MS);
  }, []);

  // Référence stable pour appeler startLeaving depuis l'effet (deps vides).
  const startLeavingRef = useRef(startLeaving);
  startLeavingRef.current = startLeaving;

  const onButtonClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.button === 1) return; // laisse l'ouverture en nouvel onglet
    e.preventDefault();
    startLeavingRef.current();
  };

  useEffect(() => {
    let phi = 2.0;
    let targetPhi = 2.0;
    const theta = THETA;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startPhi = 0;
    let movedDist = 0;

    const canvas = canvasRef.current;

    // Renvoie le marqueur cliquable visible sous (clientX, clientY), s'il y en a un.
    const markerAt = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return null;
      const aspect = rect.width / rect.height;
      const threshold = Math.min(44, Math.max(22, rect.width * 0.07));
      let best = null;
      let bestDist = Infinity;
      for (const m of TRIP_MARKERS) {
        if (!m.clickable) continue;
        const p = projectMarker(m.location, phi, theta, aspect);
        if (!p.visible) continue;
        const px = rect.left + p.x01 * rect.width;
        const py = rect.top + p.y01 * rect.height;
        const d = Math.hypot(clientX - px, clientY - py);
        if (d < threshold && d < bestDist) {
          bestDist = d;
          best = m;
        }
      }
      return best;
    };

    const onPointerDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startPhi = targetPhi;
      movedDist = 0;
      canvas.style.cursor = 'grabbing';
    };

    const stopDragging = () => {
      isDragging = false;
      canvas.style.cursor = 'grab';
    };

    const onPointerUp = (e) => {
      const wasDragging = isDragging;
      stopDragging();
      // Un vrai clic (peu de mouvement) sur un pays déclenche la transition.
      if (wasDragging && movedDist < 6 && markerAt(e.clientX, e.clientY)) {
        startLeavingRef.current();
      }
    };

    const onPointerMove = (e) => {
      if (isDragging) {
        const delta = e.clientX - startX;
        movedDist = Math.max(movedDist, Math.hypot(e.clientX - startX, e.clientY - startY));
        targetPhi = startPhi + delta * 0.005;
      } else {
        // Affordance : curseur "pointer" au survol d'un pays cliquable.
        canvas.style.cursor = markerAt(e.clientX, e.clientY) ? 'pointer' : 'grab';
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointerout', stopDragging);
    canvas.addEventListener('pointermove', onPointerMove);

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: 800,
      height: 800,
      phi: phi,
      theta: theta,
      dark: 0, /* 0 => sphère claire + continents foncés (lisible sur fond blanc) */
      diffuse: 1.1,
      mapSamples: 16000,
      mapBrightness: 2.4, /* Contraste des continents : ↑ = continents plus foncés */
      baseColor: [0.74, 0.74, 0.78], /* Gris clair de la sphère : ↑ = plus clair */
      markerColor: [0.9, 0.16, 0.24], /* Marqueurs rouges (dessinés au-dessus du globe) */
      glowColor: [1, 1, 1], /* Halo blanc => bord doux qui se fond dans le fond blanc */
      markers: TRIP_MARKERS,
      onRender: (state) => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        state.width = canvas.clientWidth * dpr;
        state.height = canvas.clientHeight * dpr;

        if (!isDragging) {
          targetPhi += 0.002;
        }

        phi += (targetPhi - phi) * 0.08;
        phiRef.current = phi;

        state.phi = phi;
        state.theta = theta;
      }
    });

    return () => {
      globe.destroy();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointerout', stopDragging);
      canvas.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <div className="hero-wrapper">
      {/* Arrière-plan typographique vidéo */}
      <div className="video-text-background" ref={videoBgRef}>
        <VideoText src="/japan.mp4">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>VOYAGE</span>
            <span>ASIE</span>
          </div>
        </VideoText>
      </div>

      {/* Globe interactif 3D — cliquer un pays du voyage lance aussi la transition */}
      <div className="globe-container">
        <canvas ref={canvasRef} id="globe"></canvas>
      </div>

      {/* Contenu principal et call to action */}
      <div className={`hero-content ${leaving ? 'is-hidden' : ''}`}>
        <div className="badge">Septembre — Novembre 2026</div>
        <p className="destinations">Corée du Sud · Japon · Thaïlande</p>

        <a href="/program.html" className="magic-btn" onClick={onButtonClick}>
          <span className="magic-btn-text">Découvrir le programme</span>
          <span className="magic-btn-glow"></span>
        </a>
      </div>
    </div>
  );
}

export default App;
