import Stripe from 'stripe';

// Lazy initialization to avoid build-time errors
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-12-15.clover',
    });
  }
  return stripeInstance;
}

export const DEPOSIT_AMOUNT = 2500; // £25 in pence
export const DEPOSIT_CURRENCY = 'gbp';
