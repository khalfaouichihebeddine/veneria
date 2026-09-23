import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { api } from '@/api';
import { ProductCard } from '@/components/product-card';
import { VINERIA_PRODUCTS } from '@/lib/vineria-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Produits de Terroir | VINERIA',
  description:
    'Huiles essentielles de romarin sauvage, miel cru de verger, amandes en régime sec et huile d\'olive vierge extra — tous traçables par lot et parcelle. Conditionnements détail et professionnels.',
};

export default async function Products() {
  let products: Awaited<ReturnType<typeof api.getProducts>>;
  try {
    products = await api.getProducts();
    if (!products.length) products = VINERIA_PRODUCTS as typeof products;
  } catch {
    products = VINERIA_PRODUCTS as typeof products;
  }

  const categories = [
    { id: 'all', label: 'Tous les produits' },
    { id: 'huiles-essentielles', label: 'Huiles Essentielles' },
    { id: 'ruche', label: 'Miel & Ruche' },
    { id: 'amandes', label: 'Amandes' },
    { id: 'huile-olive', label: 'Huile d\'Olive' },
  ];

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
            La récolte — Traçabilité par lot
          </span>
          <h1 className="display" style={{ color: '#fff', margin: '0 0 22px', maxWidth: 720 }}>
            Nos produits de terroir.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.75, maxWidth: 560, marginBottom: 32 }}>
            Huiles essentielles de romarin distillées sur place, miels crus de verger, amandes en conduite sèche et huile d'olive vierge extra. Chaque lot rattaché à sa parcelle, sa date de récolte et son mode d'extraction.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {['Traçabilité parcellaire', 'Conditionnements détail & pro', '100% sans intrant chimique', 'Export possible'].map((b) => (
              <span
                key={b}
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
                {b}
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
            🏪 <strong>Vous êtes distributeur, épicerie fine ou cosmétique bio ?</strong> Demandez notre catalogue professionnel et nos conditions B2B.
          </p>
          <Link href="/contact" className="btn btn--ochre btn--sm" id="catalog-b2b-cta">
            Catalogue B2B <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Categories + Grid */}
      <section className="section">
        <div className="container">
          {/* Category pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
            {categories.map((cat) => (
              <button key={cat.id} className="category-pill active" type="button" id={`filter-${cat.id}`}>
                {cat.label}
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
              <p style={{ fontSize: 18 }}>La collection sera bientôt disponible.</p>
              <Link href="/contact" className="btn btn--primary" style={{ marginTop: 24, display: 'inline-flex' }}>
                Nous contacter
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Traceability info */}
      <section style={{ background: 'var(--paper)', padding: '64px 0' }}>
        <div className="container">
          <div className="grid-4">
            {[
              { icon: '🗺️', title: 'Parcelle d\'origine', desc: 'Chaque lot est rattaché à sa parcelle géolocalisée sur la ferme.' },
              { icon: '📅', title: 'Date de récolte', desc: 'La date de récolte, les conditions et la durée de distillation sont indiquées.' },
              { icon: '🔬', title: 'Analyses disponibles', desc: 'Chromatographies et bulletins physico-chimiques disponibles sur demande.' },
              { icon: '📦', title: 'Deux formats', desc: 'Conditionnements détail pour particuliers et volumes professionnels pour transformateurs.' },
            ].map((item) => (
              <div key={item.title} style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)', marginBottom: 8 }}>{item.title}</div>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
