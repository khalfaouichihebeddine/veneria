import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { api } from '@/api';
import { ProductCard } from '@/components/product-card';
import { VINERIA_PRODUCTS } from '@/lib/vineria-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'منتجاتنا الأصيلة من قلب الأرض | VINERIA',
  description:
    'زيوت عطرية نقية من إكليل الجبل البري، عسل خام من البساتين، لوز بالزراعة الجافة وزيت زيتون بكر ممتاز — كلها قابلة للتتبع بدقة حسب القطعة والدفعة. تعبئة للتجزئة وللمحترفين.',
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
    { id: 'all', label: 'جميع المنتجات' },
    { id: 'huiles-essentielles', label: 'الزيوت العطرية' },
    { id: 'ruche', label: 'العسل ومنتجات النحل' },
    { id: 'amandes', label: 'اللوز الأصيل' },
    { id: 'huile-olive', label: 'زيت الزيتون' },
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
            المحصول الطبيعي — تتبع دقيق لكل دفعة
          </span>
          <h1 className="display" style={{ color: '#fff', margin: '0 0 22px', maxWidth: 740, lineHeight: 1.25 }}>
            منتجاتنا الأصيلة من قلب الأرض.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.80)', fontSize: 17, lineHeight: 1.8, maxWidth: 620, marginBottom: 32 }}>
            زيوت عطرية نقية من إكليل الجبل مقطرة في المزرعة، عسل خام من البساتين، لوز بالزراعة الجافة وزيت زيتون بكر ممتاز. كل دفعة ترتبط بقطعتها الأرضية، تاريخ حصادها وطريقة استخلاصها.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {['تتبع قطاعي دقيق', 'تعبئة للتجزئة وللمحترفين', '100% دون مدخلات كيميائية', 'جاهز للتصدير'].map((b) => (
              <span
                key={b}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: 100,
                  padding: '6px 14px',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.92)',
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
          <p style={{ fontSize: 14, color: 'var(--ochre-warm)', fontWeight: 600 }}>
            🏪 <strong>هل أنت موزع أو متجر أغذية طبيعية أو مصنع مستحضرات تجميل؟</strong> اطلب الكتالوج المهني وشروط الشراء بالجملة B2B.
          </p>
          <Link href="/contact" className="btn btn--ochre btn--sm" id="catalog-b2b-cta">
            كتالوج B2B المهني <ArrowUpRight size={14} />
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
              <p style={{ fontSize: 18 }}>المجموعة ستتوفر قريباً.</p>
              <Link href="/contact" className="btn btn--primary" style={{ marginTop: 24, display: 'inline-flex' }}>
                تواصل معنا
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
              { icon: '🗺️', title: 'القطعة الأرضية الأصلية', desc: 'كل دفعة إنتاج ترتبط بقطعتها الأرضية المحددة بدقة في المزرعة.' },
              { icon: '📅', title: 'تاريخ الحصاد المؤرخ', desc: 'تاريخ الجني الدقيق، الأحوال الجوية، ومدة التقطير مدونة بكل شفافية.' },
              { icon: '🔬', title: 'تحاليل مخبرية معتمدة', desc: 'شهادات التحليل الفيزيائي الكيميائي والكروماتوغرافي متوفرة عند الطلب.' },
              { icon: '📦', title: 'تعبئة مرنة ثنائية', desc: 'أحجام أنيقة للتجزئة للمستهلكين، وكميات مهنية مخصصة للمصنعين.' },
            ].map((item) => (
              <div key={item.title} style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 8 }}>{item.title}</div>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
