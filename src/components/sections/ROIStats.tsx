"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp, LayoutGrid, Banknote } from "lucide-react";
import { useInView, useCountUp } from "../../lib/hooks";

const stats = [
  { icon: Clock, value: 8, suffix: "+", label: "Hours saved per week", color: "bg-indigo-50 text-indigo-600" },
  { icon: TrendingUp, value: 35, suffix: "%", label: "Faster follow-up", color: "bg-violet-50 text-violet-600" },
  { icon: LayoutGrid, value: 1, suffix: "", label: "Unified workspace", color: "bg-emerald-50 text-emerald-600" },
  { icon: Banknote, value: 48, suffix: "K", prefix: "R ", label: "Avg. monthly revenue boost", color: "bg-amber-50 text-amber-600" },
];

function StatCard({ icon: Icon, value, suffix, prefix, label, color }: { icon: any; value: number; suffix: string; prefix?: string; label: string; color: string }) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <div ref={ref} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
        <Icon size={24} />
      </div>
      <p className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-1">
        {prefix || ""}{count}{suffix}
      </p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  );
}

export default function ROIStats() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="roi" ref={ref} className="py-20 sm:py-28 bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">The Impact</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-gray-900">
            Results that speak for themselves
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <StatCard {...s} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
