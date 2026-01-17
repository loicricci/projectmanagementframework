import { Breadcrumb, PageHeader } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, FileText, Calendar, ExternalLink, Lock } from "lucide-react";

const reportTypes = [
  {
    category: "Project Reporting",
    reports: [
      {
        name: "Weekly Status Report",
        frequency: "Weekly (Friday)",
        audience: "Project Team, Stakeholders",
        description: "Progress update on tasks, milestones, risks, and upcoming activities.",
        templateRef: "TPL-RPT-001",
      },
      {
        name: "Monthly Project Review",
        frequency: "Monthly",
        audience: "Project Review Board",
        description: "Comprehensive project health assessment including budget, schedule, and quality metrics.",
        templateRef: "TPL-RPT-002",
      },
      {
        name: "Phase Gate Report",
        frequency: "Per Gate",
        audience: "Governance Committee",
        description: "Formal assessment for phase transitions with recommendations.",
        templateRef: "TPL-RPT-003",
      },
    ],
  },
  {
    category: "Board Reporting",
    reports: [
      {
        name: "Executive Summary",
        frequency: "Monthly",
        audience: "Board of Directors",
        description: "High-level portfolio status, key decisions, and strategic updates.",
        templateRef: "TPL-RPT-010",
      },
      {
        name: "Financial Report",
        frequency: "Monthly",
        audience: "Board, Finance Committee",
        description: "Budget performance, cash flow, and financial forecasts.",
        templateRef: "TPL-RPT-011",
      },
      {
        name: "Risk Report",
        frequency: "Quarterly",
        audience: "Board, Audit Committee",
        description: "Enterprise risk assessment and mitigation status.",
        templateRef: "TPL-RPT-012",
      },
    ],
  },
  {
    category: "Operational Reporting",
    reports: [
      {
        name: "Resource Utilization",
        frequency: "Weekly",
        audience: "Operations, HR",
        description: "Team allocation, capacity planning, and utilization metrics.",
        templateRef: "TPL-RPT-020",
      },
      {
        name: "Quality Metrics",
        frequency: "Monthly",
        audience: "Quality, Operations",
        description: "Defect rates, inspection results, and quality KPIs.",
        templateRef: "TPL-RPT-021",
      },
      {
        name: "Vendor Performance",
        frequency: "Quarterly",
        audience: "Procurement, Operations",
        description: "Supplier scorecards, delivery performance, and compliance.",
        templateRef: "TPL-RPT-022",
      },
    ],
  },
];

const dashboards = [
  {
    name: "Portfolio Dashboard",
    description: "Real-time overview of all active projects, health indicators, and key milestones.",
    platform: "Power BI",
    access: "Authenticated users",
  },
  {
    name: "Financial Dashboard",
    description: "Budget tracking, cost performance, and financial forecasts across projects.",
    platform: "Power BI",
    access: "Finance, Management",
  },
  {
    name: "Resource Dashboard",
    description: "Team allocation, capacity planning, and utilization visualization.",
    platform: "Power BI",
    access: "HR, Management",
  },
  {
    name: "Quality Dashboard",
    description: "Quality metrics, inspection status, and defect tracking.",
    platform: "Power BI",
    access: "Quality, Operations",
  },
];

const cadence = [
  { period: "Daily", activities: "Standup notes, blocker logs" },
  { period: "Weekly", activities: "Status reports, resource updates" },
  { period: "Bi-weekly", activities: "Project reviews, sprint retrospectives" },
  { period: "Monthly", activities: "Board reports, financial summaries, KPI reviews" },
  { period: "Quarterly", activities: "Risk assessments, vendor reviews, strategic updates" },
  { period: "Per Gate", activities: "Phase gate reports, decision records" },
];

export default function ReportingPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Reporting" }]} />
      
      <PageHeader
        title="Reporting"
        description="This section provides guidance on reporting requirements, templates, and access to dashboards. Consistent reporting ensures transparency and enables informed decision-making."
      />

      {/* Reporting Cadence */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle>Reporting Cadence</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {cadence.map((item, index) => (
              <div key={index} className="p-3 border border-border">
                <Badge variant="muted" className="mb-2">{item.period}</Badge>
                <p className="text-sm text-secondary">{item.activities}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Types */}
      <div className="mb-6">
        <h2 className="text-h2 mb-4">Report Types & Templates</h2>
        <div className="space-y-4">
          {reportTypes.map((category, catIndex) => (
            <Card key={catIndex}>
              <CardHeader>
                <CardTitle className="text-lg">{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="table-institutional">
                    <thead>
                      <tr>
                        <th>Report</th>
                        <th>Frequency</th>
                        <th>Audience</th>
                        <th>Template</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.reports.map((report, index) => (
                        <tr key={index}>
                          <td>
                            <div>
                              <span className="font-medium">{report.name}</span>
                              <p className="text-xs text-muted mt-1">{report.description}</p>
                            </div>
                          </td>
                          <td>
                            <Badge variant="outline">{report.frequency}</Badge>
                          </td>
                          <td className="text-sm">{report.audience}</td>
                          <td>
                            <code className="text-xs text-accent">{report.templateRef}</code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Dashboards */}
      <div className="mb-6">
        <h2 className="text-h2 mb-4">Live Dashboards</h2>
        <div className="bg-surface border border-border p-4 mb-4">
          <p className="text-sm text-secondary flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Dashboard links are only visible to authenticated users with appropriate access.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {dashboards.map((dashboard, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{dashboard.name}</CardTitle>
                  <Badge variant="muted">{dashboard.platform}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-secondary mb-3">{dashboard.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Access: {dashboard.access}</span>
                  <button className="text-sm text-accent flex items-center gap-1 opacity-50 cursor-not-allowed">
                    <ExternalLink className="h-4 w-4" />
                    Open Dashboard
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Document Repositories */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle>Document Repositories</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-secondary mb-4">
            Historical reports and documentation are stored in DocuWare for reference and audit purposes.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 border border-border">
              <h4 className="font-semibold text-primary mb-2">Project Reports</h4>
              <p className="text-sm text-secondary mb-3">Weekly, monthly, and gate reports for all projects.</p>
              <button className="text-sm text-accent flex items-center gap-1 opacity-50 cursor-not-allowed">
                <ExternalLink className="h-4 w-4" />
                View in DocuWare
              </button>
            </div>
            <div className="p-4 border border-border">
              <h4 className="font-semibold text-primary mb-2">Board Packages</h4>
              <p className="text-sm text-secondary mb-3">Monthly board materials and meeting records.</p>
              <button className="text-sm text-accent flex items-center gap-1 opacity-50 cursor-not-allowed">
                <ExternalLink className="h-4 w-4" />
                View in DocuWare
              </button>
            </div>
            <div className="p-4 border border-border">
              <h4 className="font-semibold text-primary mb-2">Custom Reports</h4>
              <p className="text-sm text-secondary mb-3">Ad-hoc analyses and special reports.</p>
              <button className="text-sm text-accent flex items-center gap-1 opacity-50 cursor-not-allowed">
                <ExternalLink className="h-4 w-4" />
                View in DocuWare
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
