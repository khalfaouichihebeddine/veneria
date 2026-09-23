import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider, SiteHeader, SiteFooter } from '@/components';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: 'VINERIA — Ferme intégrée en permaculture, Nord de la Tunisie',
    template: '%s | VINERIA',
  },
  description:
    'Vineria est une exploitation agricole intégrée au nord de la Tunisie : amandiers, oliviers, romarin et ruches conduits en permaculture sèche. Huiles essentielles, miel, amandes, huile d\'olive — et la transmission aux agriculteurs voisins.',
  keywords: [
    'permaculture Tunisie',
    'huile essentielle romarin bio',
    'miel sauvage tunisien',
    'amandes biologiques',
    'huile d\'olive vierge extra Tunisie',
    'agriculture sèche méditerranéenne',
    'formation agroécologie',
    'Académie Vineria',
    'ferme intégrée Nord Tunisie',
  ],
  openGraph: {
    siteName: 'VINERIA',
    locale: 'fr_TN',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
