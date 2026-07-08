import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  InputAdornment,
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
import GroupsIcon from "@mui/icons-material/Groups";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { useEmployeeAuth } from "../hooks/useEmployeeAuth";
import {
  fetchLootCustomerSummary,
  type LootCustomerSummaryRecord,
  updateLootCustomerWithEvent,
} from "./reservationSupabase";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const formatPhone = (value: string | null) => {
  const digits = value?.replace(/\D/g, "").slice(0, 10) ?? "";

  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return value || "No phone";
};

const cleanPhone = (value: string) => value.replace(/\D/g, "").slice(0, 10);

const formatDate = (value: string | null) =>
  value ? dateFormatter.format(new Date(value)) : "No buys yet";

const normalizeSearch = (value: string) =>
  value.toLowerCase().replace(/\D/g, "");

const matchesSearch = (customer: LootCustomerSummaryRecord, search: string) => {
  const trimmedSearch = search.trim().toLowerCase();
  const phoneSearch = normalizeSearch(search);

  if (!trimmedSearch) return true;

  const name = customer.name.toLowerCase();
  const phone = customer.phone?.replace(/\D/g, "") ?? "";

  return (
    name.includes(trimmedSearch) ||
    Boolean(phoneSearch && phone.includes(phoneSearch))
  );
};

type CustomerEditForm = {
  name: string;
  phone: string;
  government_id_number: string;
  notes: string;
};

type ChangeSummaryItem = {
  field: string;
  before: string;
  after: string;
};

const createEditForm = (customer: LootCustomerSummaryRecord): CustomerEditForm => ({
  name: customer.name,
  phone: cleanPhone(customer.phone || ""),
  government_id_number: customer.government_id_number || "",
  notes: customer.notes || "",
});

const normalizeFormForCompare = (form: CustomerEditForm) => ({
  ...form,
  name: form.name.trim(),
  phone: cleanPhone(form.phone),
  government_id_number: form.government_id_number.trim(),
  notes: form.notes.trim(),
});

const areFormsEqual = (left: CustomerEditForm, right: CustomerEditForm) =>
  JSON.stringify(normalizeFormForCompare(left)) ===
  JSON.stringify(normalizeFormForCompare(right));

const getChangeSummary = (
  original: LootCustomerSummaryRecord,
  form: CustomerEditForm
): ChangeSummaryItem[] => {
  const originalForm = createEditForm(original);
  const normalizedOriginal = normalizeFormForCompare(originalForm);
  const normalizedForm = normalizeFormForCompare(form);
  const changes: ChangeSummaryItem[] = [];

  const addChange = (
    key: keyof CustomerEditForm,
    field: string,
    formatValue: (value: string) => string = (value) => value || "Blank"
  ) => {
    if (normalizedOriginal[key] === normalizedForm[key]) return;

    changes.push({
      field,
      before: formatValue(originalForm[key]),
      after: formatValue(form[key]),
    });
  };

  addChange("name", "Customer name");
  addChange("phone", "Phone", (value) => formatPhone(value));
  addChange("government_id_number", "ID number");
  addChange("notes", "Notes");

  return changes;
};

