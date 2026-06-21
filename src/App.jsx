import { useMemo, useState } from 'react';
import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import './index.css';
import cameraIcon from './assets/icons/camera.png';
import discoverIcon from './assets/icons/icon-discover.png';
import galleryIcon from './assets/icons/icon-gallery.png';
import homeIcon from './assets/icons/icon-home.png';
import itineraryIcon from './assets/icons/icon-itinerary.png';
import mapIcon from './assets/icons/icon-map.png';
import transportIcon from './assets/icons/icon-transport.png';
import { BoutonOrganic } from './components/ui/BoutonOrganic';
import { FallingPetals } from './components/ui/FallingPetals';
import {
  CITY_COORDS,
  COUNTRY_FR,
  COUNTRY_HEX,
  COUNTRY_ORDER,
  DAILY_PHOTO_TIPS,
  PLACE_TYPES,
  PLACES,
  TRANSPORT_LEGS,
  TRANSPORT_MODES,
  TYPE_PHOTO_FALLBACK,
} from './data/tripData';

// Préfixe d'URL du site (= base Vite, ex. '/voyage-asie-2026-react/'). Sert pour tous
// les fichiers de public/ référencés par une chaîne (photos, icônes, iframe, fonds).
const BASE = import.meta.env.BASE_URL;
const asset = (p) => BASE + String(p).replace(/^\//, '');

const NAV_ITEMS = [
  { to: '/itineraire', label: 'Itinéraire', icon: itineraryIcon },
  { to: '/journee', label: 'Journée', icon: discoverIcon },
  { to: '/photos', label: 'Photo', icon: galleryIcon },
  { to: '/restaurants', label: 'Resto', icon: asset('icons/restaurant.png') },
  { to: '/guide', label: 'Guide', icon: mapIcon },
];

const TRANSITION_MS = 900;
const TRIP_START = '2026-09-30';
const TRIP_END = '2026-11-22';
const CONTENT_ROUTES = ['/itineraire', '/journee', '/photos', '/restaurants', '/guide'];

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {CONTENT_ROUTES.map((path) => (
        <Route key={path} path={path} element={<ProgramShell />} />
      ))}
    </Routes>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  function enterProgram(target) {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => navigate(target), TRANSITION_MS);
  }

  return (
    <main className={`cover ${leaving ? 'cover--leaving' : ''}`}>
      <div className="panorama panorama--cover" style={{ backgroundImage: `url(${asset('fond-accueil-wide.webp')})` }} />
      <div className="cover__veil" />
      <FallingPetals count={16} />

      <section className="cover__content" aria-label="Page de garde">
        <h1 className="cover__title">Voyage en Asie</h1>

        <div className="cover__haiku">
          <p>Monts enneigés</p>
          <p>Cerisiers qui fleurissent</p>
          <p>Voyage éternel.</p>
        </div>

        <div className="cover__cta">
          <BoutonOrganic variant="voyage" type="button" onClick={() => enterProgram('/journee')}>
            Découvrir
            <br />
            le voyage
          </BoutonOrganic>
          <BoutonOrganic
            variant="photos"
            type="button"
            petals={false}
            onClick={() => enterProgram('/photos')}
          >
            Galerie photos
          </BoutonOrganic>
        </div>
      </section>
    </main>
  );
}

function ProgramShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const [country, setCountry] = useState('all');
  const [query, setQuery] = useState('');
  // GitHub Pages peut ajouter un '/' final (ex. /photos/) -> on le retire pour comparer
  const path = location.pathname.replace(/\/+$/, '') || '/';
  const isItinerary = path === '/itineraire';
  const routeIndex = Math.max(0, CONTENT_ROUTES.indexOf(path));
  const panX =
    CONTENT_ROUTES.length > 1 ? (routeIndex / (CONTENT_ROUTES.length - 1)) * 100 : 50;

  const places = useMemo(() => {
    return PLACES.filter((place) => {
      if (country !== 'all' && place.country !== country) return false;
      if (!query.trim()) return true;
      const haystack = [place.name, place.city, place.desc, place.tips, ...(place.tags || [])]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query.trim().toLowerCase());
    });
  }, [country, query]);

  function renderPage() {
    if (path === '/itineraire') return <ItineraryPage places={places} />;
    if (path === '/photos') return <PhotosPage places={places} />;
    if (path === '/restaurants') return <RestaurantsPage places={places} />;
    if (path === '/guide') return <GuidePage places={places} />;
    return <DayPage places={places} />;
  }

  return (
    <main className="program-shell">
      <div
        className="panorama panorama--program"
        style={{ backgroundImage: `url(${asset('fond-accueil-wide.webp')})`, backgroundPosition: `${panX}% center` }}
      />
      <div className="program-shell__shade" />
      <FallingPetals count={12} />

      <nav className="program-nav" aria-label="Navigation du voyage">
        <BoutonOrganic
          variant="voyage"
          type="button"
          petals={false}
          className="bouton-organic--compact program-nav__home"
          onClick={() => navigate('/')}
        >
          <img className="program-nav__home-icon" src={homeIcon} alt="" />
          <span>Voyage en Asie</span>
        </BoutonOrganic>
        <div className="program-nav__links">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'program-nav__link program-nav__link--active' : 'program-nav__link'
              }
            >
              <img className="program-nav__link-icon" src={item.icon} alt="" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {isItinerary ? (
        <section className="program-frame program-frame--native page-reveal" key={path} aria-label="Itinéraire du voyage">
          <iframe
            title="Itinéraire interactif"
            src={asset('program.html?tab=itineraire&embed=1')}
            className="native-program-frame"
            allow="fullscreen"
            allowFullScreen
          />
        </section>
      ) : (
      <motion.section
        className="program-frame program-frame--react"
        aria-label="Programme du voyage"
        key={path}
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
        animate={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        transition={
          prefersReduced
            ? { delay: 0.5, duration: 0.3 }
            : {
                // 0,5 s de "fond seul" : tout le panneau (barre + contenu) reste caché pendant le slide
                opacity: { delay: 0.5, duration: 0.4 },
                y: { delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                // ressort léger = petit "pop" doux
                scale: { delay: 0.5, type: 'spring', stiffness: 260, damping: 20, mass: 0.8 },
              }
        }
        style={{ transformOrigin: 'center top' }}
      >
        <div className="app-toolbar">
          <div className="app-search">
            <span>Recherche</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Lieu, ville, tag..."
            />
          </div>
          <div className="country-filter" aria-label="Filtre pays">
            <button className={country === 'all' ? 'active' : ''} onClick={() => setCountry('all')} type="button">
              Tous
            </button>
            {COUNTRY_ORDER.map((key) => (
              <button
                key={key}
                className={country === key ? 'active' : ''}
                onClick={() => setCountry(key)}
                type="button"
                style={{ '--country': COUNTRY_HEX[key] }}
              >
                {COUNTRY_FR[key]}
              </button>
            ))}
          </div>
        </div>
        <div className="program-content page-reveal">
          {renderPage()}
        </div>
      </motion.section>
      )}
    </main>
  );
}

function ItineraryPage({ places }) {
  const placesByCountry = groupBy(places, (place) => place.country);
  const cityCount = new Set(places.map((place) => place.city)).size;
  const photoCount = places.filter((place) => place.isPhotoSpot).length;

  return (
    <div className="page-grid itinerary-page">
      <PageHeader
        eyebrow="Itinéraire"
        title="Le voyage complet"
        subtitle={`${formatDateLong(TRIP_START)} - ${formatDateLong(TRIP_END)}`}
      />
      <StatsStrip
        items={[
          ['Lieux', places.length],
          ['Villes', cityCount],
          ['Photos', photoCount],
          ['Trajets', TRANSPORT_LEGS.length],
        ]}
      />
      <section className="map-panel">
        <div className="map-panel__canvas">
          {Object.entries(CITY_COORDS).map(([city, coord]) => (
            <span
              key={city}
              className="map-pin"
              style={{
                left: `${normalize(coord[1], 100, 140)}%`,
                top: `${normalize(coord[0], 10, 40)}%`,
              }}
              title={city}
            >
              {city}
            </span>
          ))}
        </div>
      </section>
      <TransportSection />
      <section className="stack">
        {COUNTRY_ORDER.map((country) => {
          const countryPlaces = placesByCountry[country] || [];
          if (!countryPlaces.length) return null;
          const byCity = groupBy(countryPlaces, (place) => place.city);
          return (
            <article className="country-section" key={country}>
              <h2>
                <span style={{ background: COUNTRY_HEX[country] }} />
                {COUNTRY_FR[country]}
              </h2>
              {Object.entries(byCity).map(([city, cityPlaces]) => (
                <div className="city-block" key={city}>
                  <h3>{city}</h3>
                  <div className="compact-list">
                    {sortByDate(cityPlaces).map((place) => (
                      <PlaceRow key={place.id} place={place} />
                    ))}
                  </div>
                </div>
              ))}
            </article>
          );
        })}
      </section>
    </div>
  );
}

