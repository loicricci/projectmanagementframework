"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  FileText,
  GitBranch,
  Users,
  Wrench,
  FolderOpen,
  BarChart3,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const navigationItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/framework", label: "Framework", icon: FileText },
  { href: "/lifecycle", label: "Project Lifecycle", icon: GitBranch },
  { href: "/governance", label: "Governance & Ceremonies", icon: Users },
  { href: "/tools", label: "Tools & Stack", icon: Wrench },
  { href: "/documentation", label: "Documentation", icon: FolderOpen },
  { href: "/reporting", label: "Reporting", icon: BarChart3 },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-border z-40 overflow-y-auto",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="py-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-sm border-l-4",
                      isActive
                        ? "bg-surface border-l-primary text-primary font-medium"
                        : "border-transparent text-secondary hover:bg-surface hover:text-primary"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-surface">
          <p className="text-xs text-muted text-center">
            PM Framework v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
