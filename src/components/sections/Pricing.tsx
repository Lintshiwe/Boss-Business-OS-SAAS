"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useInView } from "../../lib/hooks";

const plans = [
  {
    name: "Solo",
    price: "R 299",
    period: "/mo",
    desc: "For freelancers and solopreneurs",
    features: ["1 user", "CRM Pipeline", "Basic invoicing", "5GB storage", "Email support"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Studio",
    price: "R 799",
    period: "/mo",
    desc: "For small teams and consultants",
    features: ["Up to 5 users", "Full CRM + Automation", "Smart invoicing", "Client portals", "50GB storage", "Priority support"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Business",
    price: "R 1,999",
    period: "/mo",
    desc: "For growing agencies and businesses",
    features: ["Unlimited users", "Everything in Studio", "Advanced analytics", "Custom integrations", "Unlimited storage", "Dedicated support"],
    cta: "Start Free Trial",
    popular: false,
  },
];

export default function Pricing() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="pricing" ref={ref} className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-500 text-lg">No hidden fees. Cancel anytime. All plans include a 14-day free trial.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`bg-white border rounded-2xl p-8 ${
                plan.popular
                  ? "border-primary shadow-xl scale-105 relative z-10"
                  : "border-gray-100 shadow-sm"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-gray-900">{plan.name}</h3>
              <p className="text-gray-500 text-sm mb-6">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold font-[family-name:var(--font-heading)] text-gray-900">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <a
                href="/maintenance"
                className={`block w-full py-3 rounded-xl font-semibold transition-all mb-8 text-center ${
                  plan.popular
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "border border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                {plan.cta}
              </a>
              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <Check size={16} className="text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
