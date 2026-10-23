'use client';

import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Target, 
  Lock, 
  Check, 
  Clock, 
  Zap, 
  BrainCircuit, 
  CheckCircle2,
  Plus,
  RefreshCw,
  Lightbulb,
  Cpu,
  Flame,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { getActiveUser, updateActiveUser } from '@/lib/storage/userManager';
import { FamilyUser, DecomposedItem, MicroTask } from '@/types';
import { ROLE_ARCHETYPES } from '@/lib/constants/roles';

export default function ParetoDecompositionEngine() {
  const [currentUser, setCurrentUser] = useState<FamilyUser | null>(null);
  const [scatteredInput, setScatteredInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiSource, setApiSource] = useState<string | null>(null);
  const [apiNotice, setApiNotice] = useState<string | null>(null);

  // Sync with active user from local storage
  const syncWithActiveUser = () => {
    const user = getActiveUser();
    setCurrentUser(user);
    setScatteredInput(user.scatteredThoughts || '');
  };

  useEffect(() => {
    syncWithActiveUser();
    const handleUpdate = () => syncWithActiveUser();
    window.addEventListener('lifepipeline_state_updated', handleUpdate);
    return () => window.removeEventListener('lifepipeline_state_updated', handleUpdate);
  }, []);

  if (!currentUser) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-surface-muted">
        Loading execution engine...
      </div>
    );
  }

  // Call Gemini Flash API route
  const handleProcessBrainDump = async () => {
    if (!scatteredInput.trim()) return;
    setIsProcessing(true);
    setApiNotice(null);

    try {
      const res = await fetch('/api/gemini/decompose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawThoughts: scatteredInput,
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

      if (!res.ok) {
        throw new Error(data.error || 'Failed to process thoughts with Gemini');
      }

      setApiSource(data.source);
      if (data.notice) {
        setApiNotice(data.notice);
      }

      // Persist results to active user state
      updateActiveUser((prev) => ({
        ...prev,
        scatteredThoughts: scatteredInput,
        decomposedItems: data.decomposedItems || [],
        microTasks: data.microTasks || [],
        healthReport: data.healthReport ? {
          ...data.healthReport,
          id: prev.healthReport.id || data.healthReport.id,
          user_id: prev.id,
        } : prev.healthReport,
      }));
    } catch (err: any) {
      console.error('Error invoking Gemini Flash API:', err);
      alert('Could not complete decomposition: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Toggle Micro-Task completion with instant reactivity
  const handleToggleTask = (taskId: string) => {
    updateActiveUser((prev) => {
      const updatedTasks = prev.microTasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              completed: !t.completed,
              completed_at: !t.completed ? new Date().toISOString() : null,
            }
          : t
      );
      return {
        ...prev,
        microTasks: updatedTasks,
      };
    });
  };

  // Toggle Item between Vital 20% and Maintenance 80%
  const handleToggleItemLeverage = (itemId: string) => {
    updateActiveUser((prev) => {
      const updatedItems = prev.decomposedItems.map((item) => {
        if (item.id === itemId) {
          const newIsVital = !item.isVital20;
          return {
            ...item,
            isVital20: newIsVital,
            leverageScore: newIsVital ? 85 : 30,
            category: newIsVital ? 'Vital 20% Needle-Mover' : 'Maintenance 80%',
          };
        }
        return item;
      });
      return {
        ...prev,
        decomposedItems: updatedItems,
      };
    });
  };

  // Quick add micro-task for a Vital 20% item
  const handleAddMicroTaskFromItem = (item: DecomposedItem) => {
    const newTask: MicroTask = {
      id: `mt-${Date.now()}`,
      user_id: currentUser.id,
      title: `Sprint: ${item.refinedTitle}`,
      duration_minutes: 30,
      energy_state: 'deep_focus',
      leverage_tier: 'vital_20',
      completed: false,
    };

    updateActiveUser((prev) => ({
      ...prev,
      microTasks: [newTask, ...prev.microTasks],
    }));
  };

  // Add custom micro-task
  const handleAddCustomTask = () => {
    const title = prompt('Enter bite-sized micro-task title (must take 15 to 45 mins):');
    if (!title || !title.trim()) return;

    const newTask: MicroTask = {
      id: `mt-${Date.now()}`,
      user_id: currentUser.id,
      title: title.trim(),
      duration_minutes: 30,
      energy_state: 'deep_focus',
      leverage_tier: 'vital_20',
      completed: false,
    };

    updateActiveUser((prev) => ({
      ...prev,
      microTasks: [newTask, ...prev.microTasks],
    }));
  };

  const vitalItems = (currentUser.decomposedItems || []).filter((i) => i.isVital20);
  const maintenanceItems = (currentUser.decomposedItems || []).filter((i) => !i.isVital20);
  const tasks = currentUser.microTasks || [];
  const completedTasksCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Integration Header: Active User Blueprint & Time-Lock Context */}
      <div className="clean-card rounded-2xl p-6 sm:p-7 border border-surface-border mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surface-border">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600/15 text-indigo-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 border border-indigo-600/30">
                <Lock className="w-3.5 h-3.5" />
                Active Focus Lock
              </span>
              <span className="text-surface-muted text-xs">•</span>
              <span className="text-xs text-surface-silver font-medium">
                {currentUser.name} ({ROLE_ARCHETYPES[currentUser.role]?.title || currentUser.role})
              </span>
              <span className="text-surface-muted text-xs">•</span>
              <span className="text-xs text-indigo-400 font-medium">
                {currentUser.activeTimeLock?.duration_months || 3}-Month Commitment
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-surface-silver tracking-tight">
              {currentUser.activeTimeLock?.focus_title || 'No Active Time-Lock Commitment'}
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-base border border-surface-border text-xs text-surface-silver">
              <Cpu className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>AI Engine: <strong className="text-indigo-400 font-semibold">Gemini Flash</strong></span>
            </span>
          </div>
        </div>

        {currentUser.activeTimeLock?.why_this_matters && (
          <p className="text-xs sm:text-sm text-surface-muted italic mt-3">
            <strong className="text-indigo-400 not-italic font-semibold uppercase tracking-wide text-[11px] mr-1.5">
              Psychological Stake:
            </strong>
            "{currentUser.activeTimeLock.why_this_matters}"
          </p>
        )}
      </div>

      {/* Notice Banner if using fallback or live API */}
      {apiNotice && (
        <div className="mb-6 p-4 rounded-xl bg-surface-elevated/90 border border-indigo-600/30 flex items-start gap-3 text-xs text-surface-silver">
          <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold text-indigo-300">Engine Notice: </span>
            {apiNotice}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Scattered Thoughts Brain Dump & Pareto Extraction (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Scattered Thoughts Dump Input */}
          <div className="clean-card rounded-2xl p-6 border border-surface-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base font-bold text-surface-silver">
                  1. Scattered Thoughts & Brain Dump
                </h2>
              </div>
              <span className="text-xs text-surface-muted font-mono">
                One thought per line
              </span>
            </div>

            <p className="text-xs text-surface-muted mb-3 leading-relaxed">
              Dump every chaotic thought, overwhelming to-do, or peripheral distraction. 
              <strong> Google Gemini Flash</strong> will run the Pareto 80/20 filter to isolate the vital levers from routine noise.
            </p>

            <textarea
              rows={7}
              value={scatteredInput}
              onChange={(e) => setScatteredInput(e.target.value)}
              placeholder="e.g. Call high-ticket lead back&#10;Organize desk folders&#10;Fix Stripe subscription webhook&#10;Check social media comments&#10;Draft keynote proposal..."
              className="w-full p-4 rounded-xl bg-surface-base border border-surface-border text-surface-silver text-sm focus:border-indigo-600 focus:outline-none transition-colors resize-none placeholder-surface-muted/60 leading-relaxed font-mono"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
              <span className="text-xs text-surface-muted font-mono">
                {scatteredInput.split('\n').filter((l) => l.trim()).length} raw thoughts captured
              </span>

              <button
                type="button"
                onClick={handleProcessBrainDump}
                disabled={isProcessing || !scatteredInput.trim()}
                className="min-h-[48px] px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm tracking-wide transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Gemini Flash Reasoning...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Run Gemini 80/20 Pareto Extraction</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Section 2: Filtered Pareto 20/80 Outcomes */}
          <div className="clean-card rounded-2xl p-6 border border-surface-border space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-surface-silver flex items-center gap-2">
                  <Zap className="w-5 h-5 text-indigo-400" />
                  2. Pareto 80/20 Filtered Results
                </h2>
                <p className="text-xs text-surface-muted mt-0.5">
                  The Vital 20% needle-movers separated from the 80% routine noise.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-600/15 text-indigo-400 font-bold border border-indigo-600/30">
                  {vitalItems.length} Vital 20%
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-elevated text-surface-muted font-medium">
                  {maintenanceItems.length} Routine 80%
                </span>
              </div>
            </div>

            {/* Vital 20% Levers Stack */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
                The Vital 20% (Yields 80% of Real Progress)
              </span>

              {vitalItems.map((item) => (
                <div
                  key={item.id}
                  className="clean-card-active rounded-xl p-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-bold tracking-wide uppercase">
                          Score {item.leverageScore}/100
                        </span>
                        <span className="text-xs text-surface-muted font-medium">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-surface-silver">
                        {item.refinedTitle}
                      </p>
                      {item.impactRationale && (
                        <p className="text-xs text-surface-muted mt-1.5 italic">
                          "{item.impactRationale}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleAddMicroTaskFromItem(item)}
                        className="min-h-[40px] px-3 py-1.5 rounded-lg bg-surface-base border border-surface-border hover:border-indigo-500 text-surface-silver text-xs font-medium transition-colors flex items-center gap-1.5"
                        title="Create micro-task from this needle mover"
                      >
                        <Plus className="w-3.5 h-3.5 text-indigo-400" />
                        Micro-Task
                      </button>
                      <button
                        onClick={() => handleToggleItemLeverage(item.id)}
                        className="min-h-[40px] px-2.5 py-1.5 rounded-lg bg-surface-base border border-surface-border text-surface-muted hover:text-surface-silver text-xs"
                        title="Demote to Routine 80%"
                      >
                        Demote
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {vitalItems.length === 0 && (
                <div className="p-6 text-center rounded-xl bg-surface-base border border-surface-border text-surface-muted text-xs">
                  No 20% high-leverage actions identified yet. Run Gemini extraction above.
                </div>
              )}
            </div>

            {/* Routine 80% Noise Stack */}
            <div className="space-y-2 pt-2 border-t border-surface-border">
              <span className="text-xs font-bold uppercase tracking-wider text-surface-muted block">
                The 80% Maintenance & Routine Noise (Batch or Defer)
              </span>

              <div className="space-y-1.5">
                {maintenanceItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-surface-base/80 border border-surface-border/60 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2 text-surface-muted">
                      <span className="w-2 h-2 rounded-full bg-surface-border" />
                      <span className="line-clamp-1">{item.refinedTitle}</span>
                    </div>

                    <button
                      onClick={() => handleToggleItemLeverage(item.id)}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium shrink-0 px-2 py-1 rounded bg-indigo-600/10 hover:bg-indigo-600/20 transition-colors"
                    >
                      Promote to 20%
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Actionable Daily Micro-Task Deck (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="clean-card rounded-2xl p-6 border border-surface-border space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-surface-silver flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                  3. Daily Micro-Task Deck
                </h2>
                <p className="text-xs text-surface-muted mt-0.5">
                  Zero initiation friction. Strict 15-45 minute sprints.
                </p>
              </div>

              <div className="text-right">
                <span className="text-base font-extrabold text-indigo-400">
                  {completedTasksCount}/{tasks.length}
                </span>
                <span className="block text-[10px] text-surface-muted uppercase font-semibold">
                  Done Today
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-surface-base rounded-full h-2 overflow-hidden border border-surface-border">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${tasks.length > 0 ? (completedTasksCount / tasks.length) * 100 : 0}%`,
                }}
              />
            </div>

            {/* Micro-Task List with Big Touch Targets (min-h-[56px]) */}
            <div className="space-y-3">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => handleToggleTask(task.id)}
                  className={`w-full text-left min-h-[56px] p-4 rounded-xl border transition-all flex items-start gap-3.5 group clean-card-hover ${
                    task.completed
                      ? 'bg-surface-base/60 border-surface-border/50 opacity-60'
                      : 'clean-card border-surface-border hover:border-indigo-600/60'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                      task.completed
                        ? 'bg-indigo-600 text-white'
                        : 'border-2 border-surface-muted/50 group-hover:border-indigo-500'
                    }`}
                  >
                    {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>

                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium leading-snug ${
                        task.completed
                          ? 'line-through text-surface-muted'
                          : 'text-surface-silver'
                      }`}
                    >
                      {task.title}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-surface-muted px-2 py-0.5 rounded bg-surface-base border border-surface-border">
                        <Clock className="w-3 h-3 text-indigo-400" />
                        {task.duration_minutes} min sprint
                      </span>
                      <span className="text-[11px] text-indigo-400 font-semibold uppercase">
                        {task.energy_state.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </button>
              ))}

              {tasks.length === 0 && (
                <div className="p-8 text-center rounded-xl bg-surface-base border border-surface-border text-surface-muted text-xs">
                  No micro-tasks generated yet. Run Gemini 80/20 extraction on the left.
                </div>
              )}
            </div>

            {/* Add Custom Micro-Task button with min-h-[48px] */}
            <button
              onClick={handleAddCustomTask}
              className="w-full min-h-[48px] py-3 rounded-xl border border-dashed border-surface-border hover:border-indigo-600/50 hover:bg-indigo-600/5 text-surface-silver font-medium text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 text-indigo-400" />
              Add Custom Daily Micro-Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

