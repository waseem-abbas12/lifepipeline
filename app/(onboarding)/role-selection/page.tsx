'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  GraduationCap, 
  TrendingUp, 
  Briefcase, 
  Award, 
  HeartHandshake, 
  Check, 
  ArrowRight, 
  Sparkles,
  Target
} from 'lucide-react';
import { ROLE_ARCHETYPES } from '@/lib/constants/roles';
import { UserRole } from '@/types';
import { createClient } from '@/lib/supabase/client';

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>('business_owner');
  const [saving, setSaving] = useState(false);

  const getRoleIcon = (roleId: UserRole) => {
    switch (roleId) {
      case 'student':
        return <GraduationCap className="w-6 h-6 text-emerald-400" />;
      case 'business_owner':
        return <TrendingUp className="w-6 h-6 text-brand-400" />;
      case 'freelancer':
        return <Briefcase className="w-6 h-6 text-teal-400" />;
      case 'professional':
        return <Award className="w-6 h-6 text-amber-400" />;
      case 'housewife':
        return <HeartHandshake className="w-6 h-6 text-rose-400" />;
      default:
        return <Target className="w-6 h-6 text-brand-400" />;
    }
  };

  const handleConfirmRole = async () => {
    setSaving(true);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (supabaseUrl && supabaseUrl.includes('supabase.co')) {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        await supabase
          .from('profiles')
          .update({
            role: selectedRole,
            onboarding_completed: true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
      }
    }

    // Always persist in local storage for fast state caching & demo usage
    localStorage.setItem('lifepipeline_active_role', selectedRole);
    setSaving(false);
    router.push('/blueprint');
  };

  const activeArchetype = ROLE_ARCHETYPES[selectedRole];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step 1: Psychological Identity Selection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Select Your Life Operating Archetype
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mt-2">
          LifePipeline alters its focus metrics, goal templates, and friction analysis depending on your current life domain.
        </p>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
        {(Object.keys(ROLE_ARCHETYPES) as UserRole[]).map((roleKey) => {
          const role = ROLE_ARCHETYPES[roleKey];
          const isSelected = selectedRole === roleKey;

          return (
            <button
              key={roleKey}
              onClick={() => setSelectedRole(roleKey)}
              className={`p-5 rounded-2xl text-left transition-all border flex flex-col justify-between relative group ${
                isSelected
                  ? 'bg-surface-card border-brand-500 shadow-xl shadow-brand-500/10 ring-1 ring-brand-500'
                  : 'bg-surface-card/50 border-gray-800 hover:border-gray-700 hover:bg-surface-card'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-gray-900 border border-gray-800">
                    {getRoleIcon(roleKey)}
                  </div>
                  {isSelected && (
                    <span className="w-6 h-6 rounded-full bg-brand-500 text-black flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white mb-1">{role.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-3">{role.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-800/80 text-[11px] font-semibold tracking-wider text-brand-400 uppercase">
                {isSelected ? 'Active Archetype' : 'Select'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Profile Preview & Blueprint Template Preview */}
      {activeArchetype && (
        <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-brand-500/30 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-800">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
                Tailored Psychological Profile
              </span>
              <h2 className="text-2xl font-bold text-white mt-0.5">{activeArchetype.title}</h2>
              <p className="text-sm text-gray-400 mt-1">{activeArchetype.tagline}</p>
            </div>

            <button
              onClick={handleConfirmRole}
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-bold text-sm tracking-wide shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all self-start md:self-center"
            >
              {saving ? 'Configuring Engine...' : 'Confirm Role & Open Life Blueprint'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
            {/* Focus areas */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-3">
                Pre-calibrated 80/20 Leverage Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeArchetype.suggestedFocusAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-700/80 text-xs font-medium text-gray-300 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Sample Blueprint Horizons */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-3">
                Sample Horizon Blueprint (Auto-Suggested)
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-gray-900/70 border border-gray-800">
                  <span className="font-semibold text-brand-400">1-Year Horizon:</span>{' '}
                  <span className="text-gray-300">{activeArchetype.defaultGoalsSample.oneYear}</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-900/70 border border-gray-800">
                  <span className="font-semibold text-teal-400">3-Year Horizon:</span>{' '}
                  <span className="text-gray-300">{activeArchetype.defaultGoalsSample.threeYear}</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-900/70 border border-gray-800">
                  <span className="font-semibold text-emerald-400">5-Year Horizon:</span>{' '}
                  <span className="text-gray-300">{activeArchetype.defaultGoalsSample.fiveYear}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
