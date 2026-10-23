import { 
  FamilyUser, 
  BlueprintGoal, 
  TimeLockCommitment, 
  DecomposedItem, 
  MicroTask, 
  HealthScoreReport, 
  HealthStatus, 
  UserRole,
  ChatMessage,
  DailyExecutionMetric,
  TopWeakness
} from '@/types';

const STORAGE_KEY = 'lifepipeline_beta_state_v1';
const ACTIVE_USER_KEY = 'lifepipeline_active_user_id_v1';

// Initial Seeds for the 4 Beta Users (Waseem + 3 Sisters)
export const INITIAL_BETA_USERS: FamilyUser[] = [
  {
    id: 'user-waseem',
    name: 'Waseem (Founder)',
    email: 'waseem@lifepipeline.internal',
    avatar: 'W',
    role: 'business_owner',
    scatteredThoughts: 'Need to fix onboarding drop-off\nRedo team Slack channels\nRecord 5 personalized cold Loom demos for enterprise leads\nClean up old Notion notes\nShip Stripe automated billing webhook\nReply to routine customer emails\nUpdate social media header graphic\nInterview high-ticket sales closer candidate',
    activeTimeLock: {
      id: 'lock-waseem-1',
      user_id: 'user-waseem',
      focus_title: 'Scale SaaS Platform to $1.2M ARR & Automate Pipeline',
      why_this_matters: 'Failure means getting stuck trading hours for dollars. Achieving this unlocks true family autonomy and financial sovereignty.',
      duration_months: 3,
      start_date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      locked_until: new Date(Date.now() + 72 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
    },
    blueprintGoals: [
      {
        id: 'g-w-1',
        user_id: 'user-waseem',
        timeframe: '1_year',
        category: 'Capital & Revenue',
        title: 'Attain $1.2M ARR with 35% Net Margin',
        vision_statement: 'Transition from founder-led sales to an autonomous inbound pipeline and solid enterprise contracts.',
        target_metric: '$100k Monthly Recurring Revenue',
      },
      {
        id: 'g-w-2',
        user_id: 'user-waseem',
        timeframe: '1_year',
        category: 'Physique & Energy',
        title: 'Maintain 12% Body Fat & 8 Hours Deep Sleep',
        vision_statement: 'Elite execution demands cognitive endurance and prime physical vitality.',
        target_metric: 'Vo2 Max > 48, Body Fat 12%',
      },
      {
        id: 'g-w-3',
        user_id: 'user-waseem',
        timeframe: '3_year',
        category: 'Market Dominance',
        title: 'Expand SaaS Operations to North America & EU',
        vision_statement: 'Serve 10,000+ high-agency subscribers and make LifePipeline the category standard.',
        target_metric: '10,000 Active Paid Subscribers',
      },
      {
        id: 'g-w-4',
        user_id: 'user-waseem',
        timeframe: '5_year',
        category: 'Venture & Legacy',
        title: 'Build a Self-Sustaining Venture Holding Entity',
        vision_statement: 'Complete geographic freedom and seed funding for ambitious early-stage creators.',
        target_metric: '$15M Portfolio Valuation',
      },
    ],
    decomposedItems: [
      {
        id: 'dec-w-1',
        originalText: 'Record 5 personalized cold Loom demos for enterprise leads',
        refinedTitle: 'Record 5 Personalized Cold Loom Demos for Enterprise Leads',
        leverageScore: 94,
        isVital20: true,
        category: 'Pipeline & Revenue',
        estimatedMinutes: 45,
        impactRationale: 'Direct outreach to enterprise buyers yields 80% of quarterly pipeline velocity.',
      },
      {
        id: 'dec-w-2',
        originalText: 'Ship Stripe automated billing webhook',
        refinedTitle: 'Ship Stripe Automated Billing Webhook & Listener',
        leverageScore: 89,
        isVital20: true,
        category: 'Infrastructure',
        estimatedMinutes: 45,
        impactRationale: 'Automated subscription collection eliminates cashflow friction without manual follow-up.',
      },
      {
        id: 'dec-w-3',
        originalText: 'Interview high-ticket sales closer candidate',
        refinedTitle: 'Interview High-Ticket Sales Closer Candidate',
        leverageScore: 82,
        isVital20: true,
        category: 'Leverage & Team',
        estimatedMinutes: 30,
        impactRationale: 'A dedicated closer buys back founder time and doubles contract close rates.',
      },
      {
        id: 'dec-w-4',
        originalText: 'Redo team Slack channels',
        refinedTitle: 'Reorganize internal team Slack channels',
        leverageScore: 28,
        isVital20: false,
        category: 'Routine Admin',
        estimatedMinutes: 15,
      },
      {
        id: 'dec-w-5',
        originalText: 'Clean up old Notion notes',
        refinedTitle: 'Archive outdated workspace Notion pages',
        leverageScore: 22,
        isVital20: false,
        category: 'Routine Admin',
        estimatedMinutes: 15,
      },
    ],
    microTasks: [
      {
        id: 'mt-w-1',
        user_id: 'user-waseem',
        title: 'Target 5 B2B Founders on LinkedIn and record 90-sec Loom videos',
        duration_minutes: 45,
        energy_state: 'deep_focus',
        leverage_tier: 'vital_20',
        completed: true,
        completed_at: new Date().toISOString(),
      },
      {
        id: 'mt-w-2',
        user_id: 'user-waseem',
        title: 'Send follow-up Loom links with 1-click booking link',
        duration_minutes: 15,
        energy_state: 'quick_execution',
        leverage_tier: 'vital_20',
        completed: false,
      },
      {
        id: 'mt-w-3',
        user_id: 'user-waseem',
        title: 'Write Stripe webhook handler for checkout.session.completed',
        duration_minutes: 45,
        energy_state: 'deep_focus',
        leverage_tier: 'vital_20',
        completed: false,
      },
      {
        id: 'mt-w-4',
        user_id: 'user-waseem',
        title: 'Conduct 30-min candidate interview & scoring assessment',
        duration_minutes: 30,
        energy_state: 'deep_focus',
        leverage_tier: 'vital_20',
        completed: false,
      },
    ],
    healthReport: {
      id: 'eval-w-1',
      user_id: 'user-waseem',
      composite_score: 74,
      status: 'yellow',
      execution_velocity_pct: 75,
      pareto_discipline_pct: 68,
      time_lock_pace_pct: 80,
      summary: 'Solid execution velocity, but maintenance items are creeping in. Focus on closing the remaining 2 Vital 20% tasks.',
      diagnoses: [
        {
          id: 'gap-w-1',
          category: 'pareto_drift',
          severity: 'critical',
          title: 'False Productivity Trap (Pareto Drift)',
          description: 'You completed outreach tasks, but routine Slack tidying and doc cleaning delayed high-leverage closing.',
          prescribed_action: 'Lock a 90-minute morning curfew: zero maintenance allowed until 2 Vital 20% items are stamped complete.',
          resolved: false,
        },
        {
          id: 'gap-w-2',
          category: 'friction_overload',
          severity: 'moderate',
          title: 'Subconscious Resistance (Task Size > 45m)',
          description: 'Two technical tasks lack explicit test scripts, causing starting hesitation.',
          prescribed_action: 'Split the webhook task into a 20m schema definition sprint and a 25m endpoint listener sprint.',
          resolved: false,
        },
      ],
      evaluated_at: new Date().toISOString(),
    },
  },
  {
    id: 'user-sister-1',
    name: 'Ayesha (Sister 1)',
    email: 'ayesha@lifepipeline.internal',
    avatar: 'A',
    role: 'student',
    scatteredThoughts: 'Study for neuroscience midterms\nOrganize desk highlighters\nComplete AI research paper draft for journal submission\nCheck Instagram notifications\nSchedule group project sync\nWrite GRE vocabulary flashcards\nDownload new lecture slides',
    activeTimeLock: {
      id: 'lock-s1-1',
      user_id: 'user-sister-1',
      focus_title: 'Complete Research Paper Draft & Score 95th Percentile on Exams',
      why_this_matters: 'Publishing this paper and securing top honors guarantees graduate school admission and research fellowship funding.',
      duration_months: 3,
      start_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      locked_until: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
    },
    blueprintGoals: [
      {
        id: 'g-s1-1',
        user_id: 'user-sister-1',
        timeframe: '1_year',
        category: 'Academic Mastery',
        title: 'Publish in Peer-Reviewed Journal with Top 5% GPA',
        vision_statement: 'Establish intellectual authority and secure international research fellowships.',
        target_metric: '3.9+ GPA, 1 Peer-Reviewed Paper',
      },
      {
        id: 'g-s1-2',
        user_id: 'user-sister-1',
        timeframe: '3_year',
        category: 'Specialization',
        title: 'Secure Funded Masters / PhD at Top Tier Institution',
        vision_statement: 'Conduct cutting-edge research in computational biology and neuroscience.',
        target_metric: 'Full Fellowship Grant',
      },
      {
        id: 'g-s1-3',
        user_id: 'user-sister-1',
        timeframe: '5_year',
        category: 'Career & Independence',
        title: 'Lead an Applied AI Bio-Research Laboratory',
        vision_statement: 'Bridge academic discovery with real-world healthcare breakthroughs.',
        target_metric: 'Principal Investigator Role',
      },
    ],
    decomposedItems: [
      {
        id: 'dec-s1-1',
        originalText: 'Complete AI research paper draft for journal submission',
        refinedTitle: 'Finalize Results & Discussion Sections of AI Research Paper',
        leverageScore: 96,
        isVital20: true,
        category: 'Academic Milestone',
        estimatedMinutes: 45,
        impactRationale: 'Submitting this manuscript directly impacts graduate fellowship eligibility.',
      },
      {
        id: 'dec-s1-2',
        originalText: 'Study for neuroscience midterms',
        refinedTitle: 'Active Recall Sprint on Neural Circuit Architecture (Lectures 1-5)',
        leverageScore: 88,
        isVital20: true,
        category: 'Exam Performance',
        estimatedMinutes: 45,
        impactRationale: 'Active recall yields 3x memory retention compared to passive reading.',
      },
      {
        id: 'dec-s1-3',
        originalText: 'Organize desk highlighters',
        refinedTitle: 'Tidy up study desk stationery',
        leverageScore: 15,
        isVital20: false,
        category: 'Procrastination Busywork',
        estimatedMinutes: 15,
      },
      {
        id: 'dec-s1-4',
        originalText: 'Check Instagram notifications',
        refinedTitle: 'Social media browsing',
        leverageScore: 5,
        isVital20: false,
        category: 'Attention Drain',
        estimatedMinutes: 30,
      },
    ],
    microTasks: [
      {
        id: 'mt-s1-1',
        user_id: 'user-sister-1',
        title: 'Draft methodology and statistical figures for Section 3 of Paper',
        duration_minutes: 45,
        energy_state: 'deep_focus',
        leverage_tier: 'vital_20',
        completed: true,
        completed_at: new Date().toISOString(),
      },
      {
        id: 'mt-s1-2',
        user_id: 'user-sister-1',
        title: 'Complete 30 Flashcard recall questions on Synaptic Plasticity',
        duration_minutes: 30,
        energy_state: 'deep_focus',
        leverage_tier: 'vital_20',
        completed: true,
        completed_at: new Date().toISOString(),
      },
      {
        id: 'mt-s1-3',
        user_id: 'user-sister-1',
        title: 'Review peer feedback on Introduction paragraph',
        duration_minutes: 15,
        energy_state: 'quick_execution',
        leverage_tier: 'vital_20',
        completed: false,
      },
    ],
    healthReport: {
      id: 'eval-s1-1',
      user_id: 'user-sister-1',
      composite_score: 88,
      status: 'green',
      execution_velocity_pct: 90,
      pareto_discipline_pct: 85,
      time_lock_pace_pct: 89,
      summary: 'Optimal momentum! 2 of 3 vital 20% tasks completed today. Avoid social media distraction loops.',
      diagnoses: [
        {
          id: 'gap-s1-1',
          category: 'momentum_loss',
          severity: 'low',
          title: 'Late Night Screen Fatigue',
          description: 'Study sessions extending past 11:30 PM degrade deep sleep and morning retention.',
          prescribed_action: 'Enforce hard digital sunset 30 minutes before bed.',
          resolved: false,
        },
      ],
      evaluated_at: new Date().toISOString(),
    },
  },
  {
    id: 'user-sister-2',
    name: 'Fatima (Sister 2)',
    email: 'fatima@lifepipeline.internal',
    avatar: 'F',
    role: 'professional',
    scatteredThoughts: 'Prep executive slide deck for Q3 leadership review\nAnswer 45 unread emails\nAlign cross-functional product roadmap with engineering director\nBrowse corporate swag catalog\nSchedule 1-on-1 with managing director for promotion roadmap\nReorganize desktop folders',
    activeTimeLock: {
      id: 'lock-s2-1',
      user_id: 'user-sister-2',
      focus_title: 'Deliver High-Impact Enterprise Initiative & Secure VP Promotion',
      why_this_matters: 'Breaking through mid-management opens executive equity, leadership autonomy, and long-term financial security.',
      duration_months: 6,
      start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      locked_until: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
    },
    blueprintGoals: [
      {
        id: 'g-s2-1',
        user_id: 'user-sister-2',
        timeframe: '1_year',
        category: 'Executive Trajectory',
        title: 'Promotion to Vice President with 40% Compensation Increase',
        vision_statement: 'Lead strategic product direction across the enterprise and influence board decisions.',
        target_metric: 'Executive Promotion Confirmation',
      },
      {
        id: 'g-s2-2',
        user_id: 'user-sister-2',
        timeframe: '3_year',
        category: 'Strategic Impact',
        title: 'Spearhead $10M Business Unit Expansion',
        vision_statement: 'Build a high-performing global team delivering benchmark operational profitability.',
        target_metric: '$10M Business Unit P&L',
      },
      {
        id: 'g-s2-3',
        user_id: 'user-sister-2',
        timeframe: '5_year',
        category: 'Sovereignty',
        title: 'Transition to Board Advisory & Executive Coaching',
        vision_statement: 'Preserve physical wellness while mentoring next-generation female executives.',
        target_metric: '2 Board Seats',
      },
    ],
    decomposedItems: [
      {
        id: 'dec-s2-1',
        originalText: 'Prep executive slide deck for Q3 leadership review',
        refinedTitle: 'Synthesize Q3 Business Unit ROI Metrics for Executive Committee',
        leverageScore: 95,
        isVital20: true,
        category: 'Executive Visibility',
        estimatedMinutes: 45,
        impactRationale: 'The Board evaluates promotion readiness based directly on this quarterly briefing.',
      },
      {
        id: 'dec-s2-2',
        originalText: 'Align cross-functional product roadmap with engineering director',
        refinedTitle: 'Lock Q4 Engineering Milestones & Budget Dependencies',
        leverageScore: 85,
        isVital20: true,
        category: 'Operational Leverage',
        estimatedMinutes: 30,
        impactRationale: 'Alignment prevents months of delivery delays and preserves team morale.',
      },
      {
        id: 'dec-s2-3',
        originalText: 'Answer 45 unread emails',
        refinedTitle: 'Batch-process routine customer and vendor emails',
        leverageScore: 35,
        isVital20: false,
        category: 'Maintenance 80%',
        estimatedMinutes: 45,
      },
      {
        id: 'dec-s2-4',
        originalText: 'Browse corporate swag catalog',
        refinedTitle: 'Select team giveaway gifts',
        leverageScore: 10,
        isVital20: false,
        category: 'Zero Leverage',
        estimatedMinutes: 20,
      },
    ],
    microTasks: [
      {
        id: 'mt-s2-1',
        user_id: 'user-sister-2',
        title: 'Draft 3 headline ROI slides showing 18% cost reduction for Q3 deck',
        duration_minutes: 45,
        energy_state: 'deep_focus',
        leverage_tier: 'vital_20',
        completed: false,
      },
      {
        id: 'mt-s2-2',
        user_id: 'user-sister-2',
        title: 'Conduct 20-min pre-briefing with Engineering Director to align priorities',
        duration_minutes: 30,
        energy_state: 'deep_focus',
        leverage_tier: 'vital_20',
        completed: false,
      },
      {
        id: 'mt-s2-3',
        user_id: 'user-sister-2',
        title: 'Draft promotion roadmap talking points for 1-on-1 with Managing Director',
        duration_minutes: 30,
        energy_state: 'deep_focus',
        leverage_tier: 'vital_20',
        completed: false,
      },
    ],
    healthReport: {
      id: 'eval-s2-1',
      user_id: 'user-sister-2',
      composite_score: 58,
      status: 'yellow',
      execution_velocity_pct: 55,
      pareto_discipline_pct: 60,
      time_lock_pace_pct: 62,
      summary: 'Inbox reactivity is hijacking prime morning focus. Execute the executive slide deck before opening email.',
      diagnoses: [
        {
          id: 'gap-s2-1',
          category: 'pareto_drift',
          severity: 'critical',
          title: 'Reactive Communication Trap',
          description: 'Spent the first 2 hours of the workday responding to non-urgent emails instead of completing the Q3 deck.',
          prescribed_action: 'Batch check email strictly at 12:00 PM and 4:30 PM. Morning is non-negotiable Vital 20% territory.',
          resolved: false,
        },
      ],
      evaluated_at: new Date().toISOString(),
    },
  },
  {
    id: 'user-sister-3',
    name: 'Maryam (Sister 3)',
    email: 'maryam@lifepipeline.internal',
    avatar: 'M',
    role: 'freelancer',
    scatteredThoughts: 'Send high-ticket branding proposal to potential client\nRedesign personal portfolio logo for the 5th time\nFollow up with past client regarding monthly retainer\nScroll Twitter design inspiration\nInvoice outstanding $3,200 payment\nOrganize Figma color swatches',
    activeTimeLock: {
      id: 'lock-s3-1',
      user_id: 'user-sister-3',
      focus_title: 'Productize Consulting Offer & Sign 3 Long-Term Retainers',
      why_this_matters: 'Stops client feast-and-famine anxiety and guarantees steady predictable $12k+ monthly revenue without constant bidding.',
      duration_months: 3,
      start_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      locked_until: new Date(Date.now() + 85 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
    },
    blueprintGoals: [
      {
        id: 'g-s3-1',
        user_id: 'user-sister-3',
        timeframe: '1_year',
        category: 'Client Revenue',
        title: 'Reach $15,000/Month Recurring Retainer Revenue',
        vision_statement: 'Serve 3-4 dream clients with high-leverage brand strategy and creative design systems.',
        target_metric: '$15k/mo recurring revenue',
      },
      {
        id: 'g-s3-2',
        user_id: 'user-sister-3',
        timeframe: '3_year',
        category: 'Digital Assets',
        title: 'Launch Premium Design System Asset Kit with 2,000 Sales',
        vision_statement: 'Generate 40% passive income from digital products and design frameworks.',
        target_metric: '2,000 Customer Sales',
      },
      {
        id: 'g-s3-3',
        user_id: 'user-sister-3',
        timeframe: '5_year',
        category: 'Freedom & Autonomy',
        title: 'Operate an Independent Boutique Design Studio Working 20h/week',
        vision_statement: 'Complete creative freedom and flexible lifestyle to pursue art and travel.',
        target_metric: '20 Billable Hours/Week Max',
      },
    ],
    decomposedItems: [
      {
        id: 'dec-s3-1',
        originalText: 'Send high-ticket branding proposal to potential client',
        refinedTitle: 'Send $8,500 Complete Brand Identity & Design System Proposal',
        leverageScore: 94,
        isVital20: true,
        category: 'Revenue & Closing',
        estimatedMinutes: 45,
        impactRationale: 'Signing this client covers 2 full months of operating expenses.',
      },
      {
        id: 'dec-s3-2',
        originalText: 'Invoice outstanding $3,200 payment',
        refinedTitle: 'Issue Final Stripe Invoice for Delivered Project with Instant Pay Link',
        leverageScore: 91,
        isVital20: true,
        category: 'Cash Flow',
        estimatedMinutes: 15,
        impactRationale: 'Collecting owed cash preserves emergency buffer and prevents cashflow anxiety.',
      },
      {
        id: 'dec-s3-3',
        originalText: 'Redesign personal portfolio logo for the 5th time',
        refinedTitle: 'Fiddle with portfolio personal logo graphics',
        leverageScore: 18,
        isVital20: false,
        category: 'Perfectionist Procrastination',
        estimatedMinutes: 60,
      },
      {
        id: 'dec-s3-4',
        originalText: 'Organize Figma color swatches',
        refinedTitle: 'Re-arrange Figma document color tokens',
        leverageScore: 12,
        isVital20: false,
        category: 'Low-Impact Cosmetics',
        estimatedMinutes: 30,
      },
    ],
    microTasks: [
      {
        id: 'mt-s3-1',
        user_id: 'user-sister-3',
        title: 'Finalize scope and ROI deliverable page for $8,500 proposal and send via PandaDoc',
        duration_minutes: 45,
        energy_state: 'deep_focus',
        leverage_tier: 'vital_20',
        completed: false,
      },
      {
        id: 'mt-s3-2',
        user_id: 'user-sister-3',
        title: 'Send Stripe invoice reminder for $3,200 with polite payment confirmation note',
        duration_minutes: 15,
        energy_state: 'quick_execution',
        leverage_tier: 'vital_20',
        completed: true,
        completed_at: new Date().toISOString(),
      },
      {
        id: 'mt-s3-3',
        user_id: 'user-sister-3',
        title: 'Reach out to past client with retainer proposal for ongoing monthly creative support',
        duration_minutes: 30,
        energy_state: 'deep_focus',
        leverage_tier: 'vital_20',
        completed: false,
      },
    ],
    healthReport: {
      id: 'eval-s3-1',
      user_id: 'user-sister-3',
      composite_score: 72,
      status: 'yellow',
      execution_velocity_pct: 70,
      pareto_discipline_pct: 75,
      time_lock_pace_pct: 71,
      summary: 'Good start with invoicing! The $8,500 proposal is the single highest-leverage needle to send today.',
      diagnoses: [
        {
          id: 'gap-s3-1',
          category: 'friction_overload',
          severity: 'moderate',
          title: 'Perfectionist Stalling on Proposals',
          description: 'Spending excessive time polishing fonts on proposals before clicking send creates initiation drag.',
          prescribed_action: 'Use the standard 1-page proposal agreement template and ship within 30 minutes.',
          resolved: false,
        },
      ],
      evaluated_at: new Date().toISOString(),
    },
  },
];

// Helper to broadcast changes across components in the browser
export function notifyStateChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('lifepipeline_state_updated'));
  }
}

