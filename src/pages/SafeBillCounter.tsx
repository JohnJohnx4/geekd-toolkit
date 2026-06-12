import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import DownloadIcon from "@mui/icons-material/Download";

type CountValue = number | "";

type BillDenomination = {
  label: string;
  value: number;
  count: CountValue;
};

const BILL_DENOMS: BillDenomination[] = [
  { label: "$100", value: 100, count: 0 },
  { label: "$50", value: 50, count: 0 },
  { label: "$20", value: 20, count: 0 },
  { label: "$10", value: 10, count: 0 },
  { label: "$5", value: 5, count: 0 },
  { label: "$1", value: 1, count: 0 },
];

const HOLD_DELAY_MS = 350;
const HOLD_REPEAT_MS = 90;

const parseCount = (count: CountValue) => {
  if (count === "") return 0;
  return Number.isFinite(count) ? count : 0;
};

const formatMoney = (amount: number) =>
  amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function SafeBillCounter() {
  const [bills, setBills] = useState<BillDenomination[]>(BILL_DENOMS);
  const [depositsVerified, setDepositsVerified] = useState(false);
  const [counterfeitsChecked, setCounterfeitsChecked] = useState(false);
  const repeatDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const repeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const suppressClickRef = useRef(false);

  const total = useMemo(
    () => bills.reduce((sum, bill) => sum + parseCount(bill.count) * bill.value, 0),
    [bills]
  );

  const updateBill = (index: number, count: CountValue) => {
    setBills((prev) =>
      prev.map((bill, i) =>
        i === index
          ? {
              ...bill,
              count: count === "" ? "" : Math.max(0, Math.floor(count)),
            }
          : bill
      )
    );
  };

  const adjustBill = (index: number, delta: number) => {
    setBills((prev) =>
      prev.map((bill, i) =>
        i === index
          ? { ...bill, count: Math.max(0, parseCount(bill.count) + delta) }
          : bill
      )
    );
  };

  const clearBill = (index: number) => updateBill(index, 0);

  const clearAll = () => {
    setBills((prev) => prev.map((bill) => ({ ...bill, count: 0 })));
  };

  const stopHoldRepeat = useCallback(() => {
    if (repeatDelayRef.current) {
      clearTimeout(repeatDelayRef.current);
      repeatDelayRef.current = null;
    }

    if (repeatIntervalRef.current) {
      clearInterval(repeatIntervalRef.current);
      repeatIntervalRef.current = null;
    }
  }, []);

  const startHoldRepeat = useCallback(
    (action: () => void, event: PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      suppressClickRef.current = true;
      stopHoldRepeat();
      action();

      repeatDelayRef.current = setTimeout(() => {
        action();
        repeatIntervalRef.current = setInterval(action, HOLD_REPEAT_MS);
      }, HOLD_DELAY_MS);
    },
    [stopHoldRepeat]
  );

  const handleRepeatClick = (action: () => void) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    action();
  };

  useEffect(() => stopHoldRepeat, [stopHoldRepeat]);

  const createSafeCountCanvas = () => {
    const countedBills = bills
      .map((bill) => ({
        label: bill.label,
        count: parseCount(bill.count),
        total: parseCount(bill.count) * bill.value,
      }))
      .filter((bill) => bill.count > 0);
    const rows =
      countedBills.length > 0
        ? countedBills
        : [{ label: "No bills counted", count: 0, total: 0 }];
    const width = 440;
    const rowHeight = 28;
    const summaryY = 160 + rows.length * rowHeight;
    const height = summaryY + 150;
    const canvas = document.createElement("canvas");
    const scale = window.devicePixelRatio || 1;

    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d");
    if (!context) return null;

    context.scale(scale, scale);
    context.fillStyle = "#fffdf7";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "#d8d2c2";
    context.strokeRect(0.5, 0.5, width - 1, height - 1);

    const drawDivider = (y: number) => {
      context.strokeStyle = "#d8d2c2";
      context.beginPath();
      context.moveTo(28, y);
      context.lineTo(width - 28, y);
      context.stroke();
    };

    context.fillStyle = "#1f1f1f";
    context.textAlign = "center";
    context.font = "800 24px Rubik, Arial, sans-serif";
    context.fillText("Safe Bill Count", width / 2, 42);
    context.font = "400 13px Rubik, Arial, sans-serif";
    context.fillStyle = "#555";
    context.fillText(new Date().toLocaleString(), width / 2, 66);
    drawDivider(88);

    context.textAlign = "left";
    context.font = "700 13px Rubik, Arial, sans-serif";
    context.fillStyle = "#333";
    context.fillText("Bill", 32, 116);
    context.textAlign = "center";
    context.fillText("Qty", width / 2, 116);
    context.textAlign = "right";
    context.fillText("Total", width - 32, 116);

    context.font = "400 15px Rubik, Arial, sans-serif";
    rows.forEach((row, index) => {
      const y = 148 + index * rowHeight;

      context.fillStyle = "#1f1f1f";
      context.textAlign = "left";
      context.fillText(row.label, 32, y);
      context.textAlign = "center";
      context.fillText(String(row.count), width / 2, y);
      context.textAlign = "right";
      context.fillText(`$${formatMoney(row.total)}`, width - 32, y);
    });

    drawDivider(summaryY);

    context.font = "800 22px Rubik, Arial, sans-serif";
    context.textAlign = "left";
    context.fillText("Safe Total", 32, summaryY + 38);
    context.textAlign = "right";
    context.fillText(`$${formatMoney(total)}`, width - 32, summaryY + 38);

    drawDivider(summaryY + 62);

    context.font = "500 14px Rubik, Arial, sans-serif";
    context.textAlign = "left";
    context.fillStyle = "#333";
    context.fillText(
      `${depositsVerified ? "[✓]" : "[ ]"} Deposits counted correctly`,
      32,
      summaryY + 92
    );
    context.fillText(
      `${counterfeitsChecked ? "[✓]" : "[ ]"} $20+ bills checked for counterfeits`,
      32,
      summaryY + 118
    );

    return canvas;
  };

  const handleExportSafeCount = () => {
    const canvas = createSafeCountCanvas();
    if (!canvas) return;

    const link = document.createElement("a");
    const dateSlug = new Date().toISOString().slice(0, 10);
    link.download = `safe-count-${dateSlug}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      <Card sx={{ maxWidth: 560, mx: "auto", borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Safe Bill Counter
          </Typography>

          <Button
            variant="contained"
            fullWidth
            startIcon={<DownloadIcon />}
            onClick={handleExportSafeCount}
            sx={{ mb: 2 }}
          >
            Export Safe Count
          </Button>

          <Card variant="outlined" sx={{ borderRadius: 2, p: 1.5, mb: 2 }}>
            <Stack spacing={0.5}>
              <Typography fontWeight={800}>Closing Checks</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={depositsVerified}
                    onChange={(event) =>
                      setDepositsVerified(event.target.checked)
                    }
                  />
                }
                label="All deposits counted correctly"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={counterfeitsChecked}
                    onChange={(event) =>
                      setCounterfeitsChecked(event.target.checked)
                    }
                  />
                }
                label="$20+ bills checked for counterfeits"
              />
            </Stack>
          </Card>

          <Button
            variant="outlined"
            color="error"
            fullWidth
            startIcon={<ClearIcon />}
            onClick={clearAll}
            sx={{ mb: 2 }}
          >
            Clear Safe Count
          </Button>

          <Stack spacing={2}>
            {bills.map((bill, index) => {
              const amount = parseCount(bill.count) * bill.value;

              return (
                <Card
                  key={bill.value}
                  variant="outlined"
                  sx={{ borderRadius: 2, p: 1.5 }}
                >
                  <Stack spacing={1}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Stack spacing={0.25}>
                        <Typography fontWeight={800}>{bill.label}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${formatMoney(amount)}
                        </Typography>
                      </Stack>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<ClearIcon />}
                        onClick={() => clearBill(index)}
                      >
                        Clear
                      </Button>
                    </Stack>

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Tooltip title="Hold to count faster" arrow>
                        <IconButton
                          size="large"
                          onPointerDown={(event) =>
                            startHoldRepeat(() => adjustBill(index, -1), event)
                          }
                          onPointerUp={stopHoldRepeat}
                          onPointerLeave={stopHoldRepeat}
                          onPointerCancel={stopHoldRepeat}
                          onClick={() =>
                            handleRepeatClick(() => adjustBill(index, -1))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                      </Tooltip>

                      <TextField
                        label="Bills"
                        type="number"
                        value={bill.count}
                        onChange={(event) =>
                          updateBill(
                            index,
                            event.target.value === ""
                              ? ""
                              : Number(event.target.value)
                          )
                        }
                        inputProps={{
                          inputMode: "numeric",
                          style: { textAlign: "center", fontSize: 18 },
                        }}
                        sx={{ width: 120 }}
                      />

                      <Tooltip title="Hold to count faster" arrow>
                        <IconButton
                          size="large"
                          onPointerDown={(event) =>
                            startHoldRepeat(() => adjustBill(index, 1), event)
                          }
                          onPointerUp={stopHoldRepeat}
                          onPointerLeave={stopHoldRepeat}
                          onPointerCancel={stopHoldRepeat}
                          onClick={() =>
                            handleRepeatClick(() => adjustBill(index, 1))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>
                </Card>
              );
            })}
          </Stack>
        </CardContent>
      </Card>

      <Box
        position="sticky"
        bottom={0}
        bgcolor="background.paper"
        zIndex={99}
        py={2}
        my={4}
      >
        <Divider />
        <Stack direction="row" justifyContent="space-between" my={2} px={2} maxWidth={560} mx="auto">
          <Typography fontSize={18} fontWeight={900}>
            Safe Total
          </Typography>
          <Typography fontSize={18} fontWeight={900}>
            ${formatMoney(total)}
          </Typography>
        </Stack>
      </Box>
    </>
  );
}
