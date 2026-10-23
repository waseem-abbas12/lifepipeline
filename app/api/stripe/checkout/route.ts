import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const { planId = 'operator', email, userId } = await req.json();

    const stripeSecret = process.env.STRIPE_SECRET_KEY;

    // Plans config
    const plans: Record<string, { name: string; amount: number; description: string }> = {
      operator: {
        name: 'LifePipeline Operator Plan',
        amount: 2900, // $29.00
        description: 'Individual 80/20 Execution Engine + Gemini Flash AI Coach + Time-Locks',
      },
      family: {
        name: 'LifePipeline Family / Dynasty Plan',
        amount: 7900, // $79.00
        description: 'Up to 5 Private Cohort Accounts + Shared Accountability Pod',
      },
      squad: {
        name: 'LifePipeline High-Ticket Enterprise Squad',
        amount: 19900, // $199.00
        description: 'B2B Sales & Startup Cohorts + Team Velocity Scoreboards',
      },
    };

    const selected = plans[planId] || plans.operator;

    if (stripeSecret && stripeSecret.startsWith('sk_')) {
      const stripe = new Stripe(stripeSecret, {
        apiVersion: '2025-01-27.acacia' as any,
      });

      const origin = req.headers.get('origin') || 'https://lifepipeline.vercel.app';

      const session = await stripe.checkout.sessions.create({
        customer_email: email,
        client_reference_id: userId,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: selected.name,
                description: selected.description,
              },
              unit_amount: selected.amount,
              recurring: { interval: 'month' },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${origin}/self-analysis?session_id={CHECKOUT_SESSION_ID}&upgraded=true`,
        cancel_url: `${origin}/pricing?canceled=true`,
      });

      return NextResponse.json({ url: session.url });
    }

    // Demo Mode Simulated Checkout URL if STRIPE_SECRET_KEY is pending
    const origin = req.headers.get('origin') || 'https://lifepipeline.vercel.app';
    return NextResponse.json({
      url: `${origin}/self-analysis?simulated_checkout=success&plan=${planId}`,
      simulated: true,
      message: 'Stripe simulated mode active. Add STRIPE_SECRET_KEY to .env.local for live banking.',
    });
  } catch (err: any) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
