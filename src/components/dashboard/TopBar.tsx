"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, ChevronDown, Settings, LogOut, User, FileText, CheckCircle, Clock } from "lucide-react";

const notifications = [
  { id: "1", icon: FileText, title: "New invoice INV-005 paid", desc: "Digital Marketing SA paid R 19,750", time: "2 min ago", unread: true },
  { id: "2", icon: CheckCircle, title: "Project milestone completed", desc: "TechCorp redesign — Phase 2 done", time: "1 hour ago", unread: true },
  { id: "3", icon: Clock, title: "Invoice INV-003 overdue", desc: "FreshFoods — R 12,500 past due", time: "3 hours ago", unread: false },
];

export default function TopBar() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Search */}
      <div className="relative w-96">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search contacts, invoices, projects..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
                <button className="text-xs text-sky-500 hover:text-sky-600">Mark all read</button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${n.unread ? "bg-sky-50/50" : ""}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${n.unread ? "bg-sky-100 text-sky-600" : "bg-gray-100 text-gray-500"}`}>
                        <n.icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{n.desc}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                      {n.unread && <div className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0 mt-1" />}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-100">
                <button className="w-full text-center text-sm text-sky-500 hover:text-sky-600 font-medium">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-3 pr-2 py-1.5 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <div className="w-8 h-8 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center text-sm font-bold">
              TM
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-900">Thabo M.</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50">
              <div className="p-4 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Thabo Mokoena</p>
                <p className="text-xs text-gray-500">thabo@bosssaas.co.za</p>
              </div>
              <div className="py-2">
                <a href="/app/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <User size={16} /> My Profile
                </a>
                <a href="/app/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings size={16} /> Settings
                </a>
                <div className="border-t border-gray-100 my-2" />
                <a href="/" className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut size={16} /> Sign Out
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
