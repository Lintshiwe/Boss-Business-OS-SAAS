"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, ToggleLeft, ToggleRight, Clock, Trash2, X, Play, CheckCircle, AlertCircle } from "lucide-react";

interface Rule { id: string; name: string; trigger: string; isActive: boolean; lastTriggered: string; actions: string[]; runCount: number; }

const initialRules: Rule[] = [
  { id: "1", name: "New Lead Auto-Email", trigger: "new-lead", isActive: true, lastTriggered: "2 hours ago", actions: ["send-email", "move-stage"], runCount: 47 },
  { id: "2", name: "Overdue Invoice Reminder", trigger: "invoice-overdue", isActive: true, lastTriggered: "1 day ago", actions: ["send-email", "notify-admin"], runCount: 23 },
  { id: "3", name: "Task Completion Notify", trigger: "task-complete", isActive: false, lastTriggered: "Never", actions: ["notify-admin"], runCount: 0 },
  { id: "4", name: "New Project Setup", trigger: "project-created", isActive: true, lastTriggered: "3 days ago", actions: ["create-task", "notify-admin"], runCount: 12 },
  { id: "5", name: "Weekly Report", trigger: "schedule-weekly", isActive: true, lastTriggered: "5 days ago", actions: ["send-email", "generate-report"], runCount: 8 },
];

const triggerLabels: Record<string, string> = {
  "new-lead": "New Lead", "invoice-overdue": "Invoice Overdue", "task-complete": "Task Complete",
  "project-created": "Project Created", "schedule-weekly": "Weekly Schedule",
};

interface Toast { id: string; message: string; type: "success" | "error"; }

export default function RulesList() {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", trigger: "new-lead", actions: ["send-email"] });
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [runningRule, setRunningRule] = useState<string | null>(null);

  const addToast = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = String(Date.now());
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const toggleRule = (id: string) => setRules(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  const deleteRule = (id: string) => setRules(prev => prev.filter(r => r.id !== id));

  const testRun = (id: string) => {
    const rule = rules.find(r => r.id === id);
    if (!rule) return;

    if (!rule.isActive) {
      addToast(`"${rule.name}" is inactive. Enable it first.`, "error");
      return;
    }

    setRunningRule(id);

    setTimeout(() => {
      setRules(prev => prev.map(r => r.id === id ? { ...r, lastTriggered: "Just now", runCount: r.runCount + 1 } : r));
      const actionLabels = rule.actions.map(a => {
        const map: Record<string, string> = {
          "send-email": "Email sent", "move-stage": "Stage updated", "notify-admin": "Admin notified",
          "create-task": "Task created", "generate-report": "Report generated",
        };
        return map[a] || a;
      });
      addToast(`Test run complete: ${actionLabels.join(", ")}`);
      setRunningRule(null);
    }, 1200);
  };

  const createRule = () => {
    if (!form.name) return;
    setRules(prev => [...prev, {
      id: String(Date.now()), name: form.name, trigger: form.trigger, isActive: true,
      lastTriggered: "Never", actions: form.actions, runCount: 0,
    }]);
    setShowModal(false);
    setForm({ name: "", trigger: "new-lead", actions: ["send-email"] });
  };

  const toggleAction = (action: string) => {
    setForm(prev => ({
      ...prev,
      actions: prev.actions.includes(action) ? prev.actions.filter(a => a !== action) : [...prev.actions, action],
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">Automation Rules</h2>
        <button onClick={() => setShowModal(true)} className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
          <Plus size={18} /> New Rule
        </button>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${rule.isActive ? "bg-sky-100 text-sky-600" : "bg-gray-100 text-gray-400"}`}>
                {rule.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
              </div>
              <div>
                <p className="font-medium text-gray-900">{rule.name}</p>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">{triggerLabels[rule.trigger]}</span>
                  <span className="flex items-center gap-1"><Clock size={14} />{rule.lastTriggered}</span>
                  <span className="text-xs text-sky-500">{rule.runCount} runs</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {rule.actions.map((action) => (
                  <span key={action} className="text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full">{action}</span>
                ))}
              </div>
              <button onClick={() => testRun(rule.id)} disabled={runningRule === rule.id} className={`p-2 rounded-lg transition-colors ${runningRule === rule.id ? "text-sky-500 bg-sky-50 animate-pulse" : "text-gray-400 hover:text-sky-600 hover:bg-sky-50"}`} title="Test run">
                {runningRule === rule.id ? (
                  <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                ) : (
                  <Play size={14} />
                )}
              </button>
              <button onClick={() => toggleRule(rule.id)} className={`relative w-12 h-6 rounded-full transition-colors ${rule.isActive ? "bg-sky-500" : "bg-gray-300"}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${rule.isActive ? "translate-x-6" : ""}`} />
              </button>
              <button onClick={() => deleteRule(rule.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">New Automation Rule</h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Rule Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" placeholder="e.g. Follow up on new leads" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Trigger</label><select value={form.trigger} onChange={(e) => setForm({ ...form, trigger: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200">
                {Object.entries(triggerLabels).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
              </select></div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
                <div className="flex flex-wrap gap-2">
                  {["send-email", "move-stage", "notify-admin", "create-task", "generate-report"].map((action) => (
                    <button key={action} onClick={() => toggleAction(action)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${form.actions.includes(action) ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{action}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={createRule} className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium">Create Rule</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notifications */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3">
        {toasts.map((toast) => (
          <div key={toast.id} className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-sm font-medium text-white animate-[slideIn_0.3s_ease-out] ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}>
            {toast.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}
