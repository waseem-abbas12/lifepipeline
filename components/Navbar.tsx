'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, ShieldCheck, UserCheck, Lock } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border/60 bg-surface-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              Life<span className="text-brand-500">Pipeline</span>
            </span>
            <span className="block text-[10px] tracking-widest uppercase font-semibold text-gray-400">
              Execution Architecture
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/blueprint"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              pathname === '/blueprint'
                ? 'bg-brand-500/10 text-brand-500 border border-brand-500/30'
                : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">Life Blueprint</span>
          </Link>

          <Link
            href="/decomposition"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              pathname === '/decomposition'
                ? 'bg-brand-500/10 text-brand-500 border border-brand-500/30'
                : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
            }`}
          >
            <Lock className="w-4 h-4 text-brand-400" />
            <span className="hidden sm:inline">80/20 Decomposition</span>
          </Link>

          <Link
            href="/health-score"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              pathname === '/health-score'
                ? 'bg-brand-500/10 text-brand-500 border border-brand-500/30'
                : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Traffic Light Health</span>
          </Link>

          <Link
            href="/role-selection"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              pathname === '/role-selection'
                ? 'bg-brand-500/10 text-brand-500 border border-brand-500/30'
                : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Role Setup</span>
          </Link>

          <Link
            href="/login"
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              pathname === '/login' || pathname === '/signup'
                ? 'bg-brand-500 text-black shadow-md shadow-brand-500/25'
                : 'text-gray-200 border border-gray-700 hover:border-gray-500 hover:bg-gray-800/50'
            }`}
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
