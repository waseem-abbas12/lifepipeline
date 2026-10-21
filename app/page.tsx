import Link from 'next/link';
import { 
  ArrowRight, 
  Target, 
  Lock, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  ShieldCheck 
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-500 text-xs font-semibold tracking-wide uppercase mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Phase 1 Architecture Active</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Stop Scattered Thoughts. <br />
          <span className="bg-gradient-to-r from-brand-500 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Engineer Your Life Blueprint.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10 leading-relaxed">
          LifePipeline is a psychological execution engine designed for high-agency individuals. 
          Define your 1, 3, and 5-Year trajectories, lock in non-negotiable 3 to 6-month commitments, 
          and prepare for ruthless 80/20 daily execution.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/role-selection"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-bold text-base transition-all duration-200 shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
          >
            Start Dynamic Role Onboarding
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/blueprint"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gray-900 border border-gray-700 hover:border-gray-500 text-gray-200 font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-brand-500" />
            Open Life Blueprint Engine
          </Link>
        </div>

        {/* Phase 1 Core Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="glass-panel p-6 rounded-2xl border border-gray-800">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Dynamic Archetype Onboarding</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Adapts dynamically to Students, Business Owners, Freelancers, Professionals, and Homemakers with pre-engineered mental models.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-gray-800">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4 text-teal-400">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1, 3, & 5-Year Horizon Engine</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Anchor your long-term vision across life domains with measurable metrics and vivid, clarity-inducing vision statements.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-gray-800">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3 to 6-Month Time Lock</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Prevents shiny object syndrome by locking down your single highest-leverage focus with psychological stakes and countdown timers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
