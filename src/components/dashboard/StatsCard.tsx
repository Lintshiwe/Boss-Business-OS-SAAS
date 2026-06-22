"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: { value: number; isPositive: boolean };
  iconBg?: string;
}

export default function StatsCard({ icon: Icon, label, value, trend, iconBg = "bg-primary/10" }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconBg)}>
          <Icon size={24} className="text-primary" />
        </div>
        {trend && (
          <span className={cn(
            "text-sm font-medium px-2 py-1 rounded-lg",
            trend.isPositive ? "text-sky-600 bg-sky-50" : "text-gray-600 bg-gray-100"
          )}>
            {trend.isPositive ? "+" : ""}{trend.value}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-heading)]">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}
