import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import MobileBottomNav from '@/components/MobileBottomNav';

export const metadata: Metadata = {
  title: 'LifePipeline — Psychological Execution & Life Blueprint Engine',
  description: 'Eliminate scattered thoughts, define multi-year life blueprints, and lock radical focus with time-locked commitments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-surface-base text-surface-silver min-h-screen flex flex-col antialiased selection:bg-indigo-600 selection:text-white pb-16 md:pb-0">
        <Navbar />
        <main className="flex-1">{children}</main>
        <MobileBottomNav />
      </body>
    </html>
  );
}
