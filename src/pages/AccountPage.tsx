import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";

import { useEmployeeAuth } from "../hooks/useEmployeeAuth";

const blankLoginForm = {
  email: "",
  password: "",
};

const blankProfileForm = {
  profileId: "",
  displayName: "",
};

const blankPasswordForm = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};

export default function AccountPage() {
  const {
    authSession,
    profile,
    loading,
    authLoading,
    error,
    message,
    isConfigured,
    setError,
    login,
    logout,
    saveProfile,
    changePassword,
    requestPasswordReset,
  } = useEmployeeAuth();
  const [loginForm, setLoginForm] = useState(blankLoginForm);
  const [profileForm, setProfileForm] = useState(blankProfileForm);
  const [passwordForm, setPasswordForm] = useState(blankPasswordForm);
  const [passwordError, setPasswordError] = useState("");

  const visibleProfileForm =
    profileForm.profileId === (profile?.id ?? "")
      ? profileForm
      : {
          profileId: profile?.id ?? "",
          displayName: profile?.display_name ?? "",
        };

  const handleLogin = async () => {
    if (!loginForm.email.trim() || !loginForm.password) {
      setError("Enter your email and password.");
      return;
    }

    try {
      await login(loginForm.email, loginForm.password);
      setLoginForm(blankLoginForm);
    } catch {
      // The hook owns the page-level error.
    }
  };

  const handleProfileSave = async () => {
    if (!visibleProfileForm.displayName.trim()) {
      setError("Your name is required.");
      return;
    }

    try {
      await saveProfile(visibleProfileForm.displayName);
    } catch {
      // The hook owns the page-level error.
    }
  };

  const handlePasswordChange = async () => {
    setPasswordError("");

    try {
      await changePassword(
        passwordForm.currentPassword,
        passwordForm.password,
        passwordForm.confirmPassword
      );
      setPasswordForm(blankPasswordForm);
    } catch (err) {
      setPasswordError(
        err instanceof Error ? err.message : "Unable to change password."
      );
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Paper sx={{ p: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <CircularProgress size={24} />
            <Typography>Checking employee account...</Typography>
          </Stack>
        </Paper>
      </Container>
    );
  }

  if (!isConfigured) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Alert severity="warning">
          Supabase is not configured. Add the reservation Supabase environment
          variables before using employee accounts.
        </Alert>
      </Container>
    );
  }

  if (!authSession) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 3, md: 6 } }}>
        <Paper sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <PersonIcon color="primary" sx={{ fontSize: 34 }} />
              <Box>
                <Typography variant="h1">Employee Account</Typography>
                <Typography color="text.secondary">
                  Log in to manage your profile and password.
                </Typography>
              </Box>
            </Stack>

            {message ? <Alert severity="success">{message}</Alert> : null}
            {error ? <Alert severity="error">{error}</Alert> : null}

            <TextField
              label="Email"
              type="email"
              value={loginForm.email}
              onChange={(event) =>
                setLoginForm((prev) => ({ ...prev, email: event.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={loginForm.password}
              onChange={(event) =>
                setLoginForm((prev) => ({
                  ...prev,
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
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <Button
                variant="contained"
                onClick={handleLogin}
                disabled={authLoading}
                fullWidth
              >
                {authLoading ? "Logging in..." : "Log In"}
              </Button>
              <Button
                variant="outlined"
                onClick={() => requestPasswordReset(loginForm.email)}
                disabled={authLoading}
                fullWidth
              >
                Reset Password
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Stack spacing={2.5}>
        <Paper sx={{ p: { xs: 2, md: 3 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <PersonIcon color="primary" sx={{ fontSize: 38 }} />
              <Box>
                <Typography variant="h1">Employee Account</Typography>
                <Typography color="text.secondary">
                  Manage your name, account email, and password.
                </Typography>
              </Box>
            </Stack>
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={logout}
              disabled={authLoading}
            >
              Log Out
            </Button>
          </Stack>
        </Paper>

        {message ? <Alert severity="success">{message}</Alert> : null}
        {error ? <Alert severity="error">{error}</Alert> : null}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
            alignItems: "start",
          }}
        >
          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="h5">Profile</Typography>
                <Typography color="text.secondary">
                  Your account email comes from your Supabase login.
                </Typography>
              </Box>
              <TextField
                label="Name"
                value={visibleProfileForm.displayName}
                onChange={(event) =>
                  setProfileForm((prev) => ({
                    ...prev,
                    profileId: profile?.id ?? "",
                    displayName: event.target.value,
                  }))
                }
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                value={authSession.user.email ?? profile?.contact ?? ""}
                helperText="This must match your login email."
                InputProps={{ readOnly: true }}
                fullWidth
              />
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleProfileSave}
                disabled={authLoading}
              >
                {authLoading ? "Saving..." : "Save Profile"}
              </Button>
            </Stack>
          </Paper>

          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="h5">Password</Typography>
                <Typography color="text.secondary">
                  Enter your current password before setting a new one.
                </Typography>
              </Box>
              {passwordError ? (
                <Alert severity="error">{passwordError}</Alert>
              ) : null}
              <TextField
                label="Current password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(event) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    currentPassword: event.target.value,
                  }))
                }
                fullWidth
              />
              <Divider />
              <TextField
                label="New password"
                type="password"
                value={passwordForm.password}
                onChange={(event) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
                fullWidth
              />
              <TextField
                label="Confirm password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(event) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    confirmPassword: event.target.value,
                  }))
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handlePasswordChange();
                  }
                }}
                fullWidth
              />
              <Button
                variant="contained"
                startIcon={<LockResetIcon />}
                onClick={handlePasswordChange}
                disabled={authLoading}
              >
                {authLoading ? "Saving..." : "Change Password"}
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Container>
  );
}
