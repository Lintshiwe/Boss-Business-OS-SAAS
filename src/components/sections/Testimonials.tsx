"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useInView } from "../../lib/hooks";
import ColorfulAvatar from "../ui/ColorfulAvatar";

const testimonials = [
  {
    quote: "BOSS replaced 5 different tools for me. I save at least 8 hours a week and I've never missed a follow-up.",
    name: "Thabo M.",
    role: "Freelance Developer, Johannesburg",
  },
  {
    quote: "The client portal alone is worth it. Clients love being able to check project status themselves.",
    name: "Sarah K.",
    role: "Marketing Consultant, Cape Town",
  },
  {
    quote: "We closed R 200K in new business in our first month using BOSS's pipeline.",
    name: "David N.",
    role: "Agency Founder, Durban",
  },
];

export default function Testimonials() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-gray-900">
            Loved by South African businesses
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="fill-gray-400 text-gray-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <ColorfulAvatar name={t.name} size="lg" ring />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
