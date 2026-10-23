'use client';

import { useState, useEffect } from 'react';
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
  RefreshCw, 
  Lightbulb, 
  Crosshair, 
  Check,
  UserCheck
} from 'lucide-react';
import { HealthStatus, HealthScoreReport, GapDiagnosis, FamilyUser } from '@/types';
import { getActiveUser, updateActiveUser } from '@/lib/storage/userManager';
import { ROLE_ARCHETYPES } from '@/lib/constants/roles';

export default function HealthScorePage() {
  const [currentUser, setCurrentUser] = useState<FamilyUser | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const syncState = () => {
    const user = getActiveUser();
    setCurrentUser(user);
  };

  useEffect(() => {
    syncState();
    const handleUpdate = () => syncState();
    window.addEventListener('lifepipeline_state_updated', handleUpdate);
    return () => window.removeEventListener('lifepipeline_state_updated', handleUpdate);
  }, []);

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-surface-muted">
        Loading Diagnostic Calibration...
      </div>
    );
  }

  const report = currentUser.healthReport;

  // 1-Click Psychological Remedy Application
  const applyRemedy = (gapId: string) => {
    updateActiveUser((prev) => {
      const updatedDiagnoses = (prev.healthReport?.diagnoses || []).map((d) =>
        d.id === gapId ? { ...d, resolved: true } : d
      );

      const boost = 10;
      const newScore = Math.min(100, (prev.healthReport?.composite_score || 70) + boost);
      let newStatus: HealthStatus = 'red';
      if (newScore >= 80) newStatus = 'green';
      else if (newScore >= 50) newStatus = 'yellow';

      return {
        ...prev,
        healthReport: {
          ...prev.healthReport,
          composite_score: newScore,
          status: newStatus,
          pareto_discipline_pct: Math.min(100, prev.healthReport.pareto_discipline_pct + 10),
          execution_velocity_pct: Math.min(100, prev.healthReport.execution_velocity_pct + 8),
          diagnoses: updatedDiagnoses,
          summary: 'Remedy applied! Momentum recalibrated upward.',
          evaluated_at: new Date().toISOString(),
        },
      };
    });
  };

  // Re-run diagnostic audit via Gemini Flash API
  const handleRunAudit = async () => {
    setIsAuditing(true);
    try {
      const res = await fetch('/api/gemini/decompose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawThoughts: currentUser.scatteredThoughts || 'Continue execution on core milestones',
          userProfile: {
            name: currentUser.name,
            role: currentUser.role,
            roleTitle: ROLE_ARCHETYPES[currentUser.role]?.title || currentUser.role,
          },
          activeTimeLock: currentUser.activeTimeLock,
          blueprintGoals: currentUser.blueprintGoals,
        }),
      });

      const data = await res.json();
      if (data.healthReport) {
        updateActiveUser((prev) => ({
          ...prev,
          healthReport: {
            ...data.healthReport,
            id: prev.healthReport.id || data.healthReport.id,
            user_id: prev.id,
          },
        }));
      }
    } catch (e) {
      console.error('Audit error:', e);
    } finally {
      setIsAuditing(false);
    }
  };

  const getStatusTheme = (status: HealthStatus) => {
    switch (status) {
      case 'green':
        return {
          label: 'OPTIMAL MOMENTUM',
          textColor: 'text-emerald-400',
          borderColor: 'border-emerald-500/40',
          bgColor: 'bg-emerald-950/20',
          dotColor: 'bg-emerald-400 shadow-emerald-400',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
          summary: report.summary || 'Your execution is firmly concentrated on high-leverage needles. Velocity and Time-Lock adherence are in prime harmony.',
        };
      case 'yellow':
        return {
          label: 'FRICTION WARNING',
          textColor: 'text-amber-400',
          borderColor: 'border-amber-500/40',
          bgColor: 'bg-amber-950/20',
          dotColor: 'bg-amber-400 shadow-amber-400',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
          summary: report.summary || 'Momentum is vulnerable to routine maintenance tasks and friction. Execute the prescribed gap remedies below to return to Green.',
        };
      case 'red':
        return {
          label: 'CRITICAL DRIFT',
          textColor: 'text-rose-400',
          borderColor: 'border-rose-500/40',
          bgColor: 'bg-rose-950/20',
          dotColor: 'bg-rose-400 shadow-rose-400',
          icon: <AlertOctagon className="w-5 h-5 text-rose-400" />,
          summary: report.summary || 'Goal trajectory is at risk. Immediate intervention required: prune non-vital obligations and reset daily micro-commitments.',
        };
    }
  };

  const theme = getStatusTheme(report.status);
  const diagnoses = report.diagnoses || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Traffic Light Diagnostic Engine
            </span>
            <span className="text-surface-muted">•</span>
            <span className="text-xs text-surface-silver flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              Auditing: <strong className="text-white">{currentUser.name}</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-silver tracking-tight">
            Traffic Light Health Score & Gap Analysis
          </h1>
          <p className="text-sm text-surface-muted mt-1">
            Continuous algorithmic audit evaluating Pareto discipline, task velocity, and Time-Lock pacing.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <button
            onClick={handleRunAudit}
            disabled={isAuditing}
            className="w-full sm:w-auto min-h-[46px] px-4 py-2.5 rounded-xl bg-surface-card border border-surface-border hover:border-indigo-600/50 active:scale-98 text-surface-silver font-semibold text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{isAuditing ? 'Auditing with Gemini...' : 'Re-Run AI Diagnostic Audit'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Traffic Light Indicator & Core Composite Pod */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${theme.borderColor} ${theme.bgColor} backdrop-blur-xl mb-10 transition-all`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Traffic Light Physical Pod */}
          <div className="flex items-center gap-6">
            <div className="bg-surface-base p-3 rounded-2xl border border-surface-border flex flex-row lg:flex-col items-center gap-3.5 shadow-inner">
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
              <div className="text-4xl sm:text-5xl font-black text-surface-silver tracking-tight">
                {report.composite_score}
                <span className="text-xl font-medium text-surface-muted"> / 100</span>
              </div>
              <p className="text-xs sm:text-sm text-surface-silver/90 max-w-xl mt-2 leading-relaxed">
                {theme.summary}
              </p>
            </div>
          </div>

          {/* Core Calibration Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0 lg:max-w-md w-full">
            <div className="p-3.5 rounded-xl bg-surface-base/80 border border-surface-border">
              <div className="text-[10px] uppercase font-bold text-surface-muted">Execution Velocity</div>
              <div className="text-xl font-bold text-surface-silver mt-1">{report.execution_velocity_pct}%</div>
              <div className="w-full bg-surface-elevated rounded-full h-1 mt-2">
                <div
                  className="bg-indigo-600 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${report.execution_velocity_pct}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-base/80 border border-surface-border">
              <div className="text-[10px] uppercase font-bold text-surface-muted">80/20 Discipline</div>
              <div className="text-xl font-bold text-surface-silver mt-1">{report.pareto_discipline_pct}%</div>
              <div className="w-full bg-surface-elevated rounded-full h-1 mt-2">
                <div
                  className="bg-emerald-400 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${report.pareto_discipline_pct}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-base/80 border border-surface-border">
              <div className="text-[10px] uppercase font-bold text-surface-muted">Time-Lock Pacing</div>
              <div className="text-xl font-bold text-surface-silver mt-1">{report.time_lock_pace_pct}%</div>
              <div className="w-full bg-surface-elevated rounded-full h-1 mt-2">
                <div
                  className="bg-indigo-400 h-1 rounded-full transition-all duration-300"
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
            <Brain className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-surface-silver tracking-tight">
              Intelligent Gap Analysis Findings
            </h2>
          </div>
          <span className="text-xs text-surface-muted">
            {diagnoses.length} Friction Points Identified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {diagnoses.map((gap) => {
            const isApplied = gap.resolved;
            const severityColor =
              gap.severity === 'critical'
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                : gap.severity === 'moderate'
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';

            return (
              <div
                key={gap.id}
                className={`clean-card p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isApplied
                    ? 'border-emerald-500/30 bg-emerald-950/15'
                    : 'border-surface-border hover:border-indigo-600/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border ${severityColor}`}>
                      {gap.severity} severity
                    </span>
                    <span className="text-[11px] text-surface-muted capitalize">
                      {gap.category.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-surface-silver mb-2 leading-snug">
                    {gap.title}
                  </h3>

                  <p className="text-xs text-surface-muted leading-relaxed mb-4">
                    {gap.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-border">
                  <div className="p-3 rounded-xl bg-surface-base border border-surface-border mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1 mb-1">
                      <Lightbulb className="w-3 h-3" />
                      Prescribed Psychological Remedy:
                    </span>
                    <p className="text-xs text-surface-silver italic">
                      "{gap.prescribed_action}"
                    </p>
                  </div>

                  <button
                    onClick={() => applyRemedy(gap.id)}
                    disabled={isApplied}
                    className={`w-full min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isApplied
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-default'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        Remedy Calibrated (+10 Score)
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

          {diagnoses.length === 0 && (
            <div className="col-span-3 p-10 text-center rounded-2xl bg-surface-card border border-surface-border text-surface-muted text-xs">
              No active friction points diagnosed. You are executing in optimal flow state.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

