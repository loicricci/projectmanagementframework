import { Breadcrumb, PageHeader } from "@/components/layout";
import { ToolsGrid } from "@/components/content/tools-grid";

// This data would normally come from the database
const toolCategories = [
  {
    domain: "Project Management",
    tools: [
      {
        id: "trello",
        name: "Trello",
        description: "Visual task management platform for daily task follow-up and team alignment.",
        whenToUse: "Use for daily task tracking, team collaboration, sprint boards, and project visibility. Create boards for each project phase.",
        externalUrl: "https://trello.com/b/cKVIgi6v",
        icon: "layout-grid",
      },
      {
        id: "teamgantt",
        name: "TeamGantt",
        description: "Collaborative Gantt chart software for project scheduling and timeline management.",
        whenToUse: "Use for master project schedules, Gantt charts, resource planning, and visual project timelines. Ideal for sharing schedules with stakeholders.",
        externalUrl: "https://app.teamgantt.com/",
        icon: "gantt-chart",
      },
    ],
  },
  {
    domain: "Finance",
    tools: [
      {
        id: "xero",
        name: "Xero",
        description: "Cloud accounting platform for financial management, invoicing, and reporting.",
        whenToUse: "Use for all financial transactions, invoice processing, expense management, and financial reporting.",
        externalUrl: "https://xero.com",
        icon: "calculator",
      },
      {
        id: "excel-budget",
        name: "Budget Templates",
        description: "Standardized Excel templates for project budgeting and cost tracking.",
        whenToUse: "Use for initial budget creation, cost estimates, and detailed financial breakdowns before entry into Xero.",
        externalUrl: "#",
        docuwareRef: "TPL-FIN-001",
        icon: "file-spreadsheet",
      },
    ],
  },
  {
    domain: "HR & Resources",
    tools: [
      {
        id: "bamboohr",
        name: "BambooHR",
        description: "Human resources management system for employee data and HR processes.",
        whenToUse: "Use for employee onboarding, time off requests, performance reviews, and organizational information.",
        externalUrl: "#",
        icon: "users",
      },
    ],
  },
  {
    domain: "Technology",
    tools: [
      {
        id: "github",
        name: "GitHub",
        description: "Version control and code collaboration platform for software development.",
        whenToUse: "Use for all code repositories, version control, code reviews, and CI/CD pipelines.",
        externalUrl: "https://github.com",
        icon: "github",
      },
      {
        id: "google-cloud",
        name: "Google Cloud",
        description: "Cloud computing platform for hosting, infrastructure, and cloud services.",
        whenToUse: "Use for cloud infrastructure, application hosting, database services, and DevOps pipelines.",
        externalUrl: "https://console.cloud.google.com",
        icon: "cloud",
      },
    ],
  },
  {
    domain: "Documentation",
    tools: [
      {
        id: "docuware",
        name: "DocuWare",
        description: "Enterprise document management system for official document storage and retrieval.",
        whenToUse: "Use for all official documents: contracts, decision records, specifications, and approved deliverables. Single source of truth for documentation.",
        externalUrl: "#",
        icon: "folder-open",
      },
      {
        id: "proton-drive",
        name: "Proton Drive",
        description: "Secure cloud storage platform for working documents and team file sharing.",
        whenToUse: "Use for work-in-progress documents, team collaboration, and draft sharing. Move final versions to DocuWare.",
        externalUrl: "https://drive.proton.me",
        icon: "hard-drive",
      },
    ],
  },
  {
    domain: "Legal",
    tools: [
      {
        id: "docusign",
        name: "DocuSign",
        description: "Electronic signature platform for contract execution and agreement signing.",
        whenToUse: "Use for all contracts requiring signatures. Signed documents automatically archive to DocuWare.",
        externalUrl: "#",
        icon: "pen-tool",
      },
    ],
  },
  {
    domain: "Admin & Communication",
    tools: [
      {
        id: "gmail",
        name: "Gmail",
        description: "Email and calendar platform for business communication and scheduling.",
        whenToUse: "Use for all business email, meeting scheduling, and calendar management.",
        externalUrl: "https://mail.google.com",
        icon: "mail",
      },
      {
        id: "google-workspace",
        name: "Google Workspace",
        description: "Collaboration suite for chat, video meetings, and team communication (Meet, Chat, Calendar).",
        whenToUse: "Use for real-time communication, video conferencing, and quick team discussions.",
        externalUrl: "https://workspace.google.com",
        icon: "message-square",
      },
    ],
  },
  {
    domain: "Reporting",
    tools: [
      {
        id: "powerbi",
        name: "Power BI",
        description: "Business intelligence platform for data visualization and reporting dashboards.",
        whenToUse: "Use for executive dashboards, KPI tracking, and data-driven reports.",
        externalUrl: "#",
        icon: "bar-chart-3",
      },
    ],
  },
];

export default function ToolsPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Tools & Stack" }]} />
      
      <PageHeader
        title="Tools & Stack"
        description="This section provides guidance on which tools to use for different purposes. Each tool serves a specific function in our workflow. Use this guide to ensure you're using the right tool for the right task."
      />

      <div className="bg-surface border border-border p-4 mb-8">
        <p className="text-sm text-secondary">
          <strong className="text-primary">Note:</strong> Tool links are only visible to authenticated users. 
          Sign in with your company email to access direct links to external systems.
        </p>
      </div>

      <ToolsGrid categories={toolCategories} />
    </div>
  );
}
