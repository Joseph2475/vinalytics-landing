import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { kv } from '@vercel/kv';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.metadata?.type === 'preorder_deposit') {
      // Increment order count
      const currentCount = await kv.get<number>('order_count') || 0;
      await kv.set('order_count', currentCount + 1);

      // Store customer email for updates
      if (session.customer_details?.email) {
        await kv.sadd('preorder_emails', session.customer_details.email);
      }

      console.log(`New pre-order! Total: ${currentCount + 1}`);
    }
  }

  return NextResponse.json({ received: true });
}
