import { Box, Container, Paper, Stack, Typography } from "@mui/material";

const LandingPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Stack spacing={1.5}>
          <Typography variant="h1">Geek'd Toolkit</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
            Tools for store operations, release reservations, event support, and
            loot tracking now live in the sidebar. Pick a section from the left
            to get started.
          </Typography>
        </Stack>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: 2,
          mt: 3,
        }}
      >
        {[
          ["Toolkit", "Cash, prizing, timers, set symbols, and employee info."],
          ["Reservations", "Employee release requests and account management."],
          ["Loot Tracker", "Buys, customers, inventory, card shows, and analytics."],
        ].map(([title, body]) => (
          <Paper
            key={title}
            elevation={0}
            sx={{
              p: 2.5,
              border: "1px solid",
              borderColor: "divider",
              minHeight: 130,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {title}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {body}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default LandingPage;
