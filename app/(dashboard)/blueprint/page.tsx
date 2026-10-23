'use client';

import { useState, useEffect } from 'react';
import { 
  Target, 
  Lock, 
  Calendar, 
  Sparkles, 
  Plus, 
  Trash2, 
  Clock, 
  ShieldAlert, 
  Flame,
  UserCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import { BlueprintGoal, BlueprintTimeframe, TimeLockCommitment, UserRole } from '@/types';
import { ROLE_ARCHETYPES } from '@/lib/constants/roles';
import { getActiveUser, updateActiveUser } from '@/lib/storage/userManager';
import { FamilyUser } from '@/types';

export default function BlueprintDashboardPage() {
  const [currentUser, setCurrentUser] = useState<FamilyUser | null>(null);
  const [selectedHorizon, setSelectedHorizon] = useState<BlueprintTimeframe>('1_year');

  // Modal / Input states
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);

  // New Goal Form
  const [newCategory, setNewCategory] = useState('Career & Wealth');
  const [newTitle, setNewTitle] = useState('');
  const [newVision, setNewVision] = useState('');
  const [newMetric, setNewMetric] = useState('');

  // New Time-Lock Form
  const [lockTitle, setLockTitle] = useState('');
  const [lockWhy, setLockWhy] = useState('');
  const [lockDuration, setLockDuration] = useState<3 | 6>(3);

  const syncState = () => {
    const user = getActiveUser();
    setCurrentUser(user);
    if (user.activeTimeLock) {
      setLockTitle(user.activeTimeLock.focus_title);
      setLockWhy(user.activeTimeLock.why_this_matters);
      setLockDuration(user.activeTimeLock.duration_months);
    }
  };

  useEffect(() => {
    syncState();
    const handleUpdate = () => syncState();
    window.addEventListener('lifepipeline_state_updated', handleUpdate);
    return () => window.removeEventListener('lifepipeline_state_updated', handleUpdate);
  }, []);

  if (!currentUser) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-surface-muted">
        Loading Life Blueprint...
      </div>
    );
  }

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newGoal: BlueprintGoal = {
      id: 'g-' + Date.now(),
      user_id: currentUser.id,
      timeframe: selectedHorizon,
      category: newCategory,
      title: newTitle.trim(),
      vision_statement: newVision.trim(),
      target_metric: newMetric.trim(),
    };

    updateActiveUser((prev) => ({
      ...prev,
      blueprintGoals: [newGoal, ...prev.blueprintGoals],
    }));

    setNewTitle('');
    setNewVision('');
    setNewMetric('');
    setShowGoalModal(false);
  };

  const handleDeleteGoal = (id: string) => {
    updateActiveUser((prev) => ({
      ...prev,
      blueprintGoals: prev.blueprintGoals.filter((g) => g.id !== id),
    }));
  };

  const handleCreateTimeLock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lockTitle.trim() || !lockWhy.trim()) return;

    const days = lockDuration === 3 ? 90 : 180;
    const lockedDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const newLock: TimeLockCommitment = {
      id: 'lock-' + Date.now(),
      user_id: currentUser.id,
      focus_title: lockTitle.trim(),
      why_this_matters: lockWhy.trim(),
      duration_months: lockDuration,
      start_date: new Date().toISOString().split('T')[0],
      locked_until: lockedDate,
      status: 'active',
    };

    updateActiveUser((prev) => ({
      ...prev,
      activeTimeLock: newLock,
    }));

    setShowLockModal(false);
  };

  const currentArchetype = ROLE_ARCHETYPES[currentUser.role] || ROLE_ARCHETYPES.business_owner;
  const filteredGoals = (currentUser.blueprintGoals || []).filter((g) => g.timeframe === selectedHorizon);

  const calculateDaysRemaining = (lockedUntil: string) => {
    const diff = new Date(lockedUntil).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const activeTimeLock = currentUser.activeTimeLock;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Header & Role Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Life Blueprint & Horizons
            </span>
            <span className="text-surface-muted">•</span>
            <span className="text-xs text-surface-silver flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              Profile: <strong className="text-white">{currentUser.name}</strong> ({currentArchetype.title})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-silver tracking-tight">
            Strategic Horizon Architecture
          </h1>
          <p className="text-sm text-surface-muted mt-1">
            Anchor your long-term vision across 1, 3, and 5-Year horizons and lock down your 3 to 6-month non-negotiable focus.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowGoalModal(true)}
            className="min-h-[46px] px-4 py-2.5 rounded-xl bg-surface-card border border-surface-border hover:border-indigo-600/60 active:scale-98 text-surface-silver font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4 text-indigo-400" />
            <span>Add Horizon Goal</span>
          </button>
          <button
            onClick={() => setShowLockModal(true)}
            className="min-h-[46px] px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>{activeTimeLock ? 'Update Time-Lock' : 'Engage 3-6 Mo Time-Lock'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Time-Lock Engine Banner (Psychological Commitment Anchor) */}
      <div className="mb-10">
        {activeTimeLock ? (
          <div className="clean-card-active p-6 sm:p-7 rounded-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="px-2.5 py-1 rounded-md bg-indigo-600/20 text-indigo-300 border border-indigo-600/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-indigo-400" />
                    {activeTimeLock.duration_months}-Month Time-Locked Focus
                  </div>
                  <span className="text-xs text-amber-400 font-semibold flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                    <Flame className="w-3.5 h-3.5" />
                    Non-Negotiable Priority
                  </span>
                </div>

                <h3 className="text-xl font-bold text-surface-silver tracking-tight">
                  {activeTimeLock.focus_title}
                </h3>

                <p className="text-xs sm:text-sm text-surface-silver/90 italic bg-surface-base/80 p-3.5 rounded-xl border border-surface-border">
                  <strong className="text-indigo-400 not-italic uppercase tracking-wide text-[11px] block mb-0.5">
                    Psychological Stake ("Why Failure is Unacceptable"):
                  </strong>
                  "{activeTimeLock.why_this_matters}"
                </p>
              </div>

              {/* Countdown Metric Box */}
              <div className="flex items-center gap-4 bg-surface-base p-4 rounded-xl border border-surface-border min-w-[210px] shrink-0 justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-surface-muted">
                    Locked Until
                  </div>
                  <div className="text-sm font-bold text-surface-silver">{activeTimeLock.locked_until}</div>
                  <div className="text-[11px] text-surface-muted mt-0.5">
                    Started: {activeTimeLock.start_date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-indigo-400">
                    {calculateDaysRemaining(activeTimeLock.locked_until)}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-surface-muted">Days Left</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="clean-card p-6 rounded-2xl border border-surface-border text-center">
            <ShieldAlert className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-surface-silver">No Active Time-Lock Commitment</h3>
            <p className="text-xs text-surface-muted max-w-md mx-auto mt-1 mb-4">
              Eliminate distraction and shiny object syndrome. Lock down a single non-negotiable 3 or 6-month priority.
            </p>
            <button
              onClick={() => setShowLockModal(true)}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
            >
              Set First Time-Lock Target
            </button>
          </div>
        )}
      </div>

      {/* SECTION 2: 1-Year / 3-Year / 5-Year Horizon Quadrants */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-card border border-surface-border">
            <button
              onClick={() => setSelectedHorizon('1_year')}
              className={`min-h-[40px] px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedHorizon === '1_year'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-surface-muted hover:text-surface-silver'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              1-Year Horizon (Execution)
            </button>
            <button
              onClick={() => setSelectedHorizon('3_year')}
              className={`min-h-[40px] px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedHorizon === '3_year'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-surface-muted hover:text-surface-silver'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              3-Year Horizon (Scaling)
            </button>
            <button
              onClick={() => setSelectedHorizon('5_year')}
              className={`min-h-[40px] px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedHorizon === '5_year'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-surface-muted hover:text-surface-silver'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              5-Year Horizon (Sovereignty)
            </button>
          </div>

          <span className="text-xs text-surface-muted">
            Showing {filteredGoals.length} goals in {selectedHorizon.replace('_', ' ')}
          </span>
        </div>

        {/* Goals List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGoals.map((goal) => (
            <div
              key={goal.id}
              className="clean-card p-5 rounded-2xl border border-surface-border hover:border-indigo-600/50 flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-elevated text-indigo-300 border border-indigo-600/20">
                    {goal.category}
                  </span>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-surface-muted hover:text-rose-400 transition-colors p-1"
                    title="Remove goal"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="text-base font-bold text-surface-silver mb-2 leading-snug group-hover:text-indigo-400 transition-colors">
                  {goal.title}
                </h4>

                <p className="text-xs text-surface-muted leading-relaxed mb-4">
                  {goal.vision_statement}
                </p>
              </div>

              {goal.target_metric && (
                <div className="pt-3 border-t border-surface-border flex items-center justify-between text-xs">
                  <span className="text-surface-muted">Target Metric:</span>
                  <span className="font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {goal.target_metric}
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Quick Add Card */}
          <button
            onClick={() => setShowGoalModal(true)}
            className="p-6 rounded-2xl border border-dashed border-surface-border hover:border-indigo-600/50 hover:bg-indigo-600/5 transition-all flex flex-col items-center justify-center text-center min-h-[180px] group"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-card border border-surface-border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5 text-surface-muted group-hover:text-indigo-400" />
            </div>
            <span className="text-sm font-semibold text-surface-silver group-hover:text-white">
              Add New {selectedHorizon.replace('_', ' ')} Vision Goal
            </span>
            <span className="text-xs text-surface-muted mt-1">
              Quantify your target metric and milestone
            </span>
          </button>
        </div>
      </div>

      {/* MODAL 1: Add Goal Form */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-surface-card p-6 sm:p-7 rounded-2xl border border-surface-border shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border mb-4">
              <div>
                <h3 className="text-lg font-bold text-surface-silver">
                  Add Horizon Goal ({selectedHorizon.replace('_', ' ')})
                </h3>
                <p className="text-xs text-surface-muted">
                  Define what victory looks like in this multi-year domain.
                </p>
              </div>
              <button
                onClick={() => setShowGoalModal(false)}
                className="p-1.5 rounded-lg text-surface-muted hover:text-surface-silver"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-surface-muted mb-1.5">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-surface-base border border-surface-border text-surface-silver text-xs focus:border-indigo-600 focus:outline-none"
                >
                  <option value="Career & Wealth">Career & Wealth</option>
                  <option value="Health & Vitality">Health & Vitality</option>
                  <option value="Deep Mastery & Skills">Deep Mastery & Skills</option>
                  <option value="Relationships & Family">Relationships & Family</option>
                  <option value="Freedom & Autonomy">Freedom & Autonomy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-surface-muted mb-1.5">
                  Goal Title / Milestone
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Build $1M ARR SaaS"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-surface-base border border-surface-border text-surface-silver text-xs focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-surface-muted mb-1.5">
                  Vision Statement (Why & How it feels)
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe the vivid reality of achieving this goal..."
                  value={newVision}
                  onChange={(e) => setNewVision(e.target.value)}
                  className="w-full p-3 rounded-xl bg-surface-base border border-surface-border text-surface-silver text-xs focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-surface-muted mb-1.5">
                  Target Measurable Metric
                </label>
                <input
                  type="text"
                  placeholder="e.g. $83k MRR, Sub-12% body fat, 2 publications"
                  value={newMetric}
                  onChange={(e) => setNewMetric(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-surface-base border border-surface-border text-surface-silver text-xs focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs text-surface-muted hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                >
                  Save Horizon Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Engage 3 to 6-Month Time-Lock */}
      {showLockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-surface-card p-6 sm:p-7 rounded-2xl border border-indigo-600/40 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border mb-4">
              <div>
                <div className="flex items-center gap-2 text-indigo-400 mb-1">
                  <Lock className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Psychological Commitment Protocol
                  </span>
                </div>
                <h3 className="text-lg font-bold text-surface-silver">
                  Activate Time-Lock Execution
                </h3>
              </div>
              <button
                onClick={() => setShowLockModal(false)}
                className="p-1.5 rounded-lg text-surface-muted hover:text-surface-silver"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTimeLock} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-surface-muted mb-1.5">
                  Locked Focus Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Launch LifePipeline V1 and acquire 100 paid users"
                  value={lockTitle}
                  onChange={(e) => setLockTitle(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-surface-base border border-surface-border text-surface-silver text-xs focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-surface-muted mb-1.5">
                  Time-Lock Window
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLockDuration(3)}
                    className={`min-h-[44px] py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      lockDuration === 3
                        ? 'bg-indigo-600/15 border-indigo-600 text-indigo-400'
                        : 'border-surface-border text-surface-muted hover:border-surface-elevated'
                    }`}
                  >
                    3 Months (Sprint Lock)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLockDuration(6)}
                    className={`min-h-[44px] py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      lockDuration === 6
                        ? 'bg-indigo-600/15 border-indigo-600 text-indigo-400'
                        : 'border-surface-border text-surface-muted hover:border-surface-elevated'
                    }`}
                  >
                    6 Months (Deep Transformation)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-surface-muted mb-1.5">
                  Psychological Stake ("Why failure is unacceptable")
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the pain of inaction or the critical freedom this unlocks..."
                  value={lockWhy}
                  onChange={(e) => setLockWhy(e.target.value)}
                  className="w-full p-3 rounded-xl bg-surface-base border border-surface-border text-surface-silver text-xs focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowLockModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs text-surface-muted hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25"
                >
                  Lock Target & Engage Clock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

