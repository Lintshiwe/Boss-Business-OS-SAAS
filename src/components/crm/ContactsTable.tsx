"use client";

import { useState } from "react";
import { Search, Plus, Filter, ArrowUpDown, Edit2, Trash2, X, Mail, Phone, Building2 } from "lucide-react";
import ColorfulAvatar from "../ui/ColorfulAvatar";

interface Contact {
  id: string; name: string; email: string; company: string; phone: string; status: string; stage: string; dealValue: number;
}

const initialContacts: Contact[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah@techcorp.co.za", company: "TechCorp", phone: "+27 11 234 5678", status: "client", stage: "won", dealValue: 48900 },
  { id: "2", name: "David Nkosi", email: "david@greenenergy.co.za", company: "GreenEnergy", phone: "+27 21 345 6789", status: "prospect", stage: "qualified", dealValue: 36400 },
  { id: "3", name: "Lisa van der Berg", email: "lisa@freshfoods.co.za", company: "FreshFoods", phone: "+27 31 456 7890", status: "lead", stage: "new", dealValue: 0 },
  { id: "4", name: "James Mthembu", email: "james@buildright.co.za", company: "BuildRight", phone: "+27 12 567 8901", status: "client", stage: "won", dealValue: 62000 },
  { id: "5", name: "Naledi Dlamini", email: "naledi@digitalmarketing.co.za", company: "Digital Marketing SA", phone: "+27 79 678 9012", status: "prospect", stage: "contacted", dealValue: 24500 },
];

const stageColors: Record<string, string> = {
  new: "bg-gray-100 text-gray-600", contacted: "bg-sky-100 text-sky-600", qualified: "bg-gray-200 text-gray-700",
  proposal: "bg-sky-50 text-sky-600", won: "bg-sky-100 text-sky-600", lost: "bg-gray-200 text-gray-600",
};

export default function ContactsTable() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", status: "lead", stage: "new", dealValue: 0 });

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditingContact(null); setForm({ name: "", email: "", company: "", phone: "", status: "lead", stage: "new", dealValue: 0 }); setShowModal(true); };
  const openEdit = (c: Contact) => { setEditingContact(c); setForm({ name: c.name, email: c.email, company: c.company, phone: c.phone, status: c.status, stage: c.stage, dealValue: c.dealValue }); setShowModal(true); };

  const save = () => {
    if (!form.name || !form.email) return;
    if (editingContact) {
      setContacts(prev => prev.map(c => c.id === editingContact.id ? { ...c, ...form } : c));
    } else {
      setContacts(prev => [...prev, { id: String(Date.now()), ...form }]);
    }
    setShowModal(false);
  };

  const deleteContact = (id: string) => { setContacts(prev => prev.filter(c => c.id !== id)); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">Contacts</h2>
        <button onClick={openAdd} className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
          <Plus size={18} /> Add Contact
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search contacts..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
          </div>
          <button className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50"><Filter size={16} /> Filter</button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
              <th className="px-6 py-3 font-medium"><ArrowUpDown size={14} className="inline mr-1" />Name</th>
              <th className="px-6 py-3 font-medium">Company</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Stage</th>
              <th className="px-6 py-3 font-medium text-right">Deal Value</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((contact) => (
              <tr key={contact.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <ColorfulAvatar name={contact.name} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{contact.company}</td>
                <td className="px-6 py-4"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${contact.status === "client" ? "bg-sky-50 text-sky-600" : contact.status === "prospect" ? "bg-gray-100 text-gray-600" : "bg-gray-100 text-gray-600"}`}>{contact.status}</span></td>
                <td className="px-6 py-4"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${stageColors[contact.stage]}`}>{contact.stage}</span></td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">{contact.dealValue > 0 ? `R ${contact.dealValue.toLocaleString()}` : "-"}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(contact)} className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"><Edit2 size={14} /></button>
                    <button onClick={() => deleteContact(contact.id)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">{editingContact ? "Edit Contact" : "Add Contact"}</h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1"><Mail size={12} className="inline mr-1" />Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" placeholder="john@company.co.za" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1"><Phone size={12} className="inline mr-1" />Phone</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" placeholder="+27..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1"><Building2 size={12} className="inline mr-1" />Company</label>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" placeholder="Company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deal Value (R)</label>
                  <input type="number" value={form.dealValue} onChange={(e) => setForm({ ...form, dealValue: Number(e.target.value) })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200">
                    <option value="lead">Lead</option><option value="prospect">Prospect</option><option value="client">Client</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pipeline Stage</label>
                  <select value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200">
                    <option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="proposal">Proposal</option><option value="won">Won</option><option value="lost">Lost</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={save} className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium">{editingContact ? "Save Changes" : "Add Contact"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
