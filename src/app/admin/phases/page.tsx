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
const initialPhases = [
  { id: "0", order: 0, name: "Pre-Design", shortName: "Phase 0", ceremony: "Pre-Design Gate" },
  { id: "1", order: 1, name: "Design", shortName: "Phase 1", ceremony: "Design Validation Gate" },
  { id: "2", order: 2, name: "Master Review", shortName: "Phase 2", ceremony: "Master Review" },
  { id: "3", order: 3, name: "Build & Supply Chain", shortName: "Phase 3", ceremony: "Operational Review" },
  { id: "4", order: 4, name: "Handover Review", shortName: "Phase 4", ceremony: "Handover Review" },
  { id: "5", order: 5, name: "Site Run", shortName: "Phase 5", ceremony: "Operational Review" },
];

export default function PhasesManagement() {
  const [phases] = useState(initialPhases);
  const [selectedPhase, setSelectedPhase] = useState(phases[0]);
  const [formData, setFormData] = useState({
    name: selectedPhase.name,
    shortName: selectedPhase.shortName,
    narrative: "Phase narrative description...",
    entryCriteria: ["Criterion 1", "Criterion 2"],
    exitGate: ["Gate requirement 1", "Gate requirement 2"],
    ceremony: selectedPhase.ceremony,
  });

  const handleSave = () => {
    console.log("Saving phase:", formData);
  };

  const addCriterion = (type: "entry" | "exit") => {
    if (type === "entry") {
      setFormData({
        ...formData,
        entryCriteria: [...formData.entryCriteria, ""],
      });
    } else {
      setFormData({
        ...formData,
        exitGate: [...formData.exitGate, ""],
      });
    }
  };

  const removeCriterion = (type: "entry" | "exit", index: number) => {
    if (type === "entry") {
      setFormData({
        ...formData,
        entryCriteria: formData.entryCriteria.filter((_, i) => i !== index),
      });
    } else {
      setFormData({
        ...formData,
        exitGate: formData.exitGate.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "Admin", href: "/admin" }, { label: "Phases" }]} />
      
      <PageHeader
        title="Project Phases"
        description="Manage the 6 project lifecycle phases, entry criteria, exit gates, and associated ceremonies."
      />

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Phase List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Phases</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul>
              {phases.map((phase) => (
                <li key={phase.id}>
                  <button
                    onClick={() => {
                      setSelectedPhase(phase);
                      setFormData({
                        name: phase.name,
                        shortName: phase.shortName,
                        narrative: "Phase narrative...",
                        entryCriteria: ["Criterion 1", "Criterion 2"],
                        exitGate: ["Gate 1", "Gate 2"],
                        ceremony: phase.ceremony,
                      });
                    }}
                    className={`w-full text-left px-4 py-3 text-sm border-l-4 ${
                      selectedPhase.id === phase.id
                        ? "bg-surface border-l-primary text-primary font-medium"
                        : "border-transparent text-secondary hover:bg-surface"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="muted" className="text-xs w-6 h-6 flex items-center justify-center p-0">
                        {phase.order}
                      </Badge>
                      <span>{phase.name}</span>
                    </div>
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
              <CardTitle>
                <Badge variant="default" className="mr-2">{selectedPhase.shortName}</Badge>
                {selectedPhase.name}
              </CardTitle>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save Changes
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Phase Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="shortName">Short Name</Label>
                <Input
                  id="shortName"
                  value={formData.shortName}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Narrative */}
            <div>
              <Label htmlFor="narrative">Phase Narrative</Label>
              <Textarea
                id="narrative"
                value={formData.narrative}
                onChange={(e) => setFormData({ ...formData, narrative: e.target.value })}
                rows={4}
                className="mt-1"
              />
              <p className="text-xs text-muted mt-1">
                Describe what happens during this phase and its objectives.
              </p>
            </div>

            {/* Entry Criteria */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Entry Criteria</Label>
                <Button variant="outline" size="sm" onClick={() => addCriterion("entry")}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {formData.entryCriteria.map((criterion, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={criterion}
                      onChange={(e) => {
                        const updated = [...formData.entryCriteria];
                        updated[index] = e.target.value;
                        setFormData({ ...formData, entryCriteria: updated });
                      }}
                      placeholder="Entry criterion..."
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCriterion("entry", index)}
                    >
                      <Trash2 className="h-4 w-4 text-warning" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Exit Gate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Exit Gate Requirements</Label>
                <Button variant="outline" size="sm" onClick={() => addCriterion("exit")}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {formData.exitGate.map((gate, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={gate}
                      onChange={(e) => {
                        const updated = [...formData.exitGate];
                        updated[index] = e.target.value;
                        setFormData({ ...formData, exitGate: updated });
                      }}
                      placeholder="Exit gate requirement..."
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCriterion("exit", index)}
                    >
                      <Trash2 className="h-4 w-4 text-warning" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Ceremony */}
            <div>
              <Label htmlFor="ceremony">Associated Ceremony</Label>
              <Input
                id="ceremony"
                value={formData.ceremony}
                onChange={(e) => setFormData({ ...formData, ceremony: e.target.value })}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
