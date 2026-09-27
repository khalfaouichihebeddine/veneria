import type { Metadata, Viewport } from 'next';
import './globals.css';

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
    "Vineria est une exploitation agricole intégrée au nord de la Tunisie : amandiers, oliviers, romarin et ruches conduits en permaculture sèche.",
  openGraph: {
    siteName: 'VINERIA',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
