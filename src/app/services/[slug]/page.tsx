import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock, Users } from 'lucide-react';
import { api } from '@/api';
import { VINERIA_SERVICES } from '@/lib/vineria-data';
import type { Metadata } from 'next';
import Image from 'next/image';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = VINERIA_SERVICES.find((s) => s.slug === slug);
  return {
    title: service ? `${service.name} | VINERIA` : 'Service | VINERIA',
    description: service?.description?.slice(0, 160),
  };
}

export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;

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
      ? 'Financement par bourse / Tarif solidaire'
      : `À partir de ${service.priceFrom} TND`;

  const hasImage = service.imageUrl;

  return (
    <main>
      {/* Breadcrumb */}
      <section style={{ background: 'var(--paper)', padding: '22px 0', borderBottom: '1px solid var(--line-light)' }}>
        <div className="container">
          <Link
            href="/services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--muted)',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            <ArrowLeft size={15} /> Retour aux services & Académie
          </Link>
        </div>
      </section>

      {/* Hero content */}
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
                {service.category === 'academie' ? '🎓 Académie Vineria' :
                 service.category === 'technique' ? '🌿 Accompagnement Technique' :
                 service.category === 'distillation' ? '🫙 Distillation Partagée' :
                 service.category === 'visite' ? '👁 Accueil Pédagogique' :
                 '🤝 Parrainage'}
              </span>
            )}
            <h1
              className="display--md serif"
              style={{ color: '#fff', margin: '0 0 18px', fontSize: 'clamp(26px, 4vw, 50px)' }}
            >
              {service.name}
            </h1>
            {service.tagline && (
              <p style={{ color: '#f1c98d', fontWeight: 600, fontSize: 15, margin: '0 0 18px' }}>
                {service.tagline}
              </p>
            )}
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, lineHeight: 1.8, margin: '0 0 28px' }}>
              {service.description}
            </p>

            {/* Quick meta */}
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Clock size={15} style={{ color: '#f1c98d' }} />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.78)' }}>{service.duration}</span>
              </div>
              {service.targetAudience && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Users size={15} style={{ color: '#f1c98d' }} />
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.78)' }}>{service.targetAudience}</span>
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
              {/* Syllabus / Features */}
              {service.syllabusOrFeatures && service.syllabusOrFeatures.length > 0 && (
                <div style={{ marginBottom: 40 }}>
                  <h2 className="display--md serif" style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', margin: '0 0 24px' }}>
                    Ce que vous apprenez ou recevez
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {service.syllabusOrFeatures.map((item) => (
                      <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <CheckCircle2 size={18} style={{ color: 'var(--green)', flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.65 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Image if available */}
              {hasImage && (
                <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 0, aspectRatio: '16/9', position: 'relative' }}>
                  <Image
                    src={hasImage}
                    alt={service.name}
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
                    Tarif
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: service.priceFrom === 0 ? 'var(--green)' : 'var(--green)',
                      lineHeight: 1.2,
                    }}
                  >
                    {priceLabel}
                  </div>
                </div>

                {/* Duration */}
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
                  <span style={{ fontSize: 13, color: 'var(--green-deep)', lineHeight: 1.5 }}>{service.duration}</span>
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
                      Public cible
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: 0, lineHeight: 1.55 }}>
                      {service.targetAudience}
                    </p>
                  </div>
                )}

                <Link
                  href="/contact"
                  className="btn btn--primary"
                  style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}
                  id={`service-inquiry-${service.slug}`}
                >
                  Nous contacter <ArrowUpRight size={15} />
                </Link>
                <Link
                  href="/contact"
                  className="btn btn--secondary btn--sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                  id={`service-bailleur-${service.slug}`}
                >
                  Financer cette prestation
                </Link>

                <p style={{ fontSize: 11.5, color: 'var(--muted)', textAlign: 'center', marginTop: 14, lineHeight: 1.55 }}>
                  Réponse dans les 48h ouvrables. Adaptation possible selon le groupe et les financements disponibles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
