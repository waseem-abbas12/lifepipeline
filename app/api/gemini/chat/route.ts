import { NextRequest, NextResponse } from 'next/server';

interface ChatRequestBody {
  message: string;
  history?: Array<{ sender: 'user' | 'coach'; message: string }>;
  userContext?: {
    name: string;
    role: string;
    blueprintGoals?: Array<{ timeframe: string; title: string; category: string }>;
    timeLock?: { focus_title: string; why_this_matters: string };
    compositeScore?: number;
    healthStatus?: string;
    weaknesses?: Array<{ title: string; whyFallingBehind: string }>;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequestBody = await req.json();
    const { message, history = [], userContext } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message cannot be empty.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Build personalized psychological system prompt
    const contextPrompt = `
You are the elite "LifePipeline AI Life & Execution Coach", a master of psychological execution, the Pareto 80/20 principle, cognitive friction elimination, and high-performance accountability.

USER PROFILE:
- Name: ${userContext?.name || 'High-Agency Operator'}
- Archetype: ${userContext?.role || 'Operator'}
- Current Momentum Health: ${userContext?.compositeScore ?? 75}/100 (${userContext?.healthStatus || 'yellow'} status)
- Active 3-6 Month Time-Lock: "${userContext?.timeLock?.focus_title || 'Unset'}"
  Why This Matters: "${userContext?.timeLock?.why_this_matters || 'Unspecified stakes'}"
- Key Life Blueprint Goals:
${userContext?.blueprintGoals?.map(g => `  * [${g.timeframe.replace('_', ' ')}] ${g.category}: ${g.title}`).join('\n') || '  * None loaded'}
- Identified Top Friction / Weaknesses:
${userContext?.weaknesses?.map(w => `  * ${w.title}: ${w.whyFallingBehind}`).join('\n') || '  * Morning inertia & routine drift'}

COACHING PHILOSOPHY & BEHAVIORAL DIRECTIVES:
1. Empathy + Radical Execution Truth: Be warm, highly empathetic, and validating, yet uncompromising about execution reality.
2. The Pareto 80/20 Razor: Continually challenge the user to separate the vital 20% needle-movers from comfortable 80% routine busywork.
3. Micro-Slicing: If the user feels overwhelmed, anxious, or procrastinating, slice the goal down into an immediate 15-to-25 minute bite-sized micro-action.
4. Reference Their Blueprint: Weave their active Time-Lock and declared goals into your guidance so advice feels deeply personal, not generic.
5. Format for Mobile Clarity: Keep responses structured with clean paragraphs, bold key psychological insights, and short actionable bullet points. Never write impenetrable walls of text.
`.trim();

    // If Gemini API key is configured and valid, call Google Generative Language REST API
    if (apiKey && apiKey !== 'your_actual_gemini_api_key_here' && !apiKey.startsWith('demo_')) {
      try {
        const contents = [
          {
            role: 'user',
            parts: [{ text: `SYSTEM INSTRUCTIONS:\n${contextPrompt}` }]
          },
          {
            role: 'model',
            parts: [{ text: `Understood. I am your elite LifePipeline Psychological Execution Coach. I have your complete blueprint, time-lock commitment, and momentum metrics loaded. How can I serve your execution today?` }]
          }
        ];

        // Append recent chat turns
        const recentHistory = history.slice(-6);
        for (const turn of recentHistory) {
          contents.push({
            role: turn.sender === 'user' ? 'user' : 'model',
            parts: [{ text: turn.message }]
          });
        }

        // Append current message
        contents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 900,
                topP: 0.95
              }
            })
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const rawReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawReply) {
            return NextResponse.json({
              reply: rawReply,
              source: 'gemini-1.5-flash'
            });
          }
        }
      } catch (geminiError) {
        console.warn('Gemini chat API call failed, using psychological fallback:', geminiError);
      }
    }

    // High-EQ Psychological Fallback
    const fallbackReply = generatePsychologicalFallback(message, userContext);
    return NextResponse.json({
      reply: fallbackReply,
      source: 'psychological-fallback-coach',
      notice: !apiKey || apiKey === 'your_actual_gemini_api_key_here'
        ? 'Using internal psychological heuristics. Configure GEMINI_API_KEY in .env.local to activate live Gemini Flash reasoning.'
        : undefined
    });
  } catch (error: any) {
    console.error('Error in AI Coach Chat route:', error);
    return NextResponse.json(
      { error: 'Failed to process coaching request.', details: error.message },
      { status: 500 }
    );
  }
}

function generatePsychologicalFallback(userMessage: string, context: ChatRequestBody['userContext']): string {
  const lower = userMessage.toLowerCase();
  const userName = context?.name?.split(' ')[0] || 'Friend';
  const timeLock = context?.timeLock?.focus_title;

  if (lower.includes('stuck') || lower.includes('procrastinat') || lower.includes('hard') || lower.includes('tired')) {
    return `**${userName}, listen closely to what your nervous system is signaling.**

When you feel resistance, it is rarely a lack of willpower; it is almost always **ambiguity friction**. The brain fears large, unscoped tasks.

Here is your immediate psychological intervention:
1. **The 5-Minute Micro-Contract**: Do not commit to finishing the entire milestone right now. Commit solely to working on the very first sub-task for **15 minutes**.
2. **Anchor to your Stakes**: Remember why your Time-Lock (*"${timeLock || 'your primary mission'}"*) matters: *${context?.timeLock?.why_this_matters || 'Compounding freedom and sovereignty'}*.
3. **Turn off Notifications**: Put your phone in another room or on Do Not Disturb.

What is the single smallest mechanical step (e.g., opening a document, writing one sentence) you can execute in the next 120 seconds?`;
  }

  if (lower.includes('80/20') || lower.includes('priorit') || lower.includes('focus') || lower.includes('vital')) {
    return `**Let's run the 80/20 Pareto Razor across your schedule, ${userName}.**

80% of typical daily tasks produce only 20% of your real life outcomes. If you are honest with yourself:
- **Your Vital 20%**: The actions that directly push your active focus (*"${timeLock || 'Core Horizon'}"*). Everything else is maintenance.
- **The Routine 80%**: Emails, organizing, tweaking graphics, Slack banter. They feel like work, but they are psychological shields against high-stakes vulnerability.

**Your Action Command:**
Pick your **single highest-leverage task** today. Close all other tabs. Execute it for 45 minutes before answering a single message.`;
  }

  return `**I hear you, ${userName}.**

As your execution coach, I want you to remember: **Momentum is built through tiny completions, not giant leaps.**

Looking at your current profile:
- Your active horizon: **${timeLock || 'Mastering your primary life domain'}**
- Current execution score: **${context?.compositeScore || 70}/100**

To turn your current state into rapid forward traction:
1. Name the **one needle-moving action** that would make today a clear victory.
2. Eliminate the secondary distractions that dilute your mental energy.
3. Give yourself permission to ignore low-priority tasks until your Vital 20% is locked.

Tell me: what is the biggest friction stopping you from starting that vital task right now?`;
}
