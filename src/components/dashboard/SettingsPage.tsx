"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Building2, Users, CreditCard, Bell, Shield, Save, Upload, Mail, Globe, Phone, Trash2, Plus, Copy, Check, Eye, EyeOff, Smartphone, Key, Download, FileText, X, AlertTriangle } from "lucide-react";

// localStorage persistence hook
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const newValue = value instanceof Function ? value(prev) : value;
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(newValue));
        }
      } catch {}
      return newValue;
    });
  }, [key]);

  return [storedValue, setValue];
}

const defaultTeam = [
  { id: "1", name: "Thabo Mokoena", email: "thabo@bosssaas.co.za", role: "Admin", status: "active" },
  { id: "2", name: "Sarah Johnson", email: "sarah@bosssaas.co.za", role: "Editor", status: "active" },
  { id: "3", name: "David Nkosi", email: "david@bosssaas.co.za", role: "Viewer", status: "invited" },
];

const defaultBillingHistory = [
  { id: "INV-2026-001", date: "2026-06-01", amount: 799, status: "paid", plan: "Studio" },
  { id: "INV-2026-002", date: "2026-05-01", amount: 799, status: "paid", plan: "Studio" },
  { id: "INV-2026-003", date: "2026-04-01", amount: 799, status: "paid", plan: "Studio" },
  { id: "INV-2026-004", date: "2026-03-01", amount: 299, status: "paid", plan: "Solo" },
];

const defaultNotifications = [
  { label: "New lead assigned", desc: "Get notified when a new lead is assigned to you", on: true },
  { label: "Invoice paid", desc: "Get notified when a client pays an invoice", on: true },
  { label: "Invoice overdue", desc: "Get notified when an invoice is past due", on: true },
  { label: "Project milestone", desc: "Get notified when a project milestone is reached", on: false },
  { label: "Weekly summary", desc: "Receive a weekly performance summary", on: false },
];

