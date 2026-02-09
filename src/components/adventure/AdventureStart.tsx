import type { AdventureLanguage, AdventurePlayer, AdventureSession } from "@/components/adventure/AdventureGame";
import { getAdventureCopy } from "@/components/adventure/adventureCopy";

interface AdventureStartProps {
  session: AdventureSession;
  onUpdate: (updates: Partial<AdventureSession>) => void;
  onStart: () => void;
}

const ROLE_OPTIONS: AdventurePlayer["role"][] = ["Lapsi", "Aikuinen"];

export function AdventureStart({ session, onUpdate, onStart }: AdventureStartProps) {
  const copy = getAdventureCopy(session.language);

  const handleLanguageChange = (language: AdventureLanguage) => {
    onUpdate({ language });
  };

  const handleFamilyNameChange = (value: string) => {
    onUpdate({ familyName: value });
  };

  const handlePlayerChange = (index: number, updates: Partial<AdventurePlayer>) => {
    const nextPlayers = session.players.map((player, playerIndex) =>
      playerIndex === index ? { ...player, ...updates } : player,
    );
    onUpdate({ players: nextPlayers });
  };

  const handleAddPlayer = () => {
    onUpdate({ players: [...session.players, { name: "", role: "Lapsi" }] });
  };

  const handleRemovePlayer = (index: number) => {
    const nextPlayers = session.players.filter((_, playerIndex) => playerIndex !== index);
    onUpdate({ players: nextPlayers.length ? nextPlayers : [{ name: "", role: "Lapsi" }] });
  };

  const isStartDisabled = session.familyName.trim().length === 0;

  return (
    <section className="adventure-screen adventure-start">
      <header className="adventure-hero">
        <p className="adventure-hero__eyebrow">Perheseikkailu</p>
        <h1 className="adventure-hero__title">{copy.title}</h1>
        <p className="adventure-hero__subtitle">{copy.subtitle}</p>
      </header>

      <div className="adventure-panel">
        <div className="adventure-field">
          <label className="adventure-label" htmlFor="adventure-family-name">
            {copy.familyNameLabel}
          </label>
          <input
            id="adventure-family-name"
            className="adventure-input"
            type="text"
            value={session.familyName}
            onChange={(event) => handleFamilyNameChange(event.target.value)}
            placeholder="Esim. Virtaset"
          />
        </div>

        <div className="adventure-field">
          <label className="adventure-label">{copy.playersLabel}</label>
          <div className="adventure-players">
            {session.players.map((player, index) => (
              <div className="adventure-player-row" key={`player-${index}`}>
                <input
                  className="adventure-input"
                  type="text"
                  value={player.name}
                  onChange={(event) => handlePlayerChange(index, { name: event.target.value })}
                  placeholder={copy.playerNamePlaceholder}
                />
                <select
                  className="adventure-select"
                  value={player.role}
                  onChange={(event) =>
                    handlePlayerChange(index, { role: event.target.value as AdventurePlayer["role"] })
                  }
                  aria-label={copy.playerRoleLabel}
                >
                  {ROLE_OPTIONS.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {session.players.length > 1 && (
                  <button
                    className="adventure-button adventure-button--ghost"
                    type="button"
                    onClick={() => handleRemovePlayer(index)}
                  >
                    {copy.removePlayer}
                  </button>
                )}
              </div>
            ))}
          </div>
          <button className="adventure-button adventure-button--ghost" type="button" onClick={handleAddPlayer}>
            {copy.addPlayer}
          </button>
        </div>

        <div className="adventure-field">
          <span className="adventure-label">{copy.languageLabel}</span>
          <div className="adventure-language">
            {(
              [
                { value: "fi", label: "FI" },
                { value: "sv", label: "SE" },
                { value: "en", label: "EN" },
              ] as { value: AdventureLanguage; label: string }[]
            ).map((option) => (
              <button
                key={option.value}
                className={
                  option.value === session.language
                    ? "adventure-pill adventure-pill--active"
                    : "adventure-pill"
                }
                type="button"
                onClick={() => handleLanguageChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="adventure-actions">
          <button
            className="adventure-button adventure-button--primary"
            type="button"
            onClick={onStart}
            disabled={isStartDisabled}
          >
            {copy.startAdventure}
          </button>
          {isStartDisabled && <p className="adventure-hint">{copy.startHint}</p>}
        </div>
      </div>
    </section>
  );
}
