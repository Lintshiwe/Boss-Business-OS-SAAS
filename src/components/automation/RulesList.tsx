"use client";

import { Plus, ToggleLeft, ToggleRight, Clock } from "lucide-react";
import { useState } from "react";

const rules = [
  { id: "1", name: "New Lead Auto-Email", trigger: "new-lead", isActive: true, lastTriggered: "2 hours ago", actions: ["send-email", "move-stage"] },
  { id: "2", name: "Overdue Invoice Reminder", trigger: "invoice-overdue", isActive: true, lastTriggered: "1 day ago", actions: ["send-email", "notify-admin"] },
  { id: "3", name: "Task Completion Notify", trigger: "task-complete", isActive: false, lastTriggered: "Never", actions: ["notify-admin"] },
  { id: "4", name: "New Project Setup", trigger: "project-created", isActive: true, lastTriggered: "3 days ago", actions: ["create-task", "notify-admin"] },
];

const triggerLabels: Record<string, string> = {
  "new-lead": "New Lead",
  "invoice-overdue": "Invoice Overdue",
  "task-complete": "Task Complete",
  "project-created": "Project Created",
};

export default function RulesList() {
  const [localRules, setLocalRules] = useState(rules);

  const toggleRule = (id: string) => {
    setLocalRules(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">Automation Rules</h2>
        <button className="bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
          <Plus size={18} /> New Rule
        </button>
      </div>

      <div className="space-y-4">
        {localRules.map((rule) => (
          <div key={rule.id} className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                {rule.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
              </div>
              <div>
                <p className="font-medium text-gray-900">{rule.name}</p>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">{triggerLabels[rule.trigger]}</span>
                  <span className="flex items-center gap-1"><Clock size={14} />{rule.lastTriggered}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {rule.actions.map((action) => (
                  <span key={action} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{action}</span>
                ))}
              </div>
              <button
                onClick={() => toggleRule(rule.id)}
                className={`relative w-12 h-6 rounded-full transition-colors ${rule.isActive ? "bg-primary" : "bg-gray-300"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${rule.isActive ? "translate-x-6" : ""}`} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
