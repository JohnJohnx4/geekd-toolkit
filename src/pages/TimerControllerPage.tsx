import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  FormControlLabel,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import AddIcon from "@mui/icons-material/Add";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import DeleteIcon from "@mui/icons-material/Delete";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TimerIcon from "@mui/icons-material/Timer";
import {
  formatTime,
  getTimerRemainingSeconds,
  getTcg,
  getTimerName,
  isValidIsoDate,
  pauseTimer,
  readTimerSnapshot,
  resetTimer,
  startTimer,
  TCG_OPTIONS,
  TIMER_STORAGE_KEY,
  type TcgKey,
  type TimerItem,
  type TimerSnapshot,
} from "./timerControllerUtils";

const MAX_TIMERS = 6;
const MAX_DURATION_SECONDS = 60 * 60;
const DEFAULT_DURATION_SECONDS = 50 * 60;

const clampDuration = (seconds: number) =>
  Math.min(MAX_DURATION_SECONDS, Math.max(60, Math.floor(seconds)));

const createTimer = (id: number, tcg: TcgKey): TimerItem => ({
  id,
  name: `Timer ${id}`,
  tcg,
  durationSeconds: DEFAULT_DURATION_SECONDS,
  remainingSeconds: DEFAULT_DURATION_SECONDS,
  running: false,
  overtimeEnabled: true,
});

const isTcgKey = (value: string): value is TcgKey =>
  TCG_OPTIONS.some((option) => option.key === value);

const normalizeSavedTimers = (
  snapshot: TimerSnapshot | null,
  applyElapsedTime = false
): TimerItem[] => {
  if (!snapshot?.timers.length) return [createTimer(1, "magic")];

  const snapshotUpdatedAt = Number.isFinite(snapshot.updatedAt)
    ? snapshot.updatedAt
    : Date.now();
  const now = Date.now();
  const elapsedSeconds = applyElapsedTime
    ? Math.max(0, Math.floor((now - snapshotUpdatedAt) / 1000))
    : 0;

  return snapshot.timers.slice(0, MAX_TIMERS).map((timer, index) => {
    const id = Number.isFinite(timer.id) ? timer.id : index + 1;
    const durationSeconds = clampDuration(
      Number.isFinite(timer.durationSeconds)
        ? timer.durationSeconds
        : DEFAULT_DURATION_SECONDS
    );
    const remainingSeconds = Number.isFinite(timer.remainingSeconds)
      ? Math.floor(timer.remainingSeconds)
      : durationSeconds;
    const targetEndAt = isValidIsoDate(timer.targetEndAt)
      ? timer.targetEndAt
      : undefined;
    const running = Boolean(timer.running);
    const adjustedRemainingSeconds =
      running && targetEndAt
        ? Math.ceil((Date.parse(targetEndAt) - now) / 1000)
        : running
          ? remainingSeconds - elapsedSeconds
          : remainingSeconds;
    const adjustedTargetEndAt = running
      ? targetEndAt ??
        new Date(now + adjustedRemainingSeconds * 1000).toISOString()
      : undefined;

    return {
      id,
      name: getTimerName({ id, name: timer.name }),
      tcg: isTcgKey(timer.tcg) ? timer.tcg : "magic",
      durationSeconds,
      remainingSeconds: adjustedRemainingSeconds,
      running,
      overtimeEnabled: timer.overtimeEnabled ?? snapshot.overtimeEnabled ?? true,
      startedAt: isValidIsoDate(timer.startedAt) ? timer.startedAt : undefined,
      targetEndAt: adjustedTargetEndAt,
    };
  });
};

const parseDurationInput = (value: string) => {
  if (value === "") return "";
  return String(Number(value));
};

const formatStartedAt = (startedAt?: string) => {
  if (!startedAt) return "Not started yet";

  return `Started ${new Date(startedAt).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  })}`;
};

const getFullscreenGridColumns = (count: number) => ({
  xs: "1fr",
  md: count <= 1 ? "1fr" : "repeat(2, minmax(0, 1fr))",
  xl:
    count <= 1
      ? "1fr"
      : count === 2
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(3, minmax(0, 1fr))",
});

