import { useEffect, useMemo, useRef, useState } from "react";
import { ADVENTURE_STOPS, type AdventureStop } from "@/data/adventureStops";
import { MapStage } from "@/components/adventure/MapStage";
import { useSessionStorageState } from "@/hooks/useSessionStorageState";

const STORAGE_KEY = "geego_adventure_session";
const SESSION_KEY = "geego:familyAdventureSession:v1";

type Player = { id: string; name: string; role: "child" | "adult"; avatar?: string };

type UiMode = "setup" | "map" | "task" | "finish";

type AdventureState = {
  familyName: string;
  players: Player[];
  currentStop: number;
  completedStops: number[];
  score: number;
  uiMode: UiMode;
};

type AdventureSession = {
  sessionId: string;
  startedAt: string;
  players: { id: string; name: string; avatar: string }[];
  tasks: {
    [taskId: string]: {
      successfulSubUserIds: string[];
      completedAt: string;
      pointsAwarded: boolean;
    };
  };
  totalPointsBySubUserId: Record<string, number>;
  familyBonusPoints: number;
};

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `player-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const createPlayer = (): Player => ({
  id: createId(),
  name: "",
  role: "child",
  avatar: "",
});

const DEFAULT_STATE: AdventureState = {
  familyName: "",
  players: [createPlayer()],
  currentStop: 1,
  completedStops: [],
  score: 0,
  uiMode: "setup",
};

const NODE_POSITIONS: Record<number, { left: number; top: number }> = {
  1: { left: 52, top: 18 },
  2: { left: 32, top: 30 },
  3: { left: 63, top: 32 },
  4: { left: 72, top: 44 },
  5: { left: 30, top: 70 },
  6: { left: 55, top: 78 },
};

const VIEWBOX_WIDTH = 1000;
const VIEWBOX_HEIGHT = 600;

const toViewBoxPoint = (position: { left: number; top: number }) => ({
  x: (position.left / 100) * VIEWBOX_WIDTH,
  y: (position.top / 100) * VIEWBOX_HEIGHT,
});

const buildRoutePath = () => {
  const points = ADVENTURE_STOPS.map((task) => toViewBoxPoint(NODE_POSITIONS[task.id]));
  if (points.length === 0) return "";
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const current = points[i];
    const cp1x = prev.x + (current.x - prev.x) * 0.35;
    const cp1y = prev.y + (current.y - prev.y) * 0.05;
    const cp2x = prev.x + (current.x - prev.x) * 0.65;
    const cp2y = prev.y + (current.y - prev.y) * 0.95;
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${current.x} ${current.y}`;
  }
  return path;
};

