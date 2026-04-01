"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "Products & Hair Quality",
    questions: [
      {
        q: "Is this real human hair?",
        a: "Yes, 100%. All SlyHairs products are made from premium Vietnamese human hair. Our hair is ethically sourced and never blended with synthetic fibres.",
      },
      {
        q: "What does 'double drawn' mean?",
        a: "Double drawn hair means the shorter strands have been removed, so every strand is roughly the same length from root to tip. This gives a fuller, thicker look compared to single drawn hair.",
      },
      {
        q: "Can I dye or bleach the hair?",
        a: "Yes! Since it's 100% human hair, you can colour, bleach, straighten, and curl it just like your own hair. We recommend having a professional stylist handle any chemical processing to ensure the best results.",
      },
      {
        q: "How long does the hair last?",
        a: "With proper care, our premium hair can last 12\u201324 months or longer. Factors like how often you wear it, heat usage, and your maintenance routine will affect longevity.",
      },
      {
        q: "What textures do you offer?",
        a: "We offer Bone Straight, Body Wave, Deep Wave, Water Wave, Loose Wave, Kinky Curly, Kinky Straight, and Natural Straight textures across bundles, wigs, frontals, closures, and extensions.",
      },
      {
        q: "How do I choose the right length?",
        a: "Lengths are measured in inches when the hair is stretched straight. Body wave and curly textures will appear 1\u20132 inches shorter when worn due to the curl pattern. We recommend ordering 2 inches longer if you want a specific worn length.",
      },
    ],
  },
  {
    category: "Orders & Payments",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards (Visa, Mastercard, Amex) through our secure Stripe payment processor. Apple Pay and Google Pay are also available at checkout.",
      },
      {
        q: "Can I modify or cancel my order?",
        a: "You can request changes within 2 hours of placing your order by contacting us immediately. Once an order enters processing, we cannot guarantee changes. Contact us via WhatsApp for the fastest response.",
      },
      {
        q: "Do you offer wholesale pricing?",
        a: "Yes! We offer competitive wholesale pricing for bulk orders. Visit our Contact page or reach out directly via WhatsApp to discuss wholesale opportunities and minimum order quantities.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "Where do you ship from?",
        a: "All orders ship directly from our facility in Hanoi, Vietnam. This allows us to offer factory-direct pricing without middleman markups.",
      },
      {
        q: "How long does shipping take?",
        a: "UK orders: 3\u20135 business days. Europe: 5\u20138 days. US & Canada: 7\u201312 days. Africa: 10\u201318 days. Check our Shipping Information page for full details and free shipping thresholds.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! Free shipping is available on orders above a certain amount depending on your region. UK: \u00a3100+, Europe: \u00a3150+, US/Canada: \u00a3200+. See our Shipping page for all thresholds.",
      },
      {
        q: "Will I have to pay customs duties?",
        a: "For international orders, customs duties and import taxes may apply depending on your country\u2019s regulations. These charges are the responsibility of the recipient and are not included in our prices.",
      },
    ],
  },
  {
    category: "Returns & Care",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 14 days of delivery for unused, unaltered hair in its original packaging. See our Returns Policy page for full details.",
      },
      {
        q: "How should I care for my hair?",
        a: "Use sulphate-free shampoo and conditioner. Avoid sleeping with wet hair. Use a wide-tooth comb starting from the ends. Minimise heat styling and always use heat protectant. Store on a wig stand or in a silk bag when not in use.",
      },
      {
        q: "What if I receive a damaged product?",
        a: "Contact us within 48 hours of delivery with photos. We\u2019ll arrange a free return and send a replacement or full refund. Your satisfaction is our priority.",
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-neutral-900 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
    >
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-white font-medium text-sm pr-4">{question}</span>
        <ChevronDown
          size={16}
          className={cn("text-gold-500 shrink-0 transition-transform duration-200", open && "rotate-180")}
        />
      </div>
      {open && (
        <div className="px-5 pb-4 pt-0">
          <div className="border-t border-white/5 pt-3">
            <p className="text-gray-400 text-sm leading-relaxed">{answer}</p>
          </div>
        </div>
      )}
    </button>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-gold-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">FAQ</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">
          Frequently Asked Questions
        </h1>
        <div className="h-1 w-12 bg-gold-500 mb-4" />
        <p className="text-gray-500 text-sm mb-10">
          Can&apos;t find what you&apos;re looking for?{" "}
          <Link href="/contact" className="text-gold-500 hover:underline">Contact us</Link> and we&apos;ll be happy to help.
        </p>

        <div className="space-y-10">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-[10px] font-black text-gold-500 uppercase tracking-[0.3em] mb-4">
                {section.category}
              </h2>
              <div className="space-y-2">
                {section.questions.map((faq) => (
                  <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still need help? */}
        <div className="mt-12 bg-gold-500/10 border border-gold-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-white font-black text-xl mb-2">Still Have Questions?</h3>
          <p className="text-gray-400 text-sm mb-5 max-w-md mx-auto">
            Our team is here to help. Reach out via email, WhatsApp, or our contact form and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <span className="inline-block bg-gold-500 text-black font-bold rounded-xl px-6 py-3 text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors">
                Contact Us
              </span>
            </Link>
            <a href="https://wa.me/84967894448" target="_blank" rel="noopener noreferrer">
              <span className="inline-block border border-white/10 text-white font-bold rounded-xl px-6 py-3 text-xs uppercase tracking-wider hover:bg-white/5 transition-colors">
                WhatsApp Us
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
