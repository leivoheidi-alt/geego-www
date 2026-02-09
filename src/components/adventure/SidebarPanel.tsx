import { useMemo } from "react";
import type { AdventurePlayer, AdventureSession } from "@/components/adventure/AdventureGame";
import { ADVENTURE_TASKS } from "@/data/adventureTasks";
import { getAdventureCopy } from "@/components/adventure/adventureCopy";

export type SidebarMode = "setup" | "ready" | "inProgress";

interface SidebarPanelProps {
  session: AdventureSession;
  mode: SidebarMode;
  onModeChange: (mode: SidebarMode) => void;
  onUpdate: (updates: Partial<AdventureSession>) => void;
  onStart: () => void;
  onReset: () => void;
}

const ROLE_OPTIONS: AdventurePlayer["role"][] = ["Lapsi", "Aikuinen"];

export function SidebarPanel({
  session,
  mode,
  onModeChange,
  onUpdate,
  onStart,
  onReset,
}: SidebarPanelProps) {
  const copy = getAdventureCopy(session.language);

  const filledPlayers = useMemo(
    () => session.players.filter((player) => player.name.trim().length > 0),
    [session.players],
  );

  const isSetupReady = session.familyName.trim().length > 0 && filledPlayers.length >= 2;

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

  if (mode === "setup") {
    return (
      <div className="adventure-sidebar leftPanel">
        <div className="leftPanelInner">
          <h2 className="adventure-title">Geegon perheseikkailu</h2>
          <p className="adventure-hint">
            Kymmenen minuuttia liikettä, naurua ja yhdessä tekemistä.
            Lisää perheesi pelaajat ja lähtekää seikkailulle karttaa pitkin.
          </p>
        

          <div className="adventure-panel adventure-panel--tight formCard">
          <div className="adventure-field">
            <label className="adventure-label" htmlFor="adventure-family-name">
              {copy.familyNameLabel}
            </label>
            <input
              id="adventure-family-name"
              className="adventure-input"
              type="text"
              value={session.familyName}
              onChange={(event) => onUpdate({ familyName: event.target.value })}
              placeholder="Esim. Virtaset"
            />
          </div>

          <div className="adventure-field">
            <label className="adventure-label">{copy.playersLabel}</label>
            <div className="adventure-players">
              {session.players.map((player, index) => (
                <div className="adventure-player-row playerRow" key={`player-${index}`}>
                  <input
                    className="adventure-input"
                    type="text"
                    value={player.name}
                    onChange={(event) => handlePlayerChange(index, { name: event.target.value })}
                    placeholder={copy.playerNamePlaceholder}
                  />
                  <div className="playerRowActions rowBottom">
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
                        className="adventure-button adventure-button--ghost removeBtn removeButton"
                        type="button"
                        onClick={() => handleRemovePlayer(index)}
                      >
                        {copy.removePlayer}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="adventure-button adventure-button--ghost"
              type="button"
              onClick={handleAddPlayer}
            >
              {copy.addPlayer}
            </button>
            <p className="adventure-hint">
              Lisää mukaan lapset ja aikuiset – tehtävät mukautuvat pelaajan mukaan.
            </p>
          </div>

          <div className="adventure-actions">
            <button
              className="adventure-button adventure-button--primary"
              type="button"
              onClick={() => onModeChange("ready")}
              disabled={!isSetupReady}
            >
              Aloita peli
            </button>
          </div>
        </div>
        </div>
      </div>
    );
  }

  if (mode === "ready") {
    return (
      <div className="adventure-sidebar leftPanel">
        <div className="leftPanelInner">
          <p className="adventure-eyebrow">{copy.mapTitle}</p>
          <h2 className="adventure-title">{session.familyName}</h2>
          <p className="adventure-subtitle">
            {copy.completedLabel}: {session.completed.length}/{ADVENTURE_TASKS.length} · {copy.pointsLabel}: {session.pointsTotal}
          </p>
        
          <div className="adventure-panel adventure-panel--tight formCard">
          <p className="adventure-hint">
            Pelaajia: {filledPlayers.length}
          </p>
          <button
            className="adventure-button adventure-button--ghost"
            type="button"
            onClick={() => onModeChange("setup")}
          >
            Muokkaa pelaajia
          </button>
        </div>
        <div className="adventure-actions adventure-actions--left">
          <button className="adventure-button adventure-button--primary" type="button" onClick={() => {
            onModeChange("inProgress");
            onStart();
          }}>
            {copy.startCheckpoint}
          </button>
          <button className="adventure-button adventure-button--ghost" type="button" onClick={onReset}>
            {copy.reset}
          </button>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="adventure-sidebar leftPanel">
      <div className="leftPanelInner">
        <p className="adventure-eyebrow">{copy.mapTitle}</p>
        <h2 className="adventure-title">{session.familyName}</h2>
        <p className="adventure-subtitle">
          {copy.completedLabel}: {session.completed.length}/{ADVENTURE_TASKS.length} · {copy.pointsLabel}: {session.pointsTotal}
        </p>
        <div className="adventure-actions adventure-actions--left">
        <button className="adventure-button adventure-button--ghost" type="button" onClick={onReset}>
          {copy.reset}
        </button>
      </div>
      </div>
    </div>
  );
}
