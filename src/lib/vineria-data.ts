export interface PermacultureWorkshop {
  id: string;
  name: string;
  produces: string;
  bringsToSystem: string;
  icon: string;
  details: string;
}

export interface ValuePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  concretePractice: string[];
  statBadge?: string;
}

export interface VineriaProduct {
  id: string;
  name: string;
  slug: string;
  category: 'huiles-essentielles' | 'ruche' | 'amandes' | 'huile-olive';
  categoryLabel: string;
  tagline: string;
  description: string;
  method: string;
  origin: string;
  packaging: {
    retail: string;
    pro: string;
  };
  price: number;
  unit: string;
  imageUrl: string;
  characteristics: { label: string; value: string }[];
  featured: boolean;
  published: boolean;
}

export interface VineriaService {
  id: string;
  name: string;
  slug: string;
  category: 'academie' | 'technique' | 'distillation' | 'visite' | 'parrainage';
  tagline: string;
  description: string;
  targetAudience: string;
  duration: string;
  priceFrom: number;
  currency: string;
  imageUrl: string;
  syllabusOrFeatures: string[];
  featured: boolean;
  published: boolean;
}

export interface ImpactMetric {
  id: string;
  value: string;
  unit: string;
  label: string;
  sublabel: string;
  status: 'verifie' | 'campagne-2025-2026';
}

export interface PartnershipTrack {
  id: string;
  title: string;
  tag: string;
  target: string;
  description: string;
  actionLabel: string;
}

export const VINERIA_INFO = {
  name: 'VINERIA',
  tagline: 'Ferme intégrée en permaculture — Nord de la Tunisie',
  headline: 'Produire en sec, sans intrants de synthèse, en faisant vivre le territoire.',
  location: 'Nord de la Tunisie (Gouvernorat de Bizerte / Béja)',
  established: '2022',
  email: 'contact@vineria-tunisie.com',
  phone: '+216 71 890 120 / +216 98 450 320',
  address: 'Domaine Vineria, Vallée de l\'Ichkeul, Nord de la Tunisie',
  hours: 'Lun – Sam : 07h30 – 17h00 (Visites sur rendez-vous)',
  summary: `Vineria est une exploitation agricole intégrée située au nord de la Tunisie. Amandiers, oliviers, romarin et ruches y sont conduits sur un même système, selon les principes de la permaculture. L'entreprise ne se définit pas par une filière mais par une méthode : produire en sec, sans intrants de synthèse, en faisant travailler les gens du territoire, et en transmettant ce qui marche aux exploitations voisines. Trois activités sortent de là : une gamme de produits, une offre de services agricoles, et une activité de formation.`
};

export const PERMACULTURE_WORKSHOPS: PermacultureWorkshop[] = [
  {
    id: 'amandiers',
    name: 'Amandiers',
    produces: 'Amandes nobles en coque & décortiquées',
    bringsToSystem: 'Ombrage doux, structure du verger, floraison très précoce pour nourrir les abeilles en sortie d’hiver',
    icon: 'TreeDeciduous',
    details: 'L’arbre identitaire de Vineria. Conduite strictement en régime sec, en symbiose avec les légumineuses et le couvert de romarin qui protègent son système racinaire superficiel.'
  },
  {
    id: 'oliviers',
    name: 'Oliviers',
    produces: 'Huile d’olive vierge extra de terroir',
    bringsToSystem: 'Coupe-vent naturel, racines profondes puisant l’eau souterraine, stabilisation anti-érosion des talus',
    icon: 'Sun',
    details: 'Variétés tunisiennes rustiques (Chetoui et Sayali) taillées pour favoriser la circulation de l’air et la lumière. Résidus de taille déchiquetés sur place pour le paillage.'
  },
  {
    id: 'romarin',
    name: 'Romarin & Aromatiques',
    produces: 'Huiles essentielles pures & hydrolats',
    bringsToSystem: 'Couverture permanente du sol, ressource mellifère d’été, barrière aromatique contre les ravageurs',
    icon: 'Leaf',
    details: 'Implanté en bandes intercalaires. Limite l’évaporation hydrique du sol, élimine le désherbage chimique et approvisionne l’alambic de la ferme à basse pression.'
  },
  {
    id: 'ruches',
    name: 'Ruches & Abeilles',
    produces: 'Miel de terroir, pollen frais, propolis, cire pure',
    bringsToSystem: 'Pollinisation croisée des amandiers et aromatiques, bio-indicateur d’intégrité écosystémique',
    icon: 'Sparkles',
    details: 'Ruches pastorales et sédentaires protégées des vents dominants. Les abeilles augmentent drastiquement le taux de nouaison des amandiers dès février.'
  },
  {
    id: 'sol-compost',
    name: 'Sol Vivant & Compost',
    produces: 'Humus fertile, amendement microbiologique',
    bringsToSystem: 'Recycle 100% des résidus de taille, de distillation et de trituration oléicole',
    icon: 'Sprout',
    details: 'Rien ne se perd : la paille de distillation retourne au compostage chaud, le broyat de bois nourrit le réseau mycorhizien et retient chaque goutte de pluie.'
  }
];

