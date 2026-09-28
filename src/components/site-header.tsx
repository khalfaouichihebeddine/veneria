'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';

export function SiteHeader() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const NAV_LINKS = [
    { href: '/produits' as const, label: t('products') },
    { href: '/services' as const, label: t('services') },
    { href: '/a-propos' as const, label: t('about') },
    { href: '/contact' as const, label: t('contact') },
  ];

  return (
    <>
      {/* Header is always LTR regardless of locale */}
      <header
        dir="ltr"
        style={{
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
          style={{
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          {/* Logo — always left */}
          <Link
            href="/"
            locale={locale}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
            }}
            aria-label={t('brandLabel')}
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
                {t('brandSubtitle')}
              </div>
            </div>
          </Link>

          {/* Desktop nav — always in LTR order: Produits, Services, À propos, Contact */}
          <nav className="desktop-nav">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} locale={locale} className="site-nav-link">
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              locale={locale}
              className="btn btn--primary btn--sm"
              style={{ borderRadius: 8 }}
              id="header-cta"
            >
              {t('partnerCta')}
            </Link>
            {/* Language switcher — always rightmost, LTR */}
            <LanguageSwitcher />
          </nav>

          {/* Mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="mobile-lang-switcher">
              <LanguageSwitcher />
            </div>
            <button
              className="mobile-menu-btn"
              aria-label={open ? t('closeMenu') : t('openMenu')}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              id="mobile-menu-toggle"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — always LTR */}
      {open && (
        <div
          dir="ltr"
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
            style={{
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                locale={locale}
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
                locale={locale}
                onClick={() => setOpen(false)}
                className="btn btn--primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {t('partnerCta')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
