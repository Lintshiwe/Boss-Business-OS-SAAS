"use client";

import { motion } from "framer-motion";
import { CreditCard, Receipt, Headphones, Shield } from "lucide-react";
import { useInView } from "../../lib/hooks";

const items = [
  { icon: CreditCard, label: "Rand-based invoicing" },
  { icon: Receipt, label: "SA VAT ready" },
  { icon: Headphones, label: "Local support" },
  { icon: Shield, label: "Secure data hosting in SA" },
];

export default function TrustedStrip() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section ref={ref} className="border-y border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">
          Trusted by South African businesses
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center justify-center gap-3"
            >
              <item.icon size={20} className="text-primary shrink-0" />
              <span className="text-sm font-medium text-gray-600">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