export function FamilyAdventure() {
  const [state, setState] = useSessionStorageState<AdventureState>(STORAGE_KEY, DEFAULT_STATE);
  const [session, setSession] = useSessionStorageState<AdventureSession | null>(SESSION_KEY, null);
  const [toast, setToast] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [taskOpen, setTaskOpen] = useState(false);
  const [activeStopId, setActiveStopId] = useState<number | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [selectedSuccessIds, setSelectedSuccessIds] = useState<string[]>([]);
  const [successSaving, setSuccessSaving] = useState(false);

  const routePath = useMemo(() => buildRoutePath(), []);
  const safePlayers = Array.isArray(state.players) ? state.players.filter(Boolean) : [];
  const currentStop = state.currentStop;
  const currentTask = ADVENTURE_STOPS.find((stop) => stop.id === currentStop) ?? ADVENTURE_STOPS[0];
  const activeStop =
    ADVENTURE_STOPS.find((stop) => stop.id === activeStopId) ??
    ADVENTURE_STOPS.find((stop) => stop.id === currentStop) ??
    ADVENTURE_STOPS[0];
  const sessionTasks = session?.tasks ?? {};
  const sessionTotals = session?.totalPointsBySubUserId ?? {};
  const sessionPlayers = session?.players ?? [];
  const familyBonusPoints = session?.familyBonusPoints ?? 0;
  const completedTasksCount = session ? Object.keys(sessionTasks).length : state.completedStops.length;
  const familyTotalPoints = session
    ? Object.values(sessionTotals).reduce((sum, value) => sum + value, 0) + familyBonusPoints
    : state.score;

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 1200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!Array.isArray(state.players) || state.players.length === 0) {
      updateState({ players: [createPlayer()] });
      return;
    }
    const needsIds = safePlayers.some((player) => !player?.id);
    if (!needsIds) return;
    const nextPlayers = safePlayers.map((player) => ({
      ...player,
      id: player.id || createId(),
    }));
    updateState({ players: nextPlayers });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    setVideoError(false);
    setIsPaused(true);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [currentStop, activeStopId]);

  useEffect(() => {
    if (!taskOpen) return undefined;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleCloseTask();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [taskOpen]);

  const updateState = (updates: Partial<AdventureState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleReset = () => {
    if (!window.confirm("Haluatko varmasti aloittaa alusta?")) return;
    // Reset game: clear progress and return to setup.
    setState({ ...DEFAULT_STATE });
    setSession(null);
    window.sessionStorage.removeItem(SESSION_KEY);
  };

  const validatePlayers = () => {
    const hasFamily = state.familyName.trim().length > 0;
    const namedPlayers = safePlayers.filter((player) => player.name.trim().length > 0);
    return hasFamily && namedPlayers.length >= 1 && namedPlayers.length === safePlayers.length;
  };

  const handleStartGame = () => {
    if (!validatePlayers()) return;
    const now = new Date().toISOString();
    const sessionPlayers = safePlayers.map((player) => ({
      id: player.id,
      name: player.name,
      avatar: player.avatar ?? "",
    }));
    const totalPointsBySubUserId = sessionPlayers.reduce<Record<string, number>>((acc, player) => {
      acc[player.id] = 0;
      return acc;
    }, {});
    setSession({
      sessionId: createId(),
      startedAt: now,
      players: sessionPlayers,
      tasks: {},
      totalPointsBySubUserId,
      familyBonusPoints: 0,
    });
    // Start game: reset progress and move to map view.
    updateState({
      uiMode: "map",
      currentStop: 1,
      completedStops: [],
      score: 0,
    });
  };

  const handleContinueGame = () => {
    updateState({ uiMode: "map" });
  };

  const handleStartTask = () => {
    setActiveStopId(currentStop);
    setTaskOpen(true);
  };

  const handleOpenSuccess = () => {
    const players = sessionPlayers.length
      ? sessionPlayers
      : safePlayers.map((player) => ({
          id: player.id,
          name: player.name,
          avatar: player.avatar ?? "",
        }));
    setSelectedSuccessIds(players.map((player) => player.id));
    setSuccessOpen(true);
  };

  const handlePersistSuccess = () => {
    if (!session) return;
    const now = new Date().toISOString();
    const taskId = String(activeStop.id);
    const existingTask = sessionTasks[taskId];
    const pointsAlreadyAwarded = existingTask?.pointsAwarded ?? false;
    const allSelected =
      sessionPlayers.length > 0 && selectedSuccessIds.length === sessionPlayers.length;

    const nextTasks = {
      ...sessionTasks,
      [taskId]: {
        successfulSubUserIds: selectedSuccessIds,
        completedAt: now,
        pointsAwarded: true,
      },
    };

    const nextTotals = { ...sessionTotals };
    let nextFamilyBonus = familyBonusPoints;

    if (!pointsAlreadyAwarded) {
      selectedSuccessIds.forEach((id) => {
        nextTotals[id] = (nextTotals[id] ?? 0) + 10;
      });
      if (allSelected) {
        nextFamilyBonus += 20;
      }
    }

    const nextSession = {
      ...session,
      tasks: nextTasks,
      totalPointsBySubUserId: nextTotals,
      familyBonusPoints: nextFamilyBonus,
    };

    setSession(nextSession);

    const nextCompletedStops = state.completedStops.includes(activeStop.id)
      ? state.completedStops
      : [...state.completedStops, activeStop.id];
    const nextCount = Object.keys(nextTasks).length;
    const isFinish = nextCount >= ADVENTURE_STOPS.length;

    updateState({
      completedStops: nextCompletedStops,
      score:
        Object.values(nextTotals).reduce((sum, value) => sum + value, 0) + nextFamilyBonus,
      currentStop: isFinish ? state.currentStop : Math.min(activeStop.id + 1, ADVENTURE_STOPS.length),
      uiMode: isFinish ? "finish" : "map",
    });

    const pointsAdded = pointsAlreadyAwarded
      ? 0
      : selectedSuccessIds.length * 10 + (allSelected ? 20 : 0);
    setToast(pointsAdded ? `+${pointsAdded} pistettä!` : "Tallennettu");
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPaused(true);
    }
    setSuccessOpen(false);
    setTaskOpen(false);
    setActiveStopId(null);
  };

  const handleSaveSuccess = () => {
    if (successSaving) return;
    setSuccessSaving(true);
    window.setTimeout(() => {
      handlePersistSuccess();
      setSuccessSaving(false);
    }, 700);
  };

  // Task completion is handled after saving per-player success.

  const handleToggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleCloseTask = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPaused(true);
      videoRef.current.currentTime = 0;
    }
    setTaskOpen(false);
    setActiveStopId(null);
  };

  const playersFilled = safePlayers.filter((player) => player.name.trim().length > 0);
  const hasProgress = completedTasksCount > 0 || state.score > 0 || state.currentStop > 1;

  const renderPanel = () => {
    if (state.uiMode === "setup") {
      return (
        <div className="adventure-sidebar leftPanel">
          <div className="leftPanelInner">
            <h2 className="adventure-title">Geegon perheseikkailu</h2>
            <p className="adventure-hint">
              Kymmenen minuuttia liikettä, naurua ja yhdessä tekemistä. Lisää perheesi pelaajat ja lähtekää
              seikkailulle karttaa pitkin.
            </p>
            <div className="adventure-panel adventure-panel--tight formCard">
              <div className="adventure-field">
                <label className="adventure-label" htmlFor="family-name">
                  Perheen nimi
                </label>
                <input
                  id="family-name"
                  className="adventure-input"
                  type="text"
                  value={state.familyName}
                  onChange={(event) => updateState({ familyName: event.target.value })}
                  placeholder="Esim. Virtaset"
                />
              </div>

              <div className="adventure-field">
                <label className="adventure-label">Pelaajat</label>
                <div className="adventure-players">
                  {safePlayers.map((player, index) => (
                    <div className="adventure-player-row playerRow" key={player.id}>
                      <input
                        className="adventure-input"
                        type="text"
                        value={player.name}
                        onChange={(event) => {
                          const nextPlayers = safePlayers.map((item, idx) =>
                            idx === index ? { ...item, name: event.target.value } : item,
                          );
                          updateState({ players: nextPlayers });
                        }}
                        placeholder="Nimi"
                      />
                      <div className="playerRowActions rowBottom">
                        <select
                          className="adventure-select"
                          value={player.role}
                          onChange={(event) => {
                            const nextPlayers = safePlayers.map((item, idx) =>
                              idx === index
                                ? { ...item, role: event.target.value as Player["role"] }
                                : item,
                            );
                            updateState({ players: nextPlayers });
                          }}
                        >
                          <option value="child">Lapsi</option>
                          <option value="adult">Aikuinen</option>
                        </select>
                            {safePlayers.length > 1 && (
                              <button
                                className="adventure-button adventure-button--ghost removeBtn removeButton"
                                type="button"
                                onClick={() => {
                                  const nextPlayers = safePlayers.filter((_, idx) => idx !== index);
                                  updateState({
                                    players: nextPlayers.length ? nextPlayers : [createPlayer()],
                                  });
                                }}
                              >
                                Poista
                              </button>
                            )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="adventure-button adventure-button--ghost"
                  type="button"
                  onClick={() => updateState({ players: [...safePlayers, createPlayer()] })}
                >
                  Lisää pelaaja
                </button>
                <p className="adventure-hint">
                  Lisää mukaan lapset ja aikuiset – tehtävät mukautuvat pelaajan mukaan.
                </p>
              </div>
              <div className="adventure-actions">
                <button
                  className="adventure-button adventure-button--primary"
                  type="button"
                  onClick={handleStartGame}
                  disabled={!validatePlayers()}
                >
                  Aloita peli
                </button>
                {hasProgress && (
                  <button
                    className="adventure-button adventure-button--ghost"
                    type="button"
                    onClick={handleContinueGame}
                  >
                    Jatka peliä
                  </button>
                )}
                {hasProgress && (
                  <button className="adventure-button adventure-button--ghost" type="button" onClick={handleReset}>
                    Aloita alusta
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (state.uiMode === "map") {
      return (
        <div className="adventure-sidebar leftPanel gameHud">
          <div className="leftPanelInner">
            <div className="hud-header">
              <span className="hud-badge">PERHE</span>
              <h2 className="adventure-title hud-title">{state.familyName}</h2>
            </div>
                <div className="hud-stats">
                  <span className="hud-chip">✅ Suoritettu {completedTasksCount}/{ADVENTURE_STOPS.length}</span>
                  <span className="hud-chip">⭐ Pisteet {familyTotalPoints}</span>
                </div>
            <div className="quest-card">
              <div className="quest-card__icon">🎯</div>
              <div className="quest-card__body">
                <p className="quest-card__label">Seuraava rasti</p>
                <p className="quest-card__title">{currentTask.title}</p>
                <p className="quest-card__hint">{currentTask.description}</p>
              </div>
              <div className="adventure-actions adventure-actions--left">
                <button className="adventure-button adventure-button--primary cta-primary" type="button" onClick={handleStartTask}>
                  Aloita tehtävä <span className="cta-arrow">→</span>
                </button>
                <button className="adventure-button adventure-button--ghost cta-secondary" type="button" onClick={() => updateState({ uiMode: "setup" })}>
                  Muokkaa pelaajia
                </button>
              </div>
            </div>
            <button className="reset-link" type="button" onClick={handleReset}>
              ↻ Aloita alusta
            </button>
          </div>
        </div>
      );
    }

    if (state.uiMode === "finish") {
      return (
        <div className="adventure-sidebar leftPanel">
          <div className="leftPanelInner">
            <h2 className="adventure-title">Maali! Seikkailu valmis 🎉</h2>
                <p className="adventure-hint">Keräsitte yhteensä: {familyTotalPoints} pistettä</p>
                <div className="adventure-panel adventure-panel--tight formCard">
                  <div className="adventure-field">
                    {sessionPlayers.map((player) => {
                      const succeeded = Object.values(sessionTasks).filter((task) =>
                        task.successfulSubUserIds.includes(player.id),
                      ).length;
                      const points = sessionTotals[player.id] ?? 0;
                      return (
                        <div key={player.id} className="adventure-hint">
                          <strong>{player.name}</strong>: {succeeded} tehtävää · {points} pistettä
                        </div>
                      );
                    })}
                  </div>
                </div>
            <div className="adventure-panel adventure-panel--tight formCard">
              <label className="adventure-label">Tilaa uudet seikkailut sähköpostiin</label>
              <input className="adventure-input" type="email" placeholder="Sähköpostiosoite" />
              <button className="adventure-button adventure-button--primary" type="button">
                Tilaa
              </button>
            </div>
            <div className="adventure-panel adventure-panel--tight formCard">
              <button
                className="adventure-button adventure-button--ghost"
                type="button"
                onClick={async () => {
                  const text = `Meidän perheen seikkailu on valmis! Pisteet: ${state.score}`;
                  try {
                    await navigator.clipboard.writeText(text);
                    setToast("Linkki kopioitu!");
                  } catch (error) {
                    setToast("Kopiointi epäonnistui");
                  }
                }}
              >
                Jaa
              </button>
            </div>
            <button className="adventure-button adventure-button--ghost" type="button" onClick={handleReset}>
              Aloita alusta
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  const encouragementText = (() => {
    const total = sessionPlayers.length || safePlayers.length;
    const selected = selectedSuccessIds.length;
    if (selected === total && total > 0) return "Mahtavaa! Koko tiimi onnistui!";
    if (selected > 1) return "Hienoa työtä! Jokainen onnistuminen vie eteenpäin!";
    if (selected === 1) return "Jes! Upea suoritus!";
    return "Hyvä yritys! Uusi kierros odottaa.";
  })();

  return (
    <>
      <section className="adventure-screen adventure-map">
        <div className="adventure-map__page">
          <div className="adventure-map__game-panel">{renderPanel()}</div>

          <div className="adventure-map__map-panel">
            <MapStage
              stops={ADVENTURE_STOPS}
              currentStop={state.currentStop}
              completedStops={state.completedStops}
              showIntro={false}
              onIntroEnd={() => undefined}
              onNodeClick={handleStartTask}
              mapDisabled={state.uiMode === "setup"}
              viewBoxWidth={VIEWBOX_WIDTH}
              viewBoxHeight={VIEWBOX_HEIGHT}
              routePath={routePath}
              nodePositions={NODE_POSITIONS}
            />
          </div>
        </div>

        {toast && <div className="adventure-toast">{toast}</div>}
      </section>

      {taskOpen && (
        <div className="task-overlay" role="presentation" onMouseDown={handleCloseTask}>
          <div className="task-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
            <button className="task-modal__close" type="button" aria-label="Sulje" onClick={handleCloseTask}>
              ×
            </button>
            <div className="task-modal__body">
              <div className="task-modal__column">
                <div className="task-modal__video">
                  <div className="task-modal__video-stage">
                    <div className="task-modal__video-container">
                    {!videoError ? (
                      <video
                        ref={videoRef}
                        src={activeStop.videoSrc}
                        preload="metadata"
                        playsInline
                        controls
                        onError={() => setVideoError(true)}
                        onLoadedMetadata={() => {
                          if (!videoRef.current) return;
                          const ratio =
                            videoRef.current.videoWidth / Math.max(1, videoRef.current.videoHeight);
                          // Debug: verify native aspect ratio during development.
                          console.log("Adventure video ratio:", ratio.toFixed(3));
                        }}
                      />
                    ) : (
                      <div className="task-modal__fallback">Video lisätään pian.</div>
                    )}
                    </div>
                  </div>
                </div>
                <div className="task-modal__info">
                  <div className="task-modal__title">{activeStop.title}</div>
                </div>
                <div className="task-modal__actions">
                  <button className="adventure-button adventure-button--primary task-modal__primary" type="button" onClick={handleOpenSuccess}>
                    Tehtävä suoritettu
                  </button>
                  <button className="adventure-button adventure-button--ghost task-modal__secondary" type="button" onClick={handleCloseTask}>
                    Palaa karttaan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {successOpen && (
        <div className="success-overlay" role="presentation">
          <div className="success-modal" role="dialog" aria-modal="true">
            {successSaving && <div className="success-confetti" aria-hidden="true" />}
            <h3 className="success-modal__title">Ketkä onnistui tässä tehtävässä?</h3>
            <p className="success-modal__encouragement">{encouragementText}</p>
            <div className="success-modal__list">
              {sessionPlayers.map((player) => {
                const checked = selectedSuccessIds.includes(player.id);
                return (
                  <label key={player.id} className={`success-modal__item${checked ? " is-selected" : ""}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        setSelectedSuccessIds((prev) =>
                          prev.includes(player.id)
                            ? prev.filter((id) => id !== player.id)
                            : [...prev, player.id],
                        );
                      }}
                    />
                    <span>{player.name}</span>
                    {checked && <span className="success-modal__icon" aria-hidden="true">★</span>}
                  </label>
                );
              })}
            </div>
            <div className="success-modal__actions">
              <button className="adventure-button adventure-button--ghost" type="button" onClick={() => setSuccessOpen(false)}>
                Takaisin
              </button>
              <button className="adventure-button adventure-button--primary" type="button" onClick={handleSaveSuccess}>
                {successSaving ? "Tallennettu!" : "Tallenna onnistujat"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
