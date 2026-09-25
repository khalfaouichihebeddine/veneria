'use client';
import Link from 'next/link';
import { Leaf, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { useLanguage } from './language-provider';

export function SiteFooter() {
  const { isArabic, t } = useLanguage();

  const footerNavigation = [
    ['/', t('home')],
    ['/produits', t('products')],
    ['/services', t('services')],
    ['/a-propos', t('method')],
    ['/contact', t('contact')],
  ];

  const badges = isArabic
    ? ['100% نظام جاف', 'صفر مدخلات كيميائية', 'تتبع دقيق للمصدر', 'مساواة في الأجر']
    : ['100 % conduite sèche', 'Zéro intrant chimique', 'Traçabilité précise', 'Égalité salariale'];

  const productLinks = isArabic
    ? [
        ['الزيوت العطرية النقية', '/produits'],
        ['العسل ومنتجات النحل', '/produits'],
        ['لوز أصيل بالزراعة الجافة', '/produits'],
        ['زيت زيتون بكر ممتاز', '/produits'],
        ['طلبيات مهنية B2B', '/contact'],
      ]
    : [
        ['Huiles essentielles pures', '/produits'],
        ['Miel et produits de la ruche', '/produits'],
        ['Amandes du terroir en conduite sèche', '/produits'],
        ['Huile d’olive vierge extra', '/produits'],
        ['Commandes professionnelles B2B', '/contact'],
      ];

  return (
    <footer
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        background: 'linear-gradient(160deg, var(--green-deep) 0%, #152d1c 100%)',
        color: 'rgba(255,255,255,0.88)',
        marginTop: 0,
        padding: '72px 0 0',
        direction: isArabic ? 'rtl' : 'ltr',
        textAlign: isArabic ? 'right' : 'left',
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
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, letterSpacing: '0.14em', fontSize: 16, color: '#fff' }}>VINERIA</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{t('permaculture')}</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.68)', maxWidth: 280 }}>
              {isArabic
                ? 'مزرعة نموذجية متكاملة تدار بالنظام الجاف، دون مدخلات كيميائية. بساتين لوز وزيتون ومزارع إكليل جبل ومناحل ضمن منظومة حية متكاملة تغذي بعضها البعض.'
                : 'Ferme modèle intégrée conduite en agriculture sèche, sans intrants chimiques. Amandiers, oliviers, romarin et ruchers forment un écosystème vivant et complémentaire.'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 }}>
              {badges.map((b) => (
                <span
                  key={b}
                  style={{
                    background: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 100,
                    padding: '5px 12px',
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 18 }}>
              {isArabic ? 'التنقل السريع' : 'Navigation rapide'}
            </div>
            {footerNavigation.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'block',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.72)',
                  padding: '6px 0',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.72)')}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Produits */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 18 }}>
              {isArabic ? 'محاصيلنا ومنتجاتنا' : 'Nos récoltes et produits'}
            </div>
            {productLinks.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                style={{
                  display: 'block',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.72)',
                  padding: '6px 0',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.72)')}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 18 }}>
              {isArabic ? 'موقعنا والتواصل' : 'Nous trouver et nous contacter'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <MapPin size={16} style={{ color: 'var(--amber)', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)' }}>
                  {isArabic ? <>ضيعة فينيريا<br />شمال تونس</> : <>Ferme Vineria<br />Nord de la Tunisie</>}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Phone size={16} style={{ color: 'var(--amber)', flexShrink: 0 }} />
                <a href="tel:+21671890120" style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)', transition: 'color 0.2s', direction: 'ltr', textAlign: 'left' }}>
                  +216 71 890 120
                </a>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Mail size={16} style={{ color: 'var(--amber)', flexShrink: 0 }} />
                <a href="mailto:contact@vineria-tunisie.com" style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)', transition: 'color 0.2s' }}>
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
                {isArabic ? 'مراسلة فينيريا' : 'Écrire à Vineria'} <ArrowUpRight size={14} style={{ transform: isArabic ? 'scaleX(-1)' : 'none' }} />
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
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
            {isArabic
              ? `© ${new Date().getFullYear()} فينيريا — مزرعة بيئية متكاملة بالزراعة المستدامة. جميع الحقوق محفوظة.`
              : `© ${new Date().getFullYear()} Vineria — Ferme écologique intégrée en agriculture durable. Tous droits réservés.`}
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>
            {isArabic
              ? 'الإنتاج في النظام الجاف. ونقل ما أثبت نجاحه ميدانياً.'
              : 'Produire en conduite sèche. Transmettre ce qui a fait ses preuves sur le terrain.'}
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
