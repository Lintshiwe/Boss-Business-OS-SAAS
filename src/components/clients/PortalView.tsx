"use client";

import { useState, useEffect } from "react";
import { FileText, FolderKanban, File, Download, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface PortalData {
  client: string;
  access: { invoices: boolean; projects: boolean; documents: boolean };
  invoices: { id: string; amount: number; status: string; dueDate: string; items: { desc: string; qty: number; rate: number }[] }[];
  projects: { name: string; progress: number; status: string; dueDate: string }[];
  documents: { name: string; type: string; size: string; date: string }[];
}

const portalDatabase: Record<string, PortalData> = {
  abc123def456: {
    client: "TechCorp",
    access: { invoices: true, projects: true, documents: false },
    invoices: [
      { id: "INV-001", amount: 48900, status: "paid", dueDate: "2026-06-15", items: [{ desc: "Website Redesign - Phase 1", qty: 1, rate: 48900 }] },
      { id: "INV-006", amount: 24500, status: "sent", dueDate: "2026-07-15", items: [{ desc: "Website Redesign - Phase 2", qty: 1, rate: 24500 }] },
    ],
    projects: [
      { name: "Website Redesign", progress: 75, status: "In Progress", dueDate: "2026-08-01" },
      { name: "CRM Integration", progress: 30, status: "In Progress", dueDate: "2026-09-15" },
    ],
    documents: [],
  },
  ghi789jkl012: {
    client: "GreenEnergy",
    access: { invoices: true, projects: false, documents: false },
    invoices: [
      { id: "INV-002", amount: 36400, status: "sent", dueDate: "2026-06-30", items: [{ desc: "Mobile App Development", qty: 1, rate: 36400 }] },
    ],
    projects: [],
    documents: [],
  },
  mno345pqr678: {
    client: "BuildRight",
    access: { invoices: true, projects: true, documents: true },
    invoices: [
      { id: "INV-004", amount: 62000, status: "draft", dueDate: "", items: [{ desc: "CRM Setup & Training", qty: 1, rate: 62000 }] },
    ],
    projects: [
      { name: "CRM Setup", progress: 45, status: "In Progress", dueDate: "2026-07-30" },
      { name: "Staff Training", progress: 0, status: "Not Started", dueDate: "2026-08-15" },
    ],
    documents: [
      { name: "Project Brief.pdf", type: "PDF", size: "2.4 MB", date: "2026-06-01" },
      { name: "Requirements Doc.docx", type: "DOCX", size: "1.1 MB", date: "2026-06-05" },
      { name: "Wireframes v2.fig", type: "Figma", size: "8.7 MB", date: "2026-06-10" },
    ],
  },
};

const statusStyles: Record<string, string> = {
  paid: "bg-sky-100 text-sky-600",
  sent: "bg-sky-100 text-sky-600",
  draft: "bg-gray-100 text-gray-600",
  overdue: "bg-gray-200 text-gray-700",
  "In Progress": "bg-sky-100 text-sky-600",
  "Not Started": "bg-gray-100 text-gray-500",
  Completed: "bg-sky-100 text-sky-600",
};

const STORAGE_KEY = "boss_portals";

function loadPortalData(token: string): PortalData | null {
  // Check dynamically-created portals from localStorage first
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const portals = JSON.parse(stored);
      const match = portals.find((p: any) => p.token === token);
      if (match) {
        return {
          client: match.client,
          access: match.access,
          invoices: [],
          projects: [],
          documents: [],
        };
      }
    }
  } catch {}
  // Fall back to hardcoded database
  return portalDatabase[token] || null;
}

export default function PortalView() {
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"invoices" | "projects" | "documents">("invoices");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    setToken(t);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-8 w-8 border-4 border-sky-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!token || !loadPortalData(token)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Portal Link</h1>
          <p className="text-gray-500">This portal link is invalid or has expired.</p>
          <a href="/" className="mt-6 inline-block bg-sky-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-sky-600 transition-colors">
            Go to BOSS
          </a>
        </div>
      </div>
    );
  }

  const data = loadPortalData(token)!;
  const tabs = [
    { key: "invoices" as const, label: "Invoices", icon: FileText, available: data.access.invoices },
    { key: "projects" as const, label: "Projects", icon: FolderKanban, available: data.access.projects },
    { key: "documents" as const, label: "Documents", icon: File, available: data.access.documents },
  ].filter(t => t.available);

  if (tabs.length > 0 && !tabs.find(t => t.key === activeTab)) {
    setActiveTab(tabs[0].key);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="BOSS" className="h-10 w-auto" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">{data.client} Portal</h1>
              <p className="text-xs text-gray-500">Powered by BOSS</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={14} />
            <span>Last updated: Just now</span>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === "invoices" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Invoices</h2>
            {data.invoices.length === 0 ? (
              <p className="text-gray-500">No invoices available.</p>
            ) : (
              <div className="space-y-3">
                {data.invoices.map((inv) => (
                  <div key={inv.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{inv.id}</p>
                        <p className="text-sm text-gray-500">{inv.items[0]?.desc}</p>
                        {inv.dueDate && <p className="text-xs text-gray-400 mt-0.5">Due: {inv.dueDate}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[inv.status]}`}>{inv.status}</span>
                      <span className="font-bold text-gray-900">R {inv.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Projects</h2>
            {data.projects.length === 0 ? (
              <p className="text-gray-500">No projects available.</p>
            ) : (
              <div className="space-y-3">
                {data.projects.map((proj) => (
                  <div key={proj.name} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900">{proj.name}</p>
                        <p className="text-sm text-gray-500">Due: {proj.dueDate || "No date"}</p>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[proj.status] || "bg-gray-100 text-gray-500"}`}>{proj.status}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 rounded-full transition-all" style={{ width: `${proj.progress}%` }} />
                      </div>
                      <span className="text-sm font-medium text-gray-600">{proj.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "documents" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Documents</h2>
            {data.documents.length === 0 ? (
              <p className="text-gray-500">No documents available.</p>
            ) : (
              <div className="space-y-2">
                {data.documents.map((doc) => (
                  <div key={doc.name} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center">
                        <File size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-400">{doc.type} - {doc.size} - {doc.date}</p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-xs text-gray-400">
          <span>BOSS - Business Operating System as a Service</span>
          <span>hello@bosssaas.co.za</span>
        </div>
      </footer>
    </div>
  );
}
