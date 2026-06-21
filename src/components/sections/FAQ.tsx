"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useInView } from "../../lib/hooks";

const faqs = [
  { q: "Is there a free trial?", a: "Yes! All plans come with a 14-day free trial. No credit card required." },
  { q: "Can I switch plans later?", a: "Absolutely. Upgrade or downgrade anytime. We'll prorate the difference." },
  { q: "Is my data secure?", a: "Yes. We use bank-grade encryption and all data is hosted in South Africa. Your data never leaves the country." },
  { q: "Do you offer training?", a: "Yes! We offer free onboarding sessions for all new customers, plus a knowledge base and video tutorials." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, EFT, and SnapScan. All invoicing is in South African Rand." },
  { q: "Can I cancel anytime?", a: "Yes, no lock-in contracts. Cancel anytime from your dashboard. Your data is exportable." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="faq" ref={ref} className="py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-gray-900">
            Frequently asked questions
          </h2>
        </motion.div>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="border-b border-gray-100"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-gray-400 shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-40 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
