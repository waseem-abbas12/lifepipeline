'use client';

import { useState } from 'react';
import { 
  Zap, 
  Target, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Plus, 
  Trash2, 
  Flame, 
  Sparkles, 
  AlertCircle,
  Filter,
  ArrowRight,
  TrendingUp,
  Brain,
  ShieldCheck,
  Check
} from 'lucide-react';
import { 
  ParetoLeverageAction, 
  MicroTask, 
  LeverageTier, 
  EnergyRequirement 
} from '@/types';

export default function DecompositionPage() {
  // Goal Context
  const [selectedTarget, setSelectedTarget] = useState({
    title: 'Close 15 Enterprise SaaS Contracts & Automate Onboarding',
    timeframe: 'Active 3-Month Time-Lock',
    why: 'Locks in predictable financial runway and stops endless product feature tinkering.',
  });

  // Pareto 20/80 Actions
  const [paretoActions, setParetoActions] = useState<ParetoLeverageAction[]>([
    {
      id: 'pa-1',
      user_id: 'u-1',
      title: 'Conduct 5 Targeted Cold Loom Demos Daily to ICP Decision Makers',
      impact_rationale: 'Direct pipeline driver: Outbound video outreach converts at 24% vs generic emails at 1.5%.',
      leverage_tier: 'vital_20',
      estimated_weekly_hours: 6.0,
    },
    {
      id: 'pa-2',
      user_id: 'u-1',
      title: 'Build Frictionless Stripe Self-Serve & Automated Workspace Provisioning',
      impact_rationale: 'Removes manual founder bottleneck so deals close and onboard in under 4 minutes without calls.',
      leverage_tier: 'vital_20',
      estimated_weekly_hours: 8.0,
    },
    {
      id: 'pa-3',
      user_id: 'u-1',
      title: 'Reorganize internal Notion documentation and team Slack channels',
      impact_rationale: 'Necessary maintenance, but does not directly generate revenue or move the needle.',
      leverage_tier: 'maintenance_80',
      estimated_weekly_hours: 2.0,
    },
  ]);

  // Micro-Tasks
  const [microTasks, setMicroTasks] = useState<MicroTask[]>([
    {
      id: 'mt-1',
      user_id: 'u-1',
      pareto_action_id: 'pa-1',
      title: 'Prospect 5 B2B SaaS Founders on LinkedIn & record 90-sec personalized Looms',
      duration_minutes: 45,
      energy_state: 'deep_focus',
      leverage_tier: 'vital_20',
      completed: true,
      scheduled_date: new Date().toISOString().split('T')[0],
      completed_at: new Date().toISOString(),
    },
    {
      id: 'mt-2',
      user_id: 'u-1',
      pareto_action_id: 'pa-1',
      title: 'Send follow-up sequence with custom audit checklist to 3 warm leads',
      duration_minutes: 15,
      energy_state: 'quick_execution',
      leverage_tier: 'vital_20',
      completed: false,
      scheduled_date: new Date().toISOString().split('T')[0],
    },
    {
      id: 'mt-3',
      user_id: 'u-1',
      pareto_action_id: 'pa-2',
      title: 'Implement Webhook listener for Stripe checkout.session.completed in API',
      duration_minutes: 60,
      energy_state: 'deep_focus',
      leverage_tier: 'vital_20',
      completed: false,
      scheduled_date: new Date().toISOString().split('T')[0],
    },
    {
      id: 'mt-4',
      user_id: 'u-1',
      pareto_action_id: 'pa-3',
      title: 'Clear out inbox clutter and archive resolved customer support tickets',
      duration_minutes: 15,
      energy_state: 'routine',
      leverage_tier: 'maintenance_80',
      completed: true,
      scheduled_date: new Date().toISOString().split('T')[0],
      completed_at: new Date().toISOString(),
    },
  ]);

  // Modals state
  const [showAddActionModal, setShowAddActionModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [filterState, setFilterState] = useState<'all' | 'vital_20' | 'maintenance_80'>('all');

  // Form: New Pareto Action
  const [newActionTitle, setNewActionTitle] = useState('');
  const [newActionWhy, setNewActionWhy] = useState('');
  const [newActionTier, setNewActionTier] = useState<LeverageTier>('vital_20');
  const [newActionHours, setNewActionHours] = useState('5.0');

  // Form: New Micro-Task
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDuration, setNewTaskDuration] = useState<15 | 30 | 45 | 60>(30);
  const [newTaskEnergy, setNewTaskEnergy] = useState<EnergyRequirement>('deep_focus');
  const [newTaskParentAction, setNewTaskParentAction] = useState(paretoActions[0]?.id || '');

  // Toggle Micro-Task Completion
  const toggleTask = (taskId: string) => {
    setMicroTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? {
              ...t,
              completed: !t.completed,
              completed_at: !t.completed ? new Date().toISOString() : null,
            }
          : t
      )
    );
  };

  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionTitle) return;

    const action: ParetoLeverageAction = {
      id: 'pa-' + Date.now(),
      user_id: 'u-1',
      title: newActionTitle,
      impact_rationale: newActionWhy,
      leverage_tier: newActionTier,
      estimated_weekly_hours: parseFloat(newActionHours) || 4.0,
    };

    setParetoActions([...paretoActions, action]);
    setNewActionTitle('');
    setNewActionWhy('');
    setShowAddActionModal(false);
  };

  const handleAddMicroTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskParentAction) return;

    const parent = paretoActions.find(a => a.id === newTaskParentAction);

    const task: MicroTask = {
      id: 'mt-' + Date.now(),
      user_id: 'u-1',
      pareto_action_id: newTaskParentAction,
      title: newTaskTitle,
      duration_minutes: newTaskDuration,
      energy_state: newTaskEnergy,
      leverage_tier: parent?.leverage_tier || 'vital_20',
      completed: false,
      scheduled_date: new Date().toISOString().split('T')[0],
    };

    setMicroTasks([...microTasks, task]);
    setNewTaskTitle('');
    setShowAddTaskModal(false);
  };

  // Metrics
  const totalTasks = microTasks.length;
  const completedTasks = microTasks.filter(t => t.completed).length;
  const vital20Tasks = microTasks.filter(t => t.leverage_tier === 'vital_20');
  const vital20Completed = vital20Tasks.filter(t => t.completed).length;
  const paretoRatio = totalTasks > 0 ? Math.round((vital20Completed / (completedTasks || 1)) * 100) : 0;

  const filteredTasks = microTasks.filter(task => {
    if (filterState === 'vital_20') return task.leverage_tier === 'vital_20';
    if (filterState === 'maintenance_80') return task.leverage_tier === 'maintenance_80';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Target Focus Header */}
      <div className="glass-panel-glow p-6 sm:p-7 rounded-2xl border border-brand-500/30 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                Pareto Deconstruction Scope
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-xs text-amber-400 font-semibold">{selectedTarget.timeframe}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {selectedTarget.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 italic">
              "{selectedTarget.why}"
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddActionModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-700 hover:border-gray-500 text-white font-medium text-xs tracking-wide transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-brand-400" />
              Define 80/20 Action
            </button>
            <button
              onClick={() => setShowAddTaskModal(true)}
              className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-bold text-xs tracking-wide transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Generate Micro-Task
            </button>
          </div>
        </div>

        {/* Psychological Ratio Bar */}
        <div className="mt-6 pt-5 border-t border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-950/70 p-3.5 rounded-xl border border-gray-800/80">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
              Vital 20% Execution Ratio
            </div>
            <div className="text-2xl font-black text-brand-400 mt-0.5">
              {vital20Completed} / {vital20Tasks.length} <span className="text-xs font-normal text-gray-400">tasks done</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
              <div 
                className="bg-brand-500 h-1.5 rounded-full transition-all"
                style={{ width: `${vital20Tasks.length > 0 ? (vital20Completed / vital20Tasks.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="bg-gray-950/70 p-3.5 rounded-xl border border-gray-800/80">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
              Leverage Quality Score
            </div>
            <div className="text-2xl font-black text-emerald-400 mt-0.5">
              {totalTasks > 0 ? Math.round((vital20Tasks.length / totalTasks) * 100) : 0}%
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Percentage of planned actions belonging to the vital 20% needle-movers.
            </p>
          </div>

          <div className="bg-gray-950/70 p-3.5 rounded-xl border border-gray-800/80">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
              Micro-Friction Index
            </div>
            <div className="text-2xl font-black text-teal-300 mt-0.5">
              32.5 min
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Avg task chunk size. Sub-45 min tasks eliminate psychological hesitation.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: 80/20 Leverage Levers (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">The 80/20 Leverage Levers</h2>
            </div>
            <span className="text-xs text-gray-400 font-mono">
              {paretoActions.length} Drivers
            </span>
          </div>

          <div className="space-y-3">
            {paretoActions.map((action) => {
              const isVital = action.leverage_tier === 'vital_20';
              return (
                <div
                  key={action.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isVital
                      ? 'bg-surface-card border-brand-500/40 shadow-sm'
                      : 'bg-surface-card/40 border-gray-800 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                        isVital
                          ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                          : 'bg-gray-800 text-gray-400 border border-gray-700'
                      }`}
                    >
                      {isVital ? 'Vital 20% Lever' : 'Maintenance 80%'}
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium">
                      ~{action.estimated_weekly_hours} hrs/wk
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1.5">{action.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed italic bg-gray-900/60 p-2.5 rounded-lg border border-gray-800/80">
                    <strong className="text-gray-300 not-italic">80% Impact Rationale: </strong>
                    {action.impact_rationale}
                  </p>
                </div>
              );
            })}

            <button
              onClick={() => setShowAddActionModal(true)}
              className="w-full py-3 rounded-xl border border-dashed border-gray-800 hover:border-brand-500/50 hover:bg-brand-500/5 text-xs text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-3.5 h-3.5 text-brand-400" />
              Isolate Another 80/20 Leverage Lever
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Daily Micro-Task Execution Deck (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">Today's Micro-Task Execution Deck</h2>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-900 border border-gray-800 text-xs">
              <button
                onClick={() => setFilterState('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterState === 'all' ? 'bg-brand-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                All ({microTasks.length})
              </button>
              <button
                onClick={() => setFilterState('vital_20')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterState === 'vital_20' ? 'bg-brand-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Vital 20% ({vital20Tasks.length})
              </button>
              <button
                onClick={() => setFilterState('maintenance_80')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterState === 'maintenance_80' ? 'bg-brand-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                80% Maintenance
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredTasks.map((task) => {
              const isVital = task.leverage_tier === 'vital_20';
              const parentAction = paretoActions.find(a => a.id === task.pareto_action_id);

              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 group ${
                    task.completed
                      ? 'bg-gray-900/40 border-gray-800/80 opacity-60'
                      : isVital
                      ? 'glass-panel border-gray-700/80 hover:border-brand-500/60'
                      : 'bg-surface-card/60 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <button
                    type="button"
                    className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                      task.completed
                        ? 'bg-brand-500 text-black'
                        : 'border border-gray-600 group-hover:border-brand-400'
                    }`}
                  >
                    {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded ${
                          isVital
                            ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                            : 'bg-gray-800 text-gray-400'
                        }`}
                      >
                        {isVital ? 'Vital 20%' : '80% Routine'}
                      </span>

                      <span className="text-[10px] text-gray-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-gray-500" />
                        {task.duration_minutes}m chunk
                      </span>

                      <span className="text-[10px] text-teal-400/90 capitalize px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
                        {task.energy_state.replace('_', ' ')}
                      </span>
                    </div>

                    <p
                      className={`text-sm font-medium ${
                        task.completed ? 'line-through text-gray-500' : 'text-white'
                      }`}
                    >
                      {task.title}
                    </p>

                    {parentAction && (
                      <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1 truncate">
                        <ArrowRight className="w-3 h-3 text-brand-500 shrink-0" />
                        Driver: <span className="text-gray-400 truncate">{parentAction.title}</span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredTasks.length === 0 && (
              <div className="p-8 text-center glass-panel rounded-2xl border border-gray-800">
                <AlertCircle className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                <p className="text-xs text-gray-400">No micro-tasks found matching this filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL 1: Add Pareto Action */}
      {showAddActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-panel p-6 sm:p-7 rounded-2xl border border-gray-700 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-1">
              Define 80/20 High-Leverage Driver
            </h3>
            <p className="text-xs text-gray-400 mb-5">
              Filter out the busywork. Identify the disproportionate 20% lever.
            </p>

            <form onSubmit={handleAddAction} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Action Title / Strategy
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Host 10 weekly direct sales demonstrations"
                  value={newActionTitle}
                  onChange={(e) => setNewActionTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Leverage Tier
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewActionTier('vital_20')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      newActionTier === 'vital_20'
                        ? 'bg-brand-500/10 border-brand-500 text-brand-400'
                        : 'border-gray-800 text-gray-400'
                    }`}
                  >
                    Vital 20% (High Impact)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewActionTier('maintenance_80')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      newActionTier === 'maintenance_80'
                        ? 'bg-brand-500/10 border-brand-500 text-brand-400'
                        : 'border-gray-800 text-gray-400'
                    }`}
                  >
                    Maintenance 80% (Support)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  80/20 Impact Rationale (Why this moves the needle)
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Explain why this action creates 80% of the forward progress..."
                  value={newActionWhy}
                  onChange={(e) => setNewActionWhy(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Weekly Allocated Hours
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={newActionHours}
                  onChange={(e) => setNewActionHours(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddActionModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-bold text-xs"
                >
                  Save Leverage Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Micro-Task */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-panel p-6 sm:p-7 rounded-2xl border border-gray-700 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-1">
              Generate Frictionless Micro-Task
            </h3>
            <p className="text-xs text-gray-400 mb-5">
              Break work down into chunks under 60 minutes to eliminate resistance.
            </p>

            <form onSubmit={handleAddMicroTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Assign to 80/20 Driver
                </label>
                <select
                  value={newTaskParentAction}
                  onChange={(e) => setNewTaskParentAction(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-brand-500 focus:outline-none"
                >
                  {paretoActions.map((action) => (
                    <option key={action.id} value={action.id}>
                      [{action.leverage_tier === 'vital_20' ? 'VITAL 20%' : '80% ADMIN'}] {action.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Micro-Task Action Item
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Draft 3 cold Loom pitches and send to prospects"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Time Chunk
                  </label>
                  <select
                    value={newTaskDuration}
                    onChange={(e) => setNewTaskDuration(Number(e.target.value) as 15 | 30 | 45 | 60)}
                    className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-brand-500 focus:outline-none"
                  >
                    <option value={15}>15 Minutes (Sprint)</option>
                    <option value={30}>30 Minutes (Focus Block)</option>
                    <option value={45}>45 Minutes (Deep Chunk)</option>
                    <option value={60}>60 Minutes (Max Immersion)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Energy State
                  </label>
                  <select
                    value={newTaskEnergy}
                    onChange={(e) => setNewTaskEnergy(e.target.value as EnergyRequirement)}
                    className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:border-brand-500 focus:outline-none"
                  >
                    <option value="deep_focus">Deep Focus (High Cognitive)</option>
                    <option value="quick_execution">Quick Execution (Tactical)</option>
                    <option value="routine">Routine (Low Energy)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-black font-bold text-xs shadow-lg shadow-brand-500/20"
                >
                  Add Micro-Task to Today's Deck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
