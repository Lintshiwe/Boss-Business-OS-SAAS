"use client";

import { useState } from "react";
import { Search, Plus, Filter, ArrowUpDown } from "lucide-react";

const contacts = [
  { id: "1", name: "Sarah Johnson", email: "sarah@techcorp.co.za", company: "TechCorp", status: "client", stage: "won", dealValue: 48900 },
  { id: "2", name: "David Nkosi", email: "david@greenenergy.co.za", company: "GreenEnergy", status: "prospect", stage: "qualified", dealValue: 36400 },
  { id: "3", name: "Lisa van der Berg", email: "lisa@freshfoods.co.za", company: "FreshFoods", status: "lead", stage: "new", dealValue: 0 },
  { id: "4", name: "James Mthembu", email: "james@buildright.co.za", company: "BuildRight", status: "client", stage: "won", dealValue: 62000 },
  { id: "5", name: "Naledi Dlamini", email: "naledi@digitalmarketing.co.za", company: "Digital Marketing SA", status: "prospect", stage: "contacted", dealValue: 24500 },
];

const stageColors: Record<string, string> = {
  new: "bg-gray-100 text-gray-600",
  contacted: "bg-blue-100 text-blue-600",
  qualified: "bg-amber-100 text-amber-600",
  proposal: "bg-purple-100 text-purple-600",
  won: "bg-emerald-100 text-emerald-600",
  lost: "bg-red-100 text-red-500",
};

export default function ContactsTable() {
  const [search, setSearch] = useState("");

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">Contacts</h2>
        <button className="bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
          <Plus size={18} /> Add Contact
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
            <Filter size={16} /> Filter
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
              <th className="px-6 py-3 font-medium"><ArrowUpDown size={14} className="inline mr-1" />Name</th>
              <th className="px-6 py-3 font-medium">Company</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Stage</th>
              <th className="px-6 py-3 font-medium text-right">Deal Value</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((contact) => (
              <tr key={contact.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                      {contact.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{contact.company}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${contact.status === "client" ? "bg-emerald-50 text-emerald-600" : contact.status === "prospect" ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-600"}`}>
                    {contact.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${stageColors[contact.stage]}`}>
                    {contact.stage}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                  {contact.dealValue > 0 ? `R ${contact.dealValue.toLocaleString()}` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
