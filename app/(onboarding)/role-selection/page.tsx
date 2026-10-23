'use client';

import { useState, useEffect } from 'react';
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
  Target,
  UserCheck
} from 'lucide-react';
import { ROLE_ARCHETYPES } from '@/lib/constants/roles';
import { UserRole, FamilyUser } from '@/types';
import { getActiveUser, updateActiveUser } from '@/lib/storage/userManager';

export default function RoleSelectionPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<FamilyUser | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('business_owner');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const user = getActiveUser();
    setCurrentUser(user);
    if (user.role) {
      setSelectedRole(user.role);
    }
  }, []);

  const getRoleIcon = (roleId: UserRole) => {
    switch (roleId) {
      case 'student':
        return <GraduationCap className="w-6 h-6 text-indigo-400" />;
      case 'business_owner':
        return <TrendingUp className="w-6 h-6 text-indigo-400" />;
      case 'freelancer':
        return <Briefcase className="w-6 h-6 text-indigo-400" />;
      case 'professional':
        return <Award className="w-6 h-6 text-indigo-400" />;
      case 'housewife':
        return <HeartHandshake className="w-6 h-6 text-indigo-400" />;
      default:
        return <Target className="w-6 h-6 text-indigo-400" />;
    }
  };

  const handleConfirmRole = () => {
    setSaving(true);
    updateActiveUser((prev) => ({
      ...prev,
      role: selectedRole,
    }));
    setSaving(false);
    router.push('/blueprint');
  };

  const activeArchetype = ROLE_ARCHETYPES[selectedRole];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo-600/30 bg-indigo-600/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Identity Calibration & Archetypes</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-silver tracking-tight">
          Select Your Life Operating Archetype
        </h1>
        <p className="text-surface-muted text-sm sm:text-base mt-2">
          Calibrating for: <strong className="text-white">{currentUser?.name || 'Active User'}</strong>. 
          LifePipeline customizes focus metrics, goal templates, and friction analysis to your current domain.
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
              className={`min-h-[140px] p-5 rounded-2xl text-left transition-all border flex flex-col justify-between relative group ${
                isSelected
                  ? 'clean-card-active bg-surface-elevated/70'
                  : 'clean-card border-surface-border hover:border-indigo-600/40 hover:bg-surface-elevated/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-surface-base border border-surface-border">
                    {getRoleIcon(roleKey)}
                  </div>
                  {isSelected && (
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-surface-silver mb-1">{role.title}</h3>
                <p className="text-xs text-surface-muted line-clamp-3">{role.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-border text-[11px] font-semibold tracking-wider text-indigo-400 uppercase">
                {isSelected ? 'Active Archetype' : 'Select'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Profile Preview & Blueprint Template Preview */}
      {activeArchetype && (
        <div className="clean-card rounded-3xl p-6 sm:p-8 border border-indigo-600/30 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-surface-border">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                Tailored Psychological Profile
              </span>
              <h2 className="text-2xl font-bold text-surface-silver mt-0.5">{activeArchetype.title}</h2>
              <p className="text-sm text-surface-muted mt-1">{activeArchetype.tagline}</p>
            </div>

            <button
              onClick={handleConfirmRole}
              disabled={saving}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all self-start md:self-center disabled:opacity-50"
            >
              {saving ? 'Calibrating...' : 'Confirm Role & Open Life Blueprint'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
            {/* Focus areas */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-surface-muted mb-3">
                Pre-calibrated 80/20 Leverage Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeArchetype.suggestedFocusAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-surface-base border border-surface-border text-xs font-medium text-surface-silver flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Sample Blueprint Horizons */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-surface-muted mb-3">
                Sample Horizon Blueprint (Auto-Suggested)
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-surface-base/80 border border-surface-border">
                  <span className="font-semibold text-indigo-400">1-Year Horizon:</span>{' '}
                  <span className="text-surface-silver">{activeArchetype.defaultGoalsSample.oneYear}</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-base/80 border border-surface-border">
                  <span className="font-semibold text-indigo-300">3-Year Horizon:</span>{' '}
                  <span className="text-surface-silver">{activeArchetype.defaultGoalsSample.threeYear}</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-base/80 border border-surface-border">
                  <span className="font-semibold text-surface-silver">5-Year Horizon:</span>{' '}
                  <span className="text-surface-muted">{activeArchetype.defaultGoalsSample.fiveYear}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

