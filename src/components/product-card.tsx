'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Droplets, MapPin } from 'lucide-react';
import type { Product } from '@/types';
import { useLanguage } from './language-provider';

export function ProductCard({ product }: { product: Product }) {
  const { localizeProduct, t } = useLanguage();
  product = localizeProduct(product);
  const categoryColors: Record<string, { bg: string; text: string }> = {
    'huiles-essentielles': { bg: '#e8f0ea', text: '#2a5236' },
    'ruche': { bg: '#fef3c7', text: '#b9752d' },
    'amandes': { bg: '#fdf4e8', text: '#c8702b' },
    'huile-olive': { bg: '#f0f7e8', text: '#3a6b47' },
  };
  const colors = product.category
    ? categoryColors[product.category] ?? { bg: 'var(--linen)', text: 'var(--muted)' }
    : { bg: 'var(--linen)', text: 'var(--muted)' };

  return (
    <Link
      href={`/produits/${product.slug}`}
      className="card"
      dir="rtl"
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        overflow: 'hidden',
        direction: 'rtl',
        textAlign: 'right',
      }}
      id={`product-card-${product.slug}`}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 220, background: 'var(--linen)', flexShrink: 0 }}>
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            style={{ objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }}
            sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw"
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, var(--green-pale) 0%, var(--linen) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Droplets size={48} style={{ color: 'var(--green-light)', opacity: 0.5 }} />
          </div>
        )}

        {/* Category badge overlay - on right side for mirrored card */}
        {product.categoryLabel && (
          <span
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: colors.bg,
              color: colors.text,
              border: '1px solid rgba(0,0,0,0.07)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.04em',
              padding: '5px 11px',
              borderRadius: 100,
            }}
          >
            {product.categoryLabel}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.4, margin: '0 0 7px', color: 'var(--ink)' }}>
          {product.name}
        </h3>

        {product.tagline && (
          <p style={{ fontSize: 12.5, color: 'var(--ochre)', fontWeight: 600, margin: '0 0 10px', lineHeight: 1.45 }}>
            {product.tagline}
          </p>
        )}

        <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65, flex: 1, margin: '0 0 16px' }}>
          {product.description.slice(0, 120)}{product.description.length > 120 ? '…' : ''}
        </p>

        {/* Origin */}
        {product.origin && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            <MapPin size={13} style={{ color: 'var(--muted-light)', flexShrink: 0 }} />
            <span style={{ fontSize: 11.5, color: 'var(--muted-light)', lineHeight: 1.4 }}>{product.origin}</span>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--line-light)',
            paddingTop: 14,
          }}
        >
          <span style={{ fontSize: 19, fontWeight: 800, color: 'var(--green)' }}>
            {product.price} <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>د.ت</span>
            {product.unit && <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500 }}> / {product.unit}</span>}
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--green)',
            }}
          >
            مشاهدة <ArrowUpRight size={13} style={{ transform: 'scaleX(-1)' }} />
          </span>
        </div>
      </div>
    </Link>
  );
}
