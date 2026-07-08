import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Container,
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
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";

import {
  fetchLootActivityEvents,
  type LootActivityEventRecord,
} from "./reservationSupabase";

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const actionConfig = (action: string) => {
  if (action.includes("edited")) {
    return { label: "Edited", color: "primary" as const, icon: EditIcon };
  }
  if (action.includes("created")) {
    return { label: "Created", color: "success" as const, icon: AddCircleIcon };
  }
  if (action.includes("customer")) {
    return { label: "Customer", color: "info" as const, icon: PersonIcon };
  }
  if (action.includes("pickup") || action.includes("cash") || action.includes("contact")) {
    return { label: "Workflow", color: "secondary" as const, icon: CheckCircleIcon };
  }

  return { label: action.replace(/_/g, " "), color: "default" as const, icon: HistoryIcon };
};

const matchesSearch = (event: LootActivityEventRecord, search: string) => {
  const term = search.trim().toLowerCase();
  if (!term) return true;

  return [
    event.action,
    event.description,
    event.actor_label,
    event.customer_name,
  ].some((value) => value?.toLowerCase().includes(term));
};

export default function LootActivityLogPage() {
  const [events, setEvents] = useState<LootActivityEventRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const filteredEvents = useMemo(
    () => events.filter((event) => matchesSearch(event, search)),
    [events, search]
  );

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const rows = await fetchLootActivityEvents();
        if (isMounted) setEvents(rows);
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load activity log."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
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
                  <HistoryIcon color="primary" sx={{ fontSize: 36 }} />
                  <Box>
                    <Typography variant="h1">Activity Log</Typography>
                    <Typography color="text.secondary">
                      Read-only history of customer, buy, and workflow activity.
                    </Typography>
                  </Box>
                </Stack>
                <Chip label={`${filteredEvents.length} entries`} color="primary" />
              </Stack>

              <TextField
                label="Search activity"
                placeholder="Search by description, employee, customer, or action"
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
                <Typography>Loading activity...</Typography>
              </Stack>
            ) : filteredEvents.length === 0 ? (
              <Box sx={{ p: 3 }}>
                <Typography color="text.secondary">
                  {search ? "No matching activity found." : "No activity recorded yet."}
                </Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table sx={{ minWidth: 960 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Performed By</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredEvents.map((event) => {
                      const config = actionConfig(event.action);
                      const Icon = config.icon;

                      return (
                        <TableRow key={event.id} hover>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {dateTimeFormatter.format(new Date(event.created_at))}
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={<Icon />}
                              label={config.label}
                              color={config.color}
                              size="small"
                              variant="outlined"
                              sx={{ textTransform: "capitalize" }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>
                            {event.description}
                          </TableCell>
                          <TableCell>{event.customer_name || "-"}</TableCell>
                          <TableCell>{event.actor_label || "-"}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
