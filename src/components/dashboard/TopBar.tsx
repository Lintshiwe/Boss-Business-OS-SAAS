"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, Bell, ChevronDown, Settings, LogOut, User, FileText, CheckCircle, Clock, Trash2, Check, FolderKanban, Users, X, Plus } from "lucide-react";
import ColorfulAvatar from "../ui/ColorfulAvatar";

interface Notification {
  id: string;
  icon: any;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  href: string;
}

const initialNotifications: Notification[] = [
  { id: "1", icon: FileText, title: "New invoice INV-005 paid", desc: "Digital Marketing SA paid R 19,750", time: "2 min ago", unread: true, href: "/app/invoices" },
  { id: "2", icon: CheckCircle, title: "Project milestone completed", desc: "TechCorp redesign - Phase 2 done", time: "1 hour ago", unread: true, href: "/app/projects" },
  { id: "3", icon: Clock, title: "Invoice INV-003 overdue", desc: "FreshFoods - R 12,500 past due", time: "3 hours ago", unread: false, href: "/app/invoices" },
  { id: "4", icon: Users, title: "New lead assigned", desc: "Naledi Dlamini from Digital Marketing SA", time: "5 hours ago", unread: false, href: "/app/crm" },
  { id: "5", icon: FolderKanban, title: "Project BuildRight CRM started", desc: "New project created by Sarah", time: "1 day ago", unread: false, href: "/app/projects" },
];

const randomNotifications: Omit<Notification, "id">[] = [
  { icon: FileText, title: "Invoice INV-006 created", desc: "New invoice for R 8,500 sent to GreenEnergy", time: "Just now", unread: true, href: "/app/invoices" },
  { icon: CheckCircle, title: "Task completed", desc: "Thabo finished wireframes for BuildRight", time: "Just now", unread: true, href: "/app/projects" },
  { icon: Users, title: "New contact added", desc: "Noluthando Zulu from FreshFoods SA", time: "Just now", unread: true, href: "/app/crm" },
  { icon: Clock, title: "Project deadline tomorrow", desc: "TechCorp API integration due", time: "Just now", unread: true, href: "/app/projects" },
  { icon: FolderKanban, title: "New project created", desc: "Digital Marketing SA - Website Redesign", time: "Just now", unread: true, href: "/app/projects" },
];

interface Toast {
  id: string;
  icon: any;
  title: string;
  desc: string;
}

export default function TopBar() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
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

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNotifClick = (notif: Notification) => {
    markAsRead(notif.id);
    setNotifOpen(false);
    window.location.href = notif.href;
  };

  const addToast = useCallback((toast: Toast) => {
    setToasts(prev => [...prev, toast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toast.id));
    }, 4000);
  }, []);

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const simulateNotification = () => {
    const random = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
    const id = `sim-${Date.now()}`;
    const newNotif: Notification = { ...random, id };
    setNotifications(prev => [newNotif, ...prev]);
    addToast({ id, icon: random.icon, title: random.title, desc: random.desc });
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-slideIn pointer-events-auto w-80 bg-white rounded-xl shadow-lg border border-gray-100 p-4 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => { dismissToast(t.id); window.location.href = notifications.find(n => n.id === t.id)?.href || "/app"; }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                <t.icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{t.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); dismissToast(t.id); }} className="p-1 text-gray-400 hover:text-gray-600 rounded flex-shrink-0">
                <X size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="relative w-96">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search contacts, invoices, projects..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400" />
      </div>

      <div className="flex items-center gap-4">
        {/* Simulate notification button */}
        <button onClick={simulateNotification} className="p-2 text-gray-400 hover:text-sky-500 hover:bg-sky-50 rounded-xl transition-colors" title="Simulate new notification">
          <Plus size={18} />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }} className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 bg-sky-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 animate-slideIn">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-96 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 text-sm">Notifications ({unreadCount} unread)</h3>
                <button onClick={markAllRead} className="text-xs text-sky-500 hover:text-sky-600 flex items-center gap-1"><Check size={12} /> Mark all read</button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 && (
                  <div className="p-8 text-center text-gray-400 text-sm">No notifications</div>
                )}
                {notifications.map((n) => (
                  <div key={n.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors group ${n.unread ? "bg-sky-50/50" : ""}`} onClick={() => handleNotifClick(n)}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${n.unread ? "bg-sky-100 text-sky-600" : "bg-gray-100 text-gray-500"}`}>
                        <n.icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!n.unread && <button onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }} className="p-1 text-gray-400 hover:text-sky-500 rounded" title="Mark as read"><Check size={12} /></button>}
                        <button onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }} className="p-1 text-gray-400 hover:text-gray-600 rounded" title="Delete"><Trash2 size={12} /></button>
                      </div>
                      {n.unread && <div className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0 mt-1" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative" ref={profileRef}>
          <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }} className="flex items-center gap-2 pl-3 pr-2 py-1.5 hover:bg-gray-100 rounded-xl transition-colors">
            <ColorfulAvatar name="Thabo Mokoena" size="sm" ring />
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
                <a href="/app/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"><User size={16} /> My Profile</a>
                <a href="/app/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"><Settings size={16} /> Settings</a>
                <div className="border-t border-gray-100 my-2" />
                <a href="/" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"><LogOut size={16} /> Sign Out</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
