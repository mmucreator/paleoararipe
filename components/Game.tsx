"use client";
import React, { useState, useCallback } from "react";
import {
  FOSSILS, TRIVIA_QUESTIONS, generateBoard,
  shuffle, FossilId, BoardSquare, Question,
} from "@/lib/gameData";
import { Silhouettes } from "@/components/Silhouettes";
import { Backdrop } from "@/components/Backdrop";
import { asset } from "@/lib/assets";

// ── Types ────────────────────────────────────────────────────────────────────
type Phase =
  | "title"
  | "board"
  | "question_intro"
  | "fossil_question"
  | "trivia_question"
  | "fossil_correct"
  | "fossil_wrong"
  | "trivia_result"
  | "rest"
  | "win";

interface GameState {
  phase: Phase;
  position: number;
  score: number;
  turn: number;
  diceValue: number | null;
  currentQuestion: Question | null;
  fossilGuess: FossilId | null;
  fossilAttempts: number;
  triviaSelected: string | null;
  fossilQueue: FossilId[];
  triviaQueue: number[];
  wrongGuesses: FossilId[];
}

// ── Vintage palette ────────────────────────────────────────────────────────
const INK = "#4a3a22";

// ── Dice SVG ─────────────────────────────────────────────────────────────────
function DieSVG({ value, rolling }: { value: number; rolling: boolean }) {
  const dots: Record<number, [number, number][]> = {
    1: [[50, 50]],
    2: [[28, 28], [72, 72]],
    3: [[28, 28], [50, 50], [72, 72]],
    4: [[28, 28], [72, 28], [28, 72], [72, 72]],
    5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
    6: [[28, 28], [72, 28], [28, 50], [72, 50], [28, 72], [72, 72]],
  };
  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-16 h-16 drop-shadow-md transition-transform ${rolling ? "animate-spin" : ""}`}
    >
      <rect x="4" y="4" width="92" height="92" rx="16" fill="#f3ead4" stroke={INK} strokeWidth="4" />
      <rect x="4" y="4" width="92" height="92" rx="16" fill="none" stroke="#c9b88f" strokeWidth="1.5" />
      {(dots[value] || []).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="8.5" fill={INK} />
      ))}
    </svg>
  );
}

// ── Player pawn ───────────────────────────────────────────────────────────────
function Pawn({ size = 26 }: { size?: number }) {
  const png = asset("pawn");
  if (png) {
    return (
      <img
        src={png || "/placeholder.svg"}
        alt="Peão do jogador"
        width={size}
        height={size}
        className="drop-shadow-md object-contain"
        style={{ height: size * 1.25, width: "auto" }}
      />
    );
  }
  return (
    <svg viewBox="0 0 24 32" width={size} height={size * 1.3} className="drop-shadow-md">
      <ellipse cx="12" cy="29" rx="8" ry="3" fill="rgba(74,58,34,0.4)" />
      <path
        d="M12 2c3 0 5 2.2 5 5 0 1.9-1 3.4-2.4 4.3 2.6 1.2 4.4 4 4.4 7.7 0 1.6-.4 3-1 4.2H6c-.6-1.2-1-2.6-1-4.2 0-3.7 1.8-6.5 4.4-7.7C8 10.4 7 8.9 7 7c0-2.8 2-5 5-5z"
        fill="#9a4a32"
        stroke={INK}
        strokeWidth="1.4"
      />
      <circle cx="12" cy="6.5" r="2.4" fill="#f3ead4" opacity="0.85" />
    </svg>
  );
}

// ── Tile theming ──────────────────────────────────────────────────────────────
const TILE = {
  fossil: { fill: "#c98a4b", text: "#3a2c16", border: "#7a5226", assetKey: "fossilTile" as const },
  trivia: { fill: "#7a8a5a", text: "#23301a", border: "#4d5a35", assetKey: "triviaTile" as const },
  rest: { fill: "#8a9aa6", text: "#1f2a32", border: "#566872", assetKey: "restTile" as const },
  start: { fill: "#9a4a32", text: "#fbf3e3", border: "#5e2a1c", assetKey: "startTile" as const },
  finish: { fill: "#4f6b3f", text: "#fbf3e3", border: "#2e4124", assetKey: "finishTile" as const },
} as const;

const TILE_ICON: Record<string, string> = {
  fossil: "🪲",
  trivia: "📜",
};

// ── Serpentine path layout ────────────────────────────────────────────────────
const ROWS = 5;
const PER_ROW = 8;
const VIEW_W = 100;
const VIEW_H = 80;
const MARGIN_X = 9;
const MARGIN_Y = 10;

function tileCenter(idx: number): { x: number; y: number } {
  const row = Math.floor(idx / PER_ROW);
  const k = idx % PER_ROW;
  const leftToRight = row % 2 === 0;
  const col = leftToRight ? k : PER_ROW - 1 - k;
  const usableW = VIEW_W - MARGIN_X * 2;
  const usableH = VIEW_H - MARGIN_Y * 2;
  const x = MARGIN_X + (col / (PER_ROW - 1)) * usableW;
  const baseY = MARGIN_Y + (row / (ROWS - 1)) * usableH;
  const wave = Math.sin((idx / PER_ROW) * Math.PI * 2) * 2.1;
  return { x, y: baseY + wave };
}

function buildRoadPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`;
  }
  return d;
}

