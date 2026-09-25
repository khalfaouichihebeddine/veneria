'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product, Service } from '@/types';

export type Language = 'fr' | 'ar';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  isArabic: boolean;
  t: (key: keyof typeof TRANSLATIONS) => string;
  localizeProduct: (product: Product) => Product;
  localizeService: (service: Service) => Service;
};

export const TRANSLATIONS = {
  home: 'Accueil',
  products: 'Nos Produits',
  services: 'Services & Académie',
  method: 'Notre Méthode',
  contact: 'Contact & Partenariats',
  becomePartner: 'Devenir partenaire',
  permaculture: 'Permaculture · Nord Tunisie',
  discover: 'Découvrir',
  view: 'Voir',
  from: 'À partir de',
  freeOrScholarship: 'Sur bourse / gratuit',
  navigation: 'Navigation',
  harvests: 'Nos Récoltes',
  findUs: 'Nous Trouver',
  writeToVineria: 'Écrire à Vineria',
  arabic: 'العربية',
  french: 'Français',
  switchToArabic: 'Passer en arabe',
  switchToFrench: 'Passer en français',
  tunisianDinar: 'TND',
} as const;

export const ARABIC_TRANSLATIONS: Record<keyof typeof TRANSLATIONS, string> = {
  home: 'الرئيسية',
  products: 'منتجاتنا',
  services: 'الخدمات والأكاديمية',
  method: 'منهجيتنا',
  contact: 'اتصل بنا وشراكات',
  becomePartner: 'كن شريكا',
  permaculture: 'زراعة مستدامة · شمال تونس',
  discover: 'اكتشف',
  view: 'شاهد',
  from: 'ابتداء من',
  freeOrScholarship: 'منحة / مجاني',
  navigation: 'التنقل',
  harvests: 'محاصيلنا',
  findUs: 'موقعنا',
  writeToVineria: 'اكتب إلى فينيريا',
  arabic: 'العربية',
  french: 'Français',
  switchToArabic: 'التبديل إلى العربية',
  switchToFrench: 'التبديل إلى الفرنسية',
  tunisianDinar: 'د.ت',
};

export const ARABIC_PRODUCTS: Record<string, Partial<Product>> = {
  'huile-essentielle-romarin-sauvage': {
    name: 'زيت إكليل الجبل العطري البري العضوي',
    categoryLabel: 'الزيوت العطرية',
    tagline: 'مقطر في المزرعة بالبخار منخفض الضغط',
    description: 'زيت إكليل الجبل العطري النقي والكامل، محضر من نباتات تنمو دون مواد كيميائية وتقطر مباشرة بعد الحصاد للحفاظ على مركباتها العطرية.',
    method: 'تقطير بطيء ببخار الماء على درجة حرارة منخفضة',
    origin: 'حقول إكليل الجبل في فينيريا',
    unit: 'قارورة 30 مل',
  },
  'miel-sauvage-verger-romarin': {
    name: 'عسل البساتين وإكليل الجبل البري',
    categoryLabel: 'منتجات النحل',
    tagline: 'عسل خام من أزهار اللوز وإكليل الجبل',
    description: 'عسل خام يجمع من خلايا النحل الموجودة بين بساتين اللوز وحقول إكليل الجبل. يستخرج على البارد ويحافظ على إنزيماته وحبوب لقاحه.',
    method: 'استخراج بارد دون بسترة',
    origin: 'منحل فينيريا المركزي',
    unit: 'مرطبان 500 غ',
  },
  'amandes-mediterraneennes-conduite-seche': {
    name: 'لوز متوسطي بالزراعة الجافة',
    categoryLabel: 'لوز terroir',
    tagline: 'شجرة فينيريا الأصيلة، قرمشة ونكهة مركزة',
    description: 'لوز يزرع دون ري اصطناعي في شمال تونس، ويحصد يدويا ثم يجفف طبيعيا تحت الشمس ويحضر في المزرعة.',
    method: 'حصاد يدوي وتجفيف طبيعي وتقشير لطيف',
    origin: 'بستان اللوز المرتفع في فينيريا',
    unit: 'كيس 500 غ مقشر',
  },
  'huile-olive-vierge-extra-permaculture': {
    name: 'زيت زيتون بكر ممتاز بالزراعة المستدامة',
    categoryLabel: 'زيت الزيتون',
    tagline: 'نكهة خضراء مركزة واستخراج بارد',
    description: 'زيت زيتون حي من بساتين تدار بالتربة والغطاء النباتي. تقطف الثمار يدويا وتعصر خلال ست ساعات من الحصاد دون إضافة ماء.',
    method: 'استخراج مستمر على البارد',
    origin: 'منحدرات زيتون فينيريا',
    unit: 'قارورة 750 مل',
  },
  'propolis-et-cire-d-opercule': {
    name: 'عكبر وشمع نحل طبيعي',
    categoryLabel: 'منتجات النحل',
    tagline: 'مواد خام طبيعية للعناية والتجميل',
    description: 'عكبر خام وشمع نقي يجمعان بعناية من خلايا فينيريا، لفائدة صناع مستحضرات التجميل والعلاجات العشبية.',
    method: 'جمع لطيف وتنقية طبيعية',
    origin: 'مناحل فينيريا',
    unit: 'مجموعة اكتشاف',
  },
};

export const ARABIC_SERVICES: Record<string, Partial<Service>> = {
  'formation-petits-agriculteurs-academie-vineria': {
    name: 'تكوين صغار الفلاحين — أكاديمية فينيريا',
    category: 'academie',
    tagline: 'تكوين عملي في الميدان وبمجموعات صغيرة',
    description: 'دورات تطبيقية داخل المزرعة يؤطرها مهندسون وفلاحون ذوو خبرة في الزراعة الجافة، مع متابعة فردية للمشاركين.',
    targetAudience: 'صغار الفلاحين والنساء الريفيات والشباب',
    duration: 'من يومين إلى خمسة أيام مع متابعة ميدانية',
  },
  'accompagnement-technique-conversion-agroecologique': {
    name: 'مرافقة تقنية للتحول الإيكولوجي',
    category: 'technique',
    tagline: 'تشخيص الأرض ووضع خطة تحول واقعية',
    description: 'نرافق المزارعيات والمزارعين والتعاونيات في الانتقال التدريجي نحو نظام زراعي متكامل يناسب الأرض والموارد المتاحة.',
    targetAudience: 'المزارع العائلية والتعاونيات ومجامع التنمية الفلاحية',
    duration: 'مرافقة موسمية من موسم إلى موسمين',
  },
  'prestation-distillation-et-conditionnement': {
    name: 'خدمة التقطير والتعليب المشتركة',
    category: 'distillation',
    tagline: 'وحدة مهنية متاحة لمنتجي المنطقة',
    description: 'نضع وحدة التقطير منخفض الضغط وخط التعليب تحت تصرف منتجي النباتات العطرية والطبية لخلق قيمة محلية بمعايير مهنية.',
    targetAudience: 'منتجو النباتات العطرية والطبية',
    duration: 'حسب يوم التقطير أو حجم المادة الطازجة',
  },
  'visites-et-accueil-pedagogique': {
    name: 'زيارات واستقبال تربوي في المزرعة',
    category: 'visite',
    tagline: 'المزرعة الحية فضاء للتعلم والمشاركة',
    description: 'نفتح فينيريا أمام المدارس والجامعات والجمعيات لفهم كيف يمكن لنظام زراعي متوسطي أن ينجح دون مبيدات أو ري بالتنقيط.',
    targetAudience: 'المدارس والجامعات والجمعيات البيئية',
    duration: 'نصف يوم أو يوم كامل',
  },
  'parrainage-arbre-et-ruche': {
    name: 'رعاية شجرة لوز أو خلية نحل',
    category: 'parrainage',
    tagline: 'ادعم الزراعة الجافة واحصل على نصيبك من المحصول',
    description: 'مبادرة تمنح الأفراد والمؤسسات فرصة دعم شجرة أو خلية لموسم كامل مع أخبار مصورة وهدية من محصول المزرعة.',
    targetAudience: 'الأفراد والمؤسسات الداعمة للتنوع البيولوجي',
    duration: 'التزام سنوي قابل للتجديد',
  },
};

