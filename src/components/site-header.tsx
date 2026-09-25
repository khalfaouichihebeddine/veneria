'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Leaf, Languages } from 'lucide-react';
import { useLanguage } from './language-provider';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isArabic, toggleLanguage, t } = useLanguage();
  const navLinks = [
    { href: '/produits', label: t('products') },
    { href: '/services', label: t('services') },
    { href: '/a-propos', label: t('method') },
    { href: '/contact', label: t('contact') },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        dir="ltr"
        style={{
          direction: 'ltr',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(250,247,240,0.96)' : 'rgba(250,247,240,0.80)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
          transition: 'all 0.3s var(--ease)',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <div
          className="container"
          dir="ltr"
          style={{
            direction: 'ltr',
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
            }}
            aria-label={`VINERIA — ${t('home')}`}
          >
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: 'linear-gradient(140deg, var(--green-deep), var(--green-mid))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Leaf size={16} color="white" />
            </span>
            <div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: 16,
                  letterSpacing: '0.12em',
                  color: 'var(--green-deep)',
                  lineHeight: 1,
                }}
              >
                VINERIA
              </div>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: '0.08em',
                  color: 'var(--muted)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  marginTop: 2,
                }}
              >
                {t('permaculture')}
              </div>
            </div>
          </Link>

          {/* Desktop nav — masqué sur mobile */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="site-nav-link">
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn btn--primary btn--sm"
              style={{ borderRadius: 8 }}
              id="header-cta"
            >
              {t('becomePartner')}
            </Link>
            <button type="button" onClick={toggleLanguage} className="language-switch" aria-label={isArabic ? t('switchToFrench') : t('switchToArabic')} title={isArabic ? t('switchToFrench') : t('switchToArabic')}>
              <Languages size={15} /> {isArabic ? 'FR' : 'ع'}
            </button>
          </nav>

          {/* Mobile toggle — visible UNIQUEMENT sur mobile, masqué sur PC */}
          <button
            className="mobile-menu-btn"
            aria-label={open ? (isArabic ? 'إغلاق القائمة' : 'Fermer le menu') : (isArabic ? 'فتح القائمة' : 'Ouvrir le menu')}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            id="mobile-menu-toggle"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(26,31,27,0.5)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setOpen(false)}
        >
          <nav
            onClick={(e) => e.stopPropagation()}
            dir="ltr"
            style={{
              direction: 'ltr',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(340px, 90vw)',
              background: 'var(--paper)',
              padding: '88px 28px 48px',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              boxShadow: '-12px 0 48px rgba(26,31,27,0.18)',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 16px',
                  borderRadius: 10,
                  fontSize: 17,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--green-pale)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ borderTop: '1px solid var(--line-light)', marginTop: 12, paddingTop: 18 }}>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn btn--primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {t('becomePartner')}
              </Link>
            </div>
            <button type="button" onClick={toggleLanguage} className="language-switch language-switch--drawer">
              <Languages size={16} /> {isArabic ? 'Français' : 'العربية'}
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
