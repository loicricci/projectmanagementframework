"use client";

import { useState, useEffect } from "react";
import { Breadcrumb, PageHeader } from "@/components/layout";
import { PhaseTimeline } from "@/components/content/phase-timeline";
import { PhaseDetails } from "@/components/content/phase-details";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";

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
      { name: "Trello", url: "https://trello.com", description: "Create initial project board" },
      { name: "TeamGantt", url: "https://app.teamgantt.com/", description: "High-level timeline & Gantt chart" },
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
      { name: "Trello", url: "https://trello.com", description: "Design task management" },
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
    name: "Industrialisation",
    shortName: "Phase 2",
    narrative: "The Industrialisation phase transforms validated designs into production-ready specifications. Manufacturing processes are defined, supply chain requirements are finalized, and production planning is completed. This phase bridges design completion and build execution.",
    entryCriteria: [
      "Design Validation Gate approval",
      "All designs at final revision",
      "Manufacturing feasibility confirmed",
      "Production requirements documented",
    ],
    exitGate: [
      "Manufacturing processes defined",
      "Production specifications finalized",
      "Supply chain requirements confirmed",
      "Master Review approval",
    ],
    ceremony: "Master Review",
    toolLinks: [
      { name: "TeamGantt", url: "https://app.teamgantt.com/", description: "Production planning & scheduling" },
      { name: "Trello", url: "https://trello.com", description: "Industrialisation tracking" },
    ],
    docuwareLinks: [
      { name: "Manufacturing Specification Template", ref: "TPL-005" },
      { name: "Production Planning Guide", ref: "TPL-005b" },
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
      { name: "Trello", url: "https://trello.com", description: "Build tracking" },
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
    name: "Testing",
    shortName: "Phase 4",
    narrative: "The Testing phase validates that all deliverables meet specifications and quality standards. Factory acceptance testing (FAT), integration testing, and quality assurance activities ensure everything is ready for site deployment. This phase concludes with the Handover Review gate before transitioning to Site Run.",
    entryCriteria: [
      "Build phase completion",
      "All deliverables manufactured/assembled",
      "Test plans approved",
      "Quality team mobilized",
    ],
    exitGate: [
      "Factory acceptance tests passed",
      "Integration testing completed",
      "Quality documentation finalized",
      "Handover Review approval",
    ],
    ceremony: "Handover Review",
    toolLinks: [
      { name: "Trello", url: "https://trello.com", description: "Test tracking and defect management" },
      { name: "TestRail", url: "#", description: "Test case management" },
    ],
    docuwareLinks: [
      { name: "Test Plan Template", ref: "TPL-008" },
      { name: "FAT Protocol", ref: "TPL-009" },
      { name: "Quality Inspection Report", ref: "TPL-010" },
    ],
  },
  {
    id: "phase-5",
    order: 5,
    name: "Site Run",
    shortName: "Phase 5",
    narrative: "The Site Run phase covers installation, commissioning, and operational stabilization. Following successful testing and Handover Review approval, the project team supports site activities until the system is fully operational and handed over to the operational organization.",
    entryCriteria: [
      "Testing phase completion",
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
    ceremony: "Quarterly Performance Site Review",
    toolLinks: [
      { name: "Trello", url: "https://trello.com", description: "Site activities" },
    ],
    docuwareLinks: [
      { name: "Commissioning Checklist", ref: "TPL-010" },
      { name: "Project Closure Report", ref: "TPL-011" },
    ],
  },
];

interface CurrentPhaseData {
  currentPhaseId: string | null;
  currentPhase: {
    id: string;
    order: number;
    name: string;
    shortName: string;
  } | null;
  updatedAt: string | null;
}

export default function LifecyclePage() {
  const [currentPhaseData, setCurrentPhaseData] = useState<CurrentPhaseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCurrentPhase();
  }, []);

  const fetchCurrentPhase = async () => {
    try {
      const response = await fetch("/api/settings/current-phase");
      if (response.ok) {
        const data = await response.json();
        setCurrentPhaseData(data);
      }
    } catch (error) {
      console.error("Error fetching current phase:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get the current phase index for the timeline
  const currentPhaseIndex = currentPhaseData?.currentPhase?.order ?? undefined;

  return (
    <div>
      <Breadcrumb items={[{ label: "Project Lifecycle" }]} />
      
      <PageHeader
        title="Project Lifecycle"
        description="The project lifecycle defines the journey from initial concept to operational delivery. Each phase has specific objectives, entry criteria, and exit gates that ensure quality and control throughout the project."
      />

      {/* Current Phase Status Banner */}
      {!isLoading && currentPhaseData?.currentPhase && (
        <div className="mb-6 p-4 bg-primary/10 border border-primary/20 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <span className="font-semibold text-primary">Current Phase:</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-sm">
              {currentPhaseData.currentPhase.shortName}
            </Badge>
            <span className="text-lg font-semibold text-primary">
              {currentPhaseData.currentPhase.name}
            </span>
          </div>
          {currentPhaseData.updatedAt && (
            <span className="text-sm text-muted ml-auto">
              Updated: {new Date(currentPhaseData.updatedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
        </div>
      )}

      {/* Timeline Visualization */}
      <PhaseTimeline phases={phases} currentPhase={currentPhaseIndex} />

      {/* Phase Details */}
      <div className="mt-8">
        <h2 className="text-h2 mb-6">Phase Details</h2>
        <PhaseDetails phases={phases} />
      </div>
    </div>
  );
}
