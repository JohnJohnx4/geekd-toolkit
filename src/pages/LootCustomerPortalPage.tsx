import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";
import AssignmentIcon from "@mui/icons-material/Assignment";

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
        </Stack>
      </Container>
    </Box>
  );
}
