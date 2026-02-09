import { useEffect, useMemo, useRef, useState } from "react";
import { Compass, Dumbbell, Hand, Sparkles, Zap } from "lucide-react";
import { TASKS, type Difficulty, type Skill, type Task } from "@/data/spinning/tasks";
import "@/components/spinning/SkillWheelModal.css";

const SKILL_LABELS: { value: Skill; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "tasapaino", label: "Tasapaino", Icon: Compass },
  { value: "koordinaatio", label: "Koordinaatio", Icon: Hand },
  { value: "kehonhallinta", label: "Nopeus", Icon: Zap },
  { value: "liikkuvuus", label: "Liikkuvuus", Icon: Sparkles },
  { value: "voima", label: "Voima", Icon: Dumbbell },
];

const SEGMENT_COLORS = ["#0EB1AF", "#F9B200", "#EB6A39", "#0074AC", "#6B377C"];

const DIFFICULTY_KEY = "geego_skillwheel_difficulty";

type SkillWheelModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SkillWheelModal({ isOpen, onClose }: SkillWheelModalProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>(() => {
    if (typeof window === "undefined") return "easy";
    const stored = window.sessionStorage.getItem(DIFFICULTY_KEY);
    return stored === "hard" ? "hard" : "easy";
  });
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [spinAngle, setSpinAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [nextSkillOverride, setNextSkillOverride] = useState<Skill | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(DIFFICULTY_KEY, difficulty);
  }, [difficulty]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedSkill(null);
      setActiveTask(null);
      setShowVideo(false);
      setVideoError(false);
      setFeedback(null);
      setIsSpinning(false);
      setNextSkillOverride(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!showVideo || !videoRef.current) return;
    const playPromise = videoRef.current.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Autoplay can be blocked; controls remain available.
      });
    }
  }, [showVideo]);

  const skillCount = SKILL_LABELS.length;
  const segments = useMemo(() => {
    const startAngle = -90;
    const step = 360 / skillCount;
    return SKILL_LABELS.map((skill, index) => {
      const angleStart = startAngle + index * step;
      const angleEnd = angleStart + step;
      return { ...skill, angleStart, angleEnd, color: SEGMENT_COLORS[index % SEGMENT_COLORS.length] };
    });
  }, [skillCount]);

  const selectedLabel = selectedSkill
    ? SKILL_LABELS.find((skill) => skill.value === selectedSkill)?.label
    : null;

  const wheelSize = 320;
  const center = wheelSize / 2;
  const outerRadius = 150;
  const labelRadius = 90;
  const centerImageSize = 64;

  const polarToCartesian = (radius: number, angle: number) => {
    const radians = (Math.PI / 180) * angle;
    return {
      x: center + radius * Math.cos(radians),
      y: center + radius * Math.sin(radians),
    };
  };

  const describeSegment = (start: number, end: number) => {
    const startOuter = polarToCartesian(outerRadius, end);
    const endOuter = polarToCartesian(outerRadius, start);
    const largeArc = end - start <= 180 ? 0 : 1;
    return [
      `M ${center} ${center}`,
      `L ${startOuter.x} ${startOuter.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 0 ${endOuter.x} ${endOuter.y}`,
      "Z",
    ].join(" ");
  };

  const handleSpin = () => {
    if (isSpinning) return;
    const overrideSkill = nextSkillOverride;
    const randomSkill =
      overrideSkill ??
      SKILL_LABELS[Math.floor(Math.random() * SKILL_LABELS.length)].value;

    const spins = 3 + Math.floor(Math.random() * 2);
    const randomOffset = Math.floor(Math.random() * 360);
    const nextAngle = spinAngle + spins * 360 + randomOffset;

    setIsSpinning(true);
    setSpinAngle(nextAngle);
    setSelectedSkill(null);
    setActiveTask(null);
    setShowVideo(false);
    setVideoError(false);
    setFeedback(null);

    window.setTimeout(() => {
      setIsSpinning(false);
      setSelectedSkill(randomSkill);
      setNextSkillOverride(null);

      const task = TASKS.find(
        (item) => item.skill === randomSkill && item.difficulty === difficulty
      );
      setActiveTask(task ?? null);
    }, 4400);
  };

  const handleOpenVideo = () => {
    setShowVideo(true);
    setVideoError(false);
  };

  const handleSuccess = () => {
    setFeedback("Nice! Seuraava on vähän vaikeampi.");
    setDifficulty("hard");
    if (activeTask?.difficulty === "easy" && activeTask?.skill) {
      setNextSkillOverride(activeTask.skill);
    }
  };

  const handleRetry = () => {
    setFeedback("Otetaan helpompi / sama vielä kerran.");
    setDifficulty("easy");
    setNextSkillOverride(null);
  };

  const handleSpinAgain = () => {
    setSelectedSkill(null);
    setActiveTask(null);
    setShowVideo(false);
    setVideoError(false);
    setFeedback(null);
  };

  if (!isOpen) return null;

  return (
    <div className="skill-wheel-overlay" role="dialog" aria-modal="true">
      <div className="skill-wheel-modal">
        <div className="skill-wheel-header">
          <h2 className="skill-wheel-title">Pyöräytä ja kokeile!</h2>
          <button className="skill-wheel-close" type="button" onClick={onClose} aria-label="Sulje">
            ✕
          </button>
        </div>
        <div className="skill-wheel-body">
          <div className="skill-wheel-panel">
            <div className="skill-wheel-wheel">
              <div className="skill-wheel-pointer" />
              <svg
                className="skill-wheel-svg"
                viewBox={`0 0 ${wheelSize} ${wheelSize}`}
                role="presentation"
              >
                <g
                  className="skill-wheel-rotor"
                  style={{ transform: `rotate(${spinAngle}deg)` }}
                >
                  {segments.map((segment) => {
                    const isSelected = selectedSkill === segment.value;
                    const isMuted = selectedSkill && selectedSkill !== segment.value;
                    return (
                      <path
                        key={segment.value}
                        d={describeSegment(segment.angleStart, segment.angleEnd)}
                        fill={segment.color}
                        className={`wheel-segment${isSelected ? " is-selected" : ""}${
                          isMuted ? " is-muted" : ""
                        }`}
                      />
                    );
                  })}
                  <image
                    href="/images/paa.png"
                    x={center - centerImageSize / 2}
                    y={center - centerImageSize / 2}
                    width={centerImageSize}
                    height={centerImageSize}
                    preserveAspectRatio="xMidYMid meet"
                    className="skill-wheel-center-image"
                  />
                  {segments.map((segment) => {
                    const midAngle = (segment.angleStart + segment.angleEnd) / 2;
                    const labelPoint = polarToCartesian(labelRadius, midAngle);
                    const isSelected = selectedSkill === segment.value;
                    const isMuted = selectedSkill && selectedSkill !== segment.value;
                    const labelSize = 96;
                    return (
                      <foreignObject
                        key={`label-${segment.value}`}
                        x={labelPoint.x - labelSize / 2}
                        y={labelPoint.y - labelSize / 2}
                        width={labelSize}
                        height={labelSize}
                        className={`wheel-label${isSelected ? " is-selected" : ""}${
                          isMuted ? " is-muted" : ""
                        } label-${segment.value}`}
                        transform={`rotate(${-spinAngle} ${labelPoint.x} ${labelPoint.y})`}
                      >
                        <div className="skill-wheel-label-content">
                          <segment.Icon className="skill-wheel-label-icon" />
                          <span>{segment.label}</span>
                        </div>
                      </foreignObject>
                    );
                  })}
                </g>
                <circle
                  cx={center}
                  cy={center}
                  r={outerRadius}
                  className="skill-wheel-outline"
                />
              </svg>
            </div>
            <div className="skill-wheel-spin">
              <button
                className="skill-wheel-spin-button"
                type="button"
                onClick={handleSpin}
                disabled={isSpinning}
              >
                Pyöräytä
              </button>
            </div>
            {selectedLabel && (
              <div className="skill-wheel-selected">Valittu taito: {selectedLabel}</div>
            )}
            <p>
              Paina pyöräytys, niin saat tehtävän. Kun onnistut, seuraava on vähän
              haastavampi.
            </p>
            <div className="skill-wheel-actions">
              {feedback && (
                <button
                  className="skill-wheel-button secondary"
                  type="button"
                  onClick={handleSpinAgain}
                >
                  Pyöräytä uudestaan
                </button>
              )}
            </div>
          </div>

          <div className="skill-wheel-panel">
            {activeTask ? (
              <div className="skill-wheel-task">
                <div className="skill-wheel-tag">
                  {SKILL_LABELS.find((skill) => skill.value === activeTask.skill)?.label}
                  <span>·</span>
                  {activeTask.difficulty === "easy" ? "Helppo" : "Vaikea"}
                </div>
                <h4>{activeTask.title}</h4>
                <ul className="skill-wheel-list">
                  {activeTask.instructions.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
                <div className="skill-wheel-actions">
                  <button className="skill-wheel-button" type="button" onClick={handleOpenVideo}>
                    Avaa video
                  </button>
                </div>

                {showVideo && (
                  <div className="skill-wheel-video">
                    {videoError || !activeTask.videoSrc ? (
                      <p>Video lisätään pian.</p>
                    ) : (
                      <video
                        ref={videoRef}
                        src={activeTask.videoSrc}
                        controls
                        muted
                        playsInline
                        autoPlay
                        onError={() => setVideoError(true)}
                      />
                    )}
                  </div>
                )}

                <div className="skill-wheel-actions">
                  <button className="skill-wheel-button" type="button" onClick={handleSuccess}>
                    ✅ Onnistuin
                  </button>
                  <button className="skill-wheel-button secondary" type="button" onClick={handleRetry}>
                    🔁 Yritän uudelleen
                  </button>
                </div>

                {feedback && <div className="skill-wheel-feedback">{feedback}</div>}
              </div>
            ) : (
              <p>
                Pyöräytä pyörää ja saat heti pienen tehtävän. Video avautuu kun olet
                valmis.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
