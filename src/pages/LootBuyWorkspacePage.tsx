import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";

import { useEmployeeAuth } from "../hooks/useEmployeeAuth";
import {
  completeLootBuyPricing,
  fetchLootBuyLogRecord,
  notifyLootBuyCustomerPlaceholder,
  type LootBuyLogRecord,
  updateLootBuyPricingProgress,
} from "./reservationSupabase";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const moneyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});

const toNumber = (value: string | number | null | undefined) =>
  Number(value ?? 0) || 0;

const formatDate = (value: string | null | undefined) =>
  value ? dateFormatter.format(new Date(value)) : "Not set";

const formatMoney = (value: string | number | null | undefined) =>
  moneyFormatter.format(toNumber(value));

const formatNumberInput = (value: string | number | null | undefined) => {
  const numberValue = toNumber(value);
  return numberValue ? String(numberValue) : "";
};

const formatPhone = (value: string | null) => {
  const digits = value?.replace(/\D/g, "").slice(0, 10) ?? "";
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return value || "No phone";
};

type ProgressForm = {
  pricedCardCount: string;
  marketValueTotal: string;
  pricedOfferAmount: string;
  bulkMarketValue: string;
  bulkOfferAmount: string;
  pricingNotes: string;
};

const createProgressForm = (row: LootBuyLogRecord): ProgressForm => ({
  pricedCardCount: String(row.priced_card_count ?? 0),
  marketValueTotal: formatNumberInput(row.appraised_value),
  pricedOfferAmount: formatNumberInput(row.cash_offer),
  bulkMarketValue: formatNumberInput(row.bulk_appraised_value),
  bulkOfferAmount: formatNumberInput(row.bulk_cash_offer),
  pricingNotes: row.pricing_notes || "",
});

