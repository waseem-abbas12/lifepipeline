# LifePipeline — Phase 1: Foundation, User Auth & Life Blueprint Onboarding

LifePipeline is a psychological execution, time management, and life blueprint engine built with Next.js 14, Tailwind CSS, TypeScript, and Supabase.

---

## 🏗️ Phase 1 Architecture Overview

1. **Multi-User Authentication**:
   - Clean email/password sign-up and sign-in pages (`/login` & `/signup`).
   - Integrated Supabase SSR authentication client + sandbox/demo bypass for instant testing.
2. **Dynamic Role Selection Onboarding (`/role-selection`)**:
   - Psychological identity archetypes tailored for:
     - 🎓 **Student & Emerging Scholar** (GPA, skill acquisition, internships)
     - 📈 **Business Owner & Founder** (Revenue, capital efficiency, systems)
     - 💼 **Independent Freelancer** (High-ticket retainers, inbound authority)
     - 🏆 **Corporate Professional** (Executive presence, promotion velocity)
     - 🤝 **Homemaker & Family Anchor** (Family health, personal micro-enterprise, peace)
   - Dynamic 80/20 leverage areas & sample horizon goals tailored per role.
3. **Life Blueprint & Time-Lock Engine (`/blueprint`)**:
   - Multi-horizon quadrant engine: **1-Year (Execution)**, **3-Year (Scaling)**, and **5-Year (Sovereignty)**.
   - **Time-Lock Protocol**: Allows users to lock a single priority for **3 or 6 months** with psychological stakes ("Why failure is unacceptable") and a real-time countdown clock.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase project URL and anon key (or run in Demo Mode right out of the box).

### 3. Database Schema Setup (Supabase)
Run the SQL script located in `supabase/schema.sql` inside your Supabase SQL Editor. It sets up:
- Custom Enums (`user_role`, `blueprint_timeframe`, `lock_status`)
- `profiles` table with auto-creation trigger on user signup
- `blueprints` table (1, 3, 5-Year horizons)
- `time_locks` table (3 and 6-month commitments)
- Row Level Security (RLS) policies protecting tenant isolation

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view LifePipeline.
