"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface Phase {
  id: string;
  order: number;
  name: string;
  shortName: string;
  ceremony?: string;
}

interface PhaseTimelineProps {
  phases: Phase[];
  currentPhase?: number;
}

function CeremonyDot({ ceremony, style }: { ceremony: string; style?: React.CSSProperties }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
      style={style}
    >
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* The dot */}
        <div className="w-3 h-3 rounded-full bg-amber-500 border-2 border-amber-600 shadow-sm hover:scale-125 transition-transform duration-200" />
        
        {/* Tooltip */}
        {isHovered && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-md whitespace-nowrap shadow-lg z-30">
            {ceremony}
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
          </div>
        )}
      </div>
    </div>
  );
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
          
          {/* Ceremony Dots - positioned at midpoints between phases */}
          {phases.map((phase, index) => {
            if (!phase.ceremony) return null;
            const isLast = index === phases.length - 1;
            const totalPhases = phases.length;
            // For 6 phases: positions are 0%, 20%, 40%, 60%, 80%, 100%
            // Midpoints between phases: 10%, 30%, 50%, 70%, 90%
            // Final dot at 100%
            const stepPercent = 100 / (totalPhases - 1);
            const position = isLast 
              ? "100%"
              : `${(index * stepPercent) + (stepPercent / 2)}%`;
            
            return (
              <CeremonyDot 
                key={`ceremony-${phase.id}`}
                ceremony={phase.ceremony}
                style={{ left: position, top: "24px" }}
              />
            );
          })}
          
          {/* Phases */}
          <div className="relative flex justify-between">
            {phases.map((phase, index) => {
              const isCompleted = currentPhase !== undefined && index < currentPhase;
              const isCurrent = currentPhase === index;
              
              return (
                <div key={phase.id} className="relative flex flex-col items-center">
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
              <div className="flex items-center gap-2">
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
                {/* Ceremony dot for mobile */}
                {phase.ceremony && (
                  <div className="relative group">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-amber-600 cursor-pointer" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                      {phase.ceremony}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                    </div>
                  </div>
                )}
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
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500 border-2 border-amber-600" />
          <span className="text-secondary">Ceremony</span>
        </div>
      </div>
    </div>
  );
}
