import { NextResponse } from 'next/server';

export async function GET() {
  const hasStripeKey = !!process.env.STRIPE_SECRET_KEY;
  const keyPrefix = process.env.STRIPE_SECRET_KEY?.substring(0, 15) || 'NOT SET';
  
  return NextResponse.json({ 
    hasStripeKey,
    keyPrefix,
    nodeEnv: process.env.NODE_ENV,
  });
}
