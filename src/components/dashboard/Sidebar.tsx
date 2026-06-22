"use client";

import { useState } from "react";
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

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-sky-950 text-white flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sky-800/50">
        <img src="/images/logo.png" alt="BOSS" className="h-8 w-auto" />
        {!collapsed && (
          <span className="ml-2 text-sm font-bold gradient-text">BOSS</span>
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
                  ? "bg-sky-500/20 text-white"
                  : "text-sky-300/70 hover:text-white hover:bg-sky-800/50"
              )}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </a>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-sky-800/50">
        <div className="flex items-center gap-3">
          <ColorfulAvatar name="Thabo Mokoena" size="sm" ring />
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">Thabo M.</p>
              <p className="text-xs text-sky-300/50 truncate">Admin</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="p-2 space-y-1">
        <a
          href="/app/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sky-300/70 hover:text-white hover:bg-sky-800/50 transition-colors"
        >
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </a>
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sky-300/70 hover:text-white hover:bg-sky-800/50 transition-colors"
        >
          <LogOut size={20} />
          {!collapsed && <span>Back to Site</span>}
        </a>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 bg-sky-800 border border-sky-700 rounded-full p-1 text-sky-300 hover:text-white"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}
