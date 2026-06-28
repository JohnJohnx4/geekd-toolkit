import magicLogo from "../assets/timer-logos/magic-the-gathering-logo.png";
import pokemonLogo from "../assets/timer-logos/pokemon-tcg-logo.svg";
import yugiohLogo from "../assets/timer-logos/yugioh.svg";
import lorcanaLogo from "../assets/timer-logos/disney-lorcana-logo.png";
import onePieceLogo from "../assets/timer-logos/one-piece-card-game-logo-white.png";
import starWarsUnlimitedLogo from "../assets/timer-logos/star-wars-unlimited.svg";
import unionArenaLogo from "../assets/timer-logos/union-arena-logo.webp";
import dragonBallFusionLogo from "../assets/timer-logos/dragon-ball-fusion-official-white.png";
import digimonLogo from "../assets/timer-logos/digimon-card-game-logo.webp";
import cookieRunLogo from "../assets/timer-logos/cookie-run.svg";
import riftboundLogo from "../assets/timer-logos/riftbound-league-of-legends-logo.png";
import gundamLogo from "../assets/timer-logos/gundam-card-game-logo-white.png";
import myLittlePonyLogo from "../assets/timer-logos/my-little-pony-logo.webp";

export type TcgKey =
  | "magic"
  | "pokemon"
  | "yugioh"
  | "lorcana"
  | "onePiece"
  | "starWars"
  | "unionArena"
  | "dragonBallFusion"
  | "digimon"
  | "cookieRun"
  | "riftbound"
  | "gundam"
  | "myLittlePony";

export type TimerItem = {
  id: number;
  name: string;
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
  logoImage: string;
  color: string;
  background: string;
};

export const TIMER_STORAGE_KEY = "geekd.timerController.snapshot";

export const TCG_OPTIONS: TcgOption[] = [
  {
    key: "magic",
    name: "Magic",
    logo: "MTG",
    logoImage: magicLogo,
    color: "#f7f1e2",
    background: "#1f2933",
  },
  {
    key: "pokemon",
    name: "Pokemon",
    logo: "PKM",
    logoImage: pokemonLogo,
    color: "#172554",
    background: "#f8fafc",
  },
  {
    key: "yugioh",
    name: "Yu-Gi-Oh",
    logo: "YGO",
    logoImage: yugiohLogo,
    color: "#f8fafc",
    background: "#991b1b",
  },
  {
    key: "lorcana",
    name: "Lorcana",
    logo: "LOR",
    logoImage: lorcanaLogo,
    color: "#f8fafc",
    background: "#111827",
  },
  {
    key: "onePiece",
    name: "One Piece",
    logo: "OP",
    logoImage: onePieceLogo,
    color: "#f8fafc",
    background: "#0f172a",
  },
  {
    key: "starWars",
    name: "Star Wars Unlimited",
    logo: "SWU",
    logoImage: starWarsUnlimitedLogo,
    color: "#e0f2fe",
    background: "#0f172a",
  },
  {
    key: "unionArena",
    name: "Union Arena",
    logo: "UA",
    logoImage: unionArenaLogo,
    color: "#f8fafc",
    background: "#0f172a",
  },
  {
    key: "dragonBallFusion",
    name: "DragonBall Fusion",
    logo: "DBF",
    logoImage: dragonBallFusionLogo,
    color: "#f8fafc",
    background: "#155e75",
  },
  {
    key: "digimon",
    name: "Digimon",
    logo: "DIG",
    logoImage: digimonLogo,
    color: "#fefce8",
    background: "#0f172a",
  },
  {
    key: "cookieRun",
    name: "Cookie Run",
    logo: "CRK",
    logoImage: cookieRunLogo,
    color: "#451a03",
    background: "#fbbf24",
  },
  {
    key: "riftbound",
    name: "Riftbound",
    logo: "RFT",
    logoImage: riftboundLogo,
    color: "#ecfeff",
    background: "#155e75",
  },
  {
    key: "gundam",
    name: "Gundam Card Game",
    logo: "GCG",
    logoImage: gundamLogo,
    color: "#f8fafc",
    background: "#0f172a",
  },
  {
    key: "myLittlePony",
    name: "My Little Pony",
    logo: "MLP",
    logoImage: myLittlePonyLogo,
    color: "#f8fafc",
    background: "#1e1b4b",
  },
];

export const getTcg = (key: TcgKey) =>
  TCG_OPTIONS.find((option) => option.key === key) ?? TCG_OPTIONS[0];

export const getTimerName = (timer: Pick<TimerItem, "id"> & { name?: string }) =>
  timer.name?.trim() || `Timer ${timer.id}`;

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
