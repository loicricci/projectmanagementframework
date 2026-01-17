import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Seed Ceremonies
  const ceremonies = await Promise.all([
    prisma.ceremony.upsert({
      where: { id: "ceremony-1" },
      update: {},
      create: {
        id: "ceremony-1",
        name: "Pre-Design Gate",
        purpose: "Validate project feasibility and authorize design phase investment",
        participants: ["Project Sponsor", "Project Manager", "Finance Lead", "Technical Lead"],
        inputs: [
          "Business case document",
          "Preliminary scope statement",
          "High-level budget estimate",
          "Risk assessment",
        ],
        outputs: [
          "Gate decision (Go/No-Go/Conditional)",
          "Decision Record (Procès-verbal)",
          "Design phase authorization",
          "Resource allocation approval",
        ],
        templateLink: "TPL-GATE-001",
      },
    }),
    prisma.ceremony.upsert({
      where: { id: "ceremony-2" },
      update: {},
      create: {
        id: "ceremony-2",
        name: "Design Validation Gate",
        purpose: "Confirm design completeness and authorize procurement activities",
        participants: ["Project Sponsor", "Project Manager", "Engineering Lead", "Procurement Lead"],
        inputs: [
          "Technical design package",
          "Cost estimate (±10%)",
          "Procurement strategy",
          "Updated risk register",
        ],
        outputs: [
          "Gate decision",
          "Decision Record",
          "Procurement authorization",
          "Design freeze confirmation",
        ],
        templateLink: "TPL-GATE-002",
      },
    }),
    prisma.ceremony.upsert({
      where: { id: "ceremony-3" },
      update: {},
      create: {
        id: "ceremony-3",
        name: "Master Review",
        purpose: "Final validation before major financial commitments and build start",
        participants: ["Governance Committee", "Project Team", "Legal", "Finance"],
        inputs: [
          "Master project plan",
          "Final contracts package",
          "Complete budget breakdown",
          "Implementation timeline",
        ],
        outputs: [
          "Master Review decision",
          "Contract execution authorization",
          "Budget commitment approval",
          "Build phase kickoff",
        ],
        templateLink: "TPL-GATE-003",
      },
    }),
    prisma.ceremony.upsert({
      where: { id: "ceremony-4" },
      update: {},
      create: {
        id: "ceremony-4",
        name: "Handover Review",
        purpose: "Validate readiness for site transition and operational handoff",
        participants: ["Project Manager", "Operations Manager", "Site Lead", "Quality Lead"],
        inputs: [
          "Delivery completion report",
          "Documentation package",
          "Training records",
          "Outstanding issues list",
        ],
        outputs: [
          "Handover decision",
          "Site acceptance authorization",
          "Responsibility transfer",
          "Support arrangement confirmation",
        ],
        templateLink: "TPL-GATE-004",
      },
    }),
    prisma.ceremony.upsert({
      where: { id: "ceremony-5" },
      update: {},
      create: {
        id: "ceremony-5",
        name: "Operational Review",
        purpose: "Monitor ongoing project execution and operational performance",
        participants: ["Project Manager", "Team Leads", "Stakeholder representatives"],
        inputs: [
          "Progress report",
          "Budget status",
          "Risk and issue log",
          "Change requests",
        ],
        outputs: [
          "Status acknowledgment",
          "Action items",
          "Escalation decisions",
          "Next review schedule",
        ],
        templateLink: "TPL-REVIEW-001",
      },
    }),
  ]);

  console.log(`✅ Created ${ceremonies.length} ceremonies`);

  // Seed Phases
  const phases = await Promise.all([
    prisma.phase.upsert({
      where: { id: "phase-0" },
      update: {},
      create: {
        id: "phase-0",
        order: 0,
        name: "Pre-Design",
        shortName: "Phase 0",
        narrative:
          "The Pre-Design phase establishes the project foundation. During this phase, we validate the business case, define high-level requirements, and assess feasibility. The goal is to ensure the project is viable before committing design resources.",
        entryCriteria: [
          "Business case submitted and approved",
          "Initial budget allocation confirmed",
          "Project sponsor identified",
          "Preliminary scope document available",
        ],
        exitGate: [
          "Feasibility study completed",
          "Risk assessment documented",
          "High-level timeline established",
          "Resource requirements identified",
          "Pre-Design Gate approval obtained",
        ],
        toolLinks: [
          { name: "ClickUp", url: "https://clickup.com", description: "Create initial project space" },
          { name: "MS Project", url: "#", description: "High-level timeline" },
        ],
        docuwareLinks: [
          { name: "Business Case Template", ref: "TPL-001" },
          { name: "Feasibility Study Template", ref: "TPL-002" },
        ],
        ceremonyId: "ceremony-1",
      },
    }),
    prisma.phase.upsert({
      where: { id: "phase-1" },
      update: {},
      create: {
        id: "phase-1",
        order: 1,
        name: "Design",
        shortName: "Phase 1",
        narrative:
          "The Design phase transforms requirements into detailed specifications. Engineering teams develop technical designs, procurement prepares sourcing strategies, and finance refines cost estimates. This phase produces the documentation needed for build decisions.",
        entryCriteria: [
          "Pre-Design Gate approval",
          "Design team assigned",
          "Detailed requirements documented",
          "Design budget confirmed",
        ],
        exitGate: [
          "Technical designs completed and reviewed",
          "Cost estimates finalized",
          "Procurement strategy defined",
          "Design Validation Gate approval",
        ],
        toolLinks: [
          { name: "ClickUp", url: "https://clickup.com", description: "Design task management" },
          { name: "AutoCAD", url: "#", description: "Technical drawings" },
        ],
        docuwareLinks: [
          { name: "Design Specification Template", ref: "TPL-003" },
          { name: "Technical Review Checklist", ref: "TPL-004" },
        ],
        ceremonyId: "ceremony-2",
      },
    }),
    prisma.phase.upsert({
      where: { id: "phase-2" },
      update: {},
      create: {
        id: "phase-2",
        order: 2,
        name: "Master Review",
        shortName: "Phase 2",
        narrative:
          "The Master Review phase is the critical checkpoint before major commitments. All designs are frozen, contracts are finalized, and the complete project plan is validated. This is the last opportunity to adjust before build begins.",
        entryCriteria: [
          "Design Validation Gate approval",
          "All designs at final revision",
          "Contract negotiations completed",
          "Full project plan documented",
        ],
        exitGate: [
          "Master project plan approved",
          "Contracts signed",
          "Budget fully committed",
          "Master Review approval",
        ],
        toolLinks: [
          { name: "MS Project", url: "#", description: "Master schedule" },
          { name: "DocuSign", url: "#", description: "Contract execution" },
        ],
        docuwareLinks: [
          { name: "Master Review Checklist", ref: "TPL-005" },
          { name: "Contract Package", ref: "DOC-001" },
        ],
        ceremonyId: "ceremony-3",
      },
    }),
    prisma.phase.upsert({
      where: { id: "phase-3" },
      update: {},
      create: {
        id: "phase-3",
        order: 3,
        name: "Build & Supply Chain",
        shortName: "Phase 3",
        narrative:
          "The Build & Supply Chain phase executes the project plan. Manufacturing proceeds, suppliers deliver components, and quality control ensures specifications are met. Progress is tracked against the master schedule with regular status updates.",
        entryCriteria: [
          "Master Review approval",
          "Purchase orders issued",
          "Manufacturing plans released",
          "Quality control plan active",
        ],
        exitGate: [
          "All components manufactured/delivered",
          "Quality inspections passed",
          "Documentation packages complete",
          "Ready for site installation",
        ],
        toolLinks: [
          { name: "ClickUp", url: "https://clickup.com", description: "Build tracking" },
          { name: "Xero", url: "https://xero.com", description: "Invoice processing" },
        ],
        docuwareLinks: [
          { name: "Quality Inspection Forms", ref: "TPL-006" },
          { name: "Shipping Documentation", ref: "TPL-007" },
        ],
        ceremonyId: "ceremony-5",
      },
    }),
    prisma.phase.upsert({
      where: { id: "phase-4" },
      update: {},
      create: {
        id: "phase-4",
        order: 4,
        name: "Handover Review",
        shortName: "Phase 4",
        narrative:
          "The Handover Review phase prepares for site transition. All deliverables are validated, documentation is compiled, and operational teams are briefed. This ensures a smooth transition from project delivery to site operations.",
        entryCriteria: [
          "Build phase completion",
          "All deliverables shipped",
          "Documentation compiled",
          "Operations team briefed",
        ],
        exitGate: [
          "Handover checklist completed",
          "Site team sign-off obtained",
          "Training completed",
          "Handover Review approval",
        ],
        toolLinks: [{ name: "ClickUp", url: "https://clickup.com", description: "Handover tracking" }],
        docuwareLinks: [
          { name: "Handover Checklist", ref: "TPL-008" },
          { name: "Training Records", ref: "TPL-009" },
        ],
        ceremonyId: "ceremony-4",
      },
    }),
    prisma.phase.upsert({
      where: { id: "phase-5" },
      update: {},
      create: {
        id: "phase-5",
        order: 5,
        name: "Site Run",
        shortName: "Phase 5",
        narrative:
          "The Site Run phase covers installation, commissioning, and operational stabilization. The project team supports site activities until the system is fully operational and handed over to the operational organization.",
        entryCriteria: [
          "Handover Review approval",
          "Site ready for installation",
          "Installation team mobilized",
          "Commissioning plan approved",
        ],
        exitGate: [
          "Installation completed",
          "Commissioning tests passed",
          "Operational acceptance signed",
          "Project closure documentation",
        ],
        toolLinks: [{ name: "ClickUp", url: "https://clickup.com", description: "Site activities" }],
        docuwareLinks: [
          { name: "Commissioning Checklist", ref: "TPL-010" },
          { name: "Project Closure Report", ref: "TPL-011" },
        ],
        ceremonyId: "ceremony-5",
      },
    }),
  ]);

  console.log(`✅ Created ${phases.length} phases`);

  // Seed Tools
  const tools = await Promise.all([
    prisma.tool.upsert({
      where: { id: "tool-clickup" },
      update: {},
      create: {
        id: "tool-clickup",
        domain: "Project Management",
        name: "ClickUp",
        description: "Primary project and task management platform for day-to-day project activities.",
        whenToUse:
          "Use for all task management, team collaboration, sprint planning, and project tracking. Create spaces for each project.",
        externalUrl: "https://clickup.com",
        icon: "layout-grid",
        order: 1,
      },
    }),
    prisma.tool.upsert({
      where: { id: "tool-msproject" },
      update: {},
      create: {
        id: "tool-msproject",
        domain: "Project Management",
        name: "Microsoft Project",
        description: "Enterprise project planning tool for complex scheduling and resource management.",
        whenToUse:
          "Use for master project schedules, Gantt charts, resource leveling, and executive reporting. Sync milestones to ClickUp.",
        externalUrl: "#",
        icon: "gantt-chart",
        order: 2,
      },
    }),
    prisma.tool.upsert({
      where: { id: "tool-xero" },
      update: {},
      create: {
        id: "tool-xero",
        domain: "Finance",
        name: "Xero",
        description: "Cloud accounting platform for financial management, invoicing, and reporting.",
        whenToUse: "Use for all financial transactions, invoice processing, expense management, and financial reporting.",
        externalUrl: "https://xero.com",
        icon: "calculator",
        order: 1,
      },
    }),
    prisma.tool.upsert({
      where: { id: "tool-docuware" },
      update: {},
      create: {
        id: "tool-docuware",
        domain: "Documentation",
        name: "DocuWare",
        description: "Enterprise document management system for official document storage and retrieval.",
        whenToUse:
          "Use for all official documents: contracts, decision records, specifications, and approved deliverables. Single source of truth for documentation.",
        externalUrl: "#",
        icon: "folder-open",
        order: 1,
      },
    }),
    prisma.tool.upsert({
      where: { id: "tool-powerbi" },
      update: {},
      create: {
        id: "tool-powerbi",
        domain: "Reporting",
        name: "Power BI",
        description: "Business intelligence platform for data visualization and reporting dashboards.",
        whenToUse: "Use for executive dashboards, KPI tracking, and data-driven reports.",
        externalUrl: "#",
        icon: "bar-chart-3",
        order: 1,
      },
    }),
  ]);

  console.log(`✅ Created ${tools.length} tools`);

  // Seed Pages
  const pages = await Promise.all([
    prisma.page.upsert({
      where: { slug: "/" },
      update: {},
      create: {
        slug: "/",
        title: "Home",
        description: "Project Management Framework Dashboard - Your single access point for understanding how we work.",
        content: {},
        published: true,
        order: 1,
      },
    }),
    prisma.page.upsert({
      where: { slug: "/framework" },
      update: {},
      create: {
        slug: "/framework",
        title: "Framework",
        description:
          "The Project Management Framework defines how we plan, execute, and deliver projects.",
        content: {},
        published: true,
        order: 2,
      },
    }),
    prisma.page.upsert({
      where: { slug: "/lifecycle" },
      update: {},
      create: {
        slug: "/lifecycle",
        title: "Project Lifecycle",
        description:
          "The project lifecycle defines the journey from initial concept to operational delivery.",
        content: {},
        published: true,
        order: 3,
      },
    }),
    prisma.page.upsert({
      where: { slug: "/governance" },
      update: {},
      create: {
        slug: "/governance",
        title: "Governance & Ceremonies",
        description:
          "Governance establishes the decision-making structure and accountability framework for project delivery.",
        content: {},
        published: true,
        order: 4,
      },
    }),
    prisma.page.upsert({
      where: { slug: "/tools" },
      update: {},
      create: {
        slug: "/tools",
        title: "Tools & Stack",
        description: "Guidance on which tools to use for different purposes.",
        content: {},
        published: true,
        order: 5,
      },
    }),
    prisma.page.upsert({
      where: { slug: "/documentation" },
      update: {},
      create: {
        slug: "/documentation",
        title: "Documentation",
        description: "Document types, naming conventions, approval processes, and storage locations.",
        content: {},
        published: true,
        order: 6,
      },
    }),
    prisma.page.upsert({
      where: { slug: "/reporting" },
      update: {},
      create: {
        slug: "/reporting",
        title: "Reporting",
        description: "Reporting requirements, templates, and access to dashboards.",
        content: {},
        published: true,
        order: 7,
      },
    }),
  ]);

  console.log(`✅ Created ${pages.length} pages`);

  console.log("🎉 Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
