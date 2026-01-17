"use client";

import { useState } from "react";
import { PageHeader, Breadcrumb } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash2, Shield, Users, Mail } from "lucide-react";

// Mock data
const initialDomains = [
  { id: "1", domain: "company.com", accessLevel: "USER" },
  { id: "2", domain: "partner.com", accessLevel: "USER" },
];

const initialUsers = [
  { id: "1", email: "admin@company.com", name: "Admin User", role: "ADMIN" },
  { id: "2", email: "user@company.com", name: "Regular User", role: "USER" },
];

export default function UsersManagement() {
  const [domains, setDomains] = useState(initialDomains);
  const [users] = useState(initialUsers);
  const [newDomain, setNewDomain] = useState("");
  const [newDomainLevel, setNewDomainLevel] = useState("USER");

  const addDomain = () => {
    if (newDomain) {
      setDomains([
        ...domains,
        { id: Date.now().toString(), domain: newDomain, accessLevel: newDomainLevel },
      ]);
      setNewDomain("");
    }
  };

  const removeDomain = (id: string) => {
    setDomains(domains.filter((d) => d.id !== id));
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "Admin", href: "/admin" }, { label: "Access Control" }]} />
      
      <PageHeader
        title="Access Control"
        description="Manage allowed domains and user access levels. Users with allowed domain emails are automatically granted access upon sign-in."
      />

      <Tabs defaultValue="domains">
        <TabsList>
          <TabsTrigger value="domains" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Allowed Domains
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="domains">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Add Domain */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add Allowed Domain</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="newDomain">Email Domain</Label>
                  <Input
                    id="newDomain"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    placeholder="example.com"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted mt-1">
                    Users with this email domain will be allowed to sign in
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="accessLevel">Access Level</Label>
                  <select
                    id="accessLevel"
                    value={newDomainLevel}
                    onChange={(e) => setNewDomainLevel(e.target.value)}
                    className="mt-1 w-full h-10 border border-border bg-white px-3 text-sm"
                  >
                    <option value="USER">User (Standard access)</option>
                    <option value="ADMIN">Admin (Full access)</option>
                  </select>
                </div>

                <Button onClick={addDomain} className="w-full">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Domain
                </Button>
              </CardContent>
            </Card>

            {/* Domain List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Allowed Domains</CardTitle>
              </CardHeader>
              <CardContent>
                {domains.length > 0 ? (
                  <ul className="divide-y divide-border">
                    {domains.map((domain) => (
                      <li key={domain.id} className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted" />
                          <span className="font-mono text-sm">{domain.domain}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={domain.accessLevel === "ADMIN" ? "default" : "secondary"}>
                            {domain.accessLevel}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeDomain(domain.id)}
                          >
                            <Trash2 className="h-4 w-4 text-warning" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted text-center py-4">
                    No domains configured. Add a domain to allow users to sign in.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Registered Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="table-institutional">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="font-medium">{user.name}</td>
                        <td className="font-mono text-sm">{user.email}</td>
                        <td>
                          <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                            {user.role}
                          </Badge>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit Role
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 p-4 bg-surface border border-border">
                <p className="text-sm text-muted">
                  <strong className="text-primary">Note:</strong> Users are created automatically when they 
                  sign in with an allowed email domain. To grant admin access, add their domain with Admin 
                  level or add their email to the ADMIN_EMAILS environment variable.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
