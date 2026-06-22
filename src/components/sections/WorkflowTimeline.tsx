"use client";

import { motion } from "framer-motion";
import { UserPlus, Target, Send, Handshake, Rocket, Banknote } from "lucide-react";
import { useInView } from "../../lib/hooks";

const steps = [
  { icon: UserPlus, title: "Capture Lead", desc: "Import contacts or add from website" },
  { icon: Target, title: "Qualify & Score", desc: "BOSS scores and prioritizes leads" },
  { icon: Send, title: "Send Proposal", desc: "Generate professional proposals" },
  { icon: Handshake, title: "Close the Deal", desc: "Track negotiations and win" },
  { icon: Rocket, title: "Deliver Project", desc: "Manage tasks and milestones" },
  { icon: Banknote, title: "Get Paid", desc: "Invoice and collect payment", badge: "R 48,900" },
];

export default function WorkflowTimeline() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="workflow" ref={ref} className="py-20 sm:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-gray-900">
            From lead to payment in 6 steps
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-sky-200 -translate-x-1/2 hidden sm:block" />
          <div className="absolute left-5 top-0 bottom-0 w-px bg-sky-200 sm:hidden" />

          <div className="space-y-12">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className={`relative flex items-start gap-6 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} sm:flex-row`}
                >
                  {/* Number circle */}
                  <div className="relative z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-md">
                    {i + 1}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 sm:text-left ${isLeft ? "md:text-right" : "md:text-left"} bg-white border border-gray-100 rounded-xl p-6 shadow-sm`}>
                    <div className={`flex items-center gap-3 mb-2 ${isLeft ? "md:justify-end" : "md:justify-start"} sm:justify-start`}>
                      <step.icon size={20} className="text-primary" />
                      <h3 className="font-bold font-[family-name:var(--font-heading)] text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm">{step.desc}</p>
                    {step.badge && (
                      <span className="inline-block mt-2 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                        {step.badge}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
