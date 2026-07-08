import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { useEmployeeAuth } from "../hooks/useEmployeeAuth";
import {
  fetchLootBuyLog,
  type LootBuyLogRecord,
  updateLootBuyTransactionWithEvent,
} from "./reservationSupabase";

type BuyLogSort = "oldest" | "newest" | "pickup_ready";
type BuyLogSectionId =
  | "in_progress"
  | "needs_pricing"
  | "ready_for_pickup"
  | "awaiting_customer"
  | "completed"
  | "declined";

const sortOptions: Array<{ value: BuyLogSort; label: string }> = [
  { value: "oldest", label: "Oldest first" },
  { value: "newest", label: "Newest first" },
];

const sections: Array<{
  id: BuyLogSectionId;
  title: string;
  description: string;
}> = [
  {
    id: "in_progress",
    title: "In Progress",
    description: "Buys still being entered or reviewed at intake.",
  },
  {
    id: "needs_pricing",
    title: "Needs Pricing",
    description: "Submitted buys that still need supervisor pricing.",
  },
  {
    id: "awaiting_customer",
    title: "Awaiting Customer",
    description: "Priced buys waiting on contact, pickup, or customer decision.",
  },
  {
    id: "ready_for_pickup",
    title: "Ready for Pickup",
    description: "Buys where cash is ready or the customer has been notified.",
  },
  {
    id: "completed",
    title: "Completed",
    description: "Accepted buys that have been picked up or completed.",
  },
  {
    id: "declined",
    title: "Declined",
    description: "Buys the customer declined.",
  },
];

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

const cleanPhone = (value: string) => value.replace(/\D/g, "").slice(0, 10);

const getRowTime = (row: LootBuyLogRecord) =>
  new Date(row.transaction_date || row.submitted_at).getTime();

const isPickupReady = (row: LootBuyLogRecord) =>
  row.cash_ready || row.contact_status === "contacted_awaiting_pickup";

const isPriced = (row: LootBuyLogRecord) =>
  toNumber(row.total_appraised_value) > 0 || Boolean(row.pricing_completed_at);

const getSectionId = (row: LootBuyLogRecord): BuyLogSectionId => {
  if (row.customer_decision === "declined") return "declined";
  if (row.contact_status === "picked_up") return "completed";
  if (isPickupReady(row)) return "ready_for_pickup";
  if (isPriced(row)) return "awaiting_customer";
  if (row.is_in_progress) return "in_progress";

  return "needs_pricing";
};

const getContactLabel = (status: LootBuyLogRecord["contact_status"]) => {
  switch (status) {
    case "contacted_awaiting_pickup":
      return "Awaiting pickup";
    case "no_answer":
      return "No answer";
    case "picked_up":
      return "Picked up";
    case "not_contacted":
    default:
      return "Not contacted";
  }
};

const getDecisionLabel = (decision: LootBuyLogRecord["customer_decision"]) => {
  if (decision === "accepted") return "Accepted";
  if (decision === "declined") return "Declined";
  return "Pending";
};

const sortRows = (rows: LootBuyLogRecord[], sort: BuyLogSort) =>
  [...rows].sort((left, right) => {
    const leftTime = getRowTime(left);
    const rightTime = getRowTime(right);

    if (sort === "newest") return rightTime - leftTime;

    if (sort === "pickup_ready") {
      const readyDelta = Number(isPickupReady(right)) - Number(isPickupReady(left));
      if (readyDelta !== 0) return readyDelta;
    }

    return leftTime - rightTime;
  });

type BuyEditForm = {
  customer_name: string;
  customer_phone: string;
  transaction_date: string;
  buy_type: string;
  appraised_value: string;
  cash_offer: string;
  bulk_appraised_value: string;
  bulk_cash_offer: string;
  notes: string;
  is_in_progress: boolean;
  cash_ready: boolean;
  contact_status: LootBuyLogRecord["contact_status"];
  customer_decision: LootBuyLogRecord["customer_decision"] | "";
  edit_reason: string;
};

