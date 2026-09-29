import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock, Users } from 'lucide-react';
import { api } from '@/api';
import { VINERIA_SERVICES } from '@/lib/vineria-data';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'serviceDetail' });
  const catalog = await getTranslations({ locale, namespace: 'catalog' });
  const service = VINERIA_SERVICES.find((s) => s.slug === slug);
  const name = service && catalog.has(`services.${slug}.name`) ? catalog(`services.${slug}.name`) : service?.name;
  const description = service && catalog.has(`services.${slug}.description`) ? catalog(`services.${slug}.description`) : service?.description;
  return {
    title: name ? `${name} | VINERIA` : t('metaFallback'),
    description: description?.slice(0, 160),
    alternates: {
      languages: {
        fr: `/fr/services/${slug}`,
        ar: `/ar/services/${slug}`,
      },
    },
  };
}

export default async function ServiceDetail({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'serviceDetail' });
  const catalog = await getTranslations({ locale, namespace: 'catalog' });
  const text = (field: string, fallback: string) => {
    const key = `services.${slug}.${field}`;
    return catalog.has(key) ? catalog(key) : locale === 'ar' ? `[AR] ${fallback}` : fallback;
  };

  let service: Awaited<ReturnType<typeof api.getService>>;
  try {
    service = await api.getService(slug);
  } catch {
    service = undefined;
  }
  if (!service) {
    const found = VINERIA_SERVICES.find((s) => s.slug === slug);
    if (!found) notFound();
    service = found as unknown as typeof service;
  }
  if (!service) notFound();

  const priceLabel =
    service.priceFrom === 0
      ? t('priceFree')
      : `${t('priceFrom')} ${service.priceFrom} ${text('currency', service.currency ?? 'TND')}`;

  const hasImage = service.imageUrl;

  const getCategoryLabel = (cat: string | undefined) => {
    if (!cat) return '';
    const map: Record<string, string> = {
      academie: t('categories.academie'),
      technique: t('categories.technique'),
      distillation: t('categories.distillation'),
      visite: t('categories.visite'),
      parrainage: t('categories.parrainage'),
    };
    return map[cat] ?? cat;
  };

  return (
    <main>
      {/* Breadcrumb */}
      <section style={{ background: 'var(--paper)', padding: '22px 0', borderBottom: '1px solid var(--line-light)' }}>
        <div className="container">
          <Link
            href={`/${locale}/services`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--muted)',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            <ArrowLeft size={15} /> {t('back')}
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(160deg, var(--green-deep) 0%, var(--green) 100%)',
          padding: 'clamp(56px, 8vh, 96px) 0 clamp(40px, 6vh, 72px)',
          color: '#fff',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            {service.category && (
              <span className="eyebrow" style={{ color: '#f1c98d', display: 'block', marginBottom: 16 }}>
                {getCategoryLabel(service.category)}
              </span>
            )}
            <h1
              className="display--md serif"
              style={{ color: '#fff', margin: '0 0 18px', fontSize: 'clamp(26px, 4vw, 50px)' }}
            >
              {text('name', service.name)}
            </h1>
            {service.tagline && (
              <p style={{ color: '#f1c98d', fontWeight: 600, fontSize: 15, margin: '0 0 18px' }}>
                {text('tagline', service.tagline)}
              </p>
            )}
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, lineHeight: 1.8, margin: '0 0 28px' }}>
              {text('description', service.description)}
            </p>

            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Clock size={15} style={{ color: '#f1c98d' }} />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.78)' }}>{text('duration', service.duration)}</span>
              </div>
              {service.targetAudience && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Users size={15} style={{ color: '#f1c98d' }} />
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.78)' }}>{text('targetAudience', service.targetAudience)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <div
            className={hasImage ? 'grid-responsive-split' : undefined}
            style={{
              gap: 'clamp(32px, 6vw, 64px)',
              alignItems: 'start',
            }}
          >
            {/* Main content */}
            <div>
              {service.syllabusOrFeatures && service.syllabusOrFeatures.length > 0 && (
                <div style={{ marginBottom: 40 }}>
                  <h2 className="display--md serif" style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', margin: '0 0 24px' }}>
                    {t('whatYouLearn')}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {service.syllabusOrFeatures.map((item, index) => (
                      <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <CheckCircle2 size={18} style={{ color: 'var(--green)', flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.65 }}>{catalog.has(`services.${slug}.syllabus.${index}`) ? catalog(`services.${slug}.syllabus.${index}`) : locale === 'ar' ? `[AR] ${item}` : item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {hasImage && (
                <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 0, aspectRatio: '16/9', position: 'relative' }}>
                  <Image
                    src={hasImage}
                    alt={text('name', service.name)}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>

            {/* Sidebar CTA */}
            <div>
              <div
                className="card"
                style={{
                  padding: 28,
                  position: 'sticky',
                  top: 100,
                  border: '1.5px solid var(--line-light)',
                }}
              >
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>
                    {t('pricing')}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: 'var(--green)',
                      lineHeight: 1.2,
                    }}
                  >
                    {priceLabel}
                  </div>
                </div>

                <div
                  style={{
                    padding: '12px 14px',
                    background: 'var(--green-pale)',
                    borderRadius: 8,
                    marginBottom: 22,
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center',
                  }}
                >
                  <Clock size={14} style={{ color: 'var(--green)', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'var(--green-deep)', lineHeight: 1.5 }}>{text('duration', service.duration)}</span>
                </div>

                {service.targetAudience && (
                  <div
                    style={{
                      padding: '12px 14px',
                      background: 'var(--paper)',
                      borderRadius: 8,
                      border: '1px solid var(--line-light)',
                      marginBottom: 22,
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                      {t('targetAudience')}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: 0, lineHeight: 1.55 }}>
                      {text('targetAudience', service.targetAudience)}
                    </p>
                  </div>
                )}

                <Link
                  href={`/${locale}/contact`}
                  className="btn btn--primary"
                  style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}
                  id={`service-inquiry-${service.slug}`}
                >
                  {t('contactCta')} <ArrowUpRight size={15} />
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="btn btn--secondary btn--sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                  id={`service-bailleur-${service.slug}`}
                >
                  {t('financeCta')}
                </Link>

                <p style={{ fontSize: 11.5, color: 'var(--muted)', textAlign: 'center', marginTop: 14, lineHeight: 1.55 }}>
                  {t('responseNote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
