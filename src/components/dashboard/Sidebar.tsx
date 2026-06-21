"use client";

import { useState } from "react";
import {
  LayoutDashboard, Users, FolderKanban, FileText,
  BarChart3, Zap, Settings, LogOut, ChevronLeft, ChevronRight
} from "lucide-react";
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

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const currentPath = typeof window !== "undefined" ? (window?.location?.pathname || "/app") : "/app";

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-gray-900 text-white flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-800">
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
                  ? "bg-primary/20 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              )}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </a>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-gray-800 space-y-1">
        <a
          href="/app/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </a>
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <LogOut size={20} />
          {!collapsed && <span>Back to Site</span>}
        </a>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-gray-800 border border-gray-700 rounded-full p-1 text-gray-400 hover:text-white"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}
