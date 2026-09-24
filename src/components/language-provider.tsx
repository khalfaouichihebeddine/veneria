'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product, Service } from '@/types';

type Language = 'fr' | 'ar';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  isArabic: boolean;
  t: (key: keyof typeof TRANSLATIONS) => string;
  localizeProduct: (product: Product) => Product;
  localizeService: (service: Service) => Service;
};

const TRANSLATIONS = {
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

const ARABIC_TRANSLATIONS: Record<keyof typeof TRANSLATIONS, string> = {
  home: 'الرئيسية', products: 'منتجاتنا', services: 'الخدمات والأكاديمية', method: 'منهجيتنا', contact: 'اتصل بنا وشراكات', becomePartner: 'كن شريكا', permaculture: 'زراعة مستدامة · شمال تونس', discover: 'اكتشف', view: 'شاهد', from: 'ابتداء من', freeOrScholarship: 'منحة / مجاني', navigation: 'التنقل', harvests: 'محاصيلنا', findUs: 'موقعنا', writeToVineria: 'اكتب إلى فينيريا', arabic: 'العربية', french: 'Français', switchToArabic: 'التبديل إلى العربية', switchToFrench: 'التبديل إلى الفرنسية', tunisianDinar: 'د.ت',
};

const ARABIC_PRODUCTS: Record<string, Partial<Product>> = {
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

const ARABIC_SERVICES: Record<string, Partial<Service>> = {
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

const FRENCH_PRODUCTS: Record<string, Partial<Product>> = {
  'huile-essentielle-romarin-sauvage': {
    name: 'Huile essentielle de romarin sauvage biologique', categoryLabel: 'Huiles essentielles',
    tagline: 'Distillée à la ferme à la vapeur douce', description: 'Une huile essentielle de romarin pure et complète, issue de plantes cultivées sans produits chimiques et distillées juste après la récolte.',
    method: 'Distillation lente à la vapeur d’eau basse température', origin: 'Champs de romarin de Vineria', unit: 'Flacon 30 ml',
  },
  'miel-sauvage-verger-romarin': {
    name: 'Miel des vergers et romarin sauvage', categoryLabel: 'Produits de la ruche',
    tagline: 'Miel cru des fleurs d’amandier et de romarin', description: 'Un miel cru récolté dans les ruches installées entre les amandiers et les champs de romarin, extrait à froid pour préserver ses qualités.',
    method: 'Extraction à froid sans pasteurisation', origin: 'Rucher central de Vineria', unit: 'Pot 500 g',
  },
  'amandes-mediterraneennes-conduite-seche': {
    name: 'Amandes méditerranéennes en conduite sèche', categoryLabel: 'Amandes du terroir',
    tagline: 'L’amande signature de Vineria, croquante et intense', description: 'Des amandes cultivées sans irrigation artificielle dans le nord de la Tunisie, récoltées à la main et séchées naturellement au soleil.',
    method: 'Récolte manuelle, séchage naturel et décorticage doux', origin: 'Verger d’amandiers de Vineria', unit: 'Sachet 500 g décortiqué',
  },
  'huile-olive-vierge-extra-permaculture': {
    name: 'Huile d’olive vierge extra en permaculture', categoryLabel: 'Huile d’olive',
    tagline: 'Une expression verte et intense, extraite à froid', description: 'Une huile issue de vergers conduits avec couverture végétale et soin du sol, pressée dans les six heures suivant la récolte.',
    method: 'Extraction continue à froid', origin: 'Oliveraies de Vineria', unit: 'Flacon 750 ml',
  },
  'propolis-et-cire-d-opercule': {
    name: 'Propolis et cire d’abeille naturelles', categoryLabel: 'Produits de la ruche',
    tagline: 'Des matières premières naturelles pour les soins', description: 'Propolis brute et cire pure récoltées avec soin dans les ruches de Vineria, pour les fabricants de cosmétiques et de soins botaniques.',
    method: 'Récolte douce et purification naturelle', origin: 'Ruchers de Vineria', unit: 'Coffret découverte',
  },
};

const FRENCH_SERVICES: Record<string, Partial<Service>> = {
  'formation-petits-agriculteurs-academie-vineria': { name: 'Formation des petits agriculteurs - Académie Vineria', tagline: 'Une formation pratique sur le terrain, en petits groupes', description: 'Des formations appliquées à la ferme, encadrées par des ingénieurs et des agriculteurs expérimentés en conduite sèche.', targetAudience: 'Petits agriculteurs, femmes rurales et jeunes', duration: 'De 2 à 5 jours avec suivi de terrain' },
  'accompagnement-technique-conversion-agroecologique': { name: 'Accompagnement technique à la conversion agroécologique', tagline: 'Diagnostiquer la terre et construire un plan réaliste', description: 'Nous accompagnons les exploitations et les coopératives dans une transition progressive vers un système agricole adapté à leurs ressources.', targetAudience: 'Fermes familiales et coopératives', duration: 'Accompagnement saisonnier sur 1 à 2 saisons' },
  'prestation-distillation-et-conditionnement': { name: 'Distillation et conditionnement partagés', tagline: 'Une unité professionnelle ouverte aux producteurs locaux', description: 'Notre unité de distillation basse pression et notre ligne de conditionnement sont accessibles aux producteurs de plantes aromatiques et médicinales.', targetAudience: 'Producteurs de plantes aromatiques et médicinales', duration: 'Selon le jour de distillation ou le volume frais' },
  'visites-et-accueil-pedagogique': { name: 'Visites et accueil pédagogique à la ferme', tagline: 'Une ferme vivante pour apprendre et partager', description: 'Vineria accueille écoles, universités et associations pour découvrir un système méditerranéen performant sans pesticides ni irrigation au goutte-à-goutte.', targetAudience: 'Écoles, universités et associations', duration: 'Une demi-journée ou une journée' },
  'parrainage-arbre-et-ruche': { name: 'Parrainage d’un amandier ou d’une ruche', tagline: 'Soutenir la conduite sèche et recevoir une part de la récolte', description: 'Une initiative pour soutenir un arbre ou une ruche pendant une saison, avec des nouvelles illustrées et un cadeau issu de la ferme.', targetAudience: 'Particuliers et organisations engagés pour la biodiversité', duration: 'Engagement annuel renouvelable' },
};

const FRENCH_PAGE_TEXT: Record<string, string> = {
  'الرئيسية': 'Accueil',
  'منتجاتنا': 'Nos produits',
  'الخدمات والأكاديمية': 'Services et académie',
  'منهجيتنا': 'Notre méthode',
  'اتصل بنا وشراكات': 'Contact et partenariats',
  'تواصل معنا': 'Nous contacter',
  'منتجاتنا الأصيلة': 'Nos produits authentiques',
  'اكتشف محاصيلنا': 'Découvrir nos récoltes',
  'منهجيتنا في النظام الجاف': 'Notre méthode en conduite sèche',
  'المحصول الطبيعي': 'La récolte naturelle',
  'كامل الكتالوج': 'Voir le catalogue',
  'الخدمات وأكاديمية فينيريا': 'Services et académie Vineria',
  'جميع خدماتنا': 'Tous nos services',
  'جميع المنتجات': 'Tous les produits',
  'الزيوت العطرية': 'Huiles essentielles',
  'اللوز الأصيل': 'Amandes du terroir',
  'زيت الزيتون': 'Huile d’olive',
  'أكاديمية فينيريا': 'Académie Vineria',
  'مزرعة بيئية متكاملة بالزراعة المستدامة · شمال تونس': 'Ferme écologique intégrée en agriculture durable · Nord de la Tunisie',
  'نموذجنا البيئي': 'Notre modèle écologique',
  'لا شيء يخرج بمفرده.': 'Rien ne sort du système seul.',
  'الإسهام في المنظومة': 'Contribution au système',
  'التزاماتنا الميدانية': 'Nos engagements sur le terrain',
  'قيمنا، مترجمة إلى ممارسات حقيقية.': 'Nos valeurs, traduites en pratiques concrètes.',
  'التعريف بالمزرعة والمشروع': 'La ferme et le projet',
  'منهجية حية، لا مجرد شعبة فلاحية.': 'Une méthode vivante, pas une simple exploitation agricole.',
  'من نحن': 'Qui sommes-nous ?',
  'فينيريا، شمال تونس.': 'Vineria, dans le nord de la Tunisie.',
  'النموذج البيئي': 'Le modèle écologique',
  'الورشة الفلاحية': 'Atelier agricole',
  'ما تنتجه': 'Ce qu’il produit',
  'ما تقدمه للمنظومة الحية': 'Sa contribution au système vivant',
  'معلومات التواصل المباشر': 'Coordonnées directes',
  'مزرعة فينيريا': 'Ferme Vineria',
  'العنوان والموقع': 'Adresse et localisation',
  'الهاتف': 'Téléphone',
  'البريد الإلكتروني': 'E-mail',
  'أوقات العمل والاستقبال': 'Horaires et accueil',
  'روابط سريعة': 'Liens rapides',
  'الفضاء الخاص': 'Espace privé',
  'تسجيل الدخول': 'Connexion',
  'البريد الإلكتروني *': 'E-mail *',
  'كلمة المرور *': 'Mot de passe *',
  'فتح جلستي': 'Ouvrir ma session',
  'إنشاء حساب جديد': 'Créer un compte',
  'إنشاء حساب': 'Créer un compte',
  'مرحباً بك في فينيريا': 'Bienvenue chez Vineria',
  'الاسم الكامل *': 'Nom complet *',
  'إنشاء حسابي': 'Créer mon compte',
  'العودة إلى تسجيل الدخول': 'Retour à la connexion',
  'زراعة مستدامة · شمال تونس': 'Agriculture durable · Nord de la Tunisie',
  'مزرعة نموذجية متكاملة تدار بالنظام الجاف، دون مدخلات كيميائية. بساتين لوز وزيتون ومزارع إكليل جبل ومناحل ضمن منظومة حية متكاملة تغذي بعضها البعض.': 'Ferme modèle intégrée conduite en agriculture sèche, sans intrants chimiques. Amandiers, oliviers, romarin et ruchers forment un écosystème vivant et complémentaire.',
  '100% نظام جاف': '100 % en conduite sèche',
  'صفر مدخلات كيميائية': 'Zéro intrant chimique',
  'تتبع دقيق للمصدر': 'Traçabilité précise de l’origine',
  'مساواة في الأجر': 'Égalité salariale',
  'التنقل السريع': 'Navigation rapide',
  'محاصيلنا ومنتجاتنا': 'Nos récoltes et produits',
  'الزيوت العطرية النقية': 'Huiles essentielles pures',
  'العسل ومنتجات النحل': 'Miel et produits de la ruche',
  'لوز أصيل بالزراعة الجافة': 'Amandes du terroir en conduite sèche',
  'زيت زيتون بكر ممتاز': 'Huile d’olive vierge extra',
  'طلبيات مهنية B2B': 'Commandes professionnelles B2B',
  'موقعنا والتواصل': 'Nous trouver et nous contacter',
  'ضيعة فينيريا': 'Ferme Vineria',
  'شمال تونس': 'Nord de la Tunisie',
  'مراسلة فينيريا': 'Écrire à Vineria',
  'الإنتاج في النظام الجاف. ونقل ما أثبت نجاحه ميدانياً.': 'Produire en conduite sèche. Transmettre ce qui a fait ses preuves sur le terrain.',
  'مشاهدة': 'Voir',
  'اكتشف المزيد': 'Découvrir',
  'د.ت': 'TND',
  'لنتحدث عن المزرعة ومشاريعها.': 'Parlons de la ferme et de ses projets.',
  'موزعاً، جهة مانحة، باحثاً، متعلماً أو مهتماً — نسعد بالإجابة عن استفساراتك بكل عناية خلال يومي عمل.': 'Distributeur, bailleur, chercheur, apprenant ou simplement intéressé, nous répondons avec attention sous deux jours ouvrés.',
  'نبحث عن شركاء فاعلين في مجالات:': 'Nous recherchons des partenaires engagés dans :',
  'منتجاتنا والكتالوج': 'Nos produits et le catalogue',
  'خدماتنا وأكاديمية فينيريا': 'Nos services et l’Académie Vineria',
  'منهجيتنا في الزراعة المعمرة': 'Notre méthode en permaculture',
  'أرسل لنا رسالة': 'Envoyez-nous un message',
  'الرد خلال 48 ساعة عمل. جميع الحقول التي تحمل علامة * إجبارية.': 'Réponse sous 48 heures ouvrées. Tous les champs marqués * sont obligatoires.',
  'تعذر إرسال الرسالة في الوقت الحالي. يرجى المحاولة مجدداً أو مراسلتنا مباشرة عبر البريد الإلكتروني.': 'Impossible d’envoyer le message pour le moment. Réessayez ou contactez-nous directement par e-mail.',
};

const ORIGINAL_TEXT = new WeakMap<Text, string>();

function localizeStaticText(language: Language) {
  const nodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = nodes.nextNode())) textNodes.push(node as Text);
  textNodes.forEach((textNode) => {
    const parent = textNode.parentElement;
    if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'INPUT', 'TEXTAREA'].includes(parent.tagName)) return;
    const original = ORIGINAL_TEXT.get(textNode) ?? textNode.nodeValue ?? '';
    ORIGINAL_TEXT.set(textNode, original);
    const value = original.trim();
    const translated = language === 'fr' ? FRENCH_PAGE_TEXT[value] : undefined;
    const nextValue = translated ? original.replace(value, translated) : original;
    if (textNode.nodeValue !== nextValue) textNode.nodeValue = nextValue;
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
    localizeStaticText(language);
    const observer = new MutationObserver(() => localizeStaticText(language));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage: setLanguageState,
    toggleLanguage: () => setLanguageState((current) => current === 'fr' ? 'ar' : 'fr'),
    isArabic: language === 'ar',
    t: (key) => language === 'ar' ? ARABIC_TRANSLATIONS[key] : TRANSLATIONS[key],
    localizeProduct: (product) => language === 'ar' ? { ...product, ...ARABIC_PRODUCTS[product.slug] } : { ...product, ...FRENCH_PRODUCTS[product.slug] },
    localizeService: (service) => language === 'ar' ? { ...service, ...ARABIC_SERVICES[service.slug] } : { ...service, ...FRENCH_SERVICES[service.slug] },
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
