"use client";

import { useState, useEffect } from "react";
import { PageHeader, Breadcrumb } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Save, User, Users, Building2, Briefcase, Globe, PenTool, Wallet, Package, HardHat, Scale, Compass, UserCheck, Landmark, Truck, Check, X, Loader2 } from "lucide-react";

// Role definitions matching governance page
const allRoles = [
  // External Parties
  { category: "external", name: "External Customer", role: "Final User", icon: UserCheck },
  { category: "external", name: "External Stakeholders", role: "Regulatory & Third Parties", icon: Landmark },
  { category: "external", name: "Suppliers & Contractors", role: "Delivery Partners", icon: Truck },
  // Internal Stakeholders
  { category: "stakeholder", name: "Shareholders / Board", role: "Capital Providers", icon: Landmark },
  { category: "stakeholder", name: "Business Owner", role: "P&L Accountability", icon: Briefcase },
  // Internal Roles
  { category: "internal", name: "Business Director", role: "Customer Champion", icon: Building2 },
  { category: "internal", name: "Project Director", role: "Delivery Lead", icon: Compass },
  { category: "internal", name: "Relationship Coordinator", role: "Interface Manager", icon: Globe },
  { category: "internal", name: "Engineering / Design Lead", role: "Technical Authority", icon: PenTool },
  { category: "internal", name: "Finance Lead", role: "Financial Controller", icon: Wallet },
  { category: "internal", name: "Procurement & Supply Chain Lead", role: "Sourcing Manager", icon: Package },
  { category: "internal", name: "Site / Operations Lead", role: "Execution Manager", icon: HardHat },
  { category: "internal", name: "Legal & Compliance Lead", role: "Risk & Compliance", icon: Scale },
];