const getFullscreenTimeFontSize = (
  count: number,
  showRoundOver: boolean
) => {
  if (showRoundOver) return { xs: 48, sm: 72, md: 92, xl: 112 };
  if (count <= 1) return { xs: 86, sm: 150, md: 210, xl: 250 };
  if (count === 2) return { xs: 78, sm: 128, md: 156, xl: 188 };
  return { xs: 64, sm: 86, md: 104, xl: 124 };
};

const getFullscreenLogoSize = (count: number) => {
  if (count <= 1) {
    return {
      width: { xs: 190, sm: 320, md: 440, xl: 540 },
      height: { xs: 116, sm: 190, md: 260, xl: 320 },
    };
  }

  if (count === 2) {
    return {
      width: { xs: 160, sm: 240, md: 300, xl: 360 },
      height: { xs: 98, sm: 146, md: 180, xl: 216 },
    };
  }

  return {
    width: { xs: 132, sm: 176, md: 220, xl: 260 },
    height: { xs: 82, sm: 108, md: 134, xl: 158 },
  };
};

const getFullscreenTitleFontSize = (count: number) => {
  if (count <= 1) return { xs: 54, sm: 96, md: 136, xl: 164 };
  if (count === 2) return { xs: 48, sm: 74, md: 94, xl: 116 };
  return { xs: 38, sm: 52, md: 64, xl: 76 };
};

const getFullscreenGameFontSize = (count: number) => {
  if (count <= 1) return { xs: 28, sm: 48, md: 64, xl: 78 };
  if (count === 2) return { xs: 24, sm: 36, md: 46, xl: 56 };
  return { xs: 20, sm: 28, md: 34, xl: 40 };
};

