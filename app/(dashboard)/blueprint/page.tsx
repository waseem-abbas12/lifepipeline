'use client';

import { useState, useEffect } from 'react';
import { 
  Target, 
  Lock, 
  Unlock, 
  Calendar, 
  Sparkles, 
  Plus, 
  Trash2, 
  Clock, 
  ShieldAlert, 
  CheckCircle, 
  ArrowUpRight, 
  ChevronRight,
  Flame,
  UserCheck
} from 'lucide-react';
import { BlueprintGoal, BlueprintTimeframe, TimeLockCommitment, UserRole } from '@/types';
import { ROLE_ARCHETYPES } from '@/lib/constants/roles';

export default function BlueprintDashboardPage() {
  const [activeRole, setActiveRole] = useState<UserRole>('business_owner');
  const [selectedHorizon, setSelectedHorizon] = useState<BlueprintTimeframe>('1_year');

  // Blueprints state
  const [goals, setGoals] = useState<BlueprintGoal[]>([
    {
      id: 'g-1',
      user_id: 'u-1',
      timeframe: '1_year',
      category: 'Capital & Revenue',
      title: 'Attain $1.2M ARR with 35% Net Margin',
      vision_statement: 'Transition from founder-led sales to an autonomous inbound pipeline and solid enterprise contracts.',
      target_metric: '$100k Monthly Recurring Revenue',
    },
    {
      id: 'g-2',
      user_id: 'u-1',
      timeframe: '1_year',
      category: 'Physique & Vitality',
      title: 'Maintain 12% Body Fat & 8 Hours Deep Sleep',
      vision_statement: 'High cognitive performance requires peak biological energy and clean nutrition rhythms.',
      target_metric: 'Vo2 Max > 48, Body Fat 12%',
    },
    {
      id: 'g-3',
      user_id: 'u-1',
      timeframe: '3_year',
      category: 'Market Dominance',
      title: 'Expand SaaS Operations to North America & EU',
      vision_statement: 'Serve 10,000+ paying high-agency users and establish LifePipeline as category king.',
      target_metric: '10,000 Active Paid Subscribers',
    },
    {
      id: 'g-4',
      user_id: 'u-1',
      timeframe: '5_year',
      category: 'Sovereignty & Legacy',
      title: 'Build a Self-Sustaining Venture Holding Entity',
      vision_statement: 'Complete geographic freedom and seed funding for ambitious early-stage creators.',
      target_metric: '$15M Portfolio Valuation',
    },
  ]);

  // Time-Lock Commitment state
  const [activeTimeLock, setActiveTimeLock] = useState<TimeLockCommitment | null>({
    id: 'lock-1',
    user_id: 'u-1',
    focus_title: 'Close 15 Enterprise SaaS Contracts & Automate Onboarding',
    why_this_matters: 'If I do not lock this target, I will get distracted by shiny micro-features. Completing this unlocks true financial runway.',
    duration_months: 3,
    start_date: new Date().toISOString().split('T')[0],
    locked_until: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
  });

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

  // Load persisted role if available
  useEffect(() => {
    const savedRole = localStorage.getItem('lifepipeline_active_role') as UserRole;
    if (savedRole && ROLE_ARCHETYPES[savedRole]) {
      setActiveRole(savedRole);
    }
  }, []);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newGoal: BlueprintGoal = {
      id: 'g-' + Date.now(),
      user_id: 'u-1',
      timeframe: selectedHorizon,
      category: newCategory,
      title: newTitle,
      vision_statement: newVision,
      target_metric: newMetric,
    };

    setGoals([newGoal, ...goals]);
    setNewTitle('');
    setNewVision('');
    setNewMetric('');
    setShowGoalModal(false);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const handleCreateTimeLock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lockTitle || !lockWhy) return;

    const days = lockDuration === 3 ? 90 : 180;
    const lockedDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const newLock: TimeLockCommitment = {
      id: 'lock-' + Date.now(),
      user_id: 'u-1',
      focus_title: lockTitle,
      why_this_matters: lockWhy,
      duration_months: lockDuration,
      start_date: new Date().toISOString().split('T')[0],
      locked_until: lockedDate,
      status: 'active',
    };

    setActiveTimeLock(newLock);
    setLockTitle('');
    setLockWhy('');
    setShowLockModal(false);
  };

  const filteredGoals = goals.filter((g) => g.timeframe === selectedHorizon);
  const currentArchetype = ROLE_ARCHETYPES[activeRole] || ROLE_ARCHETYPES.business_owner;

  // Calculate days remaining for active time-lock
  const calculateDaysRemaining = (lockedUntil: string) => {
    const diff = new Date(lockedUntil).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Header & Role Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Life Blueprint & Strategic Horizons
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-emerald-400" />
              Role: <strong className="text-gray-200">{currentArchetype.title}</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Visionary Architecture Engine
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Define your multi-year vision, anchor your 80/20 leverage, and time-lock immediate execution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGoalModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-700 hover:border-gray-500 text-white font-medium text-xs tracking-wide transition-all flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4 text-brand-400" />
            Add Horizon Goal
          </button>
          <button
            onClick={() => setShowLockModal(true)}
            className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-bold text-xs tracking-wide transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            {activeTimeLock ? 'Update Time-Lock' : 'Engage 3-6 Mo Time-Lock'}
          </button>
        </div>
      </div>

      {/* SECTION 1: Time-Lock Engine Banner (Psychological Commitment Anchor) */}
      <div className="mb-10">
        {activeTimeLock ? (
          <div className="glass-panel-glow p-6 sm:p-7 rounded-2xl border border-brand-500/30 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2.5">
                  <div className="px-2.5 py-1 rounded-md bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    {activeTimeLock.duration_months}-Month Time-Locked Focus
                  </div>
                  <span className="text-xs text-amber-400 font-semibold flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                    <Flame className="w-3.5 h-3.5" />
                    Non-Negotiable Target
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  {activeTimeLock.focus_title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 italic bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                  <strong className="text-brand-400 not-italic uppercase tracking-wide text-[11px] block mb-0.5">
                    Psychological Stake:
                  </strong>
                  "{activeTimeLock.why_this_matters}"
                </p>
              </div>

              {/* Countdown Metric Box */}
              <div className="flex items-center gap-4 bg-gray-950/70 p-4 rounded-xl border border-gray-800 min-w-[200px] shrink-0 justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                    Locked Until
                  </div>
                  <div className="text-sm font-bold text-white">{activeTimeLock.locked_until}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    Started: {activeTimeLock.start_date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-brand-400">
                    {calculateDaysRemaining(activeTimeLock.locked_until)}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Days Left</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel p-6 rounded-2xl border border-gray-800 text-center">
            <ShieldAlert className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-white">No Active Time-Lock Commitment</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto mt-1 mb-4">
              Eliminate distractions and shiny objects. Commit to a single radical 3 or 6-month priority.
            </p>
            <button
              onClick={() => setShowLockModal(true)}
              className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-bold text-xs"
            >
              Set First Time-Lock Target
            </button>
          </div>
        )}
      </div>

      {/* SECTION 2: 1-Year / 3-Year / 5-Year Horizon Quadrants */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-900 border border-gray-800">
            <button
              onClick={() => setSelectedHorizon('1_year')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedHorizon === '1_year'
                  ? 'bg-brand-500 text-black shadow-md shadow-brand-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              1-Year Horizon (Execution)
            </button>
            <button
              onClick={() => setSelectedHorizon('3_year')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedHorizon === '3_year'
                  ? 'bg-brand-500 text-black shadow-md shadow-brand-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              3-Year Horizon (Scaling)
            </button>
            <button
              onClick={() => setSelectedHorizon('5_year')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedHorizon === '5_year'
                  ? 'bg-brand-500 text-black shadow-md shadow-brand-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              5-Year Horizon (Sovereignty)
            </button>
          </div>

          <span className="text-xs text-gray-500">
            Showing {filteredGoals.length} goals in {selectedHorizon.replace('_', ' ')}
          </span>
        </div>

        {/* Goals List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGoals.map((goal) => (
            <div
              key={goal.id}
              className="glass-panel p-5 rounded-2xl border border-gray-800/80 hover:border-gray-700 flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                    {goal.category}
                  </span>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-gray-600 hover:text-red-400 transition-colors p-1"
                    title="Remove goal"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-brand-400 transition-colors">
                  {goal.title}
                </h4>

                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  {goal.vision_statement}
                </p>
              </div>

              {goal.target_metric && (
                <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Target Metric:</span>
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
            className="p-6 rounded-2xl border border-dashed border-gray-800 hover:border-brand-500/50 hover:bg-brand-500/5 transition-all flex flex-col items-center justify-center text-center min-h-[180px] group"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5 text-gray-400 group-hover:text-brand-400" />
            </div>
            <span className="text-sm font-semibold text-gray-300 group-hover:text-white">
              Add New {selectedHorizon.replace('_', ' ')} Vision Goal
            </span>
            <span className="text-xs text-gray-500 mt-1">
              Categorize and quantify your target metric
            </span>
          </button>
        </div>
      </div>

      {/* MODAL 1: Add Goal Form */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-panel p-6 sm:p-7 rounded-2xl border border-gray-700 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-1">
              Add Horizon Goal ({selectedHorizon.replace('_', ' ')})
            </h3>
            <p className="text-xs text-gray-400 mb-5">
              Specify what victory looks like in this multi-year domain.
            </p>

            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-brand-500 focus:outline-none"
                >
                  <option value="Career & Wealth">Career & Wealth</option>
                  <option value="Health & Vitality">Health & Vitality</option>
                  <option value="Deep Mastery & Skills">Deep Mastery & Skills</option>
                  <option value="Relationships & Family">Relationships & Family</option>
                  <option value="Freedom & Lifestyle">Freedom & Lifestyle</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Goal Title / Milestone
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Build $1M ARR SaaS"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Vision Statement (Why & How it feels)
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe the vivid reality of achieving this goal..."
                  value={newVision}
                  onChange={(e) => setNewVision(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Target Measurable Metric
                </label>
                <input
                  type="text"
                  placeholder="e.g. $83k MRR, Sub-12% body fat, 2 publications"
                  value={newMetric}
                  onChange={(e) => setNewMetric(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-bold text-xs"
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
          <div className="w-full max-w-lg glass-panel p-6 sm:p-7 rounded-2xl border border-brand-500/30 shadow-2xl relative">
            <div className="flex items-center gap-2 text-brand-400 mb-1">
              <Lock className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Psychological Commitment Protocol
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Activate Time-Lock Execution
            </h3>
            <p className="text-xs text-gray-400 mb-5">
              By locking a target, you commit to discarding all peripheral distractions for the duration.
            </p>

            <form onSubmit={handleCreateTimeLock} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Locked Focus Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Launch LifePipeline V1 and acquire 100 paid users"
                  value={lockTitle}
                  onChange={(e) => setLockTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Time-Lock Window
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLockDuration(3)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      lockDuration === 3
                        ? 'bg-brand-500/10 border-brand-500 text-brand-400'
                        : 'border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    3 Months (Sprint Lock)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLockDuration(6)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      lockDuration === 6
                        ? 'bg-brand-500/10 border-brand-500 text-brand-400'
                        : 'border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    6 Months (Deep Transformation)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Psychological Stake ("Why failure is unacceptable")
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the pain of inaction or the critical freedom this unlocks..."
                  value={lockWhy}
                  onChange={(e) => setLockWhy(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowLockModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-bold text-xs shadow-lg shadow-brand-500/20"
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
