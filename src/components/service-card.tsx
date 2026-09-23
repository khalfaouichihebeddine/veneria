'use client';

import Link from 'next/link';
import { ArrowUpRight, Users, Clock } from 'lucide-react';
import type { Service } from '@/types';
import { useLanguage } from './language-provider';

const CATEGORY_ICONS: Record<string, string> = {
  academie: '🎓',
  technique: '🌿',
  distillation: '🫙',
  visite: '👁',
  parrainage: '🤝',
};

const CATEGORY_LABELS: Record<string, string> = {
  academie: 'Académie Vineria',
  technique: 'Accompagnement Technique',
  distillation: 'Distillation Partagée',
  visite: 'Accueil Pédagogique',
  parrainage: 'Parrainage',
};

export function ServiceCard({ service }: { service: Service }) {
  const { localizeService, t, isArabic } = useLanguage();
  service = localizeService(service);
  const catIcon = service.category ? CATEGORY_ICONS[service.category] ?? '🌱' : '🌱';
  const catLabel = service.category ? (isArabic ? ({ academie: 'أكاديمية فينيريا', technique: 'مرافقة تقنية', distillation: 'تقطير مشترك', visite: 'استقبال تربوي', parrainage: 'رعاية' }[service.category] ?? service.category) : CATEGORY_LABELS[service.category] ?? service.category) : '';
  const priceLabel =
    service.priceFrom === 0
      ? t('freeOrScholarship')
      : `${t('from')} ${service.priceFrom} ${t('tunisianDinar')}`;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        overflow: 'hidden',
        textDecoration: 'none',
      }}
      id={`service-card-${service.slug}`}
    >
      {/* Top accent bar */}
      <div style={{ height: 5, background: 'linear-gradient(90deg, var(--green), var(--green-light))' }} />

      <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Category row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 22 }}>{catIcon}</span>
          <span className="eyebrow eyebrow--green" style={{ fontSize: 10 }}>{catLabel}</span>
        </div>

        <h3
          style={{
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 1.35,
            margin: '0 0 8px',
            fontFamily: "'Playfair Display', Georgia, serif",
            color: 'var(--ink)',
          }}
        >
          {service.name}
        </h3>

        {service.tagline && (
          <p style={{ fontSize: 13, color: 'var(--ochre)', fontWeight: 600, margin: '0 0 12px', lineHeight: 1.4 }}>
            {service.tagline}
          </p>
        )}

        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65, flex: 1, margin: '0 0 20px' }}>
          {service.description.slice(0, 130)}{service.description.length > 130 ? '…' : ''}
        </p>

        {/* Meta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Clock size={13} style={{ color: 'var(--muted-light)', flexShrink: 0 }} />
            <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>{service.duration}</span>
          </div>
          {service.targetAudience && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
              <Users size={13} style={{ color: 'var(--muted-light)', flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.45 }}>{service.targetAudience}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--line-light)',
            paddingTop: 16,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)' }}>{priceLabel}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: 'var(--green)' }}>
            {t('discover')} <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}
