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
  TextField,
  Typography,
} from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { useEmployeeAuth } from "../hooks/useEmployeeAuth";
import {
  completeLootBuyPricing,
  fetchLootBuyLog,
  notifyLootBuyCustomerPlaceholder,
  type LootBuyLogRecord,
  updateLootBuyPricingProgress,
} from "./reservationSupabase";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const formatDate = (value: string | null | undefined) =>
  value ? dateFormatter.format(new Date(value)) : "Not set";

const formatPhone = (value: string | null) => {
  const digits = value?.replace(/\D/g, "").slice(0, 10) ?? "";
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return value || "No phone";
};

const toNumber = (value: string | number | null | undefined) =>
  Number(value ?? 0) || 0;

const formatNumberInput = (value: string | number | null | undefined) => {
  const numberValue = toNumber(value);
  return numberValue ? String(numberValue) : "";
};

type ProgressForm = {
  pricedCardCount: string;
  marketValueTotal: string;
  pricedOfferAmount: string;
  bulkMarketValue: string;
  bulkOfferAmount: string;
  pricingNotes: string;
};

function ProgressCard({
  row,
  saving,
  onSave,
  onComplete,
  onNotify,
  onOpen,
}: {
  row: LootBuyLogRecord;
  saving: boolean;
  onSave: (row: LootBuyLogRecord, form: ProgressForm) => Promise<void>;
  onComplete: (row: LootBuyLogRecord, form: ProgressForm) => Promise<void>;
  onNotify: (row: LootBuyLogRecord) => Promise<void>;
  onOpen: (row: LootBuyLogRecord) => void;
}) {
  const [form, setForm] = useState<ProgressForm>({
    pricedCardCount: String(row.priced_card_count ?? 0),
    marketValueTotal: formatNumberInput(row.appraised_value),
    pricedOfferAmount: formatNumberInput(row.cash_offer),
    bulkMarketValue: formatNumberInput(row.bulk_appraised_value),
    bulkOfferAmount: formatNumberInput(row.bulk_cash_offer),
    pricingNotes: row.pricing_notes || "",
  });
  const hasPricingTotals =
    toNumber(form.marketValueTotal) > 0 || toNumber(form.bulkMarketValue) > 0;
  const hasOfferTotals =
    toNumber(form.pricedOfferAmount) > 0 || toNumber(form.bulkOfferAmount) > 0;

  return (
    <Paper sx={{ p: { xs: 2, md: 2.5 } }}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.5}
          justifyContent="space-between"
        >
          <Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
              <Typography variant="h2">{row.customer_name}</Typography>
              <Chip label="In progress" color="primary" size="small" />
            </Stack>
            <Typography color="text.secondary">
              {formatPhone(row.customer_phone)} | {row.buy_type} | Submitted{" "}
              {formatDate(row.transaction_date)}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="flex-end">
            <Button
              variant="contained"
              startIcon={<AssignmentIndIcon />}
              onClick={() => onOpen(row)}
              disabled={saving}
            >
              Open Workspace
            </Button>
            <Button
              variant="outlined"
              startIcon={<NotificationsActiveIcon />}
              onClick={() => onNotify(row)}
              disabled={saving}
            >
              Notify Customer
            </Button>
            <Button
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={() => onSave(row, form)}
              disabled={saving}
            >
              Save Progress
            </Button>
            <Button
              variant="contained"
              startIcon={<CheckCircleIcon />}
              onClick={() => onComplete(row, form)}
              disabled={saving}
            >
              {saving ? "Saving..." : "Mark Pricing Complete"}
            </Button>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          <TextField
            label="Cards priced"
            type="number"
            value={form.pricedCardCount}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                pricedCardCount: event.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            label="Market value total"
            type="number"
            value={form.marketValueTotal}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                marketValueTotal: event.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            label="Priced offer amount"
            type="number"
            value={form.pricedOfferAmount}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                pricedOfferAmount: event.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            label="Bulk market value"
            type="number"
            value={form.bulkMarketValue}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                bulkMarketValue: event.target.value,
              }))
            }
            helperText="Optional"
            fullWidth
          />
          <TextField
            label="Bulk offer amount"
            type="number"
            value={form.bulkOfferAmount}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                bulkOfferAmount: event.target.value,
              }))
            }
            helperText="Optional"
            fullWidth
          />
        </Box>

        <Stack spacing={1}>
          <TextField
            label="Pricing notes"
            value={form.pricingNotes}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                pricingNotes: event.target.value,
              }))
            }
            multiline
            minRows={2}
            fullWidth
          />
          {!hasPricingTotals || !hasOfferTotals ? (
            <Typography color="text.secondary" fontSize={12}>
              Enter market value and offer totals before marking pricing complete.
            </Typography>
          ) : null}
        </Stack>
      </Stack>
    </Paper>
  );
}

