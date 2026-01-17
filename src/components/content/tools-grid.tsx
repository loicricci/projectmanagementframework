"use client";

import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Lock, FileText } from "lucide-react";
import {
  LayoutGrid,
  Calculator,
  Users,
  Github,
  Cloud,
  FolderOpen,
  Share2,
  PenTool,
  Mail,
  MessageSquare,
  BarChart3,
  FileSpreadsheet,
  GanttChart,
} from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
  whenToUse: string;
  externalUrl?: string;
  docuwareRef?: string;
  icon: string;
}

interface ToolCategory {
  domain: string;
  tools: Tool[];
}

interface ToolsGridProps {
  categories: ToolCategory[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "layout-grid": LayoutGrid,
  "gantt-chart": GanttChart,
  calculator: Calculator,
  "file-spreadsheet": FileSpreadsheet,
  users: Users,
  github: Github,
  cloud: Cloud,
  "folder-open": FolderOpen,
  "share-2": Share2,
  "pen-tool": PenTool,
  mail: Mail,
  "message-square": MessageSquare,
  "bar-chart-3": BarChart3,
};

export function ToolsGrid({ categories }: ToolsGridProps) {
  const { data: session } = useSession();
  const isAuthenticated = !!session;

  return (
    <div className="space-y-8">
      {categories.map((category, catIndex) => (
        <div key={catIndex}>
          <h2 className="text-h3 mb-4 pb-2 border-b border-border">{category.domain}</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {category.tools.map((tool) => {
              const IconComponent = iconMap[tool.icon] || LayoutGrid;
              
              return (
                <Card key={tool.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-surface flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base">{tool.name}</CardTitle>
                        <p className="text-sm text-secondary mt-1">{tool.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* When to use */}
                      <div>
                        <h4 className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                          When to Use
                        </h4>
                        <p className="text-sm text-secondary">{tool.whenToUse}</p>
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-4 pt-2 border-t border-border">
                        {tool.externalUrl && (
                          <>
                            {isAuthenticated ? (
                              <a
                                href={tool.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-accent flex items-center gap-1 hover:underline"
                              >
                                <ExternalLink className="h-4 w-4" />
                                Open Tool
                              </a>
                            ) : (
                              <span className="text-sm text-muted flex items-center gap-1">
                                <Lock className="h-4 w-4" />
                                Sign in to access
                              </span>
                            )}
                          </>
                        )}

                        {tool.docuwareRef && (
                          <div className="flex items-center gap-1 text-sm">
                            <FileText className="h-4 w-4 text-muted" />
                            <code className="text-xs text-accent">{tool.docuwareRef}</code>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
