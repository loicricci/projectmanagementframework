"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/layout";
import Link from "next/link";
import {
  FileText,
  GitBranch,
  Users,
  Wrench,
  Shield,
  ArrowRight,
} from "lucide-react";

const adminSections = [
  {
    href: "/admin/content",
    title: "Content Management",
    description: "Edit page content, descriptions, and static text blocks across the dashboard.",
    icon: FileText,
    stats: "7 pages",
  },
  {
    href: "/admin/phases",
    title: "Project Phases",
    description: "Manage the 6 project lifecycle phases, entry criteria, and exit gates.",
    icon: GitBranch,
    stats: "6 phases",
  },
  {
    href: "/admin/ceremonies",
    title: "Ceremonies",
    description: "Configure governance ceremonies, participants, inputs, and outputs.",
    icon: Users,
    stats: "5 ceremonies",
  },
  {
    href: "/admin/tools",
    title: "Tools & Stack",
    description: "Update tool references, URLs, and domain categorizations.",
    icon: Wrench,
    stats: "8 domains",
  },
  {
    href: "/admin/users",
    title: "Access Control",
    description: "Manage allowed domains and email addresses for user access.",
    icon: Shield,
    stats: "Role management",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Manage content, tools, phases, and user access for the Project Management Framework Dashboard."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.href} href={section.href}>
              <Card className="h-full hover:border-primary group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-surface flex items-center justify-center group-hover:bg-primary">
                      <Icon className="h-5 w-5 text-primary group-hover:text-white" />
                    </div>
                    <span className="text-xs text-muted">{section.stats}</span>
                  </div>
                  <CardTitle className="text-lg mt-3">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <span className="text-sm text-accent flex items-center gap-1">
                    Manage <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-h3 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <h3 className="font-medium text-primary mb-1">Add New Tool</h3>
            <p className="text-sm text-muted mb-3">Add a new tool to the Tools & Stack section.</p>
            <Link href="/admin/tools" className="text-sm text-accent hover:underline">
              Go to Tools →
            </Link>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium text-primary mb-1">Edit Phase Content</h3>
            <p className="text-sm text-muted mb-3">Update phase narratives and criteria.</p>
            <Link href="/admin/phases" className="text-sm text-accent hover:underline">
              Go to Phases →
            </Link>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium text-primary mb-1">Add Allowed Domain</h3>
            <p className="text-sm text-muted mb-3">Grant access to new email domains.</p>
            <Link href="/admin/users" className="text-sm text-accent hover:underline">
              Go to Access Control →
            </Link>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium text-primary mb-1">Update Ceremonies</h3>
            <p className="text-sm text-muted mb-3">Modify ceremony details and templates.</p>
            <Link href="/admin/ceremonies" className="text-sm text-accent hover:underline">
              Go to Ceremonies →
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
