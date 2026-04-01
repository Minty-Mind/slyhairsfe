import Link from "next/link";
import { Truck, Clock, Globe, Package, ShieldCheck } from "lucide-react";

const shippingZones = [
  { region: "United Kingdom", time: "3\u20135 business days", cost: "\u00a35.99", freeAbove: "\u00a3100" },
  { region: "Europe", time: "5\u20138 business days", cost: "\u00a39.99", freeAbove: "\u00a3150" },
  { region: "United States & Canada", time: "7\u201312 business days", cost: "\u00a312.99", freeAbove: "\u00a3200" },
  { region: "Africa", time: "10\u201318 business days", cost: "\u00a314.99", freeAbove: "\u00a3200" },
  { region: "Rest of World", time: "10\u201320 business days", cost: "\u00a314.99", freeAbove: "\u00a3250" },
];

export default function ShippingInfoPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gold-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Shipping Information</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">
          Shipping Information
        </h1>
        <div className="h-1 w-12 bg-gold-500 mb-10" />

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Truck, title: "Fast Dispatch", desc: "Orders processed within 1\u20132 business days" },
            { icon: Globe, title: "Worldwide Delivery", desc: "We ship to over 50 countries" },
            { icon: ShieldCheck, title: "Secure Packaging", desc: "Discreet & protective packaging" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-neutral-900 rounded-2xl p-5 border border-white/5 text-center">
              <Icon size={28} className="text-gold-500 mx-auto mb-3" />
              <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
              <p className="text-gray-500 text-xs">{desc}</p>
            </div>
          ))}
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-gray-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">Shipping Rates &amp; Delivery Times</h2>
            <p>
              All orders are dispatched from our facility in Hanoi, Vietnam. Delivery times start from the date of dispatch,
              not the order date. You will receive a tracking number via email once your order ships.
            </p>

            {/* Shipping table */}
            <div className="bg-neutral-900 rounded-xl border border-white/5 overflow-hidden mt-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase">Region</th>
                      <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase">Estimated Time</th>
                      <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase">Cost</th>
                      <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase">Free Shipping</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {shippingZones.map((zone) => (
                      <tr key={zone.region} className="hover:bg-white/[0.02]">
                        <td className="px-5 py-3 text-white font-medium text-sm">{zone.region}</td>
                        <td className="px-5 py-3 text-gray-400 text-sm flex items-center gap-2">
                          <Clock size={14} className="text-gold-500" />
                          {zone.time}
                        </td>
                        <td className="px-5 py-3 text-gold-500 font-bold font-mono text-sm">{zone.cost}</td>
                        <td className="px-5 py-3 text-gray-400 text-sm">Orders over {zone.freeAbove}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">Order Processing</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Orders placed before 2:00 PM (GMT+7) on business days are processed the same day.</li>
              <li>Orders placed on weekends or public holidays will be processed the next business day.</li>
              <li>Processing typically takes 1&ndash;2 business days before dispatch.</li>
              <li>During peak periods (sales, holidays), processing may take an additional 1&ndash;2 days.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">Tracking Your Order</h2>
            <p>
              Once your order is dispatched, you&apos;ll receive an email with your tracking number and a link to track your
              shipment. You can also check your order status by logging into your{" "}
              <Link href="/orders" className="text-gold-500 hover:underline">account</Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">Customs &amp; Import Duties</h2>
            <p>
              For international orders, please note that customs duties, taxes, and import fees may apply upon arrival in your
              country. These charges are the responsibility of the recipient and are not included in our shipping costs.
              We recommend checking your country&apos;s customs regulations before ordering.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-white font-bold text-lg">Lost or Delayed Packages</h2>
            <p>
              If your order hasn&apos;t arrived within the estimated delivery window, please{" "}
              <Link href="/contact" className="text-gold-500 hover:underline">contact us</Link> with your order number.
              We&apos;ll investigate with the shipping carrier and work to resolve the issue as quickly as possible.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
