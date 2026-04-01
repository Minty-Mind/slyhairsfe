import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gold-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Privacy Policy</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">
          Privacy Policy
        </h1>
        <div className="h-1 w-12 bg-gold-500 mb-4" />
        <p className="text-gray-500 text-sm mb-10">Last updated: January 2026</p>

        <div className="prose prose-invert max-w-none space-y-8 text-gray-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">1. Information We Collect</h2>
            <p>When you visit SlyHairs or make a purchase, we collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li><span className="text-white font-medium">Account Information:</span> Name, email address, and password when you create an account.</li>
              <li><span className="text-white font-medium">Order Information:</span> Shipping address, billing details, and purchase history.</li>
              <li><span className="text-white font-medium">Payment Information:</span> Payment details are processed securely through Stripe. We never store your full card number.</li>
              <li><span className="text-white font-medium">Usage Data:</span> Pages visited, time spent, browser type, and device information.</li>
              <li><span className="text-white font-medium">Communications:</span> Messages you send to us via our contact form or email.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Process and fulfil your orders</li>
              <li>Manage your account and provide customer support</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Improve our website, products, and services</li>
              <li>Prevent fraud and maintain security</li>
              <li>Send promotional communications (only with your consent)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">3. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your data with:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li><span className="text-white font-medium">Payment Processors:</span> Stripe, for secure payment processing.</li>
              <li><span className="text-white font-medium">Shipping Partners:</span> To deliver your orders.</li>
              <li><span className="text-white font-medium">Legal Requirements:</span> When required by law or to protect our rights.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information. All data transmitted
              between your browser and our servers is encrypted using SSL/TLS. Payment information is handled entirely by
              Stripe and never touches our servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">5. Cookies</h2>
            <p>
              We use cookies and similar technologies to maintain your session, remember your preferences, and understand
              how you use our site. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of marketing communications at any time</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">7. Data Retention</h2>
            <p>
              We retain your personal information for as long as your account is active or as needed to provide services.
              Order records are kept for accounting and legal purposes. You may request account deletion at any time by
              contacting us.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at{" "}
              <a href="mailto:contact@slyhairs.com" className="text-gold-500 hover:underline">contact@slyhairs.com</a> or
              visit our <Link href="/contact" className="text-gold-500 hover:underline">Contact page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
