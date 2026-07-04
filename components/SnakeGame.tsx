"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Phase = "idle" | "playing" | "over";

const COLS = 34;
const ROWS = 22;
const CELL = 16;
const TICK_MS = 150;
const OPP: Record<Dir, Dir> = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };

const INIT_SNAKE: Point[] = [
  { x: 17, y: 11 },
  { x: 16, y: 11 },
  { x: 15, y: 11 },
];

function randPos(snake: Point[]): Point {
  let p: Point;
  do {
    p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some((s) => s.x === p.x && s.y === p.y));
  return p;
}

export default function SnakeGame() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    snake: INIT_SNAKE.map((p) => ({ ...p })),
    dir: "RIGHT" as Dir,
    next: "RIGHT" as Dir,
    apple: { x: 26, y: 11 } as Point,
    alive: true,
    going: false,
  });
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStart = useRef({ x: 0, y: 0 });

  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [muted, setMuted] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  /* Lock body scroll when fullscreen on mobile */
  useEffect(() => {
    if (!mobileExpanded) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [mobileExpanded]);

  /* ── draw ─────────────────────────────────────────────────── */
  const draw = useCallback(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { snake, apple } = state.current;

    ctx.fillStyle = "#1e1e1e";
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

    snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? "#93F200" : "#7BC100";
      const x = seg.x * CELL + 1, y = seg.y * CELL + 1, s = CELL - 2;
      ctx.beginPath();
      ctx.roundRect(x, y, s, s, 3);
      ctx.fill();
    });

    const ax = apple.x * CELL + CELL / 2;
    const ay = apple.y * CELL + CELL / 2;
    ctx.fillStyle = "#F60000";
    ctx.beginPath();
    ctx.arc(ax, ay, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#93F200";
    ctx.fillRect(ax - 1, ay - CELL / 2 - 1, 2, 4);
  }, []);

  /* ── step ─────────────────────────────────────────────────── */
  const step = useCallback(() => {
    const s = state.current;
    if (!s.alive || !s.going) return;
    s.dir = s.next;

    const head = s.snake[0];
    const nx = { x: head.x, y: head.y };
    if (s.dir === "UP") nx.y -= 1;
    else if (s.dir === "DOWN") nx.y += 1;
    else if (s.dir === "LEFT") nx.x -= 1;
    else nx.x += 1;

    if (
      nx.x < 0 || nx.x >= COLS ||
      nx.y < 0 || nx.y >= ROWS ||
      s.snake.some((seg) => seg.x === nx.x && seg.y === nx.y)
    ) {
      s.alive = false;
      if (interval.current) clearInterval(interval.current);
      setPhase("over");
      return;
    }

    const ate = nx.x === s.apple.x && nx.y === s.apple.y;
    s.snake.unshift(nx);
    if (ate) {
      s.apple = randPos(s.snake);
      setScore((n) => n + 1);
    } else {
      s.snake.pop();
    }
    draw();
  }, [draw]);

  /* ── start / reset ────────────────────────────────────────── */
  const startGame = useCallback(() => {
    if (interval.current) clearInterval(interval.current);
    state.current = {
      snake: INIT_SNAKE.map((p) => ({ ...p })),
      dir: "RIGHT", next: "RIGHT",
      apple: { x: 26, y: 11 },
      alive: true, going: true,
    };
    setScore(0);
    setPhase("playing");
    draw();
    interval.current = setInterval(step, TICK_MS);
  }, [step, draw]);

  const handleMobilePlay = useCallback(() => {
    setMobileExpanded(true);
    startGame();
  }, [startGame]);

  const handleMobileClose = useCallback(() => {
    if (interval.current) clearInterval(interval.current);
    state.current = {
      snake: INIT_SNAKE.map((p) => ({ ...p })),
      dir: "RIGHT", next: "RIGHT",
      apple: { x: 26, y: 11 },
      alive: true, going: false,
    };
    setScore(0);
    setPhase("idle");
    setMobileExpanded(false);
    draw();
  }, [draw]);

  /* ── steer ────────────────────────────────────────────────── */
  const steer = useCallback((dir: Dir) => {
    const s = state.current;
    if (!s.going) { startGame(); return; }
    if (dir !== OPP[s.dir]) s.next = dir;
  }, [startGame]);

  /* ── keyboard ─────────────────────────────────────────────── */
  useEffect(() => {
    const MAP: Record<string, Dir> = {
      ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT",
    };
    const handler = (e: KeyboardEvent) => {
      if (MAP[e.key]) { e.preventDefault(); steer(MAP[e.key]); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [steer]);

  /* ── touch ────────────────────────────────────────────────── */
  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
      if (Math.abs(dx) > Math.abs(dy)) steer(dx > 0 ? "RIGHT" : "LEFT");
      else steer(dy > 0 ? "DOWN" : "UP");
    };
    const el = cvs.current;
    el?.addEventListener("touchstart", onStart, { passive: true });
    el?.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el?.removeEventListener("touchstart", onStart);
      el?.removeEventListener("touchend", onEnd);
    };
  }, [steer]);

  /* ── init draw ────────────────────────────────────────────── */
  useEffect(() => {
    draw();
    return () => { if (interval.current) clearInterval(interval.current); };
  }, [draw]);

  const W = COLS * CELL; // 544
  const H = ROWS * CELL; // 352

  return (
    <div
      style={mobileExpanded ? {
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "#232323",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      } : {
        background: "#232323",
        width: 634,
        maxWidth: "100%",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* ── header ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* mini apple */}
          <svg width="35" height="32" viewBox="310 665 1090 1015" aria-hidden="true">
            <path
              d="M364.579 976.437L358.579 1191.15L364.466 1303.88L530.797 1514.49
                 L690.436 1618.69L809.079 1592.84L809.63 1585.59L917.214 1603.95
                 L1192.93 1544.02L1287.04 1379.23L1384.96 1072.96L1266.79 788.341
                 L1002.06 698.475L862.248 766.717L775.697 798.341L610.917 790.019Z"
              fill="#F60000"
            />
            <path
              d="M885.567 842.85L802.553 756.906L814.073 757.521L828.922 743.233
                 L915.843 689.518L1083.83 743.233L1165.86 796.948L1225.44 814.527
                 L1119.96 883.869H967.605Z"
              fill="#93F200"
            />
          </svg>
          {/* score */}
          <span
            style={{
              fontFamily: "var(--font-primary)",
              fontWeight: 900,
              fontSize: 16,
              color: "white",
              minWidth: 12,
              textAlign: "center",
            }}
          >
            {score}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* mute button */}
          <button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute" : "Mute"}
            style={{
              background: "none", border: "none", cursor: "pointer",
              opacity: 0.6, color: "white", padding: 0, lineHeight: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9H7L13 4V20L7 15H3V9Z" />
              {muted ? (
                <>
                  <line x1="17" y1="9" x2="23" y2="15" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                </>
              ) : (
                <>
                  <path d="M17 9C18 10 18.5 11.5 18.5 13s-.5 3-1.5 4" />
                  <path d="M20 6C22 8 23 10.5 23 13s-1 5-3 7" />
                </>
              )}
            </svg>
          </button>

          {/* close button — mobile fullscreen only */}
          {mobileExpanded && (
            <button
              onClick={handleMobileClose}
              aria-label="Close game"
              style={{
                background: "none", border: "none", cursor: "pointer",
                opacity: 0.6, color: "white", padding: 0, lineHeight: 0,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── game canvas ── */}
      <div style={{
        padding: mobileExpanded ? 0 : "1rem",
        display: "flex",
        justifyContent: "center",
        flex: mobileExpanded ? 1 : undefined,
        alignItems: mobileExpanded ? "center" : undefined,
      }}>
        <div style={{
          position: "relative",
          width: "100%",
          ...(mobileExpanded ? { aspectRatio: `${W} / ${H}` } : {}),
        }}>
          {/* canvas — dimmed on mobile idle to sit behind Play button */}
          <div className={phase === "idle" && !mobileExpanded ? "opacity-50 md:opacity-100" : ""}>
            <canvas
              ref={cvs}
              width={W}
              height={H}
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                ...(mobileExpanded ? { height: "100%" } : {}),
              }}
            />
          </div>

          {/* mobile Play button overlay */}
          {phase === "idle" && !mobileExpanded && (
            <div
              className="flex md:hidden"
              style={{
                position: "absolute", inset: 0,
                alignItems: "center", justifyContent: "center",
              }}
            >
              <button
                onClick={handleMobilePlay}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  color: "white",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  border: "1px solid rgba(255,255,255,0.4)",
                  padding: "10px 28px",
                  cursor: "pointer",
                  background: "rgba(35,35,35,0.8)",
                  borderRadius: 4,
                }}
              >
                Play
              </button>
            </div>
          )}

          {/* desktop idle hint */}
          {phase === "idle" && (
            <div
              className="hidden md:flex"
              style={{
                position: "absolute", inset: 0,
                flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 6,
                fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.35)",
                fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em",
                textAlign: "center", pointerEvents: "none",
              }}
            >
              <span>Arrow keys to play</span>
              <span style={{ opacity: 0.6 }}>or swipe</span>
            </div>
          )}

          {phase === "over" && (
            <div
              style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 16,
                background: "rgba(30,30,30,0.92)",
              }}
            >
              <span style={{ fontFamily: "var(--font-primary)", fontWeight: 700, fontSize: 20, color: "white" }}>
                GAME OVER
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Score: {score}
              </span>
              <button
                onClick={startGame}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: 11, color: "white",
                  textTransform: "uppercase", letterSpacing: "0.1em",
                  border: "1px solid rgba(255,255,255,0.25)",
                  padding: "8px 20px", cursor: "pointer", background: "transparent",
                }}
              >
                Play again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
