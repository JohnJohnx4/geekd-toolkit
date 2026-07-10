import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory2";
import TodayIcon from "@mui/icons-material/Today";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PercentIcon from "@mui/icons-material/Percent";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

import { useEmployeeAuth } from "../hooks/useEmployeeAuth";
import {
  assignLootBuyForPricing,
  fetchLootBuyLog,
  type LootBuyLogRecord,
} from "./reservationSupabase";

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const toNumber = (value: number | string | null | undefined) =>
  Number(value ?? 0) || 0;

const formatMoney = (value: number | string | null | undefined) =>
  moneyFormatter.format(toNumber(value));

const formatDate = (value: string | null | undefined) =>
  value ? dateFormatter.format(new Date(value)) : "Not set";

const startOfWeek = (date: Date) => {
  const next = new Date(date);
  const day = next.getDay() || 7;
  next.setDate(next.getDate() - day + 1);
  next.setHours(0, 0, 0, 0);
  return next;
};

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const isSameOrAfter = (date: string, threshold: Date) =>
  new Date(`${date}T00:00:00`).getTime() >= threshold.getTime();

const isOpenBuy = (row: LootBuyLogRecord) =>
  row.contact_status !== "picked_up" && row.customer_decision !== "declined";

const isPricingQueueBuy = (row: LootBuyLogRecord) =>
  isOpenBuy(row) &&
  !row.is_in_progress &&
  row.priced_by_staff_ids.length === 0 &&
  toNumber(row.total_appraised_value) === 0;

const getQueueTime = (row: LootBuyLogRecord) =>
  new Date(row.submitted_at || `${row.transaction_date}T00:00:00`).getTime();

