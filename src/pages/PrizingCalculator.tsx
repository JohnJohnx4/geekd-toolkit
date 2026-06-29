import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Stack,
  Divider,
  Chip,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";

import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDropDown";

/**
 * Staircase prizing logic
 */
function calculateStaircasePrizing(
  playerCount: number,
  topCut: number,
  packsPerPlayer = 2,
): number[] {
  const totalPacks = playerCount * packsPerPlayer;
  if (topCut <= 0 || topCut > totalPacks) return [];

  const packs = Array(topCut).fill(0);
  let remaining = totalPacks;
  let passSize = topCut;

  while (remaining > 0) {
    for (let i = 0; i < passSize && remaining > 0; i++) {
      packs[i] += 1;
      remaining -= 1;
    }
    passSize -= 1;
    if (passSize === 0) passSize = topCut;
  }

  return packs;
}

function calculateEvenPrizing(
  playerCount: number,
  topCut: number,
  packsPerPlayer = 2,
): number[] {
  const totalPacks = playerCount * packsPerPlayer;
  if (topCut <= 0 || topCut > totalPacks) return [];

  const basePacks = Math.floor(totalPacks / topCut);
  const extraPacks = totalPacks % topCut;

  return Array.from(
    { length: topCut },
    (_, index) => basePacks + (index < extraPacks ? 1 : 0),
  );
}

const cleanNumericDisplayValue = (value: string) => {
  if (value === "") return "";

  if (value.includes(".")) {
    const [whole, decimal] = value.split(".");
    const cleanedWhole = whole.replace(/^0+(?=\d)/, "") || "0";
    return `${cleanedWhole}.${decimal ?? ""}`;
  }

  return value.replace(/^0+(?=\d)/, "");
};

