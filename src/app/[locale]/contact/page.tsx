'use client';
import { useState } from 'react';
import { Send, Mail, MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import { PARTNERSHIP_TRACKS, VINERIA_INFO } from '@/lib/vineria-data';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
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
      setError(t('form.networkError'));
    } finally {
      setLoading(false);
    }
  }

  const INTEREST_OPTIONS = [
    { value: 'commercial', labelKey: 'commercial' as const },
    { value: 'bailleur', labelKey: 'bailleur' as const },
    { value: 'recherche', labelKey: 'recherche' as const },
    { value: 'formation', labelKey: 'formation' as const },
    { value: 'parrainage', labelKey: 'parrainage' as const },
    { value: 'visite', labelKey: 'visite' as const },
    { value: 'autre', labelKey: 'autre' as const },
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
        <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 680 }}>
            <span className="eyebrow" style={{ color: '#f1c98d', display: 'block', marginBottom: 16 }}>
              {t('hero.eyebrow')}
            </span>
            <h1 className="display" style={{ color: '#fff', margin: '0 0 22px', fontSize: 'clamp(32px, 6vw, 72px)' }}>
              {t('hero.headline')}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, lineHeight: 1.75 }}>
              {t('hero.body')}
            </p>
          </div>
        </div>
      </section>

      {/* Partnership tracks reminder */}
      <section style={{ background: 'var(--paper)', padding: '36px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>{t('partnersLabel')}</span>
            {PARTNERSHIP_TRACKS.map((track) => (
              <span key={track.id} className="badge badge--green">{track.tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
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
              <span className="eyebrow">{t('info.eyebrow')}</span>
              <div className="accent-line" style={{ display: 'block', marginTop: 12 }} />
              <h2 className="display--md serif" style={{ margin: '16px 0 20px', fontSize: 'clamp(22px, 3vw, 36px)' }}>
                {t('info.headline')}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
                {[
                  { icon: <MapPin size={17} style={{ color: 'var(--green)' }} />, label: t('info.address'), value: VINERIA_INFO.address },
                  { icon: <Phone size={17} style={{ color: 'var(--green)' }} />, label: t('info.phone'), value: VINERIA_INFO.phone },
                  { icon: <Mail size={17} style={{ color: 'var(--green)' }} />, label: t('info.email'), value: VINERIA_INFO.email },
                  { icon: <Clock size={17} style={{ color: 'var(--green)' }} />, label: t('info.hours'), value: VINERIA_INFO.hours },
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
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
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)', marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--line-light)', paddingTop: 28 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
                  {t('quickLinks.title')}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {([
                    ['products', '/produits'],
                    ['services', '/services'],
                    ['about', '/a-propos'],
                  ] as const).map(([key, href]) => (
                    <Link
                      key={href}
                      href={href}
                      locale={locale}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 14,
                        color: 'var(--green)',
                        fontWeight: 600,
                      }}
                    >
                      {t(`quickLinks.${key}`)} <ArrowUpRight size={13} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div>
              {sent ? (
                <div
                  className="card"
                  style={{
                    padding: 48,
                    textAlign: 'center',
                    border: '2px solid var(--green-pale)',
                  }}
                >
                  <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                  <h2 className="display--md serif" style={{ fontSize: 26, margin: '0 0 14px', color: 'var(--green)' }}>
                    {t('success.title')}
                  </h2>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 28 }}>
                    {t('success.body')}
                  </p>
                  <Link href="/" locale={locale} className="btn btn--primary">
                    {t('success.backHome')}
                  </Link>
                </div>
              ) : (
                <form
                  className="card"
                  style={{ padding: 'clamp(24px, 4vw, 40px)', display: 'flex', flexDirection: 'column', gap: 22 }}
                  onSubmit={submit}
                  id="contact-form"
                >
                  <div>
                    <h2 className="display--md serif" style={{ fontSize: 22, margin: '0 0 6px' }}>{t('form.headline')}</h2>
                    <p style={{ fontSize: 13.5, color: 'var(--muted)' }}>{t('form.subtitle')}</p>
                  </div>

                  <div className="grid-responsive-2" style={{ gap: 16 }}>
                    <label>
                      {t('form.name')}
                      <input
                        required
                        name="name"
                        placeholder={t('form.namePlaceholder')}
                        className="field"
                        id="contact-name"
                      />
                    </label>
                    <label>
                      {t('form.email')}
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder={t('form.emailPlaceholder')}
                        className="field"
                        id="contact-email"
                      />
                    </label>
                  </div>

                  <label>
                    {t('form.organization')}
                    <input
                      name="organization"
                      placeholder={t('form.organizationPlaceholder')}
                      className="field"
                      id="contact-org"
                    />
                  </label>

                  <label>
                    {t('form.youAre')}
                    <select
                      required
                      name="interestType"
                      className="field"
                      id="contact-interest"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                    >
                      <option value="">{t('form.choosePlaceholder')}</option>
                      {INTEREST_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{t(`interests.${opt.labelKey}`)}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    {t('form.subject')}
                    <input
                      required
                      name="subject"
                      placeholder={t('form.subjectPlaceholder')}
                      className="field"
                      id="contact-subject"
                    />
                  </label>

                  <label>
                    {t('form.message')}
                    <textarea
                      required
                      name="message"
                      placeholder={t('form.messagePlaceholder')}
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
                    {loading ? t('form.sending') : (
                      <>{t('form.send')} <Send size={15} /></>
                    )}
                  </button>

                  <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.55 }}>
                    {t('form.privacy')}
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