export const VALUE_PILLARS: ValuePillar[] = [
  {
    id: 'permaculture',
    title: 'Permaculture vivante',
    subtitle: 'L’agroécologie en régime sec',
    description: 'Associations de cultures plutôt que monoculture. Sol jamais nu. Récupération et économie d’eau. Fertilité autonome par le compost. Aucun intrant de synthèse. Espèces choisies avec le climat, et non contre lui.',
    concretePractice: [
      'Paillage systématique et couverture végétale permanente (zéro sol exposé au soleil)',
      '100% conduite en sec : zéro pompage dans les nappes phréatiques fragiles',
      'Compostage sur place des résidus oléicoles et pailles de distillation',
      'Sélection de cultivars méditerranéens rustiques adaptés à l’aridité'
    ],
    statBadge: '100% sans intrants de synthèse'
  },
  {
    id: 'femmes-rurales',
    title: 'Inclusion des femmes rurales',
    subtitle: 'Dignité, parité et responsabilités',
    description: 'Le travail agricole des femmes en Tunisie rurale est massif, saisonnier et souvent invisible. Chez Vineria, il est déclaré, régulier, rémunéré à stricte parité, et il ouvre sur des responsabilités directes.',
    concretePractice: [
      'Contrats officiels déclarés et protection sociale complète',
      'Rémunération égale à travail égal, sans décote territoriale',
      'Accès aux postes clés de distillation, de conditionnement et de contrôle qualité',
      'Horaires et organisation adaptés aux réalités familiales rurales'
    ],
    statBadge: '100% déclaré & à parité'
  },
  {
    id: 'jeunes',
    title: 'Travail & apprentissage des jeunes',
    subtitle: 'Créer des métiers d’avenir sur le territoire',
    description: 'Emploi saisonnier et permanent, mais surtout apprentissage de métiers techniques qui ont une valeur durable hors de la ferme : apiculture moderne, distillation artisanale, taille arboricole, suivi qualité.',
    concretePractice: [
      'Compagnonnage direct avec nos maîtres artisans et agronomes',
      'Certification pratique reconnue dans les métiers de la transformation',
      'Incitation à l’installation agricole sur des parcelles familiales voisines',
      'Sensibilisation aux enjeux de l’eau et des marchés export'
    ],
    statBadge: 'Métiers qualifiants durables'
  },
  {
    id: 'transmission',
    title: 'Transmission & Académie',
    subtitle: 'Ce qui marche doit être partagé',
    description: 'Ce que nous apprenons sur nos parcelles n’a de valeur que si c’est transmis. La formation des petits exploitants n’est pas un outil de communication : c’est un métier à part entière de l’entreprise.',
    concretePractice: [
      'Sessions d’immersion courtes, concrètes et dispensées en dialecte tunisien (derja)',
      'Suivi post-formation directement sur les parcelles des apprenants',
      'Modules pratiques sur la conduite en sec et la fabrication d’amendements',
      'Création d’un réseau solidaire de fermes résilientes dans la région'
    ],
    statBadge: 'Formation paysanne continue'
  },
  {
    id: 'tracabilite',
    title: 'Traçabilité absolue',
    subtitle: 'Du plant à la bouteille, sans intermédiaire flou',
    description: 'Chaque lot est rattaché à sa parcelle géolocalisée, sa date de récolte et son mode d’extraction. Le client sait exactement d’où vient ce qu’il achète ; le partenaire sait ce qu’il finance.',
    concretePractice: [
      'Numérotation unitaire de chaque lot d’huile essentielle et d’huile d’olive',
      'Bulletins d’analyses physico-chimiques et chromatographies disponibles',
      'Registre public de récolte : date, conditions météo, temps de distillation',
      'Circuit court vérifiable garantissant l’absence totale de coupage'
    ],
    statBadge: 'Traçabilité parcellaire'
  }
];