export const FRENCH_PRODUCTS: Record<string, Partial<Product>> = {
  'huile-essentielle-romarin-sauvage': {
    name: 'Huile essentielle de romarin sauvage biologique',
    categoryLabel: 'Huiles essentielles',
    tagline: 'Distillée à la ferme à la vapeur douce',
    description: 'Une huile essentielle de romarin pure et complète, issue de plantes cultivées sans produits chimiques et distillées juste après la récolte.',
    method: 'Distillation lente à la vapeur d’eau basse température',
    origin: 'Champs de romarin de Vineria',
    unit: 'Flacon 30 ml',
  },
  'miel-sauvage-verger-romarin': {
    name: 'Miel des vergers et romarin sauvage',
    categoryLabel: 'Produits de la ruche',
    tagline: 'Miel cru des fleurs d’amandier et de romarin',
    description: 'Un miel cru récolté dans les ruches installées entre les amandiers et les champs de romarin, extrait à froid pour préserver ses qualités.',
    method: 'Extraction à froid sans pasteurisation',
    origin: 'Rucher central de Vineria',
    unit: 'Pot 500 g',
  },
  'amandes-mediterraneennes-conduite-seche': {
    name: 'Amandes méditerranéennes en conduite sèche',
    categoryLabel: 'Amandes du terroir',
    tagline: 'L’amande signature de Vineria, croquante et intense',
    description: 'Des amandes cultivées sans irrigation artificielle dans le nord de la Tunisie, récoltées à la main et séchées naturellement au soleil.',
    method: 'Récolte manuelle, séchage naturel et décorticage doux',
    origin: 'Verger d’amandiers de Vineria',
    unit: 'Sachet 500 g décortiqué',
  },
  'huile-olive-vierge-extra-permaculture': {
    name: 'Huile d’olive vierge extra en permaculture',
    categoryLabel: 'Huile d’olive',
    tagline: 'Une expression verte et intense, extraite à froid',
    description: 'Une huile issue de vergers conduits avec couverture végétale et soin du sol, pressée dans les six heures suivant la récolte.',
    method: 'Extraction continue à froid',
    origin: 'Oliveraies de Vineria',
    unit: 'Flacon 750 ml',
  },
  'propolis-et-cire-d-opercule': {
    name: 'Propolis et cire d’abeille naturelles',
    categoryLabel: 'Produits de la ruche',
    tagline: 'Des matières premières naturelles pour les soins',
    description: 'Propolis brute et cire pure récoltées avec soin dans les ruches de Vineria, pour les fabricants de cosmétiques et de soins botaniques.',
    method: 'Récolte douce et purification naturelle',
    origin: 'Ruchers de Vineria',
    unit: 'Coffret découverte',
  },
};

export const FRENCH_SERVICES: Record<string, Partial<Service>> = {
  'formation-petits-agriculteurs-academie-vineria': {
    name: 'Formation des petits agriculteurs — Académie Vineria',
    category: 'academie',
    tagline: 'Une formation pratique sur le terrain, en petits groupes',
    description: 'Des formations appliquées à la ferme, encadrées par des agronomes et agriculteurs expérimentés en conduite sèche.',
    targetAudience: 'Petits agriculteurs, femmes rurales et jeunes',
    duration: 'De 2 à 5 jours avec suivi de terrain',
  },
  'accompagnement-technique-conversion-agroecologique': {
    name: 'Accompagnement technique à la transition agroécologique',
    category: 'technique',
    tagline: 'Diagnostiquer la terre et construire un plan réaliste',
    description: 'Nous accompagnons les exploitations et coopératives vers un système agricole résilient adapté à leurs ressources.',
    targetAudience: 'Fermes familiales, coopératives et groupements agricoles',
    duration: 'Accompagnement saisonnier sur 1 à 2 saisons',
  },
  'prestation-distillation-et-conditionnement': {
    name: 'Distillation et conditionnement partagés',
    category: 'distillation',
    tagline: 'Une unité professionnelle ouverte aux producteurs locaux',
    description: 'Notre alambic basse pression et notre ligne de mise en bouteille sont accessibles aux producteurs de plantes aromatiques.',
    targetAudience: 'Producteurs de plantes aromatiques et médicinales',
    duration: 'Selon le jour de distillation ou le volume frais',
  },
  'visites-et-accueil-pedagogique': {
    name: 'Visites et accueil pédagogique à la ferme',
    category: 'visite',
    tagline: 'Une ferme vivante pour apprendre et partager',
    description: 'Vineria accueille écoles, universités et associations pour observer un modèle méditerranéen réussi sans pesticides ni pompage intensif.',
    targetAudience: 'Écoles, universités et associations écologiques',
    duration: 'Une demi-journée ou une journée',
  },
  'parrainage-arbre-et-ruche': {
    name: 'Parrainage d’un amandier ou d’une ruche',
    category: 'parrainage',
    tagline: 'Soutenir la conduite sèche et recevoir une part de la récolte',
    description: 'Soutenez un arbre ou une ruche pendant une saison, avec des nouvelles illustrées et un coffret issu de la récolte.',
    targetAudience: 'Particuliers et entreprises engagés pour la biodiversité',
    duration: 'Engagement annuel renouvelable',
  },
};

