import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import {
  AppBar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from "@mui/material";

import GeekLogo from "../assets/GEEKD-Logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PrizingIcon from "@mui/icons-material/EmojiEvents";
import MoneyIcon from "@mui/icons-material/Money";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import TimerIcon from "@mui/icons-material/Timer";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";

const RESERVATION_PROFILE_REQUIRED_KEY =
  "geekd.reservations.profileRequired";

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (link: string) => {
    const profileRequired =
      window.localStorage.getItem(RESERVATION_PROFILE_REQUIRED_KEY) === "true";

    if (location.pathname === "/reservations" && profileRequired) {
      window.alert("Finish your reservation profile before leaving this page.");
      handleClose();
      return;
    }

    handleClose();
    navigate({ to: link });
  };

  return (
    <Box sx={{ pb: 7 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Box
            component="button"
            type="button"
            onClick={() => handleNavigation("/")}
            sx={{
              p: 0,
              border: 0,
              bgcolor: "transparent",
              cursor: "pointer",
              lineHeight: 0,
            }}
            aria-label="Go home"
          >
            <img
              src={GeekLogo}
              style={{
                width: "72px",
              }}
            />
          </Box>

          <Stack direction="row" sx={{ ml: "auto" }}>
            <IconButton onClick={handleClick} sx={{ ml: "auto" }}>
              <MenuIcon color="secondary" />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              <MenuItem onClick={() => handleNavigation("/")}>
                <ListItemIcon>
                  <HomeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("/cash-calculator")}>
                <ListItemIcon>
                  <MoneyIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cash Calculator</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("/prizing")}>
                <ListItemIcon>
                  <PrizingIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Prizing Calculator</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("/set-symbols")}>
                <ListItemIcon>
                  <AutoFixHighIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Set Symbols</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("/timer-controller")}>
                <ListItemIcon>
                  <TimerIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Timer Controller</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("/reservations")}>
                <ListItemIcon>
                  <EventAvailableIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Reservations</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("/info-hub")}>
                <ListItemIcon>
                  <ArticleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Info Hub</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("/account")}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Account</ListItemText>
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      <Outlet />
    </Box>
  );
}
