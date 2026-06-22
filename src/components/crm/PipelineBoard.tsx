"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2, DollarSign, User, MoreHorizontal } from "lucide-react";

interface Deal {
  id: string;
  name: string;
  value: number;
  contact: string;
  stage: string;
  priority?: "high" | "medium" | "low";
  daysInStage?: number;
}

const stages = [
  { id: "new", label: "New Leads", color: "#94a3b8", dot: "bg-slate-400" },
  { id: "contacted", label: "Contacted", color: "#0ea5e9", dot: "bg-sky-500" },
  { id: "qualified", label: "Qualified", color: "#8b5cf6", dot: "bg-violet-500" },
  { id: "proposal", label: "Proposal", color: "#f59e0b", dot: "bg-amber-500" },
  { id: "won", label: "Won", color: "#22c55e", dot: "bg-emerald-500" },
];

const initialDeals: Deal[] = [
  { id: "1", name: "TechCorp Website Redesign", value: 48900, contact: "Sarah Johnson", stage: "won", priority: "high", daysInStage: 2 },
  { id: "2", name: "GreenEnergy App", value: 36400, contact: "David Nkosi", stage: "qualified", priority: "high", daysInStage: 5 },
  { id: "3", name: "FreshFoods Branding", value: 24500, contact: "Lisa van der Berg", stage: "new", priority: "medium", daysInStage: 1 },
  { id: "4", name: "BuildRight CRM Setup", value: 62000, contact: "James Mthembu", stage: "proposal", priority: "high", daysInStage: 3 },
  { id: "5", name: "Digital Marketing Website", value: 19750, contact: "Naledi Dlamini", stage: "contacted", priority: "low", daysInStage: 7 },
  { id: "6", name: "UrbanStyle E-commerce", value: 41200, contact: "Pieter Pretorius", stage: "new", priority: "medium", daysInStage: 1 },
  { id: "7", name: "HealthPlus Mobile App", value: 55000, contact: "Amahle Zulu", stage: "qualified", priority: "high", daysInStage: 4 },
];

const priorityColors = {
  high: "bg-red-50 text-red-600 border-red-200",
  medium: "bg-amber-50 text-amber-600 border-amber-200",
  low: "bg-gray-50 text-gray-500 border-gray-200",
};

function SortableDealCard({ deal, onDelete }: { deal: Deal; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: deal.id,
    data: { stage: deal.stage },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all group cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 truncate">{deal.name}</h4>
          <div className="flex items-center gap-1.5 mt-1.5">
            <User size={12} className="text-gray-400 flex-shrink-0" />
            <span className="text-xs text-gray-500 truncate">{deal.contact}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
          <button
            {...attributes}
            {...listeners}
            className="p-1 text-gray-300 hover:text-gray-500 rounded cursor-grab"
          >
            <GripVertical size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(deal.id); }}
            className="p-1 text-gray-300 hover:text-red-500 rounded"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <DollarSign size={13} className="text-gray-400" />
          <span className="text-sm font-bold text-gray-900">R {deal.value.toLocaleString()}</span>
        </div>
        {deal.priority && (
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${priorityColors[deal.priority]}`}>
            {deal.priority}
          </span>
        )}
      </div>

      {deal.daysInStage !== undefined && deal.daysInStage > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-[10px] text-gray-400">
            {deal.daysInStage} day{deal.daysInStage !== 1 ? "s" : ""} in stage
          </span>
        </div>
      )}
    </div>
  );
}

function DealOverlay({ deal }: { deal: Deal }) {
  return (
    <div className="bg-white rounded-xl border-2 border-sky-400 p-4 shadow-xl w-[280px] rotate-2">
      <h4 className="text-sm font-semibold text-gray-900 truncate">{deal.name}</h4>
      <div className="flex items-center gap-1.5 mt-1.5">
        <User size={12} className="text-gray-400" />
        <span className="text-xs text-gray-500">{deal.contact}</span>
      </div>
      <div className="flex items-center gap-1.5 mt-3">
        <DollarSign size={13} className="text-gray-400" />
        <span className="text-sm font-bold text-gray-900">R {deal.value.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default function PipelineBoard() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const activeDeal = activeId ? deals.find((d) => d.id === activeId) : null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeDeal = deals.find((d) => d.id === active.id);
    if (!activeDeal) return;

    // Determine target stage from the droppable id
    const overStage = stages.find((s) => s.id === over.id);
    if (overStage) {
      // Dropped on a column header/area
      setDeals((prev) =>
        prev.map((d) => (d.id === active.id ? { ...d, stage: overStage.id } : d))
      );
      return;
    }

    // Dropped on another card — move to that card's stage
    const overDeal = deals.find((d) => d.id === over.id);
    if (overDeal && overDeal.stage !== activeDeal.stage) {
      setDeals((prev) =>
        prev.map((d) => (d.id === active.id ? { ...d, stage: overDeal.stage } : d))
      );
    }
  };

  const deleteDeal = (id: string) => setDeals((prev) => prev.filter((d) => d.id !== id));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">Pipeline</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{deals.length} deals</span>
          <span className="text-sm font-semibold text-gray-900">
            R {deals.reduce((s, d) => s + d.value, 0).toLocaleString()} total
          </span>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-5 gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageDeals = deals.filter((d) => d.stage === stage.id);
            const totalValue = stageDeals.reduce((s, d) => s + d.value, 0);

            return (
              <div key={stage.id} className="min-w-[260px]">
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${stage.dot}`} />
                    <h3 className="text-sm font-semibold text-gray-700">{stage.label}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {stageDeals.length}
                    </span>
                    <button className="p-1 text-gray-300 hover:text-gray-500 rounded-lg hover:bg-gray-100 transition-colors">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </div>

                {/* Column Value */}
                <div className="px-1 mb-3">
                  <span className="text-xs font-medium" style={{ color: stage.color }}>
                    R {totalValue.toLocaleString()}
                  </span>
                </div>

                {/* Cards Area */}
                <SortableContext items={stageDeals.map((d) => d.id)} strategy={verticalListSortingStrategy}>
                  <div
                    className="flex flex-col gap-2.5 min-h-[300px] rounded-xl bg-gray-50/80 border border-gray-100 p-2.5 transition-colors"
                    id={stage.id}
                  >
                    {stageDeals.map((deal) => (
                      <SortableDealCard key={deal.id} deal={deal} onDelete={deleteDeal} />
                    ))}

                    {stageDeals.length === 0 && (
                      <div className="flex items-center justify-center h-24 text-xs text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                        Drop deals here
                      </div>
                    )}
                  </div>
                </SortableContext>
              </div>
            );
          })}
        </div>

        <DragOverlay>
          {activeDeal ? <DealOverlay deal={activeDeal} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
