import { Breadcrumb, PageHeader } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Target, BookOpen, CheckCircle2, Building2, Briefcase, UserCog, Globe, Landmark, Truck, UserCheck, Compass, PenTool, Wallet, Package, HardHat, Scale } from "lucide-react";

// External Parties
const externalParties = [
  {
    category: "External Customer",
    icon: UserCheck,
    description: "Final user. Accepts delivery.",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  {
    category: "External Stakeholders",
    icon: Landmark,
    description: "Authorities, regulators, utilities, land owners.",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  {
    category: "Suppliers & Contractors",
    icon: Truck,
    description: "EPC, OEMs, logistics, service providers.",
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
];

// Internal Stakeholders
const internalStakeholders = [
  {
    title: "Shareholders / Board",
    icon: Landmark,
    responsibilities: [
      "Capital allocation and investment decisions",
      "Risk appetite definition",
      "Final approvals on major commitments",
    ],
    color: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  },
  {
    title: "Business Owner",
    icon: Briefcase,
    responsibilities: [
      "P&L responsibility",
      "Business case ownership",
      "Strategic alignment with company objectives",
    ],
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  },
];

// Internal Roles
const internalRoles = [
  {
    title: "Business Director",
    icon: Building2,
    responsibilities: [
      "Overall accountability for project success",
      "Represents the customer inside the company",
      "Ensures alignment with business objectives",
    ],
  },
  {
    title: "Project Director",
    icon: Compass,
    responsibilities: [
      "Project coordination and delivery accountability",
      "Manages scope, budget, and timeline",
      "Oversees project team and resources",
    ],
  },
  {
    title: "Relationship Coordinator",
    icon: Globe,
    responsibilities: [
      "Single point of contact for customers",
      "Manages relationships with partners and authorities",
      "Coordinates external communications",
    ],
  },
  {
    title: "Engineering / Design Lead",
    icon: PenTool,
    responsibilities: [
      "Technical coherence across deliverables",
      "Design standards and quality",
      "Technical decision authority",
    ],
  },
  {
    title: "Finance Lead",
    icon: Wallet,
    responsibilities: [
      "Cost control and budget management",
      "Cash flow forecasting and monitoring",
      "Financial reporting and analysis",
    ],
  },
  {
    title: "Procurement & Supply Chain Lead",
    icon: Package,
    responsibilities: [
      "Vendor selection and management",
      "Contract negotiations",
      "Logistics coordination",
    ],
  },
  {
    title: "Site / Operations Lead",
    icon: HardHat,
    responsibilities: [
      "Build phase execution",
      "Site operations management",
      "Safety and quality on-site",
    ],
  },
  {
    title: "Legal & Compliance Lead",
    icon: Scale,
    responsibilities: [
      "Contract review and management",
      "Permits and regulatory compliance",
      "Risk mitigation from legal perspective",
    ],
  },
];

const principles = [
  {
    title: "Single Source of Truth",
    description: "All project information must reside in designated systems. Trello for tasks, TeamGantt for scheduling, DocuWare for documents, this dashboard for processes.",
  },
  {
    title: "Gate-Based Progression",
    description: "Projects advance through defined phases. Each phase has entry criteria and exit gates that must be satisfied before progression.",
  },
  {
    title: "Documented Decisions",
    description: "All significant decisions must be recorded as Decision Records (Procès-verbal) and stored in DocuWare.",
  },
  {
    title: "Transparent Communication",
    description: "Status, risks, and issues must be communicated proactively. No surprises at review gates.",
  },
  {
    title: "Continuous Improvement",
    description: "Lessons learned are captured after each project and fed back into the framework.",
  },
];

export default function FrameworkPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Framework" }]} />
      
      <PageHeader
        title="Project Management Framework"
        description="The Project Management Framework (PRO002) defines how we plan, execute, and deliver projects. It establishes common language, roles, and processes that ensure consistency and quality across all projects."
      />

      {/* Organization Legend */}
      <Card className="mb-6 bg-gradient-to-r from-slate-50 to-transparent border-slate-200">
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-sm font-semibold text-primary">Organization Structure:</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-500/60"></div>
              <span className="text-sm text-secondary">External Parties</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-violet-500/40 border border-violet-500/60"></div>
              <span className="text-sm text-secondary">Internal Stakeholders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-cyan-500/40 border border-cyan-500/60"></div>
              <span className="text-sm text-secondary">Internal Roles</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purpose Section */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-primary" />
            <CardTitle>Purpose of the Framework</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-secondary">
            The framework provides a structured approach to project delivery that:
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              "Ensures consistent project delivery across teams",
              "Defines clear roles and responsibilities",
              "Establishes governance and decision-making processes",
              "Provides review gates for quality assurance",
              "Creates accountability through documented decisions",
              "Enables continuous improvement through lessons learned",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-secondary">
                <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Project Organization Architecture */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-primary" />
            <CardTitle>Project Organization Architecture</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* External Parties */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="bg-slate-500/10 text-slate-600 border-slate-500/30 font-semibold px-3 py-1">
                2.1 External Parties
              </Badge>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {externalParties.map((party, index) => {
                const IconComponent = party.icon;
                return (
                  <div key={index} className={`border rounded-lg p-4 ${party.color}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-white/50">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-sm">{party.category}</h3>
                    </div>
                    <p className="text-sm opacity-80">{party.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Internal Stakeholders */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="bg-violet-500/10 text-violet-600 border-violet-500/30 font-semibold px-3 py-1">
                2.2 Internal Stakeholders
              </Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {internalStakeholders.map((stakeholder, index) => {
                const IconComponent = stakeholder.icon;
                return (
                  <div key={index} className={`border rounded-lg p-5 ${stakeholder.color}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-white/50">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold">{stakeholder.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {stakeholder.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm opacity-80">
                          <span>•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Internal Roles */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/30 font-semibold px-3 py-1">
                2.3 Internal Roles
              </Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {internalRoles.map((role, index) => {
                const IconComponent = role.icon;
                return (
                  <div key={index} className="border border-border rounded-lg p-4 bg-surface hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-semibold text-primary text-sm">{role.title}</h3>
                    </div>
                    <ul className="space-y-1.5">
                      {role.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-secondary">
                          <span className="text-accent mt-0.5">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Governance Model */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <CardTitle>Governance Model</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-secondary">
            Governance ensures projects are delivered within approved scope, timeline, and budget. 
            It operates at three levels with clear role accountability:
          </p>
          
          <div className="overflow-x-auto">
            <table className="table-institutional">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Forum</th>
                  <th>Participants</th>
                  <th>Frequency</th>
                  <th>Key Decisions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Strategic</td>
                  <td>Governance Committee</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">Shareholders/Board</Badge>
                      <Badge variant="outline" className="text-xs">Business Owner</Badge>
                      <Badge variant="outline" className="text-xs">Business Director</Badge>
                    </div>
                  </td>
                  <td>Monthly</td>
                  <td>Major scope changes, budget adjustments, strategic direction</td>
                </tr>
                <tr>
                  <td className="font-medium">Tactical</td>
                  <td>Project Review</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">Project Director</Badge>
                      <Badge variant="outline" className="text-xs">Finance Lead</Badge>
                      <Badge variant="outline" className="text-xs">Engineering Lead</Badge>
                    </div>
                  </td>
                  <td>Bi-weekly</td>
                  <td>Progress validation, risk mitigation, resource allocation</td>
                </tr>
                <tr>
                  <td className="font-medium">Operational</td>
                  <td>Team Standup</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">Project Director</Badge>
                      <Badge variant="outline" className="text-xs">All Leads</Badge>
                    </div>
                  </td>
                  <td>Weekly</td>
                  <td>Task assignments, blocker resolution, daily priorities</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Review Gates */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Review Gates</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-secondary mb-4">
            Each phase transition requires a formal review gate. Gates ensure deliverables meet quality 
            standards before advancing.
          </p>
          
          <div className="space-y-2">
            {[
              { gate: "Pre-Design Gate", from: "Phase 0: Pre-Design", to: "Phase 1: Design", focus: "Validate project feasibility and authorize design phase investment" },
              { gate: "Design Validation Gate", from: "Phase 1: Design", to: "Phase 2: Industrialisation", focus: "Confirm design completeness and authorize industrialisation activities" },
              { gate: "Master Review", from: "Phase 2: Industrialisation", to: "Phase 3: Build & Supply Chain", focus: "Final validation before major financial commitments and build start" },
              { gate: "Operational Review", from: "Phase 3: Build & Supply Chain", to: "Phase 4: Testing", focus: "Monitor ongoing project execution during build phase" },
              { gate: "Handover Review", from: "Phase 4: Testing", to: "Phase 5: Site Run", focus: "Validate testing completion and readiness for site transition" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-surface border border-border">
                <div className="flex-shrink-0 w-[220px] text-sm text-muted">
                  <div>{item.from}</div>
                  <div className="text-accent">→ {item.to}</div>
                </div>
                <div className="flex-1 flex items-center">
                  <span className="font-medium text-primary">{item.gate}</span>
                  <span className="text-secondary text-sm ml-2">— {item.focus}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Principles */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <CardTitle>Guiding Principles</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {principles.map((principle, index) => (
              <AccordionItem key={index} value={`principle-${index}`}>
                <AccordionTrigger>{principle.title}</AccordionTrigger>
                <AccordionContent>{principle.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
