'use client';

import { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  AlertOctagon, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Clock, 
  Brain, 
  Sparkles, 
  ArrowRight, 
  RefreshCw,
  Lightbulb,
  Crosshair,
  Check
} from 'lucide-react';
import { HealthStatus, HealthScoreReport, GapDiagnosis } from '@/types';

export default function HealthScorePage() {
  const [report, setReport] = useState<HealthScoreReport>({
    id: 'eval-1',
    user_id: 'u-1',
    composite_score: 68,
    status: 'yellow',
    execution_velocity_pct: 72,
    pareto_discipline_pct: 61,
    time_lock_pace_pct: 69,
    evaluated_at: new Date().toISOString(),
    diagnoses: [
      {
        id: 'gap-1',
        category: 'pareto_drift',
        severity: 'critical',
        title: 'False Productivity Trap (Pareto Drift)',
        description: 'You completed 5 out of 7 tasks this week, but 60% of them were Maintenance 80% tasks (inbox zero, re-organizing docs) rather than Vital 20% needle-movers.',
        prescribed_action: 'Lock a 90-minute morning curfew: No maintenance tasks allowed until 2 Vital 20% items are stamped complete.',
      },
      {
        id: 'gap-2',
        category: 'friction_overload',
        severity: 'moderate',
        title: 'Subconscious Resistance (Chunk Size > 45m)',
        description: 'Two of your high-leverage tasks are scheduled for 60+ minutes without sub-breaks, increasing task initiation friction by an estimated 42%.',
        prescribed_action: 'Deconstruct your 60m Loom outreach block into two rapid 25m sprint bursts with a 5m pause.',
      },
      {
        id: 'gap-3',
        category: 'time_lock_lag',
        severity: 'low',
        title: 'Time-Lock Velocity Variance',
        description: 'You are on Day 18 of your 90-day sprint. Velocity is within acceptable tolerance, but enterprise contract closing pace requires 2 additional discovery calls.',
        prescribed_action: 'Add 1 high-ticket discovery call trigger to tomorrow’s Vital 20% task stack.',
      },
    ],
  });

  const [remediesApplied, setRemediesApplied] = useState<Record<string, boolean>>({});

  const applyRemedy = (gapId: string) => {
    setRemediesApplied(prev => ({ ...prev, [gapId]: true }));

    // Dynamically recalculate score upwards as remedies are applied
    setReport(prev => {
      const newScore = Math.min(100, prev.composite_score + 11);
      const newStatus: HealthStatus = newScore >= 80 ? 'green' : newScore >= 50 ? 'yellow' : 'red';
      return {
        ...prev,
        composite_score: newScore,
        status: newStatus,
        pareto_discipline_pct: Math.min(100, prev.pareto_discipline_pct + 12),
        execution_velocity_pct: Math.min(100, prev.execution_velocity_pct + 9),
      };
    });
  };

  const getStatusTheme = (status: HealthStatus) => {
    switch (status) {
      case 'green':
        return {
          label: 'OPTIMAL MOMENTUM',
          textColor: 'text-emerald-400',
          borderColor: 'border-emerald-500/40',
          bgColor: 'bg-emerald-500/10',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
          summary: 'Your execution is firmly concentrated on high-leverage needles. Velocity and Time-Lock adherence are in prime harmony.',
        };
      case 'yellow':
        return {
          label: 'FRICTION WARNING',
          textColor: 'text-amber-400',
          borderColor: 'border-amber-500/40',
          bgColor: 'bg-amber-500/10',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
          summary: 'Momentum is bleeding through maintenance tasks and slight pacing gaps. Execute the gap remedies below to return to Green.',
        };
      case 'red':
        return {
          label: 'CRITICAL DRIFT',
          textColor: 'text-rose-400',
          borderColor: 'border-rose-500/40',
          bgColor: 'bg-rose-500/10',
          icon: <AlertOctagon className="w-5 h-5 text-rose-400" />,
          summary: 'Goal trajectory is at risk. Immediate intervention required: prune non-vital obligations and reset daily micro-commitments.',
        };
    }
  };

  const theme = getStatusTheme(report.status);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-surface-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Phase 3 Engine: Diagnostic Calibration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Traffic Light Health Score & Gap Analysis
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Algorithmic real-time diagnostic auditing your Pareto discipline, execution velocity, and Time-Lock momentum.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-400">
          <Clock className="w-3.5 h-3.5 text-brand-400" />
          <span>Last Audited: Just now</span>
        </div>
      </div>

      {/* SECTION 1: Traffic Light Indicator & Core Composite Pod */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${theme.borderColor} ${theme.bgColor} backdrop-blur-xl mb-10 transition-all`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Traffic Light Physical Pod */}
          <div className="flex items-center gap-6">
            <div className="bg-gray-950 p-3 rounded-2xl border border-gray-800 flex flex-row lg:flex-col items-center gap-3.5 shadow-inner">
              {/* Red Light */}
              <div
                className={`w-7 h-7 rounded-full transition-all ${
                  report.status === 'red'
                    ? 'bg-rose-500 shadow-lg shadow-rose-500/80 ring-4 ring-rose-500/20'
                    : 'bg-rose-950/40 border border-rose-900/30'
                }`}
              />
              {/* Yellow Light */}
              <div
                className={`w-7 h-7 rounded-full transition-all ${
                  report.status === 'yellow'
                    ? 'bg-amber-400 shadow-lg shadow-amber-400/80 ring-4 ring-amber-400/20'
                    : 'bg-amber-950/40 border border-amber-900/30'
                }`}
              />
              {/* Green Light */}
              <div
                className={`w-7 h-7 rounded-full transition-all ${
                  report.status === 'green'
                    ? 'bg-emerald-400 shadow-lg shadow-emerald-400/80 ring-4 ring-emerald-400/20'
                    : 'bg-emerald-950/40 border border-emerald-900/30'
                }`}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                {theme.icon}
                <span className={`text-xs font-black uppercase tracking-widest ${theme.textColor}`}>
                  {theme.label}
                </span>
              </div>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {report.composite_score}
                <span className="text-xl font-medium text-gray-500"> / 100</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl mt-2 leading-relaxed">
                {theme.summary}
              </p>
            </div>
          </div>

          {/* Core Calibration Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0 lg:max-w-md w-full">
            <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
              <div className="text-[10px] uppercase font-bold text-gray-400">Execution Velocity</div>
              <div className="text-xl font-bold text-white mt-1">{report.execution_velocity_pct}%</div>
              <div className="w-full bg-gray-800 rounded-full h-1 mt-2">
                <div
                  className="bg-brand-500 h-1 rounded-full"
                  style={{ width: `${report.execution_velocity_pct}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
              <div className="text-[10px] uppercase font-bold text-gray-400">80/20 Discipline</div>
              <div className="text-xl font-bold text-white mt-1">{report.pareto_discipline_pct}%</div>
              <div className="w-full bg-gray-800 rounded-full h-1 mt-2">
                <div
                  className="bg-emerald-400 h-1 rounded-full"
                  style={{ width: `${report.pareto_discipline_pct}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
              <div className="text-[10px] uppercase font-bold text-gray-400">Time-Lock Pacing</div>
              <div className="text-xl font-bold text-white mt-1">{report.time_lock_pace_pct}%</div>
              <div className="w-full bg-gray-800 rounded-full h-1 mt-2">
                <div
                  className="bg-teal-400 h-1 rounded-full"
                  style={{ width: `${report.time_lock_pace_pct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Intelligent Gap Analysis Diagnostics */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-brand-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Intelligent Gap Analysis Findings
            </h2>
          </div>
          <span className="text-xs text-gray-400">
            {report.diagnoses.length} Friction Points Identified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {report.diagnoses.map((gap) => {
            const isApplied = remediesApplied[gap.id];
            const severityColor =
              gap.severity === 'critical'
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                : gap.severity === 'moderate'
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                : 'bg-blue-500/20 text-blue-400 border-blue-500/30';

            return (
              <div
                key={gap.id}
                className={`glass-panel p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isApplied
                    ? 'border-emerald-500/30 bg-emerald-950/10'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border ${severityColor}`}>
                      {gap.severity} severity
                    </span>
                    <span className="text-[11px] text-gray-500 capitalize">
                      {gap.category.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {gap.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {gap.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-800/80">
                  <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400 flex items-center gap-1 mb-1">
                      <Lightbulb className="w-3 h-3" />
                      Prescribed Psychological Remedy:
                    </span>
                    <p className="text-xs text-gray-300 italic">
                      "{gap.prescribed_action}"
                    </p>
                  </div>

                  <button
                    onClick={() => applyRemedy(gap.id)}
                    disabled={isApplied}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isApplied
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-default'
                        : 'bg-brand-500 hover:bg-brand-600 text-black shadow-md shadow-brand-500/20'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        Remedy Calibrated (+11 Score)
                      </>
                    ) : (
                      <>
                        <Crosshair className="w-3.5 h-3.5" />
                        Apply Prescribed Remedy
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
