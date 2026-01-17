import { Breadcrumb, PageHeader } from "@/components/layout";
import { ToolsGrid } from "@/components/content/tools-grid";

// This data would normally come from the database
const toolCategories = [
  {
    domain: "Project Management",
    tools: [
      {
        id: "clickup",
        name: "ClickUp",
        description: "Primary project and task management platform for day-to-day project activities.",
        whenToUse: "Use for all task management, team collaboration, sprint planning, and project tracking. Create spaces for each project.",
        externalUrl: "https://clickup.com",
        icon: "layout-grid",
      },
      {
        id: "ms-project",
        name: "Microsoft Project",
        description: "Enterprise project planning tool for complex scheduling and resource management.",
        whenToUse: "Use for master project schedules, Gantt charts, resource leveling, and executive reporting. Sync milestones to ClickUp.",
        externalUrl: "#",
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
        id: "azure",
        name: "Microsoft Azure",
        description: "Cloud computing platform for hosting, infrastructure, and cloud services.",
        whenToUse: "Use for cloud infrastructure, application hosting, database services, and DevOps pipelines.",
        externalUrl: "#",
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
        id: "sharepoint",
        name: "SharePoint",
        description: "Collaboration platform for working documents and team file sharing.",
        whenToUse: "Use for work-in-progress documents, team collaboration, and draft sharing. Move final versions to DocuWare.",
        externalUrl: "#",
        icon: "share-2",
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
        id: "outlook",
        name: "Microsoft Outlook",
        description: "Email and calendar platform for business communication and scheduling.",
        whenToUse: "Use for all business email, meeting scheduling, and calendar management.",
        externalUrl: "#",
        icon: "mail",
      },
      {
        id: "teams",
        name: "Microsoft Teams",
        description: "Collaboration hub for chat, video meetings, and team communication.",
        whenToUse: "Use for real-time communication, video conferencing, and quick team discussions.",
        externalUrl: "#",
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