export const ARABIC_TO_FRENCH_DICTIONARY: Record<string, string> = {
  // Navigation & General
  'الرئيسية': 'Accueil',
  'منتجاتنا': 'Nos produits',
  'الخدمات والأكاديمية': 'Services & Académie',
  'منهجيتنا': 'Notre méthode',
  'اتصل بنا وشراكات': 'Contact & Partenariats',
  'تواصل معنا': 'Nous contacter',
  'كن شريكا': 'Devenir partenaire',
  'اكتشف': 'Découvrir',
  'شاهد': 'Voir',
  'مشاهدة': 'Voir',
  'ابتداء من': 'À partir de',
  'ابتداءً من': 'À partir de',
  'منحة / مجاني': 'Sur bourse / gratuit',
  'مغطى بمنح دراسية / تسعيرة تضامنية': 'Pris en charge par des bourses / tarif solidaire',
  'مغطى عبر المنح والشراكات التنموية / تعريفات تضامنية': 'Pris en charge par des bourses / tarifs solidaires',
  'التنقل': 'Navigation',
  'التنقل السريع': 'Navigation rapide',
  'محاصيلنا': 'Nos récoltes',
  'محاصيلنا ومنتجاتنا': 'Nos récoltes et produits',
  'موقعنا': 'Nous trouver',
  'موقعنا والتواصل': 'Nous trouver et nous contacter',
  'ضيعة فينيريا': 'Ferme Vineria',
  'مزرعة فينيريا': 'Ferme Vineria',
  'شمال تونس': 'Nord de la Tunisie',
  'مراسلة فينيريا': 'Écrire à Vineria',
  'اكتب إلى فينيريا': 'Écrire à Vineria',
  'د.ت': 'TND',
  'زراعة مستدامة · شمال تونس': 'Permaculture · Nord Tunisie',
  'مزرعة بيئية متكاملة بالزراعة المستدامة · شمال تونس': 'Ferme écologique intégrée en agriculture durable · Nord de la Tunisie',
  'مزرعة بيئية متكاملة بالزراعة المستدامة — شمال تونس': 'Ferme écologique intégrée en agriculture durable — Nord de la Tunisie',
  'الإنتاج في النظام الجاف. ونقل ما أثبت نجاحه ميدانياً.': 'Produire en conduite sèche. Transmettre ce qui a fait ses preuves sur le terrain.',
  'جميع الحقوق محفوظة.': 'Tous droits réservés.',

  // Hero Home
  'الإنتاج في النظام الجاف، بلا مدخلات كيميائية، وإحياء للمنطقة وأهلها.': 'Produire en conduite sèche, sans intrants chimiques, et faire revivre le terroir et ses habitants.',
  'أشجار لوز، زيتون، مزارع إكليل جبل وخلايا نحل ضمن منظومة حية متكاملة حيث مخلفات كل نشاط تمثل المورد الحيوي للآخر. ثلاث شعب مترابطة: محاصيلنا الأصيلة، خدماتنا الفلاحية، وأكاديمية فينيريا.': 'Amandiers, oliviers, romarin et ruches forment un écosystème vivant où les résidus de chaque atelier deviennent la ressource du suivant. Trois branches complémentaires : nos récoltes authentiques, nos services agricoles et l’Académie Vineria.',
  '100% نظام جاف': '100% conduite sèche',
  '100 % نظام جاف': '100% conduite sèche',
  'صفر مدخلات كيميائية': 'Zéro intrant chimique',
  'تتبع دقيق للمصدر': 'Traçabilité rigoureuse de l’origine',
  'مساواة في الأجر': 'Égalité salariale',
  'اكتشف محاصيلنا': 'Découvrir nos récoltes',
  'منهجيتنا في النظام الجاف': 'Notre méthode en conduite sèche',

  // Circular model
  'نموذجنا البيئي': 'Notre modèle écologique',
  'لا شيء يخرج بمفرده.': 'Rien ne sort seul du système.',
  'هذا هو جوهر نموذجنا الفلاحي. كل ورشة ونشاط في المزرعة يغذي الأنشطة الأخرى. ما يُعد نفاية لدى أحدهم هو مورد أساسي للآخر.': 'C’est le cœur de notre modèle agricole : chaque atelier nourrit les autres. Ce qui est un déchet pour l’un est une ressource essentielle pour l’autre.',
  'هذا هو جوهر نموذجنا، وما يميزنا عن الاستغلاليات الفلاحية التقليدية. كل ورشة تغذي بقية الورشات وتدعمها.': 'C’est le cœur de notre modèle agroécologique : chaque atelier nourrit et renforce les autres.',
  'المبدأ الدائري المستدام': 'Le principe circulaire durable',
  'قش التقطير يعود إلى السماد العضوي.': 'La paille de distillation retourne au compost.',
  'تقليم أشجار الزيتون يحمي التربة ويغذيها. والنحل يزيد من نسبة عقد ثمار اللوز. هذا التكامل الحيوي هو ما يجعل المنظومة منتجة ومستدامة في ظروف الجفاف — وهو بالضبط ما ندرسه وننقله.': 'La taille des oliviers protège et nourrit le sol, tandis que les abeilles maximisent la nouaison des amandiers. Ce cercle vertueux assure la productivité en climat sec — et c’est ce que nous transmettons.',
  'أرض مغطاة دوماً — غطاء نباتي وعضوي دائم': 'Sol toujours couvert — couverture végétale et organique permanente',
  'صفر استنزاف للطبقات المائية الجوفية': 'Zéro pompage des nappes phréatiques',
  'سماد عضوي 100% محضر من بقايا المزرعة': 'Compost 100% organique issu des coproduits de la ferme',
  'خلو تام من أي مدخلات كيميائية مصنعة منذ 2022': 'Exempt total d’intrants de synthèse depuis 2022',

  // Products Section Home
  'المحصول الطبيعي': 'La récolte naturelle',
  'منتجاتنا الأصيلة من قلب الأرض': 'Nos produits authentiques du terroir',
  'منتجاتنا الأصيلة من قلب الأرض.': 'Nos produits authentiques du terroir.',
  'زيوت عطرية نقية، عسل طبيعي خام، لوز مجفف طبيعياً وزيت زيتون بكر ممتاز — كل دفعة موثقة من الحقل إلى القارورة.': 'Huiles essentielles pures, miel brut de verger, amandes séchées naturellement et huile d’olive vierge extra — chaque lot tracé du champ au flacon.',
  'كامل الكتالوج': 'Tout le catalogue',

  // Pillars & Values
  'التزاماتنا الميدانية': 'Nos engagements de terrain',
  'قيمنا، مترجمة إلى ممارسات حقيقية.': 'Nos valeurs, traduites en pratiques concrètes.',
  'نبتعد عن الشعارات الإنشائية. إليكم ما تعنيه كل قيمة بشكل ملموس في حقولنا.': 'Loin des slogans : voici ce que chaque engagement représente concrètement sur nos parcelles.',
  'المرافقة والتأهيل': 'Accompagnement & qualification',
  'خدماتنا وأكاديمية فينيريا': 'Nos services et l’Académie Vineria',
  'تكوين فلاحي تطبيقي في الميدان، مرافقة تقنية للتحول الإيكولوجي، تقطير مشترك، زيارات تعليمية، ورعاية الأشجار والخلايا.': 'Formation agricole pratique de terrain, conseil agroécologique, distillation partagée, visites pédagogiques et parrainage d’amandiers et de ruches.',
  'جميع خدماتنا': 'Tous nos services',

  // Impact Metrics
  'أثر موثق ومثبت': 'Un impact mesuré et prouvé',
  'أرقام حقيقية قابلة للتحقق ومؤرخة.': 'Des données concrètes, vérifiables et datées.',
  'الرقم الدقيق الموثق ميدانياً أصدق تعبيراً وأعلى مصداقية من الوعود الإنشائية العامة.': 'Les mesures concrètes observées sur le terrain sont plus crédibles que de simples promesses générales.',
  '✓ موثق ميدانياً': '✓ Constaté sur le terrain',
  'موسم 2025–2026': 'Saison 2025–2026',
  'هكتار': 'Hectares',
  'خلية نحل': 'Ruches',
  'شجرة لوز وزيتون': 'Amandiers & oliviers',
  'فلاح مستفيد': 'Agriculteurs formés',
  'متر مكعب ماء جوفي محفوظ سنوياً': 'm³ d’eau souterraine épargnés/an',
  'ساعة تدريب ميداني': 'Heures de formation terrain',
  'مساحة المزرعة المدارة كلياً بنظام جاف دون ري اصطناعي': 'Surface totale conduite en agriculture sèche sans irrigation',
  'خلايا نحل في بيئة خالية تماماً من المبيدات التركيبية': 'Ruches dans un biotope sans le moindre pesticide chimique',
  'أشجار متوسطية أصيلة تثبت الكربون وتحمي التربة': 'Arbres indigènes régénérant les sols et stockant le carbone',
  'من صغار المزارعين والنساء الريفيات المستفيدين من التكوين': 'Petits exploitants et femmes rurales formés à la ferme',
  'مقارنة بالاستغلاليات التقليدية المماثلة في المنطقة': 'Économisés par rapport à une exploitation intensive de même taille',
  'مقدمة في الحقل مباشرة بالعامية التونسية': 'Dispensées directement sur le terrain en dialecte local',

  // Partnerships Home
  'الشراكات ذات المعنى': 'Des partenariats porteurs de sens',
  'ما نبحث عنه في شركائنا': 'Ce que nous attendons de nos partenaires',
  'لا نبحث عن شراكات تقليدية، بل عن فاعلين يدركون قيمة وتحديات الإنتاج بالنظام الجاف في حوض المتوسط في القرن الحادي والعشرين.': 'Nous cherchons des partenaires engagés comprenant les défis et le potentiel de la culture sèche en Méditerranée au XXIe siècle.',
  'شراء وتوزيع B2B': 'Distribution & B2B',
  'تمويل برامج الأكاديمية': 'Financement de l’Académie',
  'شراكات بحثية وتطبيقية': 'Partenariats de recherche',
  'للموزعين والمتاجر المتخصصة والمصنعين': 'Distributeurs, épiceries fines et formulateurs',
  'للهيئات المانحة والمنظمات التنموية': 'Bailleurs de fonds et programmes de développement',
  'للجامعات ومراكز البحث الفلاحي': 'Universités et instituts agronomiques',
  'نوفر كميات موثقة من الزيوت العطرية، العسل واللوز بأسعار مباشرة من المزرعة مع شهادات التتبع والتحاليل المخبرية.': 'Volumes certifiés d’huiles essentielles, miel et amandes en direct de l’exploitation avec traçabilité et analyses.',
  'ادعم تمويل دورات تكوينية لصغار الفلاحين أو اقتناء معدات مشتركة للمنطقة في إطار برامج التنمية المستدامة.': 'Financez des cycles de formation pour les petits agriculteurs ou du matériel partagé pour le territoire.',
  'نفتح حقولنا ومزارعنا كحقل تجارب ومختبر حي (Living Lab) لقياس قدرة الأنظمة الجافة على مواجهة التغيرات المناخية.': 'Nous ouvrons nos parcelles comme laboratoire vivant pour étudier la résilience des systèmes secs au changement climatique.',
  'طلب كتالوج B2B': 'Demander le catalogue B2B',
  'مناقشة برنامج منحة': 'Échanger sur les bourses',
  'اقتراح تعاون علمي': 'Proposer une recherche',

  // Academy Callout
  'أكاديمية فينيريا': 'Académie Vineria',
  'تكوين الفلاحين وتمكينهم هو صلب رسالتنا.': 'Former et valoriser les producteurs est au cœur de notre mission.',
  'دورات قصيرة، تطبيقية في الحقل، بالعامية التونسية، مع متابعة فردية لحقول المتدربين. الفئات ذات الأولوية: صغار الفلاحين، النساء الريفيات، والشباب الراغبون في الاستقرار الفلاحي.': 'Formations pratiques de terrain avec tutorat personnalisé. Priorité aux petits agriculteurs, femmes rurales et jeunes ruraux.',
  'استكشاف الدورات': 'Découvrir les formations',
  'التسجيل أو تمويل منحة': 'S’inscrire ou soutenir une bourse',

  // Permaculture Workshops
  'بساتين اللوز': 'Vergers d’amandiers',
  'لوز أصيل بالقشرة ومقشر عالي الجودة': 'Amandes de terroir en coque et décortiquées de qualité',
  'ظل لطيف، هيكلة البستان، وإزهار مبكر جداً لتغذية النحل في أواخر الشتاء': 'Ombrage doux, structure du verger et floraison précoce pour nourrir les abeilles en fin d’hiver',
  'الشجرة الرمزية لفينيريا. تُدار بنظام جاف حصراً، في تكامل مع البقوليات والغطاء النباتي من إكليل الجبل الذي يحمي جذورها السطحية.': 'Arbre emblématique de Vineria, conduit exclusivement en sec avec un paillage vivant de romarin protégeant ses racines.',
  'بساتين الزيتون': 'Oliveraies traditionnelles',
  'زيت زيتون بكر ممتاز عالي البوليفينولات': 'Huile d’olive vierge extra très riche en polyphénols',
  'تثبيت المنحدرات ضد الانجراف، وإنتاج أغصان التقليم لتغذية التربة': 'Protection anti-érosion des collines et broyage de taille pour régénérer le sol',
  'صنف الشتوي التونسي الأصيل المتكيف تماماً مع شمال تونس، يُقلم بعناية لتعظيم التهوية ودخول الضوء دون حاجة لمياه الري.': 'Variété Chétoui tunisienne adaptée, aérée par une taille soignée pour capter la rosée et la lumière sans irrigation.',
  'مزارع إكليل الجبل': 'Cultures de romarin',
  'زيوت عطرية نقية ومقطرات نباتية طبيعية': 'Huiles essentielles pures et hydrolats aromatiques',
  'غطاء حي دائم للتربة يمنع التبخر، ومرعى أزهار غني للنحل على مدار أشهر الشتاء والربيع': 'Couverture végétale permanente retenant l’humidité et pâturage nectarifère prolongé pour les abeilles',
  'نبات محلي صلب ينمو في التربة الكلسية الشمالية. لا يستهلك قطرة ماء واحدة من الري الاصطناعي ويشكل مصداً طبيعياً ضد الرياح.': 'Plante indigène rustique sur sols calcaires, brise-vent naturel sans aucun apport d’eau artificiel.',
  'مناحل فينيريا': 'Ruchers de Vineria',
  'عسل خام، عكبر، وشمع نحل طبيعي': 'Miel cru, propolis et cire d’abeille pure',
  'تلقيح حيوي أساسي لأشجار اللوز وكافة النباتات البرية والمحاصيل المجاورة': 'Pollinisation vitale des amandiers, de la garrigue et des cultures avoisinantes',
  'خلايا موضوعة في مناطق محمية من الرياح. تُدار برفق ودون تغذية سكرية اصطناعية أو علاجات كيميائية لتوفير عسل خام حقيقي.': 'Ruches abritées des vents, conduites avec soin sans sucre ni chimie de synthèse.',
  'التربة الحية والسماد العضوي': 'Sol vivant et compostage',
  'دبال خصب، محسنات حيوية للتربة': 'Humus fertile et amendements biologiques',
  'إعادة تدوير 100% من مخلفات التقليم، قش التقطير، وتفل عصر الزيتون': 'Recyclage intégral des bois de taille, pailles de distillation et grignons d’olives',
  'الإسهام في المنظومة': 'Contribution à l’écosystème',
  'الورشة الفلاحية': 'Atelier agricole',
  'ما تنتجه': 'Ce qu’il produit',
  'ما تقدمه للمنظومة الحية': 'Apport au système vivant',

  // Value Pillars Details
  'الزراعة الجافة 100%': '100% agriculture en conduite sèche',
  'صفر ري اصطناعي، احترام كامل لدورة المياه': 'Zéro irrigation artificielle, respect scrupuleux du cycle de l’eau',
  'لا نعتمد إطلاقاً على الري بالتنقيط أو استنزاف الآبار العميقة. نختار أصنافاً تونسية ومتوسطية متكيفة جينياً، ونعزز قدرة التربة على احتجاز الرطوبة.': 'Nous n’avons aucun recours au goutte-à-goutte ni au pompage profond. Nous sélectionnons des variétés rustiques et stimulons la capacité de rétention hydrique du sol.',
  'نظام جاف 100%: صفر استنزاف للطبقات المائية الجوفية الحساسة': '100% conduite sèche : zéro prélèvement sur les nappes fragiles',
  'صناعة السماد العضوي محلياً من مخلفات عصر الزيتون والتقطير': 'Compost produit sur place avec les résidus de taille et de distillation',
  'انتقاء أصناف متوسطية أصيلة ومتكيفة طبيعياً مع الجفاف': 'Sélection de variétés méditerranéennes adaptées à l’aridité',
  '100% دون مدخلات كيميائية': '100% sans intrants chimiques',
  'إدماج النساء الريفيات': 'Inclusion des femmes rurales',
  'كرامة، مساواة، ومسؤوليات قيادية': 'Dignité, équité et responsabilités managériales',
  'العمل الفلاحي النسائي في أرياف تونس واسع وموسمي وكثيراً ما يُغفل. في فينيريا، هو عمل مصرح به رسمياً، منتظم، بأجر متكافئ تماماً، ويفتح المجال لتولي مسؤوليات مباشرة.': 'Le labeur agricole des femmes est trop souvent informel. Chez Vineria, il est déclaré, stable, avec stricte égalité salariale et accès aux responsabilités techniques.',
  'عقود عمل مصرح بها وتغطية اجتماعية وصحية كاملة': 'Contrats de travail en règle et protection sociale complète',
  'أجر متساوٍ مقابل العمل المتساوي دون أي انتقاص': 'Égalité salariale absolue à poste équivalent',
  'تولي مواقع أساسية في التقطير، التعبئة، ومراقبة الجودة': 'Postes clés dans la distillation, le conditionnement et le contrôle qualité',
  'أوقات عمل وتنظيم يراعي التزامات الأسرة الريفية': 'Planning adapté aux réalités des familles rurales',
  '100% عقود قانونية ومساواة': '100% contrats formels et égalité',
  'تشغيل وتكوين الشباب': 'Emploi et insertion des jeunes',
  'خلق مهن مستقبلية واعدة في المنطقة': 'Des métiers d’avenir valorisants sur le territoire',
  'فرص عمل موسمية ودائمة، والأهم من ذلك تعلم مهن فنية ذات قيمة مستدامة: تربية النحل الحديثة، التقطير التقليدي عالي المعايير، تقليم الأشجار، وإدارة الجودة.': 'Des opportunités concrètes et la transmission d’expertises : apiculture douce, distillation basse pression, arboriculture et démarche qualité.',
  'مرافقة وتدريب مباشر مع حرفيينا ومهندسينا الفلاحيين': 'Encadrement par nos maîtres de distillation et agronomes',
  'شهادات تدريبية تطبيقية معترف بها في مجالات التحويل الفلاحي': 'Attestations de compétences pratiques valorisantes',
  'تشجيع الاستقرار والعمل على الأراضي العائلية المجاورة': 'Soutien à l’installation pérenne sur les terres familiales',
  'توعية برهانات إدارة المياه واقتحام أسواق التصدير': 'Sensibilisation aux enjeux de l’eau et aux circuits courts et d’export',
  'مهن مؤهلة ومستدامة': 'Métiers qualifiés et pérennes',
  'نقل المعرفة وأكاديمية فينيريا': 'Transmission & Académie Vineria',
  'الخبرة الناجحة أمانة يجب مشاركتها': 'L’expérience vécue doit être partagée',
  'ما نتعلمه في حقولنا لا تكتمل قيمته إلا إذا تم نقله ومشاركته. تكوين صغار الفلاحين ليس أداة ترويجية، بل هو أحد صلب مهام ورسالة مؤسستنا.': 'Notre savoir accumulé ne prend tout son sens que lorsqu’il est partagé. Former les exploitants locaux est notre mission fondatrice.',
  'دورات تطبيقية مركزة وميدانية تُقدَّم بالعامية التونسية المبسطة': 'Formations pratiques de terrain dispensées en dialecte tunisien',
  'متابعة دورية مباشرة في حقول المزارعين بعد انتهاء التكوين': 'Accompagnement continu sur les parcelles des producteurs formés',
  'وحدات عملية في الزراعة الجافة وصناعة الأسمدة الحيوية': 'Ateliers de fertilisation organique et gestion de la sècheresse',
  'بناء شبكة تعاون تضامنية بين مزارع المنطقة لتعزيز الصمود': 'Réseau d’entraide entre exploitations voisines pour la résilience',
  'تكوين فلاحي مستمر': 'Formation agricole continue',
  'شفافية وتتبع دقيق للمصدر': 'Transparence et traçabilité',
  'من الشتلة إلى القارورة، بمسار واضح وموثوق': 'Du végétal au flacon, une traçabilité totale',
  'كل دفعة إنتاج ترتبط بقطعتها الأرضية المحددة جغرافياً، وتاريخ حصادها، وطريقة استخلاصها. يعرف المستهلك أصل ما يقتنيه، ويعلم الشريك بالضبط أين يستثمر.': 'Chaque lot est documenté par parcelle, date de cueillette et procédé d’extraction. Les acheteurs connaissent l’origine exacte.',
  'ترقيم مستقل لكل دفعة من الزيوت العطرية وزيت الزيتون': 'Numérotation de lot unique pour chaque production',
  'شهادات تحليل فيزيائي كيميائي وكروماتوغرافي متاحة': 'Bulletins d’analyses chromatographiques disponibles',
  'سجل شفاف لكل حصاد: التاريخ، الحالة الجوية، ومدة التقطير': 'Registre météo, dates de récolte et durées d’alambic',
  'مسار قصير موثوق يضمن خلو المنتجات تماماً من أي خلط': 'Circuit court garanti sans aucun mélange extérieur',

  // Products Page
  'المحصول الطبيعي — تتبع دقيق لكل دفعة': 'La récolte naturelle — traçabilité rigoureuse de chaque lot',
  'زيوت عطرية نقية من إكليل الجبل مقطرة في المزرعة، عسل خام من البساتين، لوز بالزراعة الجافة وزيت زيتون بكر ممتاز. كل دفعة ترتبط بقطعتها الأرضية، تاريخ حصادها وطريقة استخلاصها.': 'Huiles essentielles pures distillées sur place, miel brut, amandes en culture sèche et huile d’olive vierge extra. Chaque lot est rattaché à sa parcelle et sa date d’extraction.',
  'تتبع قطاعي دقيق': 'Traçabilité parcellaire précise',
  'تعبئة للتجزئة وللمحترفين': 'Formats pour particuliers et grossistes',
  'جاهز للتصدير': 'Prêt pour l’exportation',
  'جميع المنتجات': 'Tous les produits',
  'الزيوت العطرية': 'Huiles essentielles',
  'العسل ومنتجات النحل': 'Produits de la ruche',
  'اللوز الأصيل': 'Amandes du terroir',
  'لوز أصيل': 'Amandes du terroir',
  'زيت الزيتون': 'Huile d’olive',
  'العودة إلى كتالوج المنتجات': 'Retour au catalogue des produits',
  'المواصفات والخصائص': 'Spécifications et analyses',
  'منتجات فينيريا — تتبع معتمد ومضمون': 'Produits Vineria — traçabilité certifiée',
  'المنشأ الجغرافي': 'Origine géographique',
  'طريقة الاستخلاص': 'Méthode d’extraction',
  'أحجام التعبئة المتوفرة': 'Conditionnements disponibles',
  'تجزئة (أفراد ومتاجر)': 'Détail (particuliers & épiceries)',
  'محترفون ومصنعون / B2B والتصدير': 'Professionnels, laboratoires & export',
  'السعر التأشيري': 'Prix indicatif',
  'طلب هذا المنتج': 'Commander ce produit',
  'طلب عرض أسعار B2B': 'Demander un devis B2B',
  'الرد خلال 48 ساعة عمل. عينات متاحة للمهنيين ومسؤولي التوريد.': 'Réponse sous 48h ouvrées. Échantillons disponibles pour les professionnels et acheteurs.',

  // Services Page
  'أكاديمية فينيريا وخدماتنا الفلاحية': 'Académie Vineria et services agricoles',
  'ما نطبقه بنجاح في حقولنا، نعلّمه وننقله.': 'Ce que nous réussissons dans nos champs, nous le transmettons.',
  'تكوين فلاحي تطبيقي بالعامية التونسية، مرافقة تقنية للتحول الإيكولوجي، تقطير مشترك لمنتجي المنطقة، زيارات تعليمية، ورعاية أشجار اللوز وخلايا النحل.': 'Formations pratiques au champ, conseil agroécologique, distillation collective, visites pédagogiques et parrainage d’amandiers et de ruches.',
  'دورات حقلية تطبيقية': 'Formations pratiques de terrain',
  'مجموعات صغيرة (8–12 شخص)': 'Petits groupes (8–12 participants)',
  'متابعة ميدانية بعد التكوين': 'Suivi agronomique post-formation',
  'منح دراسية متوفرة': 'Bourses d’accès disponibles',
  'ما يجعل من فينيريا مؤسسة ذات أثر حقيقي.': 'Ce qui fait de Vineria un projet à impact direct.',
  'العودة إلى الخدمات والأكاديمية': 'Retour aux services et à l’académie',
  'محاور التكوين والمكتسبات العملية': 'Programme et compétences acquises',
  'التعريفة والتكلفة': 'Tarifs et prise en charge',
  'الفئة المستهدفة': 'Public concerné',
  'طلب التسجيل أو الاستفسار': 'Demande d’inscription ou information',
  'تمويل هذه الدورة (للهيئات المانحة)': 'Financer cette formation (bailleurs)',
  'الرد خلال 48 ساعة عمل. إمكانية ملاءمة التدريب حسب احتياجات المجموعة والميزانية المتاحة.': 'Réponse sous 48h ouvrées. Programmes personnalisables selon les besoins du groupe et le budget.',

  // About Page
  'التعريف بالمزرعة والمشروع': 'Présentation de la ferme et du projet',
  'منهجية حية، لا مجرد شعبة فلاحية.': 'Une approche vivante, bien plus qu’une simple exploitation.',
  'من نحن': 'Qui sommes-nous ?',
  'فينيريا، شمال تونس.': 'Vineria, dans le nord de la Tunisie.',
  'فينيريا مستغلة فلاحية متكاملة تقع في شمال تونس.': 'Vineria est une ferme agricole intégrée située dans le nord de la Tunisie.',
  'أشجار اللوز، الزيتون، إكليل الجبل وخلايا النحل': 'Amandiers, oliviers, romarin et ruches',
  'تدار جميعاً ضمن نظام موحد مستدام وفق مبادئ الزراعة المعمرة.': 'sont tous conduits dans un système unifié selon les principes de la permaculture.',
  'لا نعرف أنفسنا بنشاط أحادي، بل بمنهجية حية متكاملة:': 'Nous nous définissons par un écosystème vivant et interdépendant :',
  'الإنتاج في النظام الجاف، بلا مدخلات كيميائية': 'produire en conduite sèche, sans intrants chimiques',
  '، وإشراك أبناء وبنات المنطقة بكرامة، مع نقل الممارسات الناجحة للمزارعين المجاورين.': ', valoriser dignement les travailleurs locaux et partager nos pratiques avec les fermes voisines.',
  'تأسست سنة 2022 في شمال تونس': 'Créée en 2022 dans le nord de la Tunisie',
  'منظومة متكاملة على 32 هكتاراً بالنظام الجاف': 'Système intégré sur 32 hectares en conduite sèche',
  '75 خلية نحل، وأكثر من 4,000 شجرة لوز وزيتون': '75 ruches et plus de 4 000 amandiers et oliviers',
  'خلو تام من أي مدخلات كيميائية أو مبيدات تركيبية': 'Zéro engrais de synthèse ni pesticides chimiques',
  '32 هكتار': '32 hectares',
  'زراعة مستدامة': 'Agriculture durable',
  '75 خلية': '75 ruches',
  'مناحل منتجة': 'Ruches productives',
  '2022': '2022',
  'سنة التأسيس': 'Année de fondation',
  'ما نتعلمه في حقولنا لا تكتمل قيمته إلا بالمشاركة.': 'Ce que nous expérimentons dans nos champs prend toute sa valeur par le partage.',
  'تكوين صغار الفلاحين ليس نشاطاً ثانوياً أو إعلانياً، بل هو صلب رسالة ومهمة مؤسستنا. دورات تطبيقية مركزة، داخل المزرعة، بالعامية التونسية، بمجموعات صغيرة، مع متابعة ميدانية لحقول المتدربين.': 'La formation des petits agriculteurs est notre mission fondatrice. Formations concrètes sur nos terres, en petits groupes, avec un accompagnement continu sur leurs propres parcelles.',
  'الفئات المستهدفة:': 'Bénéficiaires prioritaires :',
  'صغار الفلاحين، النساء الريفيات، والشباب الراغبون في الاستثمار الفلاحي.': 'Petits exploitants, femmes rurales et jeunes porteurs de projets agricoles.',
  'استكشاف الأكاديمية': 'Découvrir l’Académie',
  'انضم إلينا وشراكات': 'Rejoignez-nous & Partenariats',
  'هل ترغب في العمل والتعاون معنا؟': 'Vous souhaitez collaborer avec Vineria ?',
  'سواء كنت موزعاً، جهة مانحة، باحثاً علمياً أو مهتماً بمحاصيلنا — نسعد بالتواصل والرد عليك خلال يومي عمل.': 'Distributeur, bailleur, chercheur ou passionné : nous sommes à votre écoute sous deux jours ouvrés.',
  'مشاهدة منتجاتنا': 'Voir nos produits',

  // Contact Page
  'لنتحدث عن المزرعة ومشاريعها.': 'Parlons de la ferme et de ses projets.',
  'موزعاً، جهة مانحة، باحثاً، متعلماً أو مهتماً — نسعد بالإجابة عن استفساراتك بكل عناية خلال يومي عمل.': 'Que vous soyez distributeur, bailleur, chercheur ou passionné, nous vous répondrons sous 48h ouvrées.',
  'نبحث عن شركاء فاعلين في مجالات:': 'Nous recherchons des partenaires engagés dans :',
  'معلومات التواصل المباشر': 'Coordonnées directes',
  'العنوان والموقع': 'Adresse et localisation',
  'الهاتف': 'Téléphone',
  'البريد الإلكتروني': 'E-mail',
  'أوقات العمل والاستقبال': 'Horaires et accueil',
  'الإثنين – السبت : 07:30 – 17:00 (الزيارات بموعد مسبق)': 'Lundi – Samedi : 07h30 – 17h00 (visites sur rendez-vous)',
  'روابط سريعة': 'Liens utiles',
  'منتجاتنا والكتالوج': 'Nos produits et catalogue',
  'منهجيتنا في الزراعة المعمرة': 'Notre méthode en permaculture',
  'تم إرسال رسالتك بنجاح!': 'Votre message a bien été envoyé !',
  'شكراً لاهتمامك بفينيريا. سنقوم بالرد عليك بعناية واهتمام خلال يومي عمل.': 'Merci de votre intérêt pour Vineria. Nous vous répondrons avec attention sous deux jours ouvrés.',
  'العودة إلى الصفحة الرئيسية': 'Retour à l’accueil',
  'أرسل لنا رسالة': 'Envoyez-nous un message',
  'الرد خلال 48 ساعة عمل. جميع الحقول التي تحمل علامة * إجبارية.': 'Réponse sous 48h ouvrées. Tous les champs marqués d’un * sont obligatoires.',
  'الاسم واللقب *': 'Nom et prénom *',
  'فاطمة بن صالح': 'Fatima Ben Salah',
  'المؤسسة / الشركة / التعاونية': 'Structure / Entreprise / Coopérative',
  'اسم شركتك أو مشروعك أو تعاونيتك الفلاحية': 'Nom de votre entreprise, structure ou coopérative',
  'طبيعة اهتمامك أو شراكتك *': 'Objet de votre intérêt ou partenariat *',
  'اختر مجال اهتمامك…': 'Sélectionnez votre domaine d’intérêt…',
  '🏪 توزيع / شراء بالجملة B2B / تصدير': '🏪 Distribution / Achat en gros B2B / Export',
  '💼 تمويل وشراكة فنية وتنموية': '💼 Financement et partenariat bailleur de fonds',
  '🔬 بحث علمي ودراسات زراعية': '🔬 Recherche agronomique et études scientifiques',
  '🎓 التسجيل في دورات أكاديمية فينيريا': '🎓 Inscription aux sessions de l’Académie Vineria',
  '🌳 رعاية شجرة لوز أو خلية نحل': '🌳 Parrainage d’un amandier ou d’une ruche',
  '👁 زيارة تربوية وميدانية للمزرعة': '👁 Visite pédagogique de l’exploitation',
  'استفسار آخر': 'Autre demande d’information',
  'موضوع الرسالة *': 'Objet de la prise de contact *',
  'طلب عينات / تسجيل في الأكاديمية / رعاية…': 'Demande d’échantillons / Inscription académie / Parrainage…',
  'نص الرسالة *': 'Votre message *',
  'صف لنا مشروعك أو استفسارك أو طلبك بالتفصيل. كلما كنت أكثر دقة، كان بإمكاننا إفادتك بشكل أفضل.': 'Précisez votre demande ou votre projet. Plus vous êtes précis, mieux nous pourrons vous conseiller.',
  'إرسال الرسالة': 'Envoyer le message',
  'جارٍ الإرسال…': 'Envoi en cours…',
  'بياناتك محمية ولن تتم مشاركتها مع أي جهة خارجية. نستخدمها حصراً للرد على استفسارك.': 'Vos coordonnées sont strictement confidentielles et utilisées uniquement pour traiter votre demande.',
  'تعذر إرسال الرسالة في الوقت الحالي. يرجى المحاولة مجدداً أو مراسلتنا مباشرة عبر البريد الإلكتروني.': 'Impossible d’envoyer le message pour le moment. Réessayez ou contactez-nous directement par e-mail.',

  // Auth Pages
  'الفضاء الخاص': 'Espace privé',
  'تسجيل الدخول': 'Connexion',
  'البريد الإلكتروني *': 'Adresse e-mail *',
  'كلمة المرور *': 'Mot de passe *',
  'كلمة المرور * (8 أحرف على الأقل)': 'Mot de passe * (au moins 8 caractères)',
  'فتح جلستي': 'Se connecter',
  'إنشاء حساب جديد': 'Créer un nouveau compte',
  'إنشاء حساب': 'Créer un compte',
  'مرحباً بك في فينيريا': 'Bienvenue chez Vineria',
  'الاسم الكامل *': 'Nom complet *',
  'إنشاء حسابي': 'Créer mon compte',
  'العودة إلى تسجيل الدخول': 'Retour à la connexion',
  '✅ تم إنشاء الحساب بنجاح. يمكنك الآن تسجيل الدخول.': '✅ Compte créé avec succès. Vous pouvez maintenant vous connecter.',
  'تم تفعيل الدخول المحلي بنجاح.': 'Connexion locale activée.',

  // Vineria Summary
  'فينيريا هي مستغلة فلاحية متكاملة تقع في شمال تونس. تُدار فيها بساتين اللوز والزيتون ومزارع إكليل الجبل وخلايا النحل ضمن منظومة واحدة متكاملة وفق مبادئ الزراعة المستدامة والمعمرة. لا تُعرّف فينيريا نفسها بنشاط وحيد، بل بمنهجية حية: الإنتاج في النظام الجاف، دون مدخلات تركيبية، وتوفير فرص عمل كريمة لأبناء المنطقة، مع نقل الممارسات الناجحة للمزارعين المجاورين. تنبثق من هذا ثلاث شعب: باقة من المنتجات الأصيلة، خدمات فلاحية متخصصة، وأكاديمية للتكوين الحقلي.':
    'Vineria est une ferme agricole intégrée située dans le nord de la Tunisie. Les vergers d’amandiers, les oliveraies, les cultures de romarin et les ruchers y sont conduits au sein d’un écosystème unifié selon les principes de la permaculture et de l’agriculture durable. Vineria ne se définit pas par une activité unique, mais par une méthode vivante : produire en conduite sèche, sans intrants de synthèse, offrir des emplois dignes aux habitants de la région et transmettre les pratiques éprouvées aux agriculteurs voisins. De cette vision naissent trois piliers complémentaires : une gamme de récoltes authentiques, des services agricoles spécialisés et une académie de formation pratique de terrain.',

  // Detailed syllabus & features
  'إدارة أشجار اللوز والزيتون في النظام الجاف دون ري اصطناعي': 'Conduite des amandiers et oliviers en sec sans irrigation artificielle',
  'مبادئ تربية النحل الحديثة والمراعية لدورة حياة الخلية': 'Principes d’apiculture douce respectueuse de la biologie de la ruche',
  'زراعة النباتات العطرية والتقطير الفلاحي الاحترافي': 'Culture des plantes aromatiques et distillation basse pression',
  'صناعة السماد العضوي الحي والكمبوست وإدارة مخلفات المزرعة': 'Fabrication de compost vivant et valorisation des coproduits de la ferme',
  'تقنيات حصاد مياه الأمطار السطحية والتغطية الحامية من الجفاف': 'Captage des eaux de ruissellement et paillage protecteur du sol',
  'التعبئة الصحية للمنتجات وتيسير الوصول إلى الأسواق المجزية': 'Conditionnement hygiénique et accès aux marchés à haute valeur ajoutée',
  'تشخيص شامل للتربة والمصادر المائية والتضاريس في الحقل': 'Diagnostic agronomique du sol, de la topographie et des réserves hydriques',
  'مخطط تشجير وغطاء نباتي ملائم (أشجار، شجيرات، ومحاصيل تغطية)': 'Plan d’aménagement végétal adapté (arbres, haies et couverts)',
  'خطة تخصيب عضوي ذاتي ومستقل تماماً عن أي مادة كيميائية': 'Plan de fertilisation organique autonome sans engrais synthétiques',
  'زيارات حقلية نصف شهرية لضبط التدخلات في الفترات المفصلية (التقليم، التزهير، الجني)': 'Visites de suivi régulières lors des stades phénologiques clés',

  // Product Characteristics
  'النمط الكيميائي الرئيسي': 'Chémotype principal',
  '1,8-سينيول وكافور طبيعي': '1,8-cinéole et camphre naturel',
  'طريقة الزراعة': 'Mode de culture',
  'زراعة مستدامة في النظام الجاف، دون ري': 'Conduite sèche durable, sans irrigation',
  'المردود المتوسط': 'Rendement moyen',
  '1.2% إلى 1.5% من الوزن الطازج': '1,2% à 1,5% du poids frais',
  'المطابقة': 'Conformité',
  'مطابق لمواصفات التجميل الطبيعي والتصدير': 'Conforme aux standards cosmétiques et export',
  'المصادر الزهرية الغالبة': 'Origines florales dominantes',
  'إكليل الجبل البري، أزهار اللوز، القريضة': 'Romarin sauvage, fleurs d’amandier, ciste',
  'القوام': 'Texture',
  'كريمي ناعم طبيعياً، تبلور بطيء متجانس': 'Naturellement crémeuse, cristallisation fine',
  'نسبة الرطوبة': 'Taux d’humidité',
  'أقل من 17.5% (ضمان للحفظ الطبيعي المثالي)': 'Inférieur à 17,5% (conservation optimale garantie)',
  'التتبع': 'Traçabilité',
  'مرقم حسب الخلية وفترة الاستخراج': 'Numéroté par rucher et date d’extraction',
  'الأصناف': 'Variétés',
  'أصناف مازيتو وعشاق الأصيلة': 'Variétés Mazetto et Achaak locales',
  'نسبة الزيوت الطبيعية': 'Teneur en huiles',
  'تركيز عالٍ يتجاوز 55%': 'Concentration élevée dépassant 55%',
  'المعالجة بعد الحصاد': 'Traitement post-récolte',
  'صفر تبييض كيميائي، تجفيف طبيعي في الهواء الطلق': 'Zéro blanchiment chimique, séchage naturel à l’air libre',
  'المذاق': 'Profil gustatif',
  'نكهة بندق واضحة مع لمسة مرارة نبيلة في النهاية': 'Notes franches de noisette avec une légère amertume noble',
  'نسبة الحموضة الزيتية': 'Acidité oléique',
  'أقل من 0.18% (مضمونة لكل دفعة)': 'Moins de 0,18% (garantie par lot)',
  'مؤشر البيروكسيد': 'Indice de peroxyde',
  'أقل من 8 ملمكافيء أكسجين/كغ': 'Inférieur à 8 meq O2/kg',
  'إجمالي البوليفينولات': 'Polyphénols totaux',
  'أكثر من 480 ملغ/كغ (مضادات أكسدة عالية)': 'Plus de 480 mg/kg (antioxydants élevés)',
  'بروفيل التذوق': 'Profil aromatique',
  'خرشوف طازج، عشب مقطوع تواً، وحرارة أنيقة متوازنة': 'Artichaut frais, herbe coupée et ardence équilibrée',
  'نقاء الشمع': 'Pureté de la cire',
  '100% شمع نحل بكر نقي': '100% cire d’opercule pure d’abeille',
  'رواسب المبيدات': 'Résidus de pesticides',
  'غير موجودة نهائياً (تربية نحل طبيعية بدون كيمياء)': 'Absence totale (apiculture sans intrants chimiques)',
  'مصدر الراتنجات': 'Origine des résines',
  'براعم أشجار ونباتات المزرعة الطبيعية': 'Bourgeons et garrigue de la ferme',
  'الاستخدامات': 'Applications',
  'مستحضرات تجميل صلبة، استشفاء طبيعي، وشموع راقية': 'Cosmétique solide, soins naturels et bougies d’artisanat',
};

