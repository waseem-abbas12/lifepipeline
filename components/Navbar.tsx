'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, UserCheck, Lock, Activity, Sparkles } from 'lucide-react';
import UserSwitcher from '@/components/UserSwitcher';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-surface-base/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30 group-hover:bg-indigo-500 transition-colors">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              Life<span className="text-indigo-400">Pipeline</span>
            </span>
            <span className="hidden sm:block text-[9px] tracking-widest uppercase font-semibold text-surface-muted">
              Psychological Execution
            </span>
          </div>
        </Link>

        {/* Navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-1.5">
          <Link
            href="/self-analysis"
            className={`min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              pathname === '/self-analysis'
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-600/40'
                : 'text-surface-muted hover:text-surface-silver hover:bg-surface-elevated'
            }`}
          >
            <Activity className="w-4 h-4 shrink-0 text-indigo-400" />
            <span>Self-Analysis</span>
          </Link>

          <Link
            href="/ai-coach"
            className={`min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              pathname === '/ai-coach'
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-600/40'
                : 'text-surface-muted hover:text-surface-silver hover:bg-surface-elevated'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0 text-indigo-400" />
            <span>AI Coach</span>
          </Link>

          <Link
            href="/decomposition"
            className={`min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              pathname === '/decomposition'
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-600/40'
                : 'text-surface-muted hover:text-surface-silver hover:bg-surface-elevated'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0 text-indigo-400" />
            <span>80/20 Engine</span>
          </Link>

          <Link
            href="/blueprint"
            className={`min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              pathname === '/blueprint'
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-600/40'
                : 'text-surface-muted hover:text-surface-silver hover:bg-surface-elevated'
            }`}
          >
            <Lock className="w-4 h-4 shrink-0 text-indigo-400" />
            <span>Blueprint</span>
          </Link>
        </nav>

        {/* Multi-User Family Beta Switcher */}
        <div className="shrink-0">
          <UserSwitcher />
        </div>
      </div>
    </header>
  );
}

