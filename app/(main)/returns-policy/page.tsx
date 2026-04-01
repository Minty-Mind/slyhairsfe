import Link from "next/link";

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gold-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Returns &amp; Refunds</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">
          Returns &amp; Refund Policy
        </h1>
        <div className="h-1 w-12 bg-gold-500 mb-4" />
        <p className="text-gray-500 text-sm mb-10">Last updated: January 2026</p>

        <div className="prose prose-invert max-w-none space-y-8 text-gray-300 text-sm leading-relaxed">
          {/* Satisfaction guarantee banner */}
          <div className="bg-gold-500/10 border border-gold-500/20 rounded-2xl p-6 text-center">
            <h3 className="text-gold-500 font-black text-lg uppercase tracking-wide mb-2">
              Your Satisfaction Matters
            </h3>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">
              We stand behind the quality of our premium Vietnamese human hair. If you&apos;re not happy, we&apos;ll make it right.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">1. Return Eligibility</h2>
            <p>You may request a return within <span className="text-white font-bold">14 days</span> of receiving your order, provided:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>The hair is in its <span className="text-white font-medium">original, unused condition</span></li>
              <li>All tags, bands, and packaging are intact</li>
              <li>The hair has <span className="text-white font-medium">not been washed, dyed, cut, or chemically treated</span></li>
              <li>You have your order confirmation or receipt</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">2. Non-Returnable Items</h2>
            <p>The following items cannot be returned:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Hair that has been worn, washed, coloured, or altered in any way</li>
              <li>Hair that has been removed from its original packaging with broken seals</li>
              <li>Customised or made-to-order products</li>
              <li>Items purchased during clearance sales (marked as final sale)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">3. How to Return</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 text-gold-500 font-bold text-sm flex items-center justify-center shrink-0">1</div>
                <div>
                  <h4 className="text-white font-medium">Contact Us</h4>
                  <p className="text-gray-400">Email <a href="mailto:contact@slyhairs.com" className="text-gold-500 hover:underline">contact@slyhairs.com</a> or use our <Link href="/contact" className="text-gold-500 hover:underline">Contact page</Link> with your order number and reason for return.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 text-gold-500 font-bold text-sm flex items-center justify-center shrink-0">2</div>
                <div>
                  <h4 className="text-white font-medium">Get Approval</h4>
                  <p className="text-gray-400">We&apos;ll review your request and send you return instructions within 24&ndash;48 hours.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 text-gold-500 font-bold text-sm flex items-center justify-center shrink-0">3</div>
                <div>
                  <h4 className="text-white font-medium">Ship the Item</h4>
                  <p className="text-gray-400">Send the product back using a tracked shipping service. Return shipping costs are the customer&apos;s responsibility unless the item is defective.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 text-gold-500 font-bold text-sm flex items-center justify-center shrink-0">4</div>
                <div>
                  <h4 className="text-white font-medium">Receive Your Refund</h4>
                  <p className="text-gray-400">Once we receive and inspect the item, your refund will be processed within 5&ndash;10 business days to your original payment method.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">4. Exchanges</h2>
            <p>
              We currently do not offer direct exchanges. If you&apos;d like a different product, please return the original
              item for a refund and place a new order.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">5. Damaged or Defective Items</h2>
            <p>
              If you receive a damaged or defective product, contact us within <span className="text-white font-bold">48 hours</span> of
              delivery with photos of the issue. We will arrange a free return and send a replacement or full refund at no extra cost.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">6. Questions?</h2>
            <p>
              Contact our support team at{" "}
              <a href="mailto:contact@slyhairs.com" className="text-gold-500 hover:underline">contact@slyhairs.com</a> or
              via <a href="https://wa.me/84967894448" className="text-gold-500 hover:underline">WhatsApp</a>.
              We typically respond within 24 hours.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
