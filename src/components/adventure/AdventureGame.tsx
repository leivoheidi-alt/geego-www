import { FamilyAdventure } from "@/components/adventure/FamilyAdventure";
import "@/components/adventure/AdventureGame.css";
import "@/components/adventure/AdventureMap.css";

export function AdventureGame() {
  return (
    <div className="adventure">
      <div className="adventure-shell">
        <FamilyAdventure />
      </div>
    </div>
  );
}
