import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LoginIcon from "@mui/icons-material/Login";
import LockResetIcon from "@mui/icons-material/LockReset";

import { useEmployeeAuth } from "../hooks/useEmployeeAuth";

const portalActions = [
  {
    title: "Check Buy Status",
    description: "Look up the status of a buy already submitted to the store.",
    icon: SearchIcon,
  },
  {
    title: "View Buy History",
    description: "Review previous buys attached to your phone number.",
    icon: HistoryIcon,
  },
  {
    title: "Card Interest Request",
    description: "Tell us what you have and we can review whether the store is interested.",
    icon: AssignmentIcon,
  },
];

export default function LootCustomerPortalPage() {
  const navigate = useNavigate();
  const {
    authSession,
    authLoading,
    error,
    message,
    isConfigured,
    setError,
    login,
    requestPasswordReset,
  } = useEmployeeAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    if (!loginForm.email.trim() || !loginForm.password) {
      setError("Enter your email and password.");
      return;
    }

    try {
      await login(loginForm.email, loginForm.password);
      setLoginForm({ email: "", password: "" });
      navigate({ to: "/loot-tracker" });
    } catch {
      // The auth hook owns the displayed error.
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 } }}>
        <Stack spacing={3}>
          <Paper sx={{ p: { xs: 2.5, md: 4 } }}>
            <Stack spacing={1.5} alignItems="flex-start">
              <StorefrontIcon color="primary" sx={{ fontSize: 42 }} />
              <Typography variant="h1">Geek'd Customer Portal</Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 760 }}>
                Customer-facing buy tools will live here as the toolkit-native
                flow replaces the old Loot Tracker app.
              </Typography>
            </Stack>
          </Paper>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            {portalActions.map((action) => {
              const Icon = action.icon;

              return (
                <Paper key={action.title} sx={{ p: 2.5 }}>
                  <Stack spacing={1.5}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        bgcolor: "rgba(11, 30, 79, 0.1)",
                        color: "primary.main",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Icon />
                    </Box>
                    <Typography variant="h2">{action.title}</Typography>
                    <Typography color="text.secondary">{action.description}</Typography>
                    <Button variant="outlined" disabled>
                      Coming Soon
                    </Button>
                  </Stack>
                </Paper>
              );
            })}
          </Box>

          <Paper sx={{ p: { xs: 2, md: 2.5 } }}>
            {authSession ? (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", sm: "center" }}
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h2">Employee access</Typography>
                  <Typography color="text.secondary">
                    You are logged in. Open the employee dashboard to manage buys.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<LoginIcon />}
                  onClick={() => navigate({ to: "/loot-tracker" })}
                >
                  Employee Dashboard
                </Button>
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems={{ xs: "stretch", sm: "center" }}
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h2">Employee access</Typography>
                    <Typography color="text.secondary">
                      Staff can log in here to return to the employee toolkit.
                    </Typography>
                  </Box>
                  {!loginOpen ? (
                    <Button
                      variant="outlined"
                      startIcon={<LoginIcon />}
                      onClick={() => setLoginOpen(true)}
                    >
                      Employee Login
                    </Button>
                  ) : null}
                </Stack>

                {loginOpen ? (
                  <Stack spacing={2}>
                    {!isConfigured ? (
                      <Alert severity="warning">
                        Supabase is not configured. Add the employee auth
                        environment variables before employees can log in.
                      </Alert>
                    ) : null}
                    {message ? <Alert severity="success">{message}</Alert> : null}
                    {error ? <Alert severity="error">{error}</Alert> : null}

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 2,
                      }}
                    >
                      <TextField
                        label="Employee email"
                        type="email"
                        value={loginForm.email}
                        onChange={(event) =>
                          setLoginForm((previous) => ({
                            ...previous,
                            email: event.target.value,
                          }))
                        }
                        fullWidth
                      />
                      <TextField
                        label="Password"
                        type="password"
                        value={loginForm.password}
                        onChange={(event) =>
                          setLoginForm((previous) => ({
                            ...previous,
                            password: event.target.value,
                          }))
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleLogin();
                          }
                        }}
                        fullWidth
                      />
                    </Box>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                      <Button
                        variant="contained"
                        startIcon={<LoginIcon />}
                        onClick={handleLogin}
                        disabled={authLoading || !isConfigured}
                      >
                        {authLoading ? "Logging in..." : "Log In"}
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<LockResetIcon />}
                        onClick={() => requestPasswordReset(loginForm.email)}
                        disabled={authLoading || !isConfigured}
                      >
                        Reset Password
                      </Button>
                      <Button
                        variant="text"
                        onClick={() => {
                          setLoginOpen(false);
                          setLoginForm({ email: "", password: "" });
                        }}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Stack>
                ) : null}
              </Stack>
            )}
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