// Build reverse dictionary and sorted phrases
export const FRENCH_TO_ARABIC_DICTIONARY: Record<string, string> = {};
for (const [ar, fr] of Object.entries(ARABIC_TO_FRENCH_DICTIONARY)) {
  if (fr && !FRENCH_TO_ARABIC_DICTIONARY[fr]) {
    FRENCH_TO_ARABIC_DICTIONARY[fr] = ar;
  }
}

const SORTED_AR_ENTRIES = Object.entries(ARABIC_TO_FRENCH_DICTIONARY).sort(
  (a, b) => b[0].length - a[0].length
);

const ORIGINAL_TEXT = new WeakMap<Text, string>();
const ORIGINAL_PLACEHOLDER = new WeakMap<Element, string>();
const ORIGINAL_OPTION = new WeakMap<HTMLOptionElement, string>();

function translateText(text: string, toLanguage: Language): string {
  const trimmed = text.trim();
  if (!trimmed) return text;

  if (toLanguage === 'fr') {
    if (ARABIC_TO_FRENCH_DICTIONARY[trimmed]) {
      return text.replace(trimmed, ARABIC_TO_FRENCH_DICTIONARY[trimmed]);
    }
    // Substring replace from longest to shortest
    let result = text;
    for (const [ar, fr] of SORTED_AR_ENTRIES) {
      if (ar.length >= 8 && result.includes(ar)) {
        result = result.split(ar).join(fr);
      }
    }
    return result;
  } else {
    if (FRENCH_TO_ARABIC_DICTIONARY[trimmed]) {
      return text.replace(trimmed, FRENCH_TO_ARABIC_DICTIONARY[trimmed]);
    }
    return text;
  }
}

