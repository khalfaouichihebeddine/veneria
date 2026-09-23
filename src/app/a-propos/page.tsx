import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import { VALUE_PILLARS, PERMACULTURE_WORKSHOPS, VINERIA_INFO } from '@/lib/vineria-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'منهجيتنا ورؤيتنا | VINERIA',
  description:
    'فينيريا مزرعة نموذجية متكاملة في شمال تونس. اكتشف منهجيتنا في الزراعة المستدامة بالنظام الجاف، قيمنا الملموسة، والتزامنا بدعم صغار الفلاحين وإدماج النساء الريفيات.',
};

export default function About() {
  return (
    <main>
      {/* ══════════════════════════════════════════
          HERO À PROPOS
      ══════════════════════════════════════════ */}
      <section
        style={{
          background: 'linear-gradient(160deg, var(--green-deep) 0%, #2a5236 60%, #3a6b47 100%)',
          padding: 'clamp(80px, 12vh, 120px) 0 clamp(60px, 8vh, 96px)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: '30%', width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 820 }}>
            <span className="eyebrow animate-fade-up" style={{ color: '#f1c98d', display: 'block', marginBottom: 20 }}>
              التعريف بالمزرعة والمشروع
            </span>
            <h1
              className="display animate-fade-up animate-delay-1"
              style={{ color: '#fff', margin: '0 0 28px', textShadow: '0 2px 20px rgba(0,0,0,0.2)', lineHeight: 1.25 }}
            >
              منهجية حية، لا مجرد شعبة فلاحية.
            </h1>
            <p
              className="animate-fade-up animate-delay-2"
              style={{ fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.8, color: 'rgba(255,255,255,0.85)', maxWidth: 660, marginBottom: 38 }}
            >
              {VINERIA_INFO.summary}
            </p>
            <div className="animate-fade-up animate-delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/produits" className="btn btn--ochre" id="about-hero-produits">
                منتجاتنا الأصيلة <ArrowUpRight size={15} />
              </Link>
              <Link href="/contact" className="btn btn--ghost" id="about-hero-contact">
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          QUI NOUS SOMMES
      ══════════════════════════════════════════ */}
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
              <span className="eyebrow">من نحن</span>
              <div className="accent-line" style={{ display: 'block', marginTop: 12 }} />
              <h2 className="display--md serif" style={{ margin: '16px 0 22px' }}>
                فينيريا، شمال تونس.
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 20 }}>
                فينيريا مستغلة فلاحية متكاملة تقع في شمال تونس. <strong style={{ color: 'var(--ink)' }}>أشجار اللوز، الزيتون، إكليل الجبل وخلايا النحل</strong> تدار جميعاً ضمن نظام موحد مستدام وفق مبادئ الزراعة المعمرة.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 20 }}>
                لا نعرف أنفسنا بنشاط أحادي، بل بمنهجية حية متكاملة: <strong style={{ color: 'var(--ink)' }}>الإنتاج في النظام الجاف، بلا مدخلات كيميائية</strong>، وإشراك أبناء وبنات المنطقة بكرامة، مع نقل الممارسات الناجحة للمزارعين المجاورين.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
                {[
                  'تأسست سنة 2022 في شمال تونس',
                  'منظومة متكاملة على 32 هكتاراً بالنظام الجاف',
                  '75 خلية نحل، وأكثر من 4,000 شجرة لوز وزيتون',
                  'خلو تام من أي مدخلات كيميائية أو مبيدات تركيبية',
                ].map((fact) => (
                  <div key={fact} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--green)', flexShrink: 0 }} />
                    <span style={{ fontSize: 15, color: 'var(--ink-soft)', fontWeight: 600 }}>{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3' }}>
              <Image
                src="/images/hero-farm.jpg"
                alt="مشهد عام لضيعة فينيريا — بستان متكامل بالزراعة المستدامة في تونس"
                fill
                style={{ objectFit: 'cover' }}
              />
              {/* Overlay info */}
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
                {[['32 هكتار', 'زراعة مستدامة'], ['75 خلية', 'مناحل منتجة'], ['2022', 'سنة التأسيس']].map(([val, label]) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>{val}</div>
                    <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LE MODÈLE CIRCULAIRE — TABLEAU
      ══════════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
            <span className="eyebrow">النموذج البيئي</span>
            <div className="accent-line" style={{ display: 'block', margin: '14px auto' }} />
            <h2 className="display--md serif" style={{ margin: '0 0 16px' }}>
              لا شيء يخرج بمفرده.
            </h2>
            <p className="lead">
              هذا هو جوهر نموذجنا، وما يميزنا عن الاستغلاليات الفلاحية التقليدية. كل ورشة تغذي بقية الورشات وتدعمها.
            </p>
          </div>

          <div className="card" dir="rtl" style={{ overflow: 'auto', padding: 0, direction: 'rtl', textAlign: 'right' }}>
            <table className="feature-table" style={{ direction: 'rtl', textAlign: 'right' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'right' }}>الورشة الفلاحية</th>
                  <th style={{ textAlign: 'right' }}>ما تنتجه</th>
                  <th style={{ textAlign: 'right' }}>ما تقدمه للمنظومة الحية</th>
                </tr>
              </thead>
              <tbody>
                {PERMACULTURE_WORKSHOPS.map((w) => (
                  <tr key={w.id}>
                    <td style={{ fontWeight: 700, color: 'var(--ink)', minWidth: 150 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 20 }}>
                          {w.id === 'amandiers' ? '🌸' : w.id === 'oliviers' ? '🫒' : w.id === 'romarin' ? '🌿' : w.id === 'ruches' ? '🍯' : '🌱'}
                        </span>
                        {w.name}
                      </div>
                    </td>
                    <td style={{ color: 'var(--ink-soft)' }}>{w.produces}</td>
                    <td style={{ color: 'var(--muted)' }}>{w.bringsToSystem}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ fontWeight: 700, color: 'var(--ink)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 20 }}>♻️</span>
                      التربة الحية والسماد العضوي
                    </div>
                  </td>
                  <td style={{ color: 'var(--ink-soft)' }}>دبال خصب، محسنات حيوية للتربة</td>
                  <td style={{ color: 'var(--muted)' }}>إعادة تدوير 100% من مخلفات التقليم، قش التقطير، وتفل عصر الزيتون</td>
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
              fontSize: 14.5,
              color: 'var(--green-deep)',
              lineHeight: 1.7,
            }}
          >
            💡 ما يُعد نفاية لدى ورشة يمثل المورد الأساسي للأخرى. قش التقطير يعود للكمبوست، والتقليم يحمي التربة، والنحل يضاعف عقد ثمار اللوز. هذا التناغم الحيوي هو ما يجعل المنظومة ناجحة في النظام الجاف — وهو ما نحرص على تدريسه ونقله.
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NOS VALEURS — DÉTAIL COMPLET
      ══════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 52px' }}>
            <span className="eyebrow">التزاماتنا الميدانية</span>
            <div className="accent-line" style={{ display: 'block', margin: '14px auto' }} />
            <h2 className="display--md serif" style={{ margin: '0 0 16px' }}>
              قيمنا، مترجمة إلى ممارسات حقيقية.
            </h2>
            <p className="lead">نبتعد عن الشعارات الإنشائية. إليكم ما تعنيه كل قيمة بشكل ملموس في حقولنا.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {VALUE_PILLARS.map((pillar, i) => (
              <div
                key={pillar.id}
                className="card grid-responsive-split"
                dir="rtl"
                style={{
                  padding: 'clamp(24px, 4vw, 40px)',
                  alignItems: 'start',
                  border: '1.5px solid var(--line-light)',
                  direction: 'rtl',
                  textAlign: 'right',
                }}
              >
                <div>
                  <span className="eyebrow eyebrow--green" style={{ fontSize: 11, display: 'block', marginBottom: 10 }}>
                    القيمة 0{i + 1} / {VALUE_PILLARS.length.toString().padStart(2, '0')}
                  </span>
                  <h3 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, margin: '0 0 8px', color: 'var(--ink)' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: 'var(--ochre)', fontWeight: 600, margin: '0 0 16px' }}>{pillar.subtitle}</p>
                  {pillar.statBadge && (
                    <span className="badge badge--green" style={{ fontSize: 11 }}>{pillar.statBadge}</span>
                  )}
                </div>

                <div>
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, margin: '0 0 22px' }}>
                    {pillar.description}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {pillar.concretePractice.map((practice) => (
                      <div key={practice} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--green)', flexShrink: 0, marginTop: 4 }} />
                        <span style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{practice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ACADEMY IMAGE SECTION
      ══════════════════════════════════════════ */}
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
                alt="دورة تكوينية بأكاديمية فينيريا — السماد العضوي وخصوبة التربة"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <span className="eyebrow">أكاديمية فينيريا</span>
              <div className="accent-line" style={{ display: 'block', marginTop: 12 }} />
              <h2 className="display--md serif" style={{ margin: '16px 0 20px', fontSize: 'clamp(22px, 3vw, 36px)', lineHeight: 1.3 }}>
                ما نتعلمه في حقولنا لا تكتمل قيمته إلا بالمشاركة.
              </h2>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>
                تكوين صغار الفلاحين ليس نشاطاً ثانوياً أو إعلانياً، بل هو صلب رسالة ومهمة مؤسستنا. دورات تطبيقية مركزة، داخل المزرعة، بالعامية التونسية، بمجموعات صغيرة، مع متابعة ميدانية لحقول المتدربين.
              </p>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 28 }}>
                <strong style={{ color: 'var(--ink)' }}>الفئات المستهدفة:</strong> صغار الفلاحين، النساء الريفيات، والشباب الراغبون في الاستثمار الفلاحي.
              </p>
              <Link href="/services" className="btn btn--primary" id="about-academy-cta">
                استكشاف الأكاديمية <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA CONTACT
      ══════════════════════════════════════════ */}
      <section
        style={{
          background: 'linear-gradient(140deg, var(--green-deep) 0%, #1e4a2a 100%)',
          padding: 'clamp(56px, 8vh, 96px) 0',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <div className="container--narrow">
          <span className="eyebrow" style={{ color: '#f1c98d', display: 'block', marginBottom: 18 }}>انضم إلينا وشراكات</span>
          <h2 className="display--md serif" style={{ color: '#fff', margin: '0 0 20px' }}>
            هل ترغب في العمل والتعاون معنا؟
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 1.8, maxWidth: 540, margin: '0 auto 36px' }}>
            سواء كنت موزعاً، جهة مانحة، باحثاً علمياً أو مهتماً بمحاصيلنا — نسعد بالتواصل والرد عليك خلال يومي عمل.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn--ochre" id="about-contact-cta">
              مراسلة فينيريا <ArrowUpRight size={15} />
            </Link>
            <Link href="/produits" className="btn btn--ghost" id="about-products-cta">
              مشاهدة منتجاتنا
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
