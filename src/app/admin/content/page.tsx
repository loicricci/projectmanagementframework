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
import { Save, Eye, Edit2 } from "lucide-react";

// Mock data - in production this would come from the database
const pages = [
  { id: "home", title: "Home", slug: "/", published: true },
  { id: "framework", title: "Framework", slug: "/framework", published: true },
  { id: "lifecycle", title: "Project Lifecycle", slug: "/lifecycle", published: true },
  { id: "governance", title: "Governance & Ceremonies", slug: "/governance", published: true },
  { id: "tools", title: "Tools & Stack", slug: "/tools", published: true },
  { id: "documentation", title: "Documentation", slug: "/documentation", published: true },
  { id: "reporting", title: "Reporting", slug: "/reporting", published: true },
];

export default function ContentManagement() {
  const [selectedPage, setSelectedPage] = useState(pages[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: selectedPage.title,
    description: "Manage this page content and description.",
  });

  const handleSave = () => {
    // In production, this would save to the database via API
    console.log("Saving:", formData);
    setIsEditing(false);
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "Admin", href: "/admin" }, { label: "Content" }]} />
      
      <PageHeader
        title="Content Management"
        description="Edit page content, descriptions, and text blocks across the dashboard."
      />

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Page List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Pages</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul>
              {pages.map((page) => (
                <li key={page.id}>
                  <button
                    onClick={() => {
                      setSelectedPage(page);
                      setFormData({ title: page.title, description: "Page description here." });
                      setIsEditing(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm border-l-4 ${
                      selectedPage.id === page.id
                        ? "bg-surface border-l-primary text-primary font-medium"
                        : "border-transparent text-secondary hover:bg-surface"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{page.title}</span>
                      {page.published && (
                        <Badge variant="success" className="text-xs">Live</Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted">{page.slug}</span>
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
              <CardTitle>{selectedPage.title}</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={selectedPage.slug} target="_blank">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </a>
                </Button>
                {!isEditing ? (
                  <Button size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                ) : (
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4">
                <div>
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Page Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted">
                    Note: Page content is managed through the database. In this demo, changes are shown 
                    but not persisted. Connect to a database to enable full content management.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="seo" className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    placeholder="SEO title for search engines"
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    placeholder="SEO description for search engines"
                    disabled={!isEditing}
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border">
                  <div>
                    <h4 className="font-medium">Published</h4>
                    <p className="text-sm text-muted">Page is visible to all users</p>
                  </div>
                  <Badge variant={selectedPage.published ? "success" : "secondary"}>
                    {selectedPage.published ? "Published" : "Draft"}
                  </Badge>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
