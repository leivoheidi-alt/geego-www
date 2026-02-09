import { useMemo, useState } from "react";
import type { AdventureSession } from "@/components/adventure/AdventureGame";
import type { AdventureTask, Difficulty } from "@/data/adventureTasks";
import { getAdventureCopy } from "@/components/adventure/adventureCopy";

interface AdventureCheckpointProps {
  session: AdventureSession;
  task: AdventureTask;
  onComplete: (difficulty: Difficulty) => void;
  onBackToMap: () => void;
  onReset: () => void;
}

export function AdventureCheckpoint({
  session,
  task,
  onComplete,
  onBackToMap,
  onReset,
}: AdventureCheckpointProps) {
  const copy = getAdventureCopy(session.language);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("junior");
  const [openVideo, setOpenVideo] = useState<Difficulty | null>(null);
  const [videoError, setVideoError] = useState<Record<Difficulty, boolean>>({
    junior: false,
    pro: false,
  });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedDifficulty, setCompletedDifficulty] = useState<Difficulty | null>(null);

  const activeTask = useMemo(
    () => ({
      junior: task.junior,
      pro: task.pro,
    }),
    [task.junior, task.pro],
  );

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleOpenVideo = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setOpenVideo(difficulty);
    setFeedback(null);
  };

  const handleSuccess = () => {
    setShowCelebration(true);
    setCompletedDifficulty(selectedDifficulty);
    setFeedback(copy.celebration);
  };

  const handleRetry = () => {
    setFeedback(null);
  };

  const handleContinue = () => {
    if (!completedDifficulty) return;
    onComplete(completedDifficulty);
  };

  const renderChoice = (difficulty: Difficulty) => {
    const data = activeTask[difficulty];
    const isSelected = selectedDifficulty === difficulty;
    const isVideoOpen = openVideo === difficulty;
    const hasError = videoError[difficulty];

    return (
      <div
        className={
          isSelected
            ? "adventure-choice adventure-choice--selected"
            : "adventure-choice"
        }
        role="button"
        tabIndex={0}
        onClick={() => handleSelectDifficulty(difficulty)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            handleSelectDifficulty(difficulty);
          }
        }}
      >
        <div className="adventure-choice__header">
          <span className="adventure-choice__pill">
            {difficulty === "junior" ? copy.juniorLabel : copy.proLabel}
          </span>
          <h3 className="adventure-choice__title">{data.title}</h3>
        </div>
        <ul className="adventure-choice__list">
          {data.instructions.map((instruction) => (
            <li key={instruction}>{instruction}</li>
          ))}
        </ul>
        <button
          className="adventure-button adventure-button--ghost"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleOpenVideo(difficulty);
          }}
        >
          {copy.openVideo}
        </button>
        {isVideoOpen && (
          <div className="adventure-video">
            {hasError ? (
              <p className="adventure-video__fallback">{copy.videoFallback}</p>
            ) : (
              <video
                controls
                src={data.videoSrc}
                onError={() => setVideoError((current) => ({ ...current, [difficulty]: true }))}
              />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="adventure-screen adventure-checkpoint">
      <header className="adventure-header">
        <div>
          <p className="adventure-eyebrow">{copy.checkpointLabel} {task.checkpointIndex}</p>
          <h2 className="adventure-title">{task.title}</h2>
          <p className="adventure-subtitle">{task.storyLine}</p>
        </div>
        <div className="adventure-header__actions">
          <button className="adventure-button adventure-button--ghost" type="button" onClick={onBackToMap}>
            {copy.backToMap}
          </button>
          <button className="adventure-button adventure-button--ghost" type="button" onClick={onReset}>
            {copy.reset}
          </button>
        </div>
      </header>

      <div className="adventure-checkpoint__meta">
        <p className="adventure-hint">{copy.timerHint}</p>
        <p className="adventure-selected">
          {copy.selectedDifficulty}: <strong>{selectedDifficulty === "junior" ? copy.juniorLabel : copy.proLabel}</strong>
        </p>
      </div>

      <div className="adventure-choice-grid">
        {renderChoice("junior")}
        {renderChoice("pro")}
      </div>

      <div className="adventure-actions">
        <p className="adventure-question">{copy.successQuestion}</p>
        <div className="adventure-actions__row">
          <button className="adventure-button adventure-button--primary" type="button" onClick={handleSuccess}>
            {copy.successButton}
          </button>
          <button className="adventure-button adventure-button--ghost" type="button" onClick={handleRetry}>
            {copy.retryButton}
          </button>
        </div>
        {feedback && <p className="adventure-feedback">{feedback}</p>}
        {showCelebration && (
          <button className="adventure-button adventure-button--secondary" type="button" onClick={handleContinue}>
            {copy.continueToMap}
          </button>
        )}
      </div>
    </section>
  );
}
