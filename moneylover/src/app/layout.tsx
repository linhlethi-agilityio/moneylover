import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// Constants
import { SITE_URL } from '@/constants';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Money Lover',
  description: 'A personal finance management app to track wallets, transactions',
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Money Lover',
    description: 'A personal finance management app to track wallets, transactions',
    siteName: 'Money Lover',
    url: SITE_URL,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
