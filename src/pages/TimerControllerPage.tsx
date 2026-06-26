import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TimerIcon from "@mui/icons-material/Timer";

type TcgKey =
  | "magic"
  | "pokemon"
  | "yugioh"
  | "lorcana"
  | "onePiece"
  | "starWars";

type TimerItem = {
  id: number;
  tcg: TcgKey;
  durationSeconds: number;
  remainingSeconds: number;
  running: boolean;
};

type TcgOption = {
  key: TcgKey;
  name: string;
  logo: string;
  color: string;
  background: string;
};

const MAX_TIMERS = 6;
const MAX_DURATION_SECONDS = 60 * 60;
const DEFAULT_DURATION_SECONDS = 50 * 60;

const TCG_OPTIONS: TcgOption[] = [
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

const getTcg = (key: TcgKey) =>
  TCG_OPTIONS.find((option) => option.key === key) ?? TCG_OPTIONS[0];

const clampDuration = (seconds: number) =>
  Math.min(MAX_DURATION_SECONDS, Math.max(60, Math.floor(seconds)));

const createTimer = (id: number, tcg: TcgKey): TimerItem => ({
  id,
  tcg,
  durationSeconds: DEFAULT_DURATION_SECONDS,
  remainingSeconds: DEFAULT_DURATION_SECONDS,
  running: false,
});

const formatTime = (seconds: number) => {
  const isOvertime = seconds < 0;
  const absoluteSeconds = Math.abs(Math.ceil(seconds));
  const minutes = Math.floor(absoluteSeconds / 60);
  const remainingSeconds = absoluteSeconds % 60;
  const time = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;

  return isOvertime ? `-${time}` : time;
};

const parseDurationInput = (value: string) => {
  if (value === "") return "";
  return String(Number(value));
};

export default function TimerControllerPage() {
  const [timers, setTimers] = useState<TimerItem[]>(() => [
    createTimer(1, "magic"),
  ]);

  const timerCount = timers.length;
  const runningCount = timers.filter((timer) => timer.running).length;
  const nextTimerId = useMemo(
    () => Math.max(0, ...timers.map((timer) => timer.id)) + 1,
    [timers]
  );

  const addTimer = () => {
    setTimers((prev) => {
      if (prev.length >= MAX_TIMERS) return prev;

      const nextTcg = TCG_OPTIONS[prev.length % TCG_OPTIONS.length].key;
      return [...prev, createTimer(nextTimerId, nextTcg)];
    });
  };

  const updateTimer = useCallback(
    (id: number, updater: (timer: TimerItem) => TimerItem) => {
      setTimers((prev) =>
        prev.map((timer) => (timer.id === id ? updater(timer) : timer))
      );
    },
    []
  );

  const removeTimer = (id: number) => {
    setTimers((prev) => prev.filter((timer) => timer.id !== id));
  };

  const setAllRunning = (running: boolean) => {
    setTimers((prev) => prev.map((timer) => ({ ...timer, running })));
  };

  const resetAll = () => {
    setTimers((prev) =>
      prev.map((timer) => ({
        ...timer,
        remainingSeconds: timer.durationSeconds,
        running: false,
      }))
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) =>
        prev.map((timer) =>
          timer.running
            ? { ...timer, remainingSeconds: timer.remainingSeconds - 1 }
            : timer
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 } }}>
      <Stack spacing={2.5}>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <TimerIcon color="primary" />
                <Typography variant="h1" sx={{ fontSize: { xs: 30, sm: 42 } }}>
                  Timer Controller
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(3, minmax(0, 1fr))",
                  },
                  gap: 1,
                }}
              >
                <Chip label={`${timerCount} of ${MAX_TIMERS} timers`} />
                <Chip label={`${runningCount} running`} color="primary" />
                <Chip label="Max length 60 minutes" variant="outlined" />
              </Box>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                <Button
                  variant="contained"
                  startIcon={<AddAlarmIcon />}
                  onClick={addTimer}
                  disabled={timers.length >= MAX_TIMERS}
                >
                  Add Timer
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => setAllRunning(true)}
                  disabled={!timers.length}
                >
                  Start All
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PauseIcon />}
                  onClick={() => setAllRunning(false)}
                  disabled={!timers.length}
                >
                  Pause All
                </Button>
                <Button
                  color="warning"
                  variant="outlined"
                  startIcon={<RestartAltIcon />}
                  onClick={resetAll}
                  disabled={!timers.length}
                >
                  Reset All
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {timers.map((timer) => {
            const tcg = getTcg(timer.tcg);
            const isOvertime = timer.remainingSeconds < 0;
            const durationMinutes = Math.round(timer.durationSeconds / 60);

            return (
              <Card
                key={timer.id}
                sx={{
                  borderRadius: 2,
                  border: "2px solid",
                  borderColor: isOvertime ? "error.main" : "divider",
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      spacing={1}
                    >
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <Box
                          sx={{
                            width: 72,
                            minWidth: 72,
                            height: 52,
                            display: "grid",
                            placeItems: "center",
                            borderRadius: 1.5,
                            bgcolor: tcg.background,
                            color: tcg.color,
                            fontWeight: 900,
                            fontSize: 20,
                            letterSpacing: 0,
                          }}
                        >
                          {tcg.logo}
                        </Box>
                        <Box>
                          <Typography variant="h6">{tcg.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Timer {timer.id}
                          </Typography>
                        </Box>
                      </Stack>

                      <IconButton
                        color="error"
                        onClick={() => removeTimer(timer.id)}
                        aria-label={`Remove timer ${timer.id}`}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>

                    <Typography
                      variant="h2"
                      textAlign="center"
                      color={isOvertime ? "error.main" : "text.primary"}
                      sx={{
                        fontSize: { xs: 56, sm: 64 },
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {formatTime(timer.remainingSeconds)}
                    </Typography>

                    {isOvertime ? (
                      <Chip
                        color="error"
                        label="Overtime"
                        sx={{ fontWeight: 800, alignSelf: "center" }}
                      />
                    ) : (
                      <Chip
                        label={timer.running ? "Running" : "Paused"}
                        color={timer.running ? "success" : "default"}
                        sx={{ alignSelf: "center" }}
                      />
                    )}

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1}
                    >
                      <FormControl fullWidth>
                        <InputLabel>TCG</InputLabel>
                        <Select
                          value={timer.tcg}
                          label="TCG"
                          onChange={(event) =>
                            updateTimer(timer.id, (current) => ({
                              ...current,
                              tcg: event.target.value as TcgKey,
                            }))
                          }
                        >
                          {TCG_OPTIONS.map((option) => (
                            <MenuItem key={option.key} value={option.key}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <TextField
                        label="Length"
                        type="number"
                        value={durationMinutes}
                        onChange={(event) => {
                          const cleanValue = parseDurationInput(
                            event.target.value
                          );
                          if (cleanValue === "") return;

                          const durationSeconds = clampDuration(
                            Number(cleanValue) * 60
                          );
                          updateTimer(timer.id, (current) => ({
                            ...current,
                            durationSeconds,
                            remainingSeconds: current.running
                              ? current.remainingSeconds
                              : durationSeconds,
                          }));
                        }}
                        inputProps={{
                          min: 1,
                          max: 60,
                          step: 1,
                          inputMode: "numeric",
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">min</InputAdornment>
                          ),
                        }}
                        sx={{ minWidth: { sm: 140 } }}
                      />
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      <Button
                        fullWidth
                        variant={timer.running ? "outlined" : "contained"}
                        startIcon={
                          timer.running ? <PauseIcon /> : <PlayArrowIcon />
                        }
                        onClick={() =>
                          updateTimer(timer.id, (current) => ({
                            ...current,
                            running: !current.running,
                          }))
                        }
                      >
                        {timer.running ? "Pause" : "Start"}
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<RestartAltIcon />}
                        onClick={() =>
                          updateTimer(timer.id, (current) => ({
                            ...current,
                            running: false,
                            remainingSeconds: current.durationSeconds,
                          }))
                        }
                      >
                        Reset
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}

          {!timers.length ? (
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Stack spacing={2} alignItems="center">
                  <Typography>No timers on screen.</Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={addTimer}
                  >
                    Add Timer
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ) : null}
        </Box>
      </Stack>
    </Container>
  );
}
