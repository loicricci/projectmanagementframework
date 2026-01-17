import { Breadcrumb, PageHeader } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Users, Shield, Target, BookOpen, CheckCircle2 } from "lucide-react";

const roles = [
  {
    title: "Project Sponsor",
    responsibilities: [
      "Provides strategic direction and oversight",
      "Approves major decisions and scope changes",
      "Secures resources and removes escalated blockers",
      "Champions the project at executive level",
    ],
  },
  {
    title: "Project Manager",
    responsibilities: [
      "Plans and coordinates project activities",
      "Manages timeline, budget, and resources",
      "Facilitates communication between stakeholders",
      "Tracks progress and reports status",
    ],
  },
  {
    title: "Technical Lead",
    responsibilities: [
      "Defines technical approach and architecture",
      "Reviews technical deliverables for quality",
      "Mentors team on technical best practices",
      "Resolves technical challenges and decisions",
    ],
  },
  {
    title: "Team Members",
    responsibilities: [
      "Execute assigned tasks and deliverables",
      "Communicate progress and blockers",
      "Participate in reviews and ceremonies",
      "Contribute to continuous improvement",
    ],
  },
];

const principles = [
  {
    title: "Single Source of Truth",
    description: "All project information must reside in designated systems. ClickUp for tasks, DocuWare for documents, this dashboard for processes.",
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

      {/* Roles and Responsibilities */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-primary" />
            <CardTitle>Roles and Responsibilities</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {roles.map((role, index) => (
              <div key={index} className="border border-border p-4">
                <h3 className="font-semibold text-primary mb-3">{role.title}</h3>
                <ul className="space-y-2">
                  {role.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-secondary">
                      <span className="text-accent">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
            It operates at three levels:
          </p>
          
          <div className="overflow-x-auto">
            <table className="table-institutional">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Forum</th>
                  <th>Frequency</th>
                  <th>Key Decisions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Strategic</td>
                  <td>Governance Committee</td>
                  <td>Monthly</td>
                  <td>Major scope changes, budget adjustments, strategic direction</td>
                </tr>
                <tr>
                  <td className="font-medium">Tactical</td>
                  <td>Project Review</td>
                  <td>Bi-weekly</td>
                  <td>Progress validation, risk mitigation, resource allocation</td>
                </tr>
                <tr>
                  <td className="font-medium">Operational</td>
                  <td>Team Standup</td>
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
              { gate: "Pre-Design Gate", from: "Phase 0", to: "Phase 1", focus: "Project feasibility and scope validation" },
              { gate: "Design Validation Gate", from: "Phase 1", to: "Phase 2", focus: "Design completeness and technical feasibility" },
              { gate: "Master Review", from: "Phase 2", to: "Phase 3", focus: "Full readiness for build and procurement" },
              { gate: "Handover Review", from: "Phase 4", to: "Phase 5", focus: "Site readiness and operational handoff" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-surface border border-border">
                <div className="flex-shrink-0 w-24 text-sm text-muted">{item.from} → {item.to}</div>
                <div className="flex-1">
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
