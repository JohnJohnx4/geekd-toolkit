import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { useLocation } from "@tanstack/react-router";

import MtgSetSymbolsPage from "./MtgSetSymbolsPage";
import PokemonSetSymbolsPage from "./PokemonSetSymbolsPage";

const symbolTabs = [
  {
    label: "Pokemon",
    icon: <CatchingPokemonIcon />,
    panel: <PokemonSetSymbolsPage embedded />,
  },
  {
    label: "MTG",
    icon: <AutoFixHighIcon />,
    panel: <MtgSetSymbolsPage embedded />,
  },
] as const;

export default function SetSymbolsPage() {
  const location = useLocation();
  const initialTab = location.pathname.includes("mtg") ? 1 : 0;
  const [tab, setTab] = useState(initialTab);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Stack spacing={2.5}>
        <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h1" sx={{ fontSize: { xs: 30, sm: 42 } }}>
                Set Symbols
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Search set symbols by game, year, set name, code, or era.
              </Typography>
            </Box>

            <Tabs
              value={tab}
              onChange={(_, nextTab) => setTab(nextTab)}
              variant="fullWidth"
              sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                ".MuiTab-root": {
                  minHeight: 54,
                  fontWeight: 800,
                },
              }}
            >
              {symbolTabs.map((symbolTab) => (
                <Tab
                  key={symbolTab.label}
                  icon={symbolTab.icon}
                  iconPosition="start"
                  label={symbolTab.label}
                />
              ))}
            </Tabs>
          </Stack>
        </Paper>

        <Box>{symbolTabs[tab].panel}</Box>
      </Stack>
    </Container>
  );
}
