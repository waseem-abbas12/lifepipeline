'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X, CheckCircle2, Flame, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '@/lib/audio/soundEngine';

interface PomodoroTimerModalProps {
  taskTitle: string;
  defaultMinutes?: number;
  isOpen: boolean;
  onClose: () => void;
  onTaskComplete?: () => void;
}

export default function PomodoroTimerModal({
  taskTitle,
  defaultMinutes = 25,
  isOpen,
  onClose,
  onTaskComplete,
}: PomodoroTimerModalProps) {
  const [minutes, setMinutes] = useState(defaultMinutes);
  const [secondsLeft, setSecondsLeft] = useState(defaultMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setMinutes(defaultMinutes);
    setSecondsLeft(defaultMinutes * 60);
    setIsRunning(false);
  }, [defaultMinutes, isOpen]);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            sounds.playTaskComplete();
            try {
              confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
            } catch (e) {}
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  if (!isOpen) return null;

  const toggleRun = () => {
    if (!isRunning) {
      sounds.playSprintStart();
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = (newMins: number) => {
    setIsRunning(false);
    setMinutes(newMins);
    setSecondsLeft(newMins * 60);
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const progressPct = ((minutes * 60 - secondsLeft) / (minutes * 60)) * 100;

  const handleFinish = () => {
    sounds.playTaskComplete();
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
    if (onTaskComplete) onTaskComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md clean-card p-6 sm:p-8 rounded-3xl border border-surface-border shadow-2xl relative flex flex-col items-center text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-surface-muted hover:text-white hover:bg-surface-elevated transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/15 border border-indigo-600/30 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Vital 20% Deep Work Silo</span>
        </div>

        {/* Task Title */}
        <h3 className="text-base sm:text-lg font-bold text-surface-silver mb-6 line-clamp-2 px-2">
          {taskTitle}
        </h3>

        {/* Circular Display */}
        <div className="relative w-56 h-56 flex items-center justify-center mb-6">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="112"
              cy="112"
              r="96"
              className="stroke-surface-elevated"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="112"
              cy="112"
              r="96"
              className="stroke-indigo-600 transition-all duration-500"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 96}
              strokeDashoffset={2 * Math.PI * 96 * (1 - progressPct / 100)}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute flex flex-col items-center">
            <span className="text-5xl font-black tracking-tight text-white font-mono">
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </span>
            <span className="text-xs text-surface-muted mt-1 uppercase tracking-widest font-semibold">
              {isRunning ? 'Sprint Active' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2 mb-6">
          {[15, 25, 45].map((m) => (
            <button
              key={m}
              onClick={() => resetTimer(m)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                minutes === m
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-surface-elevated text-surface-muted hover:text-surface-silver'
              }`}
            >
              {m}m
            </button>
          ))}
        </div>

        {/* Main Controls */}
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={() => resetTimer(minutes)}
            className="min-h-[48px] px-4 rounded-xl border border-surface-border hover:border-surface-muted text-surface-muted hover:text-white transition-colors flex items-center justify-center"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleRun}
            className="flex-1 min-h-[50px] px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" /> Pause Sprint
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Start Focus Sprint
              </>
            )}
          </button>

          <button
            onClick={handleFinish}
            title="Mark Completed"
            className="min-h-[48px] px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-400 hover:text-white transition-all flex items-center justify-center"
          >
            <CheckCircle2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