function TileFace({ sq, size }: { sq: BoardSquare; size: number }) {
  const c = TILE[sq.type];
  const png = asset(c.assetKey);
  const isEndpoint = sq.type === "start" || sq.type === "finish";
  if (png) {
    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <img src={png || "/placeholder.svg"} alt={isEndpoint ? (sq.type === "start" ? "Início" : "Chegada") : `Casa ${sq.id}`} className="w-full h-full object-contain drop-shadow" />
        {!isEndpoint && (
          <span className="absolute font-mono font-bold" style={{ color: "#fff", textShadow: "0 1px 2px rgba(0,0,0,0.6)", fontSize: size * 0.34 }}>{sq.id}</span>
        )}
      </div>
    );
  }
  return (
    <div className="rounded-full flex flex-col items-center justify-center" style={{ width: size, height: size, backgroundColor: c.fill, border: `${Math.max(2, size * 0.07)}px solid ${c.border}`, boxShadow: "0 3px 6px rgba(60,44,24,0.3), inset 0 2px 0 rgba(255,255,255,0.25)" }}>
      {isEndpoint ? (
        <span className="font-serif font-bold leading-none text-center px-0.5" style={{ color: c.text, fontSize: size * 0.2 }}>
          {sq.type === "start" ? "INÍCIO" : "MUSEU"}
        </span>
      ) : (
        <>
          <span className="leading-none" style={{ fontSize: size * 0.32 }}>{TILE_ICON[sq.type]}</span>
          <span className="font-mono font-bold leading-none" style={{ color: c.text, fontSize: size * 0.26, marginTop: size * 0.04 }}>{sq.id}</span>
        </>
      )}
    </div>
  );
}