export default function TimerControllerPage() {
  const [timers, setTimers] = useState<TimerItem[]>(() =>
    normalizeSavedTimers(readTimerSnapshot(), true)
  );
  const [now, setNow] = useState(() => Date.now());
  const [fullscreenDisplayOpen, setFullscreenDisplayOpen] = useState(false);
  const fullscreenDisplayRef = useRef<HTMLDivElement | null>(null);

  const timerCount = timers.length;
  const runningCount = timers.filter((timer) => timer.running).length;
  const displayedTimers = useMemo(
    () =>
      timers.map((timer) => ({
        ...timer,
        displayedSeconds: getTimerRemainingSeconds(timer, now),
      })),
    [now, timers]
  );
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
    setTimers((prev) =>
      prev.map((timer) => (running ? startTimer(timer) : pauseTimer(timer)))
    );
  };

  const resetAll = () => {
    setTimers((prev) => prev.map(resetTimer));
  };

  const reconcileRunningTimers = useCallback(() => {
    const nextNow = Date.now();
    setNow(nextNow);
    setTimers((prev) =>
      prev.map((timer) =>
        timer.running
          ? {
              ...timer,
              remainingSeconds: getTimerRemainingSeconds(timer, nextNow),
            }
          : timer
      )
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      reconcileRunningTimers();
    };
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        reconcileRunningTimers();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [reconcileRunningTimers]);

  useEffect(() => {
    window.localStorage.setItem(
      TIMER_STORAGE_KEY,
      JSON.stringify({
        timers,
        updatedAt: Date.now(),
      } satisfies TimerSnapshot)
    );
  }, [timers]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenDisplayOpen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const openFullscreenDisplay = () => {
    setFullscreenDisplayOpen(true);

    window.setTimeout(() => {
      fullscreenDisplayRef.current?.requestFullscreen?.().catch(() => {});
    }, 0);
  };

  const closeFullscreenDisplay = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    setFullscreenDisplayOpen(false);
  };

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
                <Button
                  variant="outlined"
                  startIcon={<FullscreenIcon />}
                  onClick={openFullscreenDisplay}
                  disabled={!timers.length}
                >
                  Fullscreen Display
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
              xl: "repeat(3, minmax(0, 1fr))",
            },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {displayedTimers.map((timer) => {
            const tcg = getTcg(timer.tcg);
            const displayedSeconds = timer.displayedSeconds;
            const isOvertime = timer.displayedSeconds < 0;
            const showRoundOver = isOvertime && !timer.overtimeEnabled;
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
                <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                  <Stack spacing={2.25}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={1}
                    >
                      <Stack
                        direction="row"
                        spacing={1.25}
                        alignItems="center"
                        sx={{ minWidth: 0 }}
                      >
                        <Box
                          sx={{
                            width: 72,
                            minWidth: 72,
                            height: 52,
                            display: "grid",
                            placeItems: "center",
                            borderRadius: 1.5,
                            bgcolor: tcg.background,
                            overflow: "hidden",
                            p: 0.5,
                          }}
                        >
                          <Box
                            component="img"
                            src={tcg.logoImage}
                            alt={`${tcg.name} logo`}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              lineHeight: 1.15,
                              overflowWrap: "anywhere",
                            }}
                          >
                            {tcg.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {getTimerName(timer)}
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
                        fontSize: showRoundOver
                          ? { xs: 42, sm: 50 }
                          : { xs: 56, sm: 64 },
                        fontVariantNumeric: "tabular-nums",
                        lineHeight: 1.05,
                      }}
                    >
                      {showRoundOver
                        ? "Round Over"
                        : formatTime(displayedSeconds)}
                    </Typography>

                    {isOvertime ? (
                      <Chip
                        color="error"
                        label={showRoundOver ? "Round Over" : "Overtime"}
                        sx={{ fontWeight: 800, alignSelf: "center" }}
                      />
                    ) : (
                      <Chip
                        label={timer.running ? "Running" : "Paused"}
                        color={timer.running ? "success" : "default"}
                        sx={{ alignSelf: "center" }}
                      />
                    )}

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      sx={{ fontWeight: 700 }}
                    >
                      {formatStartedAt(timer.startedAt)}
                    </Typography>

                    <Stack spacing={1.25}>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.25}
                      >
                        <TextField
                          label="Timer name"
                          value={timer.name ?? `Timer ${timer.id}`}
                          onChange={(event) =>
                            updateTimer(timer.id, (current) => ({
                              ...current,
                              name: event.target.value,
                            }))
                          }
                          onBlur={() =>
                            updateTimer(timer.id, (current) => ({
                              ...current,
                              name: getTimerName(current),
                            }))
                          }
                          fullWidth
                        />

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
                      </Stack>

                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.25}
                        alignItems={{ xs: "stretch", sm: "center" }}
                      >
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
                              remainingSeconds: durationSeconds,
                              running: false,
                              targetEndAt: undefined,
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
                              <InputAdornment position="end">
                                min
                              </InputAdornment>
                            ),
                          }}
                          sx={{ width: { sm: 150 } }}
                        />

                        <Box
                          sx={{
                            flex: 1,
                            minHeight: 56,
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 1,
                            px: 1.5,
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Switch
                                checked={timer.overtimeEnabled}
                                onChange={(event) =>
                                  updateTimer(timer.id, (current) => ({
                                    ...current,
                                    overtimeEnabled: event.target.checked,
                                  }))
                                }
                              />
                            }
                            label="Overtime"
                            sx={{
                              m: 0,
                              width: "100%",
                              justifyContent: "space-between",
                            }}
                          />
                        </Box>
                      </Stack>
                    </Stack>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1}
                    >
                      <Button
                        fullWidth
                        variant={timer.running ? "outlined" : "contained"}
                        startIcon={
                          timer.running ? <PauseIcon /> : <PlayArrowIcon />
                        }
                        onClick={() =>
                          updateTimer(timer.id, (current) =>
                            current.running
                              ? pauseTimer(current)
                              : startTimer(current)
                          )
                        }
                      >
                        {timer.running ? "Pause" : "Start"}
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<RestartAltIcon />}
                        onClick={() =>
                          updateTimer(timer.id, (current) =>
                            resetTimer(current)
                          )
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

        {fullscreenDisplayOpen ? (
          <Box
            ref={fullscreenDisplayRef}
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: (theme) => theme.zIndex.modal + 4,
              minHeight: "100dvh",
              bgcolor: "#020617",
              color: "#f8fafc",
              p: { xs: 1.25, sm: 2 },
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1.25, sm: 2 },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
              sx={{ flexShrink: 0 }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 22, sm: 28 },
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                Timer Display
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CloseFullscreenIcon />}
                onClick={closeFullscreenDisplay}
                sx={{ fontWeight: 900 }}
              >
                Exit
              </Button>
            </Stack>

            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                display: "grid",
                gridTemplateColumns: getFullscreenGridColumns(
                  displayedTimers.length
                ),
                gap: { xs: 1.25, sm: 2 },
              }}
            >
              {displayedTimers.map((timer) => {
                const tcg = getTcg(timer.tcg);
                const isOvertime = timer.displayedSeconds < 0;
                const showRoundOver =
                  isOvertime && !(timer.overtimeEnabled ?? true);

                return (
                  <Box
                    key={timer.id}
                    sx={{
                      minHeight: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: 2,
                      p: { xs: 1.5, sm: 2.5, md: 3 },
                      bgcolor: isOvertime ? "#7f1d1d" : "#111827",
                      border: "3px solid",
                      borderColor: isOvertime ? "#fca5a5" : "#334155",
                      boxShadow: "0 24px 70px rgba(0, 0, 0, 0.35)",
                      overflow: "hidden",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={{ xs: 1.25, sm: 2 }}
                      alignItems="center"
                      sx={{ minWidth: 0 }}
                    >
                      <Box
                        sx={{
                          ...getFullscreenLogoSize(displayedTimers.length),
                          minWidth: getFullscreenLogoSize(
                            displayedTimers.length
                          ).width,
                          display: "grid",
                          placeItems: "center",
                          borderRadius: 2,
                          bgcolor: tcg.background,
                          overflow: "hidden",
                          p: 0.75,
                        }}
                      >
                        <Box
                          component="img"
                          src={tcg.logoImage}
                          alt={`${tcg.name} logo`}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontSize: getFullscreenTitleFontSize(
                              displayedTimers.length
                            ),
                            fontWeight: 900,
                            lineHeight: 1.05,
                            overflowWrap: "anywhere",
                          }}
                        >
                          {getTimerName(timer)}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#cbd5e1",
                            mt: 0.5,
                            fontSize: getFullscreenGameFontSize(
                              displayedTimers.length
                            ),
                            fontWeight: 800,
                            lineHeight: 1.05,
                          }}
                        >
                          {tcg.name}
                        </Typography>
                      </Box>
                    </Stack>

                    <Typography
                      textAlign="center"
                      sx={{
                        color: isOvertime ? "#fecaca" : "#f8fafc",
                        fontSize: getFullscreenTimeFontSize(
                          displayedTimers.length,
                          showRoundOver
                        ),
                        fontWeight: 900,
                        lineHeight: 0.95,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {showRoundOver
                        ? "Round Over"
                        : formatTime(timer.displayedSeconds)}
                    </Typography>

                    <Chip
                      label={
                        showRoundOver
                          ? "Round Over"
                          : isOvertime
                            ? "Overtime"
                            : timer.running
                              ? "Running"
                              : "Paused"
                      }
                      sx={{
                        alignSelf: "center",
                        px: 1.5,
                        bgcolor: isOvertime
                          ? "#fee2e2"
                          : timer.running
                            ? "#bbf7d0"
                            : "#e2e8f0",
                        color: isOvertime
                          ? "#7f1d1d"
                          : timer.running
                            ? "#14532d"
                            : "#0f172a",
                        fontSize: { xs: 16, sm: 20 },
                        fontWeight: 900,
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
        ) : null}
      </Stack>
    </Container>
  );
}
