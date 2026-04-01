import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gold-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Terms of Service</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">
          Terms of Service
        </h1>
        <div className="h-1 w-12 bg-gold-500 mb-4" />
        <p className="text-gray-500 text-sm mb-10">Last updated: January 2026</p>

        <div className="prose prose-invert max-w-none space-y-8 text-gray-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">1. Acceptance of Terms</h2>
            <p>
              By accessing and using SlyHairs (&ldquo;the Site&rdquo;), you agree to be bound by these Terms of Service.
              If you do not agree with any part of these terms, please do not use our website or services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">2. Products & Descriptions</h2>
            <p>
              We make every effort to display our hair products as accurately as possible. However, due to differences in
              monitors and lighting, actual colours may vary slightly from what you see on screen. Hair texture, length,
              and weight are approximate and may have minor natural variations as our products are made from 100% human hair.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">3. Pricing & Payment</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>All prices are displayed in British Pounds (&pound;) and include applicable taxes.</li>
              <li>We reserve the right to change prices at any time without prior notice.</li>
              <li>Payment is processed securely through Stripe. We accept major credit and debit cards.</li>
              <li>Your order is confirmed only after successful payment processing.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">4. Orders & Fulfilment</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>All orders are subject to product availability.</li>
              <li>We reserve the right to refuse or cancel any order for any reason.</li>
              <li>You will receive an email confirmation once your order is placed and another when it ships.</li>
              <li>Processing time is typically 1&ndash;3 business days before shipping.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">5. User Accounts</h2>
            <p>When you create an account, you are responsible for:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Maintaining the confidentiality of your password</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and up-to-date information</li>
              <li>Notifying us immediately of any unauthorised access</li>
            </ul>
            <p>We reserve the right to suspend or terminate accounts that violate these terms.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">6. Intellectual Property</h2>
            <p>
              All content on this site &mdash; including text, images, logos, and design &mdash; is the property of SlyHairs
              and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or use any
              content without our written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">7. Limitation of Liability</h2>
            <p>
              SlyHairs shall not be liable for any indirect, incidental, or consequential damages arising from the use of
              our website or products. Our total liability shall not exceed the amount paid for the product in question.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">8. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes
              shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">9. Changes to Terms</h2>
            <p>
              We may update these Terms of Service from time to time. Changes will be posted on this page with an updated
              revision date. Continued use of the site after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">10. Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:contact@slyhairs.com" className="text-gold-500 hover:underline">contact@slyhairs.com</a> or
              visit our <Link href="/contact" className="text-gold-500 hover:underline">Contact page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
