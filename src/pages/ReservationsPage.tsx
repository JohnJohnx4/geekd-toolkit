import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import InventoryIcon from "@mui/icons-material/Inventory";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";

import {
  createReleaseWithProducts,
  createReservation,
  fetchReleaseProducts,
  fetchReleases,
  fetchReservationProducts,
  fetchReservations,
  isReservationsConfigured,
  reservationsAdminPin,
  type ReleaseProductRecord,
  type ReleaseRecord,
  type ReservationProductRecord,
  type ReservationRecord,
  type ReservationStatus,
  updateRelease,
  updateReservationStatus,
} from "./reservationSupabase";

const ADMIN_SESSION_KEY = "geekd.reservations.adminUnlocked";

const blankReleaseForm = {
  title: "",
  game: "",
  release_date: "",
  description: "",
  image_url: "",
  products: [""] as string[],
};

const blankReservationForm = {
  employee_name: "",
  employee_contact: "",
  notes: "",
  productIds: [] as string[],
};

const statusLabels: Record<ReservationStatus, string> = {
  pending: "Pending",
  set_aside: "Set Aside",
  picked_up: "Picked Up",
  skipped: "Skipped",
  canceled: "Canceled",
};

const formatReleaseDate = (value: string | null) => {
  if (!value) return "Date TBD";

  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatRequestTime = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const getStatusColor = (status: ReservationStatus) => {
  if (status === "pending") return "default";
  if (status === "set_aside") return "primary";
  if (status === "picked_up") return "success";
  if (status === "skipped" || status === "canceled") return "warning";
  return "default";
};

export default function ReservationsPage() {
  const [tab, setTab] = useState(0);
  const [releases, setReleases] = useState<ReleaseRecord[]>([]);
  const [products, setProducts] = useState<ReleaseProductRecord[]>([]);
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);
  const [reservationProducts, setReservationProducts] = useState<
    ReservationProductRecord[]
  >([]);
  const [selectedReleaseId, setSelectedReleaseId] = useState("");
  const [releaseForm, setReleaseForm] = useState(blankReleaseForm);
  const [reservationForms, setReservationForms] = useState<
    Record<string, typeof blankReservationForm>
  >({});
  const [adminPinEntry, setAdminPinEntry] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(
    () => window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true"
  );
  const [loading, setLoading] = useState(false);
  const [savingRelease, setSavingRelease] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const activeReleases = useMemo(
    () => releases.filter((release) => release.is_active),
    [releases]
  );

  const reservationsByRelease = useMemo(() => {
    return reservations.reduce<Record<string, ReservationRecord[]>>(
      (groups, reservation) => {
        groups[reservation.release_id] = [
          ...(groups[reservation.release_id] ?? []),
          reservation,
        ];
        return groups;
      },
      {}
    );
  }, [reservations]);

  const productsByRelease = useMemo(() => {
    return products.reduce<Record<string, ReleaseProductRecord[]>>(
      (groups, product) => {
        if (!product.is_active) return groups;

        groups[product.release_id] = [...(groups[product.release_id] ?? []), product];
        return groups;
      },
      {}
    );
  }, [products]);

  const productsByReservation = useMemo(() => {
    return reservationProducts.reduce<Record<string, ReleaseProductRecord[]>>(
      (groups, reservationProduct) => {
        const product = products.find(
          (item) => item.id === reservationProduct.product_id
        );

        if (!product) return groups;

        groups[reservationProduct.reservation_id] = [
          ...(groups[reservationProduct.reservation_id] ?? []),
          product,
        ];
        return groups;
      },
      {}
    );
  }, [products, reservationProducts]);

  const selectedRelease =
    releases.find((release) => release.id === selectedReleaseId) ??
    releases[0];

  const loadData = useCallback(
    async (includeReservations = adminUnlocked) => {
      if (!isReservationsConfigured) return;

      setLoading(true);
      setError("");

      try {
        const [
          releaseRows,
          productRows,
          reservationRows,
          reservationProductRows,
        ] = await Promise.all([
          fetchReleases(includeReservations),
          fetchReleaseProducts(),
          includeReservations
            ? fetchReservations()
            : Promise.resolve<ReservationRecord[]>([]),
          includeReservations
            ? fetchReservationProducts()
            : Promise.resolve<ReservationProductRecord[]>([]),
        ]);

        setReleases(releaseRows);
        setProducts(productRows);
        setReservations(reservationRows);
        setReservationProducts(reservationProductRows);
        setSelectedReleaseId((current) => current || releaseRows[0]?.id || "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load data.");
      } finally {
        setLoading(false);
      }
    },
    [adminUnlocked]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const unlockAdmin = () => {
    if (!reservationsAdminPin) {
      setError("Set VITE_RESERVATION_ADMIN_PIN before using admin tools.");
      return;
    }

    if (adminPinEntry !== reservationsAdminPin) {
      setError("Admin PIN did not match.");
      return;
    }

    window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    setAdminUnlocked(true);
    setAdminPinEntry("");
    setMessage("Admin tools unlocked.");
    loadData(true);
  };

  const saveRelease = async () => {
    const productNames = releaseForm.products
      .map((product) => product.trim())
      .filter(Boolean);

    if (!releaseForm.title.trim() || !releaseForm.game.trim()) {
      setError("Release name and game are required.");
      return;
    }

    if (!productNames.length) {
      setError("Add at least one product for this release.");
      return;
    }

    setSavingRelease(true);
    setError("");
    setMessage("");

    try {
      await createReleaseWithProducts(
        {
          title: releaseForm.title.trim(),
          game: releaseForm.game.trim(),
          release_date: releaseForm.release_date || null,
          description: releaseForm.description.trim() || null,
          image_url: releaseForm.image_url.trim() || null,
          is_active: true,
        },
        productNames
      );
      setReleaseForm(blankReleaseForm);
      setMessage("Release added.");
      await loadData(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to add release.");
    } finally {
      setSavingRelease(false);
    }
  };

  const submitReservation = async (releaseId: string) => {
    const form = reservationForms[releaseId] ?? blankReservationForm;

    if (!form.employee_name.trim()) {
      setError("Employee name is required.");
      return;
    }

    if (!form.productIds.length) {
      setError("Select at least one product to request.");
      return;
    }

    setError("");
    setMessage("");

    try {
      await createReservation({
        release_id: releaseId,
        employee_name: form.employee_name.trim(),
        employee_contact: form.employee_contact.trim() || null,
        notes: form.notes.trim() || null,
        product_ids: form.productIds,
      });
      setReservationForms((prev) => ({
        ...prev,
        [releaseId]: blankReservationForm,
      }));
      setMessage("Reservation request saved.");
    } catch (err) {
      const details = err instanceof Error ? err.message : "";
      setError(
        details.includes("duplicate")
          ? "That employee already has a request for this release."
          : details || "Unable to save reservation."
      );
    }
  };

  const setReleaseActive = async (release: ReleaseRecord, isActive: boolean) => {
    setError("");
    setMessage("");

    try {
      await updateRelease(release.id, { is_active: isActive });
      setMessage(isActive ? "Release reactivated." : "Release archived.");
      await loadData(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update release.");
    }
  };

  const changeReservationStatus = async (
    reservation: ReservationRecord,
    status: ReservationStatus
  ) => {
    setError("");
    setMessage("");

    try {
      const updated = await updateReservationStatus(reservation.id, status);
      setReservations((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update reservation."
      );
    }
  };

  const updateReservationProduct = (
    releaseId: string,
    productId: string,
    checked: boolean
  ) => {
    const form = reservationForms[releaseId] ?? blankReservationForm;

    setReservationForms((prev) => ({
      ...prev,
      [releaseId]: {
        ...form,
        productIds: checked
          ? [...form.productIds, productId]
          : form.productIds.filter((id) => id !== productId),
      },
    }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      <Stack spacing={2.5}>
        <Paper sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <EventAvailableIcon color="primary" sx={{ fontSize: 36 }} />
              <Box>
                <Typography variant="h1">Employee Reservations</Typography>
                <Typography color="text.secondary">
                  Track employee requests for upcoming releases by request time.
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
              sx={{ justifyContent: { xs: "flex-start", md: "flex-end" } }}
            >
              <Chip label={`${activeReleases.length} active releases`} />
              <Chip
                label={`${reservations.length} reservations`}
                color="primary"
                variant="outlined"
              />
            </Stack>

            {!isReservationsConfigured ? (
              <Alert severity="warning">
                Supabase is not configured. Add VITE_SUPABASE_URL and
                VITE_SUPABASE_PUBLISHABLE_KEY to the app environment.
              </Alert>
            ) : null}

            {message ? <Alert severity="success">{message}</Alert> : null}
            {error ? <Alert severity="error">{error}</Alert> : null}
          </Stack>
        </Paper>

        <Paper sx={{ overflow: "hidden" }}>
          <Tabs
            value={tab}
            onChange={(_, nextTab) => setTab(nextTab)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              px: { md: 1 },
              ".MuiTabs-flexContainer": {
                justifyContent: { md: "center" },
              },
            }}
          >
            <Tab icon={<EventAvailableIcon />} iconPosition="start" label="Reserve" />
            <Tab
              icon={<InventoryIcon />}
              iconPosition="start"
              label="Reservation Queue"
            />
            <Tab
              icon={<AdminPanelSettingsIcon />}
              iconPosition="start"
              label="Manage Releases"
            />
          </Tabs>
        </Paper>

        {tab === 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
                xl: "repeat(3, minmax(0, 1fr))",
              },
              gap: { xs: 2, lg: 2.5 },
              alignItems: "stretch",
            }}
          >
            {activeReleases.map((release) => {
              const form = reservationForms[release.id] ?? blankReservationForm;
              const releaseProducts = productsByRelease[release.id] ?? [];

              return (
                <Card key={release.id} sx={{ height: "100%" }}>
                  <CardContent
                    sx={{
                      height: "100%",
                      p: { xs: 2, lg: 2.5 },
                    }}
                  >
                    <Stack spacing={2} sx={{ height: "100%" }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        {release.image_url ? (
                          <Box
                            component="img"
                            src={release.image_url}
                            alt=""
                            sx={{
                              width: 86,
                              height: 86,
                              objectFit: "cover",
                              borderRadius: 1,
                              bgcolor: "grey.100",
                            }}
                          />
                        ) : null}
                        <Box sx={{ minWidth: 0 }}>
                          <Chip label={release.game} size="small" />
                          <Typography variant="h5" sx={{ mt: 0.75 }}>
                            {release.title}
                          </Typography>
                          <Typography color="text.secondary">
                            {formatReleaseDate(release.release_date)}
                          </Typography>
                        </Box>
                      </Stack>

                      {release.description ? (
                        <Typography>{release.description}</Typography>
                      ) : null}

                      <Divider />

                      <Box>
                        <Typography sx={{ fontWeight: 900, mb: 1 }}>
                          Products
                        </Typography>
                        {releaseProducts.length ? (
                          <FormGroup
                            sx={{
                              display: "grid",
                              gridTemplateColumns: {
                                xs: "1fr",
                                lg: "repeat(2, minmax(0, 1fr))",
                              },
                              columnGap: 1,
                            }}
                          >
                            {releaseProducts.map((product) => (
                              <FormControlLabel
                                key={product.id}
                                control={
                                  <Checkbox
                                    checked={form.productIds.includes(
                                      product.id
                                    )}
                                    onChange={(event) =>
                                      updateReservationProduct(
                                        release.id,
                                        product.id,
                                        event.target.checked
                                      )
                                    }
                                  />
                                }
                                label={product.name}
                              />
                            ))}
                          </FormGroup>
                        ) : (
                          <Alert severity="info">
                            Products have not been added for this release yet.
                          </Alert>
                        )}
                      </Box>

                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "1fr",
                            lg: "repeat(2, minmax(0, 1fr))",
                          },
                          gap: 1.25,
                        }}
                      >
                        <TextField
                          label="Employee name"
                          value={form.employee_name}
                          onChange={(event) =>
                            setReservationForms((prev) => ({
                              ...prev,
                              [release.id]: {
                                ...form,
                                employee_name: event.target.value,
                              },
                            }))
                          }
                          fullWidth
                        />
                        <TextField
                          label="Contact or initials"
                          value={form.employee_contact}
                          onChange={(event) =>
                            setReservationForms((prev) => ({
                              ...prev,
                              [release.id]: {
                                ...form,
                                employee_contact: event.target.value,
                              },
                            }))
                          }
                          fullWidth
                        />
                      </Box>
                      <TextField
                        label="Notes"
                        value={form.notes}
                        onChange={(event) =>
                          setReservationForms((prev) => ({
                            ...prev,
                            [release.id]: {
                              ...form,
                              notes: event.target.value,
                            },
                          }))
                        }
                        fullWidth
                        multiline
                        minRows={2}
                      />
                      <Button
                        variant="contained"
                        startIcon={<CheckCircleIcon />}
                        onClick={() => submitReservation(release.id)}
                        disabled={
                          !isReservationsConfigured || !releaseProducts.length
                        }
                        sx={{ mt: "auto" }}
                      >
                        Request Reservation
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}

            {!activeReleases.length ? (
              <Card>
                <CardContent>
                  <Typography>No active releases are open right now.</Typography>
                </CardContent>
              </Card>
            ) : null}
          </Box>
        ) : null}

        {tab === 1 ? (
          <Stack spacing={2}>
            {!adminUnlocked ? (
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h5">Manager Access</Typography>
                    <TextField
                      label="Admin PIN"
                      type="password"
                      value={adminPinEntry}
                      onChange={(event) => setAdminPinEntry(event.target.value)}
                    />
                    <Button
                      variant="contained"
                      startIcon={<AdminPanelSettingsIcon />}
                      onClick={unlockAdmin}
                    >
                      Unlock Queue
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", lg: "320px 1fr" },
                  gap: 2,
                  alignItems: "start",
                }}
              >
                <Card sx={{ position: { lg: "sticky" }, top: { lg: 88 } }}>
                  <CardContent>
                    <Stack spacing={1.5}>
                      <Typography variant="h5">Queue Controls</Typography>
                      <FormControl fullWidth>
                        <InputLabel>Release</InputLabel>
                        <Select
                          label="Release"
                          value={selectedRelease?.id ?? ""}
                          onChange={(event) =>
                            setSelectedReleaseId(event.target.value)
                          }
                        >
                          {releases.map((release) => (
                            <MenuItem key={release.id} value={release.id}>
                              {release.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={() => loadData(true)}
                        disabled={loading}
                      >
                        Refresh
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>

                <Stack
                  spacing={2}
                  sx={{ minWidth: 0 }}
                >
                {selectedRelease ? (
                  <Card>
                    <CardContent>
                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="h5">
                            {selectedRelease.title}
                          </Typography>
                          <Typography color="text.secondary">
                            {selectedRelease.game} •{" "}
                            {formatReleaseDate(selectedRelease.release_date)}
                          </Typography>
                        </Box>

                        <Stack spacing={1.25}>
                          {(reservationsByRelease[selectedRelease.id] ?? []).map(
                            (reservation, index) => (
                              <Paper
                                key={reservation.id}
                                variant="outlined"
                                sx={{ p: { xs: 1.5, sm: 2 } }}
                              >
                                <Stack
                                  direction={{ xs: "column", md: "row" }}
                                  spacing={1.5}
                                  alignItems={{ xs: "stretch", md: "center" }}
                                  justifyContent="space-between"
                                >
                                  <Box>
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems="center"
                                      flexWrap="wrap"
                                    >
                                      <Chip label={`#${index + 1}`} />
                                      <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 900 }}
                                      >
                                        {reservation.employee_name}
                                      </Typography>
                                      <Chip
                                        label={statusLabels[reservation.status]}
                                        color={getStatusColor(
                                          reservation.status
                                        )}
                                      />
                                    </Stack>
                                    <Typography color="text.secondary">
                                      {formatRequestTime(
                                        reservation.created_at
                                      )}
                                      {reservation.employee_contact
                                        ? ` • ${reservation.employee_contact}`
                                        : ""}
                                    </Typography>
                                    <Stack
                                      direction="row"
                                      spacing={0.75}
                                      flexWrap="wrap"
                                      useFlexGap
                                      sx={{ mt: 0.75 }}
                                    >
                                      {(
                                        productsByReservation[reservation.id] ??
                                        []
                                      ).map((product) => (
                                        <Chip
                                          key={product.id}
                                          label={product.name}
                                          size="small"
                                          color="primary"
                                          variant="outlined"
                                        />
                                      ))}
                                    </Stack>
                                    {reservation.notes ? (
                                      <Typography sx={{ mt: 0.5 }}>
                                        {reservation.notes}
                                      </Typography>
                                    ) : null}
                                  </Box>

                                  <FormControl sx={{ minWidth: 190 }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                      label="Status"
                                      value={reservation.status}
                                      onChange={(event) =>
                                        changeReservationStatus(
                                          reservation,
                                          event.target
                                            .value as ReservationStatus
                                        )
                                      }
                                    >
                                      {Object.entries(statusLabels).map(
                                        ([value, label]) => (
                                          <MenuItem key={value} value={value}>
                                            {label}
                                          </MenuItem>
                                        )
                                      )}
                                    </Select>
                                  </FormControl>
                                </Stack>
                              </Paper>
                            )
                          )}

                          {!reservationsByRelease[selectedRelease.id]?.length ? (
                            <Typography color="text.secondary">
                              No requests have been submitted for this release.
                            </Typography>
                          ) : null}
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                ) : null}
                </Stack>
              </Box>
            )}
          </Stack>
        ) : null}

        {tab === 2 ? (
          <Stack spacing={2}>
            {!adminUnlocked ? (
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h5">Manager Access</Typography>
                    <TextField
                      label="Admin PIN"
                      type="password"
                      value={adminPinEntry}
                      onChange={(event) => setAdminPinEntry(event.target.value)}
                    />
                    <Button
                      variant="contained"
                      startIcon={<AdminPanelSettingsIcon />}
                      onClick={unlockAdmin}
                    >
                      Unlock Release Tools
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", xl: "minmax(420px, 520px) 1fr" },
                  gap: 2,
                  alignItems: "start",
                }}
              >
                <Card sx={{ position: { xl: "sticky" }, top: { xl: 88 } }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h5">Add Release</Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, minmax(0, 1fr))",
                            xl: "1fr",
                          },
                          gap: 1.5,
                        }}
                      >
                        <TextField
                          label="Release name"
                          value={releaseForm.title}
                          onChange={(event) =>
                            setReleaseForm((prev) => ({
                              ...prev,
                              title: event.target.value,
                            }))
                          }
                        />
                        <TextField
                          label="Game / category"
                          value={releaseForm.game}
                          onChange={(event) =>
                            setReleaseForm((prev) => ({
                              ...prev,
                              game: event.target.value,
                            }))
                          }
                        />
                        <TextField
                          label="Release date"
                          type="date"
                          value={releaseForm.release_date}
                          onChange={(event) =>
                            setReleaseForm((prev) => ({
                              ...prev,
                              release_date: event.target.value,
                            }))
                          }
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          label="Image URL"
                          value={releaseForm.image_url}
                          onChange={(event) =>
                            setReleaseForm((prev) => ({
                              ...prev,
                              image_url: event.target.value,
                            }))
                          }
                        />
                      </Box>
                      <TextField
                        label="Notes"
                        value={releaseForm.description}
                        onChange={(event) =>
                          setReleaseForm((prev) => ({
                            ...prev,
                            description: event.target.value,
                          }))
                        }
                        multiline
                        minRows={2}
                      />
                      <Box>
                        <Typography sx={{ fontWeight: 900, mb: 1 }}>
                          Products Releasing
                        </Typography>
                        <Stack spacing={1}>
                          {releaseForm.products.map((product, index) => (
                            <Stack
                              key={index}
                              direction={{ xs: "column", sm: "row" }}
                              spacing={1}
                            >
                              <TextField
                                label={`Product ${index + 1}`}
                                value={product}
                                onChange={(event) =>
                                  setReleaseForm((prev) => ({
                                    ...prev,
                                    products: prev.products.map(
                                      (currentProduct, productIndex) =>
                                        productIndex === index
                                          ? event.target.value
                                          : currentProduct
                                    ),
                                  }))
                                }
                                fullWidth
                              />
                              <Button
                                variant="outlined"
                                color="warning"
                                onClick={() =>
                                  setReleaseForm((prev) => ({
                                    ...prev,
                                    products:
                                      prev.products.length <= 1
                                        ? [""]
                                        : prev.products.filter(
                                            (_, productIndex) =>
                                              productIndex !== index
                                          ),
                                  }))
                                }
                              >
                                Remove
                              </Button>
                            </Stack>
                          ))}
                          <Button
                            variant="outlined"
                            onClick={() =>
                              setReleaseForm((prev) => ({
                                ...prev,
                                products: [...prev.products, ""],
                              }))
                            }
                          >
                            Add Product
                          </Button>
                        </Stack>
                      </Box>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={saveRelease}
                        disabled={savingRelease}
                      >
                        Add Release
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        justifyContent="space-between"
                        alignItems={{ xs: "stretch", sm: "center" }}
                      >
                        <Typography variant="h5">Current Releases</Typography>
                        <Button
                          variant="outlined"
                          startIcon={<RefreshIcon />}
                          onClick={() => loadData(true)}
                          disabled={loading}
                        >
                          Refresh
                        </Button>
                      </Stack>

                      <Stack spacing={1.25}>
                        {releases.map((release) => (
                          <Paper
                            key={release.id}
                            variant="outlined"
                            sx={{ p: { xs: 1.5, sm: 2 } }}
                          >
                            <Stack
                              direction={{ xs: "column", md: "row" }}
                              spacing={1.5}
                              justifyContent="space-between"
                              alignItems={{ xs: "stretch", md: "center" }}
                            >
                              <Box>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                  flexWrap="wrap"
                                >
                                  <Typography variant="h6">
                                    {release.title}
                                  </Typography>
                                  <Chip label={release.game} />
                                  <Chip
                                    label={
                                      release.is_active ? "Active" : "Archived"
                                    }
                                    color={
                                      release.is_active ? "success" : "default"
                                    }
                                  />
                                </Stack>
                                <Typography color="text.secondary">
                                  {formatReleaseDate(release.release_date)} •{" "}
                                  {reservationsByRelease[release.id]?.length ??
                                    0}{" "}
                                  requests
                                </Typography>
                                <Stack
                                  direction="row"
                                  spacing={0.75}
                                  flexWrap="wrap"
                                  useFlexGap
                                  sx={{ mt: 1 }}
                                >
                                  {(productsByRelease[release.id] ?? []).map(
                                    (product) => (
                                      <Chip
                                        key={product.id}
                                        label={product.name}
                                        size="small"
                                        variant="outlined"
                                      />
                                    )
                                  )}
                                </Stack>
                              </Box>

                              <Button
                                variant="outlined"
                                startIcon={<SaveIcon />}
                                onClick={() =>
                                  setReleaseActive(
                                    release,
                                    !release.is_active
                                  )
                                }
                              >
                                {release.is_active ? "Archive" : "Reactivate"}
                              </Button>
                            </Stack>
                          </Paper>
                        ))}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            )}
          </Stack>
        ) : null}
      </Stack>
    </Container>
  );
}
