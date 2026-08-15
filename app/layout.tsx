import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://travellogistics.com'),
  title: {
    default: 'TravelLogistics: Origin-to-Destination Travel Guide',
    template: '%s | TravelLogistics',
  },
  description:
    'Instant logistical comparison for international travel: Power plug types, electrical voltage, visa rules, currency & eSIM internet.',
  keywords: [
    'travel logistics',
    'power plug adapter',
    'travel voltage converter',
    'visa requirements',
    'travel esim',
    'travel electricity guide',
  ],
  authors: [{ name: 'TravelLogistics Team' }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