const defaultSessions = [
  { id: "1", device: "Chrome on Windows", lastActive: "Now", current: true },
  { id: "2", device: "Safari on iPhone", lastActive: "2 hours ago", current: false },
];

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideIn">
      <div className="bg-gray-900 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-medium">
        <Check size={16} className="text-sky-400" />
        {message}
        <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white"><X size={14} /></button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("workspace");
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  // Workspace — persisted to localStorage
  const [workspaceName, setWorkspaceName] = useLocalStorage("boss_ws_name", "BOSS Digital Agency");
  const [workspaceEmail, setWorkspaceEmail] = useLocalStorage("boss_ws_email", "hello@bosssaas.co.za");
  const [workspacePhone, setWorkspacePhone] = useLocalStorage("boss_ws_phone", "+27 11 234 5678");
  const [workspaceWebsite, setWorkspaceWebsite] = useLocalStorage("boss_ws_website", "https://bosssaas.co.za");
  const [logoPreview, setLogoPreview] = useLocalStorage<string | null>("boss_ws_logo", "/images/logo.png");
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Team — persisted
  const [team, setTeam] = useLocalStorage("boss_team", defaultTeam);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Viewer");
  const [showInvite, setShowInvite] = useState(false);

  // Billing — persisted
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([{ desc: "Studio Plan - Monthly", qty: 1, rate: 799 }]);
  const [invoiceHistory, setInvoiceHistory] = useLocalStorage("boss_billing_history", defaultBillingHistory);
  const [currentPlan, setCurrentPlan] = useLocalStorage("boss_plan", "Studio");
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [confirmRevoke, setConfirmRevoke] = useState<string | null>(null);
  const [confirmSignOutAll, setConfirmSignOutAll] = useState(false);

  // Notifications — persisted
  const [notifPrefs, setNotifPrefs] = useLocalStorage("boss_notif_prefs", defaultNotifications);

  // Security — persisted
  const [showPassword, setShowPassword] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [twoFA, setTwoFA] = useLocalStorage("boss_2fa", false);
  const [showPasskey, setShowPasskey] = useState(false);
  const [showAuthApp, setShowAuthApp] = useState(false);
  const [totpSecret, setTotpSecret] = useState("");
  const [totpUri, setTotpUri] = useState("");
  const [totpQrDataUrl, setTotpQrDataUrl] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [passkeyRegistered, setPasskeyRegistered] = useLocalStorage("boss_passkey", false);
  const [passkeyError, setPasskeyError] = useState("");
  const [sessions, setSessions] = useLocalStorage("boss_sessions", defaultSessions);

  const tabs = [
    { id: "workspace", label: "Workspace", icon: Building2 },
    { id: "team", label: "Team", icon: Users },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleInvite = () => {
    if (!inviteEmail) return;
    setTeam(prev => [...prev, { id: String(Date.now()), name: inviteEmail.split("@")[0], email: inviteEmail, role: inviteRole, status: "invited" }]);
    setInviteEmail("");
    setShowInvite(false);
    showToast("Invitation sent to " + inviteEmail);
  };

  const removeMember = (id: string) => {
    setTeam(prev => prev.filter(m => m.id !== id));
    showToast("Member removed");
  };

  const generateInvoice = () => {
    const total = invoiceItems.reduce((sum, item) => sum + item.qty * item.rate, 0);
    const newInv = {
      id: `INV-2026-${String(invoiceHistory.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString().split("T")[0],
      amount: total,
      status: "paid" as const,
      plan: "Custom",
    };
    setInvoiceHistory(prev => [newInv, ...prev]);
    setShowInvoiceModal(false);
    setInvoiceItems([{ desc: "Studio Plan - Monthly", qty: 1, rate: 799 }]);
    showToast("Invoice generated successfully");
  };

  const downloadInvoice = (inv: typeof defaultBillingHistory[0]) => {
    const content = `
INVOICE
=======
Invoice ID: ${inv.id}
Date: ${inv.date}
Plan: ${inv.plan}
Amount: R ${inv.amount.toLocaleString()}
Status: ${inv.status.toUpperCase()}

BOSS - Business Operating System
hello@bosssaas.co.za
https://bosssaas.co.za
    `.trim();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${inv.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Invoice downloaded");
  };

  const toggleNotifPref = (index: number) => {
    setNotifPrefs(prev => prev.map((p, i) => i === index ? { ...p, on: !p.on } : p));
  };

  const revokeSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    showToast("Session revoked");
  };

  const saveWorkspace = () => showToast("Workspace settings saved");
  const updatePassword = () => { setCurrentPw(""); setNewPw(""); showToast("Password updated"); };

  const startAuthAppSetup = async () => {
    try {
      const { TOTP, Secret } = await import("otpauth");
      const secret = new Secret({ size: 20 });
      const totp = new TOTP({ issuer: "BOSS SaaS", label: workspaceEmail, algorithm: "SHA1", digits: 6, period: 30, secret });
      setTotpSecret(secret.base32);
      setTotpUri(totp.toString());

      const QRCode = await import("qrcode");
      const dataUrl = await QRCode.toDataURL(totp.toString(), { width: 160, margin: 1, color: { dark: "#0f172a", light: "#ffffff" } });
      setTotpQrDataUrl(dataUrl);
      setShowAuthApp(true);
    } catch {
      showToast("Failed to generate TOTP secret");
    }
  };

  const verifyAndEnable2FA = async () => {
    if (verifyCode.length !== 6) { setVerifyError("Enter a 6-digit code"); return; }
    try {
      const { TOTP, Secret } = await import("otpauth");
      const secret = Secret.fromBase32(totpSecret);
      const totp = new TOTP({ issuer: "BOSS SaaS", label: workspaceEmail, algorithm: "SHA1", digits: 6, period: 30, secret });
      const delta = totp.validate({ token: verifyCode, window: 1 });
      if (delta !== null) {
        setTwoFA(true);
        setShowAuthApp(false);
        setVerifyCode("");
        setVerifyError("");
        showToast("Two-factor authentication enabled");
      } else {
        setVerifyError("Invalid code. Check your authenticator app and try again.");
      }
    } catch {
      setVerifyError("Verification failed. Please try again.");
    }
  };

  const registerPasskey = async () => {
    setPasskeyError("");
    try {
      if (!window.PublicKeyCredential) {
        setPasskeyError("WebAuthn is not supported in this browser.");
        return;
      }
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      if (!available) {
        setPasskeyError("No platform authenticator (fingerprint/face) available on this device.");
        return;
      }
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);
      const userId = new Uint8Array(16);
      crypto.getRandomValues(userId);

      const credential = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: { name: "BOSS SaaS", id: window.location.hostname },
          user: { id: userId, name: workspaceEmail, displayName: workspaceName },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }, { alg: -257, type: "public-key" }],
          authenticatorSelection: { authenticatorAttachment: "platform", userVerification: "required" },
          timeout: 60000,
        },
      });
      if (credential) {
        setPasskeyRegistered(true);
        setShowPasskey(false);
        showToast("Passkey registered successfully");
      }
    } catch (err: any) {
      if (err?.name === "NotAllowedError") {
        setPasskeyError("Registration was cancelled. Please try again and approve the prompt.");
      } else {
        setPasskeyError("Passkey registration failed. Your device may not support it.");
      }
    }
  };
  const signOutOthers = () => { setSessions(prev => prev.filter(s => s.current)); showToast("All other sessions signed out"); };
  const saveNotifications = () => showToast("Notification preferences saved");

  return (
    <div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
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
                  activeTab === tab.id ? "bg-sky-50 text-sky-600" : "text-gray-600 hover:bg-gray-100"
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
          {/* WORKSPACE TAB */}
          {activeTab === "workspace" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Workspace Profile</h3>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-sky-100 rounded-2xl flex items-center justify-center overflow-hidden">
                  {logoPreview ? <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" /> : <Building2 size={32} className="text-sky-400" />}
                </div>
                <div>
                  <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  <button onClick={() => logoInputRef.current?.click()} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors">
                    <Upload size={16} /> Upload Logo
                  </button>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Workspace Name</label>
                  <input type="text" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" value={workspaceEmail} onChange={(e) => setWorkspaceEmail(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" value={workspacePhone} onChange={(e) => setWorkspacePhone(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="url" value={workspaceWebsite} onChange={(e) => setWorkspaceWebsite(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400" />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={saveWorkspace} className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors"><Save size={16} /> Save Changes</button>
              </div>
            </div>
          )}

          {/* TEAM TAB */}
          {activeTab === "team" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                <button onClick={() => setShowInvite(!showInvite)} className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors">
                  <Plus size={16} /> Invite Member
                </button>
              </div>
              {showInvite && (
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 mb-6 flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                    <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="colleague@company.co.za" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
                  </div>
                  <div className="w-40">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200">
                      <option>Admin</option>
                      <option>Editor</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                  <button onClick={handleInvite} className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium">Send Invite</button>
                </div>
              )}
              <div className="space-y-4">
                {team.map((member: any) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {member.name.split(" ").map((n: string) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${member.status === "active" ? "bg-sky-50 text-sky-600" : "bg-gray-100 text-gray-600"}`}>{member.status}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{member.role}</span>
                      {member.id !== "1" && <button onClick={() => removeMember(member.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BILLING TAB */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Current Plan</h3>
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{currentPlan} Plan</p>
                    <p className="text-sm text-gray-600">R {currentPlan === "Solo" ? "299" : currentPlan === "Studio" ? "799" : "1,999"}/month - Billed monthly</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-sky-500 text-white text-xs font-medium px-3 py-1 rounded-full">Active</span>
                    <button onClick={() => setShowPlanModal(true)} className="text-sm text-sky-600 hover:text-sky-700 font-medium">Change Plan</button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="p-4 bg-gray-50 rounded-xl text-center">
                    <p className="text-xs text-gray-500">Next billing</p>
                    <p className="text-sm font-semibold text-gray-900">July 1, 2026</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl text-center">
                    <p className="text-xs text-gray-500">Payment method</p>
                    <p className="text-sm font-semibold text-gray-900">Visa ···· 4242</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl text-center">
                    <p className="text-xs text-gray-500">YTD spent</p>
                    <p className="text-sm font-semibold text-gray-900">R {(currentPlan === "Solo" ? 299 * 6 : currentPlan === "Studio" ? 799 * 6 : 1999 * 6).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
                  <button onClick={() => setShowInvoiceModal(true)} className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors">
                    <FileText size={16} /> Generate Invoice
                  </button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                      <th className="pb-3 font-medium">Invoice</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Plan</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceHistory.map((inv: any) => (
                      <tr key={inv.id} className="border-b border-gray-50">
                        <td className="py-3 text-sm font-medium text-gray-900">{inv.id}</td>
                        <td className="py-3 text-sm text-gray-600">{inv.date}</td>
                        <td className="py-3 text-sm text-gray-600">{inv.plan}</td>
                        <td className="py-3 text-sm font-medium text-gray-900">R {inv.amount.toLocaleString()}</td>
                        <td className="py-3"><span className="text-xs font-medium px-2.5 py-1 rounded-full bg-sky-50 text-sky-600">{inv.status}</span></td>
                        <td className="py-3 text-right">
                          <button onClick={() => downloadInvoice(inv)} className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors" title="Download">
                            <Download size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Generate Invoice Modal */}
              {showInvoiceModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowInvoiceModal(false)}>
                  <div className="bg-white rounded-2xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Generate Invoice</h3>
                      <button onClick={() => setShowInvoiceModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
                    </div>
                    <div className="space-y-4 mb-6">
                      {invoiceItems.map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <input value={item.desc} onChange={(e) => { const newItems = [...invoiceItems]; newItems[i].desc = e.target.value; setInvoiceItems(newItems); }} className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm" placeholder="Description" />
                          <input type="number" value={item.qty} onChange={(e) => { const newItems = [...invoiceItems]; newItems[i].qty = Number(e.target.value); setInvoiceItems(newItems); }} className="w-20 px-3 py-2 border border-gray-200 rounded-xl text-sm" placeholder="Qty" />
                          <input type="number" value={item.rate} onChange={(e) => { const newItems = [...invoiceItems]; newItems[i].rate = Number(e.target.value); setInvoiceItems(newItems); }} className="w-28 px-3 py-2 border border-gray-200 rounded-xl text-sm" placeholder="Rate" />
                        </div>
                      ))}
                      <button onClick={() => setInvoiceItems([...invoiceItems, { desc: "", qty: 1, rate: 0 }])} className="text-sm text-sky-500 hover:text-sky-600 flex items-center gap-1"><Plus size={14} /> Add line item</button>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <p className="text-lg font-bold">Total: R {invoiceItems.reduce((s, i) => s + i.qty * i.rate, 0).toLocaleString()}</p>
                      <button onClick={generateInvoice} className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium">Generate & Pay</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Change Plan Modal */}
              {showPlanModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowPlanModal(false)}>
                  <div className="bg-white rounded-2xl p-6 w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Change Plan</h3>
                      <button onClick={() => setShowPlanModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "Solo", price: "299", features: ["1 user", "Basic CRM", "5 invoices/mo", "Email support"] },
                        { name: "Studio", price: "799", features: ["5 users", "Full CRM + Invoicing", "Unlimited invoices", "Client portals", "Priority support"] },
                        { name: "Business", price: "1,999", features: ["Unlimited users", "All modules", "API access", "Custom branding", "Dedicated support"] },
                      ].map((plan) => (
                        <div key={plan.name} className={`border rounded-xl p-4 flex items-center justify-between transition-all cursor-pointer ${currentPlan === plan.name ? "border-sky-400 bg-sky-50" : "border-gray-200 hover:border-gray-300"}`}>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900">{plan.name}</p>
                              {currentPlan === plan.name && <span className="text-xs bg-sky-500 text-white px-2 py-0.5 rounded-full">Current</span>}
                            </div>
                            <p className="text-sm text-gray-600 mt-0.5">R {plan.price}/month</p>
                            <p className="text-xs text-gray-500 mt-1">{plan.features.join(" · ")}</p>
                          </div>
                          {currentPlan !== plan.name && (
                            <button onClick={() => { setCurrentPlan(plan.name); setShowPlanModal(false); showToast(`Switched to ${plan.name} Plan`); }} className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                              Switch to {plan.name}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === "notifications" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                {notifPrefs.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <button onClick={() => toggleNotifPref(i)} className={`relative w-12 h-6 rounded-full transition-colors ${item.on ? "bg-sky-500" : "bg-gray-300"}`}>
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${item.on ? "translate-x-6" : ""}`} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={saveNotifications} className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors"><Save size={16} /> Save Preferences</button>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder="Current password" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 pr-10" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                  </div>
                  <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="New password" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
                </div>
                <button onClick={updatePassword} className="mt-4 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-xl text-sm font-medium">Update Password</button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Two-Factor Authentication</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center"><Smartphone size={18} /></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Authenticator App</p>
                        <p className="text-xs text-gray-500">Use Google Authenticator or Authy</p>
                      </div>
                    </div>
                    <button onClick={() => twoFA ? null : startAuthAppSetup()} className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${twoFA ? "bg-sky-50 text-sky-600" : "bg-sky-500 text-white hover:bg-sky-600"}`}>
                      {twoFA ? "Enabled" : "Enable"}
                    </button>
                  </div>
                  {showAuthApp && (
                    <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
                      <p className="text-sm font-medium text-gray-700 mb-3">Step 1: Scan this QR code with your authenticator app</p>
                      <div className="flex gap-6 items-start">
                        <div className="bg-white p-3 rounded-xl border border-sky-200">
                          {totpQrDataUrl ? (
                            <img src={totpQrDataUrl} alt="TOTP QR Code" className="w-40 h-40" />
                          ) : (
                            <div className="w-40 h-40 flex items-center justify-center text-xs text-gray-400">Generating...</div>
                          )}
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Or enter this secret manually:</p>
                            <div className="bg-white border border-sky-200 rounded-lg px-3 py-2 flex items-center gap-2">
                              <code className="text-sm font-mono text-gray-800 flex-1 break-all">{totpSecret}</code>
                              <button onClick={() => { navigator.clipboard.writeText(totpSecret); showToast("Secret copied"); }} className="text-sky-500 hover:text-sky-600 flex-shrink-0"><Copy size={14} /></button>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Step 2: Enter the 6-digit code from your app</p>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={verifyCode}
                                onChange={(e) => { setVerifyCode(e.target.value.replace(/\D/g, "")); setVerifyError(""); }}
                                placeholder="000000"
                                className="w-32 px-3 py-2 border border-sky-200 rounded-lg text-sm font-mono text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-sky-300"
                              />
                              <button onClick={verifyAndEnable2FA} className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Verify & Enable</button>
                            </div>
                            {verifyError && <p className="text-xs text-red-500 mt-1">{verifyError}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center"><Key size={18} /></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Passkey</p>
                        <p className="text-xs text-gray-500">Use fingerprint or face recognition</p>
                      </div>
                    </div>
                    {passkeyRegistered ? (
                      <span className="text-xs bg-sky-50 text-sky-600 px-3 py-1.5 rounded-lg font-medium">Registered</span>
                    ) : (
                      <button onClick={() => { setShowPasskey(!showPasskey); setPasskeyError(""); }} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors">Set Up</button>
                    )}
                  </div>
                  {showPasskey && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <p className="text-sm text-gray-700 mb-2">Passkeys let you sign in with biometrics (fingerprint, face) or a security key — no password needed.</p>
                      <p className="text-xs text-gray-500 mb-3">Your browser will prompt you to register a passkey for this site.</p>
                      <div className="flex items-center gap-3">
                        <button onClick={registerPasskey} className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-xl text-sm font-medium">Register Passkey</button>
                        <button onClick={() => setShowPasskey(false)} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                      </div>
                      {passkeyError && <p className="text-xs text-red-500 mt-2">{passkeyError}</p>}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Active Sessions</h3>
                  {confirmSignOutAll ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-red-600 font-medium">Sign out all other sessions?</span>
                      <button onClick={() => { signOutOthers(); setConfirmSignOutAll(false); }} className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg font-medium">Yes, sign out</button>
                      <button onClick={() => setConfirmSignOutAll(false)} className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1.5">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmSignOutAll(true)} className="text-xs text-red-500 hover:text-red-600 font-medium">Sign out all other</button>
                  )}
                </div>
                <div className="space-y-3">
                  {sessions.map((session: any) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${session.current ? "bg-sky-100 text-sky-600" : "bg-gray-200 text-gray-500"}`}>
                          <Smartphone size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{session.device}</p>
                          <p className="text-xs text-gray-500">{session.lastActive}</p>
                        </div>
                      </div>
                      {session.current ? (
                        <span className="text-xs bg-sky-50 text-sky-600 px-2.5 py-1 rounded-full font-medium">Current</span>
                      ) : confirmRevoke === session.id ? (
                        <div className="flex items-center gap-2">
                          <AlertTriangle size={14} className="text-red-500" />
                          <button onClick={() => { revokeSession(session.id); setConfirmRevoke(null); }} className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg font-medium">Revoke now</button>
                          <button onClick={() => setConfirmRevoke(null)} className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1.5">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmRevoke(session.id)} className="text-xs text-red-500 hover:text-red-600 font-medium">Revoke</button>
                      )}
                    </div>
                  ))}
                  {sessions.length === 1 && (
                    <p className="text-sm text-gray-400 text-center py-4">No other active sessions</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
