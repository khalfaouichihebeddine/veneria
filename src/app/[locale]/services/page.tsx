import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { api } from '@/api';
import { ServiceCard } from '@/components/service-card';
import { VINERIA_SERVICES } from '@/lib/vineria-data';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      languages: { fr: '/fr/services', ar: '/ar/services' },
    },
  };
}

export default async function Services({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'services' });

  let services: Awaited<ReturnType<typeof api.getServices>>;
  try {
    services = await api.getServices();
    if (!services.length) services = VINERIA_SERVICES as typeof services;
  } catch {
    services = VINERIA_SERVICES as typeof services;
  }

  const modules = ['1', '2', '3', '4', '5', '6'] as const;

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(160deg, #1b3b22 0%, var(--green) 60%, var(--green-mid) 100%)',
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
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.75, maxWidth: 600, marginBottom: 32 }}>
            {t('hero.body')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {(['sessions', 'groups', 'followup', 'grants'] as const).map((key) => (
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

      {/* Services grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            <div>
              <span className="eyebrow">{t('grid.eyebrow')}</span>
              <div className="accent-line" style={{ display: 'block', marginTop: 12 }} />
              <h2 className="display--md serif" style={{ margin: '10px 0 0' }}>{t('grid.headline')}</h2>
            </div>
            <Link href="/contact" className="btn btn--primary" id="services-contact-cta">
              {t('grid.contactCta')} <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Academy callout */}
      <section style={{ background: 'var(--paper)', padding: '72px 0' }}>
        <div className="container">
          <div
            className="grid-responsive-2"
            style={{
              gap: 'clamp(32px, 6vw, 72px)',
              alignItems: 'center',
            }}
          >
            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3' }}>
              <Image
                src="/images/academy.jpg"
                alt={t('academy.imageAlt')}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div>
              <span className="eyebrow">{t('academy.eyebrow')}</span>
              <div className="accent-line" style={{ display: 'block', marginTop: 12 }} />
              <h2 className="display--md serif" style={{ margin: '16px 0 18px', fontSize: 'clamp(22px, 3vw, 36px)' }}>
                {t('academy.headline')}
              </h2>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 22 }}>
                {t('academy.body')}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
                {modules.map((num) => (
                  <div key={num} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: 'var(--ink-soft)' }}>{t(`academy.modules.${num}`)}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: 'var(--green-pale)',
                  border: '1px solid rgba(42,82,54,0.12)',
                  borderRadius: 10,
                  padding: '14px 18px',
                  marginBottom: 24,
                  fontSize: 14,
                  color: 'var(--green-deep)',
                  lineHeight: 1.65,
                }}
              >
                <strong>{t('academy.publicLabel')}</strong> {t('academy.publicNote')}
              </div>

              <Link href="/contact" className="btn btn--primary" id="academy-register-cta">
                {t('academy.registerCta')} <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Parrainage CTA */}
      <section
        style={{
          background: 'linear-gradient(140deg, var(--green-deep) 0%, #1e4a2a 100%)',
          padding: 'clamp(56px, 8vh, 96px) 0',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <div className="container--narrow">
          <span style={{ fontSize: 48, display: 'block', marginBottom: 20 }}>🌳</span>
          <span className="eyebrow" style={{ color: '#f1c98d', display: 'block', marginBottom: 16 }}>{t('parrainage.eyebrow')}</span>
          <h2 className="display--md serif" style={{ color: '#fff', margin: '0 0 18px', fontSize: 'clamp(22px, 3vw, 38px)' }}>
            {t('parrainage.headline')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.70)', fontSize: 16, lineHeight: 1.75, maxWidth: 520, margin: '0 auto 36px' }}>
            {t('parrainage.body')}
          </p>
          <Link href="/contact" className="btn btn--ochre" id="parrainage-cta">
            {t('parrainage.cta')} <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
