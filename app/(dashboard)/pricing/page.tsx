'use client';

import { useState } from 'react';
import { Check, Sparkles, Shield, ArrowRight, Zap, Users, Building, Lock } from 'lucide-react';
import { getActiveUser } from '@/lib/storage/userManager';

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const user = getActiveUser();

  const handleCheckout = async (planId: string) => {
    setLoadingPlan(planId);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          email: user?.email || 'founder@lifepipeline.internal',
          userId: user?.id || 'anonymous',
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      id: 'operator',
      name: 'Solo Operator',
      price: 29,
      period: '/month',
      badge: 'Most Popular for Founders',
      description: 'Master personal execution, eradicate routine drift, and lock high-leverage milestones.',
      features: [
        'Pareto 80/20 Cognitive Decomposition Engine',
        '3 to 6-Month Psychological Time-Lock Silo',
        'Gemini Flash AI Life Coach (Unlimited Access)',
        'Mode 1: Visual Self-Analysis & Gap Diagnosis',
        'Embedded Pomodoro Micro-Sprint Chimes',
        'Continuous Health Score & Velocity Recalibration',
      ],
      isPopular: true,
      buttonText: 'Deploy Operator Tier',
    },
    {
      id: 'family',
      name: 'Family & Dynasty Plan',
      price: 79,
      period: '/month',
      badge: 'Family Beta Standard',
      description: 'Up to 5 private member workspaces for your family cohort or co-founders with shared accountability.',
      features: [
        'Everything in Solo Operator Tier',
        'Up to 5 Isolated Private Accounts & Logins',
        'Individual Master Passwords & Private Blueprints',
        '1-Click Instant Family Switcher Deck',
        'Cross-Member Accountability & Traffic Light Pod',
        'Priority Gemini Flash Cloud Reasoning Queue',
      ],
      isPopular: false,
      buttonText: 'Lock Family Cohort',
    },
    {
      id: 'squad',
      name: 'Enterprise Execution Squad',
      price: 199,
      period: '/month',
      badge: 'For B2B Sales & Startups',
      description: 'Designed for venture cohorts, enterprise sales closers, and high-agency operational squads.',
      features: [
        'Everything in Family Tier',
        'Squad Velocity Leaderboard & Friction Matrix',
        'Weekly Institutional Pareto Execution Audit',
        'Custom Archetype Engineering & SLA Support',
        'Slack & Microsoft Teams Automated Execution Webhooks',
        'Dedicated Psychological Execution Strategist',
      ],
      isPopular: false,
      buttonText: 'Activate Enterprise Squad',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-600/30 bg-indigo-600/10 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Institutional SaaS Monetization Engine • Stripe Integrated</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-surface-silver tracking-tight mb-4">
          Invest in Your Highest-Leverage <br />
          <span className="text-indigo-400">Execution Capacity.</span>
        </h1>
        <p className="text-sm sm:text-base text-surface-muted">
          Stop losing thousands of dollars to routine busywork and friction. Choose the tier engineered for your operational scale.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`rounded-3xl p-8 border flex flex-col justify-between transition-all relative ${
              p.isPopular
                ? 'bg-surface-card border-indigo-600 shadow-2xl shadow-indigo-600/20'
                : 'bg-surface-card/60 border-surface-border hover:border-surface-muted'
            }`}
          >
            {p.isPopular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-600/40">
                {p.badge}
              </span>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-surface-silver">{p.name}</h3>
                {!p.isPopular && (
                  <span className="text-[10px] font-semibold uppercase text-surface-muted px-2 py-0.5 rounded bg-surface-elevated">
                    {p.badge}
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl sm:text-5xl font-black text-white">\${p.price}</span>
                <span className="text-sm font-semibold text-surface-muted">{p.period}</span>
              </div>

              <p className="text-xs text-surface-muted mb-8 leading-relaxed">{p.description}</p>

              <div className="space-y-3.5 pt-6 border-t border-surface-border mb-8">
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-surface-silver">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleCheckout(p.id)}
              disabled={loadingPlan === p.id}
              className={`w-full min-h-[50px] py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 ${
                p.isPopular
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-surface-elevated hover:bg-indigo-600 hover:text-white text-surface-silver border border-surface-border'
              }`}
            >
              {loadingPlan === p.id ? 'Connecting to Stripe...' : p.buttonText}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="max-w-4xl mx-auto clean-card p-6 rounded-2xl border border-surface-border flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/15 border border-indigo-600/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-surface-silver">14-Day Radical Execution Guarantee</h4>
            <p className="text-xs text-surface-muted mt-0.5">
              If LifePipeline does not 2x your Vital 20% output within 14 days, receive a 100% refund with zero questions asked.
            </p>
          </div>
        </div>

        <div className="text-xs text-surface-muted flex items-center gap-2 shrink-0">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>
    </div>
  );
}
