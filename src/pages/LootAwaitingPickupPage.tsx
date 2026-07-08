import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import PaymentsIcon from "@mui/icons-material/Payments";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import { useEmployeeAuth } from "../hooks/useEmployeeAuth";
import {
  fetchLootBuyLog,
  type LootBuyLogRecord,
  updateLootPickupWorkflow,
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

const formatPhone = (value: string | null) => {
  const digits = value?.replace(/\D/g, "").slice(0, 10) ?? "";
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return value || "No phone";
};

const isPriced = (row: LootBuyLogRecord) =>
  toNumber(row.total_appraised_value) > 0 || Boolean(row.pricing_completed_at);

function SummaryCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof LocalShippingIcon;
}) {
  return (
    <Paper sx={{ p: 2.5 }}>
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
        <Box>
          <Typography variant="h2">{value}</Typography>
          <Typography color="text.secondary" fontSize={12} fontWeight={800}>
            {label}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

function TransactionCard({
  row,
  actionLoading,
  onMarkCashReady,
  onContacted,
  onNoAnswer,
  onDeclined,
  onPickedUp,
}: {
  row: LootBuyLogRecord;
  actionLoading: boolean;
  onMarkCashReady: () => void;
  onContacted: () => void;
  onNoAnswer: () => void;
  onDeclined: () => void;
  onPickedUp: () => void;
}) {
  return (
    <Paper sx={{ p: 2, border: "1px solid", borderColor: "divider" }}>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={2}
        justifyContent="space-between"
      >
        <Box sx={{ minWidth: 0 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
            <Typography fontWeight={900}>{row.customer_name}</Typography>
            {row.contact_status === "no_answer" ? (
              <Chip label="No answer" color="warning" size="small" />
            ) : null}
            {row.contact_status === "contacted_awaiting_pickup" ? (
              <Chip label="Awaiting pickup" color="success" size="small" />
            ) : null}
          </Stack>
          <Stack
            direction="row"
            spacing={1.5}
            flexWrap="wrap"
            sx={{ mt: 0.75, color: "text.secondary" }}
          >
            <Typography variant="body2">{formatPhone(row.customer_phone)}</Typography>
            <Typography variant="body2">{row.buy_type}</Typography>
            <Typography variant="body2">{formatDate(row.transaction_date)}</Typography>
            <Typography variant="body2">
              Value: {formatMoney(row.total_appraised_value)}
            </Typography>
            <Typography variant="body2">
              Offer: {formatMoney(row.total_cash_offer)}
            </Typography>
          </Stack>
          {row.notes ? (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
              {row.notes}
            </Typography>
          ) : null}
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="flex-end">
          {!row.cash_ready ? (
            <Button
              variant="contained"
              startIcon={<PaymentsIcon />}
              onClick={onMarkCashReady}
              disabled={actionLoading}
            >
              Cash Ready
            </Button>
          ) : null}

          {row.cash_ready &&
          (row.contact_status === "not_contacted" ||
            row.contact_status === "no_answer") ? (
            <>
              <Button
                variant="outlined"
                startIcon={<PhoneIcon />}
                onClick={onContacted}
                disabled={actionLoading}
              >
                Contacted
              </Button>
              <Button
                variant="outlined"
                color="warning"
                startIcon={<PhoneMissedIcon />}
                onClick={onNoAnswer}
                disabled={actionLoading}
              >
                No Answer
              </Button>
            </>
          ) : null}

          {row.contact_status === "contacted_awaiting_pickup" ? (
            <>
              <Button variant="outlined" color="error" onClick={onDeclined} disabled={actionLoading}>
                Customer Declined
              </Button>
              <Button
                variant="contained"
                startIcon={<AssignmentTurnedInIcon />}
                onClick={onPickedUp}
                disabled={actionLoading}
              >
                Picked Up
              </Button>
            </>
          ) : null}
        </Stack>
      </Stack>
    </Paper>
  );
}

export default function LootAwaitingPickupPage() {
  const { profile } = useEmployeeAuth();
  const [rows, setRows] = useState<LootBuyLogRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const actorLabel = profile?.display_name || profile?.contact || null;

  const loadRows = async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await fetchLootBuyLog());
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load awaiting pickup."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRows();
  }, []);

  const pendingRows = useMemo(
    () =>
      rows.filter(
        (row) =>
          isPriced(row) &&
          row.contact_status !== "picked_up" &&
          row.customer_decision !== "accepted" &&
          row.customer_decision !== "declined"
      ),
    [rows]
  );
  const needsCash = pendingRows.filter((row) => !row.cash_ready);
  const needsContact = pendingRows.filter(
    (row) =>
      row.cash_ready &&
      (row.contact_status === "not_contacted" ||
        row.contact_status === "no_answer")
  );
  const awaitingPickup = pendingRows.filter(
    (row) => row.cash_ready && row.contact_status === "contacted_awaiting_pickup"
  );

  const runAction = async (
    row: LootBuyLogRecord,
    update: Parameters<typeof updateLootPickupWorkflow>[1],
    action: string,
    description: string
  ) => {
    setUpdatingId(row.id);
    setError(null);
    try {
      await updateLootPickupWorkflow(row, update, {
        action,
        description,
        actor_label: actorLabel,
      });
      await loadRows();
    } catch (actionError) {
      setError(
        actionError instanceof Error
          ? actionError.message
          : "Unable to update this buy."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const renderSection = (title: string, sectionRows: LootBuyLogRecord[]) => (
    <Stack spacing={1.5}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h2">{title}</Typography>
        <Chip label={sectionRows.length} size="small" />
      </Stack>
      {sectionRows.length ? (
        <Stack spacing={1.5}>
          {sectionRows.map((row) => (
            <TransactionCard
              key={row.id}
              row={row}
              actionLoading={updatingId === row.id}
              onMarkCashReady={() =>
                runAction(
                  row,
                  { cash_ready: true },
                  "cash_ready",
                  `Cash ready for ${row.customer_name}`
                )
              }
              onContacted={() =>
                runAction(
                  row,
                  { contact_status: "contacted_awaiting_pickup" },
                  "customer_contacted",
                  `${row.customer_name} was contacted and is awaiting pickup`
                )
              }
              onNoAnswer={() =>
                runAction(
                  row,
                  { contact_status: "no_answer" },
                  "customer_no_answer",
                  `No answer from ${row.customer_name}`
                )
              }
              onDeclined={() =>
                runAction(
                  row,
                  {
                    customer_decision: "declined",
                    contact_status: "contacted_awaiting_pickup",
                  },
                  "offer_declined",
                  `${row.customer_name} declined the offer`
                )
              }
              onPickedUp={() =>
                runAction(
                  row,
                  {
                    customer_decision: "accepted",
                    contact_status: "picked_up",
                  },
                  "pickup_completed",
                  `${row.customer_name} picked up their payment`
                )
              }
            />
          ))}
        </Stack>
      ) : (
        <Paper sx={{ p: 2 }}>
          <Typography color="text.secondary">No buys in this section.</Typography>
        </Paper>
      )}
    </Stack>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 4 } }}>
        <Stack spacing={3}>
          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <LocalShippingIcon color="primary" sx={{ fontSize: 36 }} />
              <Box>
                <Typography variant="h1">Awaiting Pickup</Typography>
                <Typography color="text.secondary">
                  Track priced buys that need cash, customer contact, or pickup.
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {error ? <Alert severity="error">{error}</Alert> : null}

          {loading ? (
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <CircularProgress size={24} />
                <Typography>Loading awaiting pickup...</Typography>
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
                <SummaryCard label="Needs Cash" value={needsCash.length} icon={PaymentsIcon} />
                <SummaryCard label="Needs Contact" value={needsContact.length} icon={PhoneIcon} />
                <SummaryCard label="Awaiting Pickup" value={awaitingPickup.length} icon={LocalShippingIcon} />
                <SummaryCard label="Total Pending" value={pendingRows.length} icon={CheckCircleIcon} />
              </Box>

              {pendingRows.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: "center" }}>
                  <CheckCircleIcon color="success" sx={{ fontSize: 42, mb: 1 }} />
                  <Typography fontWeight={800}>All clear.</Typography>
                  <Typography color="text.secondary">
                    No buys are currently awaiting pickup.
                  </Typography>
                </Paper>
              ) : (
                <Stack spacing={3}>
                  {renderSection("Needs Cash", needsCash)}
                  {renderSection("Needs Contact", needsContact)}
                  {renderSection("Contacted, Awaiting Pickup", awaitingPickup)}
                </Stack>
              )}
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
