'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { signupUser } from '@/lib/storage/userManager';
import { UserRole } from '@/types';

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('business_owner');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const res = signupUser({
      name: fullName,
      email,
      password,
      role
    });

    if (!res.success) {
      setErrorMsg(res.error || 'Failed to create profile');
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push('/self-analysis');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md clean-card p-8 rounded-2xl border border-surface-border shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center mx-auto mb-3">
            <Compass className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-surface-silver tracking-tight">Create LifePipeline Account</h2>
          <p className="text-sm text-surface-muted mt-1">
            Build your high-leverage blueprint in minutes
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}


        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-surface-muted mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-surface-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Mercer"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-base border border-surface-border focus:border-indigo-600 focus:outline-none text-surface-silver text-sm placeholder-surface-muted transition-colors"
              />
            </div>
          </div>

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
                placeholder="you@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-base border border-surface-border focus:border-indigo-600 focus:outline-none text-surface-silver text-sm placeholder-surface-muted transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-surface-muted mb-1.5">
              Create Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-surface-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-base border border-surface-border focus:border-indigo-600 focus:outline-none text-surface-silver text-sm placeholder-surface-muted transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-surface-muted mb-1.5">
              Select Your Archetype
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-base border border-surface-border focus:border-indigo-600 focus:outline-none text-surface-silver text-sm transition-colors"
            >
              <option value="business_owner">Business Owner / Founder</option>
              <option value="student">Student / Academic</option>
              <option value="freelancer">Freelancer / Creator</option>
              <option value="professional">Corporate Professional</option>
              <option value="housewife">Homemaker / Life Manager</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating Account...' : 'Create Private Profile & Launch'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-surface-muted mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4">
            Sign In
          </Link>
        </p>
      </div>

    </div>
  );
}
