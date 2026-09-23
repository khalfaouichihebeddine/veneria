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
    default: 'فينيريا — مزرعة بيئية متكاملة بالزراعة المستدامة، شمال تونس',
    template: '%s | VINERIA',
  },
  description:
    'فينيريا مزرعة نموذجية متكاملة في شمال تونس: بساتين لوز، زيتون، إكليل جبل ومناحل تدار بالزراعة الجافة المستدامة. زيوت عطرية، عسل طبيعي، لوز وزيت زيتون بكر ممتاز — وتكوين للفلاحين في المنطقة.',
  keywords: [
    'الزراعة المستدامة تونس',
    'زيت إكليل الجبل العطري العضوي',
    'عسل بري تونسي',
    'لوز عضوي',
    'زيت زيتون بكر ممتاز تونس',
    'الزراعة الجافة المتوسطية',
    'تكوين في الإيكولوجيا الفلاحية',
    'أكاديمية فينيريا',
    'مزرعة متكاملة شمال تونس',
  ],
  openGraph: {
    siteName: 'فينيريا — VINERIA',
    locale: 'ar_TN',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" suppressHydrationWarning>
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
