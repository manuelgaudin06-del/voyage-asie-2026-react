// Infos pratiques jour par jour, affichées en tête de chaque journée dans l'onglet Guide.
// Couvre le 28/10 → 13/11 (Fuji, Alpes japonaises, Nagoya, Kyoto, Nara, Osaka).
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
      '8h10 : guichet Nohi de la gare routière de Takayama (à côté de la gare JR). Départ 8h30, quai 7.',
      'Ainokura le matin, Shirakawa-go jusqu\'à 15h, retour Takayama 15h50.',
    ],
    billets: [
      '✅ Excursion payée (27 000 ¥ pour 3), résa Japan Bus Online n° 10192007362 au nom de GAUDIN MANUEL.',
      '✅ Billet imprimé : le montrer au guichet Nohi au moins 10 min avant le départ, on reçoit en échange la carte d\'embarquement (bus + places).',
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

  '2026-11-05': {
    resume: 'Arashiyama à l\'aube (bambous, Tenryu-ji), puis Kinkaku-ji l\'après-midi.',
    trajets: [
      'À Kyoto, Suica/ICOCA marche partout (métro, bus, JR). Les bus de ville sont lents et bondés : préférer métro + JR, ou taxi à 3 sur les petites distances.',
      '~6h30 : gare JR de Nijo (à ~10 min à pied de la maison) → Saga-Arashiyama par la ligne JR Sagano, ~15 min, ~240 ¥.',
      'Arashiyama → Kinkaku-ji : bus ou taxi à 3 (~25 min). Ryoan-ji est à ~20 min à pied de Kinkaku-ji.',
    ],
    billets: [
      'Rien à réserver.',
    ],
    logement: [
      'Maison Nijo / Karasuma-Oike (2e nuit). 6 min du marché Nishiki, 7 min du château de Nijo.',
    ],
    faire: [
      'Être à la bambouseraie AVANT 8h : après, c\'est la foule.',
      'Kinkaku-ji vers 14h-15h pour le soleil sur le pavillon.',
    ],
    budget: [
      'JR ~240 ¥ · jardin de Tenryu-ji ~500 ¥ · villa Okochi (option) ~1 000 ¥ · parc aux singes (option) ~800 ¥ · Kinkaku-ji 500 ¥ · Ryoan-ji ~600 ¥ · taxi partagé ~800 ¥/pers.',
    ],
    attention: [
      'Érables encore verts : le pic à Kyoto est attendu vers le 11 décembre.',
      'Plan B pluie : musée du chemin de fer de Kyoto (fermé le mercredi, jeudi OK).',
    ],
  },

  '2026-11-06': {
    resume: 'Les collines de l\'Est : chemin de la Philosophie, Ginkaku-ji, Nanzen-ji, Gion le soir.',
    trajets: [
      'Ginkaku-ji / chemin de la Philosophie : bus ou taxi depuis la maison (~20 min).',
      'Le chemin descend à pied vers Nanzen-ji (~30 min de marche). Retour : métro ligne Tozai depuis Keage, direct jusqu\'à Karasuma-Oike.',
      'Gion le soir : métro Tozai jusqu\'à Sanjo-Keihan, puis à pied.',
    ],
    billets: [
      'Rien à réserver.',
    ],
    logement: [
      'Maison Nijo / Karasuma-Oike (3e nuit).',
    ],
    faire: [
      'Commencer tôt (7h) pour avoir le chemin de la Philosophie au calme.',
    ],
    budget: [
      'Ginkaku-ji 500 ¥ · Nanzen-ji : enceinte et aqueduc gratuits, Sanmon / Tenjuan quelques centaines de ¥ · Eikan-do jusqu\'à 1 500 ¥ (à zapper, encore vert) · jardin du sanctuaire Heian ~600 ¥.',
    ],
    attention: [
      'Eikan-do : tarif d\'automne déjà en place mais érables encore verts, à éviter si le budget compte.',
      'Gion : ne pas photographier les geishas de près ni les suivre, certaines ruelles privées sont interdites aux photos.',
    ],
  },

  '2026-11-07': {
    resume: 'Fushimi Inari au lever du jour, Tofuku-ji, château de Nijo, Nishiki. Samedi : monde partout.',
    trajets: [
      '5h30 à Fushimi Inari : les premiers trains arrivent trop tard depuis la maison, prendre un taxi à 3 (~15-20 min, ~2 500-3 000 ¥ au total).',
      'Fushimi Inari → Tofuku-ji : 1 station sur la ligne JR Nara (ou ~20 min à pied).',
      'Retour vers le centre : JR jusqu\'à Kyoto puis métro Karasuma, ou taxi. Château de Nijo à 7 min à pied de la maison.',
    ],
    billets: [
      'Rien à réserver.',
    ],
    logement: [
      'Maison Nijo / Karasuma-Oike (4e et dernière nuit).',
    ],
    faire: [
      'Réserver le taxi la veille (appli GO ou demander à un taxi en station), ou repérer la station de taxis la plus proche.',
      'Le soir : préparer les sacs, départ pour Nara demain.',
    ],
    budget: [
      'Taxi ~1 000 ¥/pers · Fushimi Inari gratuit · Tofuku-ji 600-1 000 ¥ · château de Nijo 1 300 ¥ · Sanjusangen-do ~600 ¥ (option) · Nishiki : snacks.',
    ],
    attention: [
      'Photo INTERDITE sur le pont Tsutenkyo de Tofuku-ji en novembre : même vue depuis le pont Gaunkyo.',
      'Tofuku-ji ouvre à 9h : prendre le petit-déjeuner entre les deux.',
    ],
  },

  '2026-11-08': {
    resume: 'Kyoto → Nara, Todai-ji et Kasuga Taisha l\'après-midi. Dimanche.',
    trajets: [
      'Check-out de la maison (heure à vérifier dans l\'appli Airbnb), métro Karasuma jusqu\'à la gare de Kyoto.',
      'Kintetsu Kyoto → Kintetsu-Nara (express ~45 min, ~760 ¥ ; Limited Express plus rapide avec supplément). La guesthouse est à 5 min de Kintetsu-Nara.',
      'Le JR Nara Line marche aussi, mais la gare JR Nara est plus loin de la guesthouse : préférer Kintetsu.',
      'À Nara, tout se fait à pied : Todai-ji ~15 min, Kasuga Taisha ~20 min de la gare.',
    ],
    billets: [
      'Train : Suica/ICOCA ou billet au guichet le jour même.',
    ],
    logement: [
      'Guesthouse à 5 min de Kintetsu-Nara, 1 nuit.',
      'Consigne des bagages seulement de 10h à 13h (pas de personnel de 13h à 16h) : arriver avant 13h pour déposer les sacs.',
    ],
    faire: [
      'Partir de Kyoto vers 10h-10h30 pour déposer les sacs avant 13h.',
    ],
    budget: [
      'Train ~760 ¥ · Todai-ji 800 ¥ · Kasuga Taisha : enceinte gratuite, 500 ¥ la salle des lanternes · jardin Isuien (option, tarif à vérifier).',
    ],
    attention: [
      'Les cerfs mordillent et poussent dès qu\'ils voient des biscuits : ne pas les sortir tant qu\'on n\'est pas prêt.',
      'Nara se vide le soir : dîner tôt, beaucoup de restos ferment vers 20h.',
    ],
  },

  '2026-11-09': {
    resume: 'Cerfs de Nara à l\'aube, puis Osaka : château, Shinsekai, Umeda Sky au coucher du soleil, Dotonbori.',
    trajets: [
      '6h30 : parc de Nara à pied depuis la guesthouse.',
      'Kintetsu-Nara → Osaka-Namba / Nippombashi (~40 min, ~680 ¥). De Nippombashi, 1 station de métro Sakaisuji jusqu\'à Nagahoribashi, ou ~12 min à pied.',
      'Dans Osaka : métro (Suica/ICOCA). Château : station Tanimachi 4-chome. Shinsekai : Ebisucho. Umeda : Umeda/Osaka.',
    ],
    billets: [
      'Rien à réserver (Umeda Sky : billet sur place).',
    ],
    logement: [
      'TsuruINN Shinsaibashi, 4 nuits (09 → 13/11). 7 min à pied de la station Nagahoribashi ; Dotonbori et Shinsaibashi à 10-17 min à pied.',
      'Arrivée vers midi : demander à l\'hôte si on peut déposer les sacs, sinon consignes de la gare de Namba.',
    ],
    faire: [
      'Écrire à l\'hôte d\'Osaka pour le dépôt de bagages avant l\'heure d\'arrivée.',
    ],
    budget: [
      'Train ~680 ¥ · château d\'Osaka : parc gratuit, donjon ~600 ¥ (tarif à vérifier) · tour Tsutenkaku ~1 000 ¥ (option) · Umeda Sky 2 000 ¥ · métro ~240 ¥ le trajet.',
    ],
    attention: [
      'Coucher du soleil vers 17h : être en haut d\'Umeda Sky vers 16h30.',
      'Feuillages d\'automne à Osaka attendus début décembre seulement.',
    ],
  },

  '2026-11-10': {
    resume: 'Osaka sud : Sumiyoshi Taisha, Namba Yasaka, Kuromon, Amerikamura, Abeno Harukas le soir.',
    trajets: [
      'Sumiyoshi Taisha : tram Hankai ou train Nankai depuis Namba (~20 min).',
      'Namba Yasaka, Kuromon, Amerikamura, Den Den Town : tout à pied ou 1-2 stations autour de Namba.',
      'Abeno Harukas : métro jusqu\'à Tennoji.',
    ],
    billets: [
      'Rien à réserver.',
    ],
    logement: [
      'TsuruINN Shinsaibashi (2e nuit).',
    ],
    faire: [
      'Kuromon le matin pour les produits frais, avant la foule du midi.',
    ],
    budget: [
      'Transports ~500 ¥ · Sumiyoshi et Namba Yasaka gratuits · Abeno Harukas 300 ~2 000 ¥ · Spa World (option) ~1 500-2 000 ¥ · okonomiyaki ~1 500 ¥.',
    ],
    attention: [
      'Spa World : tatouages interdits.',
    ],
  },

  '2026-11-11': {
    resume: 'Parc de Minoo (cascade, gorge, momiji tempura), Hozenji Yokocho et Nakanoshima le soir.',
    trajets: [
      'Métro Midosuji jusqu\'à Umeda, puis Hankyu jusqu\'à Minoo (changement à Ishibashi-handaimae), ~30-40 min, ~300 ¥.',
      'Gare de Minoo → cascade : 2,8 km de marche facile le long de la rivière (~45 min).',
    ],
    billets: [
      'Rien à réserver.',
    ],
    logement: [
      'TsuruINN Shinsaibashi (3e nuit).',
    ],
    faire: [
      'Bonnes chaussures : chemin parfois humide.',
    ],
    budget: [
      'Transports ~600 ¥ A/R · parc gratuit · momiji tempura quelques centaines de ¥ · temple Katsuo-ji (option) ~400 ¥.',
    ],
    attention: [
      'Plan B pluie : aquarium Kaiyukan (ouvert tous les jours).',
      'Érables de Minoo encore verts (pic vers le 4 décembre).',
    ],
  },

  '2026-11-12': {
    resume: 'Jour libre : Universal Studios, château de Himeji, ou Kobe.',
    trajets: [
      'Universal Studios : métro + JR jusqu\'à Universal City (~30 min).',
      'Himeji : JR Special Rapid depuis Osaka (~1h, ~1 500 ¥) ou Shinkansen depuis Shin-Osaka (~30 min, plus cher).',
      'Kobe : JR depuis Osaka (~25 min, ~420 ¥).',
    ],
    billets: [
      'Universal Studios : billets à acheter EN LIGNE à l\'avance (billet daté, et Express Pass si on veut éviter les files).',
    ],
    logement: [
      'TsuruINN Shinsaibashi (4e et dernière nuit).',
    ],
    faire: [
      'Choisir l\'option la veille au plus tard (USJ = billets à prendre avant).',
      'Le soir : faire les sacs, vérifier le vol du lendemain (Thai Airways, KIX 17h25).',
    ],
    budget: [
      'USJ ~9 000-11 000 ¥ (+ Express Pass) · Himeji ~1 500 ¥ de train + château ~2 500 ¥ (tarif à vérifier) · Kobe ~840 ¥ A/R + bœuf de Kobe 5 000 ¥ et plus.',
    ],
    attention: [
      'USJ un jeudi de novembre : moins de monde qu\'un week-end, mais les files restent longues sans Express Pass.',
    ],
  },

  '2026-11-13': {
    resume: 'Dernière matinée à Osaka, puis vol KIX 17h25 → Bangkok (arrivée 22h).',
    trajets: [
      'Nagahoribashi → Namba (1-2 stations), puis train Nankai jusqu\'à l\'aéroport du Kansai (KIX) : ~40-45 min, ~970 ¥ (Rapi:t plus confortable, avec supplément).',
      'Viser l\'aéroport vers 14h30 (vol international) : quitter l\'appartement vers 13h-13h30.',
    ],
    billets: [
      'Vol Thai Airways KIX 17h25 → Bangkok 22h00 : faire l\'enregistrement en ligne la veille.',
    ],
    logement: [
      'Check-out du TsuruINN le matin (heure à vérifier), bagages en consigne à Namba si on se promène encore.',
    ],
    faire: [
      'Dépenser ou garder les derniers yens, vider la Suica (le solde peut servir à l\'aéroport).',
      'Rinku Premium Outlets (option) : à Rinku Town, une station avant l\'aéroport.',
    ],
    budget: [
      'Train ~970 ¥ · dernier kaiten-zushi ~1 500-2 000 ¥.',
    ],
    attention: [
      'Ne pas se faire piéger par les achats à Rinku : garder une marge pour l\'enregistrement et la sécurité.',
    ],
  },
};
