import { useState } from 'react';
import './VideoText.css';

/**
 * Texte « rempli » par une vidéo via mix-blend-mode.
 *
 * Empilement (du fond vers l'avant) :
 *   1. .video-text-fallback  — dégradé aurora animé (toujours visible, hors-ligne OK)
 *   2. .video-text-video     — la vidéo ; si elle échoue, on la masque et l'aurora reste
 *   3. .video-text-overlay   — fond blanc + texte noir en mix-blend-mode: screen
 *      => le noir du texte laisse transparaître ce qui est derrière, le blanc reste blanc.
 */
export function VideoText({ src, poster, children, className = '' }) {
  const [videoOk, setVideoOk] = useState(true);

  return (
    <div className={`video-text-wrapper ${className}`}>
      {/* 1. Fond de secours : aurora animée, toujours présent */}
      <div className="video-text-fallback" aria-hidden="true" />

      {/* 2. Vidéo (masquée proprement si le fichier est absent ou bloqué) */}
      {src && (
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="video-text-video"
          data-ready={videoOk ? 'true' : 'false'}
          onError={() => setVideoOk(false)}
          onCanPlay={() => setVideoOk(true)}
          aria-hidden="true"
        />
      )}

      {/* 3. Masque blanc + texte */}
      <div className="video-text-overlay">
        <h1 className="video-text-title">{children}</h1>
      </div>
    </div>
  );
}