// Get all users from localStorage or initialize with seed data
export function getAllUsers(): FamilyUser[] {
  if (typeof window === 'undefined') {
    return INITIAL_BETA_USERS.map(ensureUserDualModeData);
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initialized = INITIAL_BETA_USERS.map(ensureUserDualModeData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialized));
      return initialized;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length >= 4) {
      const migrated = parsed.map(ensureUserDualModeData);
      return migrated;
    }
    // If corrupt or incomplete, reseed
    const initialized = INITIAL_BETA_USERS.map(ensureUserDualModeData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialized));
    return initialized;
  } catch (e) {
    return INITIAL_BETA_USERS.map(ensureUserDualModeData);
  }
}

// Get current active user ID
export function getActiveUserId(): string {
  if (typeof window === 'undefined') {
    return INITIAL_BETA_USERS[0].id;
  }
  const id = localStorage.getItem(ACTIVE_USER_KEY);
  if (id) return id;
  const defaultId = INITIAL_BETA_USERS[0].id;
  localStorage.setItem(ACTIVE_USER_KEY, defaultId);
  return defaultId;
}

// Set active user ID and broadcast
export function setActiveUserId(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTIVE_USER_KEY, id);
  // Also keep backward compatible role in localStorage
  const users = getAllUsers();
  const user = users.find(u => u.id === id);
  if (user) {
    localStorage.setItem('lifepipeline_active_role', user.role);
    if (user.activeTimeLock) {
      localStorage.setItem('lifepipeline_active_timelock', JSON.stringify(user.activeTimeLock));
    }
  }
  notifyStateChange();
}

