import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveIcon from "@mui/icons-material/Remove";
import StyleIcon from "@mui/icons-material/Style";

type CountValue = number | "";

type CardDenomination = {
  label: string;
  value: number;
  count: CountValue;
};

const parseCount = (count: CountValue) => {
  if (count === "") return 0;
  return Number.isFinite(count) ? count : 0;
};

const formatMoney = (amount: number) =>
  amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const createDenominations = () => {
  const denoms: CardDenomination[] = [
    { label: "Bulk", value: 0, count: 0 },
    { label: "$0.25", value: 0.25, count: 0 },
  ];

  for (let value = 0.5; value <= 25; value += 0.5) {
    denoms.push({
      label: `$${formatMoney(value).replace(/\.00$/, "")}`,
      value,
      count: 0,
    });
  }

  return denoms;
};

export default function CardStackCalculator() {
  const [denominations, setDenominations] = useState<CardDenomination[]>(
    createDenominations
  );
  const [offerPercent, setOfferPercent] = useState<CountValue>(60);

  const totals = useMemo(() => {
    const [bulk, ...pricedDenoms] = denominations;
    const bulkCount = parseCount(bulk.count);
    const bulkValue = bulkCount * bulk.value;
    const pricedCardCount = pricedDenoms.reduce(
      (sum, denom) => sum + parseCount(denom.count),
      0
    );
    const pricedValue = pricedDenoms.reduce(
      (sum, denom) => sum + parseCount(denom.count) * denom.value,
      0
    );
    const offerRate = Math.max(0, parseCount(offerPercent)) / 100;
    const offerValue = pricedValue * offerRate;
    const activeStacks = denominations.filter(
      (denom) => parseCount(denom.count) > 0
    ).length;

    return {
      bulkCount,
      bulkValue,
      pricedCardCount,
      pricedValue,
      offerValue,
      activeStacks,
      combinedPayout: bulkValue + offerValue,
    };
  }, [denominations, offerPercent]);

  const updateCount = (index: number, count: CountValue) => {
    setDenominations((prev) =>
      prev.map((denom, denomIndex) =>
        denomIndex === index
          ? {
              ...denom,
              count: count === "" ? "" : Math.max(0, Math.floor(count)),
            }
          : denom
      )
    );
  };

  const updateBulkValue = (value: number) => {
    setDenominations((prev) =>
      prev.map((denom, index) =>
        index === 0 ? { ...denom, value: Math.max(0, value) } : denom
      )
    );
  };

  const adjustCount = (index: number, delta: number) => {
    setDenominations((prev) =>
      prev.map((denom, denomIndex) =>
        denomIndex === index
          ? {
              ...denom,
              count: Math.max(0, parseCount(denom.count) + delta),
            }
          : denom
      )
    );
  };

  const clearStack = (index: number) => updateCount(index, 0);

  const clearAll = () => {
    setDenominations((prev) =>
      prev.map((denom) => ({
        ...denom,
        count: 0,
      }))
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
      <Stack spacing={2}>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <StyleIcon color="primary" />
                <Typography variant="h1" sx={{ fontSize: { xs: 30, sm: 42 } }}>
                  Card Stack Calculator
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                Count sorted stacks, keep bulk separate, and calculate the offer on
                priced cards.
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                  gap: 1,
                }}
              >
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Bulk Value
                    </Typography>
                    <Typography variant="h4">
                      ${formatMoney(totals.bulkValue)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {totals.bulkCount} bulk cards
                    </Typography>
                  </CardContent>
                </Card>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Priced Card Value
                    </Typography>
                    <Typography variant="h4">
                      ${formatMoney(totals.pricedValue)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {totals.pricedCardCount} priced cards
                    </Typography>
                  </CardContent>
                </Card>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Offer Amount
                    </Typography>
                    <Typography variant="h4">
                      ${formatMoney(totals.offerValue)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {parseCount(offerPercent)}% of priced cards
                    </Typography>
                  </CardContent>
                </Card>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Combined Payout
                    </Typography>
                    <Typography variant="h4">
                      ${formatMoney(totals.combinedPayout)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bulk plus offer
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                <TextField
                  label="Offer percentage"
                  type="number"
                  value={offerPercent}
                  onChange={(event) =>
                    setOfferPercent(
                      event.target.value === "" ? "" : Number(event.target.value)
                    )
                  }
                  inputProps={{
                    min: 0,
                    step: 1,
                    inputMode: "numeric",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  sx={{ minWidth: { sm: 220 } }}
                />

                <Button
                  color="error"
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={clearAll}
                >
                  Clear All
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Stack spacing={1.25}>
          {denominations.map((denom, index) => {
            const count = parseCount(denom.count);
            const stackTotal = count * denom.value;
            const isBulk = index === 0;

            return (
              <Card key={denom.label} variant="outlined">
                <CardContent>
                  <Stack spacing={1.5}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={1}
                    >
                      <Box>
                        <Typography variant="h6">{denom.label}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${formatMoney(stackTotal)}
                        </Typography>
                      </Box>
                      <Chip label={`${count} cards`} />
                    </Stack>

                    <Divider />

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1.5}
                      alignItems={{ xs: "stretch", sm: "center" }}
                    >
                      {isBulk ? (
                        <TextField
                          label="Bulk value"
                          type="number"
                          value={denom.value}
                          onChange={(event) =>
                            updateBulkValue(Number(event.target.value) || 0)
                          }
                          inputProps={{
                            min: 0,
                            step: 0.01,
                            inputMode: "decimal",
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">$</InputAdornment>
                            ),
                          }}
                          sx={{ minWidth: { sm: 150 } }}
                        />
                      ) : null}

                      <TextField
                        label="Card count"
                        type="number"
                        value={denom.count}
                        onChange={(event) =>
                          updateCount(
                            index,
                            event.target.value === ""
                              ? ""
                              : Number(event.target.value)
                          )
                        }
                        inputProps={{
                          min: 0,
                          step: 1,
                          inputMode: "numeric",
                        }}
                        sx={{ flex: 1 }}
                      />

                      <Stack
                        direction="row"
                        spacing={0.5}
                        justifyContent="center"
                        sx={{ minWidth: { sm: 104 } }}
                      >
                        <IconButton
                          size="large"
                          color="primary"
                          onClick={() => adjustCount(index, -1)}
                          aria-label={`Decrease ${denom.label} count`}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <IconButton
                          size="large"
                          color="primary"
                          onClick={() => adjustCount(index, 1)}
                          aria-label={`Increase ${denom.label} count`}
                        >
                          <AddIcon />
                        </IconButton>
                      </Stack>

                      <Button
                        color="error"
                        variant="text"
                        startIcon={<ClearIcon />}
                        onClick={() => clearStack(index)}
                      >
                        Clear
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Stack>
    </Container>
  );
}
