import { NextResponse } from 'next/server';
import { DecomposedItem, MicroTask, HealthScoreReport, HealthStatus } from '@/types';

interface GeminiRequestPayload {
  rawThoughts: string;
  userProfile?: {
    name?: string;
    role?: string;
    roleTitle?: string;
  };
  activeTimeLock?: {
    focus_title?: string;
    why_this_matters?: string;
    duration_months?: number;
  } | null;
  blueprintGoals?: Array<{
    timeframe: string;
    title: string;
    category: string;
  }>;
}

const SYSTEM_PROMPT = `You are an elite psychological execution coach and time-management strategist applying the Pareto 80/20 Principle.
Your mission is to take chaotic, scattered thoughts and life blueprints from ambitious individuals and ruthlessly separate the Vital 20% needle-movers from the 80% routine noise, administrative busywork, and procrastination traps.

Rules:
1. Analyze the user's active Time-Lock commitment, long-term blueprint goals, and their raw scattered thoughts.
2. Filter every thought:
   - Identify the Vital 20% items: actions that directly drive 80% of revenue, mastery, exam scores, or milestone progression. Assign leverageScore (70 - 100), isVital20 = true, and provide an impactRationale.
   - Identify the Routine 80% items: administrative maintenance, cosmetics, perfectionist stalling, or low-leverage distractions. Assign leverageScore (5 - 65), isVital20 = false.
3. For the Vital 20% items, generate immediate, bite-sized Daily Micro-Tasks:
   - Durations MUST be strictly 15, 30, or 45 minutes to minimize subconscious initiation friction.
   - Set energy_state to "deep_focus", "quick_execution", or "routine".
   - Set leverage_tier to "vital_20".
4. Calculate a Traffic Light Health Score Report:
   - status: "green" (optimal momentum >= 80), "yellow" (friction/drift 50-79), or "red" (critical stall < 50).
   - composite_score (0 - 100)
   - execution_velocity_pct, pareto_discipline_pct, time_lock_pace_pct
   - diagnoses: array of friction points (pareto_drift, friction_overload, time_lock_lag, momentum_loss) with severity and a concise prescribed_action psychological remedy.

Return ONLY a valid JSON object matching this exact schema:
{
  "decomposedItems": [
    {
      "originalText": "raw line",
      "refinedTitle": "Sharpened actionable title",
      "leverageScore": 92,
      "isVital20": true,
      "category": "Pipeline & Revenue",
      "estimatedMinutes": 45,
      "impactRationale": "Why this 20% action moves 80% of the needle"
    }
  ],
  "microTasks": [
    {
      "title": "Bite-sized micro-task title under 45 mins",
      "duration_minutes": 30,
      "energy_state": "deep_focus",
      "leverage_tier": "vital_20"
    }
  ],
  "healthReport": {
    "composite_score": 75,
    "status": "yellow",
    "execution_velocity_pct": 78,
    "pareto_discipline_pct": 70,
    "time_lock_pace_pct": 76,
    "summary": "Clear psychological diagnostic summary",
    "diagnoses": [
      {
        "category": "pareto_drift",
        "severity": "critical",
        "title": "Identified Friction Point",
        "description": "Why this pattern stalls execution",
        "prescribed_action": "Exact psychological protocol to fix it immediately"
      }
    ]
  }
}`;

