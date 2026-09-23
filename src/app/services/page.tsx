import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { api } from '@/api';
import { ServiceCard } from '@/components/service-card';
import { VINERIA_SERVICES } from '@/lib/vineria-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'الخدمات وأكاديمية فينيريا | VINERIA',
  description:
    'أكاديمية فينيريا لتكوين صغار الفلاحين التونسيين في الزراعة المستدامة بالنظام الجاف. دورات حقلية، مرافقة تقنية، تقطير مشترك، زيارات بيداغوجية، ورعاية أشجار اللوز والمناحل.',
};

export default async function Services() {
  let services: Awaited<ReturnType<typeof api.getServices>>;
  try {
    services = await api.getServices();
    if (!services.length) services = VINERIA_SERVICES as typeof services;
  } catch {
    services = VINERIA_SERVICES as typeof services;
  }

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
            أكاديمية فينيريا وخدماتنا الفلاحية
          </span>
          <h1 className="display" style={{ color: '#fff', margin: '0 0 22px', maxWidth: 740, lineHeight: 1.25 }}>
            ما نطبقه بنجاح في حقولنا، نعلّمه وننقله.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.80)', fontSize: 17, lineHeight: 1.8, maxWidth: 620, marginBottom: 32 }}>
            تكوين فلاحي تطبيقي بالعامية التونسية، مرافقة تقنية للتحول الإيكولوجي، تقطير مشترك لمنتجي المنطقة، زيارات تعليمية، ورعاية أشجار اللوز وخلايا النحل.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {['دورات حقلية تطبيقية', 'مجموعات صغيرة (8–12 شخص)', 'متابعة ميدانية بعد التكوين', 'منح دراسية متوفرة'].map((b) => (
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

      {/* Services grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            <div>
              <span className="eyebrow">جميع خدماتنا</span>
              <div className="accent-line" style={{ display: 'block', marginTop: 12 }} />
              <h2 className="display--md serif" style={{ margin: '10px 0 0' }}>ما يجعل من فينيريا مؤسسة ذات أثر حقيقي.</h2>
            </div>
            <Link href="/contact" className="btn btn--primary" id="services-contact-cta">
              تواصل معنا <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Academy full callout */}
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
                alt="أكاديمية فينيريا — تكوين تطبيقي في الزراعة المستدامة في شمال تونس"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div>
              <span className="eyebrow">أكاديمية فينيريا</span>
              <div className="accent-line" style={{ display: 'block', marginTop: 12 }} />
              <h2 className="display--md serif" style={{ margin: '16px 0 18px', fontSize: 'clamp(22px, 3vw, 36px)', lineHeight: 1.3 }}>
                تأهيل صغار الفلاحين هو جوهر رسالتنا.
              </h2>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 22 }}>
                دورات قصيرة، داخل المزرعة، بالعامية التونسية، بمجموعات صغيرة من 8 إلى 12 شخصاً، مع مرافقة فردية وتطبيق مباشر على أراضي المتدربين.
              </p>

              {/* Modules */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {[
                  'إدارة أشجار اللوز والزيتون في النظام الجاف دون ري',
                  'مبادئ تربية النحل الحديثة والمستدامة',
                  'زراعة النباتات العطرية والتقطير الفلاحي',
                  'صناعة السماد العضوي الحي والخصوبة الذاتية للتربة',
                  'تقنيات حصاد مياه الأمطار وإدارة الجفاف',
                  'التعبئة الصحية والولوج للأسواق المجزية',
                ].map((module) => (
                  <div key={module} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
                    <span style={{ fontSize: 14.5, color: 'var(--ink-soft)', fontWeight: 500 }}>{module}</span>
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
                  lineHeight: 1.7,
                }}
              >
                <strong>الفئات ذات الأولوية:</strong> صغار الفلاحين، النساء الريفيات، والشباب الراغبون في الاستقرار الفلاحي. تعريفات تضامنية ومنح تغطية متاحة عبر شركائنا المانحين.
              </div>

              <Link href="/contact" className="btn btn--primary" id="academy-register-cta">
                التسجيل أو تمويل دفعة تكوينية <ArrowUpRight size={15} />
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
          <span className="eyebrow" style={{ color: '#f1c98d', display: 'block', marginBottom: 16 }}>برنامج الرعاية والتضامن</span>
          <h2 className="display--md serif" style={{ color: '#fff', margin: '0 0 18px', fontSize: 'clamp(22px, 3vw, 36px)', lineHeight: 1.3 }}>
            رعاية شجرة لوز أو خلية نحل.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 1.8, maxWidth: 540, margin: '0 auto 36px' }}>
            مدخل مباشر وبسيط لشراكة ذات معنى بيئي واجتماعي. لوحة خشبية محفورة باسمك، تقارير دورية عن حقلك، ونصيبك الخاص من المحصول السنوي.
          </p>
          <Link href="/contact" className="btn btn--ochre" id="parrainage-cta">
            كن راعياً للمزرعة <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
