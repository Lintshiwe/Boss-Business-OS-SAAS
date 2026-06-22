"use client";

import { motion } from "framer-motion";
import { Users, FolderKanban, FileText, Globe, BarChart3, Zap } from "lucide-react";
import { useInView } from "../../lib/hooks";

const features = [
  { icon: Users, title: "CRM Pipeline", desc: "Track every lead from first contact to closed deal. Never lose a prospect again.", color: "bg-sky-50 text-sky-600" },
  { icon: FolderKanban, title: "Project Management", desc: "Plan, track, and deliver projects on time. Kanban boards, timelines, and milestones.", color: "bg-gray-100 text-gray-600" },
  { icon: FileText, title: "Smart Invoicing", desc: "Create professional invoices in seconds. Track payments. Auto-reminders for overdue.", color: "bg-sky-50 text-sky-600" },
  { icon: Globe, title: "Client Portals", desc: "Give clients their own login. They can view projects, download invoices, and message you.", color: "bg-cyan-50 text-cyan-600" },
  { icon: BarChart3, title: "Analytics", desc: "Real-time dashboards showing revenue, pipeline health, and project progress.", color: "bg-gray-100 text-gray-600" },
  { icon: Zap, title: "Automation", desc: "Automate follow-ups, invoice reminders, and task assignments. Save hours every week.", color: "bg-rose-50 text-rose-600" },
];

export default function Features() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="features" ref={ref} className="py-20 sm:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-4">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Six powerful modules that work together seamlessly.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${f.color}`}>
                <f.icon size={24} />
              </div>
              <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
