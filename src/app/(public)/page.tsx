import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/layout";
import { PhaseTimeline } from "@/components/content/phase-timeline";
import { prisma } from "@/lib/prisma";
import {
  FileText,
  GitBranch,
  Users,
  Wrench,
  FolderOpen,
  BarChart3,
  ArrowRight,
  Target,
  Compass,
  BookOpen,
} from "lucide-react";

const sections = [
  {
    href: "/framework",
    title: "Framework",
    description: "Understand the project management framework, roles, responsibilities, and governance model.",
    icon: FileText,
  },
  {
    href: "/lifecycle",
    title: "Project Lifecycle",
    description: "Navigate through the 6 phases of project delivery from Pre-Design to Site Run.",
    icon: GitBranch,
  },
  {
    href: "/governance",
    title: "Governance & Ceremonies",
    description: "Learn about governance committees, review gates, and decision-making processes.",
    icon: Users,
  },
  {
    href: "/tools",
    title: "Tools & Stack",
    description: "Discover which tools to use for project management, finance, HR, and documentation.",
    icon: Wrench,
  },
  {
    href: "/documentation",
    title: "Documentation",
    description: "Understand document types, approval processes, and where documents are stored.",
    icon: FolderOpen,
  },
  {
    href: "/reporting",
    title: "Reporting",
    description: "Access project reports, board reporting templates, and operational dashboards.",
    icon: BarChart3,
  },
];

const features = [
  {
    icon: Target,
    title: "Single Access Point",
    description: "One place to understand how the company operates and delivers projects.",
  },
  {
    icon: Compass,
    title: "Navigation Layer",
    description: "Find the right tools and documents without searching multiple systems.",
  },
  {
    icon: BookOpen,
    title: "Operating Manual",
    description: "Clear documentation of processes, governance, and best practices.",
  },
];

export default async function HomePage() {
  // Fetch phases and current phase from database
  const [phases, settings] = await Promise.all([
    prisma.phase.findMany({
      orderBy: { order: "asc" },
      include: { ceremony: true },
    }),
    prisma.projectSettings.findUnique({
      where: { id: "default" },
      include: { currentPhase: true },
    }),
  ]);

  // Transform phases for the timeline component
  const timelinePhases = phases.map((phase) => ({
    id: phase.id,
    order: phase.order,
    name: phase.name,
    shortName: phase.shortName,
    ceremony: phase.ceremony?.name,
  }));

  // Get current phase order number
  const currentPhaseOrder = settings?.currentPhase?.order;
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-surface border border-border p-8 mb-8">
        <PageHeader
          title="Project Management Framework"
          description="This dashboard is your single access point for understanding how we work. It provides clarity on project lifecycle, governance, tools, and documentation without replacing the systems you use daily."
        />
        
        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">{feature.title}</h3>
                  <p className="text-sm text-secondary">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lifecycle Overview */}
      <div className="mb-8">
        <PhaseTimeline phases={timelinePhases} currentPhase={currentPhaseOrder} />
      </div>

      {/* What This Dashboard Is */}
      <div className="mb-8">
        <h2 className="text-h2 mb-4">What This Dashboard Is</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-success mb-3">This Dashboard IS:</h3>
              <ul className="space-y-2 text-sm text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  A clarity layer for understanding processes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  A navigation tool to find the right resources
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  An operating manual for how we work
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  A guide to governance and ceremonies
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-warning mb-3">This Dashboard is NOT:</h3>
              <ul className="space-y-2 text-sm text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-warning">✗</span>
                  A project management tool (use Trello, TeamGantt)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning">✗</span>
                  A document storage system (use DocuWare)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning">✗</span>
                  An accounting system (use Xero)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning">✗</span>
                  A workflow engine
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sections Grid */}
      <div>
        <h2 className="text-h2 mb-4">Explore the Framework</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.href} href={section.href}>
                <Card className="h-full hover:border-primary group flex flex-col">
                  <CardHeader className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-surface flex items-center justify-center group-hover:bg-primary">
                        <Icon className="h-5 w-5 text-primary group-hover:text-white" />
                      </div>
                      <CardTitle>{section.title}</CardTitle>
                    </div>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <span className="text-sm text-accent flex items-center gap-1">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Start */}
      <div className="mt-8 bg-primary text-white p-6">
        <h2 className="text-xl font-semibold mb-2">New to the Framework?</h2>
        <p className="text-primary-100 mb-4">
          Start with the Framework section to understand the foundation, then explore the Project Lifecycle to see how we deliver projects.
        </p>
        <div className="flex gap-4">
          <Link
            href="/framework"
            className="bg-white text-primary px-4 py-2 text-sm font-medium hover:bg-primary-100"
          >
            Start with Framework
          </Link>
          <Link
            href="/lifecycle"
            className="border border-white text-white px-4 py-2 text-sm font-medium hover:bg-primary-700"
          >
            View Project Lifecycle
          </Link>
        </div>
      </div>
    </div>
  );
}
