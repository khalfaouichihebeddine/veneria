import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, Leaf } from 'lucide-react';
import { api } from '@/api';
import { ProductCard } from '@/components/product-card';
import { ServiceCard } from '@/components/service-card';
import {
  PERMACULTURE_WORKSHOPS,
  VALUE_PILLARS,
  IMPACT_METRICS,
  PARTNERSHIP_TRACKS,
  VINERIA_PRODUCTS,
  VINERIA_SERVICES,
} from '@/lib/vineria-data';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: '/fr', ar: '/ar' },
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });
  const content = await getTranslations({ locale, namespace: 'content' });
  const tx = (key: string, fallback: string) => (content.has(key) ? content(key) : fallback);

  let products: Awaited<ReturnType<typeof api.getProducts>>;
  let services: Awaited<ReturnType<typeof api.getServices>>;
  try {
    [products, services] = await Promise.all([api.getProducts(), api.getServices()]);
    if (!products.length) products = VINERIA_PRODUCTS as typeof products;
    if (!services.length) services = VINERIA_SERVICES as typeof services;
  } catch {
    products = VINERIA_PRODUCTS as typeof products;
    services = VINERIA_SERVICES as typeof services;
  }

  const featuredProducts = products.slice(0, 3);
  const featuredServices = services.slice(0, 3);

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: 'min(92vh, 780px)',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/hero-farm.jpg"
            alt={t('hero.imageAlt')}
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(14,26,16,0.95) 0%, rgba(14,26,16,0.52) 55%, rgba(14,26,16,0.12) 100%)',
            }}
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: 'clamp(56px, 8vh, 96px)', paddingTop: 120 }}>
          <div style={{ maxWidth: 760 }}>
            <span className="eyebrow animate-fade-up" style={{ color: '#f1c98d', marginBottom: 20, display: 'inline-block' }}>
              {t('hero.eyebrow')}
            </span>

            <h1
              className="display animate-fade-up animate-delay-1"
              style={{ color: '#fff', margin: '20px 0 28px', maxWidth: 720, textShadow: '0 2px 24px rgba(0,0,0,0.3)' }}
            >
              {t('hero.headline')}
            </h1>

            <p
              className="animate-fade-up animate-delay-2"
              style={{ fontSize: 18, lineHeight: 1.75, color: 'rgba(255,255,255,0.82)', maxWidth: 580, marginBottom: 38 }}
            >
              {t('hero.body')}
            </p>

            <div className="animate-fade-up animate-delay-2" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
              {(['dry', 'noChemical', 'traceability', 'parity'] as const).map((key) => (
                <span
                  key={key}
                  style={{
                    background: 'rgba(255,255,255,0.13)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: 100,
                    padding: '6px 14px',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.88)',
                    backdropFilter: 'blur(8px)',
                    letterSpacing: '0.03em',
                  }}
                >
                  {t(`hero.badges.${key}`)}
                </span>
              ))}
            </div>

            <div className="animate-fade-up animate-delay-3 hero-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link href="/produits" className="btn btn--ochre" id="hero-cta-produits">
                {t('hero.ctaProducts')} <ArrowUpRight size={16} />
              </Link>
              <Link href="/a-propos" className="btn btn--ghost" id="hero-cta-methode">
                {t('hero.ctaAbout')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LE PRINCIPE */}
      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
            <span className="eyebrow">{t('model.eyebrow')}</span>
            <div className="accent-line" style={{ display: 'block', margin: '14px auto' }} />
            <h2 className="display--md serif" style={{ margin: '0 0 18px' }}>
              {t('model.headline')}
            </h2>
            <p className="lead">{t('model.body')}</p>
          </div>

          <div className="grid-responsive-3" style={{ gap: 18, marginBottom: 48 }}>
            {PERMACULTURE_WORKSHOPS.map((workshop) => (
              <div
                key={workshop.id}
                className="card circularity-card"
                style={{ padding: 26, border: '1.5px solid var(--line-light)' }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'linear-gradient(140deg, var(--green-pale), var(--linen))',
                    border: '1.5px solid var(--green-pale)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                    fontSize: 22,
                  }}
                >
                  {workshop.id === 'amandiers' ? '🌸' :
                   workshop.id === 'oliviers' ? '🫒' :
                   workshop.id === 'romarin' ? '🌿' :
                   workshop.id === 'ruches' ? '🍯' : '🌱'}
                </div>
                <span className="eyebrow eyebrow--green" style={{ fontSize: 10 }}>{tx(`workshops.${workshop.id}.name`, workshop.name)}</span>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: '10px 0 8px', fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {tx(`workshops.${workshop.id}.produces`, workshop.produces)}
                </h3>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 14px' }}>
                  {tx(`workshops.${workshop.id}.details`, workshop.details)}
                </p>
                <div style={{ padding: '12px 14px', background: 'var(--green-pale)', borderRadius: 8, border: '1px solid rgba(42,82,54,0.10)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--green)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5 }}>
                    {t('model.systemContrib')}
                  </div>
                  <p style={{ fontSize: 12.5, color: 'var(--green-deep)', lineHeight: 1.55, margin: 0 }}>
                    {tx(`workshops.${workshop.id}.bringsToSystem`, workshop.bringsToSystem)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="card--forest grid-responsive-2"
            style={{
              borderRadius: 16,
              padding: 'clamp(28px, 5vw, 52px)',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="eyebrow" style={{ color: '#f1c98d', marginBottom: 12, display: 'block' }}>{t('model.circular.eyebrow')}</span>
              <h2 className="display--md serif" style={{ color: '#fff', margin: '0 0 18px', fontSize: 'clamp(22px, 3vw, 38px)' }}>
                {t('model.circular.headline')}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, fontSize: 15 }}>
                {t('model.circular.body')}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {(['1', '2', '3', '4'] as const).map((key) => (
                <div key={key} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} style={{ color: '#86efac', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.80)', lineHeight: 1.55 }}>{t(`model.circular.items.${key}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NOS PRODUITS */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            <div>
              <span className="eyebrow">{t('products.eyebrow')}</span>
              <div className="accent-line" style={{ display: 'block', marginTop: 12 }} />
              <h2 className="display--md serif" style={{ margin: '10px 0 10px' }}>{t('products.headline')}</h2>
              <p style={{ color: 'var(--muted)', maxWidth: 480, lineHeight: 1.7, fontSize: 15 }}>
                {t('products.body')}
              </p>
            </div>
            <Link href="/produits" className="btn btn--secondary" id="home-see-all-products">
              {t('products.seeAll')} <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="section" style={{ background: 'linear-gradient(160deg, #f0ebe0 0%, var(--cream) 100%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 52px' }}>
            <span className="eyebrow">{t('values.eyebrow')}</span>
            <div className="accent-line" style={{ display: 'block', margin: '14px auto' }} />
            <h2 className="display--md serif" style={{ margin: 0 }}>
              {t('values.headline')}
            </h2>
          </div>

          <div className="grid-3" style={{ gap: 18 }}>
            {VALUE_PILLARS.map((pillar, i) => (
              <div
                key={pillar.id}
                className="card"
                style={{ padding: 26, border: '1.5px solid var(--line-light)', position: 'relative', overflow: 'hidden' }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0, right: 0,
                    width: 80, height: 80,
                    background: i % 2 === 0 ? 'var(--green-pale)' : 'var(--amber-pale)',
                    borderRadius: '0 0 0 100%',
                    opacity: 0.5,
                  }}
                />
                <span className="eyebrow eyebrow--green" style={{ fontSize: 10 }}>0{i + 1}</span>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: '12px 0 6px', fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {tx(`values.${pillar.id}.title`, pillar.title)}
                </h3>
                <p style={{ fontSize: 12.5, color: 'var(--ochre)', fontWeight: 600, margin: '0 0 12px' }}>{tx(`values.${pillar.id}.subtitle`, pillar.subtitle)}</p>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 16px' }}>
                  {tx(`values.${pillar.id}.description`, pillar.description).slice(0, 160)}…
                </p>
                {pillar.statBadge && (
                  <span className="badge badge--green">
                    <Leaf size={11} /> {tx(`values.${pillar.id}.statBadge`, pillar.statBadge)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            <div>
              <span className="eyebrow">{t('services.eyebrow')}</span>
              <div className="accent-line" style={{ display: 'block', marginTop: 12 }} />
              <h2 className="display--md serif" style={{ margin: '10px 0 10px' }}>{t('services.headline')}</h2>
              <p style={{ color: 'var(--muted)', maxWidth: 520, lineHeight: 1.7, fontSize: 15 }}>
                {t('services.body')}
              </p>
            </div>
            <Link href="/services" className="btn btn--secondary" id="home-see-all-services">
              {t('services.seeAll')} <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid-3">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT METRICS */}
      <section
        className="section"
        style={{
          background: 'linear-gradient(140deg, var(--green-deep) 0%, #1e4a2a 100%)',
          color: '#fff',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 56px' }}>
            <span className="eyebrow" style={{ color: '#f1c98d' }}>{t('impact.eyebrow')}</span>
            <div style={{ width: 40, height: 3, background: 'rgba(241,201,141,0.5)', borderRadius: 2, margin: '14px auto' }} />
            <h2 className="display--md serif" style={{ color: '#fff', margin: '0 0 16px' }}>
              {t('impact.headline')}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontSize: 15 }}>
              {t('impact.body')}
            </p>
          </div>

          <div className="grid-3" style={{ gap: 20 }}>
            {IMPACT_METRICS.map((metric) => (
              <div
                key={metric.id}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 14,
                  padding: '28px 26px',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  className="stat-number"
                  style={{ color: metric.status === 'campagne-2025-2026' ? '#f1c98d' : '#86efac' }}
                >
                  {metric.value}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '2px 0 10px' }}>
                  {tx(`impact.${metric.id}.unit`, metric.unit)}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: '0 0 6px', lineHeight: 1.4 }}>{tx(`impact.${metric.id}.label`, metric.label)}</div>
                <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: '0 0 14px' }}>{tx(`impact.${metric.id}.sublabel`, metric.sublabel)}</p>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: 100,
                    background: metric.status === 'verifie' ? 'rgba(134,239,172,0.18)' : 'rgba(241,201,141,0.18)',
                    color: metric.status === 'verifie' ? '#86efac' : '#f1c98d',
                    border: `1px solid ${metric.status === 'verifie' ? 'rgba(134,239,172,0.3)' : 'rgba(241,201,141,0.3)'}`,
                  }}
                >
                  {metric.status === 'verifie' ? t('impact.verified') : t('impact.campaign')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTENARIATS */}
      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 52px' }}>
            <span className="eyebrow">{t('partnerships.eyebrow')}</span>
            <div className="accent-line" style={{ display: 'block', margin: '14px auto' }} />
            <h2 className="display--md serif" style={{ margin: '0 0 16px' }}>{t('partnerships.headline')}</h2>
            <p className="lead">{t('partnerships.body')}</p>
          </div>

          <div className="grid-3" style={{ gap: 22 }}>
            {PARTNERSHIP_TRACKS.map((track, i) => (
              <div
                key={track.id}
                className="card"
                style={{
                  padding: 30,
                  border: '1.5px solid var(--line-light)',
                  borderTop: `4px solid ${i === 0 ? 'var(--ochre)' : i === 1 ? 'var(--green)' : 'var(--green-mid)'}`,
                }}
              >
                <span
                  className="badge badge--ochre"
                  style={{
                    marginBottom: 16,
                    background: i === 0 ? 'var(--amber-pale)' : 'var(--green-pale)',
                    color: i === 0 ? 'var(--ochre-warm)' : 'var(--green)',
                    border: `1px solid ${i === 0 ? 'rgba(185,117,45,0.18)' : 'rgba(42,82,54,0.14)'}`,
                  }}
                >
                  {tx(`partnerships.${track.id}.tag`, track.tag)}
                </span>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: '0 0 8px', fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.35 }}>
                  {tx(`partnerships.${track.id}.title`, track.title)}
                </h3>
                <p style={{ fontSize: 12, color: 'var(--ochre)', fontWeight: 600, margin: '0 0 14px' }}>
                  {tx(`partnerships.${track.id}.target`, track.target)}
                </p>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 22px' }}>
                  {tx(`partnerships.${track.id}.description`, track.description)}
                </p>
                <Link
                  href="/contact"
                  className="btn btn--secondary btn--sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                  id={`partner-cta-${track.id}`}
                >
                  {tx(`partnerships.${track.id}.actionLabel`, track.actionLabel)} <ArrowUpRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMY CTA */}
      <section style={{ padding: '0 0 96px' }}>
        <div className="container">
          <div
            className="grid-responsive-2"
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              position: 'relative',
              gap: 0,
            }}
          >
            <div style={{ position: 'relative', minHeight: 320 }}>
              <Image
                src="/images/academy.jpg"
                alt={t('academy.imageAlt')}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div
              style={{
                background: 'linear-gradient(135deg, var(--green-deep) 0%, #1e4a2a 100%)',
                padding: 'clamp(32px, 5vw, 56px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <span className="eyebrow" style={{ color: '#f1c98d', marginBottom: 12, display: 'inline-block' }}>
                {t('academy.eyebrow')}
              </span>
              <h2
                className="display--md serif"
                style={{ color: '#fff', margin: '0 0 18px', fontSize: 'clamp(22px, 3vw, 38px)' }}
              >
                {t('academy.headline')}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, lineHeight: 1.75, margin: '0 0 30px' }}>
                {t('academy.body')}
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/services" className="btn btn--ochre" id="academy-cta">
                  {t('academy.ctaModules')} <ArrowUpRight size={15} />
                </Link>
                <Link href="/contact" className="btn btn--ghost" id="academy-contact">
                  {t('academy.ctaRegister')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 800px) {
          section > .container > div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        .card:hover img { transform: scale(1.06); }
      `}</style>
    </main>
  );
}
