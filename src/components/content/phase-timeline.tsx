"use client";

import { cn } from "@/lib/utils";

interface Phase {
  id: string;
  order: number;
  name: string;
  shortName: string;
}

interface PhaseTimelineProps {
  phases: Phase[];
  currentPhase?: number;
}

export function PhaseTimeline({ phases, currentPhase }: PhaseTimelineProps) {
  return (
    <div className="bg-surface border border-border p-6">
      <h3 className="text-sm font-semibold text-primary mb-6 uppercase tracking-wide">
        Project Lifecycle Overview
      </h3>
      
      {/* Desktop Timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-border" />
          
          {/* Phases */}
          <div className="relative flex justify-between">
            {phases.map((phase, index) => {
              const isCompleted = currentPhase !== undefined && index < currentPhase;
              const isCurrent = currentPhase === index;
              
              return (
                <div key={phase.id} className="flex flex-col items-center">
                  {/* Phase indicator */}
                  <div
                    className={cn(
                      "w-12 h-12 flex items-center justify-center text-sm font-bold border-2 bg-white z-10",
                      isCompleted && "bg-success border-success text-white",
                      isCurrent && "bg-primary border-primary text-white",
                      !isCompleted && !isCurrent && "border-border text-secondary"
                    )}
                  >
                    {phase.order}
                  </div>
                  
                  {/* Phase name */}
                  <div className="mt-3 text-center">
                    <p className="text-xs text-muted">{phase.shortName}</p>
                    <p className="text-sm font-medium text-primary mt-1 max-w-[100px]">
                      {phase.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden space-y-3">
        {phases.map((phase, index) => {
          const isCompleted = currentPhase !== undefined && index < currentPhase;
          const isCurrent = currentPhase === index;
          
          return (
            <div key={phase.id} className="flex items-center gap-4">
              <div
                className={cn(
                  "w-10 h-10 flex items-center justify-center text-sm font-bold border-2 flex-shrink-0",
                  isCompleted && "bg-success border-success text-white",
                  isCurrent && "bg-primary border-primary text-white",
                  !isCompleted && !isCurrent && "border-border text-secondary bg-white"
                )}
              >
                {phase.order}
              </div>
              <div>
                <p className="text-xs text-muted">{phase.shortName}</p>
                <p className="text-sm font-medium text-primary">{phase.name}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-border bg-white" />
          <span className="text-secondary">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary" />
          <span className="text-secondary">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-success" />
          <span className="text-secondary">Completed</span>
        </div>
      </div>
    </div>
  );
}
