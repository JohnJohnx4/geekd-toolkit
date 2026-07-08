import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import GeekLogo from "../assets/GEEKD-Logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import PrizingIcon from "@mui/icons-material/EmojiEvents";
import MoneyIcon from "@mui/icons-material/Money";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import TimerIcon from "@mui/icons-material/Timer";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HistoryIcon from "@mui/icons-material/History";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LoginIcon from "@mui/icons-material/Login";
import LockResetIcon from "@mui/icons-material/LockReset";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  EMPLOYEE_LOGOUT_REDIRECT_PATH,
  useEmployeeAuth,
} from "../hooks/useEmployeeAuth";

const RESERVATION_PROFILE_REQUIRED_KEY =
  "geekd.reservations.profileRequired";

const SIDEBAR_WIDTH = 264;

type NavItem = {
  label: string;
  path: string;
  icon: typeof HomeIcon;
  end?: boolean;
};

const toolkitItems: NavItem[] = [
  { label: "Dashboard", path: "/", icon: HomeIcon, end: true },
  { label: "Cash Calculator", path: "/cash-calculator", icon: MoneyIcon },
  { label: "Prizing Calculator", path: "/prizing", icon: PrizingIcon },
  { label: "Set Symbols", path: "/set-symbols", icon: AutoFixHighIcon },
  { label: "Timer Controller", path: "/timer-controller", icon: TimerIcon },
  { label: "Reservations", path: "/reservations", icon: EventAvailableIcon },
  { label: "Info Hub", path: "/info-hub", icon: ArticleIcon },
  { label: "Account", path: "/account", icon: PersonIcon },
  { label: "Admin Controls", path: "/admin-controls", icon: AdminPanelSettingsIcon },
];

const lootItems: NavItem[] = [
  { label: "Loot Dashboard", path: "/loot-tracker", icon: InventoryIcon, end: true },
  { label: "Customer Portal", path: "/loot-tracker/customer", icon: StorefrontIcon },
  { label: "New Buy Entry", path: "/loot-tracker/NewBuyEntry", icon: AddCircleIcon },
  { label: "Buy Log", path: "/loot-tracker/BuyLog", icon: ListAltIcon },
  {
    label: "Work In Progress",
    path: "/loot-tracker/WorkInProgress",
    icon: AssignmentIndIcon,
  },
  { label: "Customers", path: "/loot-tracker/Customers", icon: GroupsIcon },
  {
    label: "Awaiting Pickup",
    path: "/loot-tracker/AwaitingPickup",
    icon: LocalShippingIcon,
  },
  {
    label: "Safe Cash Log",
    path: "/loot-tracker/SafeCashLog",
    icon: AccountBalanceIcon,
  },
  { label: "Activity Log", path: "/loot-tracker/ActivityLog", icon: HistoryIcon },
];

const buyIntakeAllowedLootPaths = new Set([
  "/loot-tracker/customer",
  "/loot-tracker/NewBuyEntry",
  "/loot-tracker/AwaitingPickup",
]);