// Get active user object
export function getActiveUser(): FamilyUser {
  const users = getAllUsers();
  const activeId = getActiveUserId();
  const found = users.find(u => u.id === activeId);
  return found || users[0] || INITIAL_BETA_USERS[0];
}

// Save entire users array
export function saveAllUsers(users: FamilyUser[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  notifyStateChange();
}

// Update active user with an updater function
export function updateActiveUser(updater: (prev: FamilyUser) => FamilyUser): FamilyUser {
  const users = getAllUsers();
  const activeId = getActiveUserId();
  let updatedActive: FamilyUser = users[0];

  const updatedUsers = users.map(user => {
    if (user.id === activeId) {
      const updated = updater(user);
      // Recalculate dynamic health whenever user state changes
      const withHealth = recalculateUserHealth(updated);
      updatedActive = withHealth;
      return withHealth;
    }
    return user;
  });

  saveAllUsers(updatedUsers);
  return updatedActive;
}

// Update specific user by ID
export function updateUserById(userId: string, updater: (prev: FamilyUser) => FamilyUser): void {
  const users = getAllUsers();
  const updatedUsers = users.map(user => {
    if (user.id === userId) {
      return recalculateUserHealth(updater(user));
    }
    return user;
  });
  saveAllUsers(updatedUsers);
}

// Reset all 4 users back to clean defaults
export function resetAllDataToDefault(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BETA_USERS));
  setActiveUserId(INITIAL_BETA_USERS[0].id);
  notifyStateChange();
}

