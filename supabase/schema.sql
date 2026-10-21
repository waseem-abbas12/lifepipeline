-- ==============================================================================
-- LIFEPIPELINE: Phase 1 Database Schema (PostgreSQL / Supabase)
-- Core Multi-Tenant Architecture with Row-Level Security (RLS)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Custom Enums
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM (
        'student',
        'business_owner',
        'freelancer',
        'professional',
        'housewife'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE blueprint_timeframe AS ENUM (
        '1_year',
        '3_year',
        '5_year'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE lock_status AS ENUM (
        'active',
        'completed',
        'expired'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role user_role,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Life Blueprints Table (1-Year, 3-Year, 5-Year Visionary Milestones)
CREATE TABLE IF NOT EXISTS public.blueprints (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    timeframe blueprint_timeframe NOT NULL,
    category TEXT NOT NULL, -- e.g. "Career & Wealth", "Health & Energy", "Mindset", "Impact"
    title TEXT NOT NULL,
    vision_statement TEXT NOT NULL,
    target_metric TEXT, -- Measurable definition of done (e.g. "$100k ARR", "Sub-15% body fat")
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Time-Lock Engine Table (3 to 6-Month Hard Execution Commitments)
CREATE TABLE IF NOT EXISTS public.time_locks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    blueprint_id UUID REFERENCES public.blueprints(id) ON DELETE SET NULL,
    focus_title TEXT NOT NULL,
    why_this_matters TEXT NOT NULL, -- Psychological anchor: why failure is not an option
    duration_months INTEGER NOT NULL CHECK (duration_months IN (3, 6)),
    start_date DATE DEFAULT CURRENT_DATE NOT NULL,
    locked_until DATE NOT NULL,
    status lock_status DEFAULT 'active' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Indices for Ultra-Fast Lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_blueprints_user_timeframe ON public.blueprints(user_id, timeframe);
CREATE INDEX IF NOT EXISTS idx_time_locks_user_status ON public.time_locks(user_id, status);

-- 7. Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_locks ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Blueprints Policies
CREATE POLICY "Users can view their own blueprints"
    ON public.blueprints FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own blueprints"
    ON public.blueprints FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own blueprints"
    ON public.blueprints FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own blueprints"
    ON public.blueprints FOR DELETE
    USING (auth.uid() = user_id);

-- Time Locks Policies
CREATE POLICY "Users can view their own time locks"
    ON public.time_locks FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own time locks"
    ON public.time_locks FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own time locks"
    ON public.time_locks FOR UPDATE
    USING (auth.uid() = user_id);

-- ==============================================================================
-- PHASE 2: 80/20 Pareto Leverage Actions & Daily Micro-Tasks
-- ==============================================================================

DO $$ BEGIN
    CREATE TYPE leverage_tier_type AS ENUM ('vital_20', 'maintenance_80');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE energy_state_type AS ENUM ('deep_focus', 'quick_execution', 'routine');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 9. Pareto Leverage Actions (Extracts the 20% high-leverage drivers)
CREATE TABLE IF NOT EXISTS public.pareto_actions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    blueprint_id UUID REFERENCES public.blueprints(id) ON DELETE CASCADE,
    time_lock_id UUID REFERENCES public.time_locks(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    impact_rationale TEXT NOT NULL,
    leverage_tier leverage_tier_type DEFAULT 'vital_20' NOT NULL,
    estimated_weekly_hours NUMERIC(4,1) DEFAULT 5.0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Daily Micro-Tasks (15-60 min bite-sized actionable execution units)
CREATE TABLE IF NOT EXISTS public.daily_micro_tasks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    pareto_action_id UUID REFERENCES public.pareto_actions(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes IN (15, 30, 45, 60)),
    energy_state energy_state_type DEFAULT 'deep_focus' NOT NULL,
    leverage_tier leverage_tier_type DEFAULT 'vital_20' NOT NULL,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    scheduled_date DATE DEFAULT CURRENT_DATE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_pareto_user ON public.pareto_actions(user_id);
CREATE INDEX IF NOT EXISTS idx_micro_tasks_user_date ON public.daily_micro_tasks(user_id, scheduled_date);

ALTER TABLE public.pareto_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_micro_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own pareto actions"
    ON public.pareto_actions FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own micro tasks"
    ON public.daily_micro_tasks FOR ALL
    USING (auth.uid() = user_id);

-- ==============================================================================
-- PHASE 3: Traffic Light Health Score & Gap Analysis System
-- ==============================================================================

DO $$ BEGIN
    CREATE TYPE traffic_health_status AS ENUM ('green', 'yellow', 'red');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 11. Health Score Evaluations Table
CREATE TABLE IF NOT EXISTS public.traffic_light_evaluations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    composite_score INTEGER NOT NULL CHECK (composite_score BETWEEN 0 AND 100),
    status traffic_health_status NOT NULL,
    execution_velocity_pct NUMERIC(5,2) NOT NULL,
    pareto_discipline_pct NUMERIC(5,2) NOT NULL,
    time_lock_pace_pct NUMERIC(5,2) NOT NULL,
    gap_diagnoses JSONB DEFAULT '[]'::jsonb NOT NULL,
    evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_health_user_date ON public.traffic_light_evaluations(user_id, evaluated_at);

ALTER TABLE public.traffic_light_evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own health score evaluations"
    ON public.traffic_light_evaluations FOR ALL
    USING (auth.uid() = user_id);

-- 8. Automatic Profile Creation Trigger on Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, onboarding_completed)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        FALSE
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger binding
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
