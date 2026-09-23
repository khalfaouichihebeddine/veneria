'use client';
import Link from 'next/link';
import { Leaf, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer
      style={{
        background: 'linear-gradient(160deg, var(--green-deep) 0%, #152d1c 100%)',
        color: 'rgba(255,255,255,0.88)',
        marginTop: 0,
        padding: '72px 0 0',
      }}
    >
      <div className="container">
        <div
          className="grid-responsive-footer"
          style={{
            paddingBottom: 56,
            borderBottom: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Leaf size={18} color="white" />
              </span>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, letterSpacing: '0.14em', fontSize: 15, color: '#fff' }}>VINERIA</div>
                <div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Permaculture · Nord Tunisie</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', maxWidth: 280 }}>
              Ferme intégrée conduite en sec, sans intrants de synthèse. Amandiers, oliviers, romarin et ruches dans un système qui s'alimentent mutuellement.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 }}>
              {['100% Sec', 'Zéro Intrant', 'Traçabilité Lot', 'Parité Rurale'].map((b) => (
                <span
                  key={b}
                  style={{
                    background: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 100,
                    padding: '5px 12px',
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.75)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 18 }}>Navigation</div>
            {[
              ['/', 'Accueil'],
              ['/produits', 'Nos Produits'],
              ['/services', 'Services & Académie'],
              ['/a-propos', 'Notre Méthode'],
              ['/contact', 'Contact'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'block',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.68)',
                  padding: '6px 0',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.68)')}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Produits */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 18 }}>Nos Récoltes</div>
            {[
              ['Huiles Essentielles', '/produits'],
              ['Miel & Produits Ruche', '/produits'],
              ['Amandes de Terroir', '/produits'],
              ['Huile d\'Olive', '/produits'],
              ['Volumes Professionnels', '/contact'],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                style={{
                  display: 'block',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.68)',
                  padding: '6px 0',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.68)')}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 18 }}>Nous Trouver</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <MapPin size={16} style={{ color: 'var(--amber)', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,0.68)' }}>
                  Domaine Vineria<br />Nord de la Tunisie
                </span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Phone size={16} style={{ color: 'var(--amber)', flexShrink: 0 }} />
                <a href="tel:+21671890120" style={{ fontSize: 14, color: 'rgba(255,255,255,0.68)', transition: 'color 0.2s' }}>
                  +216 71 890 120
                </a>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Mail size={16} style={{ color: 'var(--amber)', flexShrink: 0 }} />
                <a href="mailto:contact@vineria-tunisie.com" style={{ fontSize: 14, color: 'rgba(255,255,255,0.68)', transition: 'color 0.2s' }}>
                  contact@vineria-tunisie.com
                </a>
              </div>
              <Link
                href="/contact"
                style={{
                  marginTop: 8,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'var(--ochre)',
                  color: '#fff',
                  padding: '11px 18px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  width: 'fit-content',
                }}
              >
                Écrire à Vineria <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            padding: '22px 0',
          }}
        >
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>
            © {new Date().getFullYear()} VINERIA — Ferme intégrée en permaculture. Tous droits réservés.
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}>
            Produire en sec. Transmettre ce qui marche.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
