'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, Mail, Lock, ArrowRight, ShieldCheck, AlertCircle, Users, CheckCircle2 } from 'lucide-react';
import { loginUser, getAllUsers, setActiveUserId } from '@/lib/storage/userManager';
import { FamilyUser } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const users = getAllUsers();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const res = loginUser(email, password);
    if (!res.success) {
      setErrorMsg(res.error || 'Failed to authenticate');
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push('/self-analysis');
  };

  const handleQuickLoginAs = (user: FamilyUser) => {
    setEmail(user.email);
    setPassword(user.password || '123456');
    const res = loginUser(user.email, user.password || '123456');
    if (res.success) {
      router.push('/self-analysis');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md clean-card p-6 sm:p-8 rounded-2xl border border-surface-border shadow-2xl relative">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/15 border border-indigo-600/30 flex items-center justify-center mx-auto mb-3 shadow-md shadow-indigo-600/20">
            <Compass className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-black text-surface-silver tracking-tight">Access LifePipeline</h2>
          <p className="text-xs sm:text-sm text-surface-muted mt-1">
            Sign in to your private SaaS execution and AI coaching environment
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 1-Click Family Member Quick Login Deck */}
        <div className="mb-6 p-3.5 rounded-xl bg-surface-elevated/60 border border-surface-border">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-surface-muted flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              1-Click Family Member Login
            </span>
            <span className="text-[10px] text-surface-muted font-mono">pwd: 123456</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {users.slice(0, 4).map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleQuickLoginAs(u)}
                className="min-h-[46px] px-2.5 py-2 rounded-lg bg-surface-card hover:bg-indigo-600/10 hover:border-indigo-600/40 border border-surface-border text-left transition-all flex items-center gap-2 group"
              >
                <div className="w-7 h-7 rounded-md bg-indigo-600/20 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {u.avatar}
                </div>
                <div className="truncate">
                  <div className="text-xs font-semibold text-surface-silver truncate">{u.name.split(' ')[0]}</div>
                  <div className="text-[9px] text-surface-muted capitalize truncate">{u.role.replace('_', ' ')}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-surface-muted mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-surface-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@lifepipeline.internal"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-base border border-surface-border focus:border-indigo-600 focus:outline-none text-surface-silver text-sm placeholder-surface-muted transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-surface-muted mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-surface-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-base border border-surface-border focus:border-indigo-600 focus:outline-none text-surface-silver text-sm placeholder-surface-muted transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In To Your Profile'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-surface-muted mt-6">
          Need a separate family profile?{' '}
          <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4">
            Create Profile
          </Link>
        </p>
      </div>
    </div>
  );
}
