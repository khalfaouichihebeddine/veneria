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
  tunisianDinar: 'د.ت',
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
    document.documentElement.dir = 'ltr';
    document.body.dataset.language = language;
    window.localStorage.setItem('vineria-language', language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage: setLanguageState,
    toggleLanguage: () => setLanguageState((current) => current === 'fr' ? 'ar' : 'fr'),
    isArabic: language === 'ar',
    t: (key) => language === 'ar' ? ARABIC_TRANSLATIONS[key] : TRANSLATIONS[key],
    localizeProduct: (product) => language === 'ar' ? { ...product, ...ARABIC_PRODUCTS[product.slug] } : product,
    localizeService: (service) => language === 'ar' ? { ...service, ...ARABIC_SERVICES[service.slug] } : service,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
