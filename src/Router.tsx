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
import PokemonSetSymbolsPage from "./pages/PokemonSetSymbolsPage";
import MtgSetSymbolsPage from "./pages/MtgSetSymbolsPage";
import CardStackCalculator from "./pages/CardStackCalculator";

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
  component: PokemonSetSymbolsPage,
});

const mtgSetSymbolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/mtg-set-symbols",
  component: MtgSetSymbolsPage,
});

const cardStackCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/card-stack-calculator",
  component: CardStackCalculator,
});

// --------------------
// Route tree
// --------------------
const routeTree = rootRoute.addChildren([
  dashboardRoute,
  optionsRoute,
  prizingRoute,
  cashCalculatorRoute,
  pokemonSetSymbolsRoute,
  mtgSetSymbolsRoute,
  cardStackCalculatorRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
