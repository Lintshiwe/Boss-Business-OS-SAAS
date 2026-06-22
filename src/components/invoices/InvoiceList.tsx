"use client";

import { useState } from "react";
import { Plus, Eye, Send, CheckCircle, Download, Trash2, X } from "lucide-react";

interface Invoice { id: string; client: string; amount: number; status: string; dueDate: string; issuedAt: string; items: { desc: string; qty: number; rate: number }[]; }

const initialInvoices: Invoice[] = [
  { id: "INV-001", client: "TechCorp", amount: 48900, status: "paid", dueDate: "2026-06-15", issuedAt: "2026-06-01", items: [{ desc: "Website Redesign - Phase 1", qty: 1, rate: 48900 }] },
  { id: "INV-002", client: "GreenEnergy", amount: 36400, status: "sent", dueDate: "2026-06-30", issuedAt: "2026-06-10", items: [{ desc: "Mobile App Development", qty: 1, rate: 36400 }] },
  { id: "INV-003", client: "FreshFoods", amount: 12500, status: "overdue", dueDate: "2026-06-01", issuedAt: "2026-05-15", items: [{ desc: "Brand Identity Package", qty: 1, rate: 12500 }] },
  { id: "INV-004", client: "BuildRight", amount: 62000, status: "draft", dueDate: "", issuedAt: "", items: [{ desc: "CRM Setup & Training", qty: 1, rate: 62000 }] },
  { id: "INV-005", client: "Digital Marketing SA", amount: 19750, status: "paid", dueDate: "2026-06-20", issuedAt: "2026-06-05", items: [{ desc: "Website Design", qty: 1, rate: 19750 }] },
];

const statusStyles: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600", sent: "bg-sky-100 text-sky-600", paid: "bg-emerald-100 text-emerald-600", overdue: "bg-red-100 text-red-500",
};

export default function InvoiceList() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState<Invoice | null>(null);
  const [form, setForm] = useState({ client: "", items: [{ desc: "", qty: 1, rate: 0 }], dueDate: "" });

  const createInvoice = () => {
    if (!form.client) return;
    const total = form.items.reduce((s, i) => s + i.qty * i.rate, 0);
    const newInv: Invoice = {
      id: `INV-${String(invoices.length + 1).padStart(3, "0")}`, client: form.client, amount: total, status: "draft",
      dueDate: form.dueDate, issuedAt: new Date().toISOString().split("T")[0], items: form.items,
    };
    setInvoices(prev => [newInv, ...prev]);
    setShowModal(false);
    setForm({ client: "", items: [{ desc: "", qty: 1, rate: 0 }], dueDate: "" });
  };

  const sendInvoice = (id: string) => setInvoices(prev => prev.map(i => i.id === id ? { ...i, status: "sent" } : i));
  const markPaid = (id: string) => setInvoices(prev => prev.map(i => i.id === id ? { ...i, status: "paid" } : i));
  const deleteInvoice = (id: string) => setInvoices(prev => prev.filter(i => i.id !== id));

  const downloadPDF = (inv: Invoice) => {
    const content = `
═══════════════════════════════════════
              INVOICE
═══════════════════════════════════════
Invoice:     ${inv.id}
Date:        ${inv.issuedAt}
Due Date:    ${inv.dueDate || "N/A"}
Status:      ${inv.status.toUpperCase()}
───────────────────────────────────────
Bill To:     ${inv.client}
───────────────────────────────────────
ITEMS:
${inv.items.map(i => `  ${i.desc}    x${i.qty}    R ${i.rate.toLocaleString()}`).join("\n")}
───────────────────────────────────────
TOTAL:       R ${inv.amount.toLocaleString()}
═══════════════════════════════════════
BOSS - Business Operating System
hello@bosssaas.co.za
    `.trim();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${inv.id}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">Invoices</h2>
        <button onClick={() => setShowModal(true)} className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
          <Plus size={18} /> New Invoice
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
              <th className="px-6 py-3 font-medium">Invoice</th><th className="px-6 py-3 font-medium">Client</th><th className="px-6 py-3 font-medium">Amount</th><th className="px-6 py-3 font-medium">Status</th><th className="px-6 py-3 font-medium">Due Date</th><th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{inv.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{inv.client}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">R {inv.amount.toLocaleString()}</td>
                <td className="px-6 py-4"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[inv.status]}`}>{inv.status}</span></td>
                <td className="px-6 py-4 text-sm text-gray-500">{inv.dueDate || "-"}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setShowPreview(inv)} className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors" title="Preview"><Eye size={16} /></button>
                    <button onClick={() => downloadPDF(inv)} className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Download"><Download size={16} /></button>
                    {inv.status === "draft" && <button onClick={() => sendInvoice(inv.id)} className="p-2 text-sky-500 hover:bg-sky-50 rounded-lg transition-colors" title="Send"><Send size={16} /></button>}
                    {inv.status === "sent" && <button onClick={() => markPaid(inv.id)} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="Mark Paid"><CheckCircle size={16} /></button>}
                    <button onClick={() => deleteInvoice(inv.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">New Invoice</h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Client</label><input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" placeholder="Client name" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label><input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" /></div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Line Items</label>
                {form.items.map((item, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input value={item.desc} onChange={(e) => { const items = [...form.items]; items[i].desc = e.target.value; setForm({ ...form, items }); }} className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm" placeholder="Description" />
                    <input type="number" value={item.qty} onChange={(e) => { const items = [...form.items]; items[i].qty = Number(e.target.value); setForm({ ...form, items }); }} className="w-16 px-3 py-2 border border-gray-200 rounded-xl text-sm" />
                    <input type="number" value={item.rate} onChange={(e) => { const items = [...form.items]; items[i].rate = Number(e.target.value); setForm({ ...form, items }); }} className="w-28 px-3 py-2 border border-gray-200 rounded-xl text-sm" />
                  </div>
                ))}
                <button onClick={() => setForm({ ...form, items: [...form.items, { desc: "", qty: 1, rate: 0 }] })} className="text-xs text-sky-500 hover:text-sky-600">+ Add line item</button>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between">
                <p className="font-bold">Total: R {form.items.reduce((s, i) => s + i.qty * i.rate, 0).toLocaleString()}</p>
                <button onClick={createInvoice} className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium">Create Invoice</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowPreview(null)}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">{showPreview.id}</h3>
              <button onClick={() => setShowPreview(null)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Client</span><span className="font-medium">{showPreview.client}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Issued</span><span>{showPreview.issuedAt}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Due</span><span>{showPreview.dueDate || "N/A"}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Status</span><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[showPreview.status]}`}>{showPreview.status}</span></div>
              <hr className="my-2" />
              {showPreview.items.map((item, i) => (
                <div key={i} className="flex justify-between"><span>{item.desc} x{item.qty}</span><span>R {item.rate.toLocaleString()}</span></div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>R {showPreview.amount.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
