import { Breadcrumb, PageHeader } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Target, FileText, CheckCircle2, Building2, Briefcase, Globe, PenTool, Wallet, Package, HardHat, Scale, Compass, UserCheck, Landmark, Truck, User } from "lucide-react";
import { prisma } from "@/lib/prisma";

// Role categorization for visual styling
type RoleCategory = "external" | "stakeholder" | "internal";

interface RoleInfo {
  category: RoleCategory;
  icon: typeof Users;
}

const roleMapping: Record<string, RoleInfo> = {
  "External Customer": { category: "external", icon: UserCheck },
  "External Stakeholders": { category: "external", icon: Landmark },
  "Suppliers & Contractors": { category: "external", icon: Truck },
  "Shareholders / Board": { category: "stakeholder", icon: Landmark },
  "Business Owner": { category: "stakeholder", icon: Briefcase },
  "Business Director": { category: "internal", icon: Building2 },
  "Project Director": { category: "internal", icon: Compass },
  "Relationship Coordinator": { category: "internal", icon: Globe },
  "Engineering / Design Lead": { category: "internal", icon: PenTool },
  "Finance Lead": { category: "internal", icon: Wallet },
  "Procurement & Supply Chain Lead": { category: "internal", icon: Package },
  "Site / Operations Lead": { category: "internal", icon: HardHat },
  "Legal & Compliance Lead": { category: "internal", icon: Scale },
};