export default function LootBuyWorkspacePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useEmployeeAuth();
  const buyId = decodeURIComponent(location.pathname.split("/").at(-1) ?? "");
  const [row, setRow] = useState<LootBuyLogRecord | null>(null);
  const [form, setForm] = useState<ProgressForm | null>(null);
  const [cardSearch, setCardSearch] = useState("");
  const [showTcgPlayer, setShowTcgPlayer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const actorLabel = profile?.display_name || profile?.contact || null;
  const tcgPlayerUrl = useMemo(() => {
    const query = cardSearch.trim() || row?.buy_type || "";
    return `https://www.tcgplayer.com/search/all/product?q=${encodeURIComponent(
      query
    )}`;
  }, [cardSearch, row?.buy_type]);

  const loadBuy = useCallback(async () => {
    if (!buyId || buyId === "WorkInProgress") {
      setError("No buy was selected.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const nextRow = await fetchLootBuyLogRecord(buyId);
      setRow(nextRow);
      setForm(createProgressForm(nextRow));
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Unable to load this buy."
      );
    } finally {
      setLoading(false);
    }
  }, [buyId]);

  useEffect(() => {
    loadBuy();
  }, [loadBuy]);

  const updateForm = <Key extends keyof ProgressForm>(
    key: Key,
    value: ProgressForm[Key]
  ) => {
    setForm((previous) => (previous ? { ...previous, [key]: value } : previous));
  };

  const saveProgress = async () => {
    if (!row || !form) return;

    setSaving(true);
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
        actor_label: actorLabel,
      });
      setMessage("Progress saved.");
      await loadBuy();
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : "Unable to save progress."
      );
    } finally {
      setSaving(false);
    }
  };

  const completePricing = async () => {
    if (!row || !form) return;

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

    setSaving(true);
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
        actor_label: actorLabel,
      });
      setMessage("Pricing complete. This buy is ready for the pickup workflow.");
      await loadBuy();
    } catch (completeError) {
      setError(
        completeError instanceof Error
          ? completeError.message
          : "Unable to complete pricing."
      );
    } finally {
      setSaving(false);
    }
  };

  const notifyCustomer = async () => {
    if (!row) return;

    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      await notifyLootBuyCustomerPlaceholder(row, { actor_label: actorLabel });
      setMessage("Customer marked as notified.");
      await loadBuy();
    } catch (notifyError) {
      setError(
        notifyError instanceof Error
          ? notifyError.message
          : "Unable to mark customer as notified."
      );
    } finally {
      setSaving(false);
    }
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
                  <Typography variant="h1">Current Buy Workspace</Typography>
                  <Typography color="text.secondary">
                    Price the active buy and look up cards while you work.
                  </Typography>
                </Box>
              </Stack>
              <Button
                variant="outlined"
                onClick={() => navigate({ to: "/loot-tracker/WorkInProgress" })}
              >
                Back to work list
              </Button>
            </Stack>
          </Paper>

          {error ? <Alert severity="error">{error}</Alert> : null}
          {message ? <Alert severity="success">{message}</Alert> : null}

          {loading || !row || !form ? (
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <CircularProgress size={24} />
                <Typography>Loading buy workspace...</Typography>
              </Stack>
            </Paper>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 0.9fr) minmax(520px, 1.1fr)" },
                gap: 2,
                alignItems: "start",
              }}
            >
              <Stack spacing={2}>
                <Paper sx={{ p: { xs: 2, md: 2.5 } }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Chip label={row.is_in_progress ? "In progress" : "Not in progress"} color={row.is_in_progress ? "primary" : "default"} />
                      {row.pricing_completed_at ? (
                        <Chip label="Pricing complete" color="success" />
                      ) : null}
                      <Chip label={row.contact_status.replace(/_/g, " ")} variant="outlined" />
                    </Stack>
                    <Box>
                      <Typography variant="h2">{row.customer_name}</Typography>
                      <Typography color="text.secondary">
                        {formatPhone(row.customer_phone)}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        gap: 1.5,
                      }}
                    >
                      <Box>
                        <Typography color="text.secondary" fontSize={12} fontWeight={800}>
                          ID Number
                        </Typography>
                        <Typography>{row.customer_id_number || "Not provided"}</Typography>
                      </Box>
                      <Box>
                        <Typography color="text.secondary" fontSize={12} fontWeight={800}>
                          Submitted
                        </Typography>
                        <Typography>{formatDate(row.transaction_date)}</Typography>
                      </Box>
                      <Box>
                        <Typography color="text.secondary" fontSize={12} fontWeight={800}>
                          Buy Type
                        </Typography>
                        <Typography>{row.buy_type}</Typography>
                      </Box>
                      <Box>
                        <Typography color="text.secondary" fontSize={12} fontWeight={800}>
                          Current Offer
                        </Typography>
                        <Typography>{formatMoney(row.total_cash_offer)}</Typography>
                      </Box>
                    </Box>
                    {row.notes ? (
                      <>
                        <Divider />
                        <Box>
                          <Typography color="text.secondary" fontSize={12} fontWeight={800}>
                            Intake Notes
                          </Typography>
                          <Typography sx={{ whiteSpace: "pre-wrap" }}>{row.notes}</Typography>
                        </Box>
                      </>
                    ) : null}
                  </Stack>
                </Paper>

                <Paper sx={{ p: { xs: 2, md: 2.5 } }}>
                  <Stack spacing={2}>
                    <Typography variant="h2">Pricing Progress</Typography>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        gap: 2,
                      }}
                    >
                      <TextField
                        label="Cards priced"
                        type="number"
                        value={form.pricedCardCount}
                        onChange={(event) =>
                          updateForm("pricedCardCount", event.target.value)
                        }
                        fullWidth
                      />
                      <TextField
                        label="Market value total"
                        type="number"
                        value={form.marketValueTotal}
                        onChange={(event) =>
                          updateForm("marketValueTotal", event.target.value)
                        }
                        fullWidth
                      />
                      <TextField
                        label="Priced offer amount"
                        type="number"
                        value={form.pricedOfferAmount}
                        onChange={(event) =>
                          updateForm("pricedOfferAmount", event.target.value)
                        }
                        fullWidth
                      />
                      <TextField
                        label="Bulk market value"
                        type="number"
                        value={form.bulkMarketValue}
                        onChange={(event) =>
                          updateForm("bulkMarketValue", event.target.value)
                        }
                        fullWidth
                      />
                      <TextField
                        label="Bulk offer amount"
                        type="number"
                        value={form.bulkOfferAmount}
                        onChange={(event) =>
                          updateForm("bulkOfferAmount", event.target.value)
                        }
                        fullWidth
                      />
                    </Box>
                    <TextField
                      label="Pricing notes"
                      value={form.pricingNotes}
                      onChange={(event) => updateForm("pricingNotes", event.target.value)}
                      multiline
                      minRows={3}
                      fullWidth
                    />
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                      <Button
                        variant="outlined"
                        startIcon={<SaveIcon />}
                        onClick={saveProgress}
                        disabled={saving}
                      >
                        Save Progress
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<CheckCircleIcon />}
                        onClick={completePricing}
                        disabled={saving}
                      >
                        Mark Pricing Complete
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<NotificationsActiveIcon />}
                        onClick={notifyCustomer}
                        disabled={saving}
                      >
                        Mark Customer Notified
                      </Button>
                    </Stack>
                  </Stack>
                </Paper>
              </Stack>

              <Paper sx={{ p: { xs: 2, md: 2.5 } }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h2">TCGplayer Lookup</Typography>
                    <Typography color="text.secondary">
                      Search TCGplayer from this workspace. Some marketplace pages
                      may block embedded viewing, so keep the new-tab button available.
                    </Typography>
                  </Box>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                    <TextField
                      label="Card search"
                      value={cardSearch}
                      onChange={(event) => setCardSearch(event.target.value)}
                      placeholder="Card name, set, number..."
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      startIcon={<SearchIcon />}
                      onClick={() => setShowTcgPlayer(true)}
                    >
                      Search
                    </Button>
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                    <Button
                      component="a"
                      href={tcgPlayerUrl}
                      target="_blank"
                      rel="noreferrer"
                      variant="outlined"
                      startIcon={<OpenInNewIcon />}
                    >
                      Open TCGplayer Search
                    </Button>
                    {showTcgPlayer ? (
                      <Button variant="text" onClick={() => setShowTcgPlayer(false)}>
                        Hide embedded view
                      </Button>
                    ) : null}
                  </Stack>
                  {showTcgPlayer ? (
                    <Box
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        height: { xs: 520, lg: 720 },
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        component="iframe"
                        src={tcgPlayerUrl}
                        title="TCGplayer search"
                        sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
                        sx={{
                          border: 0,
                          height: "100%",
                          width: "100%",
                        }}
                      />
                    </Box>
                  ) : (
                    <Paper variant="outlined" sx={{ p: 3, textAlign: "center" }}>
                      <SearchIcon color="primary" sx={{ fontSize: 38, mb: 1 }} />
                      <Typography fontWeight={800}>Search when ready.</Typography>
                      <Typography color="text.secondary">
                        Enter a card name and choose Search to try the embedded view,
                        or open the search in a new tab.
                      </Typography>
                    </Paper>
                  )}
                </Stack>
              </Paper>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
