'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Brain, Compass, Lock, Activity } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Hide mobile bottom nav on auth screens
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  const navItems = [
    {
      label: 'Analysis',
      href: '/self-analysis',
      icon: BarChart3,
    },
    {
      label: 'AI Coach',
      href: '/ai-coach',
      icon: Brain,
    },
    {
      label: '80/20',
      href: '/decomposition',
      icon: Compass,
    },
    {
      label: 'Blueprint',
      href: '/blueprint',
      icon: Lock,
    },
    {
      label: 'Health',
      href: '/health-score',
      icon: Activity,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-surface-base/95 backdrop-blur-lg border-t border-surface-border px-2 py-1.5 safe-area-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-h-[48px] min-w-[56px] px-2 py-1 rounded-xl transition-all ${
                isActive
                  ? 'text-indigo-400 bg-indigo-600/10 font-bold'
                  : 'text-surface-muted hover:text-surface-silver'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-indigo-400 scale-110' : 'text-surface-muted'}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