const getRoleBadgeStyle = (role: string): string => {
  const info = roleMapping[role];
  if (!info) return "bg-slate-100 text-slate-700 border-slate-200";
  switch (info.category) {
    case "external":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "stakeholder":
      return "bg-violet-50 text-violet-700 border-violet-200";
    case "internal":
      return "bg-cyan-50 text-cyan-700 border-cyan-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

const committees = [
  {
    name: "Governance Committee",
    purpose: "Strategic oversight of all active projects and portfolio management",
    frequency: "Monthly (first Monday)",
    participants: [
      { role: "Shareholders / Board", required: true },
      { role: "Business Owner", required: true },
      { role: "Business Director", required: true },
      { role: "Project Director", required: false },
    ],
    responsibilities: [
      "Review portfolio status and health",
      "Approve major scope changes and budget adjustments",
      "Capital allocation and risk appetite decisions",
      "Resolve escalated strategic issues",
      "Set strategic priorities and direction",
    ],
  },
  {
    name: "Project Review Board",
    purpose: "Tactical review of individual project progress and decisions",
    frequency: "Bi-weekly",
    participants: [
      { role: "Project Director", required: true },
      { role: "Engineering / Design Lead", required: true },
      { role: "Finance Lead", required: true },
      { role: "Procurement & Supply Chain Lead", required: false },
      { role: "Site / Operations Lead", required: false },
    ],
    responsibilities: [
      "Review project status against plan",
      "Approve phase gate transitions",
      "Address risks and blockers",
      "Coordinate cross-project dependencies",
    ],
  },
];

const ceremonies = [
  {
    id: "pre-design-gate",
    name: "Pre-Design Gate",
    phase: "Phase 0: Pre-Design",
    purpose: "Validate project feasibility and authorize design phase investment",
    participants: [
      { role: "Business Director", required: true, responsibility: "Final approval authority" },
      { role: "Project Director", required: true, responsibility: "Present business case" },
      { role: "Finance Lead", required: true, responsibility: "Validate budget feasibility" },
      { role: "Relationship Coordinator", required: false, responsibility: "Customer alignment" },
    ],
    externalInvolved: ["External Customer"],
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
    templateRef: "TPL-GATE-001",
  },
  {
    id: "design-validation-gate",
    name: "Design Validation Gate",
    phase: "Phase 1: Design",
    purpose: "Confirm design completeness and authorize industrialisation activities",
    participants: [
      { role: "Business Director", required: true, responsibility: "Strategic alignment approval" },
      { role: "Project Director", required: true, responsibility: "Present design package" },
      { role: "Engineering / Design Lead", required: true, responsibility: "Technical sign-off" },
      { role: "Procurement & Supply Chain Lead", required: true, responsibility: "Procurement strategy validation" },
      { role: "Finance Lead", required: false, responsibility: "Cost estimate review" },
    ],
    externalInvolved: ["External Customer", "Suppliers & Contractors"],
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
    templateRef: "TPL-GATE-002",
  },
  {
    id: "master-review",
    name: "Master Review",
    phase: "Phase 2: Industrialisation",
    purpose: "Final validation before major financial commitments and build start",
    participants: [
      { role: "Shareholders / Board", required: true, responsibility: "Capital commitment approval" },
      { role: "Business Owner", required: true, responsibility: "P&L sign-off" },
      { role: "Business Director", required: true, responsibility: "Customer representation" },
      { role: "Project Director", required: true, responsibility: "Present master plan" },
      { role: "Legal & Compliance Lead", required: true, responsibility: "Contract review" },
      { role: "Finance Lead", required: true, responsibility: "Budget validation" },
    ],
    externalInvolved: ["External Customer", "External Stakeholders", "Suppliers & Contractors"],
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
    templateRef: "TPL-GATE-003",
  },
  {
    id: "operational-review",
    name: "Operational Review",
    phase: "Phase 3: Build & Supply Chain",
    purpose: "Monitor ongoing project execution during build phase",
    participants: [
      { role: "Project Director", required: true, responsibility: "Status oversight" },
      { role: "Site / Operations Lead", required: true, responsibility: "Build progress report" },
      { role: "Procurement & Supply Chain Lead", required: true, responsibility: "Supply chain status" },
      { role: "Engineering / Design Lead", required: false, responsibility: "Technical support" },
      { role: "Finance Lead", required: false, responsibility: "Cost tracking" },
    ],
    externalInvolved: ["Suppliers & Contractors"],
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
    templateRef: "TPL-REVIEW-001",
  },
  {
    id: "handover-review",
    name: "Handover Review",
    phase: "Phase 4: Testing",
    purpose: "Validate testing completion and readiness for site transition",
    participants: [
      { role: "Project Director", required: true, responsibility: "Handover approval" },
      { role: "Site / Operations Lead", required: true, responsibility: "Site readiness confirmation" },
      { role: "Engineering / Design Lead", required: true, responsibility: "Technical validation" },
      { role: "Relationship Coordinator", required: true, responsibility: "Customer coordination" },
    ],
    externalInvolved: ["External Customer", "Suppliers & Contractors"],
    inputs: [
      "Test completion report",
      "FAT results documentation",
      "Quality certification",
      "Outstanding issues list",
    ],
    outputs: [
      "Handover decision",
      "Site acceptance authorization",
      "Responsibility transfer",
      "Support arrangement confirmation",
    ],
    templateRef: "TPL-GATE-004",
  },
  {
    id: "quarterly-performance-site-review",
    name: "Quarterly Performance Site Review",
    phase: "Phase 5: Site Run",
    purpose: "Assess site operational performance and project closure readiness",
    participants: [
      { role: "Business Director", required: true, responsibility: "Performance assessment" },
      { role: "Site / Operations Lead", required: true, responsibility: "Operational metrics report" },
      { role: "Project Director", required: true, responsibility: "Closure readiness" },
      { role: "Relationship Coordinator", required: true, responsibility: "Customer satisfaction" },
    ],
    externalInvolved: ["External Customer", "External Stakeholders"],
    inputs: [
      "Site performance metrics",
      "Commissioning status report",
      "Operational readiness assessment",
      "Lessons learned documentation",
    ],
    outputs: [
      "Performance assessment",
      "Operational acceptance sign-off",
      "Project closure authorization",
      "Continuous improvement recommendations",
    ],
    templateRef: "TPL-REVIEW-002",
  },
];

const kpis = [
  { name: "Schedule Performance Index (SPI)", target: "≥ 0.95", description: "Earned value vs planned value ratio" },
  { name: "Cost Performance Index (CPI)", target: "≥ 0.95", description: "Earned value vs actual cost ratio" },
  { name: "Gate Pass Rate", target: "≥ 85%", description: "Percentage of gates passed on first attempt" },
  { name: "Risk Closure Rate", target: "≥ 80%", description: "Risks mitigated within planned timeframe" },
  { name: "Documentation Compliance", target: "100%", description: "Required documents filed in DocuWare" },
];

// Complete stakeholder directory
const stakeholderDirectory = {
  externalParties: [
    {
      name: "External Customer",
      role: "Final User",
      description: "Accepts delivery. Ultimate recipient of project deliverables.",
      keyInteractions: ["Requirements validation", "Acceptance testing", "Final sign-off"],
    },
    {
      name: "External Stakeholders",
      role: "Regulatory & Third Parties",
      description: "Authorities, regulators, utilities, land owners.",
      keyInteractions: ["Permits approval", "Compliance validation", "Right-of-way access"],
    },
    {
      name: "Suppliers & Contractors",
      role: "Delivery Partners",
      description: "EPC, OEMs, logistics, service providers.",
      keyInteractions: ["Contract execution", "Material delivery", "On-site work"],
    },
  ],
  internalStakeholders: [
    {
      name: "Shareholders / Board",
      role: "Capital Providers",
      description: "Capital allocation, risk appetite definition, final approvals.",
      keyInteractions: ["Investment decisions", "Major milestone approvals", "Strategic direction"],
    },
    {
      name: "Business Owner",
      role: "P&L Accountability",
      description: "Profit & Loss responsibility for the project or business unit.",
      keyInteractions: ["Business case approval", "Budget allocation", "Performance accountability"],
    },
  ],
  internalRoles: [
    {
      name: "Business Director",
      role: "Customer Champion",
      description: "Overall accountability. Represents the customer inside the company.",
      keyInteractions: ["Strategic alignment", "Customer representation", "Executive escalations"],
    },
    {
      name: "Project Director",
      role: "Delivery Lead",
      description: "Project coordination and delivery accountability. Scope, budget, timeline.",
      keyInteractions: ["Project planning", "Team coordination", "Progress reporting"],
    },
    {
      name: "Relationship Coordinator",
      role: "Interface Manager",
      description: "Single point of contact for customers, partners, authorities.",
      keyInteractions: ["External communications", "Stakeholder management", "Issue resolution"],
    },
    {
      name: "Engineering / Design Lead",
      role: "Technical Authority",
      description: "Technical coherence across all project deliverables.",
      keyInteractions: ["Design reviews", "Technical decisions", "Quality assurance"],
    },
    {
      name: "Finance Lead",
      role: "Financial Controller",
      description: "Cost control, cash flow management, financial reporting.",
      keyInteractions: ["Budget tracking", "Financial analysis", "Cost forecasting"],
    },
    {
      name: "Procurement & Supply Chain Lead",
      role: "Sourcing Manager",
      description: "Vendors, contracts, logistics coordination.",
      keyInteractions: ["Vendor selection", "Contract negotiation", "Material planning"],
    },
    {
      name: "Site / Operations Lead",
      role: "Execution Manager",
      description: "Build phase execution and site operations management.",
      keyInteractions: ["Site coordination", "Safety management", "Progress monitoring"],
    },
    {
      name: "Legal & Compliance Lead",
      role: "Risk & Compliance",
      description: "Contracts, permits, regulatory compliance.",
      keyInteractions: ["Contract review", "Permit acquisition", "Regulatory compliance"],
    },
  ],
};

// Helper to convert role name to key
function roleNameToKey(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default async function GovernancePage() {
  // Fetch role assignments from database
  const roleAssignments = await prisma.roleAssignment.findMany();
  const assignmentMap = new Map(
    roleAssignments.map(a => [a.roleKey, a])
  );

  // Helper to get assignee for a role
  const getAssignee = (roleName: string) => {
    const key = roleNameToKey(roleName);
    return assignmentMap.get(key);
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "Governance & Ceremonies" }]} />
      
      <PageHeader
        title="Governance & Ceremonies"
        description="Governance establishes the decision-making structure and accountability framework for project delivery. Ceremonies are the formal review points that ensure projects progress with appropriate oversight."
      />

      {/* Role Legend */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-sm font-medium text-primary">Role Categories:</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/50"></div>
              <span className="text-sm text-secondary">External Parties</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-violet-500/30 border border-violet-500/50"></div>
              <span className="text-sm text-secondary">Internal Stakeholders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-cyan-500/30 border border-cyan-500/50"></div>
              <span className="text-sm text-secondary">Internal Roles</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stakeholder Directory Table */}
      <div className="mb-8">
        <h2 className="text-h2 mb-4">Stakeholder Directory</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 px-4 font-semibold text-primary bg-surface">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary bg-surface">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary bg-surface">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary bg-surface">Assigned To</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary bg-surface">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary bg-surface">Key Interactions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* External Parties Section */}
                  <tr className="bg-emerald-50/50">
                    <td colSpan={6} className="py-2 px-4">
                      <div className="flex items-center gap-2 font-semibold text-emerald-700">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        2.1 External Parties
                      </div>
                    </td>
                  </tr>
                  {stakeholderDirectory.externalParties.map((party, idx) => {
                    const PartyIcon = roleMapping[party.name]?.icon || Users;
                    const assignee = getAssignee(party.name);
                    return (
                      <tr key={`ext-${idx}`} className="border-b border-border/50 hover:bg-emerald-50/30 transition-colors">
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                            External
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <PartyIcon className="h-4 w-4 text-emerald-600" />
                            <span className="font-medium text-primary">{party.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-secondary">{party.role}</td>
                        <td className="py-3 px-4">
                          {assignee?.assigneeName ? (
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                                <User className="h-4 w-4 text-emerald-600" />
                              </div>
                              <div>
                                <div className="font-medium text-primary text-sm">{assignee.assigneeName}</div>
                                {assignee.assigneeEmail && (
                                  <div className="text-xs text-muted">{assignee.assigneeEmail}</div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted text-xs italic">Not assigned</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-secondary max-w-xs">{party.description}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {party.keyInteractions.map((interaction, i) => (
                              <Badge key={i} variant="outline" className="text-xs bg-white">
                                {interaction}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {/* Internal Stakeholders Section */}
                  <tr className="bg-violet-50/50">
                    <td colSpan={6} className="py-2 px-4">
                      <div className="flex items-center gap-2 font-semibold text-violet-700">
                        <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                        2.2 Internal Stakeholders
                      </div>
                    </td>
                  </tr>
                  {stakeholderDirectory.internalStakeholders.map((stakeholder, idx) => {
                    const StakeholderIcon = roleMapping[stakeholder.name]?.icon || Users;
                    const assignee = getAssignee(stakeholder.name);
                    return (
                      <tr key={`stake-${idx}`} className="border-b border-border/50 hover:bg-violet-50/30 transition-colors">
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200 text-xs">
                            Stakeholder
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <StakeholderIcon className="h-4 w-4 text-violet-600" />
                            <span className="font-medium text-primary">{stakeholder.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-secondary">{stakeholder.role}</td>
                        <td className="py-3 px-4">
                          {assignee?.assigneeName ? (
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center">
                                <User className="h-4 w-4 text-violet-600" />
                              </div>
                              <div>
                                <div className="font-medium text-primary text-sm">{assignee.assigneeName}</div>
                                {assignee.assigneeEmail && (
                                  <div className="text-xs text-muted">{assignee.assigneeEmail}</div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted text-xs italic">Not assigned</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-secondary max-w-xs">{stakeholder.description}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {stakeholder.keyInteractions.map((interaction, i) => (
                              <Badge key={i} variant="outline" className="text-xs bg-white">
                                {interaction}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {/* Internal Roles Section */}
                  <tr className="bg-cyan-50/50">
                    <td colSpan={6} className="py-2 px-4">
                      <div className="flex items-center gap-2 font-semibold text-cyan-700">
                        <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                        2.3 Internal Roles
                      </div>
                    </td>
                  </tr>
                  {stakeholderDirectory.internalRoles.map((role, idx) => {
                    const RoleIcon = roleMapping[role.name]?.icon || Users;
                    const assignee = getAssignee(role.name);
                    return (
                      <tr key={`role-${idx}`} className="border-b border-border/50 hover:bg-cyan-50/30 transition-colors">
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200 text-xs">
                            Internal Role
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <RoleIcon className="h-4 w-4 text-cyan-600" />
                            <span className="font-medium text-primary">{role.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-secondary">{role.role}</td>
                        <td className="py-3 px-4">
                          {assignee?.assigneeName ? (
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-cyan-100 flex items-center justify-center">
                                <User className="h-4 w-4 text-cyan-600" />
                              </div>
                              <div>
                                <div className="font-medium text-primary text-sm">{assignee.assigneeName}</div>
                                {assignee.assigneeEmail && (
                                  <div className="text-xs text-muted">{assignee.assigneeEmail}</div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted text-xs italic">Not assigned</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-secondary max-w-xs">{role.description}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {role.keyInteractions.map((interaction, i) => (
                              <Badge key={i} variant="outline" className="text-xs bg-white">
                                {interaction}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Governance Committees */}
      <div className="mb-8">
        <h2 className="text-h2 mb-4">Governance Structure</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {committees.map((committee, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{committee.name}</CardTitle>
                  </div>
                  <Badge variant="muted">{committee.frequency}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-secondary">{committee.purpose}</p>
                
                <div>
                  <h4 className="text-sm font-medium text-primary mb-2">Participants</h4>
                  <div className="space-y-2">
                    {committee.participants.map((p, idx) => {
                      const RoleIcon = roleMapping[p.role]?.icon || Users;
                      return (
                        <div key={idx} className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`${getRoleBadgeStyle(p.role)} flex items-center gap-1.5`}
                          >
                            <RoleIcon className="h-3 w-3" />
                            {p.role}
                          </Badge>
                          {p.required ? (
                            <span className="text-xs text-success font-medium">Required</span>
                          ) : (
                            <span className="text-xs text-muted">Optional</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-primary mb-2">Responsibilities</h4>
                  <ul className="space-y-1">
                    {committee.responsibilities.map((r, idx) => (
                      <li key={idx} className="text-sm text-secondary flex items-start gap-2">
                        <span className="text-accent">•</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Ceremonies */}
      <div className="mb-8">
        <h2 className="text-h2 mb-4">Ceremonies</h2>
        <Tabs defaultValue={ceremonies[0].id}>
          <TabsList className="flex-wrap h-auto gap-1 mb-4">
            {ceremonies.map((ceremony) => (
              <TabsTrigger key={ceremony.id} value={ceremony.id} className="text-xs sm:text-sm">
                {ceremony.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {ceremonies.map((ceremony) => (
            <TabsContent key={ceremony.id} value={ceremony.id}>
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      {ceremony.name}
                    </CardTitle>
                    <Badge variant="default">{ceremony.phase}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">Purpose</h4>
                    <p className="text-secondary">{ceremony.purpose}</p>
                  </div>
                  
                  {/* Participants - Internal Roles */}
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" /> Internal Participants
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 pr-4 font-medium text-muted">Role</th>
                            <th className="text-left py-2 pr-4 font-medium text-muted">Responsibility</th>
                            <th className="text-left py-2 font-medium text-muted">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ceremony.participants.map((p, idx) => {
                            const RoleIcon = roleMapping[p.role]?.icon || Users;
                            return (
                              <tr key={idx} className="border-b border-border/50">
                                <td className="py-2 pr-4">
                                  <Badge 
                                    variant="outline" 
                                    className={`${getRoleBadgeStyle(p.role)} flex items-center gap-1.5 w-fit`}
                                  >
                                    <RoleIcon className="h-3 w-3" />
                                    {p.role}
                                  </Badge>
                                </td>
                                <td className="py-2 pr-4 text-secondary">{p.responsibility}</td>
                                <td className="py-2">
                                  {p.required ? (
                                    <Badge variant="default" className="bg-success/10 text-success border-success/20 text-xs">Required</Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-muted text-xs">Optional</Badge>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* External Parties Involved */}
                  {ceremony.externalInvolved && ceremony.externalInvolved.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                        <Globe className="h-4 w-4" /> External Parties Involved
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {ceremony.externalInvolved.map((ext, idx) => {
                          const ExtIcon = roleMapping[ext]?.icon || Users;
                          return (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className={`${getRoleBadgeStyle(ext)} flex items-center gap-1.5`}
                            >
                              <ExtIcon className="h-3 w-3" />
                              {ext}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4" /> Inputs
                      </h4>
                      <ul className="space-y-2">
                        {ceremony.inputs.map((input, idx) => (
                          <li key={idx} className="text-sm text-secondary flex items-start gap-2">
                            <span className="text-muted">→</span>
                            {input}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" /> Outputs
                      </h4>
                      <ul className="space-y-2">
                        {ceremony.outputs.map((output, idx) => (
                          <li key={idx} className="text-sm text-secondary flex items-start gap-2">
                            <span className="text-success">✓</span>
                            {output}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted">
                      Template Reference: <span className="font-mono text-accent">{ceremony.templateRef}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* KPIs */}
      <div>
        <h2 className="text-h2 mb-4">Key Performance Indicators</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="table-institutional">
                <thead>
                  <tr>
                    <th>KPI</th>
                    <th>Target</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {kpis.map((kpi, index) => (
                    <tr key={index}>
                      <td className="font-medium">{kpi.name}</td>
                      <td>
                        <Badge variant="success">{kpi.target}</Badge>
                      </td>
                      <td className="text-secondary">{kpi.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
