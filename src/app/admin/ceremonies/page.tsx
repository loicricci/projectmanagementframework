"use client";

import { useState } from "react";
import { PageHeader, Breadcrumb } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Save, Plus, Trash2 } from "lucide-react";

// Mock data
const initialCeremonies = [
  { id: "1", name: "Pre-Design Gate" },
  { id: "2", name: "Design Validation Gate" },
  { id: "3", name: "Master Review" },
  { id: "4", name: "Handover Review" },
  { id: "5", name: "Operational Review" },
];

export default function CeremoniesManagement() {
  const [ceremonies] = useState(initialCeremonies);
  const [selectedCeremony, setSelectedCeremony] = useState(ceremonies[0]);
  const [formData, setFormData] = useState({
    name: selectedCeremony.name,
    purpose: "Ceremony purpose description...",
    participants: ["Participant 1", "Participant 2"],
    inputs: ["Input 1", "Input 2"],
    outputs: ["Output 1", "Output 2"],
    templateLink: "TPL-001",
  });

  const handleSave = () => {
    console.log("Saving ceremony:", formData);
  };

  const addItem = (field: "participants" | "inputs" | "outputs") => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  const removeItem = (field: "participants" | "inputs" | "outputs", index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  const updateItem = (field: "participants" | "inputs" | "outputs", index: number, value: string) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "Admin", href: "/admin" }, { label: "Ceremonies" }]} />
      
      <PageHeader
        title="Ceremonies"
        description="Configure governance ceremonies, participants, inputs, outputs, and template references."
      />

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Ceremony List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Ceremonies</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ul>
              {ceremonies.map((ceremony) => (
                <li key={ceremony.id}>
                  <button
                    onClick={() => {
                      setSelectedCeremony(ceremony);
                      setFormData({
                        name: ceremony.name,
                        purpose: "Purpose description...",
                        participants: ["Participant 1", "Participant 2"],
                        inputs: ["Input 1", "Input 2"],
                        outputs: ["Output 1", "Output 2"],
                        templateLink: "TPL-001",
                      });
                    }}
                    className={`w-full text-left px-4 py-3 text-sm border-l-4 ${
                      selectedCeremony.id === ceremony.id
                        ? "bg-surface border-l-primary text-primary font-medium"
                        : "border-transparent text-secondary hover:bg-surface"
                    }`}
                  >
                    {ceremony.name}
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Editor */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedCeremony.name}</CardTitle>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save Changes
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div>
              <Label htmlFor="name">Ceremony Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="purpose">Purpose</Label>
              <Textarea
                id="purpose"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                rows={3}
                className="mt-1"
              />
            </div>

            {/* Participants */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Participants</Label>
                <Button variant="outline" size="sm" onClick={() => addItem("participants")}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.participants.map((participant, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Input
                      value={participant}
                      onChange={(e) => updateItem("participants", index, e.target.value)}
                      className="w-40"
                      placeholder="Participant..."
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("participants", index)}
                    >
                      <Trash2 className="h-4 w-4 text-warning" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Inputs</Label>
                <Button variant="outline" size="sm" onClick={() => addItem("inputs")}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {formData.inputs.map((input, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => updateItem("inputs", index, e.target.value)}
                      placeholder="Input document or artifact..."
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("inputs", index)}
                    >
                      <Trash2 className="h-4 w-4 text-warning" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Outputs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Outputs</Label>
                <Button variant="outline" size="sm" onClick={() => addItem("outputs")}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {formData.outputs.map((output, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={output}
                      onChange={(e) => updateItem("outputs", index, e.target.value)}
                      placeholder="Output decision or document..."
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("outputs", index)}
                    >
                      <Trash2 className="h-4 w-4 text-warning" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Template Reference */}
            <div>
              <Label htmlFor="templateLink">Template Reference</Label>
              <Input
                id="templateLink"
                value={formData.templateLink}
                onChange={(e) => setFormData({ ...formData, templateLink: e.target.value })}
                className="mt-1"
                placeholder="e.g., TPL-GATE-001"
              />
              <p className="text-xs text-muted mt-1">
                DocuWare template reference for this ceremony
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
