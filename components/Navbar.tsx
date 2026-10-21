'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, UserCheck, Lock, Activity } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-surface-base/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30 group-hover:bg-indigo-500 transition-colors">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              Life<span className="text-indigo-500">Pipeline</span>
            </span>
            <span className="block text-[10px] tracking-widest uppercase font-semibold text-surface-muted">
              Execution Architecture
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/blueprint"
            className={`min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
              pathname === '/blueprint'
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-600/40'
                : 'text-surface-muted hover:text-surface-silver hover:bg-surface-elevated'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">Life Blueprint</span>
          </Link>

          <Link
            href="/decomposition"
            className={`min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
              pathname === '/decomposition'
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-600/40'
                : 'text-surface-muted hover:text-surface-silver hover:bg-surface-elevated'
            }`}
          >
            <Lock className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">80/20 Engine</span>
          </Link>

          <Link
            href="/health-score"
            className={`min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
              pathname === '/health-score'
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-600/40'
                : 'text-surface-muted hover:text-surface-silver hover:bg-surface-elevated'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span className="hidden sm:inline">Health Score</span>
          </Link>

          <Link
            href="/role-selection"
            className={`min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
              pathname === '/role-selection'
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-600/40'
                : 'text-surface-muted hover:text-surface-silver hover:bg-surface-elevated'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span className="hidden md:inline">Roles</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
