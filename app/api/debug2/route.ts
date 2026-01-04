import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    stripeKey: process.env.STRIPE_SECRET_KEY?.substring(0, 15),
  });
}
