"use client";

import { Plus, MoreHorizontal, Calendar, DollarSign, Users } from "lucide-react";

const projects = [
  { id: "1", name: "TechCorp Website Redesign", status: "active", budget: 48900, progress: 65, members: 3, dueDate: "2026-07-15" },
  { id: "2", name: "GreenEnergy Mobile App", status: "active", budget: 36400, progress: 40, members: 4, dueDate: "2026-08-30" },
  { id: "3", name: "FreshFoods Brand Identity", status: "completed", budget: 12500, progress: 100, members: 2, dueDate: "2026-06-01" },
  { id: "4", name: "BuildRight CRM Setup", status: "planning", budget: 62000, progress: 10, members: 1, dueDate: "2026-09-15" },
];

const statusStyles: Record<string, string> = {
  planning: "bg-amber-50 text-amber-600",
  active: "bg-blue-50 text-blue-600",
  completed: "bg-emerald-50 text-emerald-600",
  "on-hold": "bg-gray-100 text-gray-600",
};

export default function ProjectsGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">Projects</h2>
        <button className="bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
          <Plus size={18} /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full mt-2 inline-block ${statusStyles[project.status]}`}>
                  {project.status}
                </span>
              </div>
              <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"><MoreHorizontal size={16} /></button>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }} />
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><DollarSign size={14} />R {project.budget.toLocaleString()}</span>
              <span className="flex items-center gap-1"><Users size={14} />{project.members}</span>
              <span className="flex items-center gap-1"><Calendar size={14} />{project.dueDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
