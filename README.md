# LifePipeline — Complete MVP (Family Beta & Gemini Flash 80/20 Engine)

LifePipeline is a psychological execution and time management SaaS built with Next.js 14, TypeScript, Tailwind CSS, and powered by the **Google Gemini Flash API**.

---

## ⚡ Core MVP Architecture

### 1. 👨‍👩‍👧‍👧 Multi-User Family Beta Engine (4 Profiles)
- Pre-configured profiles ready for instant testing:
  - **Waseem (Founder)**: Business Owner & Founder archetype
  - **Ayesha (Sister 1)**: Student & Emerging Scholar archetype
  - **Fatima (Sister 2)**: Corporate Professional & Executive archetype
  - **Maryam (Sister 3)**: Independent Freelancer & Consultant archetype
- **Instant Switcher**: 1-click switcher in the navbar and on the homepage.
- **Isolated Persistence**: Blueprints, Time-Locks, Brain Dumps, Micro-Tasks, and Traffic Light Health Scores are saved per user in browser local storage (`lifepipeline_beta_state_v1`). Data is never lost on refresh.

### 2. 🧠 Google Gemini Flash AI Brain
- Route: `/api/gemini/decompose`
- Instructed with an elite psychological execution coach system prompt applying the Pareto 80/20 principle.
- Takes chaotic brain dumps + active time-locks and outputs:
  - **The Vital 20%**: Needle-movers with leverage scores (70-100) and psychological impact rationales.
  - **The Routine 80%**: Maintenance and noise to defer or batch.
  - **Daily Micro-Tasks**: Bite-sized sprints (15, 30, 45 mins) designed for zero initiation friction.
  - **Traffic Light Diagnostic Assessment**: Dynamic health score and gap analysis.
- Includes a smart offline/heuristic fallback so the app works seamlessly even before adding your Gemini API key.

### 3. 🚦 Traffic Light Health System
- Green (`#10B981`): Optimal Momentum (high Vital 20% execution)
- Yellow (`#F59E0B`): Friction Warning (vulnerable to routine busywork)
- Red (`#EF4444`): Critical Drift (stalled trajectory)
- 1-Click Psychological Remedies: Apply remedies directly to resolve bottlenecks and instantly boost composite score.

### 4. 🎨 Design Philosophy
- Base: Deep Midnight Charcoal (`#0B0F19`)
- Primary Accent: Electric Indigo (`#4F46E5`, hover `#6366F1`)
- Secondary: Soft Silver Gray (`#F3F4F6`, muted `#9CA3AF`)
- Big touch targets (min 44px - 56px) for mobile and desktop ergonomics.

---

## 🔑 Environment Configuration

### 1. Local Development (`.env.local`)
Create a `.env.local` file (or copy `.env.example`):
```bash
cp .env.example .env.local
```

Add your Google Gemini API key:
```env
# Google Gemini Flash API Key
GEMINI_API_KEY=AIzaSy...your_gemini_api_key_here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3005
```

> **Where to get a key?** Visit [Google AI Studio](https://aistudio.google.com/) to obtain a free Gemini Flash API key.

### 2. Deploying to Vercel
1. Push this repository to GitHub.
2. In your [Vercel Dashboard](https://vercel.com/), click **Add New Project** and import `lifepipeline`.
3. In **Settings -> Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
4. Click **Deploy**. LifePipeline will deploy with serverless Edge/Node routes enabled.

---

## 🏃‍♂️ Running Locally

```bash
# Install dependencies
npm install

# Start local server on port 3005
npm run dev
```

Visit [http://localhost:3005](http://localhost:3005) to experience the LifePipeline MVP.

