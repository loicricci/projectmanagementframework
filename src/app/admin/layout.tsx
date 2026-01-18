"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  GitBranch,
  Users,
  Wrench,
  Settings,
  Shield,
  UserCog,
} from "lucide-react";

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/phases", label: "Phases", icon: GitBranch },
  { href: "/admin/ceremonies", label: "Ceremonies", icon: Users },
  { href: "/admin/roles", label: "Role Assignments", icon: UserCog },
  { href: "/admin/tools", label: "Tools", icon: Wrench },
  { href: "/admin/users", label: "Access Control", icon: Shield },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted">Loading...</div>
      </div>
    );
  }

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        isMenuOpen={sidebarOpen}
      />

      <div className="flex flex-1 pt-16">
        {/* Admin Sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={cn(
            "fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-border z-40 overflow-y-auto",
            "lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 text-primary">
              <Settings className="h-5 w-5" />
              <span className="font-semibold">Admin Panel</span>
            </div>
          </div>

          <nav className="py-4">
            <ul className="space-y-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
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

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-surface">
            <Link
              href="/"
              className="text-sm text-accent hover:underline flex items-center gap-1"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6 lg:p-8">
          <div className="max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
