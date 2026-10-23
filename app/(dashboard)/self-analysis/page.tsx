'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Activity, 
  AlertTriangle, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Flame, 
  ChevronRight, 
  Plus, 
  Calendar, 
  Zap,
  ArrowUpRight,
  ShieldAlert,
  Brain
} from 'lucide-react';
import { getActiveUser, logDailyMetric } from '@/lib/storage/userManager';
import { FamilyUser, DailyExecutionMetric, TopWeakness } from '@/types';

export default function SelfAnalysisPage() {
  const [user, setUser] = useState<FamilyUser | null>(null);
  const [showLogModal, setShowLogModal] = useState(false);

  // Form state for logging manual metrics
  const [focusHours, setFocusHours] = useState(3.5);
  const [vitalTasks, setVitalTasks] = useState(2);
  const [maintenanceTasks, setMaintenanceTasks] = useState(3);
  const [energyRating, setEnergyRating] = useState(7);
  const [disciplineRating, setDisciplineRating] = useState(8);
  const [reflection, setReflection] = useState('');

  const sync = () => {
    setUser(getActiveUser());
  };

  useEffect(() => {
    sync();
    const handleUpdate = () => sync();
    window.addEventListener('lifepipeline_state_updated', handleUpdate);
    return () => window.removeEventListener('lifepipeline_state_updated', handleUpdate);
  }, []);

  const handleSaveMetric = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    logDailyMetric(user.id, {
      date: new Date().toISOString().split('T')[0],
      focusHours: Number(focusHours),
      vitalTasksCompleted: Number(vitalTasks),
      maintenanceTasksCompleted: Number(maintenanceTasks),
      energyRating: Number(energyRating),
      selfDisciplineRating: Number(disciplineRating),
      dayReflection: reflection || 'Daily progress logged manually.'
    });

    setShowLogModal(false);
    setReflection('');
    sync();
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const metrics = user.dailyMetrics || [];
  const weaknesses = user.topWeaknesses || [];

  // Calculate averages
  const avgFocusHours = metrics.length > 0 
    ? (metrics.reduce((acc, m) => acc + m.focusHours, 0) / metrics.length).toFixed(1)
    : '0';

  const totalVitalCompleted = metrics.reduce((acc, m) => acc + m.vitalTasksCompleted, 0);
  const totalMaintCompleted = metrics.reduce((acc, m) => acc + m.maintenanceTasksCompleted, 0);
  const paretoRatio = totalVitalCompleted + totalMaintCompleted > 0
    ? Math.round((totalVitalCompleted / (totalVitalCompleted + totalMaintCompleted)) * 100)
    : 50;

  const maxHours = Math.max(...metrics.map(m => m.focusHours), 6);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-surface-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/30 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            Mode 1: Manual Visual Self-Analysis
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-surface-silver tracking-tight">
            Execution Velocity & Gap Diagnosis
          </h1>
          <p className="text-xs sm:text-sm text-surface-muted mt-1">
            Visual metrics, manual logs, and the Top 3 psychological bottlenecks holding you back.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLogModal(true)}
            className="min-h-[46px] px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-indigo-600/25 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Log Today's Metrics
          </button>

          <Link
            href="/ai-coach"
            className="min-h-[46px] px-4 py-2.5 rounded-xl border border-surface-border hover:border-indigo-600/50 bg-surface-elevated text-surface-silver font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2"
          >
            <Brain className="w-4 h-4 text-indigo-400" />
            Switch to AI Coach (Mode 2)
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="clean-card p-5 rounded-2xl border border-surface-border">
          <div className="flex items-center justify-between text-surface-muted text-xs font-semibold mb-2">
            <span>Avg Daily Focus</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white">{avgFocusHours}<span className="text-sm font-normal text-surface-muted"> hrs/day</span></div>
          <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> Based on {metrics.length} recorded days
          </div>
        </div>

        <div className="clean-card p-5 rounded-2xl border border-surface-border">
          <div className="flex items-center justify-between text-surface-muted text-xs font-semibold mb-2">
            <span>Vital 20% Focus Ratio</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">{paretoRatio}%</div>
          <div className="text-[11px] text-surface-muted mt-2">
            {totalVitalCompleted} vital vs {totalMaintCompleted} maintenance tasks
          </div>
        </div>

        <div className="clean-card p-5 rounded-2xl border border-surface-border">
          <div className="flex items-center justify-between text-surface-muted text-xs font-semibold mb-2">
            <span>Discipline Rating</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-white">
            {metrics.length > 0 ? (metrics.reduce((a, b) => a + b.selfDisciplineRating, 0) / metrics.length).toFixed(1) : '8.0'}
            <span className="text-sm font-normal text-surface-muted"> / 10</span>
          </div>
          <div className="text-[11px] text-surface-muted mt-2">Self-reported execution control</div>
        </div>

        <div className="clean-card p-5 rounded-2xl border border-surface-border">
          <div className="flex items-center justify-between text-surface-muted text-xs font-semibold mb-2">
            <span>Momentum Health</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">
            {user.healthReport.composite_score}
            <span className="text-sm font-normal text-surface-muted"> / 100</span>
          </div>
          <div className="text-[11px] text-indigo-400 mt-2 capitalize font-semibold">
            ● Status: {user.healthReport.status}
          </div>
        </div>
      </div>

      {/* Main Grid: Visual Graph + Top 3 Lacks Diagnosis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Visual Progress Chart (SVG/CSS Midnight & Indigo) */}
        <div className="lg:col-span-7 clean-card p-6 rounded-2xl border border-surface-border flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-surface-silver flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                7-Day Execution Velocity Chart
              </h2>
              <p className="text-xs text-surface-muted mt-0.5">Deep Focus Hours vs Vital Needle-Movers Completed</p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-surface-elevated text-[11px] text-surface-muted font-mono">
              Live Chart
            </span>
          </div>

          {/* Bar & Sparkline Container */}
          <div className="h-56 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-surface-border">
            {metrics.slice(-7).map((m, idx) => {
              const heightPct = Math.round((m.focusHours / maxHours) * 100);
              const dayLabel = new Date(m.date).toLocaleDateString('en-US', { weekday: 'short' });

              return (
                <div key={m.id || idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-surface-base text-surface-silver px-2 py-1 rounded border border-surface-border mb-1 text-center pointer-events-none whitespace-nowrap shadow-lg">
                    {m.focusHours}h focus • {m.vitalTasksCompleted} vital
                  </div>

                  {/* Dual Bar: Focus Hours (Indigo) + Vital Tasks (Green Cap) */}
                  <div className="w-full max-w-[42px] bg-surface-elevated rounded-t-lg relative flex flex-col justify-end overflow-hidden" style={{ height: `${Math.max(15, heightPct)}%` }}>
                    <div 
                      className="w-full bg-indigo-600 group-hover:bg-indigo-500 transition-all rounded-t-lg"
                      style={{ height: '100%' }}
                    />
                    {m.vitalTasksCompleted >= 2 && (
                      <div className="absolute top-0 inset-x-0 h-1.5 bg-emerald-400 shadow-sm" />
                    )}
                  </div>

                  <span className="text-[11px] font-semibold text-surface-muted mt-3 group-hover:text-surface-silver transition-colors">
                    {dayLabel}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-surface-muted pt-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-indigo-600 inline-block" /> Focus Hours
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 rounded bg-emerald-400 inline-block" /> 2+ Vital Completed
              </span>
            </div>
            <span>Target: &gt; 3.5h Deep Work / Day</span>
          </div>
        </div>

        {/* Top 3 Lacks / Weaknesses Holding User Back */}
        <div className="lg:col-span-5 clean-card p-6 rounded-2xl border border-surface-border flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-bold text-surface-silver flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              Top 3 Lacks &amp; Weaknesses
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
              Gap Diagnosis
            </span>
          </div>
          <p className="text-xs text-surface-muted mb-4">
            Why you are falling behind your potential and how to correct trajectory:
          </p>

          <div className="space-y-3.5 flex-1 overflow-y-auto pr-1">
            {weaknesses.slice(0, 3).map((w, index) => (
              <div 
                key={w.id} 
                className="p-3.5 rounded-xl bg-surface-elevated/70 border border-surface-border hover:border-surface-muted/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-surface-silver flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 font-bold text-[10px] flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    {w.title}
                  </span>
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    w.impactSeverity === 'critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {w.impactSeverity}
                  </span>
                </div>

                <div className="text-[11px] text-surface-muted mb-2 leading-relaxed">
                  <span className="text-surface-silver font-semibold">Why Falling Behind: </span>
                  {w.whyFallingBehind}
                </div>

                <div className="p-2.5 rounded-lg bg-surface-base border border-indigo-600/30 text-[11px] text-indigo-300 flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>Psychological Fix:</strong> {w.psychologicalRemedy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Manual Daily Progress Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg clean-card p-6 rounded-2xl border border-surface-border shadow-2xl relative">
            <h3 className="text-lg font-bold text-surface-silver mb-1 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              Log Manual Daily Progress
            </h3>
            <p className="text-xs text-surface-muted mb-5">
              Record your actual execution numbers to feed the visual self-analysis charts.
            </p>

            <form onSubmit={handleSaveMetric} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-surface-muted mb-1">Deep Focus (Hours)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="16"
                    required
                    value={focusHours}
                    onChange={(e) => setFocusHours(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-base border border-surface-border focus:border-indigo-600 text-surface-silver text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-surface-muted mb-1">Vital 20% Completed</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    required
                    value={vitalTasks}
                    onChange={(e) => setVitalTasks(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-base border border-surface-border focus:border-indigo-600 text-surface-silver text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-surface-muted mb-1">Maintenance Tasks Done</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    required
                    value={maintenanceTasks}
                    onChange={(e) => setMaintenanceTasks(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-base border border-surface-border focus:border-indigo-600 text-surface-silver text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-surface-muted mb-1">Self-Discipline (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={disciplineRating}
                    onChange={(e) => setDisciplineRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-base border border-surface-border focus:border-indigo-600 text-surface-silver text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-surface-muted mb-1">Evening Execution Reflection</label>
                <textarea
                  rows={2}
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="What was the biggest friction or win today?"
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-base border border-surface-border focus:border-indigo-600 text-surface-silver text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="min-h-[44px] px-4 py-2 rounded-xl border border-surface-border text-surface-muted hover:text-surface-silver text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-wide shadow-md shadow-indigo-600/30"
                >
                  Save Daily Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
