import React from "react";
import ReactDOM from "react-dom/client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./Router";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#00072A" },
    secondary: { main: "#46e83d" },
    // You can tweak later
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "'Rubik', 'Helvetica', 'Arial', sans-serif",
    h1: { fontSize: "1.75rem", fontWeight: 800, lineHeight: 1.2 },
    h2: { fontSize: "1.15rem", fontWeight: 800, lineHeight: 1.25 },
    h3: { fontSize: "1rem", fontWeight: 800, lineHeight: 1.3 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
