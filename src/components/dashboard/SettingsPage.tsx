"use client";

import { useState } from "react";
import { Building2, Users, CreditCard, Bell, Shield, Save, Upload, Mail, Globe, Phone } from "lucide-react";

const teamMembers = [
  { id: "1", name: "Thabo Mokoena", email: "thabo@bosssaas.co.za", role: "Admin", status: "active" },
  { id: "2", name: "Sarah Johnson", email: "sarah@bosssaas.co.za", role: "Editor", status: "active" },
  { id: "3", name: "David Nkosi", email: "david@bosssaas.co.za", role: "Viewer", status: "invited" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("workspace");
  const [workspaceName, setWorkspaceName] = useState("BOSS Digital Agency");
  const [workspaceEmail, setWorkspaceEmail] = useState("hello@bosssaas.co.za");
  const [workspacePhone, setWorkspacePhone] = useState("+27 11 234 5678");
  const [workspaceWebsite, setWorkspaceWebsite] = useState("https://bosssaas.co.za");

  const tabs = [
    { id: "workspace", label: "Workspace", icon: Building2 },
    { id: "team", label: "Team", icon: Users },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900 mb-6">Settings</h2>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-56 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-sky-50 text-sky-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "workspace" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Workspace Profile</h3>

              {/* Logo upload */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-sky-100 rounded-2xl flex items-center justify-center">
                  <img src="/images/logo.png" alt="Logo" className="w-12 h-12" />
                </div>
                <div>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors">
                    <Upload size={16} /> Change Logo
                  </button>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Workspace Name</label>
                  <input
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={workspaceEmail}
                      onChange={(e) => setWorkspaceEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={workspacePhone}
                      onChange={(e) => setWorkspacePhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      value={workspaceWebsite}
                      onChange={(e) => setWorkspaceWebsite(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                <button className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-4 py-2 rounded-xl text-sm transition-colors">
                  Invite Member
                </button>
              </div>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${member.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                        {member.status}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Billing</h3>
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Studio Plan</p>
                    <p className="text-sm text-gray-600">R 799/month — Billed monthly</p>
                  </div>
                  <span className="bg-sky-500 text-white text-xs font-medium px-3 py-1 rounded-full">Active</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Next billing date</span>
                  <span className="text-sm font-medium text-gray-900">July 1, 2026</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Payment method</span>
                  <span className="text-sm font-medium text-gray-900">Visa ending in 4242</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Invoices this year</span>
                  <span className="text-sm font-medium text-gray-900">R 9,588</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                {[
                  { label: "New lead assigned", desc: "Get notified when a new lead is assigned to you" },
                  { label: "Invoice paid", desc: "Get notified when a client pays an invoice" },
                  { label: "Invoice overdue", desc: "Get notified when an invoice is past due" },
                  { label: "Project milestone", desc: "Get notified when a project milestone is reached" },
                  { label: "Weekly summary", desc: "Receive a weekly performance summary" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <button className={`relative w-12 h-6 rounded-full transition-colors ${i < 3 ? "bg-sky-500" : "bg-gray-300"}`}>
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${i < 3 ? "translate-x-6" : ""}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Security</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Change Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="password" placeholder="Current password" className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400" />
                    <input type="password" placeholder="New password" className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <button className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">Enable</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Active Sessions</p>
                    <p className="text-xs text-gray-500">2 devices currently signed in</p>
                  </div>
                  <button className="text-xs text-red-500 hover:text-red-600 font-medium">Sign out all</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
