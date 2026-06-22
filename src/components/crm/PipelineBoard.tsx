"use client";

import { useState } from "react";
import { GripVertical, Plus, Trash2 } from "lucide-react";

interface Deal { id: string; name: string; value: number; contact: string; stage: string; }

const initialDeals: Deal[] = [
  { id: "1", name: "TechCorp Website Redesign", value: 48900, contact: "Sarah Johnson", stage: "won" },
  { id: "2", name: "GreenEnergy App", value: 36400, contact: "David Nkosi", stage: "qualified" },
  { id: "3", name: "FreshFoods Branding", value: 24500, contact: "Lisa van der Berg", stage: "new" },
  { id: "4", name: "BuildRight CRM Setup", value: 62000, contact: "James Mthembu", stage: "proposal" },
  { id: "5", name: "Digital Marketing Website", value: 19750, contact: "Naledi Dlamini", stage: "contacted" },
];

const stages = [
  { id: "new", label: "New", color: "border-gray-300", bg: "bg-gray-50" },
  { id: "contacted", label: "Contacted", color: "border-sky-400", bg: "bg-sky-50" },
  { id: "qualified", label: "Qualified", color: "border-amber-400", bg: "bg-amber-50" },
  { id: "proposal", label: "Proposal", color: "border-violet-400", bg: "bg-violet-50" },
  { id: "won", label: "Won", color: "border-emerald-400", bg: "bg-emerald-50" },
];

export default function PipelineBoard() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [draggedDeal, setDraggedDeal] = useState<string | null>(null);

  const onDragStart = (dealId: string) => setDraggedDeal(dealId);
  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  const onDrop = (stageId: string) => {
    if (!draggedDeal) return;
    setDeals(prev => prev.map(d => d.id === draggedDeal ? { ...d, stage: stageId } : d));
    setDraggedDeal(null);
  };

  const deleteDeal = (id: string) => setDeals(prev => prev.filter(d => d.id !== id));

  return (
    <div>
      <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-6">Pipeline</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageDeals = deals.filter(d => d.stage === stage.id);
          const totalValue = stageDeals.reduce((s, d) => s + d.value, 0);
          return (
            <div key={stage.id} className="min-w-[280px] flex-shrink-0" onDragOver={onDragOver} onDrop={() => onDrop(stage.id)}>
              <div className={`${stage.bg} rounded-2xl p-4 border-t-4 ${stage.color} min-h-[400px]`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{stage.label}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">{stageDeals.length}</span>
                    <span className="text-xs font-medium text-gray-600">R {totalValue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {stageDeals.map((deal) => (
                    <div key={deal.id} draggable onDragStart={() => onDragStart(deal.id)} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{deal.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{deal.contact}</p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <GripVertical size={14} className="text-gray-300" />
                          <button onClick={(e) => { e.stopPropagation(); deleteDeal(deal.id); }} className="p-1 text-gray-300 hover:text-red-500 rounded"><Trash2 size={12} /></button>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-sky-600 mt-3">R {deal.value.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
