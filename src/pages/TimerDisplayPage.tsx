import { useEffect, useMemo, useState } from "react";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import {
  formatTime,
  getTcg,
  getTimerName,
  readTimerSnapshot,
  TIMER_STORAGE_KEY,
  type TimerSnapshot,
} from "./timerControllerUtils";

export default function TimerDisplayPage() {
  const [snapshot, setSnapshot] = useState<TimerSnapshot | null>(() =>
    readTimerSnapshot()
  );
  const overtimeEnabled = snapshot?.overtimeEnabled ?? true;

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === TIMER_STORAGE_KEY) {
        setSnapshot(readTimerSnapshot());
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const displayedTimers = useMemo(
    () =>
      snapshot?.timers.map((timer) => ({
        ...timer,
        displayedSeconds: timer.remainingSeconds,
      })) ?? [],
    [snapshot]
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0f172a",
        color: "#f8fafc",
        py: { xs: 2, sm: 4 },
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 32, sm: 48 },
                fontWeight: 900,
                letterSpacing: 0,
              }}
            >
              Timer Display
            </Typography>
            <Chip
              label={`${displayedTimers.length} active timer${
                displayedTimers.length === 1 ? "" : "s"
              }`}
              sx={{
                alignSelf: { xs: "flex-start", sm: "center" },
                bgcolor: "#e2e8f0",
                color: "#0f172a",
                fontWeight: 800,
              }}
            />
          </Stack>

          {displayedTimers.length ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                  lg: "repeat(3, minmax(0, 1fr))",
                },
                gap: { xs: 2, sm: 3 },
              }}
            >
              {displayedTimers.map((timer) => {
                const tcg = getTcg(timer.tcg);
                const isOvertime = timer.displayedSeconds < 0;
                const showRoundOver = isOvertime && !overtimeEnabled;

                return (
                  <Box
                    key={timer.id}
                    sx={{
                      minHeight: { xs: 260, sm: 320 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: 2,
                      p: { xs: 2, sm: 3 },
                      bgcolor: isOvertime ? "#7f1d1d" : "#111827",
                      border: "3px solid",
                      borderColor: isOvertime ? "#fca5a5" : "#334155",
                      boxShadow: "0 24px 70px rgba(0, 0, 0, 0.35)",
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: { xs: 86, sm: 110 },
                          minWidth: { xs: 86, sm: 110 },
                          height: { xs: 64, sm: 78 },
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
                            fontSize: { xs: 24, sm: 34 },
                            fontWeight: 900,
                            lineHeight: 1.05,
                          }}
                        >
                          {getTimerName(timer)}
                        </Typography>
                        <Typography sx={{ color: "#cbd5e1", mt: 0.5 }}>
                          {tcg.name}
                        </Typography>
                      </Box>
                    </Stack>

                    <Typography
                      textAlign="center"
                      sx={{
                        color: isOvertime ? "#fecaca" : "#f8fafc",
                        fontSize: showRoundOver
                          ? { xs: 52, sm: 72, lg: 80 }
                          : { xs: 76, sm: 104, lg: 116 },
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
                        fontSize: 18,
                        fontWeight: 900,
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Box
              sx={{
                minHeight: "55vh",
                display: "grid",
                placeItems: "center",
                border: "2px dashed #475569",
                borderRadius: 2,
                p: 3,
              }}
            >
              <Typography
                textAlign="center"
                sx={{ color: "#cbd5e1", fontSize: { xs: 24, sm: 36 } }}
              >
                Open the timer controller and add timers to show them here.
              </Typography>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
