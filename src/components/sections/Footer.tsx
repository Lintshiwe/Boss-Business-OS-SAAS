"use client";

import { motion } from "framer-motion";
import { useInView } from "../../lib/hooks";

const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "API Docs"],
  },
  {
    title: "Company",
    links: ["About Us", "Blog", "Careers", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

export default function Footer() {
  const { ref, isInView } = useInView(0.1);

  return (
    <footer ref={ref} className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
        >
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl font-bold font-[family-name:var(--font-heading)] gradient-text">BOSS</span>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Business Operating System as a Service for South African businesses.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="/maintenance" className="text-gray-400 text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">&copy; 2026 BOSS. All rights reserved.</p>
          <p className="text-gray-500 text-sm">Made in South Africa</p>
        </div>
      </div>
    </footer>
  );
}
