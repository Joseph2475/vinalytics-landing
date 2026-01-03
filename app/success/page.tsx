'use client';

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="card max-w-lg text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Thank You for Your Pre-order!
        </h1>
        <p className="text-[--text-muted] mb-6">
          Your £25 deposit has been received. You&apos;re now on the list for a Vinalytics device!
        </p>
        <p className="text-[--text-muted] mb-8">
          We&apos;ll email you with updates as we reach our goal of 50 pre-orders.
          Once we hit that target, we&apos;ll begin production and reach out about the remaining balance.
        </p>
        <div className="bg-[--gradient-start]/10 border border-[--gradient-start]/30 rounded-xl p-4 mb-8">
          <p className="text-sm text-[--text-muted]">
            <strong className="text-white">Remember:</strong> If we don&apos;t reach 50 pre-orders,
            your deposit will be fully refunded. No risk to you!
          </p>
        </div>
        <Link
          href="/"
          className="gradient-btn inline-block"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