function DayPage({ places }) {
  const dates = useMemo(() => getTripDates(places), [places]);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const activeDate = dates.includes(selectedDate) ? selectedDate : dates[0];
  const dayPlaces = sortByTime(places.filter((place) => place.date === activeDate));
  const activities = dayPlaces.filter((place) => place.type !== 'hotel' && place.type !== 'transport');
  const hotel = dayPlaces.find((place) => place.type === 'hotel');
  const restaurants = activities.filter((place) => place.type === 'restaurant');
  const photoCount = activities.filter((place) => place.isPhotoSpot).length;

  if (!dates.length) {
    return (
      <div className="day-layout">
        <PageHeader eyebrow="Journée" title="Aucune journée" subtitle="Filtre trop restrictif" />
        <EmptyState text="Aucun lieu ne correspond au filtre sélectionné." />
      </div>
    );
  }

  return (
    <div className="day-layout">
      <PageHeader
        eyebrow={`Jour ${dayNumber(activeDate)}`}
        title={formatDateLong(activeDate)}
        subtitle={activities[0]?.city || hotel?.city || 'Voyage Asie 2026'}
      />
      <DateRail dates={dates} selectedDate={activeDate} onSelect={setSelectedDate} />
      {DAILY_PHOTO_TIPS[activeDate] && (
        <InfoBanner icon={<img className="banner-icon-img" src={cameraIcon} alt="" />} label="Tip photo du jour">
          {DAILY_PHOTO_TIPS[activeDate]}
        </InfoBanner>
      )}
      {hotel && <HotelCard hotel={hotel} />}
      <InfoBanner
        icon={<WatercolorIcon src={asset('icons/restaurant.png')} fallback="🍜" />}
        label="Restaurants du jour"
      >
        {restaurants.length ? restaurants.map((resto) => resto.name).join(', ') : 'Aucun restaurant planifié.'}
      </InfoBanner>
      <StatsStrip
        items={[
          ['Arrêts', activities.length],
          ['Photo spots', photoCount],
          ['Ville', activities[0]?.city || hotel?.city || '—'],
          ['Pays', COUNTRY_FR[activities[0]?.country || hotel?.country] || '—'],
        ]}
      />
      <section className="period-grid">
        {[
          ['Matin', activities.filter((place) => place.time && place.time < '12:00')],
          ['Après-midi', activities.filter((place) => place.time && place.time >= '12:00' && place.time < '18:00')],
          ['Soir', activities.filter((place) => place.time && place.time >= '18:00')],
          ['Sans heure', activities.filter((place) => !place.time)],
        ].map(([label, periodPlaces]) => (
          <article className="period-card" key={label}>
            <h2>{label}</h2>
            {periodPlaces.length ? (
              periodPlaces.map((place) => <PlaceRow key={place.id} place={place} />)
            ) : (
              <p>Aucune activité prévue.</p>
            )}
          </article>
        ))}
      </section>
      <section className="stack">
        <SectionTitle>Programme de la journée</SectionTitle>
        {activities.length ? activities.map((place) => <PlaceCard key={place.id} place={place} />) : <EmptyState text="Aucun lieu pour cette journée." />}
      </section>
    </div>
  );
}