function BoardView({ squares, position }: { squares: BoardSquare[]; position: number }) {
  const points = squares.map((sq) => tileCenter(sq.id));
  const road = buildRoadPath(points);
  const tilePct = 7.4;
  const endpointPct = 11;
  return (
    <div className="relative w-full" style={{ paddingBottom: `${(VIEW_H / VIEW_W) * 100}%` }}>
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="none" aria-hidden>
        <path d={road} fill="none" stroke="rgba(60,44,24,0.28)" strokeWidth="9.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={road} fill="none" stroke="#cdb98c" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d={road} fill="none" stroke="#8a6a3a" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="0.4 3.4" opacity="0.7" vectorEffect="non-scaling-stroke" />
      </svg>
      {squares.map((sq) => {
        const p = tileCenter(sq.id);
        const isPlayer = sq.id === position;
        const isEndpoint = sq.type === "start" || sq.type === "finish";
        const pct = isEndpoint ? endpointPct : tilePct;
        return (
          <div key={sq.id} className="absolute" style={{ left: `${(p.x / VIEW_W) * 100}%`, top: `${(p.y / VIEW_H) * 100}%`, transform: "translate(-50%, -50%)", zIndex: isPlayer ? 30 : isEndpoint ? 20 : 10 }}>
            <div className={`relative transition-transform duration-300 ${isPlayer ? "scale-110" : ""}`} style={{ width: `${pct}vw`, maxWidth: 64, minWidth: 26 }}>
              <div className="relative w-full" style={{ filter: isPlayer ? "drop-shadow(0 0 6px rgba(154,74,50,0.65))" : undefined }}>
                <AspectBox><TileFaceResponsive sq={sq} /></AspectBox>
              </div>
              {isPlayer && (
                <div className="absolute left-1/2 -top-1 -translate-x-1/2 -translate-y-full animate-pawn-bob">
                  <Pawn size={26} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AspectBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full" style={{ paddingBottom: "100%" }}>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

function TileFaceResponsive({ sq }: { sq: BoardSquare }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState(48);
  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      if (w > 0) setSize(w);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center">
      <TileFace sq={sq} size={size} />
    </div>
  );
}

// ── Fossil Image helper ───────────────────────────────────────────────────────
function FossilImage({ fossilId, size, rounded = false }: { fossilId: FossilId; size: number; rounded?: boolean }) {
  const fossil = FOSSILS[fossilId];
  const Sil = Silhouettes[fossilId];
  const hasImage = fossil.image && fossil.image.trim() !== "";
  if (hasImage) {
    return (
      <img
        src={fossil.image}
        alt={fossil.name}
        className="object-cover"
        style={{ width: size, height: size, borderRadius: rounded ? 12 : 8 }}
      />
    );
  }
  return Sil ? <Sil size={size} color="#8a5a2a" /> : null;
}

// ── Fossil Card (during question) ─────────────────────────────────────────────
function FossilCard({ fossilId, revealed }: { fossilId: FossilId; revealed: boolean }) {
  const fossil = FOSSILS[fossilId];
  const Sil = Silhouettes[fossilId];
  const hasImage = fossil.image && fossil.image.trim() !== "";
  return (
    <div className="rounded-2xl overflow-hidden border-2 deckle" style={{ borderColor: "#bda878" }}>
      <div className="paper-bg paper-vignette flex flex-col items-center justify-center gap-3 py-6 px-4">
        {hasImage ? (
          <img
            src={fossil.image}
            alt={revealed ? fossil.name : "Fóssil para identificar"}
            className="object-cover"
            style={{ width: 220, height: 220, borderRadius: 16, objectFit: "contain", backgroundColor: "#f5edd6" }}
          />
        ) : (
          Sil && <Sil size={150} color={INK} />
        )}
        {revealed && (
          <div className="text-center">
            <h3 className="text-stone-800 font-serif text-xl">{fossil.name}</h3>
            <p className="text-stone-800 text-lg italic">{fossil.sciName}</p>
            <span className="text-lg bg-amber-100/70 border border-amber-700/40 rounded px-2 py-0.5 text-amber-800 mt-1 inline-block">
              {fossil.group}
            </span>
          </div>
        )}
{!revealed && (
         <div
  className="w-full flex items-center justify-center py-2 my-1"
  style={{
    background: "radial-gradient(circle at 20% 15%, rgba(120,92,56,0.06) 0%, rgba(0,0,0,0) 45%), radial-gradient(circle at 80% 85%, rgba(120,92,56,0.08) 0%, rgba(0,0,0,0) 50%), radial-gradient(circle, rgba(255,250,235,0.4) 0%, rgba(0,0,0,0) 70%), repeating-linear-gradient(0deg, rgba(90,70,45,0.02) 0px, rgba(90,70,45,0.02) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 3px), repeating-linear-gradient(90deg, rgba(90,70,45,0.02) 0px, rgba(90,70,45,0.02) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 3px), linear-gradient(90deg, rgba(180,150,100,0.15), rgba(200,170,120,0.35), rgba(180,150,100,0.15))",
    borderTop: "1px solid rgba(140,110,70,0.3)",
    borderBottom: "1px solid rgba(140,110,70,0.3)",
  }}
>
  <span className="uppercase tracking-widest text-sm font-semibold" style={{ color: "#5a3e1b" }}>
    {(fossilId.includes("_vivo") || fossilId.includes("_vivente")) ? "Identifique o Artrópode vivente" : "Identifique o fóssil"}
  </span>
</div>
        )}
      </div>
    </div>
  );
}

function INaturalistGrid({ taxon }: { taxon: string }) {
  const [photos, setPhotos] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetch(`https://api.inaturalist.org/v1/taxa?q=${taxon}&per_page=1`)
  .then((r) => r.json())
  .then((data) => {
    const taxonData = data.results?.[0];
    const taxonId = taxonData?.id;
    if (!taxonId) return;
 return fetch(`https://api.inaturalist.org/v1/taxa/${taxonId}`)  })
  .then((r) => r?.json())
  .then((data) => {
    if (!data) return;
   const taxon = data.results?.[0];
const urls = (taxon?.taxon_photos || [])
  .map((tp: any) => tp.photo?.url?.replace("square", "medium"))
  .filter(Boolean);
setPhotos(urls); 
  })
  .catch(() => {});
  }, [taxon]);

  if (photos.length === 0) return null;

  return (
    <div className="rounded-2xl p-4 border-2" style={{ backgroundColor: "#fffdf6", borderColor: "#bda878" }}>
      <p className="text-stone-700 text-sm font-semibold mb-3">📸 Observações recentes no iNaturalist</p>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((url, i) => (
          <img key={i} src={url} alt={taxon} className="w-full aspect-square object-cover rounded-xl" />
        ))}
      </div>
    </div>
  );
}
function FossilSearchInput({ allIds, wrongGuesses, onGuess }: {
  allIds: FossilId[];
  wrongGuesses: FossilId[];
  onGuess: (id: FossilId) => void;
}) {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const seenNames = new Set<string>();
const filtered = allIds.filter((id) => {
  if (id.includes("_vivo")) return false;
  if (wrongGuesses.includes(id)) return false;
  const name = FOSSILS[id].name.toLowerCase();
  if (!name.includes(query.toLowerCase())) return false;
  if (seenNames.has(name)) return false;
  seenNames.add(name);
  return true;
});

  function handleSelect(id: FossilId) {
    setQuery("");
    setOpen(false);
    onGuess(id);
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="Digite o nome do organismo..."
        className="w-full p-3 rounded-xl border-2 text-stone-800 text-base"
        style={{ backgroundColor: "#fffdf6", borderColor: "#bda878", outline: "none" }}
      />
      {open && filtered.length > 0 && (
        <div className="absolute z-50 w-full mt-1 rounded-xl border-2 overflow-hidden shadow-lg"
          style={{ backgroundColor: "#fffdf6", borderColor: "#bda878" }}>
          {filtered.map((id) => {
            const Sil = Silhouettes[id];
            return (
              <button
                key={id}
                onClick={() => handleSelect(id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-amber-50 border-b last:border-b-0"
                style={{ borderColor: "#e8dcc8" }}
              >
                <span className="text-stone-800 text-base">{FOSSILS[id].name}</span>
              </button>
            );
          })}
        </div>
      )}
      {wrongGuesses.length > 0 && (
        <div className="mt-3 bg-red-900/10 border-2 border-red-800/40 rounded-xl p-3">
          <p className="text-red-800 text-sm mb-1">Tentativas erradas:</p>
          <div className="flex flex-wrap gap-1">
            {wrongGuesses.map((id) => (
              <span key={id} className="text-sm bg-red-900/15 border border-red-700/40 text-red-800 px-2 py-0.5 rounded-full">
                {FOSSILS[id].name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PaperScreen({ children, max = "max-w-lg" }: { children: React.ReactNode; max?: string }) {
  return (
    <div className="paper-bg min-h-screen flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <Backdrop />
      <div className={`relative z-10 w-full ${max}`}>{children}</div>
    </div>
  );
}

const btnPrimary =
  "w-full font-bold py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-md text-amber-50";
const btnPrimaryStyle = { backgroundColor: "#a86b3c", border: `2px solid ${INK}` };

// ── Main Game ─────────────────────────────────────────────────────────────────
const BOARD = generateBoard();

export default function Game() {
  const allFossilIds = Object.keys(FOSSILS) as FossilId[];

  const [gs, setGs] = useState<GameState>({
    phase: "title",
    position: 0,
    score: 0,
    turn: 0,
    diceValue: null,
    currentQuestion: null,
    fossilGuess: null,
    fossilAttempts: 0,
    triviaSelected: null,
    fossilQueue: shuffle(allFossilIds),
    triviaQueue: shuffle(TRIVIA_QUESTIONS.map((_, i) => i)),
    wrongGuesses: [],
  });

  const [rolling, setRolling] = useState(false);

  const update = useCallback((patch: Partial<GameState>) => {
    setGs((prev) => ({ ...prev, ...patch }));
  }, []);

  function startGame() {
    update({
      phase: "board", position: 0, score: 0, turn: 0, diceValue: null,
      fossilQueue: shuffle(allFossilIds),
      triviaQueue: shuffle(TRIVIA_QUESTIONS.map((_, i) => i)),
    });
  }

  function rollDice() {
    setRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      update({ diceValue: Math.floor(Math.random() * 6) + 1 });
      count++;
      if (count >= 8) {
        clearInterval(interval);
        setRolling(false);
        const final = Math.floor(Math.random() * 6) + 1;
        update({ diceValue: final });
        setTimeout(() => movePlayer(final), 400);
      }
    }, 80);
  }

  function movePlayer(steps: number) {
    setGs((prev) => {
      const newPos = Math.min(prev.position + steps, BOARD.length - 1);
      const sq = BOARD[newPos];
      if (newPos >= BOARD.length - 1) return { ...prev, position: newPos, phase: "win" };
      if (sq.type === "rest") return { ...prev, position: newPos, phase: "rest" };
      if (sq.type === "fossil") {
        const queue = prev.fossilQueue.length > 0 ? prev.fossilQueue : shuffle(allFossilIds);
        const [fossilId, ...rest] = queue;
        return { ...prev, position: newPos, phase: "question_intro", currentQuestion: { type: "fossil", fossilId }, fossilAttempts: 0, fossilGuess: null, wrongGuesses: [], fossilQueue: rest };
      }
      if (sq.type === "trivia") {
        const queue = prev.triviaQueue.length > 0 ? prev.triviaQueue : shuffle(TRIVIA_QUESTIONS.map((_, i) => i));
        const [idx, ...rest] = queue;
        return { ...prev, position: newPos, phase: "question_intro", currentQuestion: { ...TRIVIA_QUESTIONS[idx] }, triviaSelected: null, triviaQueue: rest };
      }
      return { ...prev, position: newPos };
    });
  }

  function handleFossilGuess(guess: FossilId) {
    setGs((prev) => {
      if (prev.currentQuestion?.type !== "fossil") return prev;
      const correct = prev.currentQuestion.fossilId;
      const attempts = prev.fossilAttempts + 1;
      const accepted = FOSSILS[correct].acceptedIds ?? [correct];
if (accepted.includes(guess)) {
        const pts = attempts === 1 ? 3 : attempts === 2 ? 2 : 1;
        return { ...prev, fossilGuess: guess, fossilAttempts: attempts, score: prev.score + pts, phase: "fossil_correct" };
      } else {
        const wrong = [...prev.wrongGuesses, guess];
        if (attempts >= 3) return { ...prev, fossilGuess: guess, fossilAttempts: attempts, wrongGuesses: wrong, phase: "fossil_wrong" };
        return { ...prev, fossilGuess: guess, fossilAttempts: attempts, wrongGuesses: wrong };
      }
    });
  }

  function handleTriviaAnswer(opt: string) {
    setGs((prev) => ({ ...prev, triviaSelected: opt, phase: "trivia_result" }));
  }

  function endTurn() {
    setGs((prev) => ({ ...prev, phase: "board", turn: prev.turn + 1, diceValue: null, currentQuestion: null, fossilGuess: null, fossilAttempts: 0, triviaSelected: null, wrongGuesses: [] }));
  }

  // ── Title Screen ─────────────────────────────────────────────────────────────
  if (gs.phase === "title") {
  const logo = asset("logo");
  return (
    <PaperScreen>
      <div className="text-center">
        {logo ? (
          <img src={logo || "/placeholder.svg"} alt="PaleoAraripe" className="mx-auto mb-6 max-h-40 object-contain" />
        ) : (
          <div className="inline-flex items-center gap-2 bg-amber-900/10 border-2 border-amber-800/40 rounded-full px-4 py-1.5 text-amber-900 text-lg uppercase tracking-widest mb-7">
            <span className="font-serif text-xs">Desenvolvido por: Maria Muniz · Daniel Albano · Leane Moraes</span>
          </div>
        )}
        <h1 className="font-serif text-5xl md:text-6xl text-stone-800 leading-tight mb-3" style={{ textShadow: "2px 4px 8px rgba(74,58,34,0.35)" }}>
          Paleo<span style={{ color: "#a86b3c" }}>Araripe</span>
        </h1>
        <p className="text-stone-800 text-lg mb-9 leading-relaxed max-w-sm mx-auto">
          Uma expedição paleontológica pelo Cretáceo da Bacia do Araripe. Avance pela trilha, identifique fósseis e responda perguntas para chegar ao Museu.
        </p>
        <div className="rounded-2xl p-5 mb-8 text-left space-y-3 border-2 deckle paper-bg-dark" style={{ borderColor: "#5a4a30" }}>
          <h2 className="text-amber-200 font-serif text-lg mb-3 text-center">Como jogar</h2>
          {[
            { i: "🎲", t: "Role o dado para avançar pelas casas da trilha." },
            { i: "🪲", t: "Casas ocre: veja a foto e identifique o fóssil. Até 3 tentativas — quanto antes acertar, mais pontos!" },
            { i: "📜", t: "Casas verdes: responda perguntas sobre paleontologia e taxonomia." },
            { i: "🏛", t: "Chegue ao Museu com a maior pontuação possível!" },
          ].map((row, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-lg mt-0.5">{row.i}</span>
              <p className="text-stone-200 text-lg leading-relaxed">{row.t}</p>
            </div>
          ))}
        </div>
        <button onClick={startGame} className={`${btnPrimary} text-lg py-4`} style={btnPrimaryStyle}>
          Iniciar Expedição →
        </button>
      </div>
    </PaperScreen>
  );
}
  // ── Win Screen ───────────────────────────────────────────────────────────────
  if (gs.phase === "win") {
    return (
      <PaperScreen max="max-w-md">
        <div className="text-center">
          <div className="text-6xl mb-4">🏛</div>
          <h2 className="font-serif text-4xl text-stone-800 mb-2">Expedição concluída!</h2>
          <p className="text-stone-800 mb-6">Você chegou ao Museu Paleontológico do Araripe</p>
          <div className="rounded-2xl p-6 mb-8 border-2 deckle paper-bg-dark" style={{ borderColor: "#5a4a30" }}>
            <p className="text-amber-200/80 text-lg uppercase tracking-widest mb-1">Pontuação final</p>
            <p className="font-serif text-5xl text-amber-200">{gs.score}</p>
            <p className="text-stone-800 text-lg mt-1">{gs.turn} turnos · {allFossilIds.length} fósseis possíveis</p>
          </div>
          <button onClick={startGame} className={btnPrimary} style={btnPrimaryStyle}>Nova expedição</button>
        </div>
      </PaperScreen>
    );
  }

  // ── Question Intro ────────────────────────────────────────────────────────────
  if (gs.phase === "question_intro") {
    const sq = BOARD[gs.position];
    const isFossil = sq.type === "fossil";
    return (
      <PaperScreen max="max-w-md">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 border-2" style={{ backgroundColor: isFossil ? "#c98a4b" : "#7a8a5a", borderColor: INK }}>
            {isFossil ? "🪲" : "📜"}
          </div>
          <h2 className="font-serif text-3xl text-stone-800 mb-3">{isFossil ? "Identificação por foto" : "Pergunta Paleontológica"}</h2>
          <p className="text-stone-800 mb-8 text-lg leading-relaxed max-w-sm mx-auto">
            {isFossil ? "Uma foto de fóssil será exibida. Identifique o organismo usando pistas morfológicas. Você tem até 3 tentativas." : "Uma pergunta sobre paleontologia, taxonomia ou sobre a Formação Crato será apresentada."}
          </p>
          <button onClick={() => update({ phase: isFossil ? "fossil_question" : "trivia_question" })} className={btnPrimary} style={btnPrimaryStyle}>
            Ver {isFossil ? "o fóssil" : "a pergunta"}
          </button>
        </div>
      </PaperScreen>
    );
  }

  
  // ── Fossil Question ───────────────────────────────────────────────────────────
  if (gs.phase === "fossil_question" && gs.currentQuestion?.type === "fossil") {
    const fossilId = gs.currentQuestion.fossilId;
    const attemptsLeft = 3 - gs.fossilAttempts;
    return (
      <div className="paper-bg min-h-screen p-4 md:p-6 flex flex-col relative overflow-hidden">
        <Backdrop />
        <div className="relative z-10 flex flex-col flex-1">
          <div className="flex justify-between items-center mb-4 max-w-2xl mx-auto w-full">
            <div>
              <p className="text-lg text-stone-700 uppercase tracking-widest">Tentativa</p>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="w-3 h-3 rounded-full border" style={{ backgroundColor: n <= gs.fossilAttempts ? "#9a4a32" : "transparent", borderColor: "#9a4a32" }} />
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg text-stone-700 uppercase tracking-widest">Pontos possíveis</p>
              <p className="font-serif text-2xl" style={{ color: "#a86b3c" }}>{attemptsLeft > 0 ? 4 - gs.fossilAttempts - 1 : 0}</p>
            </div>
          </div>
          <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col gap-4">
            <FossilCard fossilId={fossilId} revealed={false} />
            {gs.wrongGuesses.length > 0 && (
              <div className="bg-red-900/10 border-2 border-red-800/40 rounded-xl p-3">
                <p className="text-red-800 text-lg mb-1">Tentativas erradas:</p>
                <div className="flex flex-wrap gap-1">
                  {gs.wrongGuesses.map((id) => (
                    <span key={id} className="text-lg bg-red-900/15 border border-red-700/40 text-red-800 px-2 py-0.5 rounded-full">{FOSSILS[id].name}</span>
                  ))}
                </div>
              </div>
            )}
           <FossilSearchInput
  allIds={allFossilIds}
  wrongGuesses={gs.wrongGuesses}
  onGuess={handleFossilGuess}
/>
          </div>
        </div>
      </div>
    );
  }

  // ── Fossil Correct ────────────────────────────────────────────────────────────
  if (gs.phase === "fossil_correct" && gs.currentQuestion?.type === "fossil") {
    const fossilId = gs.currentQuestion.fossilId;
    const fossil = FOSSILS[fossilId];
    const pts = gs.fossilAttempts === 1 ? 3 : gs.fossilAttempts === 2 ? 2 : 1;
    return (
      <div className="paper-bg min-h-screen p-4 flex flex-col relative overflow-hidden">
        <Backdrop />
        <div className="relative z-10 max-w-2xl mx-auto w-full flex-1 flex flex-col gap-4">
          <div className="rounded-2xl p-5 text-center border-2" style={{ backgroundColor: "#e6ecd9", borderColor: "#4f6b3f" }}>
            <p className="text-lg uppercase tracking-widest mb-1" style={{ color: "#3f5730" }}>Correto!</p>
            <h2 className="font-serif text-2xl text-stone-800 mb-0.5">{fossil.name}</h2>
            <p className="text-stone-800 text-lg italic">{fossil.sciName}</p>
            <div className="inline-flex items-center gap-2 mt-2 bg-white/50 border border-emerald-800/30 rounded-full px-3 py-1">
              <span className="font-bold" style={{ color: "#a86b3c" }}>+{pts}</span>
              <span className="text-stone-800 text-lg">pontos</span>
            </div>
          </div>

          <div className="rounded-2xl p-6 flex flex-col items-center gap-4 border-2 deckle" style={{ backgroundColor: "#fffdf6", borderColor: "#bda878" }}>
            <FossilImage fossilId={fossilId} size={160} rounded />
            <span className="text-lg bg-amber-100/70 border border-amber-700/40 rounded px-2 py-0.5 text-amber-800">{fossil.group}</span>
          </div>

          <div className="rounded-2xl p-4 space-y-3 border-2" style={{ backgroundColor: "#fffdf6", borderColor: "#bda878" }}>
            <div className="flex gap-2 text-lg text-stone-800 flex-wrap">
              <span className="bg-amber-100/60 rounded px-2 py-0.5">🗺 {fossil.habitat}</span>
              <span className="bg-amber-100/60 rounded px-2 py-0.5">⏳ {fossil.period}</span>
            </div>
            <p className="text-stone-700 text-lg leading-relaxed">{fossil.description}</p>
            <div className="rounded-xl p-3 border" style={{ backgroundColor: "#f6edd6", borderColor: "#cbb888" }}>
              <p className="text-amber-800 text-lg font-semibold mb-1">Curiosidade</p>
              <p className="text-stone-700 text-lg">{fossil.funFact}</p>
            </div>
          </div>
         {fossil.taxon && (
  <INaturalistGrid taxon={fossil.taxon} />
)}
<button onClick={endTurn} className={`${btnPrimary} mt-auto`} style={btnPrimaryStyle}>Próximo turno →</button>
        </div>
      </div>
    );
  }

  // ── Fossil Wrong ──────────────────────────────────────────────────────────────
  if (gs.phase === "fossil_wrong" && gs.currentQuestion?.type === "fossil") {
    const fossilId = gs.currentQuestion.fossilId;
    const fossil = FOSSILS[fossilId];
    return (
      <div className="paper-bg min-h-screen p-4 flex flex-col relative overflow-hidden">
        <Backdrop />
        <div className="relative z-10 max-w-2xl mx-auto w-full flex-1 flex flex-col gap-4">
          <div className="rounded-2xl p-5 text-center border-2" style={{ backgroundColor: "#efdcd6", borderColor: "#9a4a32" }}>
            <p className="text-lg uppercase tracking-widest mb-1" style={{ color: "#9a4a32" }}>Sem pontos desta vez</p>
            <h2 className="font-serif text-2xl text-stone-800 mb-0.5">{fossil.name}</h2>
            <p className="text-stone-800 text-lg italic">{fossil.sciName}</p>
          </div>

          <div className="rounded-2xl p-6 flex flex-col items-center gap-4 border-2 deckle" style={{ backgroundColor: "#fffdf6", borderColor: "#bda878" }}>
            <FossilImage fossilId={fossilId} size={160} rounded />
            <span className="text-lg bg-amber-100/70 border border-amber-700/40 rounded px-2 py-0.5 text-amber-800">{fossil.group}</span>
          </div>

          <div className="rounded-2xl p-4 space-y-3 border-2" style={{ backgroundColor: "#fffdf6", borderColor: "#bda878" }}>
            <p className="text-stone-700 text-lg leading-relaxed">{fossil.description}</p>
            <div className="rounded-xl p-3 border" style={{ backgroundColor: "#f6edd6", borderColor: "#cbb888" }}>
              <p className="text-amber-800 text-lg font-semibold mb-1">Curiosidade</p>
              <p className="text-stone-700 text-lg">{fossil.funFact}</p>
            </div>
          </div>

          <button onClick={endTurn} className={`${btnPrimary} mt-auto`} style={{ backgroundColor: "#7d6b56", border: `2px solid ${INK}` }}>Continuar →</button>
        </div>
      </div>
    );
  }

  // ── Trivia Question ───────────────────────────────────────────────────────────
  if (gs.phase === "trivia_question" && gs.currentQuestion?.type === "trivia") {
    const q = gs.currentQuestion;
    return (
      <div className="paper-bg min-h-screen p-4 flex flex-col relative overflow-hidden">
        <Backdrop />
        <div className="relative z-10 max-w-2xl mx-auto w-full flex-1 flex flex-col gap-4 justify-center">
          <div className="rounded-2xl p-5 border-2 deckle" style={{ backgroundColor: "#e6ecd9", borderColor: "#4d5a35" }}>
            <p className="text-lg uppercase tracking-widest mb-2" style={{ color: "#4f6b3f" }}>
              {q.difficulty === "easy" ? "Fácil · 1pt" : q.difficulty === "medium" ? "Médio · 2pts" : "Difícil · 3pts"}
            </p>
            <p className="text-stone-800 text-lg leading-relaxed font-serif">{q.question}</p>
          </div>
          <div className="flex flex-col gap-2">
            {q.options.map((opt) => (
              <button key={opt} onClick={() => handleTriviaAnswer(opt)} className="text-left p-4 rounded-xl border-2 text-stone-700 text-lg transition-all hover:scale-[1.01] active:scale-95" style={{ backgroundColor: "#fffdf6", borderColor: "#bda878" }}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Trivia Result ─────────────────────────────────────────────────────────────
  if (gs.phase === "trivia_result" && gs.currentQuestion?.type === "trivia") {
    const q = gs.currentQuestion;
    const isCorrect = gs.triviaSelected === q.answer;
    const pts = q.difficulty === "easy" ? 1 : q.difficulty === "medium" ? 2 : 3;
    return (
      <div className="paper-bg min-h-screen p-4 flex flex-col relative overflow-hidden">
        <Backdrop />
        <div className="relative z-10 max-w-2xl mx-auto w-full flex-1 flex flex-col gap-4 justify-center">
          <div className="rounded-2xl p-5 border-2" style={{ backgroundColor: isCorrect ? "#e6ecd9" : "#efdcd6", borderColor: isCorrect ? "#4f6b3f" : "#9a4a32" }}>
            <p className="text-lg uppercase tracking-widest mb-1" style={{ color: isCorrect ? "#3f5730" : "#9a4a32" }}>
              {isCorrect ? `Correto! +${pts} pontos` : "Incorreto"}
            </p>
            <p className="text-stone-800 font-serif text-lg">{q.question}</p>
          </div>
          <div className="flex flex-col gap-2">
            {q.options.map((opt) => {
              const isAnswer = opt === q.answer;
              const isSelected = opt === gs.triviaSelected;
              let bg = "#fffdf6"; let bd = "#cabfa3"; let col = "#8a7c64";
              if (isAnswer) { bg = "#e6ecd9"; bd = "#4f6b3f"; col = "#3f5730"; }
              else if (isSelected) { bg = "#efdcd6"; bd = "#9a4a32"; col = "#9a4a32"; }
              return (
                <div key={opt} className="p-4 rounded-xl border-2 text-lg" style={{ backgroundColor: bg, borderColor: bd, color: col }}>
                  {opt}{isAnswer && <span className="ml-2 text-lg">✓ correto</span>}
                </div>
              );
            })}
          </div>
          <div className="rounded-xl p-4 border-2" style={{ backgroundColor: "#f6edd6", borderColor: "#cbb888" }}>
            <p className="text-amber-800 text-lg font-semibold mb-1">Explicação</p>
            <p className="text-stone-700 text-lg leading-relaxed">{q.explanation}</p>
          </div>
          <button       
            onClick={() => { if (isCorrect) update({ score: gs.score + pts, phase: "board", turn: gs.turn + 1, diceValue: null, currentQuestion: null, triviaSelected: null }); else endTurn(); }}
            className={`${btnPrimary} mt-auto`} style={btnPrimaryStyle}
          >
            Próximo turno →
          </button>
        </div>
      </div>
    );
  }

  // ── Board View ────────────────────────────────────────────────────────────────
  return (
    <div className="paper-bg min-h-screen flex flex-col relative overflow-hidden">
      <Backdrop />
      <div className="sticky top-0 z-20 px-4 py-3 flex justify-between items-center backdrop-blur border-b-2" style={{ borderColor: "#cbb888", backgroundColor: "rgba(232,220,192,0.85)" }}>
        <div>
          <h1 className="font-serif text-lg text-stone-800 leading-none">Paleo<span style={{ color: "#a86b3c" }}>Araripe</span></h1>
          <p className="text-stone-800 text-lg">Turno {gs.turn + 1} · Casa {gs.position}/40 </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-stone-700 text-lg uppercase tracking-widest">Pontos</p>
            <p className="font-serif text-xl leading-none" style={{ color: "#a86b3c" }}>{gs.score}</p>
          </div>
          <button onClick={startGame} className="text-stone-800 hover:text-amber-900 text-lg border-2 rounded-lg px-2 py-1 transition-all" style={{ borderColor: "#cbb888" }}>Reiniciar</button>
        </div>
      </div>
      <div className="relative z-10 flex-1 p-4 max-w-3xl mx-auto w-full flex flex-col gap-4">
        <div className="rounded-2xl p-3 md:p-5 border-4 deckle paper-vignette" style={{ borderColor: "#8a6a3a", backgroundColor: "#ddccaa" }}>
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="font-serif text-xs text-stone-700">Trilha da Expedição</span>
<span className="font-serif text-[10px] text-stone-500 uppercase tracking-widest">Bacia do Araripe</span>
          </div>
          <BoardView squares={BOARD} position={gs.position} />
          <div className="flex gap-4 justify-center mt-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-lg text-stone-800"><span className="w-3 h-3 rounded-full inline-block border" style={{ backgroundColor: "#c98a4b", borderColor: "#7a5226" }} />Fóssil</span>
            <span className="flex items-center gap-1.5 text-lg text-stone-800"><span className="w-3 h-3 rounded-full inline-block border" style={{ backgroundColor: "#7a8a5a", borderColor: "#4d5a35" }} />Trivia</span>
          </div>
        </div>
        <div className="rounded-2xl p-5 flex flex-col items-center gap-4 border-2 deckle" style={{ borderColor: "#bda878", backgroundColor: "#fffdf6" }}>
          <div className="flex items-center gap-6">
            {gs.diceValue ? (
              <DieSVG value={gs.diceValue} rolling={rolling} />
            ) : (
              <div className="w-16 h-16 rounded-xl border-2 border-dashed flex items-center justify-center text-2xl" style={{ borderColor: "#bda878", color: "#bda878" }}>?</div>
            )}
            <div>
              <p className="text-stone-700 text-lg">{gs.diceValue ? `Você tirou ${gs.diceValue}` : "Role o dado para avançar"}</p>
              {gs.diceValue && <p className="text-lg text-stone-700 mt-0.5">Casa atual: {gs.position} → {Math.min(gs.position + gs.diceValue, 40)}</p>}
            </div>
          </div>
          <button onClick={rollDice} disabled={rolling} className={`${btnPrimary} max-w-xs disabled:opacity-50`} style={btnPrimaryStyle}>
            {rolling ? "Rolando…" : "🎲 Rolar dado"}
          </button>
        </div>
        <div className="rounded-xl p-3 border-2" style={{ borderColor: "#bda878", backgroundColor: "#fffdf6" }}>
          <div className="flex justify-between text-lg text-stone-800 mb-1.5">
            <span>Progresso</span>
            <span>{Math.round((gs.position / 40) * 100)}%</span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "#ddccaa" }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(gs.position / 40) * 100}%`, backgroundColor: "#a86b3c" }} />
          </div>
        </div>
      </div>
    </div>
  );
}