"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, TrendingUp, Clock, Users, FileText, FolderKanban, Globe } from "lucide-react";
import { useInView } from "../../lib/hooks";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" } }),
};

const benefits = [
  { icon: Users, label: "CRM Pipeline", color: "bg-indigo-50 text-indigo-600" },
  { icon: FileText, label: "Smart Invoicing", color: "bg-violet-50 text-violet-600" },
  { icon: FolderKanban, label: "Project Tracking", color: "bg-emerald-50 text-emerald-600" },
  { icon: Globe, label: "Client Portals", color: "bg-cyan-50 text-cyan-600" },
];

export default function Hero() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section ref={ref} className="relative pt-32 pb-20 overflow-hidden">
      {/* Background glow shapes */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-glow" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl animate-glow" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] leading-tight mb-6"
          >
            One Workspace to
            <br />
            Run Your <span className="gradient-text">Entire Business</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Stop juggling spreadsheets, WhatsApp, and random apps. BOSS gives you CRM, invoicing,
            projects, and client portals — all in one place.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a href="/signup" className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-200 flex items-center gap-2">
              Start Free Trial — It&apos;s Free <ArrowRight size={18} />
            </a>
            <a href="/demo" className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2">
              <Play size={18} /> Watch Demo
            </a>
          </motion.div>
        </div>

        {/* Main dashboard image */}
        <motion.div
          custom={4}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="relative max-w-5xl mx-auto"
        >
          <div className="animate-float">
            <img
              src="/images/Image1.png"
              alt="BOSS Dashboard"
              className="w-full rounded-2xl shadow-2xl border border-gray-100"
            />
          </div>

          {/* Floating metric cards */}
          <div className="absolute -top-4 -left-4 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-3 flex items-center gap-3 animate-float" style={{ animationDelay: "1s" }}>
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">R 48,900</p>
              <p className="text-xs text-gray-500">Monthly revenue</p>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-4 sm:bottom-4 sm:right-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-3 flex items-center gap-3 animate-float" style={{ animationDelay: "3s" }}>
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">8+ hrs saved</p>
              <p className="text-xs text-gray-500">Per week</p>
            </div>
          </div>
        </motion.div>

        {/* 4 mini benefit cards */}
        <motion.div
          custom={5}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
        >
          {benefits.map((b) => (
            <div key={b.label} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${b.color}`}>
                <b.icon size={20} />
              </div>
              <span className="text-sm font-medium text-gray-700">{b.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
