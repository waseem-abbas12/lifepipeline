import { RoleArchetypeConfig } from '@/types';

export const ROLE_ARCHETYPES: Record<string, RoleArchetypeConfig> = {
  student: {
    id: 'student',
    title: 'Student & Emerging Scholar',
    tagline: 'Master High-Leverage Skills & Academic Dominance',
    description: 'Designed for ambitious learners balancing coursework, skill acquisition, competitive exams, and building a breakout career path.',
    iconName: 'GraduationCap',
    suggestedFocusAreas: ['GPA & Exam Mastery', 'High-Income Skill Acquisition', 'Internships & Portfolio', 'Fitness & Stamina'],
    defaultGoalsSample: {
      oneYear: 'Graduate with top 5% honors while mastering Full-Stack Development and landing a high-tier internship.',
      threeYear: 'Secure a high-paying international remote engineering role or seed-funded startup position.',
      fiveYear: 'Achieve financial autonomy, invest in first asset portfolio, and mentor aspiring tech students.'
    }
  },
  business_owner: {
    id: 'business_owner',
    title: 'Business Owner & Founder',
    tagline: 'Scale Operations, Capital Efficiency & Market Leadership',
    description: 'Tailored for leaders who need radical prioritization to break through revenue bottlenecks and build autonomous operating systems.',
    iconName: 'TrendingUp',
    suggestedFocusAreas: ['Revenue & Cash Flow', 'Systems & Delegation', 'Strategic Partnerships', 'Cognitive Energy'],
    defaultGoalsSample: {
      oneYear: 'Scale company ARR to $1.2M while building an autonomous executive team that handles daily operations.',
      threeYear: 'Expand product line across two international markets and achieve 35% net profit margins.',
      fiveYear: 'Lead a multi-million-dollar exit or establish a lasting holding company generating passive cash flow.'
    }
  },
  freelancer: {
    id: 'freelancer',
    title: 'Independent Freelancer & Consultant',
    tagline: 'Transition from Time-Trading to High-Ticket Authority',
    description: 'Engineered for solopreneurs navigating client feast-and-famine cycles, contract negotiations, and building scalable consulting equity.',
    iconName: 'Briefcase',
    suggestedFocusAreas: ['High-Ticket Retainers', 'Inbound Authority & Branding', 'Predictable Pipeline', 'Time Mastery'],
    defaultGoalsSample: {
      oneYear: 'Replace one-off gigs with 4 high-ticket monthly retainers at $6,000/mo each with automated lead flow.',
      threeYear: 'Productize service offerings into digital assets and an invite-only masterclass generating 50% passive revenue.',
      fiveYear: 'Operate a boutique micro-agency working with Fortune 500 clients at 15-20 billable hours per week.'
    }
  },
  professional: {
    id: 'professional',
    title: 'Corporate Professional & Executive',
    tagline: 'Fast-Track Promotion, Executive Presence & Work-Life Sync',
    description: 'Optimized for career climbers seeking promotion velocity, office politics navigation, leadership impact, and avoiding burnout.',
    iconName: 'Award',
    suggestedFocusAreas: ['Executive Promotion & Comp', 'Cross-Functional Leadership', 'Work-Life Harmony', 'Strategic Networking'],
    defaultGoalsSample: {
      oneYear: 'Attain promotion to Senior Director / VP level, securing a 40% total compensation increase.',
      threeYear: 'Spearhead enterprise-wide transformation initiative delivering $5M+ in organizational value.',
      fiveYear: 'Transition to Board Advisory positions or C-Suite leadership while preserving prime physical health.'
    }
  },
  housewife: {
    id: 'housewife',
    title: 'Homemaker & Family Anchor',
    tagline: 'Family Flourishing, Personal Growth & Household Mastery',
    description: 'Empowers homemakers with structured time blocking, personal enrichment, wellness rituals, and family financial blueprinting.',
    iconName: 'HeartHandshake',
    suggestedFocusAreas: ['Family Health & Nutrition', 'Personal Passions & Micro-Enterprise', 'Financial Savviness', 'Mental Peace & Self-Care'],
    defaultGoalsSample: {
      oneYear: 'Establish an effortless family wellness routine and launch a passionate home-based digital creative project.',
      threeYear: 'Grow the creative venture into steady household wealth while maintaining serene, fulfilling daily family rhythms.',
      fiveYear: 'Achieve total personal financial confidence, inspire children through independent mastery, and travel annually.'
    }
  }
};
