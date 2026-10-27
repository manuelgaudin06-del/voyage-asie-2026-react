// Infos pratiques jour par jour, affichées en tête de chaque journée dans l'onglet Guide.
// Source : carnet de route (voyage-asie-2026/CLAUDE.md) + réservations. Seul l'onglet Guide les lit,
// pas besoin de les synchroniser avec program.html.
// Chaque clé de section est optionnelle ; chaque entrée est une ligne de texte.
//   trajets  : comment on se déplace (heure, durée, prix, paiement)
//   billets  : ce qui est réservé et où trouver le billet
//   logement : où on dort, accès, arrivée
//   faire    : actions à ne pas oublier ce jour-là
//   budget   : estimation par personne, hors repas sauf mention
//   attention: pièges, fermetures, plan B

export const DAY_LOGISTICS = {
  '2026-10-28': {
    resume: 'Tokyo → Kawaguchiko en bus, après-midi et soirée au bord du lac.',
    trajets: [
      '10h : check-out Okachimachi (avant 10h), métro jusqu\'à Shinjuku (~30 min, Suica). Déjeuner à Shinjuku.',
      '12h40 : être au 4e étage de Busta Shinjuku (au-dessus de la sortie New South de la gare de Shinjuku).',
      '12h55 → 14h40 : bus Keio n° 1307, Busta Shinjuku → gare de Kawaguchiko. Valises en soute.',
      'Sur place : bus rétro (lignes rouge, verte, bleue) au départ de la gare de Kawaguchiko.',
    ],
    billets: [
      '✅ Bus 1307 payé (6 000 ¥ pour 3) : places 06A, 06B, 06D. Billet web n° 119106855 = PDF « 0 - 28-10 Bus Shinjuku… » dans le mail « Billets Japon » (Yahoo) et dans Documents\\Billets Japon.',
      'Annulation ou changement en ligne jusqu\'au 28/10 12h45 seulement.',
    ],
    logement: [
      'Airbnb maison entière, 7 min à pied de la gare de Kawaguchiko. Arrivée autonome 15h-17h. 2 nuits (28 et 29/10).',
    ],
    faire: [
      'Acheter le pass bus rétro 2 jours (2 000 ¥/pers, valable 28 + 29/10) au guichet des bus Fujikyu à la gare, en arrivant.',
      'Faire les courses du petit-déjeuner du 29 (départ 6h pour Chureito).',
    ],
    budget: [
      'Bus 2 000 ¥ (payé) · métro ~200 ¥ · pass rétro 2 000 ¥ · onsen ~1 500-2 000 ¥ · hoto ~1 500 ¥.',
    ],
    attention: [
      'La forêt d\'Aokigahara prévue à 15h30 ne passe plus avec l\'arrivée à 14h40 + le check-in : à décaler au 29 ou à sauter.',
      'Pas d\'illuminations du Momiji Kairo ce soir : le festival des érables va du 7 au 29/11.',
      'Onsen : les tatouages sont souvent refusés, vérifier avant.',
    ],
  },

  '2026-10-29': {
    resume: 'Grande journée Fuji : lever du jour à Chureito, tour des lacs avec le pass bus.',
    trajets: [
      'Chureito : train Fujikyu Kawaguchiko → Shimoyoshida (~15 min), puis ~400 marches. PAS couvert par le pass bus (Suica).',
      'Oishi Park, Saiko, Shoji : bus rétro, couverts par le pass 2 jours.',
      'Oshino Hakkai : bus Fujikyu séparé depuis la gare de Kawaguchiko (~25 min, ~600 ¥ l\'aller), pas couvert par le pass.',
    ],
    billets: [
      'Rien à réserver. Garder le pass bus rétro sur soi.',
    ],
    logement: [
      'Même Airbnb que la veille (Kawaguchiko).',
    ],
    faire: [
      'Regarder la météo et la webcam du Fuji au réveil : si le Fuji est caché, passer au plan B (Fuji-Q Highland) et garder Chureito pour le 30 au matin.',
      'Préparer les sacs le soir : départ 8h45 demain.',
    ],
    budget: [
      'Train Chureito ~300-400 ¥ A/R · Oshino ~1 200 ¥ A/R · Saiko Iyashi no Sato ~500 ¥ · téléphérique Kachi Kachi (option) ~1 000 ¥.',
    ],
    attention: [
      'Les nuages montent souvent l\'après-midi : les vues du Fuji se font le matin.',
      'Lac Shoji = le spot à sacrifier si la journée prend du retard.',
    ],
  },

  '2026-10-30': {
    resume: 'Kawaguchiko → Matsumoto (château) → Takayama en bus le soir.',
    trajets: [
      '8h45 : départ de l\'Airbnb (départ avant 10-11h demandé), 7 min à pied jusqu\'à la gare.',
      '9h08 : bus gare de Kawaguchiko → gare de Kofu (ligne « Mt. Fuji Station – Tomiishi – Kofu »), Suica ou espèces.',
      'À Kofu : ligne Chuo puis Limited Express jusqu\'à Matsumoto, arrivée 11h39. Supplément express à la machine JR de Kofu.',
      'Total ~2h31, ~5 130 ¥/pers. Repli si raté : départ 10h18 → arrivée 13h51.',
      '17h45 → 20h18 : bus Nohi Matsumoto → Takayama (terminal de bus devant la gare de Matsumoto).',
      'À Takayama : ~15 min à pied de la gare jusqu\'à l\'Airbnb.',
    ],
    billets: [
      'Kawaguchiko → Matsumoto : rien de réservé, achat sur place.',
      '✅ Bus Nohi 17h45 payé (13 200 ¥ pour 3) : places 9D, 10C, 10D. PDF n° 1 du mail « Billets Japon ».',
    ],
    logement: [
      'Airbnb « Hatsudamachi Ima-inn » à Takayama, 3 nuits (30/10, 31/10, 01/11). Quartier calme au bord de la Miyagawa, 6-8 min de Sanmachi.',
    ],
    faire: [
      'Avant ce jour : prévenir l\'hôte de Takayama d\'une arrivée vers 20h30-21h.',
      'À Matsumoto : valises en consigne à la gare, puis le château (15 min à pied), rues Nakamachi et Nawate.',
      'Repérer un resto encore ouvert après 20h30 à Takayama (bœuf de Hida), sinon supérette.',
    ],
    budget: [
      'Bus + train ~5 130 ¥ · consigne ~700 ¥ · château de Matsumoto ~700 ¥ (tarif à vérifier) · bus Nohi 4 400 ¥ (payé).',
    ],
    attention: [
      'Être au terminal de bus de Matsumoto 10-15 min avant 17h45, PDF prêt sur le téléphone.',
      'À Takayama, beaucoup de restos ferment tôt : ne pas compter sur un dîner tardif sans avoir vérifié.',
    ],
  },

  '2026-10-31': {
    resume: 'Takayama à pied : marchés, Hida no Sato, Sanmachi, saké, temples Higashiyama.',
    trajets: [
      'Tout à pied dans le centre. Hida no Sato : bus « Sarubobo » depuis la gare routière (~10 min) ou ~30 min à pied.',
    ],
    billets: [
      'Rien à présenter aujourd\'hui.',
    ],
    logement: [
      'Airbnb Hatsudamachi Ima-inn (2e nuit).',
    ],
    faire: [
      'Passer au guichet JR de la gare de Takayama (みどりの窓口) réserver le Limited Express Hida du 02/11 vers Nagoya (pont avec le férié du 03/11, risque de train plein).',
      'Repérer la gare routière Nohi (à côté de la gare JR) pour demain 8h10.',
    ],
    budget: [
      'Hida no Sato 700 ¥ · Takayama Jinya ~440 ¥ · salle des chars ~1 000 ¥ · dégustations de saké quelques centaines de ¥ · Hida du 02/11 ~6 140 ¥ (payé au guichet).',
    ],
    attention: [
      'Les boutiques de Sanmachi ferment vers 17h : snacks et brasseries avant.',
    ],
  },

  '2026-11-01': {
    resume: 'Excursion organisée Ainokura + Shirakawa-go (villages aux toits de chaume).',
    trajets: [
      '8h10 : guichet Nohi de la gare routière de Takayama (à côté de la gare JR). Départ 8h30, quai indiqué au guichet.',
      'Ainokura le matin, Shirakawa-go jusqu\'à 15h, retour Takayama 15h50.',
    ],
    billets: [
      '✅ Excursion payée (27 000 ¥ pour 3), résa Japan Bus Online n° 10192007362 au nom de GAUDIN MANUEL.',
      'Le vrai billet = le mail Japan Bus Online, à échanger au guichet au moins 10 min avant le départ.',
      'Entrée Minkaen + navette de l\'observatoire de Shiroyama incluses.',
    ],
    logement: [
      'Airbnb Hatsudamachi Ima-inn (3e nuit).',
    ],
    faire: [
      'Prendre des espèces (petits restos et maison Wada).',
      'Préparer les sacs le soir : départ pour Nagoya demain matin.',
    ],
    budget: [
      'Excursion 9 000 ¥ (payée) · maison Wada 400 ¥ · déjeuner au feu de bois ~1 500-2 500 ¥.',
    ],
    attention: [
      'Ne pas rater l\'heure de retour au bus à Shirakawa-go : l\'excursion ne vous attendra pas.',
      'Rizières déjà moissonnées fin octobre ; le pic des couleurs à Shirakawa-go est annoncé fin octobre.',
    ],
  },

  '2026-11-02': {
    resume: 'Takayama → Nagoya en train Hida, château l\'après-midi, Osu et Sakae le soir.',
    trajets: [
      'Limited Express Hida Takayama → Nagoya, ~2h15-2h30, celui qui arrive vers 13h (réservé la veille au guichet).',
      'Gare de Nagoya → Airbnb Marunouchi : ligne de métro Sakura-dori jusqu\'à Hisaya-Odori, puis 6 min à pied.',
      'Château (métro Shiyakusho), puis rue Osu (métro Kamimaezu, ~10 min), puis Oasis 21 et Sakae à pied.',
    ],
    billets: [
      'Train Hida : billet acheté au guichet JR de Takayama le 31/10.',
    ],
    logement: [
      'Airbnb « Marunouchi », 2 nuits (02 et 03/11). Arrivée à partir de 15h : valises en consigne à la gare de Nagoya en attendant.',
    ],
    faire: [
      'Repérer le Meitetsu Bus Center (à côté de la gare de Nagoya) pour le bus de demain 8h40.',
    ],
    budget: [
      'Hida ~6 140 ¥ · consigne ~700 ¥ · château 500 ¥ · métro ~250 ¥ le trajet · dîner hitsumabushi ~4 000-5 000 ¥ ou misokatsu ~1 500 ¥.',
    ],
    attention: [
      'Lundi : musée Toyota et jardin Shirotori fermés (d\'où Toyota le 04/11).',
      'Château : dernière entrée 16h30, le donjon est fermé, on visite le palais Hommaru.',
    ],
  },

  '2026-11-03': {
    resume: 'Excursion à Gujo Hachiman en bus (canaux, château, ruelles d\'eau). Jour férié.',
    trajets: [
      '8h40 : bus Gifu Bus, Meitetsu Bus Center (Nagoya) → Gujo Jokamachi Plaza 10h15.',
      '16h10 : retour Gujo Jokamachi Plaza → Nagoya 18h05.',
    ],
    billets: [
      '✅ Aller et retour payés (14 400 ¥ pour 3), places 3A, 3B, 3C. PDF n° 3 (aller) et n° 4 (retour) du mail « Billets Japon ».',
    ],
    logement: [
      'Airbnb Marunouchi (2e nuit).',
    ],
    faire: [
      'Préparer les sacs le soir : demain matin Atsuta + musée Toyota avant le Shinkansen.',
    ],
    budget: [
      'Bus 4 800 ¥ (payé) · château de Gujo 400 ¥ · atelier de faux plats ~1 000-2 000 ¥ (option).',
    ],
    attention: [
      '3 novembre = fête de la Culture (férié) : beaucoup de monde, horaires de week-end.',
      'Seuls ces bus allaient au centre ce jour-là : ne pas rater le 16h10.',
    ],
  },

  '2026-11-04': {
    resume: 'Matinée Nagoya (Atsuta, musée Toyota), Shinkansen pour Kyoto, Higashiyama et Gion.',
    trajets: [
      'Atsuta : Meitetsu Jingu-mae → Nagoya (~10 min). Musée Toyota à 15-20 min à pied de la gare (ou Meitetsu, station Sako).',
      'Shinkansen Nagoya → Kyoto vers 12h15, ~35 min. Voitures sans réservation, achat sur place.',
    ],
    billets: [
      'Shinkansen : billet acheté à la machine ou au guichet de la gare de Nagoya le jour même.',
    ],
    logement: [
      'Maison Nijo / Karasuma-Oike à Kyoto, 4 nuits (04 → 08/11). 2 salles de bain.',
    ],
    faire: [
      'Valises en consigne à la gare de Nagoya pendant le musée Toyota.',
    ],
    budget: [
      'Musée Toyota 1 000 ¥ · Shinkansen ~6 000 ¥ · Kiyomizu-dera 500 ¥.',
    ],
    attention: [
      'Fushimi Inari n\'est PAS aujourd\'hui : il a été déplacé au 07/11.',
    ],
  },
};
