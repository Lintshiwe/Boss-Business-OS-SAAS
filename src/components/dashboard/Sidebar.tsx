"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, FolderKanban, FileText,
  BarChart3, Zap, Settings, LogOut, ChevronLeft, ChevronRight
} from "lucide-react";
import ColorfulAvatar from "../ui/ColorfulAvatar";
import { cn } from "../../lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/app" },
  { icon: Users, label: "CRM", href: "/app/crm" },
  { icon: FolderKanban, label: "Projects", href: "/app/projects" },
  { icon: FileText, label: "Invoices", href: "/app/invoices" },
  { icon: Users, label: "Clients", href: "/app/clients" },
  { icon: BarChart3, label: "Analytics", href: "/app/analytics" },
  { icon: Zap, label: "Automation", href: "/app/automation" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const currentPath = typeof window !== "undefined" ? (window?.location?.pathname || "/app") : "/app";
  const [profile, setProfile] = useState({ firstName: "Thabo", lastName: "Mokoena", displayName: "Thabo M.", avatarUrl: "" });

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("boss_profile");
      if (stored) setProfile(JSON.parse(stored));
    } catch {}
  }, []);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-gray-100 text-gray-900 flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <img src="/images/logo.png" alt="BOSS" className="h-8 w-auto" />
        {!collapsed && (
          <span className="ml-2 text-sm font-bold text-gray-900">BOSS</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.href || currentPath.startsWith(item.href + "/");
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"
              )}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </a>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <ColorfulAvatar name={`${profile.firstName} ${profile.lastName}`} size="sm" ring imageSrc={profile.avatarUrl || null} />
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{profile.displayName}</p>
              <p className="text-xs text-gray-400 truncate">Admin</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="p-2 space-y-1">
        <a
          href="/app/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
        >
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </a>
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
        >
          <LogOut size={20} />
          {!collapsed && <span>Back to Site</span>}
        </a>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 bg-gray-200 border border-gray-300 rounded-full p-1 text-gray-500 hover:text-gray-900"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}
