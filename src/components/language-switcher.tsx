'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      dir="ltr"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        background: 'rgba(0,0,0,0.04)',
        borderRadius: 8,
        padding: '3px 4px',
        border: '1px solid var(--line-light)',
        opacity: isPending ? 0.6 : 1,
        transition: 'opacity 0.2s',
      }}
    >
      {(['fr', 'ar'] as const).map((lng) => (
        <button
          key={lng}
          onClick={() => switchLocale(lng)}
          type="button"
          id={`lang-switch-${lng}`}
          style={{
            padding: '4px 10px',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.06em',
            transition: 'all 0.2s',
            background: locale === lng ? 'var(--green)' : 'transparent',
            color: locale === lng ? '#fff' : 'var(--muted)',
          }}
          aria-current={locale === lng ? 'true' : undefined}
          aria-label={`Switch to ${lng === 'fr' ? 'Français' : 'العربية'}`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
