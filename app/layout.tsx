import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

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
      <body className="bg-surface-dark text-gray-100 min-h-screen flex flex-col antialiased selection:bg-brand-500 selection:text-black">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
