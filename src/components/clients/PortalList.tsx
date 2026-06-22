"use client";

import { useState } from "react";
import { Clock, Plus, Trash2, Copy, Check, X, Eye, EyeOff } from "lucide-react";

interface Portal { id: string; client: string; token: string; lastAccessed: string; access: { invoices: boolean; projects: boolean; documents: boolean }; url: string; }

const initialPortals: Portal[] = [
  { id: "1", client: "TechCorp", token: "abc123def456", lastAccessed: "2 hours ago", access: { invoices: true, projects: true, documents: false }, url: "" },
  { id: "2", client: "GreenEnergy", token: "ghi789jkl012", lastAccessed: "1 day ago", access: { invoices: true, projects: false, documents: false }, url: "" },
  { id: "3", client: "BuildRight", token: "mno345pqr678", lastAccessed: "Never", access: { invoices: true, projects: true, documents: true }, url: "" },
];

export default function PortalList() {
  const [portals, setPortals] = useState<Portal[]>(initialPortals);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ client: "", access: { invoices: true, projects: false, documents: false } });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showTokens, setShowTokens] = useState<Record<string, boolean>>({});

  const generateToken = () => Array.from({ length: 12 }, () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]).join("");

  const createPortal = () => {
    if (!form.client) return;
    const token = generateToken();
    setPortals(prev => [...prev, {
      id: String(Date.now()), client: form.client, token, lastAccessed: "Never",
      access: form.access, url: `/portal?token=${token}`,
    }]);
    setShowModal(false);
    setForm({ client: "", access: { invoices: true, projects: false, documents: false } });
  };

  const deletePortal = (id: string) => setPortals(prev => prev.filter(p => p.id !== id));

  const copyLink = (portal: Portal) => {
    const base = window.location.origin;
    const url = `${base}/portal?token=${portal.token}`;
    navigator.clipboard.writeText(url);
    setCopiedId(portal.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleAccess = (portalId: string, key: "invoices" | "projects" | "documents") => {
    setPortals(prev => prev.map(p => p.id === portalId ? { ...p, access: { ...p.access, [key]: !p.access[key] } } : p));
  };

  const toggleToken = (id: string) => setShowTokens(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">Client Portals</h2>
        <button onClick={() => setShowModal(true)} className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
          <Plus size={18} /> Generate Link
        </button>
      </div>

      <div className="space-y-4">
        {portals.map((portal) => (
          <div key={portal.id} className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center font-bold text-sm">{portal.client[0]}</div>
                <div>
                  <p className="font-medium text-gray-900">{portal.client}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} /> Last accessed: {portal.lastAccessed}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono">
                      {showTokens[portal.id] ? portal.token : "••••••••••••"}
                    </code>
                    <button onClick={() => toggleToken(portal.id)} className="text-gray-400 hover:text-gray-600">{showTokens[portal.id] ? <EyeOff size={12} /> : <Eye size={12} />}</button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a href={`/portal?token=${portal.token}`} target="_blank" className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors" title="Open portal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
                <button onClick={() => toggleAccess(portal.id, "invoices")} className={`text-xs px-2 py-1 rounded-full transition-colors ${portal.access.invoices ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>Invoices</button>
                <button onClick={() => toggleAccess(portal.id, "projects")} className={`text-xs px-2 py-1 rounded-full transition-colors ${portal.access.projects ? "bg-sky-50 text-sky-600" : "bg-gray-100 text-gray-400"}`}>Projects</button>
                <button onClick={() => toggleAccess(portal.id, "documents")} className={`text-xs px-2 py-1 rounded-full transition-colors ${portal.access.documents ? "bg-violet-50 text-violet-600" : "bg-gray-100 text-gray-400"}`}>Documents</button>
                <button onClick={() => copyLink(portal)} className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors" title="Copy link">
                  {copiedId === portal.id ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
                <button onClick={() => deletePortal(portal.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Generate Portal Link</h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label><input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" placeholder="Client name" /></div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Portal Access</label>
                <div className="space-y-2">
                  {(["invoices", "projects", "documents"] as const).map((key) => (
                    <label key={key} className="flex items-center gap-3">
                      <input type="checkbox" checked={form.access[key]} onChange={(e) => setForm({ ...form, access: { ...form.access, [key]: e.target.checked } })} className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-200" />
                      <span className="text-sm text-gray-700 capitalize">{key}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={createPortal} className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium">Generate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
