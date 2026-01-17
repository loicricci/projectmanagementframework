"use client";

import { useState } from "react";
import { Header, Sidebar, Footer } from "@/components/layout";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        isMenuOpen={sidebarOpen}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 pt-16 lg:pl-64">
        <div className="p-6 lg:p-8 max-w-7xl">
          {children}
        </div>
      </main>
      
      <div className="lg:pl-64">
        <Footer />
      </div>
    </div>
  );
}
