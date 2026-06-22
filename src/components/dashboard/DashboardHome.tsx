"use client";

import { DollarSign, FolderKanban, FileText, Users, Plus, Calendar, ArrowRight, Clock, TrendingUp } from "lucide-react";
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

const quickActions = [
  { icon: Plus, label: "New Contact", href: "/app/crm", color: "bg-sky-50 text-sky-600" },
  { icon: FileText, label: "Create Invoice", href: "/app/invoices", color: "bg-emerald-50 text-emerald-600" },
  { icon: FolderKanban, label: "New Project", href: "/app/projects", color: "bg-amber-50 text-amber-600" },
  { icon: Users, label: "Add Client", href: "/app/clients", color: "bg-violet-50 text-violet-600" },
];

const recentActivity = [
  { id: "1", action: "Invoice paid", detail: "TechCorp — R 48,900", time: "2 min ago", color: "bg-emerald-100 text-emerald-600" },
  { id: "2", action: "Project updated", detail: "GreenEnergy App — 40% complete", time: "1 hour ago", color: "bg-sky-100 text-sky-600" },
  { id: "3", action: "New lead", detail: "Lisa van der Berg — FreshFoods", time: "3 hours ago", color: "bg-violet-100 text-violet-600" },
  { id: "4", action: "Task completed", detail: "Brand guidelines — FreshFoods", time: "5 hours ago", color: "bg-amber-100 text-amber-600" },
];

const upcomingDeadlines = [
  { id: "1", task: "TechCorp Phase 3 delivery", project: "TechCorp Redesign", due: "Jul 15", daysLeft: 23 },
  { id: "2", task: "GreenEnergy beta launch", project: "GreenEnergy App", due: "Aug 30", daysLeft: 69 },
  { id: "3", task: "Invoice INV-002 payment", project: "GreenEnergy", due: "Jun 30", daysLeft: 8 },
];

const topProjects = [
  { id: "1", name: "TechCorp Redesign", progress: 65, revenue: 48900 },
  { id: "2", name: "GreenEnergy App", progress: 40, revenue: 36400 },
  { id: "3", name: "BuildRight CRM", progress: 10, revenue: 62000 },
];

export default function DashboardHome() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, Thabo</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard icon={DollarSign} label="Total Revenue" value="R 248,500" trend={{ value: 12, isPositive: true }} iconBg="bg-emerald-50" />
        <StatsCard icon={FolderKanban} label="Active Projects" value="8" trend={{ value: 3, isPositive: true }} iconBg="bg-sky-50" />
        <StatsCard icon={FileText} label="Pending Invoices" value="R 42,300" trend={{ value: 5, isPositive: false }} iconBg="bg-amber-50" />
        <StatsCard icon={Users} label="New Leads" value="24" trend={{ value: 18, isPositive: true }} iconBg="bg-violet-50" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3 hover:shadow-md hover:border-sky-200 transition-all group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}>
              <action.icon size={20} />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-sky-600 transition-colors">{action.label}</span>
          </a>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp size={12} /> +12%
            </span>
          </div>
          <Chart type="line" data={revenueData} />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pipeline</h3>
            <span className="text-xs text-gray-500">35 deals total</span>
          </div>
          <Chart type="bar" data={pipelineData} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-xs text-sky-500 hover:text-sky-600">View all</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <Clock size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{item.action}</p>
                  <p className="text-xs text-gray-500 truncate">{item.detail}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Deadlines</h3>
            <Calendar size={18} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.task}</p>
                  <p className="text-xs text-gray-500">{item.project}</p>
                </div>
                <div className="text-right ml-3">
                  <p className="text-sm font-medium text-gray-900">{item.due}</p>
                  <p className={`text-xs ${item.daysLeft <= 14 ? "text-amber-600" : "text-gray-500"}`}>{item.daysLeft}d left</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Projects */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Projects</h3>
            <a href="/app/projects" className="text-xs text-sky-500 hover:text-sky-600 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </a>
          </div>
          <div className="space-y-4">
            {topProjects.map((project) => (
              <div key={project.id} className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">{project.name}</p>
                  <span className="text-sm font-semibold text-sky-600">R {project.revenue.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: `${project.progress}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">{project.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
