'use client';

import { useState, useEffect } from 'react';

// Vinyl logo component
function VinylLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center vinyl-spin">
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#feca57]" />
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
      </div>
    </div>
  );
}

// Feature card component
function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="card text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-[--text-muted]">{description}</p>
    </div>
  );
}

// Step component for How It Works
function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#feca57] flex items-center justify-center text-black font-bold text-xl mb-4">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-[--text-muted]">{description}</p>
    </div>
  );
}

// FAQ Item component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left"
      >
        <span className="text-white font-medium">{question}</span>
        <span className="text-[--gradient-end] text-2xl">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <p className="pb-4 text-[--text-muted]">{answer}</p>
      )}
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderCount, setOrderCount] = useState(0);

  const goalCount = 50;
  const progress = (orderCount / goalCount) * 100;

  // Fetch order count on mount
  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrderCount(data.count))
      .catch(console.error);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubscribed(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreorder = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <VinylLogo />
            <span className="text-xl font-bold text-white">Vinalytics</span>
          </div>
          <button onClick={handlePreorder} className="gradient-btn text-sm py-2 px-4">
            Pre-order Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center vinyl-spin shadow-2xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#feca57]" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Track Your <span className="gradient-text">Vinyl</span> Listening
          </h1>

          <p className="text-xl text-[--text-muted] max-w-2xl mx-auto mb-8">
            A plug-and-play device that automatically identifies every record you spin,
            tracks your listening habits, and scrobbles to Last.fm.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handlePreorder} className="gradient-btn text-lg">
              Reserve Yours - £25 Deposit
            </button>
            <a href="#features" className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-12 px-6">
        <div className="max-w-xl mx-auto">
          <div className="card text-center">
            <p className="text-[--text-muted] mb-2">Pre-order Progress</p>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-4xl font-bold gradient-text">{orderCount}</span>
              <span className="text-[--text-muted]">/ {goalCount} orders</span>
            </div>
            <div className="progress-bar h-3 mb-4">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-sm text-[--text-muted]">
              We need {goalCount} pre-orders to start production. {goalCount - orderCount} more to go!
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Everything You Need to <span className="gradient-text">Track Your Vinyl</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="🎵"
              title="Automatic Recognition"
              description="Shazam-powered identification recognizes every track you play, even obscure pressings."
            />
            <FeatureCard
              icon="📊"
              title="Beautiful Dashboard"
              description="View your listening stats, top artists, play counts, and listening patterns."
            />
            <FeatureCard
              icon="🎧"
              title="Last.fm Scrobbling"
              description="Automatically scrobble every track to your Last.fm profile as you listen."
            />
            <FeatureCard
              icon="⚡"
              title="Plug & Play"
              description="Just connect to your turntable and WiFi. No configuration needed."
            />
            <FeatureCard
              icon="📱"
              title="Access Anywhere"
              description="View your dashboard from any device - phone, tablet, or computer."
            />
            <FeatureCard
              icon="🔒"
              title="Your Data, Your Control"
              description="All data stays on your device. No cloud subscriptions required."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            How It <span className="gradient-text">Works</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Step
              number={1}
              title="Connect"
              description="Plug Vinalytics into your turntable or receiver using the included Y-splitters."
            />
            <Step
              number={2}
              title="Play"
              description="Drop the needle and play your records as usual. Vinalytics listens in the background."
            />
            <Step
              number={3}
              title="Discover"
              description="Open the dashboard to see your listening stats, history, and insights."
            />
          </div>
        </div>
      </section>

      {/* Pre-order Section */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Reserve Your <span className="gradient-text">Vinalytics</span>
          </h2>
          <p className="text-[--text-muted] mb-8">
            Pay a £25 refundable deposit to secure your spot.
            You&apos;ll only be charged the remaining balance once we reach our goal of 50 orders.
          </p>

          <div className="card mb-8">
            <div className="text-4xl font-bold text-white mb-2">£25</div>
            <p className="text-[--text-muted] mb-6">Refundable deposit</p>
            <button onClick={handlePreorder} className="gradient-btn w-full text-lg">
              Pre-order Now
            </button>
            <p className="text-sm text-[--text-muted] mt-4">
              Final price: £125-150 (to be confirmed)
            </p>
          </div>

          <div className="text-center">
            <p className="text-[--text-muted] mb-4">Not ready to commit? Register your interest:</p>

            {subscribed ? (
              <p className="text-[--gradient-end] font-semibold">Thanks! We&apos;ll keep you updated.</p>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-[--text-muted] focus:outline-none focus:border-[--gradient-start]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="gradient-btn px-6 py-3"
                >
                  {loading ? '...' : 'Notify Me'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>

          <div className="card">
            <FAQItem
              question="What's included in the box?"
              answer="You'll receive a fully assembled Vinalytics unit, USB power supply, RCA Y-splitters to connect to your turntable/receiver, and an RCA to 3.5mm cable. Everything you need to get started."
            />
            <FAQItem
              question="What if you don't reach 50 orders?"
              answer="If we don't reach our goal of 50 pre-orders, all deposits will be fully refunded. No risk to you."
            />
            <FAQItem
              question="How does the device identify tracks?"
              answer="Vinalytics uses the same audio fingerprinting technology as Shazam. It listens to your music and matches it against a massive database of songs."
            />
            <FAQItem
              question="Do I need a subscription?"
              answer="No! There are no ongoing fees. You own the device and all your data stays local. Last.fm scrobbling is optional and uses your existing Last.fm account."
            />
            <FAQItem
              question="When will devices ship?"
              answer="Once we hit 50 pre-orders, we'll begin production. Estimated shipping is 6-8 weeks after the goal is reached."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <VinylLogo />
            <span className="text-xl font-bold text-white">Vinalytics</span>
          </div>
          <p className="text-[--text-muted]">
            Track your vinyl listening habits.
          </p>
          <p className="text-sm text-[--text-muted] mt-4">
            © {new Date().getFullYear()} Vinalytics. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