export const VINERIA_PRODUCTS: VineriaProduct[] = [
  {
    id: 'prod-he-romarin',
    name: 'Huile Essentielle de Romarin Sauvage Bio',
    slug: 'huile-essentielle-romarin-sauvage',
    category: 'huiles-essentielles',
    categoryLabel: 'Huiles Essentielles',
    tagline: 'Distillée sur place à la vapeur basse pression — Romarin à cinéole',
    description: `Huile essentielle de Romarin (Rosmarinus officinalis) en tête de gamme Vineria, issue des parcelles aromatiques conduites sans aucun traitement chimique. Récoltée manuellement aux heures fraîches du matin, puis distillée immédiatement dans notre alambic en inox/cuivre à basse pression pour préserver la totalité des molécules aromatiques actives. Pure, 100% intégrale, non rectifiée et non déterpénée.`,
    method: 'Distillation lente à la vapeur d’eau basse température (1h45)',
    origin: 'Parcelles Romarin Nord-Est — Terroir argilo-calcaire Vineria',
    packaging: {
      retail: 'Flacon verre ambré 10 ml et 30 ml avec compte-goutte sécurisé',
      pro: 'Fûts aluminium et inox certifiés 1L, 5L, 25L pour cosmétique & pharmacie'
    },
    price: 18,
    unit: 'flacon 30 ml',
    imageUrl: '/images/rosemary-oil.jpg',
    characteristics: [
      { label: 'Chémotype principal', value: '1,8-Cinéole & Camphre' },
      { label: 'Mode de conduite', value: 'Permaculture en sec, non irrigué' },
      { label: 'Rendement moyen', value: '1.2% à 1.5% en masse fraîche' },
      { label: 'Certification', value: 'Conforme cosmétique naturelle & export' }
    ],
    featured: true,
    published: true
  },
  {
    id: 'prod-miel-verger',
    name: 'Miel Sauvage de Verger & Romarin',
    slug: 'miel-sauvage-verger-romarin',
    category: 'ruche',
    categoryLabel: 'Produits de la Ruche',
    tagline: 'Miel cru de floraison printanière amandiers, romarin et fleurs sauvages',
    description: `Les ruches de Vineria sont disposées au cœur même des vergers d’amandiers et des parcelles de romarin. Ce miel d’exception capture la signature aromatique du biotope au réveil printanier. Jamais chauffé, extrait à froid par centrifugation manuelle et décanté naturellement, il conserve vivantes ses enzymes, pollens et vertus antibactériennes.`,
    method: 'Extraction à froid sans filtration excessive, non pasteurisé',
    origin: 'Rucher central Vineria — Rayonnement verger & garrigue nord-tunisienne',
    packaging: {
      retail: 'Pots en verre hexagonal 250 g et 500 g',
      pro: 'Seaux alimentaires hermétiques 5 kg et 20 kg pour épiceries & chefs'
    },
    price: 16,
    unit: 'pot 500 g',
    imageUrl: '/images/miel.jpg',
    characteristics: [
      { label: 'Dominantes florales', value: 'Romarin sauvage, fleurs d’amandier, ciste' },
      { label: 'Texture', value: 'Crémeuse fine naturelle, cristallisation lente' },
      { label: 'Teneur en eau', value: '< 17.5% (gage de conservation optimale)' },
      { label: 'Traçabilité', value: 'Numéroté par ruche et période d’extraction' }
    ],
    featured: true,
    published: true
  },
  {
    id: 'prod-amandes-sec',
    name: 'Amandes Méditerranéennes en Conduite Sèche',
    slug: 'amandes-mediterraneennes-conduite-seche',
    category: 'amandes',
    categoryLabel: 'Amandes de Terroir',
    tagline: 'L’arbre identitaire de Vineria — Croquant dense, richesse lipidique',
    description: `L’amandier est l’arbre emblématique de Vineria. Conduit sans aucune irrigation artificielle dans le climat contrasté du Nord de la Tunisie, il produit des amandes à la chair exceptionnellement dense, sucrée et concentrée en acides gras polyinsaturés et vitamine E. Récolte manuelle sur filets, séchage solaire sous abri et décorticage calibré sur la ferme.`,
    method: 'Récolte manuelle, séchage solaire naturel, décorticage doux',
    origin: 'Verger haut d’amandiers Vineria — Sol drainant caillouteux',
    packaging: {
      retail: 'Sachets kraft respirants 250 g, 500 g et 1 kg (en coque ou décortiquées)',
      pro: 'Sacs toile de jute 10 kg et 25 kg pour transformateurs, pâtissiers et torréfacteurs'
    },
    price: 14,
    unit: 'sachet 500 g décortiquées',
    imageUrl: '/images/amandes.jpg',
    characteristics: [
      { label: 'Variétés', value: 'Mazzetto & Achaak rustiques' },
      { label: 'Teneur en huile', value: 'Concentration élevée > 55%' },
      { label: 'Traitement post-récolte', value: 'Zéro blanchiment chimique, séchage à l’air libre' },
      { label: 'Goût', value: 'Noisetté, douce amertume noble en finale' }
    ],
    featured: true,
    published: true
  },
  {
    id: 'prod-huile-olive-extra',
    name: 'Huile d’Olive Vierge Extra — Conduite en Permaculture',
    slug: 'huile-olive-vierge-extra-permaculture',
    category: 'huile-olive',
    categoryLabel: 'Huile d’Olive',
    tagline: 'Fruité vert intense, acidité inférieure à 0.2%, extraction à froid',
    description: `Oliveraie conduite selon les lois de la permaculture : inter-rangs ensemencés en légumineuses et romarin, sol nourri au compost de ferme. Les olives sont cueillies manuellement au stade tournant optimal et triturées dans les 6 heures suivant la récolte dans un moulin moderne à deux phases sans ajout d’eau extérieure. Une huile vivante, antioxydante et équilibrée.`,
    method: 'Extraction continue à froid (< 24°C) dans les 6h post-récolte',
    origin: 'Coteaux d’oliviers Vineria — Variété Chetoui du Nord',
    packaging: {
      retail: 'Bouteilles verre sombre anti-UV 500 ml et 750 ml avec bouchon verseur',
      pro: 'Bidons fer blanc 3L et 5L, cuves inox 200L pour exportateurs'
    },
    price: 22,
    unit: 'bouteille 750 ml',
    imageUrl: '/images/huile%20olivie.jpg',
    characteristics: [
      { label: 'Taux d’acidité oléique', value: '< 0.18% (garantie par lot)' },
      { label: 'Indice de peroxyde', value: '< 8 meq O2/kg' },
      { label: 'Polyphénols totaux', value: '> 480 mg/kg (haute teneur antioxydante)' },
      { label: 'Profil de dégustation', value: 'Artichaut cru, herbe fraîchement coupée, ardence élégante' }
    ],
    featured: true,
    published: true
  },
  {
    id: 'prod-propolis-cire',
    name: 'Propolis & Cire d’Opércule Sauvage',
    slug: 'propolis-et-cire-d-opercule',
    category: 'ruche',
    categoryLabel: 'Produits de la Ruche',
    tagline: 'Matières premières d’apiculture brute pour herboristerie et cosmétique',
    description: `Substances nobles récoltées avec ménagement sur nos ruches : propolis brute de garrigue riche en résines protectrices et cire d’opercule 100% pure et solaire non traitée. Recherchées par les formulateurs de baumes naturels et les artisans herboristes.`,
    method: 'Grattage doux et purification physique par décantation à chaud',
    origin: 'Ruchers intégrés Vineria',
    packaging: {
      retail: 'Flacon teinture mère 50 ml / Pain de cire 100 g',
      pro: 'Pains de cire brute en vrac 1 kg à 10 kg, propolis concassée'
    },
    price: 24,
    unit: 'lot découverte apithérapie',
    imageUrl: '/images/hero-farm.jpg',
    characteristics: [
      { label: 'Pureté cire', value: '100% cire d’abeille vierge d’opercule' },
      { label: 'Résidus acaricides', value: 'Non détectés (apiculture biologique sans synthèse)' },
      { label: 'Origine résines', value: 'Bourgeons d’arbres et arbustes de la ferme' },
      { label: 'Utilisation', value: 'Cosmétique solide, apithérapie, bougies nobles' }
    ],
    featured: false,
    published: true
  }
];

