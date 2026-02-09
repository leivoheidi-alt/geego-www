import { Check, Lock } from "lucide-react";
import type { AdventureStop } from "@/data/adventureStops";
import { SKILL_ICON_MAP } from "@/components/adventure/skillIconMap";

interface MapStageProps {
  stops: AdventureStop[];
  currentStop: number;
  completedStops: number[];
  showIntro: boolean;
  onIntroEnd: () => void;
  onNodeClick: () => void;
  mapDisabled?: boolean;
  viewBoxWidth: number;
  viewBoxHeight: number;
  routePath: string;
  nodePositions: Record<number, { left: number; top: number }>;
}

export function MapStage({
  stops,
  currentStop,
  completedStops,
  showIntro,
  onIntroEnd,
  onNodeClick,
  mapDisabled = false,
  viewBoxWidth,
  viewBoxHeight,
  routePath,
  nodePositions,
}: MapStageProps) {
  return (
    <div className={`adventure-map__stage${mapDisabled ? " adventure-map__stage--disabled" : ""}`}>
      <div className={`adventure-map__canvas${showIntro ? " adventure-map__canvas--locked" : ""}`}>
        {showIntro && (
          <div className="adventure-map__intro" role="dialog" aria-live="polite">
            <video
              className="adventure-map__intro-video"
              autoPlay
              muted
              playsInline
              onEnded={onIntroEnd}
            >
              <source src="/images/maps/Geego%20run.mp4" type="video/mp4" />
            </video>
          </div>
        )}
        <svg
          className="adventure-map__route"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="adventure-map__route-base" d={routePath} />
          <path className="adventure-map__route-highlight" d={routePath} />
        </svg>

        {stops.map((task) => {
          const isCompleted = completedStops.includes(task.id);
          const isCurrent = currentStop === task.id && !isCompleted;
          const isLocked = task.id > currentStop;
          const position = nodePositions[task.id];
          const state = isCompleted ? "completed" : isCurrent ? "current" : "locked";
          const Icon = SKILL_ICON_MAP[task.skill];
          const isMarkerClamped = position.top <= 12;

          return (
            <div
              key={task.id}
              className={`adventure-map__node-wrap adventure-map__node-wrap--${state}`}
              style={{ left: `${position.left}%`, top: `${position.top}%` }}
            >
              {isCurrent && (
                <span
                  className={isMarkerClamped ? "nodeMarker markerClamped" : "nodeMarker"}
                  aria-hidden="true"
                />
              )}
            <button
              className={`adventure-map__node mapNode mapNode--${state} adventure-map__node--${state}`}
                type="button"
                onClick={() => {
                  if (mapDisabled) return;
                  if (isLocked) return;
                  if (isCurrent) onNodeClick();
                }}
                disabled={isLocked}
                title={isCompleted ? "Suoritettu" : undefined}
                aria-label={`Rasti ${task.id}: ${task.title}`}
              >
              <span className="adventure-map__pin">
                <span className="adventure-map__pin-disc">
                  <Icon className="adventure-map__pin-icon" aria-hidden="true" />
                  {isLocked && (
                    <span className="nodeBadge nodeBadge--lock" aria-hidden="true">
                      <Lock aria-hidden="true" />
                    </span>
                  )}
                  {isCompleted && !isLocked && (
                    <span className="nodeBadge nodeBadge--check" aria-hidden="true">
                      <Check aria-hidden="true" />
                    </span>
                  )}
                </span>
              </span>
            </button>
          </div>
        );
        })}
      </div>
    </div>
  );
}