// Dynamic Health Score Algorithm applying Pareto principle & velocity
export function recalculateUserHealth(user: FamilyUser): FamilyUser {
  const tasks = user.microTasks || [];
  if (tasks.length === 0) {
    return user;
  }

  const completed = tasks.filter(t => t.completed);
  const vitals = tasks.filter(t => t.leverage_tier === 'vital_20');
  const vitalsCompleted = vitals.filter(t => t.completed);

  // Velocity %: completed / total tasks
  const velocityPct = Math.round((completed.length / tasks.length) * 100);

  // Pareto Discipline %: vitals completed / total vitals (or fallback)
  const paretoPct = vitals.length > 0
    ? Math.round((vitalsCompleted.length / vitals.length) * 100)
    : velocityPct;

  // Time Lock Pace % (calculated based on time-lock existence & active days)
  let timeLockPace = 75;
  if (user.activeTimeLock) {
    timeLockPace = Math.min(100, Math.max(40, Math.round((paretoPct * 0.7) + (velocityPct * 0.3))));
  }

  // Composite Score (0 - 100): 50% Pareto discipline, 30% execution velocity, 20% time lock pace
  const composite = Math.min(100, Math.max(0, Math.round(paretoPct * 0.5 + velocityPct * 0.3 + timeLockPace * 0.2)));

  // Traffic Light Status
  let status: HealthStatus = 'red';
  if (composite >= 80) status = 'green';
  else if (composite >= 50) status = 'yellow';

  let summary = 'Execution in progress.';
  if (status === 'green') {
    summary = 'Optimal momentum! High execution velocity strictly focused on the Vital 20% needle-movers.';
  } else if (status === 'yellow') {
    summary = 'Friction warning. Momentum is vulnerable to routine maintenance tasks. Complete vital tasks first.';
  } else {
    summary = 'Critical drift. Shiny objects or routine busywork are stalling long-term trajectory.';
  }

  return {
    ...user,
    healthReport: {
      ...user.healthReport,
      composite_score: composite,
      status,
      execution_velocity_pct: velocityPct,
      pareto_discipline_pct: paretoPct,
      time_lock_pace_pct: timeLockPace,
      summary,
      evaluated_at: new Date().toISOString(),
    },
  };
}

