import Stripe from 'stripe';

// Create new instance each time to ensure fresh env vars
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(key);
}

export const DEPOSIT_AMOUNT = 2500; // £25 in pence
export const DEPOSIT_CURRENCY = 'gbp';