function localizeElementTree(root: Element, language: Language) {
  // 1. Text nodes
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) {
    textNodes.push(n as Text);
  }

  for (const textNode of textNodes) {
    const parent = textNode.parentElement;
    if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) continue;

    if (!ORIGINAL_TEXT.has(textNode)) {
      ORIGINAL_TEXT.set(textNode, textNode.nodeValue ?? '');
    }

    if (language === 'ar') {
      const orig = ORIGINAL_TEXT.get(textNode);
      if (orig !== undefined && textNode.nodeValue !== orig) {
        textNode.nodeValue = orig;
      }
    } else {
      const orig = ORIGINAL_TEXT.get(textNode) ?? textNode.nodeValue ?? '';
      const translated = translateText(orig, 'fr');
      if (textNode.nodeValue !== translated) {
        textNode.nodeValue = translated;
      }
    }
  }

  // 2. Input / Textarea placeholders
  const inputs = root.querySelectorAll('input[placeholder], textarea[placeholder]');
  inputs.forEach((el) => {
    const input = el as HTMLInputElement | HTMLTextAreaElement;
    if (!ORIGINAL_PLACEHOLDER.has(input)) {
      ORIGINAL_PLACEHOLDER.set(input, input.placeholder);
    }
    if (language === 'ar') {
      const orig = ORIGINAL_PLACEHOLDER.get(input);
      if (orig !== undefined && input.placeholder !== orig) {
        input.placeholder = orig;
      }
    } else {
      const orig = ORIGINAL_PLACEHOLDER.get(input) ?? input.placeholder;
      const translated = translateText(orig, 'fr');
      if (input.placeholder !== translated) {
        input.placeholder = translated;
      }
    }
  });

  // 3. Select options
  const options = root.querySelectorAll('select option');
  options.forEach((el) => {
    const option = el as HTMLOptionElement;
    if (!ORIGINAL_OPTION.has(option)) {
      ORIGINAL_OPTION.set(option, option.textContent ?? '');
    }
    if (language === 'ar') {
      const orig = ORIGINAL_OPTION.get(option);
      if (orig !== undefined && option.textContent !== orig) {
        option.textContent = orig;
      }
    } else {
      const orig = ORIGINAL_OPTION.get(option) ?? option.textContent ?? '';
      const translated = translateText(orig, 'fr');
      if (option.textContent !== translated) {
        option.textContent = translated;
      }
    }
  });
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar');

  useEffect(() => {
    const stored = window.localStorage.getItem('vineria-language');
    if (stored === 'ar' || stored === 'fr') {
      setLanguageState(stored);
    } else {
      setLanguageState('ar');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.dataset.language = language;
    window.localStorage.setItem('vineria-language', language);

    if (document.body) {
      localizeElementTree(document.body, language);
    }

    let timeoutId: number | null = null;
    const observer = new MutationObserver((mutations) => {
      // Debounce mutations to avoid performance overhead
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        for (const m of mutations) {
          if (m.type === 'childList') {
            m.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                localizeElementTree(node as Element, language);
              }
            });
          }
        }
      }, 50);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage: setLanguageState,
    toggleLanguage: () => setLanguageState((current) => (current === 'fr' ? 'ar' : 'fr')),
    isArabic: language === 'ar',
    t: (key) => (language === 'ar' ? ARABIC_TRANSLATIONS[key] : TRANSLATIONS[key]),
    localizeProduct: (product) =>
      language === 'ar'
        ? { ...product, ...ARABIC_PRODUCTS[product.slug] }
        : { ...product, ...FRENCH_PRODUCTS[product.slug] },
    localizeService: (service) =>
      language === 'ar'
        ? { ...service, ...ARABIC_SERVICES[service.slug] }
        : { ...service, ...FRENCH_SERVICES[service.slug] },
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
