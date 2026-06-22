"use client";

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

const clientRevenue = [
  { name: "TechCorp", value: 48900 },
  { name: "BuildRight", value: 62000 },
  { name: "GreenEnergy", value: 36400 },
  { name: "Digital Mktg", value: 19750 },
  { name: "FreshFoods", value: 12500 },
];

const pipelineFunnel = [
  { name: "New Leads", value: 12 },
  { name: "Contacted", value: 8 },
  { name: "Qualified", value: 5 },
  { name: "Proposal", value: 3 },
  { name: "Won", value: 7 },
];

const topMetrics = [
  { label: "Conversion Rate", value: "24%", change: 3.2, isPositive: true },
  { label: "Avg Deal Size", value: "R 38,400", change: 8.1, isPositive: true },
  { label: "Avg Close Time", value: "18 days", change: 2.5, isPositive: false },
  { label: "Client Retention", value: "92%", change: 1.8, isPositive: true },
];

export default function AnalyticsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">Analytics</h2>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm font-medium bg-sky-50 text-sky-600 rounded-xl">This Month</button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-xl">This Quarter</button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-xl">This Year</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard icon={DollarSign} label="Total Revenue" value="R 248,500" trend={{ value: 12, isPositive: true }} iconBg="bg-emerald-50" />
        <StatsCard icon={Users} label="Total Clients" value="12" trend={{ value: 8, isPositive: true }} iconBg="bg-sky-50" />
        <StatsCard icon={FileText} label="Invoices Sent" value="28" trend={{ value: 15, isPositive: true }} iconBg="bg-amber-50" />
        <StatsCard icon={TrendingUp} label="Growth Rate" value="18%" trend={{ value: 3, isPositive: true }} iconBg="bg-violet-50" />
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {topMetrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500 mb-1">{metric.label}</p>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold text-gray-900">{metric.value}</p>
              <span className={`text-xs font-medium flex items-center gap-0.5 mb-0.5 ${metric.isPositive ? "text-emerald-600" : "text-red-500"}`}>
                {metric.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
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
          <Chart type="line" data={monthlyRevenue} />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Client</h3>
          <Chart type="bar" data={clientRevenue} color="#38bdf8" />
        </div>
      </div>

      {/* Pipeline Funnel + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Funnel</h3>
          <div className="space-y-3">
            {pipelineFunnel.map((stage, i) => {
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Breakdown</h3>
          <div className="space-y-4">
            {monthlyRevenue.slice().reverse().map((month) => (
              <div key={month.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">{month.name} 2026</span>
                <span className="text-sm font-semibold text-gray-900">R {month.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