// ==========================================
// SAAS INDIVIDUAL AUTH & DUAL MODE ENGINE API
// ==========================================

const AUTH_SESSION_KEY = 'lifepipeline_auth_session_v1';

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  token: string;
  loginTime: string;
}

// Get currently authenticated session
export function getAuthSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

// Log in user by email and password
export function loginUser(email: string, password?: string): { success: boolean; user?: FamilyUser; error?: string } {
  const users = getAllUsers();
  const normalizedEmail = email.trim().toLowerCase();
  
  const found = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!found) {
    return { success: false, error: 'No account found with this email. Please check or sign up.' };
  }

  // If password was set, verify it; default seed accounts accept '123456' or blank or their assigned password
  const expectedPassword = found.password || '123456';
  if (password && password.trim() !== expectedPassword && password.trim() !== '123456') {
    return { success: false, error: 'Incorrect password. (Default beta password is: 123456)' };
  }

  // Create session
  const session: AuthSession = {
    userId: found.id,
    email: found.email,
    name: found.name,
    token: `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    loginTime: new Date().toISOString()
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    setActiveUserId(found.id);
  }

  return { success: true, user: found };
}

// Register a new SaaS user
export function signupUser(params: {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}): { success: boolean; user?: FamilyUser; error?: string } {
  const users = getAllUsers();
  const normalizedEmail = params.email.trim().toLowerCase();

  if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  const newId = `user-${Date.now()}`;
  const newUser: FamilyUser = {
    id: newId,
    name: params.name.trim(),
    email: normalizedEmail,
    password: params.password?.trim() || '123456',
    avatar: params.name.trim().charAt(0).toUpperCase() || 'U',
    role: params.role,
    scatteredThoughts: '1. Establish high-focus morning routine\n2. Define primary 80/20 needle-moving project\n3. Eliminate distraction and friction sources',
    activeTimeLock: {
      id: `lock-${newId}`,
      user_id: newId,
      focus_title: 'Establish 90-Day Execution Trajectory',
      why_this_matters: 'Achieving this will eliminate self-doubt, establish compounding discipline, and secure real freedom.',
      duration_months: 3,
      start_date: new Date().toISOString().split('T')[0],
      locked_until: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active'
    },
    blueprintGoals: [
      {
        id: `goal-1y-${newId}`,
        user_id: newId,
        timeframe: '1_year',
        category: 'Core Mastery',
        title: 'Master Key Professional Competency',
        vision_statement: 'High agency and autonomy across daily decisions.',
        target_metric: 'Complete 3 Major Milestone Deliverables',
      },
      {
        id: `goal-3y-${newId}`,
        user_id: newId,
        timeframe: '3_year',
        category: 'Financial & Personal Liberty',
        title: 'Attain Sovereignty & Capital Independence',
        vision_statement: 'Build recurring cashflow streams and long-term security.',
        target_metric: '$10,000+ Monthly Autonomous Cashflow',
      },
      {
        id: `goal-5y-${newId}`,
        user_id: newId,
        timeframe: '5_year',
        category: 'Life Legacy',
        title: 'Design Complete Lifestyle Freedom',
        vision_statement: 'Live without fear of scarcity, empowering family and community.',
        target_metric: 'Full Life Autonomy',
      }
    ],
    decomposedItems: [
      {
        id: `dec-item-${newId}-1`,
        originalText: 'Establish high-focus morning routine',
        refinedTitle: 'Lock 90-Minute Uninterrupted Morning Deep Work Block',
        leverageScore: 92,
        isVital20: true,
        category: 'Execution Focus',
        estimatedMinutes: 45,
        impactRationale: 'Unbroken morning deep work delivers 80% of daily cognitive progress.'
      }
    ],
    microTasks: [
      {
        id: `mt-${newId}-1`,
        user_id: newId,
        title: 'Set up phone Do-Not-Disturb and clear workspace for morning sprint',
        duration_minutes: 15,
        energy_state: 'quick_execution',
        leverage_tier: 'vital_20',
        completed: false
      },
      {
        id: `mt-${newId}-2`,
        user_id: newId,
        title: 'Execute first 45-minute vital sprint on core milestone',
        duration_minutes: 45,
        energy_state: 'deep_focus',
        leverage_tier: 'vital_20',
        completed: false
      }
    ],
    healthReport: {
      id: `health-${newId}`,
      user_id: newId,
      composite_score: 70,
      status: 'yellow',
      execution_velocity_pct: 50,
      pareto_discipline_pct: 75,
      time_lock_pace_pct: 70,
      summary: 'New account initialized. Ready for initial psychological calibration.',
      diagnoses: [
        {
          id: `diag-${newId}-1`,
          category: 'momentum_loss',
          severity: 'moderate',
          title: 'Initial Calibration Phase',
          description: 'Log your first daily manual metrics and converse with the AI Life Coach to anchor your 80/20 leverage.',
          prescribed_action: 'Complete your first Vital 20% micro-task today.',
          resolved: false
        }
      ],
      evaluated_at: new Date().toISOString()
    },
    chatHistory: [
      {
        id: `msg-${newId}-init`,
        sender: 'coach',
        message: `Welcome to LifePipeline, ${params.name.trim()}! I am your AI Psychological Execution Coach powered by Gemini Flash. I've loaded your archetype profile. What is the single biggest goal or friction point on your mind right now?`,
        timestamp: new Date().toISOString()
      }
    ],
    dailyMetrics: [
      {
        id: `metric-${newId}-1`,
        date: new Date().toISOString().split('T')[0],
        focusHours: 2.5,
        vitalTasksCompleted: 1,
        maintenanceTasksCompleted: 2,
        energyRating: 7,
        selfDisciplineRating: 7,
        dayReflection: 'Account created. Setting up daily discipline foundation.'
      }
    ],
    topWeaknesses: [
      {
        id: `weak-${newId}-1`,
        title: 'Morning Execution Delay',
        category: 'execution_friction',
        impactSeverity: 'critical',
        whyFallingBehind: 'Starting the morning with reactive notifications instead of a pre-planned Vital 20% sprint reduces high-leverage output by over 60%.',
        psychologicalRemedy: 'Prepare tomorrow morning\'s exact first micro-task before closing your laptop tonight.'
      },
      {
        id: `weak-${newId}-2`,
        title: 'Maintenance Task Drift',
        category: 'prioritization_drift',
        impactSeverity: 'moderate',
        whyFallingBehind: 'Mistaking low-leverage routine tasks (emails, tidying) for genuine needle-movers.',
        psychologicalRemedy: 'Ruthlessly defer all maintenance tasks until after 2 PM.'
      },
      {
        id: `weak-${newId}-3`,
        title: 'Energy Depletion in Late Afternoon',
        category: 'energy_leak',
        impactSeverity: 'moderate',
        whyFallingBehind: 'Long uninterrupted screen stretches without hydration or physical reset cause cognitive burnout.',
        psychologicalRemedy: 'Take a 10-minute sunlight walk between 45-minute deep work cycles.'
      }
    ]
  };

  const updated = [...users, newUser];
  saveAllUsers(updated);
  loginUser(newUser.email, newUser.password);

  return { success: true, user: newUser };
}

