import { Breadcrumb, PageHeader } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, FolderOpen, CheckCircle, Clock, AlertCircle, ExternalLink } from "lucide-react";

const documentTypes = [
  {
    type: "Process (PRO)",
    prefix: "PRO-",
    description: "Defines how activities should be performed. Establishes standard procedures and workflows.",
    approval: "Process Owner + Quality",
    retention: "Permanent",
    examples: ["PRO-001 Quality Management", "PRO-002 Project Management Framework", "PRO-003 Project Lifecycle"],
  },
  {
    type: "Document (DOC)",
    prefix: "DOC-",
    description: "Reference materials, guidelines, and supporting documentation that aid process execution.",
    approval: "Document Owner",
    retention: "5 years after superseded",
    examples: ["DOC-001 Style Guide", "DOC-002 Template Library", "DOC-003 Vendor List"],
  },
  {
    type: "Decision Record (DEC)",
    prefix: "DEC-",
    description: "Formal record of decisions made at governance ceremonies (Procès-verbal).",
    approval: "Meeting Chair + Attendees",
    retention: "Permanent",
    examples: ["DEC-2024-001 Master Review Decision", "DEC-2024-002 Scope Change Approval"],
  },
  {
    type: "Contract (CON)",
    prefix: "CON-",
    description: "Legal agreements with external parties including vendors, clients, and partners.",
    approval: "Legal + Finance + Executive",
    retention: "7 years after expiry",
    examples: ["CON-2024-001 Supplier Agreement", "CON-2024-002 Client Contract"],
  },
  {
    type: "Template (TPL)",
    prefix: "TPL-",
    description: "Standardized forms and templates for consistent document creation.",
    approval: "Process Owner",
    retention: "Until superseded",
    examples: ["TPL-001 Project Charter", "TPL-002 Risk Register", "TPL-003 Status Report"],
  },
];

const approvalWorkflow = [
  { step: 1, name: "Draft", description: "Author creates initial document", status: "draft" },
  { step: 2, name: "Review", description: "Reviewers provide feedback", status: "review" },
  { step: 3, name: "Revision", description: "Author incorporates feedback", status: "revision" },
  { step: 4, name: "Approval", description: "Approvers sign off", status: "approval" },
  { step: 5, name: "Published", description: "Document released to DocuWare", status: "published" },
];

export default function DocumentationPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Documentation" }]} />
      
      <PageHeader
        title="Documentation"
        description="All official documentation is managed through DocuWare. This section explains document types, naming conventions, approval processes, and how to find what you need."
      />

      {/* Document Storage */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FolderOpen className="h-5 w-5 text-primary" />
            <CardTitle>Document Storage</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-secondary">
              <strong className="text-primary">DocuWare</strong> is the single source of truth for all official documentation. 
              Working documents may temporarily reside in Google Drive, but all approved, final versions must be stored in DocuWare.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 border border-border">
                <h4 className="font-semibold text-primary mb-2">DocuWare (Official)</h4>
                <ul className="text-sm text-secondary space-y-1">
                  <li>• Approved documents</li>
                  <li>• Contracts and legal</li>
                  <li>• Decision records</li>
                  <li>• Controlled processes</li>
                </ul>
              </div>
              <div className="p-4 border border-border">
                <h4 className="font-semibold text-primary mb-2">Google Drive (Working)</h4>
                <ul className="text-sm text-secondary space-y-1">
                  <li>• Work in progress</li>
                  <li>• Team collaboration</li>
                  <li>• Draft documents</li>
                  <li>• Temporary files</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-surface border border-border">
              <p className="text-sm text-secondary">
                <strong className="text-primary">Access DocuWare:</strong> Sign in to view the direct link to the DocuWare document management system.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Types */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle>Document Types</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="table-institutional">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Prefix</th>
                  <th>Description</th>
                  <th>Approval</th>
                  <th>Retention</th>
                </tr>
              </thead>
              <tbody>
                {documentTypes.map((doc, index) => (
                  <tr key={index}>
                    <td className="font-medium">{doc.type}</td>
                    <td><code className="text-accent">{doc.prefix}</code></td>
                    <td className="max-w-xs">{doc.description}</td>
                    <td>{doc.approval}</td>
                    <td>{doc.retention}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Naming Convention */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Naming Convention</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-secondary">
              All documents follow a standardized naming convention to ensure consistency and easy retrieval:
            </p>
            
            <div className="bg-surface p-4 border border-border font-mono text-sm">
              <span className="text-accent">[TYPE]</span>-<span className="text-success">[NUMBER]</span>_<span className="text-warning">[Title]</span>_v<span className="text-primary">[VERSION]</span>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">Examples</h4>
                <ul className="text-sm text-secondary space-y-1 font-mono">
                  <li>PRO-002_Project_Management_Framework_v1.0</li>
                  <li>DEC-2024-015_Master_Review_Approval_v1.0</li>
                  <li>TPL-003_Status_Report_Template_v2.1</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Version Format</h4>
                <ul className="text-sm text-secondary space-y-1">
                  <li><strong>Major (x.0)</strong> — Significant changes</li>
                  <li><strong>Minor (x.y)</strong> — Small updates</li>
                  <li><strong>Draft</strong> — Append &quot;_DRAFT&quot; to filename</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approval Workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-secondary mb-6">
            Documents progress through a defined workflow before publication. Each stage has clear responsibilities and outcomes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            {approvalWorkflow.map((step, index) => (
              <div key={index} className="flex-1 relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary text-white flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  {index < approvalWorkflow.length - 1 && (
                    <div className="hidden sm:block flex-1 h-0.5 bg-border" />
                  )}
                </div>
                <h4 className="font-semibold text-primary text-sm">{step.name}</h4>
                <p className="text-xs text-secondary mt-1">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-3 border border-border">
              <Clock className="h-5 w-5 text-warning flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-primary text-sm">Review Period</h4>
                <p className="text-xs text-secondary">5 business days standard, 2 days expedited</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border border-border">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-primary text-sm">Approval</h4>
                <p className="text-xs text-secondary">Digital signature via DocuSign</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border border-border">
              <AlertCircle className="h-5 w-5 text-accent flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-primary text-sm">Updates</h4>
                <p className="text-xs text-secondary">Annual review or as needed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
