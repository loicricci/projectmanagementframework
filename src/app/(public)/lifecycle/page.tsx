import { Breadcrumb, PageHeader } from "@/components/layout";
import { PhaseTimeline } from "@/components/content/phase-timeline";
import { PhaseDetails } from "@/components/content/phase-details";

// This data would normally come from the database
const phases = [
  {
    id: "phase-0",
    order: 0,
    name: "Pre-Design",
    shortName: "Phase 0",
    narrative: "The Pre-Design phase establishes the project foundation. During this phase, we validate the business case, define high-level requirements, and assess feasibility. The goal is to ensure the project is viable before committing design resources.",
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
    ceremony: "Pre-Design Gate",
    toolLinks: [
      { name: "ClickUp", url: "#", description: "Create initial project space" },
      { name: "MS Project", url: "#", description: "High-level timeline" },
    ],
    docuwareLinks: [
      { name: "Business Case Template", ref: "TPL-001" },
      { name: "Feasibility Study Template", ref: "TPL-002" },
    ],
  },
  {
    id: "phase-1",
    order: 1,
    name: "Design",
    shortName: "Phase 1",
    narrative: "The Design phase transforms requirements into detailed specifications. Engineering teams develop technical designs, procurement prepares sourcing strategies, and finance refines cost estimates. This phase produces the documentation needed for build decisions.",
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
    ceremony: "Design Validation Gate",
    toolLinks: [
      { name: "ClickUp", url: "#", description: "Design task management" },
      { name: "AutoCAD", url: "#", description: "Technical drawings" },
    ],
    docuwareLinks: [
      { name: "Design Specification Template", ref: "TPL-003" },
      { name: "Technical Review Checklist", ref: "TPL-004" },
    ],
  },
  {
    id: "phase-2",
    order: 2,
    name: "Master Review",
    shortName: "Phase 2",
    narrative: "The Master Review phase is the critical checkpoint before major commitments. All designs are frozen, contracts are finalized, and the complete project plan is validated. This is the last opportunity to adjust before build begins.",
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
    ceremony: "Master Review",
    toolLinks: [
      { name: "MS Project", url: "#", description: "Master schedule" },
      { name: "DocuSign", url: "#", description: "Contract execution" },
    ],
    docuwareLinks: [
      { name: "Master Review Checklist", ref: "TPL-005" },
      { name: "Contract Package", ref: "DOC-001" },
    ],
  },
  {
    id: "phase-3",
    order: 3,
    name: "Build & Supply Chain",
    shortName: "Phase 3",
    narrative: "The Build & Supply Chain phase executes the project plan. Manufacturing proceeds, suppliers deliver components, and quality control ensures specifications are met. Progress is tracked against the master schedule with regular status updates.",
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
    ceremony: "Operational Review",
    toolLinks: [
      { name: "ClickUp", url: "#", description: "Build tracking" },
      { name: "Xero", url: "#", description: "Invoice processing" },
    ],
    docuwareLinks: [
      { name: "Quality Inspection Forms", ref: "TPL-006" },
      { name: "Shipping Documentation", ref: "TPL-007" },
    ],
  },
  {
    id: "phase-4",
    order: 4,
    name: "Handover Review",
    shortName: "Phase 4",
    narrative: "The Handover Review phase prepares for site transition. All deliverables are validated, documentation is compiled, and operational teams are briefed. This ensures a smooth transition from project delivery to site operations.",
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
    ceremony: "Handover Review",
    toolLinks: [
      { name: "ClickUp", url: "#", description: "Handover tracking" },
    ],
    docuwareLinks: [
      { name: "Handover Checklist", ref: "TPL-008" },
      { name: "Training Records", ref: "TPL-009" },
    ],
  },
  {
    id: "phase-5",
    order: 5,
    name: "Site Run",
    shortName: "Phase 5",
    narrative: "The Site Run phase covers installation, commissioning, and operational stabilization. The project team supports site activities until the system is fully operational and handed over to the operational organization.",
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
    ceremony: "Operational Review",
    toolLinks: [
      { name: "ClickUp", url: "#", description: "Site activities" },
    ],
    docuwareLinks: [
      { name: "Commissioning Checklist", ref: "TPL-010" },
      { name: "Project Closure Report", ref: "TPL-011" },
    ],
  },
];

export default function LifecyclePage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Project Lifecycle" }]} />
      
      <PageHeader
        title="Project Lifecycle"
        description="The project lifecycle defines the journey from initial concept to operational delivery. Each phase has specific objectives, entry criteria, and exit gates that ensure quality and control throughout the project."
      />

      {/* Timeline Visualization */}
      <PhaseTimeline phases={phases} />

      {/* Phase Details */}
      <div className="mt-8">
        <h2 className="text-h2 mb-6">Phase Details</h2>
        <PhaseDetails phases={phases} />
      </div>
    </div>
  );
}