// Deterministic Psychological Fallback Engine if API key is unconfigured or rate limited
function runDeterministicFallback(
  rawThoughts: string,
  userProfile?: GeminiRequestPayload['userProfile'],
  activeTimeLock?: GeminiRequestPayload['activeTimeLock']
) {
  const lines = rawThoughts
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  const highLeverageRegex = /(sales|revenue|demo|client|contract|customer|stripe|billing|hire|closer|launch|lead|convert|ship|outreach|paper|exam|thesis|study|proposal|portfolio|invest|board|pitch|promote|vp)/i;
  const adminRegex = /(clean|organize|slack|email|inbox|notion|color|swatch|header|logo|graphic|desk|social|twitter|instagram|browse)/i;

  const decomposedItems: DecomposedItem[] = lines.map((line, idx) => {
    const isHigh = highLeverageRegex.test(line) || (!adminRegex.test(line) && idx < 3);
    const score = isHigh ? Math.floor(78 + (idx % 4) * 5) : Math.floor(15 + (idx % 5) * 8);
    const isVital = score >= 70;

    let category = 'Maintenance 80%';
    let impactRationale = 'Routine administrative upkeep. Defer or batch to late afternoon.';
    if (isVital) {
      category = 'Vital 20% Needle-Mover';
      impactRationale = `Directly moves the needle on "${activeTimeLock?.focus_title || 'Core Milestone'}". High outcome leverage.`;
    }

    return {
      id: `dec-${Date.now()}-${idx}`,
      originalText: line,
      refinedTitle: line.charAt(0).toUpperCase() + line.slice(1),
      leverageScore: Math.min(98, score),
      isVital20: isVital,
      category,
      estimatedMinutes: isVital ? 45 : 15,
      impactRationale,
    };
  });

  decomposedItems.sort((a, b) => b.leverageScore - a.leverageScore);

  const vitals = decomposedItems.filter(i => i.isVital20);
  const microTasks: MicroTask[] = vitals.flatMap((v, idx) => [
    {
      id: `mt-${Date.now()}-${idx}-1`,
      user_id: 'active',
      title: `Sprint A: ${v.refinedTitle} (Preparation & First Deliverable)`,
      duration_minutes: 30,
      energy_state: 'deep_focus',
      leverage_tier: 'vital_20',
      completed: false,
    },
    {
      id: `mt-${Date.now()}-${idx}-2`,
      user_id: 'active',
      title: `Sprint B: Send, publish, or execute ${v.refinedTitle}`,
      duration_minutes: (v.estimatedMinutes >= 45 ? 45 : 15) as 15 | 30 | 45 | 60,
      energy_state: 'quick_execution',
      leverage_tier: 'vital_20',
      completed: false,
    },
  ]);

  const vitalRatio = vitals.length / Math.max(1, lines.length);
  const composite = Math.round(vitalRatio * 50 + 40);
  let status: HealthStatus = 'yellow';
  if (composite >= 80) status = 'green';
  else if (composite < 50) status = 'red';

  const healthReport: HealthScoreReport = {
    id: `eval-${Date.now()}`,
    user_id: 'active',
    composite_score: composite,
    status,
    execution_velocity_pct: Math.min(95, composite + 5),
    pareto_discipline_pct: Math.round(vitalRatio * 100),
    time_lock_pace_pct: 75,
    summary: `Identified ${vitals.length} Vital 20% drivers out of ${lines.length} thoughts. Focus solely on the Vital micro-tasks.`,
    diagnoses: [
      {
        id: `gap-${Date.now()}-1`,
        category: 'pareto_drift',
        severity: vitalRatio < 0.3 ? 'critical' : 'moderate',
        title: 'Cognitive Dispersal Alert',
        description: `${lines.length - vitals.length} of your captured items represent routine maintenance that create the illusion of productivity while delaying true progress.`,
        prescribed_action: 'Lock a 90-minute morning deep focus window with zero email or routine maintenance allowed.',
        resolved: false,
      },
    ],
    evaluated_at: new Date().toISOString(),
  };

  return { decomposedItems, microTasks, healthReport };
}

