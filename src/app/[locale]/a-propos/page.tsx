import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import { VALUE_PILLARS, PERMACULTURE_WORKSHOPS } from '@/lib/vineria-data';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutUs.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      languages: { fr: '/fr/a-propos', ar: '/ar/a-propos' },
    },
  };
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'aboutUs' });
  const content = await getTranslations({ locale, namespace: 'content' });
  const tx = (key: string, fallback: string) => (content.has(key) ? content(key) : fallback);

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          background: 'linear-gradient(160deg, var(--green-deep) 0%, #2a5236 60%, #3a6b47 100%)',
          padding: 'clamp(80px, 12vh, 120px) 0 clamp(60px, 8vh, 96px)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: '30%', width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 820 }}>
            <span className="eyebrow animate-fade-up" style={{ color: '#f1c98d', display: 'block', marginBottom: 20 }}>
              {t('hero.eyebrow')}
            </span>
            <h1
              className="display animate-fade-up animate-delay-1"
              style={{ color: '#fff', margin: '0 0 28px', textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}
            >
              {t('hero.headline')}
            </h1>
            <p
              className="animate-fade-up animate-delay-2"
              style={{ fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.78)', maxWidth: 640, marginBottom: 38 }}
            >
                {t('hero.summary')}
            </p>
            <div className="animate-fade-up animate-delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href={`/${locale}/produits`} className="btn btn--ochre" id="about-hero-produits">
                {t('hero.ctaProducts')} <ArrowUpRight size={15} />
              </Link>
              <Link href={`/${locale}/contact`} className="btn btn--ghost" id="about-hero-contact">
                {t('hero.ctaContact')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUI NOUS SOMMES */}
      <section className="section">
        <div className="container">
          <div
            className="grid-responsive-2"
            style={{
              gap: 'clamp(32px, 6vw, 72px)',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="eyebrow">{t('intro.eyebrow')}</span>
              <div className="accent-line" style={{ display: 'block', marginTop: 12 }} />
              <h2 className="display--md serif" style={{ margin: '16px 0 22px' }}>
                {t('intro.title')}
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 20 }}>
                {t('intro.p1')} <strong style={{ color: 'var(--ink)' }}>{t('intro.p1Strong')}</strong> {t('intro.p1Tail')}
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 20 }}>
                {t('intro.p2')} <strong style={{ color: 'var(--ink)' }}>{t('intro.p2Strong')}</strong>{t('intro.p2Tail')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
                {[
                  t('intro.facts.one'), t('intro.facts.two'), t('intro.facts.three'), t('intro.facts.four'),
                ].map((fact) => (
                  <div key={fact} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--green)', flexShrink: 0 }} />
                    <span style={{ fontSize: 14.5, color: 'var(--ink-soft)', fontWeight: 500 }}>{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3' }}>
              <Image
                src="/images/hero-farm.jpg"
                alt={t('intro.imageAlt')}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 20,
                  left: 20,
                  right: 20,
                  background: 'rgba(14,26,16,0.85)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 10,
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                {[['32 ha', t('intro.stats.permaculture')], ['75 ruches', t('intro.stats.production')], ['2022', t('intro.stats.founded')]].map(([val, label]) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: 18, fontFamily: "'Playfair Display', Georgia, serif" }}>{val}</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LE MODÈLE CIRCULAIRE */}
      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 48px' }}>
            <span className="eyebrow">{t('circular.eyebrow')}</span>
            <div className="accent-line" style={{ display: 'block', margin: '14px auto' }} />
            <h2 className="display--md serif" style={{ margin: '0 0 16px' }}>
              {t('circular.headline')}
            </h2>
            <p className="lead">
              {t('circular.lead')}
            </p>
          </div>

          <div className="card" style={{ overflow: 'auto', padding: 0 }}>
            <table className="feature-table">
              <thead>
                <tr>
                  <th>{t('circular.workshop')}</th>
                  <th>{t('circular.produces')}</th>
                  <th>{t('systemContrib')}</th>
                </tr>
              </thead>
              <tbody>
                {PERMACULTURE_WORKSHOPS.map((w) => (
                  <tr key={w.id}>
                    <td style={{ fontWeight: 600, color: 'var(--ink)', minWidth: 140 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 20 }}>
                          {w.id === 'amandiers' ? '🌸' : w.id === 'oliviers' ? '🫒' : w.id === 'romarin' ? '🌿' : w.id === 'ruches' ? '🍯' : '🌱'}
                        </span>
                        {tx(`workshops.${w.id}.name`, w.name)}
                      </div>
                    </td>
                    <td style={{ color: 'var(--ink-soft)' }}>{tx(`workshops.${w.id}.produces`, w.produces)}</td>
                    <td style={{ color: 'var(--muted)' }}>{tx(`workshops.${w.id}.bringsToSystem`, w.bringsToSystem)}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ fontWeight: 600, color: 'var(--ink)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 20 }}>♻️</span>
                      {t('circular.soil')}
                    </div>
                  </td>
                  <td style={{ color: 'var(--ink-soft)' }}>{t('circular.soilProduces')}</td>
                  <td style={{ color: 'var(--muted)' }}>{t('circular.soilSystem')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            style={{
              marginTop: 24,
              padding: '18px 22px',
              background: 'var(--green-pale)',
              border: '1px solid rgba(42,82,54,0.12)',
              borderRadius: 10,
              fontSize: 14,
              color: 'var(--green-deep)',
              lineHeight: 1.65,
              fontStyle: 'italic',
            }}
          >
            {t('circular.callout')}
          </div>
        </div>
      </section>

      {/* NOS VALEURS */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 52px' }}>
            <span className="eyebrow">{t('values.eyebrow')}</span>
            <div className="accent-line" style={{ display: 'block', margin: '14px auto' }} />
            <h2 className="display--md serif" style={{ margin: '0 0 16px' }}>
              {t('values.headline')}
            </h2>
            <p className="lead">{t('values.lead')}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {VALUE_PILLARS.map((pillar, i) => (
              <div
                key={pillar.id}
                className="card grid-responsive-split"
                style={{
                  padding: 'clamp(24px, 4vw, 40px)',
                  alignItems: 'start',
                  border: '1.5px solid var(--line-light)',
                }}
              >
                <div>
                  <span className="eyebrow eyebrow--green" style={{ fontSize: 10, display: 'block', marginBottom: 10 }}>
                    {t('values.label')} 0{i + 1} / {VALUE_PILLARS.length.toString().padStart(2, '0')}
                  </span>
                  <h3 className="display--md serif" style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', margin: '0 0 8px', color: 'var(--ink)' }}>
                    {tx(`values.${pillar.id}.title`, pillar.title)}
                  </h3>
                  <p style={{ fontSize: 13.5, color: 'var(--ochre)', fontWeight: 600, margin: '0 0 16px' }}>{tx(`values.${pillar.id}.subtitle`, pillar.subtitle)}</p>
                  {pillar.statBadge && (
                    <span className="badge badge--green" style={{ fontSize: 11 }}>{tx(`values.${pillar.id}.statBadge`, pillar.statBadge)}</span>
                  )}
                </div>

                <div>
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, margin: '0 0 22px' }}>
                    {tx(`values.${pillar.id}.description`, pillar.description)}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {pillar.concretePractice.map((practice, i) => (
                      <div key={practice} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <CheckCircle2 size={15} style={{ color: 'var(--green)', flexShrink: 0, marginTop: 3 }} />
                        <span style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{tx(`values.${pillar.id}.practices.${i}`, practice)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMY */}
      <section className="section" style={{ background: 'var(--paper)' }}>
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
              <h2 className="display--md serif" style={{ margin: '16px 0 20px', fontSize: 'clamp(22px, 3vw, 36px)' }}>
                {t('academy.headline')}
              </h2>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>
                {t('academy.p1')}
              </p>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 28 }}>
                <strong style={{ color: 'var(--ink)' }}>{t('academy.public')}</strong> {t('academy.publicText')}
              </p>
              <Link href={`/${locale}/services`} className="btn btn--primary" id="about-academy-cta">
                {t('academy.cta')} <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA CONTACT */}
      <section
        style={{
          background: 'linear-gradient(140deg, var(--green-deep) 0%, #1e4a2a 100%)',
          padding: 'clamp(56px, 8vh, 96px) 0',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <div className="container--narrow">
          <span className="eyebrow" style={{ color: '#f1c98d', display: 'block', marginBottom: 18 }}>{t('cta.eyebrow')}</span>
          <h2 className="display--md serif" style={{ color: '#fff', margin: '0 0 20px' }}>
            {t('cta.headline')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.70)', fontSize: 16, lineHeight: 1.75, maxWidth: 520, margin: '0 auto 36px' }}>
            {t('cta.body')}
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/${locale}/contact`} className="btn btn--ochre" id="about-contact-cta">
              {t('cta.contact')} <ArrowUpRight size={15} />
            </Link>
            <Link href={`/${locale}/produits`} className="btn btn--ghost" id="about-products-cta">
              {t('cta.products')}
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 800px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
