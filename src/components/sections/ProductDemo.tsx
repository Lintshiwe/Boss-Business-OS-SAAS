"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../../lib/hooks";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const tabs = [
  { id: 0, label: "Dashboard", image: "/images/Image1.png", caption: "Your command center — see everything at a glance" },
  { id: 1, label: "CRM Pipeline", image: "/images/Image2.png", caption: "Drag-and-drop pipeline management" },
  { id: 2, label: "Invoicing", image: "/images/Image3.png", caption: "Professional invoicing in seconds" },
  { id: 3, label: "Projects", image: "/images/Image4.png", caption: "Track every project and deadline" },
  { id: 4, label: "Client Portal", image: "/images/Image5.png", caption: "Clients love the self-service portal" },
];

export default function ProductDemo() {
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const { ref, isInView } = useInView(0.1);

  const next = useCallback(() => setActive(prev => (prev + 1) % tabs.length), []);
  const prev = useCallback(() => setActive(prev => (prev - 1 + tabs.length) % tabs.length), []);

  // Auto-advance
  useEffect(() => {
    if (!autoPlay || !isInView) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { next(); return 0; }
        return prev + 2; // 50ms * 50 = 2.5s per slide
      });
    }, 50);
    return () => clearInterval(interval);
  }, [autoPlay, isInView, next]);

  // Reset progress when active changes manually
  useEffect(() => { setProgress(0); }, [active]);

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
          {/* Tabs with progress */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActive(tab.id); setAutoPlay(false); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative overflow-hidden ${
                  active === tab.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {active === tab.id && autoPlay && (
                  <div className="absolute bottom-0 left-0 h-0.5 bg-white/50 transition-all duration-75" style={{ width: `${progress}%` }} />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Image carousel */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 group">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={tabs[active].image}
                alt={tabs[active].label}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              />
            </AnimatePresence>

            {/* Navigation arrows */}
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={20} />
            </button>

            {/* Play/Pause */}
            <button onClick={() => setAutoPlay(!autoPlay)} className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-white shadow-md">
              {autoPlay ? <Pause size={14} /> : <Play size={14} />}
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {tabs.map((_, i) => (
                <button key={i} onClick={() => { setActive(i); setAutoPlay(false); }} className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-white w-6" : "bg-white/50 hover:bg-white/75"}`} />
              ))}
            </div>
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
