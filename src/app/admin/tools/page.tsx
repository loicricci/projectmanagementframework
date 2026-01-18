"use client";

import { useState } from "react";
import { PageHeader, Breadcrumb } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Save, Plus, Trash2, ExternalLink } from "lucide-react";

// Mock data
const domains = [
  "Project Management",
  "Finance",
  "HR & Resources",
  "Technology",
  "Documentation",
  "Legal",
  "Admin & Communication",
  "Reporting",
];

const initialTools = [
  { id: "1", name: "Trello", domain: "Project Management", url: "https://trello.com" },
  { id: "2", name: "TeamGantt", domain: "Project Management", url: "https://app.teamgantt.com/" },
  { id: "3", name: "Xero", domain: "Finance", url: "https://xero.com" },
  { id: "4", name: "DocuWare", domain: "Documentation", url: "#" },
  { id: "5", name: "Power BI", domain: "Reporting", url: "#" },
];

export default function ToolsManagement() {
  const [tools] = useState(initialTools);
  const [selectedDomain, setSelectedDomain] = useState(domains[0]);
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const [formData, setFormData] = useState({
    name: selectedTool.name,
    domain: selectedTool.domain,
    description: "Tool description...",
    whenToUse: "When to use this tool...",
    externalUrl: selectedTool.url,
    docuwareRef: "",
  });

  const handleSave = () => {
    console.log("Saving tool:", formData);
  };

  const filteredTools = tools.filter((t) => t.domain === selectedDomain);

  return (
    <div>
      <Breadcrumb items={[{ label: "Admin", href: "/admin" }, { label: "Tools" }]} />
      
      <PageHeader
        title="Tools & Stack"
        description="Manage tool references, URLs, descriptions, and domain categorizations."
      />

      <Tabs defaultValue={domains[0]} onValueChange={setSelectedDomain}>
        <TabsList className="flex-wrap h-auto gap-1 mb-6">
          {domains.map((domain) => (
            <TabsTrigger key={domain} value={domain} className="text-xs">
              {domain}
            </TabsTrigger>
          ))}
        </TabsList>

        {domains.map((domain) => (
          <TabsContent key={domain} value={domain}>
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Tool List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Tools</CardTitle>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredTools.length > 0 ? (
                    <ul>
                      {filteredTools.map((tool) => (
                        <li key={tool.id}>
                          <button
                            onClick={() => {
                              setSelectedTool(tool);
                              setFormData({
                                name: tool.name,
                                domain: tool.domain,
                                description: "Tool description...",
                                whenToUse: "When to use...",
                                externalUrl: tool.url,
                                docuwareRef: "",
                              });
                            }}
                            className={`w-full text-left px-4 py-3 text-sm border-l-4 ${
                              selectedTool.id === tool.id
                                ? "bg-surface border-l-primary text-primary font-medium"
                                : "border-transparent text-secondary hover:bg-surface"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{tool.name}</span>
                              {tool.url && tool.url !== "#" && (
                                <ExternalLink className="h-3 w-3 text-muted" />
                              )}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-sm text-muted text-center">
                      No tools in this domain yet.
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Editor */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{selectedTool?.name || "Select a tool"}</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-warning">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                      <Button size="sm" onClick={handleSave}>
                        <Save className="h-4 w-4 mr-1" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="toolName">Tool Name</Label>
                      <Input
                        id="toolName"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="domain">Domain</Label>
                      <select
                        id="domain"
                        value={formData.domain}
                        onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                        className="mt-1 w-full h-10 border border-border bg-white px-3 text-sm"
                      >
                        {domains.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="whenToUse">When to Use</Label>
                    <Textarea
                      id="whenToUse"
                      value={formData.whenToUse}
                      onChange={(e) => setFormData({ ...formData, whenToUse: e.target.value })}
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="externalUrl">External URL</Label>
                      <Input
                        id="externalUrl"
                        type="url"
                        value={formData.externalUrl}
                        onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                        className="mt-1"
                        placeholder="https://..."
                      />
                      <p className="text-xs text-muted mt-1">
                        Visible only to authenticated users
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="docuwareRef">DocuWare Reference</Label>
                      <Input
                        id="docuwareRef"
                        value={formData.docuwareRef}
                        onChange={(e) => setFormData({ ...formData, docuwareRef: e.target.value })}
                        className="mt-1"
                        placeholder="e.g., DOC-001"
                      />
                      <p className="text-xs text-muted mt-1">
                        Optional template or guide reference
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
