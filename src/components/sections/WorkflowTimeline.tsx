"use client";

import { useRef } from "react";
import { motion, useInView as useFramerInView } from "framer-motion";
import { UserPlus, Target, Send, Handshake, Rocket, Banknote } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Capture Lead", desc: "Import contacts or add from website" },
  { icon: Target, title: "Qualify & Score", desc: "BOSS scores and prioritizes leads" },
  { icon: Send, title: "Send Proposal", desc: "Generate professional proposals" },
  { icon: Handshake, title: "Close the Deal", desc: "Track negotiations and win" },
  { icon: Rocket, title: "Deliver Project", desc: "Manage tasks and milestones" },
  { icon: Banknote, title: "Get Paid", desc: "Invoice and collect payment", badge: "R 48,900" },
];

function StepCard({ step, index, isLeft }: { step: typeof steps[0]; index: number; isLeft: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(ref, { once: false, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0.3, x: isLeft ? -50 : 50, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileInView={{ scale: isInView ? 1.05 : 0.95 }}
      className={`relative flex items-start gap-6 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} sm:flex-row`}
    >
      {/* Number circle */}
      <motion.div
        animate={isInView ? { scale: [1, 1.3, 1], boxShadow: ["0 0 0 0 rgba(14,165,233,0)", "0 0 0 12px rgba(14,165,233,0.15)", "0 0 0 0 rgba(14,165,233,0)"] } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-md"
      >
        {index + 1}
      </motion.div>

      {/* Content card */}
      <motion.div
        animate={isInView ? { scale: 1, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" } : { scale: 0.95, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        transition={{ duration: 0.4 }}
        className={`flex-1 sm:text-left ${isLeft ? "md:text-right" : "md:text-left"} bg-white border rounded-xl p-6 transition-colors duration-300 ${isInView ? "border-sky-200" : "border-gray-100"}`}
      >
        <div className={`flex items-center gap-3 mb-2 ${isLeft ? "md:justify-end" : "md:justify-start"} sm:justify-start`}>
          <motion.div animate={isInView ? { rotate: [0, -10, 10, 0] } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
            <step.icon size={22} className={isInView ? "text-primary" : "text-gray-300"} />
          </motion.div>
          <h3 className={`font-bold font-[family-name:var(--font-heading)] transition-colors ${isInView ? "text-gray-900" : "text-gray-400"}`}>{step.title}</h3>
        </div>
        <p className={`text-sm transition-colors ${isInView ? "text-gray-600" : "text-gray-400"}`}>{step.desc}</p>
        {step.badge && (
          <motion.span
            animate={isInView ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-block mt-3 bg-emerald-100 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full"
          >
            {step.badge}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function WorkflowTimeline() {
  const { ref, isInView } = (function() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useFramerInView(ref, { once: true, amount: 0.1 });
    return { ref, isInView };
  })();

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
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-sky-200 -translate-x-1/2 hidden sm:block" />
          <div className="absolute left-6 top-0 bottom-0 w-px bg-sky-200 sm:hidden" />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <StepCard key={step.title} step={step} index={i} isLeft={i % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
