import { Box } from "@mui/material";

export default function CardShowDealDeskPage() {
  return (
    <Box
      component="iframe"
      title="Card Show Deal Desk"
      src={`${import.meta.env.BASE_URL}card-show-deal-desk.html`}
      sx={{
        display: "block",
        width: "100%",
        height: { xs: "calc(100dvh - 56px)", sm: "calc(100dvh - 64px)" },
        border: 0,
      }}
    />
  );
}
