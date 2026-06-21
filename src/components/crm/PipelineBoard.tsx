"use client";

import { GripVertical } from "lucide-react";

const stages = [
  { id: "new", label: "New", color: "border-gray-300", count: 12 },
  { id: "contacted", label: "Contacted", color: "border-blue-400", count: 8 },
  { id: "qualified", label: "Qualified", color: "border-amber-400", count: 5 },
  { id: "proposal", label: "Proposal", color: "border-purple-400", count: 3 },
  { id: "won", label: "Won", color: "border-emerald-400", count: 7 },
];

const deals = [
  { id: "1", name: "TechCorp Website Redesign", value: 48900, contact: "Sarah Johnson" },
  { id: "2", name: "GreenEnergy App", value: 36400, contact: "David Nkosi" },
  { id: "3", name: "FreshFoods Branding", value: 24500, contact: "Lisa van der Berg" },
  { id: "4", name: "BuildRight CRM Setup", value: 62000, contact: "James Mthembu" },
];

export default function PipelineBoard() {
  return (
    <div>
      <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-6">Pipeline</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div key={stage.id} className="min-w-[280px] flex-shrink-0">
            <div className={`bg-gray-50 rounded-2xl p-4 border-t-4 ${stage.color}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{stage.label}</h3>
                <span className="text-sm text-gray-500 bg-white px-2 py-0.5 rounded-full">{stage.count}</span>
              </div>
              <div className="space-y-3">
                {deals.slice(0, 2).map((deal) => (
                  <div key={deal.id} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{deal.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{deal.contact}</p>
                      </div>
                      <GripVertical size={16} className="text-gray-300" />
                    </div>
                    <p className="text-sm font-bold text-primary mt-3">R {deal.value.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