export default function LootCustomersPage() {
  const { profile } = useEmployeeAuth();
  const [customers, setCustomers] = useState<LootCustomerSummaryRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editCustomer, setEditCustomer] =
    useState<LootCustomerSummaryRecord | null>(null);
  const filteredCustomers = useMemo(
    () => customers.filter((customer) => matchesSearch(customer, search)),
    [customers, search]
  );
  const totalBuys = useMemo(
    () =>
      customers.reduce(
        (total, customer) => total + Number(customer.buy_count ?? 0),
        0
      ),
    [customers]
  );
  const openBuys = useMemo(
    () =>
      customers.reduce(
        (total, customer) => total + Number(customer.open_buy_count ?? 0),
        0
      ),
    [customers]
  );

  const loadCustomers = async () => {
    setLoading(true);
    setError(null);

    try {
      const rows = await fetchLootCustomerSummary();
      setCustomers(rows);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load customers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 4 } }}>
        <Stack spacing={3}>
          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={2.5}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", md: "center" }}
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <GroupsIcon color="primary" sx={{ fontSize: 36 }} />
                  <Box>
                    <Typography variant="h1">Customers</Typography>
                    <Typography color="text.secondary">
                      Search customers by name or phone number.
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip
                    label={`${customers.length} customers`}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip label={`${totalBuys} total buys`} variant="outlined" />
                  <Chip label={`${openBuys} open buys`} variant="outlined" />
                </Stack>
              </Stack>

              <TextField
                label="Quick search"
                placeholder="Search by customer name or phone"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Stack>
          </Paper>

          {error ? <Alert severity="error">{error}</Alert> : null}

          <Paper sx={{ overflow: "hidden" }}>
            {loading ? (
              <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 3 }}>
                <CircularProgress size={24} />
                <Typography>Loading customers...</Typography>
              </Stack>
            ) : filteredCustomers.length === 0 ? (
              <Box sx={{ p: 3 }}>
                <Typography fontWeight={800}>No customers found.</Typography>
                <Typography color="text.secondary">
                  Try a different name or phone number.
                </Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table sx={{ minWidth: 860 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell align="right">Total Buys</TableCell>
                      <TableCell align="right">Open Buys</TableCell>
                      <TableCell>Latest Buy</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow
                        key={customer.id}
                        hover
                        onClick={() => setEditCustomer(customer)}
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
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setEditCustomer(customer);
                          }
                        }}
                      >
                        <TableCell>
                          <Typography fontWeight={800}>{customer.name}</Typography>
                        </TableCell>
                        <TableCell>{formatPhone(customer.phone)}</TableCell>
                        <TableCell align="right">
                          <Typography fontWeight={800}>
                            {customer.buy_count}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={customer.open_buy_count}
                            size="small"
                            color={customer.open_buy_count ? "success" : "default"}
                            variant={
                              customer.open_buy_count ? "filled" : "outlined"
                            }
                          />
                        </TableCell>
                        <TableCell>{formatDate(customer.latest_buy_date)}</TableCell>
                        <TableCell sx={{ maxWidth: 320 }}>
                          <Typography
                            variant="body2"
                            color={customer.notes ? "text.primary" : "text.secondary"}
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {customer.notes || "No notes"}
                          </Typography>
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
      <CustomerEditDialog
        customer={editCustomer}
        actorLabel={profile?.display_name || profile?.contact || null}
        onClose={() => setEditCustomer(null)}
        onSaved={async () => {
          setEditCustomer(null);
          await loadCustomers();
        }}
      />
    </Box>
  );
}

