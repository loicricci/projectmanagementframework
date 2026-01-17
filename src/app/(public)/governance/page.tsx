import { Breadcrumb, PageHeader } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Target, FileText, CheckCircle2 } from "lucide-react";

const committees = [
  {
    name: "Governance Committee",
    purpose: "Strategic oversight of all active projects and portfolio management",
    frequency: "Monthly (first Monday)",
    participants: ["CEO", "CFO", "Operations Director", "Project Director"],
    responsibilities: [
      "Review portfolio status and health",
      "Approve major scope changes",
      "Allocate resources across projects",
      "Resolve escalated issues",
      "Set strategic priorities",
    ],
  },
  {
    name: "Project Review Board",
    purpose: "Tactical review of individual project progress and decisions",
    frequency: "Bi-weekly",
    participants: ["Project Director", "Project Managers", "Technical Leads"],
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
    templateRef: "TPL-GATE-001",
  },
  {
    id: "design-validation-gate",
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
    templateRef: "TPL-GATE-002",
  },
  {
    id: "master-review",
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
    templateRef: "TPL-GATE-003",
  },
  {
    id: "handover-review",
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
    templateRef: "TPL-GATE-004",
  },
  {
    id: "operational-review",
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
    templateRef: "TPL-REVIEW-001",
  },
];

const kpis = [
  { name: "Schedule Performance Index (SPI)", target: "≥ 0.95", description: "Earned value vs planned value ratio" },
  { name: "Cost Performance Index (CPI)", target: "≥ 0.95", description: "Earned value vs actual cost ratio" },
  { name: "Gate Pass Rate", target: "≥ 85%", description: "Percentage of gates passed on first attempt" },
  { name: "Risk Closure Rate", target: "≥ 80%", description: "Risks mitigated within planned timeframe" },
  { name: "Documentation Compliance", target: "100%", description: "Required documents filed in DocuWare" },
];

export default function GovernancePage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Governance & Ceremonies" }]} />
      
      <PageHeader
        title="Governance & Ceremonies"
        description="Governance establishes the decision-making structure and accountability framework for project delivery. Ceremonies are the formal review points that ensure projects progress with appropriate oversight."
      />

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
                  <div className="flex flex-wrap gap-2">
                    {committee.participants.map((p, idx) => (
                      <Badge key={idx} variant="outline">{p}</Badge>
                    ))}
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
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {ceremony.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">Purpose</h4>
                    <p className="text-secondary">{ceremony.purpose}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">Participants</h4>
                    <div className="flex flex-wrap gap-2">
                      {ceremony.participants.map((p, idx) => (
                        <Badge key={idx} variant="outline">{p}</Badge>
                      ))}
                    </div>
                  </div>
                  
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
