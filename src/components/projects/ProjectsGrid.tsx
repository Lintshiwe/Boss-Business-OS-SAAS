"use client";

import { useState } from "react";
import { Plus, MoreHorizontal, Calendar, DollarSign, Users, Trash2, X, CheckCircle } from "lucide-react";

interface Project { id: string; name: string; status: string; budget: number; progress: number; members: number; dueDate: string; tasks: { title: string; done: boolean }[]; }

const initialProjects: Project[] = [
  { id: "1", name: "TechCorp Website Redesign", status: "active", budget: 48900, progress: 65, members: 3, dueDate: "2026-07-15", tasks: [{ title: "Wireframes", done: true }, { title: "UI Design", done: true }, { title: "Frontend Dev", done: false }, { title: "Backend Dev", done: false }, { title: "Testing", done: false }] },
  { id: "2", name: "GreenEnergy Mobile App", status: "active", budget: 36400, progress: 40, members: 4, dueDate: "2026-08-30", tasks: [{ title: "Requirements", done: true }, { title: "UI/UX Design", done: true }, { title: "iOS Dev", done: false }, { title: "Android Dev", done: false }] },
  { id: "3", name: "FreshFoods Brand Identity", status: "completed", budget: 12500, progress: 100, members: 2, dueDate: "2026-06-01", tasks: [{ title: "Logo Design", done: true }, { title: "Brand Guidelines", done: true }, { title: "Stationery", done: true }] },
  { id: "4", name: "BuildRight CRM Setup", status: "planning", budget: 62000, progress: 10, members: 1, dueDate: "2026-09-15", tasks: [{ title: "Requirements Gathering", done: true }, { title: "Setup", done: false }, { title: "Data Migration", done: false }, { title: "Training", done: false }] },
];

const statusStyles: Record<string, string> = {
  planning: "bg-amber-50 text-amber-600", active: "bg-sky-50 text-sky-600", completed: "bg-emerald-50 text-emerald-600", "on-hold": "bg-gray-100 text-gray-600",
};

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showModal, setShowModal] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", budget: 0, dueDate: "", members: 1 });

  const createProject = () => {
    if (!form.name) return;
    setProjects(prev => [...prev, {
      id: String(Date.now()), name: form.name, status: "planning", budget: form.budget, progress: 0,
      members: form.members, dueDate: form.dueDate, tasks: [],
    }]);
    setShowModal(false);
    setForm({ name: "", budget: 0, dueDate: "", members: 1 });
  };

  const deleteProject = (id: string) => setProjects(prev => prev.filter(p => p.id !== id));

  const toggleTask = (projectId: string, taskIndex: number) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      const tasks = [...p.tasks];
      tasks[taskIndex] = { ...tasks[taskIndex], done: !tasks[taskIndex].done };
      const progress = Math.round((tasks.filter(t => t.done).length / tasks.length) * 100);
      return { ...p, tasks, progress };
    }));
  };

  const addTask = (projectId: string, title: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return { ...p, tasks: [...p.tasks, { title, done: false }] };
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">Projects</h2>
        <button onClick={() => setShowModal(true)} className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
          <Plus size={18} /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full mt-2 inline-block ${statusStyles[project.status]}`}>{project.status}</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg">
                  {expandedProject === project.id ? <CheckCircle size={16} /> : <MoreHorizontal size={16} />}
                </button>
                <button onClick={() => deleteProject(project.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                <span>Progress</span><span>{project.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full transition-all duration-500" style={{ width: `${project.progress}%` }} />
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1"><DollarSign size={14} />R {project.budget.toLocaleString()}</span>
              <span className="flex items-center gap-1"><Users size={14} />{project.members}</span>
              <span className="flex items-center gap-1"><Calendar size={14} />{project.dueDate}</span>
            </div>

            {/* Tasks */}
            {expandedProject === project.id && (
              <div className="border-t border-gray-100 pt-4 mt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Tasks</p>
                <div className="space-y-2">
                  {project.tasks.map((task, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <button onClick={() => toggleTask(project.id, i)} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${task.done ? "bg-sky-500 border-sky-500 text-white" : "border-gray-300 hover:border-sky-400"}`}>
                        {task.done && <CheckCircle size={12} />}
                      </button>
                      <span className={`text-sm ${task.done ? "text-gray-400 line-through" : "text-gray-700"}`}>{task.title}</span>
                    </div>
                  ))}
                </div>
                <input onKeyDown={(e) => { if (e.key === "Enter" && e.currentTarget.value) { addTask(project.id, e.currentTarget.value); e.currentTarget.value = ""; } }} className="w-full mt-3 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm focus:outline-none focus:border-sky-400" placeholder="Add task and press Enter..." />
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">New Project</h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Budget (R)</label><input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label><input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Team Members</label><input type="number" value={form.members} onChange={(e) => setForm({ ...form, members: Number(e.target.value) })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" /></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={createProject} className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium">Create Project</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