function roleNameToKey(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const getCategoryStyle = (category: string) => {
  switch (category) {
    case "external":
      return { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", icon: "text-emerald-600" };
    case "stakeholder":
      return { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", icon: "text-violet-600" };
    case "internal":
      return { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700", icon: "text-cyan-600" };
    default:
      return { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-700", icon: "text-slate-600" };
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "external": return "External Party";
    case "stakeholder": return "Internal Stakeholder";
    case "internal": return "Internal Role";
    default: return category;
  }
};

interface RoleAssignment {
  id?: string;
  roleKey: string;
  roleName: string;
  assigneeName: string | null;
  assigneeEmail: string | null;
  assigneePhone: string | null;
  notes: string | null;
}

export default function RolesManagement() {
  const [assignments, setAssignments] = useState<Map<string, RoleAssignment>>(new Map());
  const [selectedRole, setSelectedRole] = useState(allRoles[0]);
  const [formData, setFormData] = useState({
    assigneeName: "",
    assigneeEmail: "",
    assigneePhone: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(true);

  // Fetch existing assignments
  useEffect(() => {
    fetch("/api/role-assignments")
      .then((res) => res.json())
      .then((data) => {
        const map = new Map<string, RoleAssignment>();
        data.forEach((a: RoleAssignment) => map.set(a.roleKey, a));
        setAssignments(map);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch assignments:", err);
        setLoading(false);
      });
  }, []);

  // Update form when role changes
  useEffect(() => {
    const key = roleNameToKey(selectedRole.name);
    const existing = assignments.get(key);
    if (existing) {
      setFormData({
        assigneeName: existing.assigneeName || "",
        assigneeEmail: existing.assigneeEmail || "",
        assigneePhone: existing.assigneePhone || "",
        notes: existing.notes || "",
      });
    } else {
      setFormData({
        assigneeName: "",
        assigneeEmail: "",
        assigneePhone: "",
        notes: "",
      });
    }
  }, [selectedRole, assignments]);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");

    try {
      const response = await fetch("/api/role-assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleKey: roleNameToKey(selectedRole.name),
          roleName: selectedRole.name,
          ...formData,
        }),
      });

      if (response.ok) {
        const saved = await response.json();
        setAssignments((prev) => {
          const newMap = new Map(prev);
          newMap.set(saved.roleKey, saved);
          return newMap;
        });
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      console.error("Save error:", error);
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const style = getCategoryStyle(selectedRole.category);
  const RoleIcon = selectedRole.icon;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb items={[{ label: "Admin", href: "/admin" }, { label: "Role Assignments" }]} />
      
      <PageHeader
        title="Role Assignments"
        description="Assign people to organizational roles. These assignments will appear in the Stakeholder Directory on the Governance page."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Role List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" />
              Roles
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[600px] overflow-y-auto">
              {/* External Parties */}
              <div className="px-4 py-2 bg-emerald-50/50 border-b border-emerald-100">
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">External Parties</span>
              </div>
              {allRoles.filter(r => r.category === "external").map((role) => {
                const key = roleNameToKey(role.name);
                const hasAssignment = assignments.get(key)?.assigneeName;
                const Icon = role.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full text-left px-4 py-3 text-sm border-l-4 flex items-center justify-between ${
                      selectedRole.name === role.name
                        ? "bg-emerald-50 border-l-emerald-500 text-emerald-700 font-medium"
                        : "border-transparent text-secondary hover:bg-surface"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{role.name}</span>
                    </div>
                    {hasAssignment && (
                      <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                        <User className="h-3 w-3 mr-1" />
                        Assigned
                      </Badge>
                    )}
                  </button>
                );
              })}

              {/* Internal Stakeholders */}
              <div className="px-4 py-2 bg-violet-50/50 border-b border-violet-100">
                <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider">Internal Stakeholders</span>
              </div>
              {allRoles.filter(r => r.category === "stakeholder").map((role) => {
                const key = roleNameToKey(role.name);
                const hasAssignment = assignments.get(key)?.assigneeName;
                const Icon = role.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full text-left px-4 py-3 text-sm border-l-4 flex items-center justify-between ${
                      selectedRole.name === role.name
                        ? "bg-violet-50 border-l-violet-500 text-violet-700 font-medium"
                        : "border-transparent text-secondary hover:bg-surface"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{role.name}</span>
                    </div>
                    {hasAssignment && (
                      <Badge variant="outline" className="bg-violet-100 text-violet-700 border-violet-200 text-xs">
                        <User className="h-3 w-3 mr-1" />
                        Assigned
                      </Badge>
                    )}
                  </button>
                );
              })}

              {/* Internal Roles */}
              <div className="px-4 py-2 bg-cyan-50/50 border-b border-cyan-100">
                <span className="text-xs font-semibold text-cyan-700 uppercase tracking-wider">Internal Roles</span>
              </div>
              {allRoles.filter(r => r.category === "internal").map((role) => {
                const key = roleNameToKey(role.name);
                const hasAssignment = assignments.get(key)?.assigneeName;
                const Icon = role.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full text-left px-4 py-3 text-sm border-l-4 flex items-center justify-between ${
                      selectedRole.name === role.name
                        ? "bg-cyan-50 border-l-cyan-500 text-cyan-700 font-medium"
                        : "border-transparent text-secondary hover:bg-surface"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{role.name}</span>
                    </div>
                    {hasAssignment && (
                      <Badge variant="outline" className="bg-cyan-100 text-cyan-700 border-cyan-200 text-xs">
                        <User className="h-3 w-3 mr-1" />
                        Assigned
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Editor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${style.bg}`}>
                  <RoleIcon className={`h-5 w-5 ${style.icon}`} />
                </div>
                <div>
                  <CardTitle>{selectedRole.name}</CardTitle>
                  <p className="text-sm text-muted mt-0.5">{selectedRole.role}</p>
                </div>
              </div>
              <Badge variant="outline" className={`${style.bg} ${style.text} ${style.border}`}>
                {getCategoryLabel(selectedRole.category)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Assignee Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assigneeName" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted" />
                  Assigned Person
                </Label>
                <Input
                  id="assigneeName"
                  value={formData.assigneeName}
                  onChange={(e) => setFormData({ ...formData, assigneeName: e.target.value })}
                  className="mt-1.5"
                  placeholder="e.g., Mickael Urbani"
                />
              </div>

              <div>
                <Label htmlFor="assigneeEmail">Email Address</Label>
                <Input
                  id="assigneeEmail"
                  type="email"
                  value={formData.assigneeEmail}
                  onChange={(e) => setFormData({ ...formData, assigneeEmail: e.target.value })}
                  className="mt-1.5"
                  placeholder="e.g., m.urbani@company.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="assigneePhone">Phone Number</Label>
              <Input
                id="assigneePhone"
                type="tel"
                value={formData.assigneePhone}
                onChange={(e) => setFormData({ ...formData, assigneePhone: e.target.value })}
                className="mt-1.5"
                placeholder="e.g., +33 6 12 34 56 78"
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1.5"
                placeholder="Additional notes about this assignment..."
              />
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="text-sm text-muted">
                {formData.assigneeName ? (
                  <span className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${style.bg} flex items-center justify-center`}>
                      <User className={`h-3 w-3 ${style.icon}`} />
                    </div>
                    <span className="text-primary font-medium">{formData.assigneeName}</span>
                    <span>will be assigned to this role</span>
                  </span>
                ) : (
                  <span className="italic">No person assigned to this role</span>
                )}
              </div>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : saveStatus === "success" ? (
                  <Check className="h-4 w-4 mr-1 text-success" />
                ) : saveStatus === "error" ? (
                  <X className="h-4 w-4 mr-1 text-warning" />
                ) : (
                  <Save className="h-4 w-4 mr-1" />
                )}
                {saving ? "Saving..." : saveStatus === "success" ? "Saved!" : saveStatus === "error" ? "Error" : "Save Assignment"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
