'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Brain, 
  Send, 
  Sparkles, 
  Compass, 
  Lock, 
  User, 
  Zap, 
  CheckCircle2, 
  RefreshCw, 
  BarChart3, 
  Bot,
  AlertCircle
} from 'lucide-react';
import { getActiveUser, saveUserChatMessage } from '@/lib/storage/userManager';
import { FamilyUser, ChatMessage } from '@/types';

export default function AICoachPage() {
  const [user, setUser] = useState<FamilyUser | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sync = () => {
    setUser(getActiveUser());
  };

  useEffect(() => {
    sync();
    const handleUpdate = () => sync();
    window.addEventListener('lifepipeline_state_updated', handleUpdate);
    return () => window.removeEventListener('lifepipeline_state_updated', handleUpdate);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [user?.chatHistory, isSending]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || !user || isSending) return;

    // Immediately save user message to local state
    const userMsg = saveUserChatMessage(user.id, 'user', textToSend.trim());
    setInputMessage('');
    setIsSending(true);
    setNotice(null);
    sync();

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          history: (user.chatHistory || []).map(m => ({ sender: m.sender, message: m.message })),
          userContext: {
            name: user.name,
            role: user.role,
            blueprintGoals: (user.blueprintGoals || []).map(g => ({
              timeframe: g.timeframe,
              title: g.title,
              category: g.category
            })),
            timeLock: user.activeTimeLock ? {
              focus_title: user.activeTimeLock.focus_title,
              why_this_matters: user.activeTimeLock.why_this_matters
            } : undefined,
            compositeScore: user.healthReport.composite_score,
            healthStatus: user.healthReport.status,
            weaknesses: (user.topWeaknesses || []).map(w => ({
              title: w.title,
              whyFallingBehind: w.whyFallingBehind
            }))
          }
        })
      });

      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }

      const data = await res.json();
      if (data.reply) {
        saveUserChatMessage(user.id, 'coach', data.reply);
      }
      if (data.notice) {
        setNotice(data.notice);
      }
    } catch (err: any) {
      console.error('Failed to get coach response:', err);
      saveUserChatMessage(
        user.id, 
        'coach', 
        `I encountered a temporary connection issue. However, based on your active blueprint focus ("${user.activeTimeLock?.focus_title || 'Core Execution'}"), my primary directive is: pick your single highest-leverage Vital 20% micro-task and start a 25-minute focus timer right now.`
      );
    } finally {
      setIsSending(false);
      sync();
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const chatHistory = user.chatHistory || [];

  const quickPrompts = [
    'Analyze my 80/20 leverage today',
    'Why am I feeling resistance starting my task?',
    'Break down my 3-hour focus block',
    'Review my Time-Lock commitment'
  ];

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 h-[calc(100dvh-8rem)] md:h-[calc(100vh-5rem)] flex flex-col">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-surface-border shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/15 border border-indigo-600/30 flex items-center justify-center text-indigo-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-surface-silver">
                AI Life &amp; Execution Coach
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                Gemini Flash
              </span>
            </div>
            <p className="text-xs text-surface-muted">
              Coaching <strong className="text-surface-silver">{user.name.split(' ')[0]}</strong> with full blueprint context
            </p>
          </div>
        </div>

        <Link
          href="/self-analysis"
          className="min-h-[40px] px-3.5 py-1.5 rounded-xl border border-surface-border hover:border-indigo-600/50 bg-surface-elevated text-surface-silver font-semibold text-xs transition-colors flex items-center gap-1.5"
        >
          <BarChart3 className="w-4 h-4 text-indigo-400" />
          <span className="hidden sm:inline">Self-Analysis (Mode 1)</span>
          <span className="sm:hidden">Mode 1</span>
        </Link>
      </div>

      {/* Notice if fallback heuristic is active */}
      {notice && (
        <div className="mt-2.5 p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 text-xs flex items-center gap-2 shrink-0">
          <AlertCircle className="w-4 h-4 shrink-0 text-indigo-400" />
          <span>{notice}</span>
        </div>
      )}

      {/* Blueprint Quick Context Strip */}
      <div className="my-3 px-3 py-2 rounded-xl bg-surface-elevated/50 border border-surface-border text-xs flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 truncate">
          <Lock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="text-surface-muted truncate">Active Focus:</span>
          <span className="text-surface-silver font-medium truncate">{user.activeTimeLock?.focus_title || '90-Day Execution Target'}</span>
        </div>
        <span className="text-[11px] text-surface-muted font-mono shrink-0">
          Health: <strong className="text-indigo-400">{user.healthReport.composite_score}/100</strong>
        </span>
      </div>

      {/* Chat Messages Flow */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-2">
        {chatHistory.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-surface-elevated border border-surface-border text-indigo-400'
                }`}
              >
                {isUser ? user.avatar : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/15'
                    : 'bg-surface-card border border-surface-border text-surface-silver rounded-tl-none shadow-sm'
                }`}
              >
                {msg.message}
                <div
                  className={`text-[9px] mt-2 font-mono ${
                    isUser ? 'text-indigo-200' : 'text-surface-muted'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-surface-elevated border border-surface-border text-indigo-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="bg-surface-card border border-surface-border rounded-2xl rounded-tl-none p-4 text-xs text-surface-muted flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-[11px]">Gemini Flash is analyzing your psychological blueprint...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Strip */}
      <div className="flex items-center gap-2 overflow-x-auto py-2 shrink-0 no-scrollbar">
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            disabled={isSending}
            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-surface-elevated hover:bg-indigo-600/15 border border-surface-border hover:border-indigo-600/40 text-surface-muted hover:text-indigo-300 text-[11px] font-medium transition-all shrink-0 disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="pt-2 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-surface-base border border-surface-border focus-within:border-indigo-600 rounded-2xl p-2 transition-colors shadow-lg"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isSending}
            placeholder={`Message your Life Coach (${user.name.split(' ')[0]})...`}
            className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-surface-silver focus:outline-none placeholder-surface-muted"
          />

          <button
            type="submit"
            disabled={isSending || !inputMessage.trim()}
            className="min-h-[44px] min-w-[44px] px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
