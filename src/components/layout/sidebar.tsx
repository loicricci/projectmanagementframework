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
  ExternalLink,
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

          {/* External Links */}
          <div className="mt-6 pt-4 border-t border-border">
            <p className="px-4 text-xs font-medium text-muted uppercase tracking-wider mb-2">
              External
            </p>
            <a
              href="https://trello.com/b/cKVIgi6v"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm border-l-4 border-transparent text-secondary hover:bg-surface hover:text-primary"
            >
              <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.656 1.343 3 3 3h18c1.656 0 3-1.344 3-3V3c0-1.657-1.344-3-3-3zM10.44 18.18c0 .795-.645 1.44-1.44 1.44H4.56c-.795 0-1.44-.645-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44H9c.795 0 1.44.645 1.44 1.44v13.62zm10.44-6c0 .794-.645 1.44-1.44 1.44h-4.44c-.795 0-1.44-.646-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44h4.44c.795 0 1.44.645 1.44 1.44v7.62z"/>
              </svg>
              <span>Trello Board</span>
              <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
            </a>
            <a
              href="https://app.teamgantt.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm border-l-4 border-transparent text-secondary hover:bg-surface hover:text-primary"
            >
              <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="3" width="8" height="4" rx="1" />
                <rect x="2" y="10" width="14" height="4" rx="1" />
                <rect x="2" y="17" width="10" height="4" rx="1" />
              </svg>
              <span>TeamGantt</span>
              <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
            </a>
            <a
              href="https://drive.proton.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm border-l-4 border-transparent text-secondary hover:bg-surface hover:text-primary"
            >
              <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6.5C3 5.67 3.67 5 4.5 5h15c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-15c-.83 0-1.5-.67-1.5-1.5v-11z"/>
                <path d="M8 10l4 3 4-3" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 14h8" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Proton Drive</span>
              <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
            </a>
            <a
              href="https://docuware.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm border-l-4 border-transparent text-secondary hover:bg-surface hover:text-primary"
            >
              <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" fill="none" stroke="white" strokeWidth="1.5"/>
              </svg>
              <span>Docuware</span>
              <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
            </a>
            <a
              href="https://go.xero.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm border-l-4 border-transparent text-secondary hover:bg-surface hover:text-primary"
            >
              <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 14.59L8 14l1.41-1.41L12 15.17l4.59-4.58L18 12l-6 6-1.41-1.41z"/>
              </svg>
              <span>Xero</span>
              <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
            </a>
            <a
              href="https://monitoring.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm border-l-4 border-transparent text-secondary hover:bg-surface hover:text-primary"
            >
              <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
              <span>Monitoring Platform</span>
              <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
            </a>
            <a
              href="/templates/budget-template.xlsx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm border-l-4 border-transparent text-secondary hover:bg-surface hover:text-primary"
            >
              <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#217346"/>
                <path d="M14 2v6h6" fill="#33a867"/>
                <text x="7" y="17" fontSize="7" fill="white" fontWeight="bold">XLS</text>
              </svg>
              <span>XLS Budget Template</span>
              <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
            </a>
          </div>
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
