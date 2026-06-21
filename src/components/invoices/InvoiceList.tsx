"use client";

import { Plus, Eye, Send, CheckCircle } from "lucide-react";

const invoices = [
  { id: "INV-001", client: "TechCorp", amount: 48900, status: "paid", dueDate: "2026-06-15", issuedAt: "2026-06-01" },
  { id: "INV-002", client: "GreenEnergy", amount: 36400, status: "sent", dueDate: "2026-06-30", issuedAt: "2026-06-10" },
  { id: "INV-003", client: "FreshFoods", amount: 12500, status: "overdue", dueDate: "2026-06-01", issuedAt: "2026-05-15" },
  { id: "INV-004", client: "BuildRight", amount: 62000, status: "draft", dueDate: "", issuedAt: "" },
  { id: "INV-005", client: "Digital Marketing SA", amount: 19750, status: "paid", dueDate: "2026-06-20", issuedAt: "2026-06-05" },
];

const statusStyles: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  sent: "bg-blue-100 text-blue-600",
  paid: "bg-emerald-100 text-emerald-600",
  overdue: "bg-red-100 text-red-500",
};

export default function InvoiceList() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">Invoices</h2>
        <button className="bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
          <Plus size={18} /> New Invoice
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
              <th className="px-6 py-3 font-medium">Invoice</th>
              <th className="px-6 py-3 font-medium">Client</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Due Date</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{inv.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{inv.client}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">R {inv.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[inv.status]}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{inv.dueDate || "—"}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><Eye size={16} /></button>
                    {inv.status === "draft" && <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Send size={16} /></button>}
                    {inv.status === "sent" && <button className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg"><CheckCircle size={16} /></button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
