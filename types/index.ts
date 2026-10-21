export type UserRole =
  | 'student'
  | 'business_owner'
  | 'freelancer'
  | 'professional'
  | 'housewife';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url?: string | null;
  role: UserRole | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export type BlueprintTimeframe = '1_year' | '3_year' | '5_year';

export interface BlueprintGoal {
  id: string;
  user_id: string;
  timeframe: BlueprintTimeframe;
  category: string;
  title: string;
  vision_statement: string;
  target_metric: string;
  created_at?: string;
  updated_at?: string;
}

export type LockStatus = 'active' | 'completed' | 'expired';

export interface TimeLockCommitment {
  id: string;
  user_id: string;
  blueprint_id?: string | null;
  focus_title: string;
  why_this_matters: string;
  duration_months: 3 | 6;
  start_date: string;
  locked_until: string;
  status: LockStatus;
  created_at?: string;
  updated_at?: string;
}

// ==========================================
// PHASE 2: 80/20 Pareto & Micro-Task Types
// ==========================================

export type LeverageTier = 'vital_20' | 'maintenance_80';
export type EnergyRequirement = 'deep_focus' | 'quick_execution' | 'routine';
export type TaskPriority = 'critical' | 'high' | 'normal';

export interface ParetoLeverageAction {
  id: string;
  user_id: string;
  blueprint_id?: string | null;
  time_lock_id?: string | null;
  title: string;
  impact_rationale: string; // Why this 20% action moves 80% of the needle
  leverage_tier: LeverageTier;
  estimated_weekly_hours: number;
  created_at?: string;
}

export interface MicroTask {
  id: string;
  user_id: string;
  pareto_action_id: string;
  title: string;
  duration_minutes: 15 | 30 | 45 | 60;
  energy_state: EnergyRequirement;
  leverage_tier: LeverageTier;
  completed: boolean;
  scheduled_date: string;
  completed_at?: string | null;
}

// ==========================================
// PHASE 3: Traffic Light Health Score & Gap Analysis
// ==========================================

export type HealthStatus = 'green' | 'yellow' | 'red';

export interface GapDiagnosis {
  id: string;
  category: 'pareto_drift' | 'time_lock_lag' | 'friction_overload' | 'momentum_loss';
  severity: 'low' | 'moderate' | 'critical';
  title: string;
  description: string;
  prescribed_action: string;
}

export interface HealthScoreReport {
  id: string;
  user_id: string;
  composite_score: number; // 0 - 100
  status: HealthStatus;
  execution_velocity_pct: number;
  pareto_discipline_pct: number;
  time_lock_pace_pct: number;
  diagnoses: GapDiagnosis[];
  evaluated_at: string;
}

export interface RoleArchetypeConfig {
  id: UserRole;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  suggestedFocusAreas: string[];
  defaultGoalsSample: {
    oneYear: string;
    threeYear: string;
    fiveYear: string;
  };
}

