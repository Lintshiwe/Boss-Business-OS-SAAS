"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useInView } from "../../lib/hooks";

export default function FinalCTA() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section ref={ref} className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-primary to-secondary rounded-3xl p-12 sm:p-16 text-center overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full" />
            <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-white mb-6">
              Stop managing from
              <br />
              scattered tabs
            </h2>
            <p className="text-sky-100 text-lg max-w-xl mx-auto mb-10">
              Join hundreds of South African businesses running smoother with BOSS.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/signup" className="bg-white text-primary font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                Start Free Trial <ArrowRight size={18} />
              </a>
              <a href="/signup" className="border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                <MessageSquare size={18} /> Talk to Sales
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
