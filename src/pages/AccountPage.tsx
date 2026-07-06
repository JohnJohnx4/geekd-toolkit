import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";

import { useEmployeeAuth } from "../hooks/useEmployeeAuth";
import {
  createReservationEmployeeAccount,
  fetchReservationProfiles,
  type ReservationProfileRecord,
  updateReservationProfileAdmin,
} from "./reservationSupabase";

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

const DEFAULT_NEW_USER_PASSWORD = "Geekd1234!";

const blankNewUserForm = {
  displayName: "",
  email: "",
  password: DEFAULT_NEW_USER_PASSWORD,
  isAdmin: false,
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
    setMessage,
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
  const [accountTab, setAccountTab] = useState(0);
  const [profiles, setProfiles] = useState<ReservationProfileRecord[]>([]);
  const [profilesLoading, setProfilesLoading] = useState(false);
  const [newUserForm, setNewUserForm] = useState(blankNewUserForm);
  const [creatingUser, setCreatingUser] = useState(false);

  const isAdmin = Boolean(profile?.is_admin);

  const visibleProfileForm =
    profileForm.profileId === (profile?.id ?? "")
      ? profileForm
      : {
          profileId: profile?.id ?? "",
          displayName: profile?.display_name ?? "",
        };

  useEffect(() => {
    if (!isAdmin && accountTab === 1) {
      setAccountTab(0);
    }
  }, [accountTab, isAdmin]);

  const loadProfiles = useCallback(async () => {
    if (!isAdmin) return;

    setProfilesLoading(true);
    setError("");

    try {
      const profileRows = await fetchReservationProfiles();
      setProfiles(profileRows);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load employee profiles."
      );
    } finally {
      setProfilesLoading(false);
    }
  }, [isAdmin, setError]);

  useEffect(() => {
    if (isAdmin) {
      loadProfiles();
    } else {
      setProfiles([]);
    }
  }, [isAdmin, loadProfiles]);

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

  const handleCreateUser = async () => {
    if (!isAdmin) {
      setError("Admin access is required to create employee accounts.");
      return;
    }

    if (!newUserForm.displayName.trim()) {
      setError("Employee name is required.");
      return;
    }

    if (!newUserForm.email.trim() || !newUserForm.email.includes("@")) {
      setError("Enter a valid employee email.");
      return;
    }

    if (newUserForm.password.length < 8) {
      setError("Default password must be at least 8 characters.");
      return;
    }

    setCreatingUser(true);
    setError("");
    setMessage("");

    try {
      await createReservationEmployeeAccount({
        email: newUserForm.email.trim(),
        password: newUserForm.password,
        display_name: newUserForm.displayName.trim(),
        is_admin: newUserForm.isAdmin,
      });
      setNewUserForm(blankNewUserForm);
      setMessage("Employee account created.");
      await loadProfiles();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to create employee account."
      );
    } finally {
      setCreatingUser(false);
    }
  };

  const changeProfileAdmin = async (
    targetProfile: ReservationProfileRecord,
    checked: boolean
  ) => {
    if (!isAdmin) {
      setError("Admin access is required to manage profiles.");
      return;
    }

    if (targetProfile.id === authSession?.user.id && !checked) {
      setError("You cannot remove your own admin access.");
      return;
    }

    setError("");
    setMessage("");

    try {
      const updatedProfile = await updateReservationProfileAdmin(
        targetProfile.id,
        checked
      );

      setProfiles((prev) =>
        prev.map((item) => (item.id === updatedProfile.id ? updatedProfile : item))
      );

      setMessage(
        checked
          ? `${updatedProfile.display_name} is now an admin.`
          : `${updatedProfile.display_name} is no longer an admin.`
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update profile access."
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

        {isAdmin ? (
          <Paper sx={{ overflow: "hidden" }}>
            <Tabs
              value={accountTab}
              onChange={(_, nextTab) => setAccountTab(nextTab)}
              variant="fullWidth"
            >
              <Tab icon={<PersonIcon />} iconPosition="start" label="Profile" />
              <Tab
                icon={<AdminPanelSettingsIcon />}
                iconPosition="start"
                label="Admin"
              />
            </Tabs>
          </Paper>
        ) : null}

        {accountTab === 0 ? (
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
        ) : null}

        {isAdmin && accountTab === 1 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "420px minmax(0, 1fr)" },
              gap: 2,
              alignItems: "start",
            }}
          >
            <Paper sx={{ p: { xs: 2, md: 3 } }}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h5">Create Employee Account</Typography>
                  <Typography color="text.secondary">
                    Add a login with a default password they can change later.
                  </Typography>
                </Box>
                <TextField
                  label="Name"
                  value={newUserForm.displayName}
                  onChange={(event) =>
                    setNewUserForm((prev) => ({
                      ...prev,
                      displayName: event.target.value,
                    }))
                  }
                  fullWidth
                />
                <TextField
                  label="Email"
                  type="email"
                  value={newUserForm.email}
                  onChange={(event) =>
                    setNewUserForm((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  fullWidth
                />
                <TextField
                  label="Default password"
                  type="text"
                  value={newUserForm.password}
                  onChange={(event) =>
                    setNewUserForm((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  helperText="Share this with the employee so they can log in once."
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={newUserForm.isAdmin}
                      onChange={(event) =>
                        setNewUserForm((prev) => ({
                          ...prev,
                          isAdmin: event.target.checked,
                        }))
                      }
                    />
                  }
                  label="Admin account"
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleCreateUser}
                  disabled={creatingUser}
                >
                  {creatingUser ? "Creating..." : "Create Account"}
                </Button>
              </Stack>
            </Paper>

            <Paper sx={{ p: { xs: 2, md: 3 } }}>
              <Stack spacing={2}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  justifyContent="space-between"
                  alignItems={{ xs: "stretch", sm: "center" }}
                >
                  <Box>
                    <Typography variant="h5">Employee Access</Typography>
                    <Typography color="text.secondary">
                      Manage who can use admin tools.
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={loadProfiles}
                    disabled={profilesLoading}
                  >
                    Refresh
                  </Button>
                </Stack>

                <Stack spacing={1}>
                  {profiles.map((item) => (
                    <Paper key={item.id} variant="outlined" sx={{ p: 1.25 }}>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        justifyContent="space-between"
                        alignItems={{ xs: "stretch", sm: "center" }}
                      >
                        <Box sx={{ minWidth: 0 }}>
                          <Stack
                            direction="row"
                            spacing={0.75}
                            alignItems="center"
                            flexWrap="wrap"
                            useFlexGap
                          >
                            <Typography sx={{ fontWeight: 900 }}>
                              {item.display_name}
                            </Typography>
                            <Chip
                              size="small"
                              label={item.is_admin ? "Admin" : "Employee"}
                              color={item.is_admin ? "secondary" : "default"}
                            />
                          </Stack>
                          <Typography color="text.secondary">
                            {item.contact || "No email saved"}
                          </Typography>
                        </Box>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={item.is_admin}
                              onChange={(event) =>
                                changeProfileAdmin(item, event.target.checked)
                              }
                              disabled={
                                item.id === authSession.user.id && item.is_admin
                              }
                            />
                          }
                          label="Admin"
                          sx={{ m: 0 }}
                        />
                      </Stack>
                    </Paper>
                  ))}

                  {!profiles.length ? (
                    <Typography color="text.secondary">
                      {profilesLoading
                        ? "Loading employee profiles..."
                        : "No profiles have been created yet."}
                    </Typography>
                  ) : null}
                </Stack>
              </Stack>
            </Paper>
          </Box>
        ) : null}
      </Stack>
    </Container>
  );
}