export default function StaircasePrizingCalculator() {
  const [players, setPlayers] = useState("16");
  const [topCut, setTopCut] = useState("4");
  const [creditPerPack, setCreditPerPack] = useState("4");
  const [packsPerEntry, setPacksPerEntry] = useState("2");
  const [useEvenSplit, setUseEvenSplit] = useState(false);
  const packsPerEntryNum = Number(packsPerEntry) || 0;

  const playersNum = Number(players) || 0;
  const topCutNum = Number(topCut) || 0;
  const creditNum = Number(creditPerPack) || 0;

  const prizes = useMemo(
    () =>
      useEvenSplit
        ? calculateEvenPrizing(playersNum, topCutNum, packsPerEntryNum)
        : calculateStaircasePrizing(playersNum, topCutNum, packsPerEntryNum),
    [playersNum, topCutNum, packsPerEntryNum, useEvenSplit],
  );

  const basePrizes = useMemo(
    () =>
      useEvenSplit
        ? calculateEvenPrizing(playersNum, topCutNum, packsPerEntryNum)
        : calculateStaircasePrizing(playersNum, topCutNum, packsPerEntryNum),
    [playersNum, topCutNum, packsPerEntryNum, useEvenSplit],
  );

  const [editablePrizes, setEditablePrizes] = useState<number[]>(basePrizes);

  const totalPacks = playersNum * packsPerEntryNum;

  const totalCredit = totalPacks * creditNum;
  const hasManualChanges =
    editablePrizes.length !== basePrizes.length ||
    editablePrizes.some((packs, index) => packs !== basePrizes[index]);

  const handleIncrement = (target: string) => {
    if (target === "packsPerEntry") {
      setPacksPerEntry((prev) => String(Number(prev) + 1));
    } else if (target === "players") {
      setPlayers((prev) => {
        const num = Number(prev);
        return num < 0 ? "0" : String(num + 1);
      });
    } else if (target === "topCut") {
      setTopCut((prev) => {
        const num = Number(prev);
        return num < 0 ? "0" : String(num + 1);
      });
    } else if (target === "creditPerPack") {
      setCreditPerPack((prev) => {
        const num = Number(prev);
        return num < 0 ? "0" : String(num + 1);
      });
    }
  };

  const handleDecrement = (target: string) => {
    if (target === "packsPerEntry") {
      setPacksPerEntry((prev) =>
        Number(prev) <= 0 ? "0" : String(Number(prev) - 1),
      );
    } else if (target === "players") {
      setPlayers((prev) => {
        const num = Number(prev);
        return num <= 1 ? "1" : String(num - 1);
      });
    } else if (target === "topCut") {
      setTopCut((prev) => {
        const num = Number(prev);
        return num <= 1 ? "1" : String(num - 1);
      });
    } else if (target === "creditPerPack") {
      setCreditPerPack((prev) => {
        const num = Number(prev);
        return num <= 0 ? "0" : String(num - 1);
      });
    }
  };

  const movePackUp = (index: number) => {
    if (index === 0) return;

    setEditablePrizes((prev) => {
      if (prev[index] <= 0) return prev;

      const next = [...prev];
      next[index] -= 1;
      next[index - 1] += 1;
      return next;
    });
  };

  const movePackDown = (index: number) => {
    if (index === editablePrizes.length - 1) return;

    setEditablePrizes((prev) => {
      if (prev[index] <= 0) return prev;

      const next = [...prev];
      next[index] -= 1;
      next[index + 1] += 1;
      return next;
    });
  };

  useEffect(() => {
    setEditablePrizes(basePrizes);
  }, [basePrizes]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "360px minmax(0, 1fr)" },
          gap: { xs: 2, md: 3 },
          alignItems: "start",
        }}
      >
        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  Tournament Prizing
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Set attendance, entry packs, and credit rate.
                </Typography>
              </Box>

              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.75,
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={useEvenSplit}
                      onChange={(event) =>
                        setUseEvenSplit(event.target.checked)
                      }
                    />
                  }
                  label={useEvenSplit ? "Even split" : "Pyramid split"}
                  sx={{
                    m: 0,
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                />
              </Box>

              <Stack spacing={1.5}>
                <Stack direction="row" alignItems="center">
                  <IconButton onClick={() => handleDecrement("players")}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <TextField
                    label="Players"
                    type="number"
                    value={players}
                    onChange={(e) =>
                      setPlayers(cleanNumericDisplayValue(e.target.value))
                    }
                    onBlur={() => {
                      if (Number(players) < 0) setPlayers("0");
                    }}
                    fullWidth
                  />
                  <IconButton onClick={() => handleIncrement("players")}>
                    <ControlPointIcon />
                  </IconButton>
                </Stack>

                <Stack direction="row" alignItems="center">
                  <IconButton onClick={() => handleDecrement("packsPerEntry")}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>

                  <TextField
                    label="Packs per Entry"
                    type="number"
                    value={packsPerEntry}
                    onChange={(e) =>
                      setPacksPerEntry(cleanNumericDisplayValue(e.target.value))
                    }
                    onBlur={() => {
                      if (Number(packsPerEntry) < 0) setPacksPerEntry("0");
                    }}
                    fullWidth
                  />

                  <IconButton onClick={() => handleIncrement("packsPerEntry")}>
                    <ControlPointIcon />
                  </IconButton>
                </Stack>

                <Stack direction="row" alignItems="center">
                  <IconButton onClick={() => handleDecrement("topCut")}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <TextField
                    label="Top Cut"
                    type="number"
                    value={topCut}
                    onChange={(e) =>
                      setTopCut(cleanNumericDisplayValue(e.target.value))
                    }
                    onBlur={() => {
                      if (Number(topCut) < 0) setTopCut("0");
                    }}
                    fullWidth
                  />
                  <IconButton onClick={() => handleIncrement("topCut")}>
                    <ControlPointIcon />
                  </IconButton>
                </Stack>

                <Stack direction="row" alignItems="center">
                  <IconButton onClick={() => handleDecrement("creditPerPack")}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Credit per Pack Rate
                    </InputLabel>
                    <OutlinedInput
                      type="number"
                      value={creditPerPack}
                      onChange={(e) =>
                        setCreditPerPack(
                          cleanNumericDisplayValue(e.target.value),
                        )
                      }
                      fullWidth
                      id="outlined-adornment-amount"
                      label="Credit per Pack Rate"
                      onBlur={() => {
                        if (Number(creditPerPack) < 0) setCreditPerPack("0");
                      }}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                    />
                  </FormControl>
                  <IconButton onClick={() => handleIncrement("creditPerPack")}>
                    <ControlPointIcon />
                  </IconButton>
                </Stack>
              </Stack>

              <Divider />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "grey.100",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Total Packs
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {totalPacks}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "grey.100",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Store Credit
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    ${totalCredit}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
            <Stack spacing={2}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Prize Distribution
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {useEvenSplit
                      ? "Even split keeps prizes as close as possible."
                      : "Pyramid split favors higher placements."}{" "}
                    Use arrows to redistribute packs if needed.
                  </Typography>
                </Box>

                <Button
                  disabled={!hasManualChanges}
                  variant="outlined"
                  color="error"
                  onClick={() => setEditablePrizes(basePrizes)}
                >
                  Reset Manual Distributions
                </Button>
              </Stack>

              <Divider />

              {prizes.length === 0 ? (
                <Typography color="error" textAlign="center" variant="body2">
                  Not enough packs to support this top cut.
                </Typography>
              ) : (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      lg: "repeat(2, minmax(0, 1fr))",
                    },
                    gap: 1.25,
                  }}
                >
                  {editablePrizes.map((packs, index) => {
                    const credit = packs * Number(creditPerPack);

                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 1,
                          p: 1.25,
                          minHeight: 58,
                          width: "100%",
                          borderRadius: 2,
                          bgcolor: index === 0 ? "info.light" : "primary.light",
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ minWidth: 0 }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "white",
                              fontWeight: 800,
                              minWidth: 28,
                            }}
                          >
                            {index + 1}
                            {index === 0
                              ? "st"
                              : index === 1
                                ? "nd"
                                : index === 2
                                  ? "rd"
                                  : "th"}
                          </Typography>

                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ flexWrap: "wrap", rowGap: 0.5 }}
                          >
                            <Chip
                              label={`${packs} packs`}
                              size="small"
                              color={index === 0 ? "primary" : "info"}
                              sx={{ color: "white" }}
                            />
                            <Chip
                              label={`$${credit}`}
                              size="small"
                              variant="outlined"
                              sx={{ color: "white", borderColor: "white" }}
                            />
                          </Stack>
                        </Stack>
                        <Stack direction="row" sx={{ flexShrink: 0 }}>
                          {index !== 0 && (
                            <IconButton
                              size="small"
                              sx={{ color: "white" }}
                              onClick={() => movePackUp(index)}
                            >
                              <ArrowUpwardIcon />
                            </IconButton>
                          )}
                          {index < editablePrizes.length - 1 && (
                            <IconButton
                              size="small"
                              sx={{ color: "white" }}
                              onClick={() => movePackDown(index)}
                            >
                              <ArrowDownwardIcon />
                            </IconButton>
                          )}
                        </Stack>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
