'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Send, Mail, MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import { PARTNERSHIP_TRACKS, VINERIA_INFO } from '@/lib/vineria-data';

const INTEREST_OPTIONS = [
  { value: 'commercial', label: '🏪 Distribution / Achat B2B / Export' },
  { value: 'bailleur', label: '💼 Financement & Partenariat Technique' },
  { value: 'recherche', label: '🔬 Recherche Agronomique' },
  { value: 'formation', label: '🎓 S\'inscrire à l\'Académie Vineria' },
  { value: 'parrainage', label: '🌳 Parrainage d\'amandier ou de ruche' },
  { value: 'visite', label: '👁 Visite Pédagogique' },
  { value: 'autre', label: 'Autre' },
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
      setError('Impossible d\'envoyer le message. Réessayez ou écrivez-nous directement par e-mail.');
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
          <div style={{ maxWidth: 680 }}>
            <span className="eyebrow" style={{ color: '#f1c98d', display: 'block', marginBottom: 16 }}>
              Contact & Partenariats
            </span>
            <h1 className="display" style={{ color: '#fff', margin: '0 0 22px', fontSize: 'clamp(32px, 6vw, 72px)' }}>
              Parlons de la ferme.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, lineHeight: 1.75 }}>
              Distributeur, bailleur de fonds, chercheur, apprenant ou curieux — nous répondons dans les deux jours ouvrables avec attention.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership tracks reminder */}
      <section style={{ background: 'var(--paper)', padding: '36px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>Nous cherchons des partenaires :</span>
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
              <span className="eyebrow">Informations de contact</span>
              <div className="accent-line" style={{ display: 'block', marginTop: 12 }} />
              <h2 className="display--md serif" style={{ margin: '16px 0 20px', fontSize: 'clamp(22px, 3vw, 36px)' }}>
                La ferme Vineria
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
                    <MapPin size={17} style={{ color: 'var(--green)' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)', marginBottom: 4 }}>Adresse</div>
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
                    <Phone size={17} style={{ color: 'var(--green)' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)', marginBottom: 4 }}>Téléphone</div>
                    <a href="tel:+21671890120" style={{ fontSize: 14, color: 'var(--muted)', display: 'block' }}>{VINERIA_INFO.phone.split('/')[0].trim()}</a>
                    <a href="tel:+21698450320" style={{ fontSize: 14, color: 'var(--muted)' }}>{VINERIA_INFO.phone.split('/')[1].trim()}</a>
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
                    <Mail size={17} style={{ color: 'var(--green)' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)', marginBottom: 4 }}>E-mail</div>
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
                    <Clock size={17} style={{ color: 'var(--green)' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)', marginBottom: 4 }}>Horaires</div>
                    <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>{VINERIA_INFO.hours}</div>
                  </div>
                </div>
              </div>

              {/* Partnership quick links */}
              <div style={{ borderTop: '1px solid var(--line-light)', paddingTop: 28 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
                  Liens rapides
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    ['Nos produits & catalogue', '/produits'],
                    ['Services & Académie Vineria', '/services'],
                    ['Notre méthode permacole', '/a-propos'],
                  ].map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 14,
                        color: 'var(--green)',
                        fontWeight: 600,
                      }}
                    >
                      {label} <ArrowUpRight size={13} />
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
                    Message envoyé !
                  </h2>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 28 }}>
                    Merci pour votre intérêt pour Vineria. Nous vous répondrons avec attention dans les deux jours ouvrables.
                  </p>
                  <Link href="/" className="btn btn--primary">
                    Retour à l'accueil
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
                    <h2 className="display--md serif" style={{ fontSize: 22, margin: '0 0 6px' }}>Envoyez-nous un message</h2>
                    <p style={{ fontSize: 13.5, color: 'var(--muted)' }}>Réponse sous 48h ouvrables. Tous les champs marqués * sont obligatoires.</p>
                  </div>

                  <div className="grid-responsive-2" style={{ gap: 16 }}>
                    <label>
                      Prénom & Nom *
                      <input
                        required
                        name="name"
                        placeholder="Fatima Ben Salah"
                        className="field"
                        id="contact-name"
                      />
                    </label>
                    <label>
                      E-mail *
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="fatima@example.com"
                        className="field"
                        id="contact-email"
                      />
                    </label>
                  </div>

                  <label>
                    Organisation / Entreprise
                    <input
                      name="organization"
                      placeholder="Votre société, coopérative ou projet"
                      className="field"
                      id="contact-org"
                    />
                  </label>

                  <label>
                    Vous êtes... *
                    <select
                      required
                      name="interestType"
                      className="field"
                      id="contact-interest"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                    >
                      <option value="">Choisissez votre intérêt…</option>
                      {INTEREST_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Sujet *
                    <input
                      required
                      name="subject"
                      placeholder="Demande d'échantillons / Inscription Académie / Parrainage…"
                      className="field"
                      id="contact-subject"
                    />
                  </label>

                  <label>
                    Message *
                    <textarea
                      required
                      name="message"
                      placeholder="Décrivez votre projet, vos besoins ou vos questions. Plus vous êtes précis, mieux nous pourrons vous répondre."
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
                    {loading ? 'Envoi en cours…' : (
                      <>Envoyer le message <Send size={15} /></>
                    )}
                  </button>

                  <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.55 }}>
                    Vos données ne sont pas partagées avec des tiers. Elles sont utilisées uniquement pour vous répondre.
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
