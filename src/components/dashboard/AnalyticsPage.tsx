"use client";

import { useState } from "react";
import { DollarSign, Users, FileText, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import StatsCard from "./StatsCard";
import Chart from "./Chart";

const monthlyRevenue = [
  { name: "Jan", value: 32000 },
  { name: "Feb", value: 38000 },
  { name: "Mar", value: 35000 },
  { name: "Apr", value: 42000 },
  { name: "May", value: 48900 },
  { name: "Jun", value: 51000 },
];

const quarterlyRevenue = [
  { name: "Q1 2026", value: 105000 },
  { name: "Q2 2026", value: 141900 },
];

const yearlyRevenue = [
  { name: "2024", value: 280000 },
  { name: "2025", value: 410000 },
  { name: "2026", value: 246900 },
];

const clientRevenue = [
  { name: "TechCorp", value: 48900 },
  { name: "BuildRight", value: 62000 },
  { name: "GreenEnergy", value: 36400 },
  { name: "Digital Mktg", value: 19750 },
  { name: "FreshFoods", value: 12500 },
];

const clientRevenueQ = [
  { name: "TechCorp", value: 28900 },
  { name: "BuildRight", value: 42000 },
  { name: "GreenEnergy", value: 26400 },
  { name: "Digital Mktg", value: 14750 },
  { name: "FreshFoods", value: 9500 },
];

const clientRevenueY = [
  { name: "TechCorp", value: 148900 },
  { name: "BuildRight", value: 162000 },
  { name: "GreenEnergy", value: 96400 },
  { name: "Digital Mktg", value: 59750 },
  { name: "FreshFoods", value: 42500 },
];

const pipelineFunnel = [
  { name: "New Leads", value: 12 },
  { name: "Contacted", value: 8 },
  { name: "Qualified", value: 5 },
  { name: "Proposal", value: 3 },
  { name: "Won", value: 7 },
];

type Period = "month" | "quarter" | "year";

const periodData: Record<Period, { stats: { label: string; value: string; change: number; positive: boolean; icon: typeof DollarSign; bg: string }[]; revenue: { name: string; value: number }[]; clients: { name: string; value: number }[]; topMetrics: { label: string; value: string; change: number; positive: boolean }[] }> = {
  month: {
    stats: [
      { label: "Total Revenue", value: "R 248,500", change: 12, positive: true, icon: DollarSign, bg: "bg-emerald-50" },
      { label: "Total Clients", value: "12", change: 8, positive: true, icon: Users, bg: "bg-sky-50" },
      { label: "Invoices Sent", value: "28", change: 15, positive: true, icon: FileText, bg: "bg-amber-50" },
      { label: "Growth Rate", value: "18%", change: 3, positive: true, icon: TrendingUp, bg: "bg-violet-50" },
    ],
    revenue: monthlyRevenue,
    clients: clientRevenue,
    topMetrics: [
      { label: "Conversion Rate", value: "24%", change: 3.2, positive: true },
      { label: "Avg Deal Size", value: "R 38,400", change: 8.1, positive: true },
      { label: "Avg Close Time", value: "18 days", change: 2.5, positive: false },
      { label: "Client Retention", value: "92%", change: 1.8, positive: true },
    ],
  },
  quarter: {
    stats: [
      { label: "Total Revenue", value: "R 246,900", change: 18, positive: true, icon: DollarSign, bg: "bg-emerald-50" },
      { label: "Total Clients", value: "12", change: 12, positive: true, icon: Users, bg: "bg-sky-50" },
      { label: "Invoices Sent", value: "45", change: 22, positive: true, icon: FileText, bg: "bg-amber-50" },
      { label: "Growth Rate", value: "22%", change: 5, positive: true, icon: TrendingUp, bg: "bg-violet-50" },
    ],
    revenue: quarterlyRevenue,
    clients: clientRevenueQ,
    topMetrics: [
      { label: "Conversion Rate", value: "28%", change: 5.1, positive: true },
      { label: "Avg Deal Size", value: "R 42,100", change: 12.3, positive: true },
      { label: "Avg Close Time", value: "15 days", change: 4.2, positive: false },
      { label: "Client Retention", value: "94%", change: 2.1, positive: true },
    ],
  },
  year: {
    stats: [
      { label: "Total Revenue", value: "R 936,900", change: 28, positive: true, icon: DollarSign, bg: "bg-emerald-50" },
      { label: "Total Clients", value: "12", change: 20, positive: true, icon: Users, bg: "bg-sky-50" },
      { label: "Invoices Sent", value: "156", change: 35, positive: true, icon: FileText, bg: "bg-amber-50" },
      { label: "Growth Rate", value: "32%", change: 8, positive: true, icon: TrendingUp, bg: "bg-violet-50" },
    ],
    revenue: yearlyRevenue,
    clients: clientRevenueY,
    topMetrics: [
      { label: "Conversion Rate", value: "31%", change: 8.4, positive: true },
      { label: "Avg Deal Size", value: "R 45,800", change: 15.7, positive: true },
      { label: "Avg Close Time", value: "12 days", change: 6.8, positive: false },
      { label: "Client Retention", value: "95%", change: 3.2, positive: true },
    ],
  },
};

const monthlyBreakdown: Record<Period, { label: string; value: number }[]> = {
  month: [
    { label: "June 2026", value: 51000 },
    { label: "May 2026", value: 48900 },
    { label: "April 2026", value: 42000 },
    { label: "March 2026", value: 35000 },
    { label: "February 2026", value: 38000 },
    { label: "January 2026", value: 32000 },
  ],
  quarter: [
    { label: "Q2 2026", value: 141900 },
    { label: "Q1 2026", value: 105000 },
  ],
  year: [
    { label: "2026 (YTD)", value: 246900 },
    { label: "2025", value: 410000 },
    { label: "2024", value: 280000 },
  ],
};

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("month");
  const data = periodData[period];

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">Analytics</h2>
        <div className="flex items-center gap-2">
          {([
            { key: "month", label: "This Month" },
            { key: "quarter", label: "This Quarter" },
            { key: "year", label: "This Year" },
          ] as const).map((p) => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${period === p.key ? "bg-sky-50 text-sky-600" : "text-gray-500 hover:bg-gray-100"}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {data.stats.map((s) => (
          <StatsCard key={s.label} icon={s.icon} label={s.label} value={s.value} trend={{ value: s.change, isPositive: s.positive }} iconBg={s.bg} />
        ))}
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {data.topMetrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500 mb-1">{metric.label}</p>
            <div className="flex items-end gap-2">
              <p className="text-lg sm:text-xl font-bold text-gray-900">{metric.value}</p>
              <span className={`text-xs font-medium flex items-center gap-0.5 mb-0.5 ${metric.positive ? "text-emerald-600" : "text-red-500"}`}>
                {metric.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {metric.change}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Over Time</h3>
          <Chart type="line" data={data.revenue} />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Client</h3>
          <Chart type="bar" data={data.clients} color="#38bdf8" />
        </div>
      </div>

      {/* Pipeline Funnel + Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Funnel</h3>
          <div className="space-y-3">
            {pipelineFunnel.map((stage) => {
              const maxVal = pipelineFunnel[0].value;
              const width = (stage.value / maxVal) * 100;
              return (
                <div key={stage.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">{stage.name}</span>
                    <span className="font-medium text-gray-900">{stage.value}</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-500 rounded-full transition-all duration-500"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {period === "month" ? "Monthly" : period === "quarter" ? "Quarterly" : "Yearly"} Breakdown
          </h3>
          <div className="space-y-4">
            {monthlyBreakdown[period].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <span className="text-sm font-semibold text-gray-900">R {item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
