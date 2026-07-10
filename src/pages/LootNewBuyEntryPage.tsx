import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
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
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useEmployeeAuth } from "../hooks/useEmployeeAuth";
import {
  assignLootBuyForPricing,
  createLootBuyEntry,
  fetchActiveLootBuyCategories,
  fetchLootBuyLogRecord,
  type LootBuyCategoryRecord,
  type LootBuyLogRecord,
} from "./reservationSupabase";

type CustomerType = "existing" | "new";

type BuyEntryForm = {
  customerType: CustomerType;
  customerName: string;
  customerPhone: string;
  customerIdNumber: string;
  buyType: string;
  cardCount: string;
  notes: string;
};

const initialForm: BuyEntryForm = {
  customerType: "existing",
  customerName: "",
  customerPhone: "",
  customerIdNumber: "",
  buyType: "",
  cardCount: "",
  notes: "",
};

const today = () => new Date().toISOString().slice(0, 10);

const normalizePhone = (value: string) => value.replace(/\D/g, "").slice(0, 10);

const formatPhoneInput = (value: string) => {
  const digits = normalizePhone(value);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export default function LootNewBuyEntryPage() {
  const navigate = useNavigate();
  const { profile } = useEmployeeAuth();
  const [categories, setCategories] = useState<LootBuyCategoryRecord[]>([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [startingOnTheSpot, setStartingOnTheSpot] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedBuy, setSubmittedBuy] = useState<LootBuyLogRecord | null>(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const rows = await fetchActiveLootBuyCategories();
        if (!mounted) return;

        setCategories(rows);
        setForm((previous) => ({
          ...previous,
          buyType: previous.buyType || rows[0]?.name || "Sealed Product",
        }));
      } catch (loadError) {
        if (!mounted) return;
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load supported TCGs."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  const buyTypeOptions = useMemo(() => {
    const names = categories.map((category) => category.name);
    return names.includes("Sealed Product") ? names : [...names, "Sealed Product"];
  }, [categories]);

  const phoneDigits = normalizePhone(form.customerPhone);
  const canSave =
    form.customerName.trim().length > 0 &&
    phoneDigits.length === 10 &&
    form.buyType.trim().length > 0;

  const updateForm = <Key extends keyof BuyEntryForm>(
    key: Key,
    value: BuyEntryForm[Key]
  ) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!canSave) return;

    setSaving(true);
    setError(null);

    const notes = [
      form.notes.trim(),
      form.cardCount.trim() ? `Estimated card count: ${form.cardCount.trim()}` : "",
      `Customer type: ${form.customerType}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const created = await createLootBuyEntry({
        customer_name: form.customerName,
        customer_phone: phoneDigits,
        customer_id_number: form.customerIdNumber || null,
        date: today(),
        buy_type: form.buyType,
        staff_profile_id: profile?.staff_profile_id || null,
        notes,
      });
      const createdSummary = await fetchLootBuyLogRecord(created.id);
      setForm({
        ...initialForm,
        buyType: buyTypeOptions[0] || "",
      });
      setSubmittedBuy(createdSummary);
      setSubmitted(true);
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : "Unable to create buy entry."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleStartOnTheSpotBuy = async () => {
    if (!submittedBuy) {
      setError("The submitted buy could not be loaded. Return to the dashboard instead.");
      return;
    }

    setStartingOnTheSpot(true);
    setError(null);

    try {
      await assignLootBuyForPricing(submittedBuy, {
        staff_profile_id: profile?.staff_profile_id || null,
        actor_label: profile?.display_name || profile?.contact || null,
      });
      navigate({ to: `/loot-tracker/WorkInProgress/${submittedBuy.id}` });
    } catch (startError) {
      setError(
        startError instanceof Error
          ? startError.message
          : "Unable to start this buy."
      );
    } finally {
      setStartingOnTheSpot(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Container maxWidth="md" sx={{ py: { xs: 2.5, md: 5 } }}>
        <Stack spacing={3}>
          <Paper sx={{ p: { xs: 2.5, md: 4 } }}>
            <Stack spacing={1.5} alignItems="center" textAlign="center">
              <AddCircleIcon color="primary" sx={{ fontSize: 42 }} />
              <Chip label="Geek'd Buy Intake" color="primary" variant="outlined" />
              <Box>
                <Typography variant="h1">Tell us about your cards</Typography>
                <Typography color="text.secondary" sx={{ maxWidth: 620, mt: 1 }}>
                  Please enter your information so our card supervisor can review
                  the items you want to sell.
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {error ? <Alert severity="error">{error}</Alert> : null}
          {submitted ? (
            <Paper sx={{ p: { xs: 3, md: 5 }, textAlign: "center" }}>
              <Stack spacing={2} alignItems="center">
                <CheckCircleIcon color="success" sx={{ fontSize: 58 }} />
                <Typography variant="h1">You're all set.</Typography>
                <Typography color="text.secondary" sx={{ maxWidth: 560 }}>
                  Please pass the device back to the Geek'd employee. They will
                  confirm your buy entry and let you know the next step.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                  <Button
                    variant="contained"
                    onClick={handleStartOnTheSpotBuy}
                    disabled={startingOnTheSpot || !submittedBuy}
                  >
                    {startingOnTheSpot ? "Starting..." : "Start on-the-spot buy"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate({ to: "/loot-tracker" })}
                  >
                    Return to employee dashboard
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => {
                      setSubmitted(false);
                      setSubmittedBuy(null);
                      setError(null);
                    }}
                  >
                    Start another buy entry
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          ) : null}

          {loading && !submitted ? (
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <CircularProgress size={24} />
                <Typography>Loading buy options...</Typography>
              </Stack>
            </Paper>
          ) : !submitted ? (
            <Paper sx={{ p: { xs: 2, md: 3 } }}>
              <Stack spacing={2.5}>
                <FormControl>
                  <FormLabel>Have you sold cards to Geek'd before?</FormLabel>
                  <RadioGroup
                    row
                    value={form.customerType}
                    onChange={(event) =>
                      updateForm("customerType", event.target.value as CustomerType)
                    }
                  >
                    <FormControlLabel
                      value="existing"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="new"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  <TextField
                    label="Your name"
                    value={form.customerName}
                    onChange={(event) =>
                      updateForm("customerName", event.target.value)
                    }
                    required
                    fullWidth
                  />
                  <TextField
                    label="Your phone number"
                    value={form.customerPhone}
                    onChange={(event) =>
                      updateForm("customerPhone", formatPhoneInput(event.target.value))
                    }
                    placeholder="(407) 555-1234"
                    required
                    error={form.customerPhone.length > 0 && phoneDigits.length !== 10}
                    helperText={
                      form.customerPhone.length > 0 && phoneDigits.length !== 10
                        ? "Enter a 10 digit phone number."
                        : "Stored as digits only."
                    }
                    fullWidth
                  />
                  <TextField
                    label="Driver's license or ID number"
                    value={form.customerIdNumber}
                    onChange={(event) =>
                      updateForm("customerIdNumber", event.target.value)
                    }
                    helperText="A Geek'd employee may verify this before finalizing the buy."
                    fullWidth
                  />
                  <TextField
                    select
                    label="What are you selling?"
                    value={form.buyType}
                    onChange={(event) => updateForm("buyType", event.target.value)}
                    SelectProps={{ native: true }}
                    required
                    fullWidth
                  >
                    {buyTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    label="About how many cards or items?"
                    type="number"
                    value={form.cardCount}
                    onChange={(event) => updateForm("cardCount", event.target.value)}
                    fullWidth
                  />
                </Box>

                <TextField
                  label="Anything else we should know?"
                  value={form.notes}
                  onChange={(event) => updateForm("notes", event.target.value)}
                  multiline
                  minRows={4}
                  fullWidth
                />

                <Stack direction="row" justifyContent="flex-end">
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => setCancelOpen(true)}
                      disabled={saving}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleSubmit}
                      disabled={!canSave || saving}
                    >
                      {saving ? "Submitting..." : "Submit Buy Information"}
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          ) : null}
        </Stack>
      </Container>

      <Dialog
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Cancel buy entry?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will discard the current buy entry. Please pass the device back
            to the Geek&apos;d employee before continuing.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelOpen(false)}>Keep editing</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate({ to: "/loot-tracker" })}
          >
            Cancel and go back
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
