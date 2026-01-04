import { NextResponse } from 'next/server';

const DEPOSIT_AMOUNT = 2500; // £25 in pence
const DEPOSIT_CURRENCY = 'gbp';

export async function POST() {
  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method_types[0]': 'card',
        'line_items[0][price_data][currency]': DEPOSIT_CURRENCY,
        'line_items[0][price_data][product_data][name]': 'Vinalytics Pre-order Deposit',
        'line_items[0][price_data][product_data][description]': 'Refundable deposit to reserve your Vinalytics device',
        'line_items[0][price_data][unit_amount]': DEPOSIT_AMOUNT.toString(),
        'line_items[0][quantity]': '1',
        'mode': 'payment',
        'success_url': `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${process.env.NEXT_PUBLIC_BASE_URL}`,
        'metadata[type]': 'preorder_deposit',
      }),
    });

    const session = await response.json();

    if (!response.ok) {
      throw new Error(session.error?.message || 'Stripe API error');
    }

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Checkout error:', error);
    let errorMessage = 'Unknown error';
    let errorType = 'unknown';

    if (error instanceof Error) {
      errorMessage = error.message;
      errorType = error.name;
    }

    // Check for Stripe-specific errors
    const stripeError = error as { type?: string; code?: string; statusCode?: number };

    return NextResponse.json(
      {
        error: 'Failed to create checkout session',
        details: errorMessage,
        type: errorType,
        stripeType: stripeError?.type,
        stripeCode: stripeError?.code,
        statusCode: stripeError?.statusCode
      },
      { status: 500 }
    );
  }
}