type ChangeSummaryItem = {
  field: string;
  before: string;
  after: string;
};

const createEditForm = (row: LootBuyLogRecord): BuyEditForm => ({
  customer_name: row.customer_name || "",
  customer_phone: cleanPhone(row.customer_phone || ""),
  transaction_date: row.transaction_date || new Date().toISOString().slice(0, 10),
  buy_type: row.buy_type || "",
  appraised_value: String(toNumber(row.appraised_value)),
  cash_offer: String(toNumber(row.cash_offer)),
  bulk_appraised_value: String(toNumber(row.bulk_appraised_value)),
  bulk_cash_offer: String(toNumber(row.bulk_cash_offer)),
  notes: row.notes || "",
  is_in_progress: row.is_in_progress,
  cash_ready: row.cash_ready,
  contact_status: row.contact_status,
  customer_decision: row.customer_decision || "",
  edit_reason: "",
});

const normalizeFormForCompare = (form: BuyEditForm) => ({
  ...form,
  customer_name: form.customer_name.trim(),
  customer_phone: form.customer_phone.replace(/\D/g, ""),
  buy_type: form.buy_type.trim(),
  appraised_value: String(toNumber(form.appraised_value)),
  cash_offer: String(toNumber(form.cash_offer)),
  bulk_appraised_value: String(toNumber(form.bulk_appraised_value)),
  bulk_cash_offer: String(toNumber(form.bulk_cash_offer)),
  notes: form.notes.trim(),
  edit_reason: form.edit_reason.trim(),
});

const areFormsEqual = (left: BuyEditForm, right: BuyEditForm) =>
  JSON.stringify(normalizeFormForCompare(left)) ===
  JSON.stringify(normalizeFormForCompare(right));

const getChangeSummary = (
  original: LootBuyLogRecord,
  form: BuyEditForm
): ChangeSummaryItem[] => {
  const originalForm = createEditForm(original);
  const normalizedOriginal = normalizeFormForCompare(originalForm);
  const normalizedForm = normalizeFormForCompare(form);
  const changes: ChangeSummaryItem[] = [];

  const addTextChange = (key: keyof BuyEditForm, field: string) => {
    if (key === "edit_reason") return;
    if (normalizedOriginal[key] === normalizedForm[key]) return;

    changes.push({
      field,
      before:
        key === "customer_phone"
          ? formatPhone(String(originalForm[key] || ""))
          : String(originalForm[key] || "Blank"),
      after:
        key === "customer_phone"
          ? formatPhone(String(form[key] || ""))
          : String(form[key] || "Blank"),
    });
  };

  addTextChange("customer_name", "Customer name");
  addTextChange("customer_phone", "Phone");
  addTextChange("transaction_date", "Transaction date");
  addTextChange("buy_type", "What the buy is");

  if (normalizedOriginal.appraised_value !== normalizedForm.appraised_value) {
    changes.push({
      field: "Market value total",
      before: formatMoney(originalForm.appraised_value),
      after: formatMoney(form.appraised_value),
    });
  }

  if (normalizedOriginal.cash_offer !== normalizedForm.cash_offer) {
    changes.push({
      field: "Priced offer amount",
      before: formatMoney(originalForm.cash_offer),
      after: formatMoney(form.cash_offer),
    });
  }

  if (
    normalizedOriginal.bulk_appraised_value !==
    normalizedForm.bulk_appraised_value
  ) {
    changes.push({
      field: "Bulk market value",
      before: formatMoney(originalForm.bulk_appraised_value),
      after: formatMoney(form.bulk_appraised_value),
    });
  }

  if (normalizedOriginal.bulk_cash_offer !== normalizedForm.bulk_cash_offer) {
    changes.push({
      field: "Bulk offer amount",
      before: formatMoney(originalForm.bulk_cash_offer),
      after: formatMoney(form.bulk_cash_offer),
    });
  }

  addTextChange("notes", "Notes");

  if (originalForm.is_in_progress !== form.is_in_progress) {
    changes.push({
      field: "In progress",
      before: originalForm.is_in_progress ? "Yes" : "No",
      after: form.is_in_progress ? "Yes" : "No",
    });
  }

  if (originalForm.cash_ready !== form.cash_ready) {
    changes.push({
      field: "Cash ready",
      before: originalForm.cash_ready ? "Yes" : "No",
      after: form.cash_ready ? "Yes" : "No",
    });
  }

  if (originalForm.contact_status !== form.contact_status) {
    changes.push({
      field: "Contact status",
      before: getContactLabel(originalForm.contact_status),
      after: getContactLabel(form.contact_status),
    });
  }

  if (originalForm.customer_decision !== form.customer_decision) {
    changes.push({
      field: "Customer decision",
      before: getDecisionLabel(original.customer_decision),
      after: getDecisionLabel(form.customer_decision || null),
    });
  }

  return changes;
};

