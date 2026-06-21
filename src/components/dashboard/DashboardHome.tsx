"use client";

import { DollarSign, FolderKanban, FileText, Users } from "lucide-react";
import StatsCard from "./StatsCard";
import Chart from "./Chart";

const revenueData = [
  { name: "Jan", value: 32000 },
  { name: "Feb", value: 38000 },
  { name: "Mar", value: 35000 },
  { name: "Apr", value: 42000 },
  { name: "May", value: 48900 },
  { name: "Jun", value: 51000 },
];

const pipelineData = [
  { name: "New", value: 12 },
  { name: "Contacted", value: 8 },
  { name: "Qualified", value: 5 },
  { name: "Proposal", value: 3 },
  { name: "Won", value: 7 },
];

export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard icon={DollarSign} label="Total Revenue" value="R 248,500" trend={{ value: 12, isPositive: true }} iconBg="bg-emerald-50" />
        <StatsCard icon={FolderKanban} label="Active Projects" value="8" trend={{ value: 3, isPositive: true }} iconBg="bg-blue-50" />
        <StatsCard icon={FileText} label="Pending Invoices" value="R 42,300" trend={{ value: 5, isPositive: false }} iconBg="bg-amber-50" />
        <StatsCard icon={Users} label="New Leads" value="24" trend={{ value: 18, isPositive: true }} iconBg="bg-violet-50" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue</h3>
          <Chart type="line" data={revenueData} />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline</h3>
          <Chart type="bar" data={pipelineData} />
        </div>
      </div>
    </div>
  );
}