export default function LootWorkInProgressPage() {
  const navigate = useNavigate();
  const { profile } = useEmployeeAuth();
  const [rows, setRows] = useState<LootBuyLogRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const loadRows = async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await fetchLootBuyLog());
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load work in progress."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRows();
  }, []);

  const assignedRows = useMemo(() => {
    const staffProfileId = profile?.staff_profile_id;
    if (!staffProfileId) return [];

    return rows
      .filter(
        (row) =>
          row.is_in_progress &&
          row.customer_decision !== "declined" &&
          row.contact_status !== "picked_up" &&
          row.priced_by_staff_ids.includes(staffProfileId)
      )
      .sort(
        (left, right) =>
          new Date(left.submitted_at).getTime() -
          new Date(right.submitted_at).getTime()
      );
  }, [profile?.staff_profile_id, rows]);

  const handleSave = async (row: LootBuyLogRecord, form: ProgressForm) => {
    setSavingId(row.id);
    setError(null);
    setMessage(null);

    try {
      await updateLootBuyPricingProgress(row, {
        priced_card_count: Number(form.pricedCardCount) || 0,
        pricing_notes: form.pricingNotes,
        appraised_value: Number(form.marketValueTotal) || 0,
        cash_offer: Number(form.pricedOfferAmount) || 0,
        bulk_appraised_value: Number(form.bulkMarketValue) || 0,
        bulk_cash_offer: Number(form.bulkOfferAmount) || 0,
        actor_label: profile?.display_name || profile?.contact || null,
      });
      setMessage(`Progress saved for ${row.customer_name}.`);
      await loadRows();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to save pricing progress."
      );
    } finally {
      setSavingId(null);
    }
  };

  const handleComplete = async (row: LootBuyLogRecord, form: ProgressForm) => {
    const appraisedValue = Number(form.marketValueTotal) || 0;
    const cashOffer = Number(form.pricedOfferAmount) || 0;
    const bulkAppraisedValue = Number(form.bulkMarketValue) || 0;
    const bulkCashOffer = Number(form.bulkOfferAmount) || 0;

    if (appraisedValue + bulkAppraisedValue <= 0) {
      setError("Enter the market value total before completing pricing.");
      return;
    }

    if (cashOffer + bulkCashOffer <= 0) {
      setError("Enter the offer amount before completing pricing.");
      return;
    }

    setSavingId(row.id);
    setError(null);
    setMessage(null);

    try {
      await completeLootBuyPricing(row, {
        priced_card_count: Number(form.pricedCardCount) || 0,
        pricing_notes: form.pricingNotes,
        appraised_value: appraisedValue,
        cash_offer: cashOffer,
        bulk_appraised_value: bulkAppraisedValue,
        bulk_cash_offer: bulkCashOffer,
        actor_label: profile?.display_name || profile?.contact || null,
      });
      setMessage(`${row.customer_name}'s buy was marked pricing complete.`);
      await loadRows();
    } catch (completeError) {
      setError(
        completeError instanceof Error
          ? completeError.message
          : "Unable to complete pricing."
      );
    } finally {
      setSavingId(null);
    }
  };

  const handleNotify = async (row: LootBuyLogRecord) => {
    setSavingId(row.id);
    setError(null);
    setMessage(null);

    try {
      await notifyLootBuyCustomerPlaceholder(row, {
        actor_label: profile?.display_name || profile?.contact || null,
      });
      setMessage(`${row.customer_name} was marked as notified.`);
      await loadRows();
    } catch (notifyError) {
      setError(
        notifyError instanceof Error
          ? notifyError.message
          : "Unable to mark customer as notified."
      );
    } finally {
      setSavingId(null);
    }
  };

  const openWorkspace = (row: LootBuyLogRecord) => {
    navigate({ to: `/loot-tracker/WorkInProgress/${row.id}` });
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 4 } }}>
        <Stack spacing={3}>
          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: "stretch", md: "center" }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <AssignmentIndIcon color="primary" sx={{ fontSize: 36 }} />
                <Box>
                  <Typography variant="h1">Work In Progress</Typography>
                  <Typography color="text.secondary">
                    Buys assigned to you for pricing.
                  </Typography>
                </Box>
              </Stack>
              <Chip label={`${assignedRows.length} active`} color="primary" />
            </Stack>
          </Paper>

          {error ? <Alert severity="error">{error}</Alert> : null}
          {message ? <Alert severity="success">{message}</Alert> : null}

          {loading ? (
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <CircularProgress size={24} />
                <Typography>Loading work in progress...</Typography>
              </Stack>
            </Paper>
          ) : assignedRows.length ? (
            <Stack spacing={2}>
              {assignedRows.map((row) => (
                <ProgressCard
                  key={row.id}
                  row={row}
                  saving={savingId === row.id}
                  onSave={handleSave}
                  onComplete={handleComplete}
                  onNotify={handleNotify}
                  onOpen={openWorkspace}
                />
              ))}
            </Stack>
          ) : (
            <Paper sx={{ p: 3 }}>
              <Typography fontWeight={800}>No assigned buys right now.</Typography>
              <Typography color="text.secondary">
                Use Start Next Buy from the Loot Dashboard to pull the oldest
                waiting buy into your work queue.
              </Typography>
            </Paper>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
