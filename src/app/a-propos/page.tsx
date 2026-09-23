import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import { VALUE_PILLARS, PERMACULTURE_WORKSHOPS, VINERIA_INFO } from '@/lib/vineria-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notre Méthode & Vision | VINERIA',
  description:
    'Vineria est une exploitation agricole intégrée au nord de la Tunisie. Découvrez notre méthode de permaculture en régime sec, nos 5 valeurs concrètes et notre engagement pour l\'agriculture paysanne et l\'inclusion des femmes rurales.',
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
              Présentation de l'entreprise
            </span>
            <h1
              className="display animate-fade-up animate-delay-1"
              style={{ color: '#fff', margin: '0 0 28px', textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}
            >
              Une méthode, pas une filière.
            </h1>
            <p
              className="animate-fade-up animate-delay-2"
              style={{ fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.78)', maxWidth: 640, marginBottom: 38 }}
            >
              {VINERIA_INFO.summary}
            </p>
            <div className="animate-fade-up animate-delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/produits" className="btn btn--ochre" id="about-hero-produits">
                Nos produits <ArrowUpRight size={15} />
              </Link>
              <Link href="/contact" className="btn btn--ghost" id="about-hero-contact">
                Nous écrire
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
              <span className="eyebrow">Qui nous sommes</span>
              <div className="accent-line" style={{ display: 'block', marginTop: 12 }} />
              <h2 className="display--md serif" style={{ margin: '16px 0 22px' }}>
                Vineria, Nord de la Tunisie.
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 20 }}>
                Vineria est une exploitation agricole intégrée située au nord de la Tunisie. <strong style={{ color: 'var(--ink)' }}>Amandiers, oliviers, romarin et ruches</strong> y sont conduits sur un même système, selon les principes de la permaculture.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 20 }}>
                L'entreprise ne se définit pas par une filière mais par une méthode : <strong style={{ color: 'var(--ink)' }}>produire en sec, sans intrants de synthèse</strong>, en faisant travailler les gens du territoire, et en transmettant ce qui marche aux exploitations voisines.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
                {[
                  'Fondée en 2022 au Nord de la Tunisie',
                  'Système intégré sur 32 hectares en conduite sèche',
                  '75 ruches, 4 000+ amandiers et oliviers',
                  'Aucun intrant chimique ou pesticide de synthèse',
                ].map((fact) => (
                  <div key={fact} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--green)', flexShrink: 0 }} />
                    <span style={{ fontSize: 14.5, color: 'var(--ink-soft)', fontWeight: 500 }}>{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3' }}>
              <Image
                src="/images/hero-farm.jpg"
                alt="Vue aérienne du domaine Vineria — verger intégré de permaculture en Tunisie"
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
                {[['32 ha', 'En permaculture'], ['75 ruches', 'En production'], ['2022', 'Fondée en']].map(([val, label]) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: 18, fontFamily: "'Playfair Display', Georgia, serif" }}>{val}</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>{label}</div>
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
          <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 48px' }}>
            <span className="eyebrow">Le modèle</span>
            <div className="accent-line" style={{ display: 'block', margin: '14px auto' }} />
            <h2 className="display--md serif" style={{ margin: '0 0 16px' }}>
              Rien ne sort seul.
            </h2>
            <p className="lead">
              C'est le cœur de notre modèle, et ce qui nous distingue d'une exploitation classique. Chaque atelier alimente les autres.
            </p>
          </div>

          <div className="card" style={{ overflow: 'auto', padding: 0 }}>
            <table className="feature-table">
              <thead>
                <tr>
                  <th>Atelier</th>
                  <th>Ce qu'il produit</th>
                  <th>Ce qu'il apporte au système</th>
                </tr>
              </thead>
              <tbody>
                {PERMACULTURE_WORKSHOPS.map((w) => (
                  <tr key={w.id}>
                    <td style={{ fontWeight: 600, color: 'var(--ink)', minWidth: 140 }}>
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
                  <td style={{ fontWeight: 600, color: 'var(--ink)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 20 }}>♻️</span>
                      Sol & Compost vivant
                    </div>
                  </td>
                  <td style={{ color: 'var(--ink-soft)' }}>Humus fertile, amendement biologique</td>
                  <td style={{ color: 'var(--muted)' }}>Recycle 100% des résidus de taille, de distillation et de trituration oléicole</td>
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
              fontSize: 14,
              color: 'var(--green-deep)',
              lineHeight: 1.65,
              fontStyle: 'italic',
            }}
          >
            💡 Un déchet de l'un est une ressource de l'autre. La paille de distillation retourne au compost, la taille protège le sol, les abeilles augmentent la nouaison des amandiers. C'est ce qui rend l'ensemble viable en régime sec — et exactement ce que nous enseignons.
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NOS VALEURS — DÉTAIL COMPLET
      ══════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 52px' }}>
            <span className="eyebrow">Nos engagements</span>
            <div className="accent-line" style={{ display: 'block', margin: '14px auto' }} />
            <h2 className="display--md serif" style={{ margin: '0 0 16px' }}>
              Nos valeurs, traduites en pratiques.
            </h2>
            <p className="lead">Nous évitons les déclarations d'intention. Voici ce que chaque valeur veut dire concrètement chez nous.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {VALUE_PILLARS.map((pillar, i) => (
              <div
                key={pillar.id}
                className="card grid-responsive-split"
                style={{
                  padding: 'clamp(24px, 4vw, 40px)',
                  alignItems: 'start',
                  border: '1.5px solid var(--line-light)',
                }}
              >
                <div>
                  <span className="eyebrow eyebrow--green" style={{ fontSize: 10, display: 'block', marginBottom: 10 }}>
                    Valeur 0{i + 1} / {VALUE_PILLARS.length.toString().padStart(2, '0')}
                  </span>
                  <h3 className="display--md serif" style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', margin: '0 0 8px', color: 'var(--ink)' }}>
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
                        <CheckCircle2 size={15} style={{ color: 'var(--green)', flexShrink: 0, marginTop: 3 }} />
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
                alt="Session de formation de l'Académie Vineria — Compostage et fertilité des sols"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <span className="eyebrow">L'Académie Vineria</span>
              <div className="accent-line" style={{ display: 'block', marginTop: 12 }} />
              <h2 className="display--md serif" style={{ margin: '16px 0 20px', fontSize: 'clamp(22px, 3vw, 36px)' }}>
                Ce que nous apprenons n'a de valeur que partagé.
              </h2>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>
                La formation des petits agriculteurs n'est pas une activité annexe de communication : c'est un métier à part entière de l'entreprise. Sessions courtes, sur la ferme, en arabe, en petits groupes, avec suivi sur les parcelles des participants.
              </p>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 28 }}>
                <strong style={{ color: 'var(--ink)' }}>Public prioritaire :</strong> petits exploitants, femmes rurales, jeunes en installation.
              </p>
              <Link href="/services" className="btn btn--primary" id="about-academy-cta">
                Découvrir l'Académie <ArrowUpRight size={15} />
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
          <span className="eyebrow" style={{ color: '#f1c98d', display: 'block', marginBottom: 18 }}>Nous rejoindre</span>
          <h2 className="display--md serif" style={{ color: '#fff', margin: '0 0 20px' }}>
            Envie de travailler ensemble ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.70)', fontSize: 16, lineHeight: 1.75, maxWidth: 520, margin: '0 auto 36px' }}>
            Que vous soyez distributeur, bailleur de fonds, chercheur ou simplement curieux d'une récolte — nous répondons dans les deux jours.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn--ochre" id="about-contact-cta">
              Écrire à Vineria <ArrowUpRight size={15} />
            </Link>
            <Link href="/produits" className="btn btn--ghost" id="about-products-cta">
              Voir nos produits
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