export default function LootBuyLogPage() {
  const { profile } = useEmployeeAuth();
  const [rows, setRows] = useState<LootBuyLogRecord[]>([]);
  const [sectionSorts, setSectionSorts] = useState<Record<BuyLogSectionId, BuyLogSort>>({
    in_progress: "oldest",
    needs_pricing: "oldest",
    ready_for_pickup: "oldest",
    awaiting_customer: "oldest",
    completed: "newest",
    declined: "newest",
  });
  const [expandedSections, setExpandedSections] = useState<
    Record<BuyLogSectionId, boolean>
  >({
    in_progress: true,
    needs_pricing: true,
    ready_for_pickup: false,
    awaiting_customer: false,
    completed: false,
    declined: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editRow, setEditRow] = useState<LootBuyLogRecord | null>(null);
  const isCardSupervisorView = profile?.role === "card_supervisor";
  const rowsBySection = useMemo(() => {
    const grouped = new Map<BuyLogSectionId, LootBuyLogRecord[]>(
      sections.map((section) => [section.id, []])
    );

    rows.forEach((row) => {
      grouped.get(getSectionId(row))?.push(row);
    });

    return grouped;
  }, [rows]);

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
          : "Unable to load the buy log."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialRows = async () => {
      setLoading(true);
      setError(null);

      try {
        const nextRows = await fetchLootBuyLog();
        if (isMounted) setRows(nextRows);
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load the buy log."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadInitialRows();

    return () => {
      isMounted = false;
    };
  }, []);

  const openEditDialog = (row: LootBuyLogRecord) => {
    setEditRow(row);
  };

  const closeEditDialog = () => {
    setEditRow(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 4 } }}>
        <Stack spacing={3}>
          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems={{ xs: "stretch", md: "center" }}
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <ListAltIcon color="primary" sx={{ fontSize: 36 }} />
                <Box>
                  <Typography variant="h1">Buy Log</Typography>
                  <Typography color="text.secondary">
                    Review customer buys and prioritize the next pickup.
                  </Typography>
                </Box>
              </Stack>

              <Chip label={`${rows.length} buys`} color="primary" variant="outlined" />
            </Stack>
          </Paper>

          {error ? <Alert severity="error">{error}</Alert> : null}

          <Stack spacing={1.5}>
            {loading ? (
              <Paper>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 3 }}>
                <CircularProgress size={24} />
                <Typography>Loading buy log...</Typography>
                </Stack>
              </Paper>
            ) : rows.length === 0 ? (
              <Paper sx={{ p: 3 }}>
                <Typography fontWeight={800}>No buys found.</Typography>
                <Typography color="text.secondary">
                  New buy entries will show here once they are submitted.
                </Typography>
              </Paper>
            ) : (
              sections.map((section) => {
                const sectionRows = sortRows(
                  rowsBySection.get(section.id) ?? [],
                  sectionSorts[section.id]
                );

                return (
                  <Accordion
                    key={section.id}
                    expanded={expandedSections[section.id]}
                    onChange={(_, expanded) =>
                      setExpandedSections((previous) => ({
                        ...previous,
                        [section.id]: expanded,
                      }))
                    }
                    disableGutters
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      "&:before": { display: "none" },
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={1.5}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        justifyContent="space-between"
                        sx={{ width: "100%", pr: 2 }}
                      >
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography fontWeight={900}>{section.title}</Typography>
                            <Chip
                              label={sectionRows.length}
                              size="small"
                              sx={
                                expandedSections[section.id] ||
                                sectionRows.length === 0
                                  ? undefined
                                  : {
                                      bgcolor: "primary.main",
                                      color: "#fff",
                                      fontWeight: 800,
                                    }
                              }
                            />
                          </Stack>
                          <Typography variant="body2" color="text.secondary">
                            {section.description}
                          </Typography>
                        </Box>

                        <TextField
                          select
                          label="Sort"
                          size="small"
                          value={sectionSorts[section.id]}
                          onClick={(event) => event.stopPropagation()}
                          onFocus={(event) => event.stopPropagation()}
                          onChange={(event) =>
                            setSectionSorts((previous) => ({
                              ...previous,
                              [section.id]: event.target.value as BuyLogSort,
                            }))
                          }
                          sx={{ minWidth: 180 }}
                        >
                          {sortOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                      {sectionRows.length === 0 ? (
                        <Box sx={{ px: 3, py: 2, borderTop: "1px solid #e5e7eb" }}>
                          <Typography color="text.secondary">
                            No buys in this status.
                          </Typography>
                        </Box>
                      ) : (
                        <TableContainer>
                          <Table sx={{ minWidth: isCardSupervisorView ? 760 : 1120 }}>
                            <TableHead>
                              <TableRow>
                                <TableCell>Customer</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Buy</TableCell>
                                <TableCell align="right">Priced Value</TableCell>
                                {!isCardSupervisorView ? (
                                  <>
                                    <TableCell align="right">Cash Offer</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Decision</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Notes</TableCell>
                                  </>
                                ) : null}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {sectionRows.map((row) => (
                                <TableRow
                                  key={row.id}
                                  hover
                                  onClick={() => openEditDialog(row)}
                                  sx={{
                                    cursor: "pointer",
                                    "&:focus-visible": {
                                      outline: "2px solid",
                                      outlineColor: "primary.main",
                                      outlineOffset: -2,
                                    },
                                  }}
                                  tabIndex={0}
                                  onKeyDown={(event) => {
                                    if (
                                      event.key === "Enter" ||
                                      event.key === " "
                                    ) {
                                      event.preventDefault();
                                      openEditDialog(row);
                                    }
                                  }}
                                >
                                  <TableCell>
                                    <Typography fontWeight={800}>
                                      {row.customer_name || "Unknown customer"}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>{formatPhone(row.customer_phone)}</TableCell>
                                  <TableCell>
                                    <Stack spacing={0.5}>
                                      <Typography>
                                        {row.buy_type || "Unspecified"}
                                      </Typography>
                                      {row.bulk_appraised_value ||
                                      row.bulk_cash_offer ? (
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          Includes bulk cards
                                        </Typography>
                                      ) : null}
                                    </Stack>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Typography fontWeight={800}>
                                      {formatMoney(row.total_appraised_value)}
                                    </Typography>
                                  </TableCell>

                                  {!isCardSupervisorView ? (
                                    <>
                                      <TableCell align="right">
                                        {formatMoney(row.total_cash_offer)}
                                      </TableCell>
                                      <TableCell>
                                        <Stack
                                          direction="row"
                                          spacing={0.75}
                                          flexWrap="wrap"
                                        >
                                          {isPickupReady(row) ? (
                                            <Chip
                                              label="Pickup ready"
                                              color="success"
                                              size="small"
                                            />
                                          ) : null}
                                          <Chip
                                            label={getContactLabel(row.contact_status)}
                                            size="small"
                                            variant="outlined"
                                          />
                                        </Stack>
                                      </TableCell>
                                      <TableCell>
                                        <Chip
                                          label={getDecisionLabel(
                                            row.customer_decision
                                          )}
                                          size="small"
                                          color={
                                            row.customer_decision === "accepted"
                                              ? "success"
                                              : row.customer_decision === "declined"
                                                ? "error"
                                                : "default"
                                          }
                                          variant={
                                            row.customer_decision
                                              ? "filled"
                                              : "outlined"
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        {formatDate(row.transaction_date)}
                                      </TableCell>
                                      <TableCell sx={{ maxWidth: 260 }}>
                                        <Typography
                                          variant="body2"
                                          color={
                                            row.notes
                                              ? "text.primary"
                                              : "text.secondary"
                                          }
                                          sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          {row.notes || "No notes"}
                                        </Typography>
                                      </TableCell>
                                    </>
                                  ) : null}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </AccordionDetails>
                  </Accordion>
                );
              })
            )}
          </Stack>
        </Stack>
      </Container>

      <BuyEditDialog
        row={editRow}
        actorLabel={profile?.display_name || profile?.contact || null}
        onClose={closeEditDialog}
        onSaved={async () => {
          closeEditDialog();
          await loadRows();
        }}
      />
    </Box>
  );
}

function BuyEditDialog({
  row,
  actorLabel,
  onClose,
  onSaved,
}: {
  row: LootBuyLogRecord | null;
  actorLabel: string | null;
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [editForm, setEditForm] = useState<BuyEditForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [discardConfirmOpen, setDiscardConfirmOpen] = useState(false);
  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false);
  const editChangeSummary = useMemo(
    () => (row && editForm ? getChangeSummary(row, editForm) : []),
    [editForm, row]
  );
  const isEditDirty = useMemo(() => {
    if (!row || !editForm) return false;

    return !areFormsEqual(createEditForm(row), editForm);
  }, [editForm, row]);

  useEffect(() => {
    if (!row) {
      setEditForm(null);
      setSaveError(null);
      setDiscardConfirmOpen(false);
      setSaveConfirmOpen(false);
      setSaving(false);
      return;
    }

    setEditForm(createEditForm(row));
    setSaveError(null);
    setDiscardConfirmOpen(false);
    setSaveConfirmOpen(false);
    setSaving(false);
  }, [row]);

  const closeImmediately = () => {
    setEditForm(null);
    setSaveError(null);
    setDiscardConfirmOpen(false);
    setSaveConfirmOpen(false);
    onClose();
  };

  const requestClose = () => {
    if (saving) return;

    if (isEditDirty) {
      setDiscardConfirmOpen(true);
      return;
    }

    closeImmediately();
  };

  const updateEditForm = <Key extends keyof BuyEditForm>(
    key: Key,
    value: BuyEditForm[Key]
  ) => {
    setEditForm((previous) =>
      previous ? { ...previous, [key]: value } : previous
    );
  };

  const requestSaveEdit = () => {
    if (!row || !editForm) return;

    if (!editForm.edit_reason.trim()) {
      setSaveError("Enter a reason for editing this buy.");
      return;
    }

    if (editChangeSummary.length === 0) {
      setSaveError("Make at least one change before saving this buy.");
      return;
    }

    setSaveError(null);
    setSaveConfirmOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!row || !editForm) return;

    setSaving(true);
    setSaveError(null);

    try {
      await updateLootBuyTransactionWithEvent(row, {
        customer_name: editForm.customer_name,
        customer_phone: editForm.customer_phone || null,
        transaction_date: editForm.transaction_date,
        buy_type: editForm.buy_type,
        appraised_value: toNumber(editForm.appraised_value),
        cash_offer: toNumber(editForm.cash_offer),
        bulk_appraised_value: toNumber(editForm.bulk_appraised_value),
        bulk_cash_offer: toNumber(editForm.bulk_cash_offer),
        notes: editForm.notes || null,
        is_in_progress: editForm.is_in_progress,
        cash_ready: editForm.cash_ready,
        contact_status: editForm.contact_status,
        customer_decision: editForm.customer_decision || null,
        edit_reason: editForm.edit_reason,
        actor_label: actorLabel,
      });
      setSaveConfirmOpen(false);
      await onSaved();
    } catch (saveFailure) {
      setSaveError(
        saveFailure instanceof Error
          ? saveFailure.message
          : "Unable to save the buy edit."
      );
      setSaveConfirmOpen(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Dialog fullScreen open={Boolean(row && editForm)} onClose={requestClose}>
        <AppBar sx={{ position: "sticky", top: 0, zIndex: 1 }}>
          <Toolbar>
            <Button
              color="inherit"
              startIcon={<CloseIcon />}
              onClick={requestClose}
              disabled={saving}
            >
              Close
            </Button>
            <Box sx={{ flex: 1, minWidth: 0, px: 2 }}>
              <Typography variant="h6" component="div" noWrap>
                Work Buy
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                {row?.customer_name || "Customer buy"}
              </Typography>
            </Box>
            <Button
              color="inherit"
              startIcon={<SaveIcon />}
              onClick={requestSaveEdit}
              disabled={saving || !editForm?.edit_reason.trim()}
            >
              {saving ? "Saving..." : "Save Edit"}
            </Button>
          </Toolbar>
        </AppBar>

        {editForm ? (
          <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 } }}>
            <Stack spacing={3}>
              <Paper sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h1">Edit Buy Transaction</Typography>
                    <Typography color="text.secondary">
                      Edits should only be made to correct a mistake. A reason is
                      required and will be saved to the activity log.
                    </Typography>
                  </Box>

                  {saveError ? <Alert severity="error">{saveError}</Alert> : null}

                  <TextField
                    label="Reason for editing"
                    value={editForm.edit_reason}
                    onChange={(event) =>
                      updateEditForm("edit_reason", event.target.value)
                    }
                    required
                    multiline
                    minRows={2}
                    helperText="Example: Corrected customer phone number entered during intake."
                    fullWidth
                  />
                </Stack>
              </Paper>

              <Paper sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={2}>
                  <Typography variant="h2">Customer</Typography>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      label="Customer name"
                      value={editForm.customer_name}
                      onChange={(event) =>
                        updateEditForm("customer_name", event.target.value)
                      }
                      fullWidth
                    />
                    <TextField
                      label="Phone"
                      value={formatPhone(editForm.customer_phone)}
                      onChange={(event) =>
                        updateEditForm("customer_phone", cleanPhone(event.target.value))
                      }
                      fullWidth
                    />
                  </Stack>
                </Stack>
              </Paper>

              <Paper sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={2}>
                  <Typography variant="h2">Buy Details</Typography>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      label="Transaction date"
                      type="date"
                      value={editForm.transaction_date}
                      onChange={(event) =>
                        updateEditForm("transaction_date", event.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                    <TextField
                      label="What the buy is"
                      value={editForm.buy_type}
                      onChange={(event) =>
                        updateEditForm("buy_type", event.target.value)
                      }
                      fullWidth
                    />
                  </Stack>

                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      label="Market value total"
                      type="number"
                      value={editForm.appraised_value}
                      onChange={(event) =>
                        updateEditForm("appraised_value", event.target.value)
                      }
                      fullWidth
                    />
                    <TextField
                      label="Priced offer amount"
                      type="number"
                      value={editForm.cash_offer}
                      onChange={(event) =>
                        updateEditForm("cash_offer", event.target.value)
                      }
                      fullWidth
                    />
                  </Stack>

                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      label="Bulk market value"
                      type="number"
                      value={editForm.bulk_appraised_value}
                      onChange={(event) =>
                        updateEditForm("bulk_appraised_value", event.target.value)
                      }
                      fullWidth
                    />
                    <TextField
                      label="Bulk offer amount"
                      type="number"
                      value={editForm.bulk_cash_offer}
                      onChange={(event) =>
                        updateEditForm("bulk_cash_offer", event.target.value)
                      }
                      fullWidth
                    />
                  </Stack>

                  <TextField
                    label="Notes"
                    value={editForm.notes}
                    onChange={(event) => updateEditForm("notes", event.target.value)}
                    multiline
                    minRows={3}
                    fullWidth
                  />
                </Stack>
              </Paper>

              <Paper sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={2}>
                  <Typography variant="h2">Status</Typography>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      select
                      label="Contact status"
                      value={editForm.contact_status}
                      onChange={(event) =>
                        updateEditForm(
                          "contact_status",
                          event.target
                            .value as LootBuyLogRecord["contact_status"]
                        )
                      }
                      fullWidth
                    >
                      <MenuItem value="not_contacted">Not contacted</MenuItem>
                      <MenuItem value="contacted_awaiting_pickup">
                        Contacted, awaiting pickup
                      </MenuItem>
                      <MenuItem value="no_answer">No answer</MenuItem>
                      <MenuItem value="picked_up">Picked up</MenuItem>
                    </TextField>

                    <TextField
                      select
                      label="Customer decision"
                      value={editForm.customer_decision}
                      onChange={(event) =>
                        updateEditForm(
                          "customer_decision",
                          event.target.value as BuyEditForm["customer_decision"]
                        )
                      }
                      fullWidth
                    >
                      <MenuItem value="">Pending</MenuItem>
                      <MenuItem value="accepted">Accepted</MenuItem>
                      <MenuItem value="declined">Declined</MenuItem>
                    </TextField>
                  </Stack>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={editForm.is_in_progress}
                          onChange={(event) =>
                            updateEditForm("is_in_progress", event.target.checked)
                          }
                        />
                      }
                      label="In progress"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={editForm.cash_ready}
                          onChange={(event) =>
                            updateEditForm("cash_ready", event.target.checked)
                          }
                        />
                      }
                      label="Cash ready"
                    />
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </Container>
        ) : null}
      </Dialog>

      <Dialog
        open={discardConfirmOpen}
        onClose={() => setDiscardConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Discard changes?</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            This buy has unsaved edits. Closing now will discard those changes.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDiscardConfirmOpen(false)}>Keep Editing</Button>
          <Button color="error" variant="contained" onClick={closeImmediately}>
            Discard Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={saveConfirmOpen}
        onClose={() => {
          if (!saving) setSaveConfirmOpen(false);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Confirm buy edit</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Alert severity="warning">
              This will edit the buy transaction and write an audit event with
              the reason below.
            </Alert>

            <Box>
              <Typography fontWeight={800}>Reason</Typography>
              <Typography color="text.secondary">
                {editForm?.edit_reason.trim()}
              </Typography>
            </Box>

            <Box>
              <Typography fontWeight={800} sx={{ mb: 1 }}>
                Changes
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Field</TableCell>
                      <TableCell>Before</TableCell>
                      <TableCell>After</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {editChangeSummary.map((change) => (
                      <TableRow key={change.field}>
                        <TableCell sx={{ fontWeight: 800 }}>
                          {change.field}
                        </TableCell>
                        <TableCell>{change.before}</TableCell>
                        <TableCell>{change.after}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveConfirmOpen(false)} disabled={saving}>
            Keep Editing
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveEdit}
            disabled={saving}
            startIcon={<SaveIcon />}
          >
            {saving ? "Saving..." : "Confirm and Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
