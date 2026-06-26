export type TcgKey =
  | "magic"
  | "pokemon"
  | "yugioh"
  | "lorcana"
  | "onePiece"
  | "starWars";

export type TimerItem = {
  id: number;
  tcg: TcgKey;
  durationSeconds: number;
  remainingSeconds: number;
  running: boolean;
};

export type TimerSnapshot = {
  timers: TimerItem[];
  updatedAt: number;
};

type TcgOption = {
  key: TcgKey;
  name: string;
  logo: string;
  color: string;
  background: string;
};

export const TIMER_STORAGE_KEY = "geekd.timerController.snapshot";

export const TCG_OPTIONS: TcgOption[] = [
  {
    key: "magic",
    name: "Magic",
    logo: "MTG",
    color: "#f7f1e2",
    background: "#1f2933",
  },
  {
    key: "pokemon",
    name: "Pokemon",
    logo: "PKM",
    color: "#172554",
    background: "#ffcb05",
  },
  {
    key: "yugioh",
    name: "Yu-Gi-Oh",
    logo: "YGO",
    color: "#f8fafc",
    background: "#991b1b",
  },
  {
    key: "lorcana",
    name: "Lorcana",
    logo: "LOR",
    color: "#1e1b4b",
    background: "#c4b5fd",
  },
  {
    key: "onePiece",
    name: "One Piece",
    logo: "OP",
    color: "#111827",
    background: "#fde68a",
  },
  {
    key: "starWars",
    name: "Star Wars Unlimited",
    logo: "SWU",
    color: "#e0f2fe",
    background: "#0f172a",
  },
];

export const getTcg = (key: TcgKey) =>
  TCG_OPTIONS.find((option) => option.key === key) ?? TCG_OPTIONS[0];

export const formatTime = (seconds: number) => {
  const isOvertime = seconds < 0;
  const absoluteSeconds = Math.abs(Math.ceil(seconds));
  const minutes = Math.floor(absoluteSeconds / 60);
  const remainingSeconds = absoluteSeconds % 60;
  const time = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;

  return isOvertime ? `-${time}` : time;
};

export const readTimerSnapshot = (): TimerSnapshot | null => {
  if (typeof window === "undefined") return null;

  try {
    const storedValue = window.localStorage.getItem(TIMER_STORAGE_KEY);
    if (!storedValue) return null;

    const snapshot = JSON.parse(storedValue) as TimerSnapshot;
    if (!Array.isArray(snapshot.timers)) return null;

    return snapshot;
  } catch {
    return null;
  }
};
