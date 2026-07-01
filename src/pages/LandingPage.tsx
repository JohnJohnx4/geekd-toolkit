import {
  Box,
  ButtonBase,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import MoneyIcon from "@mui/icons-material/Money";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import TimerIcon from "@mui/icons-material/Timer";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useNavigate } from "@tanstack/react-router";

const tools = [
  {
    label: "Cashout / Deposit",
    description: "Count drawers, safe cash, and deposits",
    path: "/cash-calculator",
    icon: MoneyIcon,
    color: "#0f766e",
    background: "#ccfbf1",
  },
  {
    label: "Prizing Calculator",
    description: "Split prize pools and event payouts",
    path: "/prizing",
    icon: PriceCheckIcon,
    color: "#7c2d12",
    background: "#fed7aa",
  },
  {
    label: "Pokemon Symbols",
    description: "Find Pokemon TCG set symbols by year",
    path: "/pokemon-set-symbols",
    icon: CatchingPokemonIcon,
    color: "#1d4ed8",
    background: "#dbeafe",
  },
  {
    label: "MTG Symbols",
    description: "Search Magic set symbols and releases",
    path: "/mtg-set-symbols",
    icon: AutoFixHighIcon,
    color: "#581c87",
    background: "#f3e8ff",
  },
  {
    label: "Timer Controller",
    description: "Run up to six TCG timers at once",
    path: "/timer-controller",
    icon: TimerIcon,
    color: "#334155",
    background: "#e2e8f0",
  },
  {
    label: "Reservations",
    description: "Collect employee requests for upcoming releases",
    path: "/reservations",
    icon: EventAvailableIcon,
    color: "#166534",
    background: "#dcfce7",
  },
] as const;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5 } }}>
      <Paper sx={{ p: 2, mt: 4 }}>
        <Typography variant="h1">Welcome to the Geekd Toolkit</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          A site with various tools to help manage your Geek'd work experience
        </Typography>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          gap: 2,
          mt: 4,
        }}
      >
        {tools.map((tool) => {
          const Icon = tool.icon;

          return (
            <ButtonBase
              key={tool.path}
              onClick={() => navigate({ to: tool.path })}
              sx={{
                minHeight: 150,
                alignItems: "stretch",
                borderRadius: 2,
                textAlign: "left",
                overflow: "hidden",
                boxShadow: 1,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                transition: "transform 140ms ease, box-shadow 140ms ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 4,
                },
                "&:focus-visible": {
                  outline: "3px solid",
                  outlineColor: "primary.main",
                  outlineOffset: 2,
                },
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ width: "100%", p: { xs: 2, sm: 2.5 } }}
              >
                <Box
                  sx={{
                    width: { xs: 74, sm: 88 },
                    minWidth: { xs: 74, sm: 88 },
                    height: { xs: 74, sm: 88 },
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 2,
                    bgcolor: tool.background,
                    color: tool.color,
                  }}
                >
                  <Icon sx={{ fontSize: { xs: 42, sm: 52 } }} />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    {tool.label}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                    {tool.description}
                  </Typography>
                </Box>
              </Stack>
            </ButtonBase>
          );
        })}
      </Box>
    </Container>
  );
};

export default LandingPage;
