"use client";

import { Link2, ExternalLink, Clock } from "lucide-react";

const portals = [
  { id: "1", client: "TechCorp", token: "abc123", lastAccessed: "2 hours ago", access: { invoices: true, projects: true, documents: false } },
  { id: "2", client: "GreenEnergy", token: "def456", lastAccessed: "1 day ago", access: { invoices: true, projects: false, documents: false } },
  { id: "3", client: "BuildRight", token: "ghi789", lastAccessed: "Never", access: { invoices: true, projects: true, documents: true } },
];

export default function PortalList() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">Client Portals</h2>
        <button className="bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
          <Link2 size={18} /> Generate Link
        </button>
      </div>
      <div className="space-y-4">
        {portals.map((portal) => (
          <div key={portal.id} className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                {portal.client[0]}
              </div>
              <div>
                <p className="font-medium text-gray-900">{portal.client}</p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock size={14} /> Last accessed: {portal.lastAccessed}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {portal.access.invoices && <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">Invoices</span>}
              {portal.access.projects && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">Projects</span>}
              {portal.access.documents && <span className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">Documents</span>}
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg ml-2"><ExternalLink size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
