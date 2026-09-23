'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Send, Mail, MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import { PARTNERSHIP_TRACKS, VINERIA_INFO } from '@/lib/vineria-data';

const INTEREST_OPTIONS = [
  { value: 'commercial', label: '🏪 توزيع / شراء بالجملة B2B / تصدير' },
  { value: 'bailleur', label: '💼 تمويل وشراكة فنية وتنموية' },
  { value: 'recherche', label: '🔬 بحث علمي ودراسات زراعية' },
  { value: 'formation', label: '🎓 التسجيل في دورات أكاديمية فينيريا' },
  { value: 'parrainage', label: '🌳 رعاية شجرة لوز أو خلية نحل' },
  { value: 'visite', label: '👁 زيارة تربوية وميدانية للمزرعة' },
  { value: 'autre', label: 'استفسار آخر' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [interest, setInterest] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form));
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erreur réseau');
      setSent(true);
    } catch {
      setError('تعذر إرسال الرسالة في الوقت الحالي. يرجى المحاولة مجدداً أو مراسلتنا مباشرة عبر البريد الإلكتروني.');
    } finally {
      setLoading(false);
    }
  }

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
        <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 700 }}>
            <span className="eyebrow" style={{ color: '#f1c98d', display: 'block', marginBottom: 16 }}>
              اتصل بنا وشراكات
            </span>
            <h1 className="display" style={{ color: '#fff', margin: '0 0 22px', fontSize: 'clamp(32px, 6vw, 68px)', lineHeight: 1.25 }}>
              لنتحدث عن المزرعة ومشاريعها.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.80)', fontSize: 17, lineHeight: 1.8 }}>
              موزعاً، جهة مانحة، باحثاً، متعلماً أو مهتماً — نسعد بالإجابة عن استفساراتك بكل عناية خلال يومي عمل.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership tracks reminder */}
      <section style={{ background: 'var(--paper)', padding: '36px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 13.5, color: 'var(--muted)', fontWeight: 600 }}>نبحث عن شركاء فاعلين في مجالات:</span>
            {PARTNERSHIP_TRACKS.map((t) => (
              <span key={t.id} className="badge badge--green">{t.tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Main content: form + info */}
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <div
            className="grid-responsive-split"
            style={{
              gap: 'clamp(32px, 6vw, 72px)',
              alignItems: 'start',
            }}
          >
            {/* Left — Contact info */}
            <div>
              <span className="eyebrow">معلومات التواصل المباشر</span>
              <div className="accent-line" style={{ display: 'block', marginTop: 12 }} />
              <h2 className="display--md serif" style={{ margin: '16px 0 20px', fontSize: 'clamp(22px, 3vw, 36px)' }}>
                مزرعة فينيريا
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: 'var(--green-pale)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={18} style={{ color: 'var(--green)' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--ink)', marginBottom: 4 }}>العنوان والموقع</div>
                    <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>{VINERIA_INFO.address}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: 'var(--green-pale)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={18} style={{ color: 'var(--green)' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--ink)', marginBottom: 4 }}>الهاتف</div>
                    <a href="tel:+21671890120" style={{ fontSize: 14, color: 'var(--muted)', display: 'block', direction: 'ltr', textAlign: 'left' }}>+216 71 890 120</a>
                    <a href="tel:+21698450320" style={{ fontSize: 14, color: 'var(--muted)', display: 'block', direction: 'ltr', textAlign: 'left' }}>+216 98 450 320</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: 'var(--green-pale)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={18} style={{ color: 'var(--green)' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--ink)', marginBottom: 4 }}>البريد الإلكتروني</div>
                    <a href={`mailto:${VINERIA_INFO.email}`} style={{ fontSize: 14, color: 'var(--muted)' }}>{VINERIA_INFO.email}</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: 'var(--green-pale)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={18} style={{ color: 'var(--green)' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--ink)', marginBottom: 4 }}>أوقات العمل والاستقبال</div>
                    <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>{VINERIA_INFO.hours}</div>
                  </div>
                </div>
              </div>

              {/* Partnership quick links */}
              <div style={{ borderTop: '1px solid var(--line-light)', paddingTop: 28 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 16 }}>
                  روابط سريعة
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    ['منتجاتنا والكتالوج', '/produits'],
                    ['خدماتنا وأكاديمية فينيريا', '/services'],
                    ['منهجيتنا في الزراعة المعمرة', '/a-propos'],
                  ].map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 14.5,
                        color: 'var(--green)',
                        fontWeight: 600,
                      }}
                    >
                      {label} <ArrowUpRight size={14} style={{ transform: 'scaleX(-1)' }} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form Card (mirrored RTL) */}
            <div>
              {sent ? (
                <div
                  className="card"
                  dir="rtl"
                  style={{
                    padding: 48,
                    textAlign: 'center',
                    border: '2px solid var(--green-pale)',
                    direction: 'rtl',
                  }}
                >
                  <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                  <h2 className="display--md serif" style={{ fontSize: 26, margin: '0 0 14px', color: 'var(--green)' }}>
                    تم إرسال رسالتك بنجاح!
                  </h2>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 28 }}>
                    شكراً لاهتمامك بفينيريا. سنقوم بالرد عليك بعناية واهتمام خلال يومي عمل.
                  </p>
                  <Link href="/" className="btn btn--primary">
                    العودة إلى الصفحة الرئيسية
                  </Link>
                </div>
              ) : (
                <form
                  className="card"
                  dir="rtl"
                  style={{
                    padding: 'clamp(24px, 4vw, 40px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 22,
                    direction: 'rtl',
                    textAlign: 'right',
                  }}
                  onSubmit={submit}
                  id="contact-form"
                >
                  <div>
                    <h2 className="display--md serif" style={{ fontSize: 22, margin: '0 0 6px' }}>أرسل لنا رسالة</h2>
                    <p style={{ fontSize: 13.5, color: 'var(--muted)' }}>الرد خلال 48 ساعة عمل. جميع الحقول التي تحمل علامة * إجبارية.</p>
                  </div>

                  <div className="grid-responsive-2" style={{ gap: 16 }}>
                    <label>
                      الاسم واللقب *
                      <input
                        required
                        name="name"
                        placeholder="فاطمة بن صالح"
                        className="field"
                        id="contact-name"
                      />
                    </label>
                    <label>
                      البريد الإلكتروني *
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="fatima@example.com"
                        className="field"
                        id="contact-email"
                        dir="ltr"
                        style={{ textAlign: 'right' }}
                      />
                    </label>
                  </div>

                  <label>
                    المؤسسة / الشركة / التعاونية
                    <input
                      name="organization"
                      placeholder="اسم شركتك أو مشروعك أو تعاونيتك الفلاحية"
                      className="field"
                      id="contact-org"
                    />
                  </label>

                  <label>
                    طبيعة اهتمامك أو شراكتك *
                    <select
                      required
                      name="interestType"
                      className="field"
                      id="contact-interest"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                    >
                      <option value="">اختر مجال اهتمامك…</option>
                      {INTEREST_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    موضوع الرسالة *
                    <input
                      required
                      name="subject"
                      placeholder="طلب عينات / تسجيل في الأكاديمية / رعاية…"
                      className="field"
                      id="contact-subject"
                    />
                  </label>

                  <label>
                    نص الرسالة *
                    <textarea
                      required
                      name="message"
                      placeholder="صف لنا مشروعك أو استفسارك أو طلبك بالتفصيل. كلما كنت أكثر دقة، كان بإمكاننا إفادتك بشكل أفضل."
                      className="field"
                      id="contact-message"
                      style={{ minHeight: 140, resize: 'vertical' }}
                    />
                  </label>

                  {error && (
                    <div
                      role="alert"
                      style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: 8,
                        padding: '12px 16px',
                        color: '#dc2626',
                        fontSize: 14,
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={loading}
                    style={{ justifyContent: 'center', opacity: loading ? 0.75 : 1 }}
                    id="contact-submit"
                  >
                    {loading ? 'جارٍ الإرسال…' : (
                      <>إرسال الرسالة <Send size={15} style={{ transform: 'scaleX(-1)' }} /></>
                    )}
                  </button>

                  <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.6 }}>
                    بياناتك محمية ولن تتم مشاركتها مع أي جهة خارجية. نستخدمها حصراً للرد على استفسارك.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
