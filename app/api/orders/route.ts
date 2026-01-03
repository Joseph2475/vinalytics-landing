import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET() {
  try {
    const orderCount = await kv.get<number>('order_count') || 0;
    return NextResponse.json({ count: orderCount });
  } catch (error) {
    console.error('Error fetching order count:', error);
    // Return 0 if KV is not configured yet
    return NextResponse.json({ count: 0 });
  }
}
