import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
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

import { useEmployeeAuth } from "../hooks/useEmployeeAuth";
import {
  createLootBuyEntry,
  fetchActiveLootBuyCategories,
  type LootBuyCategoryRecord,
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
  const { profile } = useEmployeeAuth();
  const [categories, setCategories] = useState<LootBuyCategoryRecord[]>([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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
    setMessage(null);

    const notes = [
      form.notes.trim(),
      form.cardCount.trim() ? `Estimated card count: ${form.cardCount.trim()}` : "",
      `Customer type: ${form.customerType}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await createLootBuyEntry({
        customer_name: form.customerName,
        customer_phone: phoneDigits,
        customer_id_number: form.customerIdNumber || null,
        date: today(),
        buy_type: form.buyType,
        staff_profile_id: profile?.staff_profile_id || null,
        notes,
      });
      setForm({
        ...initialForm,
        buyType: buyTypeOptions[0] || "",
      });
      setMessage("Buy entry created and added to the queue.");
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : "Unable to create buy entry."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 } }}>
        <Stack spacing={3}>
          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <AddCircleIcon color="primary" sx={{ fontSize: 36 }} />
              <Box>
                <Typography variant="h1">New Buy Entry</Typography>
                <Typography color="text.secondary">
                  Capture the customer details and what they are selling, then add
                  the buy to the pricing queue.
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
                <Typography>Loading buy options...</Typography>
              </Stack>
            </Paper>
          ) : (
            <Paper sx={{ p: { xs: 2, md: 3 } }}>
              <Stack spacing={2.5}>
                <FormControl>
                  <FormLabel>Customer flow</FormLabel>
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
                      label="Existing customer"
                    />
                    <FormControlLabel
                      value="new"
                      control={<Radio />}
                      label="New customer"
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
                    label="Customer name"
                    value={form.customerName}
                    onChange={(event) =>
                      updateForm("customerName", event.target.value)
                    }
                    required
                    fullWidth
                  />
                  <TextField
                    label="Phone number"
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
                    label="ID number"
                    value={form.customerIdNumber}
                    onChange={(event) =>
                      updateForm("customerIdNumber", event.target.value)
                    }
                    helperText="Optional for now."
                    fullWidth
                  />
                  <TextField
                    select
                    label="What are they selling?"
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
                    label="Estimated card count"
                    type="number"
                    value={form.cardCount}
                    onChange={(event) => updateForm("cardCount", event.target.value)}
                    fullWidth
                  />
                </Box>

                <TextField
                  label="Notes"
                  value={form.notes}
                  onChange={(event) => updateForm("notes", event.target.value)}
                  multiline
                  minRows={4}
                  fullWidth
                />

                <Stack direction="row" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSubmit}
                    disabled={!canSave || saving}
                  >
                    {saving ? "Creating..." : "Create Buy Entry"}
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
