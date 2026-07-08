import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  createLootSafeCashEntry,
  deleteLootSafeCashEntry,
  fetchLootSafeCashEntries,
  type LootSafeCashEntryRecord,
} from "./reservationSupabase";

const reasonOptions = ["Buy", "Deposit", "Change", "Bank Deposit", "Other"];

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const toNumber = (value: number | string | null | undefined) =>
  Number(value ?? 0) || 0;

const formatMoney = (value: number | string | null | undefined) =>
  moneyFormatter.format(toNumber(value));

const createLocalDateTime = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
};

const blankForm = {
  entryAt: createLocalDateTime(),
  direction: "in" as LootSafeCashEntryRecord["direction"],
  amount: "",
  reason: "Buy",
  otherReason: "",
  notes: "",
};

function StatCard({
  title,
  value,
  tone,
  icon: Icon,
}: {
  title: string;
  value: string;
  tone: "success" | "error" | "primary";
  icon: typeof AccountBalanceIcon;
}) {
  const color =
    tone === "success" ? "success.main" : tone === "error" ? "error.main" : "primary.main";

  return (
    <Paper sx={{ p: 2.5 }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            bgcolor: `${color}14`,
            color,
            display: "grid",
            placeItems: "center",
          }}
        >
          <Icon />
        </Box>
        <Box>
          <Typography variant="h2">{value}</Typography>
          <Typography color="text.secondary" fontSize={12} fontWeight={800}>
            {title}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export default function LootSafeCashLogPage() {
  const [entries, setEntries] = useState<LootSafeCashEntryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(blankForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      setEntries(await fetchLootSafeCashEntries());
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load safe cash entries."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const totals = useMemo(() => {
    const totalIn = entries
      .filter((entry) => entry.direction === "in")
      .reduce((total, entry) => total + toNumber(entry.amount), 0);
    const totalOut = entries
      .filter((entry) => entry.direction === "out")
      .reduce((total, entry) => total + toNumber(entry.amount), 0);

    return { totalIn, totalOut, net: totalIn - totalOut };
  }, [entries]);

  const finalReason =
    form.reason === "Other" ? form.otherReason.trim() || "Other" : form.reason;
  const canSave =
    form.entryAt &&
    form.direction &&
    toNumber(form.amount) > 0 &&
    finalReason.trim().length > 0;

  const openForm = () => {
    setForm({ ...blankForm, entryAt: createLocalDateTime() });
    setFormOpen(true);
  };

  const handleSave = async () => {
    if (!canSave) return;

    setSaving(true);
    setError(null);
    try {
      await createLootSafeCashEntry({
        entry_at: new Date(form.entryAt).toISOString(),
        direction: form.direction,
        amount: toNumber(form.amount),
        reason: finalReason,
        notes: form.notes,
      });
      setFormOpen(false);
      await loadEntries();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to save safe cash entry."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (entry: LootSafeCashEntryRecord) => {
    setDeletingId(entry.id);
    setError(null);
    try {
      await deleteLootSafeCashEntry(entry.id);
      await loadEntries();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete safe cash entry."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 4 } }}>
        <Stack spacing={3}>
          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ xs: "stretch", sm: "center" }}
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <AccountBalanceIcon color="primary" sx={{ fontSize: 36 }} />
                <Box>
                  <Typography variant="h1">Safe Cash Log</Typography>
                  <Typography color="text.secondary">
                    Track cash movements in and out of the safe.
                  </Typography>
                </Box>
              </Stack>
              <Button variant="contained" startIcon={<AddIcon />} onClick={openForm}>
                New Entry
              </Button>
            </Stack>
          </Paper>

          {error ? <Alert severity="error">{error}</Alert> : null}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            <StatCard
              title="Total Cash In"
              value={formatMoney(totals.totalIn)}
              tone="success"
              icon={TrendingUpIcon}
            />
            <StatCard
              title="Total Cash Out"
              value={formatMoney(totals.totalOut)}
              tone="error"
              icon={TrendingDownIcon}
            />
            <StatCard
              title={totals.net >= 0 ? "Net In" : "Net Out"}
              value={formatMoney(Math.abs(totals.net))}
              tone="primary"
              icon={AccountBalanceIcon}
            />
          </Box>

          <Paper sx={{ overflow: "hidden" }}>
            <Box sx={{ p: 2.5 }}>
              <Typography variant="h2">Log Entries</Typography>
              <Typography color="text.secondary">
                Latest safe cash movements.
              </Typography>
            </Box>
            {loading ? (
              <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 3 }}>
                <CircularProgress size={24} />
                <Typography>Loading safe cash log...</Typography>
              </Stack>
            ) : entries.length === 0 ? (
              <Box sx={{ p: 3 }}>
                <Typography color="text.secondary">No cash entries yet.</Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table
                  size="small"
                  sx={{
                    minWidth: 840,
                    "& th": {
                      py: 1,
                      fontSize: 12,
                      fontWeight: 800,
                      color: "text.secondary",
                      textTransform: "uppercase",
                    },
                    "& td": {
                      py: 1,
                      fontSize: 13,
                    },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Reason</TableCell>
                      <TableCell>Notes</TableCell>
                      <TableCell align="right">Cash In</TableCell>
                      <TableCell align="right">Cash Out</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {entries.map((entry) => (
                      <TableRow key={entry.id} hover>
                        <TableCell>
                          {dateTimeFormatter.format(new Date(entry.entry_at))}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>{entry.reason}</TableCell>
                        <TableCell sx={{ color: entry.notes ? "text.primary" : "text.secondary" }}>
                          {entry.notes || "No notes"}
                        </TableCell>
                        <TableCell align="right" sx={{ color: "success.main", fontWeight: 700 }}>
                          {entry.direction === "in" ? formatMoney(entry.amount) : "-"}
                        </TableCell>
                        <TableCell align="right" sx={{ color: "error.main", fontWeight: 700 }}>
                          {entry.direction === "out" ? formatMoney(entry.amount) : "-"}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            color="error"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(entry)}
                            disabled={deletingId === entry.id}
                            sx={{ fontSize: 12 }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Stack>
      </Container>

      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Safe Cash Entry</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Date and time"
              type="datetime-local"
              value={form.entryAt}
              onChange={(event) =>
                setForm((previous) => ({ ...previous, entryAt: event.target.value }))
              }
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              select
              label="Direction"
              value={form.direction}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  direction: event.target
                    .value as LootSafeCashEntryRecord["direction"],
                }))
              }
              fullWidth
            >
              <MenuItem value="in">Cash In</MenuItem>
              <MenuItem value="out">Cash Out</MenuItem>
            </TextField>
            <TextField
              label="Amount"
              type="number"
              value={form.amount}
              onChange={(event) =>
                setForm((previous) => ({ ...previous, amount: event.target.value }))
              }
              fullWidth
            />
            <TextField
              select
              label="Reason"
              value={form.reason}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  reason: event.target.value,
                  otherReason: "",
                }))
              }
              fullWidth
            >
              {reasonOptions.map((reason) => (
                <MenuItem key={reason} value={reason}>
                  {reason}
                </MenuItem>
              ))}
            </TextField>
            {form.reason === "Other" ? (
              <TextField
                label="Other reason"
                value={form.otherReason}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    otherReason: event.target.value,
                  }))
                }
                fullWidth
              />
            ) : null}
            <TextField
              label="Notes"
              value={form.notes}
              onChange={(event) =>
                setForm((previous) => ({ ...previous, notes: event.target.value }))
              }
              multiline
              minRows={3}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={!canSave || saving}>
            {saving ? "Saving..." : "Save Entry"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