const nativeLootRoutes = new Set([
  "/loot-tracker",
  "/loot-tracker/customer",
  "/loot-tracker/NewBuyEntry",
  "/loot-tracker/BuyLog",
  "/loot-tracker/WorkInProgress",
  "/loot-tracker/Customers",
  "/loot-tracker/AwaitingPickup",
  "/loot-tracker/SafeCashLog",
  "/loot-tracker/ActivityLog",
]);

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const hadEmployeeSession = useRef(false);
  const isCustomerPortal = location.pathname.startsWith("/loot-tracker/customer");
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
    requestPasswordReset,
  } = useEmployeeAuth();
  const isBuyIntakeOnly = profile?.role === "buy_intake";
  const profileRoleLabel = profile?.role
    ? profile.role.replace(/_/g, " ")
    : "Employee";

  useEffect(() => {
    if (loading) return;

    if (!authSession && location.pathname === "/") {
      navigate({
        to: "/loot-tracker/customer",
        replace: true,
      });
    }

    if (
      !authSession &&
      hadEmployeeSession.current &&
      !location.pathname.startsWith(EMPLOYEE_LOGOUT_REDIRECT_PATH)
    ) {
      navigate({
        to: "/loot-tracker/customer",
        replace: true,
      });
    }

    hadEmployeeSession.current = Boolean(authSession);
  }, [authSession, loading, location.pathname, navigate]);

  useEffect(() => {
    if (loading || !authSession || !isBuyIntakeOnly || isCustomerPortal) return;

    if (!buyIntakeAllowedLootPaths.has(location.pathname)) {
      navigate({
        to: "/loot-tracker/NewBuyEntry",
        replace: true,
      });
    }
  }, [
    authSession,
    isBuyIntakeOnly,
    isCustomerPortal,
    loading,
    location.pathname,
    navigate,
  ]);

  const handleNavigation = (link: string) => {
    setAccountMenuOpen(false);

    if (
      isBuyIntakeOnly &&
      !link.startsWith("/loot-tracker/customer") &&
      !buyIntakeAllowedLootPaths.has(link)
    ) {
      setSidebarOpen(false);
      navigate({
        to: "/loot-tracker/NewBuyEntry",
      });
      return;
    }

    const profileRequired =
      window.localStorage.getItem(RESERVATION_PROFILE_REQUIRED_KEY) === "true";

    if (location.pathname === "/reservations" && profileRequired) {
      window.alert("Finish your reservation profile before leaving this page.");
      setSidebarOpen(false);
      return;
    }

    setSidebarOpen(false);

    if (nativeLootRoutes.has(link)) {
      navigate({ to: link });
      return;
    }

    navigate({ to: link });
  };

  const handleLogout = async () => {
    setSidebarOpen(false);
    setAccountMenuOpen(false);
    await logout();
  };

  const isActive = (item: NavItem) =>
    item.end
      ? location.pathname === item.path
      : location.pathname === item.path ||
        location.pathname.startsWith(`${item.path}/`);

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const active = isActive(item);

    return (
      <Box
        key={item.path}
        component="button"
        type="button"
        onClick={() => handleNavigation(item.path)}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2,
          py: 1.25,
          border: 0,
          borderRadius: 2,
          bgcolor: active ? "rgba(70, 232, 61, 0.12)" : "transparent",
          color: active ? "secondary.main" : "rgba(255,255,255,0.72)",
          cursor: "pointer",
          font: "inherit",
          textAlign: "left",
          transition: "background 140ms ease, color 140ms ease",
          "&:hover": {
            bgcolor: active ? "rgba(70, 232, 61, 0.16)" : "rgba(255,255,255,0.06)",
            color: active ? "secondary.main" : "#fff",
          },
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: "secondary.main",
            outlineOffset: 2,
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, color: "inherit" }}>
          <Icon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{
            fontSize: 14,
            fontWeight: active ? 800 : 600,
          }}
        />
      </Box>
    );
  };

  const visibleToolkitItems = isBuyIntakeOnly ? [] : toolkitItems;
  const visibleLootItems = isBuyIntakeOnly
    ? lootItems.filter((item) => buyIntakeAllowedLootPaths.has(item.path))
    : lootItems;

  const sidebar = (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: "100%",
        bgcolor: "primary.main",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Box
        component="button"
        type="button"
        onClick={() => handleNavigation("/")}
        aria-label="Go to dashboard"
        sx={{
          p: 2.5,
          border: 0,
          bgcolor: "transparent",
          cursor: "pointer",
          lineHeight: 0,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <img src={GeekLogo} alt="GEEK'd" style={{ width: 98 }} />
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto", px: 1.5, py: 2 }}>
        {visibleToolkitItems.length ? (
          <>
            <Typography
              sx={{
                px: 2,
                mb: 1,
                color: "rgba(255,255,255,0.42)",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.2,
                textTransform: "uppercase",
              }}
            >
              Toolkit
            </Typography>
            <Stack spacing={0.5}>{visibleToolkitItems.map(renderNavItem)}</Stack>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 2 }} />
          </>
        ) : null}

        <Typography
          sx={{
            px: 2,
            mb: 1,
            color: "rgba(255,255,255,0.42)",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1.2,
            textTransform: "uppercase",
          }}
        >
          Loot Tracker
        </Typography>
        <Stack spacing={0.5}>{visibleLootItems.map(renderNavItem)}</Stack>
      </Box>

      {authSession ? (
        <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.08)", p: 1.5 }}>
          <Box
            component="button"
            type="button"
            onClick={() => setAccountMenuOpen((open) => !open)}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              px: 1.5,
              py: 1.25,
              border: 0,
              borderRadius: 2,
              bgcolor: accountMenuOpen
                ? "rgba(255,255,255,0.08)"
                : "transparent",
              color: "#fff",
              cursor: "pointer",
              font: "inherit",
              textAlign: "left",
              "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "secondary.main",
                outlineOffset: 2,
              },
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                bgcolor: "rgba(70, 232, 61, 0.12)",
                color: "secondary.main",
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
                flex: "0 0 auto",
              }}
            >
              {(profile?.display_name || authSession.user.email || "?")
                .trim()
                .slice(0, 1)
                .toUpperCase()}
            </Box>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 800,
                  lineHeight: 1.25,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {profile?.display_name || "Employee"}
              </Typography>
              <Typography
                sx={{
                  mt: 0.25,
                  color: "rgba(255,255,255,0.54)",
                  fontSize: 11,
                  lineHeight: 1.2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {profile?.contact || authSession.user.email || "No email"}
              </Typography>
              <Typography
                sx={{
                  mt: 0.25,
                  color: "rgba(255,255,255,0.42)",
                  fontSize: 11,
                  lineHeight: 1.2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textTransform: "capitalize",
                  whiteSpace: "nowrap",
                }}
              >
                {profileRoleLabel}
              </Typography>
            </Box>
          </Box>

          {accountMenuOpen ? (
            <Button
              fullWidth
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              disabled={authLoading}
              sx={{
                mt: 1,
                justifyContent: "flex-start",
                color: "#fff",
                borderColor: "rgba(255,255,255,0.18)",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.32)",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
              variant="outlined"
            >
              {authLoading ? "Logging out..." : "Log out"}
            </Button>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );

  const handleLogin = async () => {
    if (!loginForm.email.trim() || !loginForm.password) {
      setError("Enter your email and password.");
      return;
    }

    try {
      await login(loginForm.email, loginForm.password);
      setLoginForm({ email: "", password: "" });
    } catch {
      // The auth hook owns the displayed error.
    }
  };

  const loginScreen = (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
        <Paper sx={{ p: { xs: 2.5, sm: 4 } }}>
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <PersonIcon color="primary" sx={{ fontSize: 36 }} />
              <Box>
                <Typography variant="h1">Employee Login</Typography>
                <Typography color="text.secondary">
                  Log in to access the toolkit and employee loot views.
                </Typography>
              </Box>
            </Stack>

            {!isConfigured ? (
              <Alert severity="warning">
                Supabase is not configured. Add the employee auth environment
                variables before employees can log in.
              </Alert>
            ) : null}
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
                startIcon={<LoginIcon />}
                onClick={handleLogin}
                disabled={authLoading || !isConfigured}
                fullWidth
              >
                {authLoading ? "Logging in..." : "Log In"}
              </Button>
              <Button
                variant="outlined"
                startIcon={<LockResetIcon />}
                onClick={() => requestPasswordReset(loginForm.email)}
                disabled={authLoading || !isConfigured}
                fullWidth
              >
                Reset Password
              </Button>
            </Stack>

            <Button
              variant="text"
              onClick={() => handleNavigation("/loot-tracker/customer")}
            >
              Open customer portal
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );

  if (isCustomerPortal && !authSession) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
        <Box component="main" sx={{ minHeight: "100vh" }}>
          <Outlet />
        </Box>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
        <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <CircularProgress size={24} />
              <Typography>Checking employee login...</Typography>
            </Stack>
          </Paper>
        </Container>
      </Box>
    );
  }

  if (!authSession && location.pathname === "/") {
    return null;
  }

  if (!authSession) {
    return loginScreen;
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Box
        sx={{
          display: { xs: "none", lg: "block" },
          position: "fixed",
          inset: "0 auto 0 0",
          width: SIDEBAR_WIDTH,
          zIndex: 1200,
        }}
      >
        {sidebar}
      </Box>

      <Box
        sx={{
          display: { xs: "flex", lg: "none" },
          position: "sticky",
          top: 0,
          zIndex: 1200,
          height: 64,
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          bgcolor: "primary.main",
          color: "#fff",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Box
          component="button"
          type="button"
          onClick={() => handleNavigation("/")}
          sx={{ p: 0, border: 0, bgcolor: "transparent", lineHeight: 0 }}
          aria-label="Go to dashboard"
        >
          <img src={GeekLogo} alt="GEEK'd" style={{ width: 76 }} />
        </Box>
        <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: "secondary.main" }}>
          <MenuIcon />
        </IconButton>
      </Box>

      {sidebarOpen && (
        <Box
          sx={{
            display: { xs: "block", lg: "none" },
            position: "fixed",
            inset: 0,
            zIndex: 1300,
          }}
        >
          <Box
            onClick={() => setSidebarOpen(false)}
            sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.5)" }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: "0 auto 0 0",
              width: SIDEBAR_WIDTH,
              maxWidth: "86vw",
            }}
          >
            {sidebar}
          </Box>
          <IconButton
            onClick={() => setSidebarOpen(false)}
            sx={{
              position: "absolute",
              top: 10,
              left: `min(${SIDEBAR_WIDTH + 8}px, calc(86vw + 8px))`,
              color: "#fff",
              bgcolor: "rgba(0,0,0,0.35)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
            }}
            aria-label="Close navigation"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          ml: { xs: 0, lg: `${SIDEBAR_WIDTH}px` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
