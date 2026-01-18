"use client";

import { useState, useEffect } from "react";
import { PageHeader, Breadcrumb } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Save, Plus, Trash2, CheckCircle2, Target, Loader2 } from "lucide-react";

interface Phase {
  id: string;
  order: number;
  name: string;
  shortName: string;
  narrative?: string;
  entryCriteria?: string[];
  exitGate?: string[];
  ceremony?: { id: string; name: string } | null;
}

interface CurrentPhaseSettings {
  currentPhaseId: string | null;
  currentPhase: Phase | null;
  updatedAt: string | null;
  updatedBy: { name: string; email: string } | null;
}

export default function PhasesManagement() {
  const [phases, setPhases] = useState<Phase[]>([]);
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [currentPhaseSettings, setCurrentPhaseSettings] = useState<CurrentPhaseSettings | null>(null);
  const [isLoadingPhases, setIsLoadingPhases] = useState(true);
  const [isLoadingCurrentPhase, setIsLoadingCurrentPhase] = useState(true);
  const [isSavingCurrentPhase, setIsSavingCurrentPhase] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    narrative: "",
    entryCriteria: [] as string[],
    exitGate: [] as string[],
    ceremony: "",
  });

  // Fetch phases and current phase settings on mount
  useEffect(() => {
    fetchPhases();
    fetchCurrentPhaseSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPhases = async () => {
    try {
      setIsLoadingPhases(true);
      const response = await fetch("/api/phases");
      if (response.ok) {
        const data = await response.json();
        setPhases(data);
        if (data.length > 0) {
          setSelectedPhase(data[0]);
          updateFormData(data[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching phases:", error);
    } finally {
      setIsLoadingPhases(false);
    }
  };

  const updateFormData = (phase: Phase) => {
    setFormData({
      name: phase.name,
      shortName: phase.shortName,
      narrative: phase.narrative || "",
      entryCriteria: Array.isArray(phase.entryCriteria) ? phase.entryCriteria : [],
      exitGate: Array.isArray(phase.exitGate) ? phase.exitGate : [],
      ceremony: phase.ceremony?.name || "",
    });
  };

  const fetchCurrentPhaseSettings = async () => {
    try {
      setIsLoadingCurrentPhase(true);
      const response = await fetch("/api/settings/current-phase");
      if (response.ok) {
        const data = await response.json();
        setCurrentPhaseSettings(data);
      }
    } catch (error) {
      console.error("Error fetching current phase:", error);
    } finally {
      setIsLoadingCurrentPhase(false);
    }
  };

  const setAsCurrentPhase = async (phaseId: string) => {
    try {
      setIsSavingCurrentPhase(true);
      const response = await fetch("/api/settings/current-phase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phaseId }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentPhaseSettings(data);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to set current phase");
      }
    } catch (error) {
      console.error("Error setting current phase:", error);
      alert("Failed to set current phase");
    } finally {
      setIsSavingCurrentPhase(false);
    }
  };

  const clearCurrentPhase = async () => {
    try {
      setIsSavingCurrentPhase(true);
      const response = await fetch("/api/settings/current-phase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phaseId: null }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentPhaseSettings(data);
      }
    } catch (error) {
      console.error("Error clearing current phase:", error);
    } finally {
      setIsSavingCurrentPhase(false);
    }
  };

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

  const isCurrentPhase = (phaseId: string) => {
    return currentPhaseSettings?.currentPhaseId === phaseId;
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "Admin", href: "/admin" }, { label: "Phases" }]} />
      
      <PageHeader
        title="Project Phases"
        description="Manage the 6 project lifecycle phases, entry criteria, exit gates, and associated ceremonies."
      />

      {/* Current Phase Status Card */}
      <Card className="mb-6 border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Current Project Phase
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingCurrentPhase ? (
            <div className="flex items-center gap-2 text-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading current phase...
            </div>
          ) : currentPhaseSettings?.currentPhase ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="default" className="text-base px-3 py-1">
                  {currentPhaseSettings.currentPhase.shortName}
                </Badge>
                <span className="text-lg font-semibold text-primary">
                  {currentPhaseSettings.currentPhase.name}
                </span>
              </div>
              {currentPhaseSettings.updatedAt && (
                <p className="text-sm text-muted">
                  Last updated: {new Date(currentPhaseSettings.updatedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {currentPhaseSettings.updatedBy && (
                    <span> by {currentPhaseSettings.updatedBy.name || currentPhaseSettings.updatedBy.email}</span>
                  )}
                </p>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearCurrentPhase}
                disabled={isSavingCurrentPhase}
              >
                {isSavingCurrentPhase && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                Clear Current Phase
              </Button>
            </div>
          ) : (
            <p className="text-secondary">
              No phase is currently set. Select a phase below and click &quot;Set as Current Phase&quot; to indicate the project&apos;s current stage.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Phase List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Phases</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoadingPhases ? (
              <div className="flex items-center justify-center py-8 text-muted">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading phases...
              </div>
            ) : (
              <ul>
                {phases.map((phase) => (
                  <li key={phase.id}>
                    <button
                      onClick={() => {
                        setSelectedPhase(phase);
                        updateFormData(phase);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm border-l-4 ${
                        selectedPhase?.id === phase.id
                          ? "bg-surface border-l-primary text-primary font-medium"
                          : "border-transparent text-secondary hover:bg-surface"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={isCurrentPhase(phase.id) ? "default" : "muted"} 
                          className="text-xs w-6 h-6 flex items-center justify-center p-0"
                        >
                          {phase.order}
                        </Badge>
                        <span className="flex-1">{phase.name}</span>
                        {isCurrentPhase(phase.id) && (
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Editor */}
        <Card className="lg:col-span-3">
          {selectedPhase ? (
            <>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="default" className="mr-2">{selectedPhase.shortName}</Badge>
                    {selectedPhase.name}
                    {isCurrentPhase(selectedPhase.id) && (
                      <Badge variant="outline" className="ml-2 text-success border-success">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Current
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {!isCurrentPhase(selectedPhase.id) && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setAsCurrentPhase(selectedPhase.id)}
                        disabled={isSavingCurrentPhase}
                      >
                        {isSavingCurrentPhase ? (
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                        ) : (
                          <Target className="h-4 w-4 mr-1" />
                        )}
                        Set as Current Phase
                      </Button>
                    )}
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-1" />
                      Save Changes
                    </Button>
                  </div>
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
                disabled
              />
              <p className="text-xs text-muted mt-1">Ceremonies are managed in the Ceremonies section.</p>
            </div>
          </CardContent>
            </>
          ) : (
            <CardContent className="py-12">
              <div className="text-center text-muted">
                {isLoadingPhases ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading phase details...
                  </div>
                ) : (
                  "Select a phase from the list to edit its details."
                )}
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
