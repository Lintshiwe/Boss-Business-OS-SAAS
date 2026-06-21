"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { useInView } from "../../lib/hooks";

const problems = [
  "WhatsApp for client chats",
  "Spreadsheets for invoicing",
  "Multiple apps for projects",
  "Email threads for everything",
  "No single source of truth",
];

const solutions = [
  "Centralized CRM pipeline",
  "Automated invoicing",
  "Project management",
  "Client self-service portals",
  "One dashboard for everything",
];

export default function ProblemSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section ref={ref} className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Why BOSS?</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-gray-900">
            Too many tools. Not enough clarity.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-red-50 border border-red-100 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-red-700 mb-6">The Old Way</h3>
            <ul className="space-y-4">
              {problems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-red-600">
                  <X size={18} className="shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-primary mb-6">The BOSS Way</h3>
            <ul className="space-y-4">
              {solutions.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check size={18} className="text-emerald-500 shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
