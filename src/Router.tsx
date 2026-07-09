import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import AppLayout from "./layout/AppLayout";
import OptionsPage from "./pages/OptionsPage";
import StaircasePrizingCalculator from "./pages/PrizingCalculator";
import LandingPage from "./pages/LandingPage";
import CashCalculator from "./pages/CashCalculator";
import SetSymbolsPage from "./pages/SetSymbolsPage";
import TimerControllerPage from "./pages/TimerControllerPage";
import ReservationsPage from "./pages/ReservationsPage";
import InfoHubPage from "./pages/InfoHubPage";
import AccountPage from "./pages/AccountPage";
import AdminControlsPage from "./pages/AdminControlsPage";
import LootNewBuyEntryPage from "./pages/LootNewBuyEntryPage";
import LootBuyLogPage from "./pages/LootBuyLogPage";
import LootCustomersPage from "./pages/LootCustomersPage";
import LootDashboardPage from "./pages/LootDashboardPage";
import LootAwaitingPickupPage from "./pages/LootAwaitingPickupPage";
import LootSafeCashLogPage from "./pages/LootSafeCashLogPage";
import LootActivityLogPage from "./pages/LootActivityLogPage";
import LootWorkInProgressPage from "./pages/LootWorkInProgressPage";
import LootCustomerPortalPage from "./pages/LootCustomerPortalPage";
import LootLegacyRedirectPage from "./pages/LootLegacyRedirectPage";

// --------------------
// Root layout
// --------------------
const rootRoute = createRootRoute({
  component: AppLayout,
});

// --------------------
// Routes
// --------------------
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const optionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/options",
  component: OptionsPage,
});

const prizingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/prizing",
  component: StaircasePrizingCalculator,
});

const cashCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cash-calculator",
  component: CashCalculator,
});

const pokemonSetSymbolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pokemon-set-symbols",
  component: SetSymbolsPage,
});

const mtgSetSymbolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/mtg-set-symbols",
  component: SetSymbolsPage,
});

const setSymbolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/set-symbols",
  component: SetSymbolsPage,
});

const timerControllerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/timer-controller",
  component: TimerControllerPage,
});

const reservationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reservations",
  component: ReservationsPage,
});

const infoHubRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/info-hub",
  component: InfoHubPage,
});

const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: AccountPage,
});

const adminControlsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-controls",
  component: AdminControlsPage,
});

const lootTrackerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/loot-tracker",
  component: LootDashboardPage,
});

const lootNewBuyEntryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/loot-tracker/NewBuyEntry",
  component: LootNewBuyEntryPage,
});

const lootCustomerPortalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/loot-tracker/customer",
  component: LootCustomerPortalPage,
});

const lootBuyLogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/loot-tracker/BuyLog",
  component: LootBuyLogPage,
});

const lootWorkInProgressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/loot-tracker/WorkInProgress",
  component: LootWorkInProgressPage,
});

const lootCustomersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/loot-tracker/Customers",
  component: LootCustomersPage,
});

const lootAwaitingPickupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/loot-tracker/AwaitingPickup",
  component: LootAwaitingPickupPage,
});

const lootSafeCashLogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/loot-tracker/SafeCashLog",
  component: LootSafeCashLogPage,
});

const lootActivityLogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/loot-tracker/ActivityLog",
  component: LootActivityLogPage,
});

const lootLegacyRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/loot-tracker/$",
  component: LootLegacyRedirectPage,
});

// --------------------
// Route tree
// --------------------
const routeTree = rootRoute.addChildren([
  dashboardRoute,
  optionsRoute,
  prizingRoute,
  cashCalculatorRoute,
  setSymbolsRoute,
  pokemonSetSymbolsRoute,
  mtgSetSymbolsRoute,
  timerControllerRoute,
  reservationsRoute,
  infoHubRoute,
  accountRoute,
  adminControlsRoute,
  lootTrackerRoute,
  lootCustomerPortalRoute,
  lootNewBuyEntryRoute,
  lootBuyLogRoute,
  lootWorkInProgressRoute,
  lootCustomersRoute,
  lootAwaitingPickupRoute,
  lootSafeCashLogRoute,
  lootActivityLogRoute,
  lootLegacyRedirectRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
