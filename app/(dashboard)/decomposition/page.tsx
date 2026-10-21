'use client';

import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Target, 
  Lock, 
  ArrowRight, 
  Check, 
  Trash2, 
  Clock, 
  Zap, 
  BrainCircuit, 
  ChevronRight,
  Filter,
  CheckCircle2,
  Plus,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { TimeLockCommitment, BlueprintGoal } from '@/types';

// Structured item parsed from user brain dump
interface DecomposedItem {
  id: string;
  originalText: string;
  refinedTitle: string;
  leverageScore: number; // 0 - 100
  isVital20: boolean;    // true = Vital 20% | false = 80% Noise/Maintenance
  category: string;
  estimatedMinutes: number;
}

interface DailyMicroTask {
  id: string;
  decomposedItemId: string;
  title: string;
  durationMinutes: 15 | 30 | 45;
  completed: boolean;
  scheduledTime?: string;
}

export default function ParetoDecompositionEngine() {
  // Phase 1 Integration: Active Time-Lock Commitment or 1-Yr Goal Context
  const [activeTarget, setActiveTarget] = useState({
    title: 'Scale SaaS Platform to $1.2M ARR with Autonomous Operations',
    timeframe: 'Active 3-Month Time-Lock Commitment',
    psychologicalStake: 'Failure means getting stuck trading hours for dollars. Achieving this provides absolute family autonomy.',
  });

  // State: Scattered Thoughts Input (Brain Dump)
  const [scatteredInput, setScatteredInput] = useState(
    'Need to fix onboarding drop-off\nRedo team Slack channels\nRecord 5 personalized cold Loom demos for enterprise leads\nClean up old Notion notes\nShip Stripe automated billing webhook\nReply to routine customer emails\nUpdate social media header graphic\nInterview high-ticket sales closer candidate'
  );

  const [isProcessing, setIsProcessing] = useState(false);

  // State: Pareto 20/80 Processed Items
  const [items, setItems] = useState<DecomposedItem[]>([
    {
      id: 'item-1',
      originalText: 'Record 5 personalized cold Loom demos for enterprise leads',
      refinedTitle: 'Record 5 Personalized Cold Loom Demos for Enterprise Leads',
      leverageScore: 94,
      isVital20: true,
      category: 'Pipeline & Revenue',
      estimatedMinutes: 45,
    },
    {
      id: 'item-2',
      originalText: 'Ship Stripe automated billing webhook',
      refinedTitle: 'Ship Stripe Automated Billing Webhook & Subscription Listener',
      leverageScore: 89,
      isVital20: true,
      category: 'Infrastructure',
      estimatedMinutes: 45,
    },
    {
      id: 'item-3',
      originalText: 'Interview high-ticket sales closer candidate',
      refinedTitle: 'Interview High-Ticket Sales Closer Candidate',
      leverageScore: 82,
      isVital20: true,
      category: 'Leverage & Team',
      estimatedMinutes: 30,
    },
    {
      id: 'item-4',
      originalText: 'Redo team Slack channels',
      refinedTitle: 'Reorganize internal team Slack channels',
      leverageScore: 28,
      isVital20: false,
      category: 'Routine Admin',
      estimatedMinutes: 15,
    },
    {
      id: 'item-5',
      originalText: 'Clean up old Notion notes',
      refinedTitle: 'Archive outdated workspace Notion pages',
      leverageScore: 22,
      isVital20: false,
      category: 'Routine Admin',
      estimatedMinutes: 15,
    },
    {
      id: 'item-6',
      originalText: 'Update social media header graphic',
      refinedTitle: 'Design and upload new social media banner',
      leverageScore: 19,
      isVital20: false,
      category: 'Low-Impact Cosmetics',
      estimatedMinutes: 30,
    },
  ]);

  // State: Daily Actionable Micro-Tasks
  const [microTasks, setMicroTasks] = useState<DailyMicroTask[]>([
    {
      id: 'mt-1',
      decomposedItemId: 'item-1',
      title: 'Target 5 B2B Founders on LinkedIn and record 90-sec Loom videos',
      durationMinutes: 45,
      completed: true,
    },
    {
      id: 'mt-2',
      decomposedItemId: 'item-1',
      title: 'Send follow-up Loom links with 1-click booking link',
      durationMinutes: 15,
      completed: false,
    },
    {
      id: 'mt-3',
      decomposedItemId: 'item-2',
      title: 'Write Stripe webhook handler for checkout.session.completed',
      durationMinutes: 45,
      completed: false,
    },
    {
      id: 'mt-4',
      decomposedItemId: 'item-3',
      title: 'Conduct 30-min candidate interview & scoring assessment',
      durationMinutes: 30,
      completed: false,
    },
  ]);

  // Load Time-Lock commitment from localStorage if available (Phase 1 Integration)
  useEffect(() => {
    try {
      const savedLock = localStorage.getItem('lifepipeline_active_timelock');
      if (savedLock) {
        const parsed = JSON.parse(savedLock);
        if (parsed.focus_title) {
          setActiveTarget({
            title: parsed.focus_title,
            timeframe: `${parsed.duration_months || 3}-Month Time-Locked Focus`,
            psychologicalStake: parsed.why_this_matters || activeTarget.psychologicalStake,
          });
        }
      }
    } catch (e) {
      // Graceful fallback
    }
  }, []);

  // Pareto 80/20 Processing Algorithm
  const handleProcessBrainDump = () => {
    if (!scatteredInput.trim()) return;
    setIsProcessing(true);

    setTimeout(() => {
      const lines = scatteredInput
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0);

      // High leverage keywords indicating 80% outcome drivers
      const highLeverageRegex = /(sales|revenue|demo|client|contract|customer|stripe|billing|hire|closer|launch|lead|convert|ship|outreach)/i;

      const analyzed: DecomposedItem[] = lines.map((line, idx) => {
        const isHigh = highLeverageRegex.test(line);
        const score = isHigh ? Math.floor(75 + Math.random() * 24) : Math.floor(15 + Math.random() * 35);
        return {
          id: `item-${Date.now()}-${idx}`,
          originalText: line,
          refinedTitle: line.charAt(0).toUpperCase() + line.slice(1),
          leverageScore: score,
          isVital20: score >= 70,
          category: isHigh ? 'High-Leverage Needle' : 'Maintenance / Routine',
          estimatedMinutes: isHigh ? 45 : 15,
        };
      });

      analyzed.sort((a, b) => b.leverageScore - a.leverageScore);
      setItems(analyzed);

      // Auto-generate micro-tasks from the Vital 20% items
      const vitals = analyzed.filter(i => i.isVital20);
      const generatedTasks: DailyMicroTask[] = vitals.flatMap((v) => [
        {
          id: `mt-${Date.now()}-${v.id}-1`,
          decomposedItemId: v.id,
          title: `Focus Sprint: ${v.refinedTitle}`,
          durationMinutes: (v.estimatedMinutes <= 30 ? 30 : 45) as 15 | 30 | 45,
          completed: false,
        },
      ]);

      if (generatedTasks.length > 0) {
        setMicroTasks(generatedTasks);
      }

      setIsProcessing(false);
    }, 400);
  };

  const toggleTask = (id: string) => {
    setMicroTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const toggleItemLeverage = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              isVital20: !item.isVital20,
              leverageScore: !item.isVital20 ? 80 : 30,
            }
          : item
      )
    );
  };

  const addMicroTaskForVital = (vitalItem: DecomposedItem) => {
    const newTask: DailyMicroTask = {
      id: `mt-${Date.now()}`,
      decomposedItemId: vitalItem.id,
      title: `Sub-task for: ${vitalItem.refinedTitle}`,
      durationMinutes: 30,
      completed: false,
    };
    setMicroTasks(prev => [newTask, ...prev]);
  };

  const vitalItems = items.filter(i => i.isVital20);
  const maintenanceItems = items.filter(i => !i.isVital20);
  const completedTasksCount = microTasks.filter(t => t.completed).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Integration Header: Active Blueprint Time-Lock Context */}
      <div className="clean-card rounded-2xl p-6 sm:p-7 border border-surface-border mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surface-border">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600/15 text-indigo-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 border border-indigo-600/30">
                <Lock className="w-3.5 h-3.5" />
                Phase 1 Blueprint Integration
              </span>
              <span className="text-surface-muted text-xs">•</span>
              <span className="text-xs text-surface-silver font-medium">
                {activeTarget.timeframe}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-surface-silver tracking-tight">
              {activeTarget.title}
            </h1>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-base border border-surface-border text-xs text-surface-muted">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Target Alignment: <strong>Locked</strong></span>
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-surface-muted italic mt-3">
          <strong className="text-indigo-400 not-italic font-semibold uppercase tracking-wide text-[11px] mr-1.5">
            Psychological Stake:
          </strong>
          "{activeTarget.psychologicalStake}"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Scattered Thoughts Brain Dump & Pareto Extraction (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Scattered Thoughts Dump Input */}
          <div className="clean-card rounded-2xl p-6 border border-surface-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-indigo-500" />
                <h2 className="text-base font-bold text-surface-silver">
                  1. Scattered Thoughts & Task Dump
                </h2>
              </div>
              <span className="text-xs text-surface-muted">
                One thought or task per line
              </span>
            </div>

            <p className="text-xs text-surface-muted mb-3 leading-relaxed">
              Dump every distraction, overwhelming to-do item, or scattered thought. The Pareto 80/20 algorithm will filter out the noise and isolate the few vital needle-movers.
            </p>

            <textarea
              rows={6}
              value={scatteredInput}
              onChange={(e) => setScatteredInput(e.target.value)}
              placeholder="e.g. Call lead back&#10;Fix homepage typo&#10;Launch customer outreach&#10;Organize files..."
              className="w-full p-4 rounded-xl bg-surface-base border border-surface-border text-surface-silver text-sm focus:border-indigo-600 focus:outline-none transition-colors resize-none placeholder-surface-muted/60 leading-relaxed font-mono"
            />

            <div className="flex items-center justify-between gap-3 mt-4">
              <span className="text-xs text-surface-muted font-mono">
                {scatteredInput.split('\n').filter(l => l.trim()).length} raw items entered
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
                    Extracting 80/20...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Run 80/20 Pareto Extraction
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
                  <Zap className="w-5 h-5 text-indigo-500" />
                  2. Pareto 80/20 Filtered Results
                </h2>
                <p className="text-xs text-surface-muted mt-0.5">
                  High-leverage needle movers separated from routine busywork.
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
                The Vital 20% (Yields 80% of Progress)
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
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => addMicroTaskForVital(item)}
                        className="min-h-[40px] px-3 py-1.5 rounded-lg bg-surface-base border border-surface-border hover:border-indigo-500 text-surface-silver text-xs font-medium transition-colors flex items-center gap-1.5"
                        title="Create micro-task from this driver"
                      >
                        <Plus className="w-3.5 h-3.5 text-indigo-400" />
                        Micro-Task
                      </button>
                      <button
                        onClick={() => toggleItemLeverage(item.id)}
                        className="min-h-[40px] px-2.5 py-1.5 rounded-lg bg-surface-base border border-surface-border text-surface-muted hover:text-surface-silver text-xs"
                        title="Demote to 80% Routine"
                      >
                        Demote
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {vitalItems.length === 0 && (
                <div className="p-6 text-center rounded-xl bg-surface-base border border-surface-border text-surface-muted text-xs">
                  No 20% high-leverage actions identified yet. Run extraction above.
                </div>
              )}
            </div>

            {/* Routine 80% Noise Stack */}
            <div className="space-y-2 pt-2 border-t border-surface-border">
              <span className="text-xs font-bold uppercase tracking-wider text-surface-muted block">
                The 80% Maintenance & Noise (Defer or Delegate)
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
                      onClick={() => toggleItemLeverage(item.id)}
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
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  3. Daily Micro-Task Deck
                </h2>
                <p className="text-xs text-surface-muted mt-0.5">
                  Friction-free, bite-sized tasks under 45 minutes.
                </p>
              </div>

              <div className="text-right">
                <span className="text-base font-extrabold text-indigo-400">
                  {completedTasksCount}/{microTasks.length}
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
                  width: `${microTasks.length > 0 ? (completedTasksCount / microTasks.length) * 100 : 0}%`,
                }}
              />
            </div>

            {/* Micro-Task List with Large Touch Targets (min-h-[56px]) */}
            <div className="space-y-3">
              {microTasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => toggleTask(task.id)}
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
                        {task.durationMinutes} min sprint
                      </span>
                      <span className="text-[11px] text-indigo-400 font-semibold">
                        Vital 20%
                      </span>
                    </div>
                  </div>
                </button>
              ))}

              {microTasks.length === 0 && (
                <div className="p-8 text-center rounded-xl bg-surface-base border border-surface-border text-surface-muted text-xs">
                  No micro-tasks generated yet. Process your brain dump on the left to extract actionable chunks.
                </div>
              )}
            </div>

            {/* Quick Add Custom Micro-Task with large touch target */}
            <button
              onClick={() => {
                const title = prompt('Enter quick micro-task title (under 45 mins):');
                if (title) {
                  setMicroTasks([
                    {
                      id: `mt-${Date.now()}`,
                      decomposedItemId: 'custom',
                      title,
                      durationMinutes: 30,
                      completed: false,
                    },
                    ...microTasks,
                  ]);
                }
              }}
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
