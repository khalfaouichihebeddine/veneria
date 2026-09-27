import { ArrowUpRight } from 'lucide-react';
import { api } from '@/api';
import { ProductCard } from '@/components/product-card';
import { VINERIA_PRODUCTS } from '@/lib/vineria-data';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      languages: { fr: '/fr/produits', ar: '/ar/produits' },
    },
  };
}

export default async function Products({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products' });

  let products: Awaited<ReturnType<typeof api.getProducts>>;
  try {
    products = await api.getProducts();
    if (!products.length) products = VINERIA_PRODUCTS as typeof products;
  } catch {
    products = VINERIA_PRODUCTS as typeof products;
  }

  const categories = [
    { id: 'all', key: 'all' as const },
    { id: 'huiles-essentielles', key: 'essentialOils' as const },
    { id: 'ruche', key: 'honey' as const },
    { id: 'amandes', key: 'almonds' as const },
    { id: 'huile-olive', key: 'oliveOil' as const },
  ];

  const traceItems = ['origin', 'date', 'analysis', 'packaging'] as const;

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(160deg, var(--green-deep) 0%, #2a5236 100%)',
          padding: 'clamp(72px, 10vh, 108px) 0 clamp(52px, 6vh, 80px)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="eyebrow" style={{ color: '#f1c98d', display: 'block', marginBottom: 16 }}>
            {t('hero.eyebrow')}
          </span>
          <h1 className="display" style={{ color: '#fff', margin: '0 0 22px', maxWidth: 720 }}>
            {t('hero.headline')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.75, maxWidth: 560, marginBottom: 32 }}>
            {t('hero.body')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {(['traceability', 'packaging', 'noChemical', 'export'] as const).map((key) => (
              <span
                key={key}
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.20)',
                  borderRadius: 100,
                  padding: '6px 14px',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                {t(`hero.badges.${key}`)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Banner */}
      <div style={{ background: 'var(--amber-pale)', borderBottom: '1px solid rgba(185,117,45,0.16)' }}>
        <div
          className="container"
          style={{
            padding: '14px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontSize: 14, color: 'var(--ochre-warm)', fontWeight: 500 }}>
            {t('b2bBanner.text')} <strong>{t('b2bBanner.strong')}</strong>
          </p>
          <Link href="/contact" className="btn btn--ochre btn--sm" id="catalog-b2b-cta">
            {t('b2bBanner.cta')} <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Categories + Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
            {categories.map((cat) => (
              <button key={cat.id} className="category-pill active" type="button" id={`filter-${cat.id}`}>
                {t(`categories.${cat.key}`)}
              </button>
            ))}
          </div>

          {products.length > 0 ? (
            <div className="grid-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 0',
                color: 'var(--muted)',
              }}
            >
              <p style={{ fontSize: 18 }}>{t('empty')}</p>
              <Link href="/contact" className="btn btn--primary" style={{ marginTop: 24, display: 'inline-flex' }}>
                {t('emptyContact')}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Traceability */}
      <section style={{ background: 'var(--paper)', padding: '64px 0' }}>
        <div className="container">
          <div className="grid-4">
            {traceItems.map((key) => (
              <div key={key} style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{t(`traceability.${key}.icon`)}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)', marginBottom: 8 }}>{t(`traceability.${key}.title`)}</div>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6 }}>{t(`traceability.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
