import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

export default function LootLegacyRedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/loot-tracker", replace: true });
  }, [navigate]);

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <CircularProgress size={22} />
        <Typography>Redirecting to Loot Dashboard...</Typography>
      </Stack>
    </Box>
  );
}
