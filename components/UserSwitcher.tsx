'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Check, 
  ChevronDown, 
  RotateCcw, 
  Edit3, 
  Sparkles,
  Lock,
  Activity,
  X
} from 'lucide-react';
import { 
  getAllUsers, 
  getActiveUser, 
  setActiveUserId, 
  updateUserById, 
  resetAllDataToDefault 
} from '@/lib/storage/userManager';
import { FamilyUser, HealthStatus } from '@/types';
import { ROLE_ARCHETYPES } from '@/lib/constants/roles';

export default function UserSwitcher() {
  const [users, setUsers] = useState<FamilyUser[]>([]);
  const [activeUser, setActiveUser] = useState<FamilyUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const syncState = () => {
    const all = getAllUsers();
    setUsers(all);
    const active = getActiveUser();
    setActiveUser(active);
  };

  useEffect(() => {
    syncState();
    const handleUpdate = () => syncState();
    window.addEventListener('lifepipeline_state_updated', handleUpdate);
    return () => window.removeEventListener('lifepipeline_state_updated', handleUpdate);
  }, []);

  if (!activeUser) return null;

  const handleSwitchUser = (id: string) => {
    setActiveUserId(id);
    setIsOpen(false);
  };

  const startRename = (user: FamilyUser, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(user.id);
    setEditName(user.name);
  };

  const saveRename = (userId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;
    updateUserById(userId, (prev) => ({
      ...prev,
      name: editName.trim(),
    }));
    setEditingId(null);
  };

  const getTrafficStatusBadge = (status: HealthStatus, score: number) => {
    switch (status) {
      case 'green':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
            {score}/100 Optimal
          </span>
        );
      case 'yellow':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
            {score}/100 Friction
          </span>
        );
      case 'red':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <span className="w-2 h-2 rounded-full bg-rose-400 shadow-sm shadow-rose-400" />
            {score}/100 Stalled
          </span>
        );
    }
  };

  return (
    <>
      {/* Navbar Trigger Button with Big Touch Target (min-h-[44px]) */}
      <button
        onClick={() => setIsOpen(true)}
        className="min-h-[44px] px-3 sm:px-3.5 py-1.5 rounded-xl bg-surface-card hover:bg-surface-elevated border border-surface-border hover:border-indigo-600/50 transition-all flex items-center gap-2.5 text-left text-xs text-surface-silver group"
        title="Switch Family Beta Profile (4 Users)"
      >
        <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
          {activeUser.avatar}
        </div>

        <div className="hidden sm:block">
          <div className="font-bold text-surface-silver leading-tight line-clamp-1">
            {activeUser.name}
          </div>
          <div className="text-[10px] text-surface-muted capitalize">
            {ROLE_ARCHETYPES[activeUser.role]?.title?.split(' ')[0] || activeUser.role}
          </div>
        </div>

        {/* Live Traffic Light Pill */}
        <div className="shrink-0">
          <span
            className={`w-2.5 h-2.5 rounded-full block ${
              activeUser.healthReport?.status === 'green'
                ? 'bg-emerald-400 shadow-sm shadow-emerald-400'
                : activeUser.healthReport?.status === 'yellow'
                ? 'bg-amber-400 shadow-sm shadow-amber-400'
                : 'bg-rose-400 shadow-sm shadow-rose-400'
            }`}
          />
        </div>

        <ChevronDown className="w-3.5 h-3.5 text-surface-muted group-hover:text-surface-silver transition-colors" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-surface-card rounded-2xl border border-surface-border p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-surface-border mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-indigo-600/15 text-indigo-400 border border-indigo-600/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Family Beta Mode
                  </span>
                  <span className="text-xs text-surface-muted">• 4 Isolated Profiles</span>
                </div>
                <h3 className="text-xl font-bold text-surface-silver">
                  Switch Active Family Member
                </h3>
                <p className="text-xs text-surface-muted mt-0.5">
                  Each family profile maintains its own Blueprint, Time-Lock, Brain Dump, and Gemini 80/20 task deck.
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-surface-muted hover:text-surface-silver hover:bg-surface-elevated transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 4 Users Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              {users.map((user) => {
                const isCurrent = user.id === activeUser.id;
                const roleConfig = ROLE_ARCHETYPES[user.role];

                return (
                  <div
                    key={user.id}
                    onClick={() => handleSwitchUser(user.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between group ${
                      isCurrent
                        ? 'clean-card-active bg-surface-elevated/70'
                        : 'bg-surface-base/80 border-surface-border hover:border-indigo-600/40 hover:bg-surface-elevated/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                            isCurrent
                              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                              : 'bg-surface-elevated text-surface-silver border border-surface-border'
                          }`}>
                            {user.avatar}
                          </div>
                          <div>
                            {editingId === user.id ? (
                              <form onSubmit={(e) => saveRename(user.id, e)} className="flex items-center gap-1.5">
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="px-2 py-0.5 rounded bg-surface-base border border-indigo-600 text-xs text-white focus:outline-none"
                                  autoFocus
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <button
                                  type="submit"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-1 rounded bg-indigo-600 text-white text-[10px]"
                                >
                                  <Check className="w-3 h-3" />
                                </button>
                              </form>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-sm font-bold text-surface-silver">
                                  {user.name}
                                </h4>
                                <button
                                  onClick={(e) => startRename(user, e)}
                                  className="opacity-0 group-hover:opacity-100 p-1 text-surface-muted hover:text-indigo-400 transition-opacity"
                                  title="Rename profile"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                            <p className="text-[11px] text-surface-muted">
                              {roleConfig?.title || user.role}
                            </p>
                          </div>
                        </div>

                        {isCurrent ? (
                          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        ) : null}
                      </div>

                      {/* Active Time Lock Snippet */}
                      <div className="p-2.5 rounded-lg bg-surface-base/90 border border-surface-border mb-3 text-xs">
                        <div className="flex items-center gap-1 text-[10px] text-indigo-400 font-bold uppercase mb-0.5">
                          <Lock className="w-3 h-3" />
                          <span>{user.activeTimeLock?.duration_months || 3}-Mo Time-Lock</span>
                        </div>
                        <p className="text-surface-silver font-medium line-clamp-1 text-xs">
                          {user.activeTimeLock?.focus_title || 'No active focus locked'}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Status Row */}
                    <div className="flex items-center justify-between pt-2 border-t border-surface-border text-xs">
                      <span className="text-[11px] text-surface-muted">
                        {user.microTasks?.filter(t => t.completed).length || 0}/{user.microTasks?.length || 0} tasks done
                      </span>
                      {getTrafficStatusBadge(user.healthReport?.status || 'yellow', user.healthReport?.composite_score || 70)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-surface-border">
              <button
                onClick={() => {
                  if (confirm('Reset all 4 beta user profiles back to original seed data? This will clear custom tasks.')) {
                    resetAllDataToDefault();
                    setIsOpen(false);
                  }
                }}
                className="px-3.5 py-2 rounded-xl text-xs text-surface-muted hover:text-rose-400 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Demo Seed Data
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all"
              >
                Close Switcher
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

