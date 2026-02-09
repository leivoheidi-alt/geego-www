import {
  Compass,
  Sparkles,
  Hand,
  Move,
  Dumbbell,
  Zap,
  HelpCircle,
} from "lucide-react";
export type AdventureSkill =
  | "tasapaino"
  | "koordinaatio"
  | "liikkuvuus"
  | "voima"
  | "kehonhallinta"
  | "nopeus"
  | "yllätys";

export const SKILL_ICON_MAP: Record<AdventureSkill, React.ComponentType<{ className?: string }>> = {
  tasapaino: Compass,
  liikkuvuus: Sparkles,
  koordinaatio: Hand,
  kehonhallinta: Move,
  voima: Dumbbell,
  nopeus: Zap,
  yllätys: HelpCircle,
};
