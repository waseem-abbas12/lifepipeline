'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Compass, Mail, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    // If Supabase credentials are configured, execute live auth
    if (supabaseUrl && supabaseUrl.includes('supabase.co')) {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }
    } else {
      // Local fallback simulation for rapid testing
      localStorage.setItem('lifepipeline_user', JSON.stringify({ email, authenticated: true }));
    }

    setLoading(false);
    router.push('/role-selection');
  };

  const handleDemoLogin = () => {
    localStorage.setItem('lifepipeline_user', JSON.stringify({ 
      email: 'founder@lifepipeline.io', 
      authenticated: true,
      demoMode: true 
    }));
    router.push('/role-selection');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-gray-800 shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-3">
            <Compass className="w-6 h-6 text-brand-500" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Access LifePipeline</h2>
          <p className="text-sm text-gray-400 mt-1">
            Sign in to access your life blueprint and time-locks
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900/80 border border-gray-700 focus:border-brand-500 focus:outline-none text-white text-sm placeholder-gray-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
              Master Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900/80 border border-gray-700 focus:border-brand-500 focus:outline-none text-white text-sm placeholder-gray-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-bold text-sm tracking-wide transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <span className="relative px-3 bg-surface-card text-xs text-gray-500 uppercase tracking-widest font-semibold">
            Or Quick Explore
          </span>
        </div>

        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-2.5 px-4 rounded-xl border border-gray-700 hover:border-gray-500 text-gray-300 font-medium text-xs transition-colors flex items-center justify-center gap-2 bg-gray-800/40"
        >
          <ShieldCheck className="w-4 h-4 text-brand-400" />
          Continue with 1-Click Sandbox Mode
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">
          Don't have an account yet?{' '}
          <Link href="/signup" className="text-brand-500 hover:text-brand-400 font-semibold underline underline-offset-4">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
