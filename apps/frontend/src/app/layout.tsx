import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { NotificationContainer } from '@/components/ui/notification';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ANADOLU REALM',
    template: '%s - ANADOLU REALM'
  },
  description: 'Türkiye\'nin ilk dijital metropol oyunu. Dijital Anadolu\'da kendi hikayenizi yazın. Powered by Lydian.',
  keywords: ['anadolu realm', 'türk oyunu', 'mmorpg', 'dijital metropol', 'pixel art', 'lydian'],
  authors: [{ name: 'ANADOLU REALM Team' }],
  creator: 'Lydian',
  publisher: 'ANADOLU REALM',
  applicationName: 'ANADOLU REALM',
  openGraph: {
    title: 'ANADOLU REALM',
    description: 'Dijital Anadolu\'nun Kapıları Açılıyor',
    siteName: 'ANADOLU REALM',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className={inter.className}>
        {children}
        <NotificationContainer />
      </body>
    </html>
  );
}
