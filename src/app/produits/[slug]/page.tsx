import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, ArrowLeft, ArrowUpRight, MapPin, Beaker, Package } from 'lucide-react';
import { api } from '@/api';
import { VINERIA_PRODUCTS } from '@/lib/vineria-data';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const products = VINERIA_PRODUCTS;
  const product = products.find((p) => p.slug === slug);
  return {
    title: product ? `${product.name} | VINERIA` : 'Produit | VINERIA',
    description: product?.description?.slice(0, 160),
  };
}

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params;

  // Try live data, fall back to static
  let product: Awaited<ReturnType<typeof api.getProduct>>;
  try {
    product = await api.getProduct(slug);
  } catch {
    product = undefined;
  }
  if (!product) {
    // Fallback from static data
    const found = VINERIA_PRODUCTS.find((p) => p.slug === slug);
    if (!found) notFound();
    product = found as unknown as typeof product;
  }
  if (!product) notFound();

  return (
    <main>
      <section style={{ background: 'var(--paper)', padding: '28px 0' }}>
        <div className="container">
          <Link
            href="/produits"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--muted)',
              fontSize: 14,
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
          >
            <ArrowLeft size={15} /> Retour au catalogue
          </Link>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <div
            className="grid-responsive-2"
            style={{
              gap: 'clamp(32px, 6vw, 72px)',
              alignItems: 'start',
            }}
          >
            {/* Image */}
            <div>
              <div
                style={{
                  borderRadius: 18,
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  background: 'var(--linen)',
                  position: 'relative',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
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
                    <span style={{ fontSize: 72, opacity: 0.4 }}>🌿</span>
                  </div>
                )}

                {/* Category badge */}
                {product.categoryLabel && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      background: 'rgba(255,255,255,0.90)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid var(--line-light)',
                      borderRadius: 100,
                      padding: '5px 14px',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--green)',
                    }}
                  >
                    {product.categoryLabel}
                  </span>
                )}
              </div>

              {/* Characteristics grid */}
              {product.characteristics && product.characteristics.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>
                    Caractéristiques
                  </div>
                  <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    {product.characteristics.map((char, i) => (
                      <div
                        key={char.label}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 16,
                          padding: '13px 18px',
                          borderBottom: i < product.characteristics!.length - 1 ? '1px solid var(--line-light)' : 'none',
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>{char.label}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)', textAlign: 'right', maxWidth: '60%' }}>{char.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div style={{ position: 'sticky', top: 96 }}>
              <span className="eyebrow eyebrow--green" style={{ display: 'block', marginBottom: 14 }}>
                Produit Vineria — Traçabilité garantie
              </span>

              <h1
                className="display--md serif"
                style={{ margin: '0 0 12px', lineHeight: 1.2, fontSize: 'clamp(24px, 3.5vw, 42px)' }}
              >
                {product.name}
              </h1>

              {product.tagline && (
                <p style={{ color: 'var(--ochre)', fontWeight: 600, fontSize: 14, margin: '0 0 20px', lineHeight: 1.5 }}>
                  {product.tagline}
                </p>
              )}

              <p style={{ fontSize: 15.5, color: 'var(--muted)', lineHeight: 1.8, margin: '0 0 28px' }}>
                {product.description}
              </p>

              {/* Meta pills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {product.origin && (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <MapPin size={15} style={{ color: 'var(--green)', flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block' }}>Origine</span>
                      <span style={{ fontSize: 14, color: 'var(--ink-soft)' }}>{product.origin}</span>
                    </div>
                  </div>
                )}
                {product.method && (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <Beaker size={15} style={{ color: 'var(--green)', flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block' }}>Méthode</span>
                      <span style={{ fontSize: 14, color: 'var(--ink-soft)' }}>{product.method}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Packaging */}
              {product.packaging && (
                <div
                  style={{
                    background: 'var(--paper)',
                    border: '1.5px solid var(--line-light)',
                    borderRadius: 12,
                    padding: '18px 20px',
                    marginBottom: 28,
                  }}
                >
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 12 }}>
                    <Package size={14} style={{ color: 'var(--green)' }} />
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>Conditionnements</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                      <CheckCircle2 size={13} style={{ color: 'var(--green)', flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)', display: 'block', marginBottom: 2 }}>DÉTAIL</span>
                        <span style={{ fontSize: 13, color: 'var(--muted)' }}>{product.packaging.retail}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                      <CheckCircle2 size={13} style={{ color: 'var(--ochre)', flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ochre)', display: 'block', marginBottom: 2 }}>PROFESSIONNEL / B2B</span>
                        <span style={{ fontSize: 13, color: 'var(--muted)' }}>{product.packaging.pro}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Price & CTA */}
              <div
                style={{
                  borderTop: '1px solid var(--line-light)',
                  paddingTop: 22,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 16,
                  marginBottom: 22,
                }}
              >
                <div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Prix indicatif</div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 700, color: 'var(--green)', lineHeight: 1 }}>
                    {product.price} <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--muted)' }}>EUR</span>
                  </div>
                  {product.unit && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>/ {product.unit}</div>}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn--primary" style={{ flex: 1, justifyContent: 'center', minWidth: 160 }} id="product-inquiry-btn">
                  Demander ce produit <ArrowUpRight size={15} />
                </Link>
                <Link href="/contact" className="btn btn--secondary btn--sm" style={{ whiteSpace: 'nowrap' }} id="product-b2b-btn">
                  Devis B2B
                </Link>
              </div>

              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 16, lineHeight: 1.55 }}>
                Réponse sous 48h. Échantillons disponibles pour commandes professionnelles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
