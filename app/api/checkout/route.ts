import { NextResponse } from 'next/server';
import { getStripe, DEPOSIT_AMOUNT, DEPOSIT_CURRENCY } from '@/lib/stripe';

export async function POST() {
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: DEPOSIT_CURRENCY,
            product_data: {
              name: 'Vinalytics Pre-order Deposit',
              description: 'Refundable deposit to reserve your Vinalytics device',
            },
            unit_amount: DEPOSIT_AMOUNT,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      metadata: {
        type: 'preorder_deposit',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