// Log out user
export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_SESSION_KEY);
  notifyStateChange();
}

// Ensure every existing user has default chatHistory, dailyMetrics, and topWeaknesses if missing
export function ensureUserDualModeData(user: FamilyUser): FamilyUser {
  let modified = false;
  const clone = { ...user };

  if (!clone.password) {
    clone.password = '123456';
    modified = true;
  }

  if (!clone.chatHistory || clone.chatHistory.length === 0) {
    clone.chatHistory = [
      {
        id: `msg-${user.id}-welcome`,
        sender: 'coach',
        message: `Hello ${user.name.split(' ')[0]}! I am your AI Psychological Execution Coach. I've reviewed your life blueprint goals and your active Time-Lock commitment ("${user.activeTimeLock?.focus_title || 'Core Focus'}"). What needle-moving action are we tackling today?`,
        timestamp: new Date().toISOString()
      }
    ];
    modified = true;
  }

  if (!clone.dailyMetrics || clone.dailyMetrics.length === 0) {
    // Generate 7 days of realistic historical seed metrics for visual charts
    const today = new Date();
    clone.dailyMetrics = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      const dateStr = d.toISOString().split('T')[0];
      return {
        id: `metric-${user.id}-${i}`,
        date: dateStr,
        focusHours: parseFloat((2.5 + (i * 0.4) + (Math.sin(i) * 0.5)).toFixed(1)),
        vitalTasksCompleted: Math.max(1, (i % 3) + 1),
        maintenanceTasksCompleted: Math.max(1, (i % 2) + 2),
        energyRating: Math.min(10, Math.max(5, 6 + (i % 4))),
        selfDisciplineRating: Math.min(10, Math.max(5, 5 + (i % 5))),
        dayReflection: i === 6 ? 'High execution consistency today.' : 'Consistent effort maintained.'
      };
    });
    modified = true;
  }

  if (!clone.topWeaknesses || clone.topWeaknesses.length === 0) {
    clone.topWeaknesses = [
      {
        id: `weak-${user.id}-1`,
        title: 'Morning Execution Inertia',
        category: 'execution_friction',
        impactSeverity: 'critical',
        whyFallingBehind: 'Allowing initial 30 minutes of the morning to drift into reactive notifications creates decision fatigue before tackling the Vital 20% needle-mover.',
        psychologicalRemedy: 'Implement a non-negotiable 90-minute morning deep work silo. Open nothing except your single primary micro-task.'
      },
      {
        id: `weak-${user.id}-2`,
        title: 'False Productivity (80% Maintenance Drift)',
        category: 'prioritization_drift',
        impactSeverity: 'moderate',
        whyFallingBehind: 'Spending prime cognitive energy on low-stakes routine maintenance gives the psychological illusion of progress while delaying major milestones.',
        psychologicalRemedy: 'Batch all routine tasks into a single 45-minute afternoon block.'
      },
      {
        id: `weak-${user.id}-3`,
        title: 'Cognitive Overload from Unscoped Tasks',
        category: 'clarity_deficit',
        impactSeverity: 'moderate',
        whyFallingBehind: 'Large ambiguous tasks (> 60 mins) trigger subconscious avoidance and procrastination.',
        psychologicalRemedy: 'Slice large deliverables into 15 to 30-minute concrete micro-steps using the 80/20 Engine.'
      }
    ];
    modified = true;
  }

  return clone;
}

