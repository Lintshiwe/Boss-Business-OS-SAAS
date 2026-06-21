"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../../lib/hooks";

const tabs = [
  { id: 0, label: "Dashboard", image: "/images/Image1.png", caption: "Your command center — see everything at a glance" },
  { id: 1, label: "CRM Pipeline", image: "/images/Image2.png", caption: "Drag-and-drop pipeline management" },
  { id: 2, label: "Invoicing", image: "/images/Image3.png", caption: "Professional invoicing in seconds" },
  { id: 3, label: "Projects", image: "/images/Image4.png", caption: "Track every project and deadline" },
  { id: 4, label: "Client Portal", image: "/images/Image5.png", caption: "Clients love the self-service portal" },
];

export default function ProductDemo() {
  const [active, setActive] = useState(0);
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="demo" ref={ref} className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">See it in action</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-gray-900">
            A glimpse inside BOSS
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  active === tab.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={tabs[active].image}
                alt={tabs[active].label}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              />
            </AnimatePresence>
          </div>

          {/* Caption */}
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center text-gray-500 mt-6 text-lg"
            >
              {tabs[active].caption}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