function PhotosPage({ places }) {
  const spots = sortByDate(places.filter((place) => place.isPhotoSpot));
  const byDate = groupBy(spots, (place) => place.date || 'Sans date');

  return (
    <div className="page-grid">
      <PageHeader eyebrow="Photo" title="Spots photo" subtitle={`${spots.length} lieux repérés`} />
      <section className="stack">
        {spots.length ? (
          Object.entries(byDate).map(([date, datePlaces]) => (
            <article className="date-section" key={date}>
              <h2>{date === 'Sans date' ? date : formatDateLong(date)}</h2>
              {DAILY_PHOTO_TIPS[date] && <p className="date-tip">{DAILY_PHOTO_TIPS[date]}</p>}
              <div className="card-grid">
                {datePlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            </article>
          ))
        ) : (
          <EmptyState text="Aucun spot photo ne correspond aux filtres." />
        )}
      </section>
    </div>
  );
}

function RestaurantsPage({ places }) {
  const restaurants = sortByDate(places.filter((place) => place.type === 'restaurant'));
  const byDate = groupBy(restaurants, (place) => place.date || 'Sans date');

  return (
    <div className="page-grid">
      <PageHeader eyebrow="Resto" title="Restaurants" subtitle={`${restaurants.length} adresses planifiées`} />
      <section className="stack">
        {restaurants.length ? (
          Object.entries(byDate).map(([date, datePlaces]) => (
            <article className="date-section" key={date}>
              <h2>{date === 'Sans date' ? date : formatDateLong(date)}</h2>
              <div className="card-grid">
                {datePlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            </article>
          ))
        ) : (
          <EmptyState text="Aucun restaurant ne correspond aux filtres." />
        )}
      </section>
    </div>
  );
}

function GuidePage({ places }) {
  const byDate = groupBy(sortByDate(places.filter((place) => place.date)), (place) => place.date);

  return (
    <div className="page-grid guide-page">
      <PageHeader eyebrow="Guide" title="Guide détaillé" subtitle="Spots, photos et conseils jour par jour" />
      <section className="stack">
        {Object.entries(byDate).map(([date, datePlaces]) => (
          <article className="guide-day" key={date}>
            <header>
              <span>J{dayNumber(date)}</span>
              <h2>{formatDateLong(date)}</h2>
            </header>
            {DAILY_PHOTO_TIPS[date] && <p className="date-tip"><img className="inline-icon" src={cameraIcon} alt="" /> {DAILY_PHOTO_TIPS[date]}</p>}
            <div className="card-grid">
              {sortByTime(datePlaces).map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="page-header">
      <p>{eyebrow}</p>
      <h1>{title}</h1>
      <span>{subtitle}</span>
    </header>
  );
}

function StatsStrip({ items }) {
  return (
    <section className="stats-grid">
      {items.map(([label, value]) => (
        <div className="stat-card" key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}

function DateRail({ dates, selectedDate, onSelect }) {
  return (
    <div className="date-rail">
      {dates.map((date) => (
        <button key={date} className={date === selectedDate ? 'active' : ''} onClick={() => onSelect(date)} type="button">
          <span>J{dayNumber(date)}</span>
          {formatDateShort(date)}
        </button>
      ))}
    </div>
  );
}

function InfoBanner({ icon, label, children }) {
  return (
    <div className="info-banner">
      <span>{icon}</span>
      <div>
        <strong>{label}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}

function WatercolorIcon({ src, fallback, className = '' }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`watercolor-icon ${className}`} aria-hidden="true">
      {failed ? (
        <span className="watercolor-icon__fallback">{fallback}</span>
      ) : (
        <img src={src} alt="" onError={() => setFailed(true)} />
      )}
    </span>
  );
}

function PlaceTypeIcon({ type, className = '' }) {
  return (
    <WatercolorIcon
      src={asset(`icons/${type.icon}`)}
      fallback={type.emoji}
      className={className}
    />
  );
}

function HotelCard({ hotel }) {
  const type = PLACE_TYPES.hotel;
  return (
    <article className="hotel-card">
      <PlaceTypeIcon type={type} className="hotel-card__icon" />
      <div>
        <p>Hébergement du soir</p>
        <h2>{hotel.name}</h2>
        <small>{hotel.city}</small>
      </div>
    </article>
  );
}

function SectionTitle({ children }) {
  return <h2 className="section-title">{children}</h2>;
}

function PlaceCard({ place }) {
  const type = PLACE_TYPES[place.type] || PLACE_TYPES.default;
  return (
    <article className="place-card place-card--typed">
      <div className="place-card__media" style={{ background: colorForPlace(place) }}>
        <PlaceTypeIcon type={type} className="place-card__type-icon" />
        <img
          className="place-card__photo"
          src={photoForPlace(place)}
          alt={place.name}
          loading="lazy"
          data-fallback={typeFallbackPhoto(place)}
          onError={(event) => {
            const img = event.currentTarget;
            const fb = img.dataset.fallback;
            if (fb && !img.src.endsWith(fb)) img.src = fb;
            else img.remove();
          }}
        />
      </div>
      <div className="place-card__body">
        <div className="place-card__meta">
          {place.time || '—'} · {place.city}
          {place.rating ? (
            <span className="rating" title={place.ratingCount ? `${place.ratingCount} avis` : undefined}>
              ★ {place.rating}
            </span>
          ) : null}
        </div>
        <h3>{place.name}</h3>
        <p>{place.desc || type.label}</p>
        {place.tips && <small><img className="inline-icon" src={cameraIcon} alt="" /> {place.tips}</small>}
        <TagList tags={place.tags} />
      </div>
    </article>
  );
}

function PlaceRow({ place }) {
  const type = PLACE_TYPES[place.type] || PLACE_TYPES.default;
  return (
    <div className="place-row">
      <span style={{ background: colorForPlace(place) }}>
        <PlaceTypeIcon type={type} className="place-row__type-icon" />
      </span>
      <div>
        <strong>{place.name}</strong>
        <small>
          {place.time || formatDateShort(place.date)} · {place.city}
          {place.rating ? ` · ★ ${place.rating}` : ''}
        </small>
        <TagList tags={place.tags} limit={3} />
      </div>
    </div>
  );
}

function TagList({ tags, limit }) {
  if (!tags || !tags.length) return null;
  const shown = limit ? tags.slice(0, limit) : tags;
  return (
    <div className="tag-list">
      {shown.map((tag) => (
        <span className="tag" key={tag}>
          {tag}
        </span>
      ))}
    </div>
  );
}

function TransportSection() {
  return (
    <section className="transport-panel">
      <SectionTitle>Trajets entre villes</SectionTitle>
      <div className="transport-list">
        {TRANSPORT_LEGS.map((leg, index) => {
          const mode = TRANSPORT_MODES[leg.mode] || {};
          return (
            <div className="transport-leg" key={`${leg.date}-${index}`}>
              <span className="transport-leg__mode" style={{ background: mode.color || 'var(--accent)' }}>
                <WatercolorIcon src={transportIcon} fallback={mode.emoji || '→'} />
              </span>
              <div className="transport-leg__body">
                <strong>
                  {leg.from} <span aria-hidden="true">→</span> {leg.to}
                </strong>
                <small>
                  {formatDateShort(leg.date)} · {mode.label || leg.mode} · {leg.duration}
                </small>
                {leg.note && <p>{leg.note}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function EmptyState({ text }) {
  return <div className="empty-state">{text}</div>;
}

function groupBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item) || 'Autre';
    acc[key] ||= [];
    acc[key].push(item);
    return acc;
  }, {});
}

function sortByDate(items) {
  return [...items].sort((a, b) => `${a.date || ''}${a.time || ''}`.localeCompare(`${b.date || ''}${b.time || ''}`));
}

function sortByTime(items) {
  return [...items].sort((a, b) => (a.time || '99:99').localeCompare(b.time || '99:99'));
}

function getTripDates(items) {
  return [...new Set(items.map((place) => place.date).filter(Boolean))].sort();
}

function formatDateShort(date) {
  if (!date) return '—';
  return new Date(`${date}T00:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function formatDateLong(date) {
  if (!date) return 'Sans date';
  return new Date(`${date}T00:00:00`).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function dayNumber(date) {
  const start = new Date(`${TRIP_START}T00:00:00`);
  const current = new Date(`${date}T00:00:00`);
  return Math.round((current - start) / 86400000) + 1;
}

function colorForPlace(place) {
  return COUNTRY_HEX[place.country] || '#b07a44';
}

// Petit hash stable d'une chaîne -> permet de choisir TOUJOURS la même variante pour un lieu donné
function hashString(str) {
  let h = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// Choisit une image de secours dans le pool du type, de façon déterministe selon le lieu (variété)
function typeFallbackPhoto(place) {
  const pool = TYPE_PHOTO_FALLBACK[place.type] || TYPE_PHOTO_FALLBACK.default;
  return asset(pool[hashString(place.id ?? place.name) % pool.length]);
}

function photoForPlace(place) {
  return place.photo || typeFallbackPhoto(place);
}

function normalize(value, min, max) {
  return Math.max(4, Math.min(96, ((value - min) / (max - min)) * 100));
}

export default App;