function StatCard({
  title,
  value,
  detail,
  icon: Icon,
}: {
  title: string;
  value: string;
  detail: string;
  icon: typeof InventoryIcon;
}) {
  return (
    <Paper sx={{ p: 2.5, height: "100%" }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            bgcolor: "rgba(70, 232, 61, 0.12)",
            color: "secondary.main",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Icon />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography color="text.secondary" fontSize={12} fontWeight={800}>
            {title}
          </Typography>
          <Typography variant="h2">{value}</Typography>
          <Typography color="text.secondary" fontSize={12}>
            {detail}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export default function LootDashboardPage() {
  const navigate = useNavigate();
  const { profile } = useEmployeeAuth();
  const [rows, setRows] = useState<LootBuyLogRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [startingId, setStartingId] = useState<string | null>(null);

  const loadRows = async () => {
    setLoading(true);
    setError(null);

    try {
      const nextRows = await fetchLootBuyLog();
      setRows(nextRows);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load the loot dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRows();
  }, []);

  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekStart = startOfWeek(today);
    const monthStart = startOfMonth(today);
    const accepted = rows.filter((row) => row.customer_decision !== "declined");
    const todayRows = accepted.filter((row) => isSameOrAfter(row.transaction_date, today));
    const weekRows = accepted.filter((row) =>
      isSameOrAfter(row.transaction_date, weekStart)
    );
    const monthRows = accepted.filter((row) =>
      isSameOrAfter(row.transaction_date, monthStart)
    );
    const pricedRows = accepted.filter((row) => toNumber(row.total_appraised_value) > 0);
    const avgPayout = pricedRows.length
      ? pricedRows.reduce(
          (total, row) =>
            total +
            (toNumber(row.total_cash_offer) / toNumber(row.total_appraised_value)) *
              100,
          0
        ) / pricedRows.length
      : 0;

    return {
      todayRows,
      weekRows,
      monthRows,
      todayTotal: todayRows.reduce(
        (total, row) => total + toNumber(row.total_cash_offer),
        0
      ),
      weekTotal: weekRows.reduce(
        (total, row) => total + toNumber(row.total_cash_offer),
        0
      ),
      monthTotal: monthRows.reduce(
        (total, row) => total + toNumber(row.total_cash_offer),
        0
      ),
      avgPayout,
      openRows: rows.filter(isOpenBuy),
      recentRows: [...rows]
        .filter(
          (row) =>
            row.customer_decision === "accepted" ||
            row.customer_decision === "declined" ||
            row.contact_status === "picked_up"
        )
        .sort(
          (left, right) =>
            new Date(right.submitted_at).getTime() -
            new Date(left.submitted_at).getTime()
        )
        .slice(0, 8),
      pricingQueueRows: [...rows]
        .filter(isPricingQueueBuy)
        .sort((left, right) => getQueueTime(left) - getQueueTime(right))
        .slice(0, 8),
    };
  }, [rows]);

  const startBuy = async (row: LootBuyLogRecord) => {
    setStartingId(row.id);
    setError(null);
    setMessage(null);

    try {
      await assignLootBuyForPricing(row, {
        staff_profile_id: profile?.staff_profile_id ?? null,
        actor_label: profile?.display_name || profile?.contact || null,
      });
      setMessage(`${row.customer_name}'s buy has been started.`);
      await loadRows();
      navigate({ to: `/loot-tracker/WorkInProgress/${row.id}` });
    } catch (startError) {
      setError(
        startError instanceof Error
          ? startError.message
          : "Unable to start this buy."
      );
    } finally {
      setStartingId(null);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 4 } }}>
        <Stack spacing={3}>
          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <InventoryIcon color="primary" sx={{ fontSize: 36 }} />
              <Box>
                <Typography variant="h1">Loot Dashboard</Typography>
                <Typography color="text.secondary">
                  Overview of buys, payout totals, and active workflow queues.
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {error ? <Alert severity="error">{error}</Alert> : null}
          {message ? <Alert severity="success">{message}</Alert> : null}

          {loading ? (
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <CircularProgress size={24} />
                <Typography>Loading dashboard...</Typography>
              </Stack>
            </Paper>
          ) : (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    lg: "repeat(4, 1fr)",
                  },
                  gap: 2,
                }}
              >
                <StatCard
                  title="Today's Buys"
                  value={formatMoney(stats.todayTotal)}
                  detail={`${stats.todayRows.length} transactions`}
                  icon={TodayIcon}
                />
                <StatCard
                  title="This Week"
                  value={formatMoney(stats.weekTotal)}
                  detail={`${stats.weekRows.length} transactions`}
                  icon={TrendingUpIcon}
                />
                <StatCard
                  title="This Month"
                  value={formatMoney(stats.monthTotal)}
                  detail={`${stats.monthRows.length} transactions`}
                  icon={CalendarMonthIcon}
                />
                <StatCard
                  title="Avg Payout"
                  value={`${stats.avgPayout.toFixed(1)}%`}
                  detail="Of market value"
                  icon={PercentIcon}
                />
              </Box>

              <Paper sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={2}>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    justifyContent="space-between"
                    alignItems={{ xs: "stretch", md: "center" }}
                  >
                    <Box>
                      <Typography variant="h2">Buy Queue</Typography>
                      <Typography color="text.secondary">
                        Oldest buys that still need pricing work.
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={<PlayArrowIcon />}
                      disabled={!stats.pricingQueueRows.length || Boolean(startingId)}
                      onClick={() => startBuy(stats.pricingQueueRows[0])}
                    >
                      {startingId ? "Starting..." : "Start Next Buy"}
                    </Button>
                  </Stack>

                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Chip
                      label={`${stats.openRows.filter((row) => row.is_in_progress).length} in progress`}
                      variant="outlined"
                    />
                    <Chip
                      label={`${stats.openRows.filter((row) => !row.is_in_progress && toNumber(row.total_appraised_value) === 0).length} needs pricing`}
                      variant="outlined"
                    />
                    <Chip
                      label={`${stats.openRows.filter((row) => row.cash_ready || row.contact_status === "contacted_awaiting_pickup").length} pickup ready`}
                      variant="outlined"
                    />
                  </Stack>

                  <TableContainer component={Paper} variant="outlined">
                    <Table sx={{ minWidth: 820 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Customer</TableCell>
                          <TableCell>Buy</TableCell>
                          <TableCell>Submitted</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stats.pricingQueueRows.length ? (
                          stats.pricingQueueRows.map((row) => (
                            <TableRow key={row.id} hover>
                              <TableCell sx={{ fontWeight: 800 }}>
                                {row.customer_name}
                              </TableCell>
                              <TableCell>{row.buy_type}</TableCell>
                              <TableCell>{formatDate(row.transaction_date)}</TableCell>
                              <TableCell>
                                <Stack direction="row" spacing={1} flexWrap="wrap">
                                  {row.is_in_progress ? (
                                    <Chip label="In progress" size="small" color="primary" />
                                  ) : (
                                    <Chip label="Needs pricing" size="small" variant="outlined" />
                                  )}
                                  {row.priced_by_staff_ids.length ? (
                                    <Chip
                                      icon={<AssignmentIndIcon />}
                                      label="Assigned"
                                      size="small"
                                      variant="outlined"
                                    />
                                  ) : null}
                                </Stack>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4}>
                              <Typography color="text.secondary">
                                No buys are waiting for pricing.
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
              </Paper>

              <Paper sx={{ overflow: "hidden" }}>
                <Box sx={{ p: 2.5 }}>
                  <Typography variant="h2">Recent Completed Activity</Typography>
                  <Typography color="text.secondary">
                    Latest accepted, declined, or picked up buys.
                  </Typography>
                </Box>
                <TableContainer>
                  <Table sx={{ minWidth: 840 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>Buy</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Value</TableCell>
                        <TableCell align="right">Offer</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stats.recentRows.length ? (
                        stats.recentRows.map((row) => (
                          <TableRow key={row.id} hover>
                            <TableCell sx={{ fontWeight: 800 }}>
                              {row.customer_name}
                            </TableCell>
                            <TableCell>{row.buy_type}</TableCell>
                            <TableCell>{formatDate(row.transaction_date)}</TableCell>
                            <TableCell align="right">
                              {formatMoney(row.total_appraised_value)}
                            </TableCell>
                            <TableCell align="right">
                              {formatMoney(row.total_cash_offer)}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={
                                  row.customer_decision === "declined"
                                    ? "Declined"
                                    : row.contact_status === "picked_up"
                                      ? "Picked up"
                                      : "Accepted"
                                }
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <Typography color="text.secondary">
                              No completed activity yet.
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
