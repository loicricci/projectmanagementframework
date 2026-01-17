"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CheckCircle2, ArrowRight, ExternalLink, FileText, Lock } from "lucide-react";

interface ToolLink {
  name: string;
  url: string;
  description: string;
}

interface DocuwareLink {
  name: string;
  ref: string;
}

interface Phase {
  id: string;
  order: number;
  name: string;
  shortName: string;
  narrative: string;
  entryCriteria: string[];
  exitGate: string[];
  ceremony: string;
  toolLinks: ToolLink[];
  docuwareLinks: DocuwareLink[];
}

interface PhaseDetailsProps {
  phases: Phase[];
}

export function PhaseDetails({ phases }: PhaseDetailsProps) {
  const { data: session } = useSession();
  const isAuthenticated = !!session;

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {phases.map((phase) => (
        <AccordionItem
          key={phase.id}
          value={phase.id}
          className="border border-border bg-white"
        >
          <AccordionTrigger className="px-6 hover:no-underline">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary text-white flex items-center justify-center font-bold">
                {phase.order}
              </div>
              <div className="text-left">
                <p className="text-xs text-muted">{phase.shortName}</p>
                <p className="text-lg font-semibold text-primary">{phase.name}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-6">
              {/* Narrative */}
              <div>
                <p className="text-secondary leading-relaxed">{phase.narrative}</p>
              </div>

              {/* Entry Criteria and Exit Gate */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Entry Criteria */}
                <div className="p-4 border border-border bg-surface">
                  <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Entry Criteria
                  </h4>
                  <ul className="space-y-2">
                    {phase.entryCriteria.map((criteria, index) => (
                      <li key={index} className="text-sm text-secondary flex items-start gap-2">
                        <span className="text-muted">•</span>
                        {criteria}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exit Gate */}
                <div className="p-4 border border-border bg-surface">
                  <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Exit Gate
                  </h4>
                  <ul className="space-y-2">
                    {phase.exitGate.map((gate, index) => (
                      <li key={index} className="text-sm text-secondary flex items-start gap-2">
                        <span className="text-success">✓</span>
                        {gate}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Governance Ceremony */}
              <div className="p-4 border border-primary/20 bg-primary/5">
                <h4 className="font-semibold text-primary mb-2">Governance Ceremony</h4>
                <Badge variant="default">{phase.ceremony}</Badge>
              </div>

              {/* Tools and Documents */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Tools */}
                <div>
                  <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Related Tools
                  </h4>
                  <div className="space-y-2">
                    {phase.toolLinks.map((tool, index) => (
                      <div key={index} className="p-3 border border-border">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{tool.name}</span>
                          {isAuthenticated ? (
                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent text-xs flex items-center gap-1 hover:underline"
                            >
                              Open <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            <span className="text-muted text-xs flex items-center gap-1">
                              <Lock className="h-3 w-3" /> Sign in
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-secondary">{tool.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DocuWare Links */}
                <div>
                  <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Related Documents
                  </h4>
                  <div className="space-y-2">
                    {phase.docuwareLinks.map((doc, index) => (
                      <div key={index} className="p-3 border border-border">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{doc.name}</span>
                          <code className="text-xs text-accent">{doc.ref}</code>
                        </div>
                        {isAuthenticated ? (
                          <a
                            href="#"
                            className="text-accent text-xs flex items-center gap-1 mt-1 hover:underline"
                          >
                            View in DocuWare <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-muted text-xs flex items-center gap-1 mt-1">
                            <Lock className="h-3 w-3" /> Sign in to access
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