// Save chat message to active user's conversation history
export function saveUserChatMessage(userId: string, sender: 'user' | 'coach', message: string): ChatMessage {
  const newMsg: ChatMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    sender,
    message,
    timestamp: new Date().toISOString()
  };

  updateUserById(userId, user => {
    const existing = user.chatHistory || [];
    return {
      ...user,
      chatHistory: [...existing, newMsg]
    };
  });

  return newMsg;
}

// Log manual daily metrics for Mode 1 Visual Self-Analysis
export function logDailyMetric(userId: string, metric: Omit<DailyExecutionMetric, 'id'>): void {
  updateUserById(userId, user => {
    const existing = user.dailyMetrics || [];
    const dateExists = existing.findIndex(m => m.date === metric.date);
    
    let updatedMetrics: DailyExecutionMetric[];
    if (dateExists >= 0) {
      updatedMetrics = [...existing];
      updatedMetrics[dateExists] = { ...metric, id: existing[dateExists].id };
    } else {
      updatedMetrics = [...existing, { ...metric, id: `metric-${Date.now()}` }];
    }

    return {
      ...user,
      dailyMetrics: updatedMetrics
    };
  });
}

// Update Top Weaknesses Gap Analysis
export function updateUserWeaknesses(userId: string, weaknesses: TopWeakness[]): void {
  updateUserById(userId, user => ({
    ...user,
    topWeaknesses: weaknesses
  }));
}



