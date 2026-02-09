import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { AdventureSession } from "@/components/adventure/AdventureGame";
import { ADVENTURE_TASKS } from "@/data/adventureTasks";
import { buildShareText, getAdventureCopy } from "@/components/adventure/adventureCopy";

interface AdventureFinishProps {
  session: AdventureSession;
  onReset: () => void;
}

const SKILL_LABELS: Record<string, string> = {
  tasapaino: "Tasapaino",
  koordinaatio: "Koordinaatio",
  liikkuvuus: "Liikkuvuus",
  voima: "Voima",
  kehonhallinta: "Kehonhallinta",
  nopeus: "Nopeus",
  yllätys: "Yllätys",
};

export function AdventureFinish({ session, onReset }: AdventureFinishProps) {
  const copy = getAdventureCopy(session.language);
  const [copied, setCopied] = useState(false);

  const skillsUsed = useMemo(() => {
    const skills = new Set(
      ADVENTURE_TASKS.filter((task) => session.completed.includes(task.checkpointIndex)).map(
        (task) => task.skill,
      ),
    );
    return Array.from(skills);
  }, [session.completed]);

  const shareText = buildShareText(session.language, session.pointsTotal);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <section className="adventure-screen adventure-finish">
      <header className="adventure-hero">
        <p className="adventure-hero__eyebrow">{session.familyName}</p>
        <h1 className="adventure-hero__title">{copy.finishTitle}</h1>
        <p className="adventure-hero__subtitle">{copy.finishSubtitle}</p>
      </header>

      <div className="adventure-panel adventure-panel--tight">
        <div className="adventure-summary">
          <div>
            <p className="adventure-summary__label">{copy.completedLabel}</p>
            <p className="adventure-summary__value">{session.completed.length}/{ADVENTURE_TASKS.length}</p>
          </div>
          <div>
            <p className="adventure-summary__label">{copy.pointsLabel}</p>
            <p className="adventure-summary__value">{session.pointsTotal}</p>
          </div>
          <button className="adventure-button adventure-button--ghost" type="button" onClick={onReset}>
            {copy.reset}
          </button>
        </div>

        <div className="adventure-skill-list">
          <h3>{copy.skillsUsed}</h3>
          <div className="adventure-skill-tags">
            {skillsUsed.map((skill) => (
              <span key={skill} className="adventure-tag">
                {SKILL_LABELS[skill] ?? skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="adventure-panel adventure-panel--tight">
        <h3 className="adventure-section-title">{copy.sharePrompt}</h3>
        <div className="adventure-share">
          <p>{shareText}</p>
          <button className="adventure-button adventure-button--secondary" type="button" onClick={handleCopy}>
            {copied ? copy.copiedLabel : copy.copyButton}
          </button>
        </div>
      </div>

      <div className="adventure-panel adventure-panel--tight">
        <h3 className="adventure-section-title">{copy.emailPlaceholderTitle}</h3>
        <p className="adventure-muted">{copy.emailPlaceholderBody}</p>
      </div>

      <div className="adventure-panel adventure-panel--tight">
        <Link className="adventure-link" to="/fi/lataa">
          {copy.downloadLink}
        </Link>
      </div>
    </section>
  );
}
