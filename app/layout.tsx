import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import MobileBottomNav from '@/components/MobileBottomNav';

export const metadata: Metadata = {
  title: 'LifePipeline — Psychological Execution & Life Blueprint Engine',
  description: 'Eliminate scattered thoughts, define multi-year life blueprints, and lock radical focus with time-locked commitments.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B0F19',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ backgroundColor: '#0B0F19', color: '#F3F4F6' }}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          html, body {
            background-color: #0B0F19 !important;
            color: #F3F4F6 !important;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          a {
            color: inherit;
            text-decoration: none;
          }
        `}} />
      </head>
      <body className="bg-surface-base text-surface-silver min-h-screen flex flex-col antialiased selection:bg-indigo-600 selection:text-white pb-16 md:pb-0" style={{ backgroundColor: '#0B0F19', color: '#F3F4F6' }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <MobileBottomNav />
      </body>
    </html>
  );
}