export const VINERIA_SERVICES: VineriaService[] = [
  {
    id: 'serv-academie',
    name: 'Formation des petits agriculteurs — L’Académie Vineria',
    slug: 'formation-petits-agriculteurs-academie-vineria',
    category: 'academie',
    tagline: 'Transmission pratique en dialecte local, sur le terrain, en petits groupes',
    description: `Sessions courtes et immersives dispensées sur notre ferme par nos agronomes et paysans chevronnés. Nous enseignons ce que nous pratiquons chaque jour avec succès en régime sec. Chaque session accueille 8 à 12 personnes avec suivi individualisé sur les parcelles des apprenants. Public prioritaire : petits exploitants vulnérables, femmes rurales en émancipation et jeunes porteurs de projets agricoles.`,
    targetAudience: 'Petits exploitants, femmes rurales, jeunes en installation territoriale',
    duration: 'Modules de 2 à 5 jours intensifs + suivi terrain 6 mois',
    priceFrom: 0,
    currency: 'Pris en charge par bourses et partenaires / tarifs solidaires',
    imageUrl: '/images/academy.jpg',
    syllabusOrFeatures: [
      'Conduite de l’amandier et de l’olivier en sec sans irrigation',
      'Initiation à l’apiculture moderne et respectueuse de l’abeille',
      'Cultures de plantes aromatiques et distillation paysanne',
      'Fabrication de compost vivant, lombricompost et gestion des résidus',
      'Captage de l’eau de ruissellement et techniques de paillage anti-sécheresse',
      'Conditionnement, hygiène de transformation et accès aux marchés rémunérateurs'
    ],
    featured: true,
    published: true
  },
  {
    id: 'serv-accompagnement-conversion',
    name: 'Accompagnement technique à la conversion agroécologique',
    slug: 'accompagnement-technique-conversion-agroecologique',
    category: 'technique',
    tagline: 'Diagnostic de parcelle et plan de conversion vers un système intégré',
    description: `Pour les exploitations voisines, coopératives agricoles et Groupements de Développement Agricole (GDA) souhaitant sortir de la monoculture ou de la dépendance aux intrants chimiques coûteux. Nous co-construisons un plan de transition réaliste et échelonné sur 1 à 2 campagnes, en tenant compte du relief, du sol et des moyens matériels existants.`,
    targetAudience: 'Exploitations familiales, coopératives agricoles, GDA locaux',
    duration: 'Accompagnement saisonnier sur 1 à 2 campagnes agricoles',
    priceFrom: 280,
    currency: 'EUR par exploitation (possibilité d’appui bailleur)',
    imageUrl: '/images/hero-farm.jpg',
    syllabusOrFeatures: [
      'Diagnostic pédologique et hydrologique approfondi de la parcelle',
      'Plan de plantation agroforestier adapté (arbres, arbustes, couverts)',
      'Plan de fertilisation organique autonome et zéro chimie',
      'Visites bimensuelles d’ajustement technique lors des étapes charnières (taille, floraison, récolte)'
    ],
    featured: true,
    published: true
  },
  {
    id: 'serv-distillation-partagee',
    name: 'Prestation de distillation & de conditionnement partagée',
    slug: 'prestation-distillation-et-conditionnement',
    category: 'distillation',
    tagline: 'Mise à disposition de notre atelier professionnel pour les producteurs du territoire',
    description: `Nombreux sont les petits producteurs d’aromatiques du territoire qui n’ont pas les capitaux pour investir dans un alambic de qualité supérieure. Vineria met son unité de distillation basse pression et sa ligne de conditionnement propre à leur disposition. Cela sécurise la valeur ajoutée au niveau local et garantit des normes export.`,
    targetAudience: 'Producteurs indépendants de plantes à parfum, aromatiques et médicinales (PPAM)',
    duration: 'À la journée de passe alambic ou au volume de matière fraîche',
    priceFrom: 65,
    currency: 'EUR / passe d’alambic',
    imageUrl: '/images/rosemary-oil.jpg',
    syllabusOrFeatures: [
      'Distillation contrôlée à la vapeur douce avec contrôle thermique continu',
      'Séparation et décantation soignée de l’huile essentielle et de l’hydrolat',
      'Filtration stérile et conditionnement sous azote ou en flacons scellés',
      'Possibilité de rachat ou mise en réseau commerciale de la récolte distillée'
    ],
    featured: true,
    published: true
  },
  {
    id: 'serv-visites-pedagogiques',
    name: 'Visites et accueil pédagogique sur la ferme',
    slug: 'visites-et-accueil-pedagogique',
    category: 'visite',
    tagline: 'La ferme vivante comme support d’apprentissage grandeur nature',
    description: `Ouverture de Vineria aux groupes scolaires du Nord de la Tunisie, étudiants en agronomie de l’INAT/ISA, associations environnementales et délégations d’entreprises. Une demi-journée ou journée complète pour comprendre de visu comment un écosystème agricole méditerranéen peut prospérer sans goutte-à-goutte ni pesticides.`,
    targetAudience: 'Écoles, universités agronomiques, ONG, délégations d’entreprises',
    duration: 'Demi-journée (3h30) ou journée complète avec repas fermier de terroir',
    priceFrom: 15,
    currency: 'EUR par participant (gratuité écoles publiques locales)',
    imageUrl: '/images/academy.jpg',
    syllabusOrFeatures: [
      'Parcours guidé à travers les 5 ateliers interconnectés',
      'Observation à la loupe de la vie biologique des sols compostés',
      'Démonstration en direct d’une passe de distillation artisanale',
      'Dégustation comparative de miels bruts et huiles d’olive de terroir'
    ],
    featured: false,
    published: true
  },
  {
    id: 'serv-parrainage-arbre-ruche',
    name: 'Parrainage d’un amandier ou d’une ruche',
    slug: 'parrainage-arbre-et-ruche',
    category: 'parrainage',
    tagline: 'Soutenir la permaculture méditerranéenne et recevoir sa part de récolte',
    description: `Une porte d’entrée directe pour un particulier ou une entreprise engagée en démarche RSE. En finançant un amandier ou une ruche pour une saison, le parrain reçoit des nouvelles photographiques de sa parcelle, une plaque nominative en bois d’olivier sur l’arbre/la ruche, et un colis annuel de la récolte correspondante (amandes décortiquées ou pots de miel personnalisés).`,
    targetAudience: 'Particuliers engagés, entreprises RSE, mécènes de la biodiversité',
    duration: 'Engagement annuel renouvelable',
    priceFrom: 95,
    currency: 'EUR / an',
    imageUrl: '/images/hero-farm.jpg',
    syllabusOrFeatures: [
      'Plaque gravée au nom du parrain ou de l’entreprise sur l’arbre / la ruche',
      'Bulletin saisonnier de la floraison à la récolte rédigé par l’équipe',
      'Colis annuel exclusif : pots de miel de la ruche ou amandes du verger',
      'Invitation privilège à la journée des vendanges et récoltes de la ferme'
    ],
    featured: false,
    published: true
  }
];

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    id: 'hectares',
    value: '32',
    unit: 'hectares',
    label: 'Conduits en permaculture intégrée',
    sublabel: 'Régime sec intégral, zéro herbicide ni pesticide de synthèse',
    status: 'verifie'
  },
  {
    id: 'ruches',
    value: '75',
    unit: 'ruches',
    label: 'Ruches pastorales en activité',
    sublabel: 'Pollinisatrices de plus de 4 000 amandiers et parcelles aromatiques',
    status: 'verifie'
  },
  {
    id: 'femmes',
    value: '22',
    unit: 'femmes',
    label: 'Femmes rurales employées',
    sublabel: 'Dont 14 en contrat CDI régulier déclaré avec parité salariale absolue',
    status: 'campagne-2025-2026'
  },
  {
    id: 'jeunes',
    value: '38',
    unit: 'jeunes',
    label: 'Jeunes formés aux métiers de la terre',
    sublabel: 'Distillation, apiculture paysanne, taille arboricole et contrôle qualité',
    status: 'verifie'
  },
  {
    id: 'agriculteurs',
    value: '145+',
    unit: 'exploitants',
    label: 'Petits agriculteurs accompagnés',
    sublabel: 'À travers les sessions terrain de l’Académie Vineria et visites de parcelles',
    status: 'verifie'
  },
  {
    id: 'eau',
    value: '580 000',
    unit: 'litres / an',
    label: 'D’eau souterraine préservée',
    sublabel: 'Par rapport à une conduite conventionnelle sous irrigation intensive',
    status: 'campagne-2025-2026'
  }
];

