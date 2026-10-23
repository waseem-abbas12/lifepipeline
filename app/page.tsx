'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Target, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Cpu, 
  Users, 
  Activity,
  Flame,
  Clock,
  Check,
  BarChart3
} from 'lucide-react';
import { getAllUsers, getActiveUser, setActiveUserId } from '@/lib/storage/userManager';
import { FamilyUser, HealthStatus } from '@/types';
import { ROLE_ARCHETYPES } from '@/lib/constants/roles';

export default function HomePage() {
  const [users, setUsers] = useState<FamilyUser[]>([]);
  const [activeUser, setActiveUser] = useState<FamilyUser | null>(null);

  const syncState = () => {
    setUsers(getAllUsers());
    setActiveUser(getActiveUser());
  };

  useEffect(() => {
    syncState();
    const handleUpdate = () => syncState();
    window.addEventListener('lifepipeline_state_updated', handleUpdate);
    return () => window.removeEventListener('lifepipeline_state_updated', handleUpdate);
  }, []);

  const getTrafficStatusBadge = (status: HealthStatus, score: number) => {
    switch (status) {
      case 'green':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
            {score}/100 Optimal
          </span>
        );
      case 'yellow':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
            {score}/100 Friction
          </span>
        );
      case 'red':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <span className="w-2 h-2 rounded-full bg-rose-400 shadow-sm shadow-rose-400" />
            {score}/100 Stalled
          </span>
        );
    }
  };

  return (
    <div className="relative overflow-hidden py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-600/30 bg-indigo-600/10 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <Cpu className="w-3.5 h-3.5" />
            <span>Family Beta Test (4 Active Profiles) • Powered by Gemini Flash</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-surface-silver mb-5 leading-tight">
            Stop Scattered Thoughts. <br />
            <span className="text-indigo-400">
              Engineer Your Life Blueprint.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-surface-muted mb-8 leading-relaxed">
            LifePipeline is an elite psychological execution engine. Feed your chaotic thoughts into the 
            <strong> Google Gemini Flash API</strong>, isolate the Vital 20% needle-movers, lock radical 3 to 6-month commitments, and monitor momentum with traffic lights.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <Link
              href="/self-analysis"
              className="min-h-[50px] px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Launch Self-Analysis (Mode 1)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/ai-coach"
              className="min-h-[50px] px-6 py-3.5 rounded-xl bg-surface-card border border-indigo-600/40 hover:border-indigo-500 text-indigo-300 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Converse with AI Coach (Mode 2)</span>
            </Link>

            <Link
              href="/decomposition"
              className="min-h-[50px] px-5 py-3.5 rounded-xl bg-surface-card border border-surface-border hover:border-indigo-600/50 text-surface-silver font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>80/20 Engine</span>
            </Link>

            <Link
              href="/login"
              className="min-h-[50px] px-5 py-3.5 rounded-xl bg-surface-card border border-surface-border hover:border-indigo-600/50 text-surface-silver font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4 text-indigo-400" />
              <span>SaaS Login</span>
            </Link>
          </div>
        </div>

        {/* SECTION: 4-User Family Beta Switcher Strip */}
        <div className="clean-card rounded-2xl p-6 border border-surface-border mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-surface-border">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-bold text-surface-silver">
                Family Beta Testing Deck (4 Active Profiles)
              </h2>
            </div>
            <span className="text-xs text-surface-muted">
              Click any family member to switch their active workspace instantly
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {users.map((user) => {
              const isSelected = activeUser?.id === user.id;
              const roleTitle = ROLE_ARCHETYPES[user.role]?.title || user.role;

              return (
                <button
                  key={user.id}
                  onClick={() => setActiveUserId(user.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between group min-h-[140px] ${
                    isSelected
                      ? 'clean-card-active bg-surface-elevated/70'
                      : 'bg-surface-base/80 border-surface-border hover:border-indigo-600/40 hover:bg-surface-elevated/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-surface-elevated text-surface-silver border border-surface-border'
                      }`}>
                        {user.avatar}
                      </div>

                      {isSelected ? (
                        <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Active
                        </span>
                      ) : (
                        <span className="text-[10px] text-surface-muted group-hover:text-indigo-400 font-semibold uppercase">
                          Switch
                        </span>
                      )}
                    </div>

                    <div className="font-bold text-sm text-surface-silver group-hover:text-white line-clamp-1">
                      {user.name}
                    </div>
                    <div className="text-[11px] text-surface-muted mt-0.5 line-clamp-1">
                      {roleTitle}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-surface-border flex items-center justify-between">
                    <span className="text-[11px] text-surface-muted">
                      {user.microTasks?.filter((t) => t.completed).length || 0}/{user.microTasks?.length || 0} tasks
                    </span>
                    {getTrafficStatusBadge(user.healthReport?.status || 'yellow', user.healthReport?.composite_score || 70)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE USER EXECUTION OVERVIEW POD */}
        {activeUser && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
            {/* Active Time Lock Summary */}
            <div className="lg:col-span-6 clean-card rounded-2xl p-6 border border-surface-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600/15 text-indigo-400 border border-indigo-600/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    {activeUser.name}'s Active Focus Lock
                  </span>
                  <span className="text-xs text-amber-400 font-semibold flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    <Flame className="w-3.5 h-3.5" />
                    Non-Negotiable
                  </span>
                </div>

                <h3 className="text-lg font-bold text-surface-silver mb-2 leading-snug">
                  {activeUser.activeTimeLock?.focus_title || 'No Active Time-Lock Commitment Set'}
                </h3>

                {activeUser.activeTimeLock?.why_this_matters && (
                  <p className="text-xs text-surface-muted italic bg-surface-base/80 p-3 rounded-xl border border-surface-border">
                    "{activeUser.activeTimeLock.why_this_matters}"
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between">
                <span className="text-xs text-surface-muted">
                  Window: {activeUser.activeTimeLock?.duration_months || 3} Months
                </span>
                <Link
                  href="/blueprint"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  Manage Horizon Goals <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Active Micro-Tasks Snapshot */}
            <div className="lg:col-span-6 clean-card rounded-2xl p-6 border border-surface-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-lg bg-surface-elevated text-surface-silver text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    Today's Micro-Task Deck
                  </span>
                  <span className="text-xs text-indigo-400 font-bold">
                    {activeUser.microTasks?.filter((t) => t.completed).length || 0} / {activeUser.microTasks?.length || 0} Completed
                  </span>
                </div>

                <div className="space-y-2">
                  {(activeUser.microTasks || []).slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 ${
                        task.completed
                          ? 'bg-surface-base/60 border-surface-border/50 text-surface-muted line-through'
                          : 'bg-surface-base border-surface-border text-surface-silver font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2 line-clamp-1">
                        <span className={`w-2 h-2 rounded-full ${task.completed ? 'bg-indigo-600' : 'bg-surface-muted'}`} />
                        <span className="line-clamp-1">{task.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-indigo-400 shrink-0">
                        {task.duration_minutes}m
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between">
                <span className="text-xs text-surface-muted">
                  Gemini Flash 80/20 Breakdown
                </span>
                <Link
                  href="/decomposition"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  Open 80/20 Task Engine <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 3 Core Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="clean-card p-6 rounded-2xl border border-surface-border">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/15 border border-indigo-600/30 flex items-center justify-center mb-4 text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-surface-silver mb-2">Gemini Flash AI Brain</h3>
            <p className="text-xs text-surface-muted leading-relaxed">
              Ruthlessly parses messy, scattered brain dumps into Vital 20% needle-movers and friction-free daily micro-tasks.
            </p>
          </div>

          <div className="clean-card p-6 rounded-2xl border border-surface-border">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/15 border border-indigo-600/30 flex items-center justify-center mb-4 text-indigo-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-surface-silver mb-2">3-6 Month Time-Lock</h3>
            <p className="text-xs text-surface-muted leading-relaxed">
              Anchors high-agency commitment with explicit psychological stakes and countdown clocks to eliminate shiny object syndrome.
            </p>
          </div>

          <div className="clean-card p-6 rounded-2xl border border-surface-border">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/15 border border-indigo-600/30 flex items-center justify-center mb-4 text-indigo-400">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-surface-silver mb-2">Traffic Light Diagnostics</h3>
            <p className="text-xs text-surface-muted leading-relaxed">
              Real-time Green/Yellow/Red momentum indicators with 1-click psychological remedies that immediately boost execution velocity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