export async function POST(req: Request) {
  try {
    const body: GeminiRequestPayload = await req.json();
    const { rawThoughts, userProfile, activeTimeLock, blueprintGoals } = body;

    if (!rawThoughts || !rawThoughts.trim()) {
      return NextResponse.json(
        { error: 'Please provide your scattered thoughts to analyze.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // If API key is not present, use the deterministic psychological engine
    if (!apiKey || apiKey === 'your-gemini-api-key') {
      const fallbackResult = runDeterministicFallback(rawThoughts, userProfile, activeTimeLock);
      return NextResponse.json({
        ...fallbackResult,
        source: 'local_heuristic_engine',
        notice: 'Powered by LifePipeline Pareto Heuristic. Add GEMINI_API_KEY in .env.local to activate live Google Gemini Flash AI reasoning.',
      });
    }

    // Call Google Gemini Flash API via Generative Language endpoint
    const userPrompt = `
USER CONTEXT:
- Name: ${userProfile?.name || 'User'}
- Archetype / Role: ${userProfile?.roleTitle || userProfile?.role || 'Professional'}
- Active Time-Lock Commitment: "${activeTimeLock?.focus_title || 'No active time-lock set'}" (Duration: ${activeTimeLock?.duration_months || 3} months)
- Why This Matters (Psychological Stake): "${activeTimeLock?.why_this_matters || 'High leverage'}"
- 1-Year Horizon Goals: ${blueprintGoals?.map(g => `${g.category}: ${g.title}`).join('; ') || 'N/A'}

RAW SCATTERED THOUGHTS DUMP:
"""
${rawThoughts}
"""

Execute the Pareto 80/20 analysis now. Return strictly JSON.`;

    const modelEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(modelEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              { text: `${SYSTEM_PROMPT}\n\n${userPrompt}` }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        }
      })
    });

    if (!geminiResponse.ok) {
      console.warn(`Gemini API returned ${geminiResponse.status}. Falling back to deterministic engine.`);
      const fallbackResult = runDeterministicFallback(rawThoughts, userProfile, activeTimeLock);
      return NextResponse.json({
        ...fallbackResult,
        source: 'local_heuristic_fallback',
        notice: `Gemini API response: ${geminiResponse.statusText}. Using psychological fallback.`,
      });
    }

    const geminiData = await geminiResponse.json();
    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error('Empty response from Gemini Flash');
    }

    // Parse JSON safely
    const parsed = JSON.parse(rawText);

    // Ensure IDs and structure match our strict types
    const decomposedItems: DecomposedItem[] = (parsed.decomposedItems || []).map((item: any, idx: number) => ({
      id: `dec-${Date.now()}-${idx}`,
      originalText: item.originalText || item.refinedTitle || `Item ${idx + 1}`,
      refinedTitle: item.refinedTitle || item.originalText,
      leverageScore: Number(item.leverageScore) || 50,
      isVital20: Boolean(item.isVital20),
      category: item.category || (item.isVital20 ? 'Vital 20% Lever' : 'Routine 80% Admin'),
      estimatedMinutes: Number(item.estimatedMinutes) || (item.isVital20 ? 45 : 15),
      impactRationale: item.impactRationale || '',
    }));

    const microTasks: MicroTask[] = (parsed.microTasks || []).map((t: any, idx: number) => ({
      id: `mt-${Date.now()}-${idx}`,
      user_id: 'active',
      title: t.title || 'Execute sprint',
      duration_minutes: [15, 30, 45].includes(Number(t.duration_minutes)) ? Number(t.duration_minutes) as 15 | 30 | 45 : 30,
      energy_state: ['deep_focus', 'quick_execution', 'routine'].includes(t.energy_state) ? t.energy_state : 'deep_focus',
      leverage_tier: 'vital_20',
      completed: false,
    }));

    const rawHealth = parsed.healthReport || {};
    const composite = Math.min(100, Math.max(0, Number(rawHealth.composite_score) || 75));
    let status: HealthStatus = 'yellow';
    if (composite >= 80) status = 'green';
    else if (composite < 50) status = 'red';

    const healthReport: HealthScoreReport = {
      id: `eval-${Date.now()}`,
      user_id: 'active',
      composite_score: composite,
      status,
      execution_velocity_pct: Number(rawHealth.execution_velocity_pct) || composite,
      pareto_discipline_pct: Number(rawHealth.pareto_discipline_pct) || composite,
      time_lock_pace_pct: Number(rawHealth.time_lock_pace_pct) || 80,
      summary: rawHealth.summary || 'Gemini Flash 80/20 cognitive audit complete.',
      diagnoses: (rawHealth.diagnoses || []).map((d: any, idx: number) => ({
        id: `gap-${Date.now()}-${idx}`,
        category: d.category || 'pareto_drift',
        severity: d.severity || 'moderate',
        title: d.title || 'Friction Point',
        description: d.description || '',
        prescribed_action: d.prescribed_action || '',
        resolved: false,
      })),
      evaluated_at: new Date().toISOString(),
    };

    return NextResponse.json({
      decomposedItems,
      microTasks,
      healthReport,
      source: 'gemini_flash_api',
    });
  } catch (error: any) {
    console.error('Error in /api/gemini/decompose:', error);
    // Graceful fallback to deterministic analysis so user is never blocked
    try {
      const body: GeminiRequestPayload = await req.json();
      const fallbackResult = runDeterministicFallback(body.rawThoughts, body.userProfile, body.activeTimeLock);
      return NextResponse.json({
        ...fallbackResult,
        source: 'local_heuristic_fallback_on_error',
        notice: `Server note: ${error.message}. Loaded psychological fallback.`,
      });
    } catch {
      return NextResponse.json(
        { error: 'Failed to process thoughts. Please try again.' },
        { status: 500 }
      );
    }
  }
}