export const PARTNERSHIP_TRACKS: PartnershipTrack[] = [
  {
    id: 'commerciaux',
    title: 'Partenaires Commerciaux & Distributeurs',
    tag: 'B2B & Export',
    target: 'Épiceries fines, magasins bio, formulateurs cosmétiques, importateurs',
    description: `Nous recherchons des distributeurs engagés capables de valoriser la traçabilité parcellaire et la pureté de nos huiles essentielles de romarin, notre huile d'olive vierge extra et nos miels crus. Conditionnements adaptés en flaconnage détail de luxe ou vrac professionnel.`,
    actionLabel: 'Demander notre catalogue & échantillons B2B'
  },
  {
    id: 'techniques-bailleurs',
    title: 'Partenaires Techniques & Bailleurs de Fonds',
    tag: 'Impact & Bourses Rurales',
    target: 'Agences de développement, fondations d’entreprise, ONG, programmes agri-ruraux',
    description: `Pour financer et démultiplier les promotions de formation de l'Académie Vineria au profit des femmes rurales et des jeunes agriculteurs démunis du Nord de la Tunisie. Chaque bourse permet d'outiller et de former un exploitant à l'agriculture régénératrice en sec.`,
    actionLabel: 'Financer des promotions de formation'
  },
  {
    id: 'recherche',
    title: 'Partenaires Académiques & Recherche Agronomique',
    tag: 'Science & Données',
    target: 'Universités agronomiques (INAT, ISA, universités internationales), centres de recherche sols & climat',
    description: `Nous ouvrons nos parcelles pour le suivi scientifique des systèmes arboricoles en sec, la dynamique de la matière organique sous couvert permanent, le rôle des auxiliaires et l'analyse phyto-chimique comparative des huiles essentielles méditerranéennes.`,
    actionLabel: 'Proposer un protocole de recherche'
  }
];
