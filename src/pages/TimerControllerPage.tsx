import { useCallback, useEffect, useMemo, useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TimerIcon from "@mui/icons-material/Timer";
import {
  formatTime,
  getTcg,
  getTimerName,
  readTimerSnapshot,
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
  const elapsedSeconds = applyElapsedTime
    ? Math.max(0, Math.floor((Date.now() - snapshotUpdatedAt) / 1000))
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

    return {
      id,
      name: getTimerName({ id, name: timer.name }),
      tcg: isTcgKey(timer.tcg) ? timer.tcg : "magic",
      durationSeconds,
      remainingSeconds: timer.running
        ? remainingSeconds - elapsedSeconds
        : remainingSeconds,
      running: Boolean(timer.running),
      overtimeEnabled: timer.overtimeEnabled ?? snapshot.overtimeEnabled ?? true,
    };
  });
};

const parseDurationInput = (value: string) => {
  if (value === "") return "";
  return String(Number(value));
};

export default function TimerControllerPage() {
  const [timers, setTimers] = useState<TimerItem[]>(() =>
    normalizeSavedTimers(readTimerSnapshot(), true)
  );

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

  useEffect(() => {
    window.localStorage.setItem(
      TIMER_STORAGE_KEY,
      JSON.stringify({
        timers,
        updatedAt: Date.now(),
      } satisfies TimerSnapshot)
    );
  }, [timers]);

  const openDisplayWindow = () => {
    window.open(
      `${window.location.origin}/timer-display`,
      "geekd-timer-display",
      "popup=yes,width=1200,height=760"
    );
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
                  startIcon={<OpenInNewIcon />}
                  onClick={openDisplayWindow}
                >
                  Pop Out Display
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
          {timers.map((timer) => {
            const tcg = getTcg(timer.tcg);
            const isOvertime = timer.remainingSeconds < 0;
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
                        : formatTime(timer.remainingSeconds)}
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