function CustomerEditDialog({
  customer,
  actorLabel,
  onClose,
  onSaved,
}: {
  customer: LootCustomerSummaryRecord | null;
  actorLabel: string | null;
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [editForm, setEditForm] = useState<CustomerEditForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [discardConfirmOpen, setDiscardConfirmOpen] = useState(false);
  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false);
  const editChangeSummary = useMemo(
    () => (customer && editForm ? getChangeSummary(customer, editForm) : []),
    [customer, editForm]
  );
  const isEditDirty = useMemo(() => {
    if (!customer || !editForm) return false;

    return !areFormsEqual(createEditForm(customer), editForm);
  }, [customer, editForm]);

  useEffect(() => {
    if (!customer) {
      setEditForm(null);
      setSaving(false);
      setSaveError(null);
      setDiscardConfirmOpen(false);
      setSaveConfirmOpen(false);
      return;
    }

    setEditForm(createEditForm(customer));
    setSaving(false);
    setSaveError(null);
    setDiscardConfirmOpen(false);
    setSaveConfirmOpen(false);
  }, [customer]);

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

  const updateEditForm = <Key extends keyof CustomerEditForm>(
    key: Key,
    value: CustomerEditForm[Key]
  ) => {
    setEditForm((previous) =>
      previous ? { ...previous, [key]: value } : previous
    );
  };

  const requestSaveEdit = () => {
    if (!customer || !editForm) return;

    if (editChangeSummary.length === 0) {
      setSaveError("Make at least one change before saving this customer.");
      return;
    }

    setSaveError(null);
    setSaveConfirmOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!customer || !editForm) return;

    setSaving(true);
    setSaveError(null);

    try {
      await updateLootCustomerWithEvent(customer, {
        name: editForm.name,
        phone: editForm.phone || null,
        government_id_number: editForm.government_id_number || null,
        notes: editForm.notes || null,
        actor_label: actorLabel,
      });
      setSaveConfirmOpen(false);
      await onSaved();
    } catch (saveFailure) {
      setSaveError(
        saveFailure instanceof Error
          ? saveFailure.message
          : "Unable to save the customer edit."
      );
      setSaveConfirmOpen(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={Boolean(customer && editForm)}
        onClose={requestClose}
        PaperProps={{
          sx: {
            width: { xs: "100vw", sm: 520, md: 640 },
            maxWidth: "100vw",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#f4f6f8",
          }}
        >
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              bgcolor: "primary.main",
              color: "#fff",
              px: 2,
              py: 1.5,
              borderBottom: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Button
                color="inherit"
                startIcon={<CloseIcon />}
                onClick={requestClose}
                disabled={saving}
                sx={{ flex: "0 0 auto" }}
              >
                Close
              </Button>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography fontWeight={900} noWrap>
                  Edit Customer
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                  noWrap
                >
                  {customer?.name || "Customer"}
                </Typography>
              </Box>
              <Button
                color="inherit"
                startIcon={<SaveIcon />}
                onClick={requestSaveEdit}
                disabled={saving}
                sx={{ flex: "0 0 auto" }}
              >
                {saving ? "Saving..." : "Save"}
              </Button>
            </Stack>
          </Box>

          {editForm ? (
            <Box sx={{ flex: 1, overflowY: "auto", p: { xs: 2, md: 3 } }}>
              <Stack spacing={2.5}>
                <Paper sx={{ p: { xs: 2, md: 2.5 } }}>
                  <Stack spacing={1}>
                    <Typography variant="h1">Edit Customer</Typography>
                    <Typography color="text.secondary">
                      Customer edits are saved with a before/after history.
                    </Typography>
                    {saveError ? <Alert severity="error">{saveError}</Alert> : null}
                  </Stack>
                </Paper>

                <Paper sx={{ p: { xs: 2, md: 2.5 } }}>
                  <Stack spacing={2}>
                    <Typography variant="h2">Customer Details</Typography>
                    <TextField
                      label="Customer name"
                      value={editForm.name}
                      onChange={(event) =>
                        updateEditForm("name", event.target.value)
                      }
                      required
                      fullWidth
                    />
                    <TextField
                      label="Phone"
                      value={formatPhone(editForm.phone)}
                      onChange={(event) =>
                        updateEditForm("phone", cleanPhone(event.target.value))
                      }
                      fullWidth
                    />
                    <TextField
                      label="ID number"
                      value={editForm.government_id_number}
                      onChange={(event) =>
                        updateEditForm("government_id_number", event.target.value)
                      }
                      fullWidth
                    />
                    <TextField
                      label="Notes"
                      value={editForm.notes}
                      onChange={(event) => updateEditForm("notes", event.target.value)}
                      multiline
                      minRows={5}
                      fullWidth
                    />
                  </Stack>
                </Paper>
              </Stack>
            </Box>
          ) : null}
        </Box>
      </Drawer>

      <Dialog
        open={discardConfirmOpen}
        onClose={() => setDiscardConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Discard changes?</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            This customer has unsaved edits. Closing now will discard those
            changes.
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
        <DialogTitle>Confirm customer edit</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Alert severity="warning">
              This will edit the customer record and write a history event with
              the changes below.
            </Alert>

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
