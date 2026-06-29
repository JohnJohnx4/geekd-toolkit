import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { MouseEvent as ReactMouseEvent, PointerEvent } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SafeBillCounter from "./SafeBillCounter";

type CountValue = number | "";

type CashDenomination = {
  label: string;
  value: number;
  count: CountValue;
};

type RegisterDrawer = {
  id: number;
  name: string;
  enabled: boolean;
  bills: CashDenomination[];
  coins: CashDenomination[];
};

type ClearMenuAction = {
  label: string;
  onClick: () => void;
};

type ClearMenuState = {
  anchorEl: HTMLElement;
  actions: ClearMenuAction[];
} | null;

const parseCount = (count: CountValue) => {
  if (count === "") return 0;
  return Number.isFinite(count) ? count : 0;
};

const formatMoney = (amount: number) =>
  amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const HOLD_DELAY_MS = 350;
const HOLD_REPEAT_MS = 90;
const HOLD_MOVE_CANCEL_PX = 8;
const HOLD_TIP_STORAGE_KEY = "cashCounterHoldTipShows";
const HOLD_TIP_DISMISSED_STORAGE_KEY = "cashCounterHoldTipDismissed";
const DEPOSIT_PROGRESS_STORAGE_KEY = "cashCounterDepositProgress";
const HOLD_TIP_MAX_SHOWS = 3;
const HOLD_TIP_HIDE_MS = 1800;
const DEFAULT_DRAWER_TARGET = 300;
const MAX_BILLS_PER_DENOM = 25;
const DRAWER_COUNT = 3;
const REVIEW_STEP = DRAWER_COUNT;

const BILL_DENOMS = [
  { label: "$100", value: 100 },
  { label: "$50", value: 50 },
  { label: "$20", value: 20 },
  { label: "$10", value: 10 },
  { label: "$5", value: 5 },
  { label: "$1", value: 1 },
];

const COIN_DENOMS = [
  { label: "25c", value: 0.25 },
  { label: "10c", value: 0.1 },
  { label: "5c", value: 0.05 },
  { label: "1c", value: 0.01 },
];

const createRegister = (index: number): RegisterDrawer => ({
  id: index + 1,
  name: `Register ${index + 1}`,
  enabled: true,
  bills: BILL_DENOMS.map((d) => ({ ...d, count: 0 })),
  coins: COIN_DENOMS.map((d) => ({ ...d, count: 0 })),
});

const isCountValue = (value: unknown): value is CountValue =>
  value === "" || (typeof value === "number" && Number.isFinite(value));

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object";

const hydrateDenoms = (
  savedDenoms: unknown,
  baseDenoms: CashDenomination[]
): CashDenomination[] => {
  if (!Array.isArray(savedDenoms)) return baseDenoms;

  return baseDenoms.map((baseDenom) => {
    const savedDenom = savedDenoms.find(
      (denom) => isRecord(denom) && denom.value === baseDenom.value
    );

    if (isRecord(savedDenom) && isCountValue(savedDenom.count)) {
      return { ...baseDenom, count: savedDenom.count };
    }

    return baseDenom;
  });
};

const readSavedDepositDrawers = (): RegisterDrawer[] | null => {
  if (typeof window === "undefined") return null;

  try {
    const storedValue = window.localStorage.getItem(DEPOSIT_PROGRESS_STORAGE_KEY);
    if (!storedValue) return null;

    const parsedValue = JSON.parse(storedValue);
    if (!isRecord(parsedValue)) return null;

    const savedDrawers = parsedValue.drawers ?? parsedValue;
    if (!Array.isArray(savedDrawers)) return null;

    return Array.from({ length: DRAWER_COUNT }, (_, index) => {
      const baseDrawer = createRegister(index);
      const savedDrawer = savedDrawers.find(
        (drawer) => isRecord(drawer) && drawer.id === baseDrawer.id
      );

      if (!isRecord(savedDrawer)) return baseDrawer;

      return {
        ...baseDrawer,
        enabled: true,
        bills: hydrateDenoms(savedDrawer.bills, baseDrawer.bills),
        coins: hydrateDenoms(savedDrawer.coins, baseDrawer.coins),
      };
    });
  } catch {
    return null;
  }
};

const readSavedDepositStep = () => {
  if (typeof window === "undefined") return 0;

  try {
    const storedValue = window.localStorage.getItem(DEPOSIT_PROGRESS_STORAGE_KEY);
    if (!storedValue) return 0;

    const parsedValue = JSON.parse(storedValue);
    if (!isRecord(parsedValue) || typeof parsedValue.currentStep !== "number") {
      return 0;
    }

    return Math.min(REVIEW_STEP, Math.max(0, Math.floor(parsedValue.currentStep)));
  } catch {
    return 0;
  }
};

const getBillTotal = (drawer: RegisterDrawer) =>
  drawer.bills.reduce((sum, d) => sum + parseCount(d.count) * d.value, 0);

const getCoinTotal = (drawer: RegisterDrawer) =>
  drawer.coins.reduce((sum, d) => sum + parseCount(d.count) * d.value, 0);

const isBetterLowerBillPlan = (next: number[], current: number[]) => {
  for (let index = next.length - 1; index >= 0; index -= 1) {
    if (next[index] !== current[index]) {
      return next[index] > current[index];
    }
  }

  return false;
};

const getBillsLeftPlan = (bills: CashDenomination[], required: number) => {
  const emptyCounts = bills.map(() => 0);

  if (required <= 0) {
    return { amount: 0, counts: emptyCounts };
  }

  const billOptions = bills.map((bill, index) => ({
    index,
    value: bill.value,
    count:
      bill.value >= 50
        ? 0
        : Math.min(parseCount(bill.count), MAX_BILLS_PER_DENOM),
  }));
  const maxPossible = billOptions.reduce(
    (sum, bill) => sum + bill.value * bill.count,
    0
  );

  if (maxPossible <= required) {
    return {
      amount: maxPossible,
      counts: billOptions.reduce((counts, bill) => {
        counts[bill.index] = bill.count;
        return counts;
      }, [...emptyCounts]),
    };
  }

  const possible = new Map<number, number[]>();
  possible.set(0, emptyCounts);

  billOptions.forEach((bill) => {
    const current = Array.from(possible.entries());

    for (let count = 1; count <= bill.count; count += 1) {
      current.forEach(([amount, counts]) => {
        const nextAmount = amount + bill.value * count;

        if (nextAmount <= maxPossible) {
          const nextCounts = [...counts];
          nextCounts[bill.index] += count;
          const existingCounts = possible.get(nextAmount);

          if (
            !existingCounts ||
            isBetterLowerBillPlan(nextCounts, existingCounts)
          ) {
            possible.set(nextAmount, nextCounts);
          }
        }
      });
    }
  });

  for (let amount = required; amount <= maxPossible; amount += 1) {
    const counts = possible.get(amount);

    if (counts) {
      return { amount, counts };
    }
  }

  return {
    amount: maxPossible,
    counts: billOptions.reduce((counts, bill) => {
      counts[bill.index] = bill.count;
      return counts;
    }, [...emptyCounts]),
  };
};

const getDrawerTotals = (drawer: RegisterDrawer) => {
  const billTotal = getBillTotal(drawer);
  const coinTotal = getCoinTotal(drawer);
  const target = DEFAULT_DRAWER_TARGET;
  const billsNeededToLeave = Math.ceil(Math.max(0, target - coinTotal));
  const billsLeftPlan = getBillsLeftPlan(drawer.bills, billsNeededToLeave);
  const billsLeft = billsLeftPlan.amount;
  const deposit = Math.max(0, billTotal - billsLeft);
  const leftInDrawer = coinTotal + billsLeft;

  return {
    billTotal,
    coinTotal,
    target,
    countedTotal: billTotal + coinTotal,
    billsLeft,
    billsLeftPlan: drawer.bills
      .map((bill, index) => ({
        label: bill.label,
        value: bill.value,
        count: billsLeftPlan.counts[index],
        total: billsLeftPlan.counts[index] * bill.value,
      }))
      .filter((bill) => bill.count > 0),
    leftInDrawer,
    deposit,
  };
};

export default function CashCalculator() {
  const [activeTab, setActiveTab] = useState(0);
  const [drawers, setDrawers] = useState<RegisterDrawer[]>(() =>
    readSavedDepositDrawers() ??
    Array.from({ length: DRAWER_COUNT }, (_, index) => createRegister(index))
  );
  const [currentStep, setCurrentStep] = useState(readSavedDepositStep);
  const [copyMessage, setCopyMessage] = useState("");

  const repeatDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const repeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const repeatPointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const tipHideRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressClickRef = useRef(false);
  const showedHoldTipThisLoadRef = useRef(false);
  const [openHoldTipId, setOpenHoldTipId] = useState<string | null>(null);
  const [clearMenu, setClearMenu] = useState<ClearMenuState>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        DEPOSIT_PROGRESS_STORAGE_KEY,
        JSON.stringify({
          drawers,
          currentStep,
          updatedAt: Date.now(),
        })
      );
    } catch {
      // Keep counting usable if storage is full or unavailable.
    }
  }, [currentStep, drawers]);

  const registerSummaries = useMemo(
    () =>
      drawers.map((drawer) => ({
        drawer,
        totals: getDrawerTotals(drawer),
      })),
    [drawers]
  );

  const overallTotals = useMemo(
    () =>
      registerSummaries.reduce(
        (sum, { totals }) => ({
          countedTotal: sum.countedTotal + totals.countedTotal,
          leftInDrawer: sum.leftInDrawer + totals.leftInDrawer,
          deposit: sum.deposit + totals.deposit,
          coinTotal: sum.coinTotal + totals.coinTotal,
          billTotal: sum.billTotal + totals.billTotal,
        }),
        {
          countedTotal: 0,
          leftInDrawer: 0,
          deposit: 0,
          coinTotal: 0,
          billTotal: 0,
        }
      ),
    [registerSummaries]
  );

  const updateDrawer = (
    drawerId: number,
    updater: (drawer: RegisterDrawer) => RegisterDrawer
  ) => {
    setDrawers((prev) =>
      prev.map((drawer) => (drawer.id === drawerId ? updater(drawer) : drawer))
    );
  };

  const updateDenom = (
    drawerId: number,
    type: "bills" | "coins",
    index: number,
    count: CountValue
  ) => {
    updateDrawer(drawerId, (drawer) => ({
      ...drawer,
      [type]: drawer[type].map((denom, i) => {
        if (i !== index) return denom;

        return {
          ...denom,
          count: count === "" ? "" : Math.max(0, Math.floor(count)),
        };
      }),
    }));
  };

  const adjustDenom = (
    drawerId: number,
    type: "bills" | "coins",
    index: number,
    delta: number
  ) => {
    updateDrawer(drawerId, (drawer) => ({
      ...drawer,
      [type]: drawer[type].map((denom, i) => {
        if (i !== index) return denom;

        return {
          ...denom,
          count: Math.max(0, parseCount(denom.count) + delta),
        };
      }),
    }));
  };

  const clearSection = (drawerId: number, type: "bills" | "coins") => {
    updateDrawer(drawerId, (drawer) => ({
      ...drawer,
      [type]: drawer[type].map((denom) => ({ ...denom, count: 0 })),
    }));
  };

  const clearDrawer = (drawerId: number) => {
    updateDrawer(drawerId, (drawer) => ({
      ...drawer,
      bills: drawer.bills.map((denom) => ({ ...denom, count: 0 })),
      coins: drawer.coins.map((denom) => ({ ...denom, count: 0 })),
    }));
  };

  const clearAll = () => {
    setDrawers((prev) =>
      prev.map((drawer) => ({
        ...drawer,
        bills: drawer.bills.map((denom) => ({ ...denom, count: 0 })),
        coins: drawer.coins.map((denom) => ({ ...denom, count: 0 })),
      }))
    );
  };

  const openClearMenu = (
    event: ReactMouseEvent<HTMLElement>,
    actions: ClearMenuAction[]
  ) => {
    setClearMenu({ anchorEl: event.currentTarget, actions });
  };

  const closeClearMenu = () => {
    setClearMenu(null);
  };

  const runClearAction = (action: ClearMenuAction) => {
    closeClearMenu();
    action.onClick();
  };

  const hideHoldTip = useCallback(() => {
    if (tipHideRef.current) {
      clearTimeout(tipHideRef.current);
      tipHideRef.current = null;
    }

    setOpenHoldTipId(null);
  }, []);

  const dismissHoldTip = useCallback(() => {
    try {
      localStorage.setItem(HOLD_TIP_DISMISSED_STORAGE_KEY, "true");
    } catch {
      // Keep the counter usable if storage is unavailable.
    }

    hideHoldTip();
  }, [hideHoldTip]);

  const showHoldTip = useCallback((buttonId: string) => {
    if (showedHoldTipThisLoadRef.current) return;

    try {
      if (localStorage.getItem(HOLD_TIP_DISMISSED_STORAGE_KEY) === "true") {
        return;
      }

      const currentShows =
        Number(localStorage.getItem(HOLD_TIP_STORAGE_KEY)) || 0;

      if (currentShows >= HOLD_TIP_MAX_SHOWS) return;

      localStorage.setItem(HOLD_TIP_STORAGE_KEY, String(currentShows + 1));
    } catch {
      // Keep the counter usable if storage is unavailable.
    }

    showedHoldTipThisLoadRef.current = true;
    setOpenHoldTipId(buttonId);
    tipHideRef.current = setTimeout(() => {
      setOpenHoldTipId(null);
      tipHideRef.current = null;
    }, HOLD_TIP_HIDE_MS);
  }, []);

  const stopHoldRepeat = useCallback(() => {
    if (repeatDelayRef.current) {
      clearTimeout(repeatDelayRef.current);
      repeatDelayRef.current = null;
    }

    if (repeatIntervalRef.current) {
      clearInterval(repeatIntervalRef.current);
      repeatIntervalRef.current = null;
    }

    repeatPointerStartRef.current = null;
  }, []);

  const startHoldRepeat = useCallback(
    (
      action: () => void,
      event: PointerEvent<HTMLButtonElement>,
      buttonId: string
    ) => {
      stopHoldRepeat();
      suppressClickRef.current = false;
      repeatPointerStartRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
      showHoldTip(buttonId);

      repeatDelayRef.current = setTimeout(() => {
        suppressClickRef.current = true;
        dismissHoldTip();
        action();
        repeatIntervalRef.current = setInterval(action, HOLD_REPEAT_MS);
      }, HOLD_DELAY_MS);
    },
    [dismissHoldTip, showHoldTip, stopHoldRepeat]
  );

  const handleHoldPointerMove = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      if (!repeatPointerStartRef.current || event.pointerType !== "touch") {
        return;
      }

      const deltaX = Math.abs(event.clientX - repeatPointerStartRef.current.x);
      const deltaY = Math.abs(event.clientY - repeatPointerStartRef.current.y);

      if (deltaX > HOLD_MOVE_CANCEL_PX || deltaY > HOLD_MOVE_CANCEL_PX) {
        suppressClickRef.current = false;
        stopHoldRepeat();
      }
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

  useEffect(
    () => () => {
      stopHoldRepeat();

      if (tipHideRef.current) {
        clearTimeout(tipHideRef.current);
      }
    },
    [stopHoldRepeat]
  );

  const createReceiptCanvas = () => {
    const width = 520;
    const rowHeight = 28;
    const sectionHeight = Math.max(
      1,
      registerSummaries.reduce(
        (sum, { totals }) =>
          sum + 174 + Math.max(1, totals.billsLeftPlan.length) * 18,
        0
      )
    );
    const height = 260 + sectionHeight;
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
    context.font = "800 25px Rubik, Arial, sans-serif";
    context.fillText("Register Checkout", width / 2, 42);
    context.font = "400 13px Rubik, Arial, sans-serif";
    context.fillStyle = "#555";
    context.fillText(new Date().toLocaleString(), width / 2, 66);
    drawDivider(88);

    let y = 118;

    if (registerSummaries.length === 0) {
      context.font = "500 16px Rubik, Arial, sans-serif";
      context.fillStyle = "#333";
      context.fillText("No registers selected", width / 2, y);
      y += rowHeight;
    }

    registerSummaries.forEach(({ drawer, totals }) => {
      context.textAlign = "left";
      context.font = "800 17px Rubik, Arial, sans-serif";
      context.fillStyle = "#1f1f1f";
      context.fillText(drawer.name, 32, y);

      context.textAlign = "right";
      context.font = "700 15px Rubik, Arial, sans-serif";
      context.fillText(`Deposit $${formatMoney(totals.deposit)}`, width - 32, y);
      y += rowHeight;

      const rows = [
        ["Counted", totals.countedTotal],
        ["Coins staying", totals.coinTotal],
        ["Drawer target", totals.target],
        ["Left in drawer", totals.leftInDrawer],
      ] as const;

      context.font = "400 14px Rubik, Arial, sans-serif";
      rows.forEach(([label, amount]) => {
        context.textAlign = "left";
        context.fillStyle = "#555";
        context.fillText(label, 48, y);
        context.textAlign = "right";
        context.fillStyle = "#1f1f1f";
        context.fillText(`$${formatMoney(amount)}`, width - 48, y);
        y += 22;
      });

      y += 8;
      context.textAlign = "left";
      context.font = "700 14px Rubik, Arial, sans-serif";
      context.fillStyle = "#1f1f1f";
      context.fillText("Leave these bills", 48, y);
      y += 20;

      context.font = "400 13px Rubik, Arial, sans-serif";
      if (totals.billsLeftPlan.length === 0) {
        context.fillStyle = "#555";
        context.fillText("No bills needed", 64, y);
        y += 18;
      } else {
        totals.billsLeftPlan.forEach((bill) => {
          context.textAlign = "left";
          context.fillStyle = "#555";
          context.fillText(`${bill.label} x ${bill.count}`, 64, y);
          context.textAlign = "right";
          context.fillStyle = "#1f1f1f";
          context.fillText(`$${formatMoney(bill.total)}`, width - 64, y);
          y += 18;
        });
      }

      y += 8;
      drawDivider(y);
      y += 26;
    });

    context.font = "800 16px Rubik, Arial, sans-serif";
    context.fillStyle = "#1f1f1f";
    context.textAlign = "left";
    context.fillText("All drawers counted", 32, y);
    context.textAlign = "right";
    context.fillText(`$${formatMoney(overallTotals.countedTotal)}`, width - 32, y);
    y += 30;

    context.textAlign = "left";
    context.fillText("Amount left in drawers", 32, y);
    context.textAlign = "right";
    context.fillText(`$${formatMoney(overallTotals.leftInDrawer)}`, width - 32, y);
    y += 36;

    context.font = "900 24px Rubik, Arial, sans-serif";
    context.textAlign = "left";
    context.fillText("Deposit", 32, y);
    context.textAlign = "right";
    context.fillText(`$${formatMoney(overallTotals.deposit)}`, width - 32, y);

    return canvas;
  };

  const handleExportReceipt = () => {
    const canvas = createReceiptCanvas();
    if (!canvas) return;

    const link = document.createElement("a");
    const dateSlug = new Date().toISOString().slice(0, 10);
    link.download = `register-checkout-${dateSlug}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleCopyReceipt = async () => {
    const canvas = createReceiptCanvas();
    if (!canvas) return;

    if (!navigator.clipboard?.write || !window.ClipboardItem) {
      setCopyMessage("Image clipboard is not supported on this browser.");
      return;
    }

    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (!blob) {
        setCopyMessage("Could not create checkout image.");
        return;
      }

      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      setCopyMessage("Checkout image copied to clipboard.");
    } catch {
      setCopyMessage("Clipboard copy failed. Try Export instead.");
    }
  };

  const renderCounterRow = (
    drawer: RegisterDrawer,
    type: "bills" | "coins",
    denom: CashDenomination,
    index: number
  ) => {
    const count = parseCount(denom.count);
    const total = count * denom.value;
    const prefix = `${drawer.id}-${type}-${index}`;

    return (
      <Card key={denom.value} variant="outlined" sx={{ borderRadius: 2, p: 1.5 }}>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack spacing={0.25}>
              <Typography fontWeight={700}>{denom.label}</Typography>
              <Typography variant="body2" color="text.secondary">
                ${formatMoney(total)}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Tooltip
              title="Hold to count faster"
              open={openHoldTipId === `${prefix}-decrement`}
              placement="top"
              arrow
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <IconButton
                size="large"
                onPointerDown={(e) =>
                  startHoldRepeat(
                    () => adjustDenom(drawer.id, type, index, -1),
                    e,
                    `${prefix}-decrement`
                  )
                }
                onPointerUp={stopHoldRepeat}
                onPointerLeave={stopHoldRepeat}
                onPointerMove={handleHoldPointerMove}
                onPointerCancel={stopHoldRepeat}
                onClick={() =>
                  handleRepeatClick(() => adjustDenom(drawer.id, type, index, -1))
                }
              >
                <RemoveIcon />
              </IconButton>
            </Tooltip>

            <TextField
              label={type === "bills" ? "Bills" : "Qty"}
              type="number"
              value={denom.count}
              onChange={(event) =>
                updateDenom(
                  drawer.id,
                  type,
                  index,
                  event.target.value === "" ? "" : Number(event.target.value)
                )
              }
              inputProps={{
                inputMode: "numeric",
                style: { textAlign: "center", fontSize: 18 },
              }}
              sx={{ width: 120 }}
            />

            <Tooltip
              title="Hold to count faster"
              open={openHoldTipId === `${prefix}-increment`}
              placement="top"
              arrow
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <IconButton
                size="large"
                onPointerDown={(e) =>
                  startHoldRepeat(
                    () => adjustDenom(drawer.id, type, index, 1),
                    e,
                    `${prefix}-increment`
                  )
                }
                onPointerUp={stopHoldRepeat}
                onPointerLeave={stopHoldRepeat}
                onPointerMove={handleHoldPointerMove}
                onPointerCancel={stopHoldRepeat}
                onClick={() =>
                  handleRepeatClick(() => adjustDenom(drawer.id, type, index, 1))
                }
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Card>
    );
  };

  return (
    <>
      <Card sx={{ maxWidth: 620, mx: "auto", borderRadius: 3, mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_, nextTab) => setActiveTab(nextTab)}
          variant="fullWidth"
        >
          <Tab label="Deposit Counting" />
          <Tab label="Closing Deposits" />
          <Tab label="Safe Counting" />
        </Tabs>
      </Card>

      {activeTab === 0 || activeTab === 1 ? (
        <>
          <Card sx={{ maxWidth: 620, mx: "auto", borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" textAlign="center" gutterBottom>
                {activeTab === 0
                  ? "Guided Closing Count"
                  : "Closing Deposit Count"}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{ mb: 2 }}
              >
                Count all three drawers. Coins stay in each drawer, then leave
                enough bills to land at $300.xx.
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <IconButton
                  color="error"
                  aria-label="More checkout actions"
                  onClick={(event) =>
                    openClearMenu(event, [
                      {
                        label: "Clear all counts",
                        onClick: clearAll,
                      },
                    ])
                  }
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    minWidth: 48,
                  }}
                >
                  <MoreVertIcon />
                </IconButton>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<DownloadIcon />}
                  onClick={handleExportReceipt}
                  sx={{ minWidth: 0 }}
                >
                  Export
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopyReceipt}
                  sx={{ minWidth: 0 }}
                >
                  Copy
                </Button>
              </Stack>

              {activeTab === 1 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  sx={{ mb: 2 }}
                >
                  Count every drawer from one screen.
                </Typography>
              ) : null}

              <Stack spacing={1.5}>
                {drawers
                  .filter((_, index) =>
                    activeTab === 1 || currentStep === REVIEW_STEP
                      ? true
                      : index === currentStep
                  )
                  .map((drawer) => {
                  const totals = getDrawerTotals(drawer);
                  const drawerIndex = drawer.id - 1;

                  return (
                    <Accordion
                      key={drawer.id}
                      defaultExpanded={
                        activeTab === 1
                          ? drawerIndex === 0
                          : currentStep !== REVIEW_STEP
                      }
                      disableGutters
                      sx={{ borderRadius: 2, overflow: "hidden" }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Stack spacing={1} sx={{ width: "100%", pr: 1 }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={1}
                          >
                            <Stack spacing={0.25}>
                              <Typography fontWeight={800}>
                                {drawer.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {activeTab === 0
                                  ? `Step ${drawerIndex + 1} of ${DRAWER_COUNT}`
                                  : "Closing drawer"}
                              </Typography>
                            </Stack>
                            <Chip
                              size="small"
                              color="primary"
                              label={`Deposit $${formatMoney(
                                totals.deposit
                              )}`}
                            />
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={0.75}
                            alignItems="center"
                          >
                            <IconButton
                              size="small"
                              color="error"
                              aria-label={`${drawer.name} clear actions`}
                              onClick={(event) => {
                                event.stopPropagation();
                                openClearMenu(event, [
                                  {
                                    label: "Clear register",
                                    onClick: () => clearDrawer(drawer.id),
                                  },
                                  {
                                    label: "Clear bills",
                                    onClick: () =>
                                      clearSection(drawer.id, "bills"),
                                  },
                                  {
                                    label: "Clear coins",
                                    onClick: () =>
                                      clearSection(drawer.id, "coins"),
                                  },
                                ]);
                              }}
                              sx={{
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 1,
                              }}
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                            <Typography variant="body2" color="text.secondary">
                              Counted ${formatMoney(totals.countedTotal)} |
                              Left ${formatMoney(totals.leftInDrawer)}
                            </Typography>
                          </Stack>
                          <Typography variant="caption" color="text.secondary">
                            Drawer target: $
                            {formatMoney(DEFAULT_DRAWER_TARGET)}
                          </Typography>
                        </Stack>
                      </AccordionSummary>

                      <AccordionDetails>
                        <Stack spacing={2}>
                          <Stack spacing={0.5}>
                            <Typography fontWeight={800}>Bills</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Leave-behind never keeps $50s or $100s, and keeps
                              up to {MAX_BILLS_PER_DENOM} of each lower bill
                              first.
                            </Typography>
                          </Stack>

                          <Stack spacing={1.25}>
                            {drawer.bills.map((denom, index) =>
                              renderCounterRow(drawer, "bills", denom, index)
                            )}
                          </Stack>

                          <Accordion
                            variant="outlined"
                            sx={{
                              borderRadius: 2,
                              mt: 1.5,
                              "&:before": { display: "none" },
                            }}
                          >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <MonetizationOnIcon fontSize="small" />
                                <Typography fontWeight={800}>Coins</Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  ${formatMoney(totals.coinTotal)} stays
                                </Typography>
                              </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Stack spacing={1.25}>
                                {drawer.coins.map((denom, index) =>
                                  renderCounterRow(drawer, "coins", denom, index)
                                )}
                              </Stack>
                            </AccordionDetails>
                          </Accordion>

                          <Card variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
                            <Stack spacing={0.75}>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                              >
                                <Typography color="text.secondary">
                                  Counted
                                </Typography>
                                <Typography fontWeight={700}>
                                  ${formatMoney(totals.countedTotal)}
                                </Typography>
                              </Stack>
                              <Divider />
                              <Stack spacing={0.5}>
                                <Typography fontWeight={800}>
                                  Leave these bills
                                </Typography>
                                {totals.billsLeftPlan.length === 0 ? (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    No bills needed; coins already cover the
                                    drawer target.
                                  </Typography>
                                ) : (
                                  totals.billsLeftPlan.map((bill) => (
                                    <Stack
                                      key={bill.label}
                                      direction="row"
                                      justifyContent="space-between"
                                    >
                                      <Typography color="text.secondary">
                                        {bill.label} x {bill.count}
                                      </Typography>
                                      <Typography>
                                        ${formatMoney(bill.total)}
                                      </Typography>
                                    </Stack>
                                  ))
                                )}
                              </Stack>
                              <Divider />
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                              >
                                <Typography color="text.secondary">
                                  Coins staying
                                </Typography>
                                <Typography>
                                  ${formatMoney(totals.coinTotal)}
                                </Typography>
                              </Stack>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                              >
                                <Typography color="text.secondary">
                                  Left in drawer
                                </Typography>
                                <Typography>
                                  ${formatMoney(totals.leftInDrawer)}
                                </Typography>
                              </Stack>
                              <Divider />
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                              >
                                <Typography fontWeight={900}>Deposit</Typography>
                                <Typography fontWeight={900}>
                                  ${formatMoney(totals.deposit)}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Card>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
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
            pt={1.5}
            pb={2}
            mt={4}
            sx={{
              borderTop: "1px solid",
              borderColor: "divider",
              boxShadow: "0 -8px 24px rgba(15, 23, 42, 0.08)",
            }}
          >
            <Stack spacing={1.25} px={2} maxWidth={620} mx="auto">
              {activeTab === 0 ? (
                <Card variant="outlined" sx={{ borderRadius: 2, p: 1.5 }}>
                  <Stack spacing={1.5}>
                    <Stepper activeStep={currentStep} alternativeLabel>
                      {[
                        "Register 1",
                        "Register 2",
                        "Register 3",
                        "Review",
                      ].map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>

                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        fullWidth
                        disabled={currentStep === 0}
                        onClick={() =>
                          setCurrentStep((step) => Math.max(0, step - 1))
                        }
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() =>
                          setCurrentStep((step) =>
                            step === REVIEW_STEP
                              ? 0
                              : Math.min(REVIEW_STEP, step + 1)
                          )
                        }
                      >
                        {currentStep === REVIEW_STEP - 1
                          ? "Review Checkout"
                          : currentStep === REVIEW_STEP
                            ? "Start Over"
                            : "Next Drawer"}
                      </Button>
                    </Stack>
                  </Stack>
                </Card>
              ) : null}

              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary">
                  All drawers counted
                </Typography>
                <Typography fontWeight={700}>
                  ${formatMoney(overallTotals.countedTotal)}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary">
                  Amount left in drawers
                </Typography>
                <Typography fontWeight={700}>
                  ${formatMoney(overallTotals.leftInDrawer)}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={18} fontWeight={900}>
                  Deposit
                </Typography>
                <Typography fontSize={18} fontWeight={900}>
                  ${formatMoney(overallTotals.deposit)}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Snackbar
            open={Boolean(copyMessage)}
            autoHideDuration={2400}
            onClose={() => setCopyMessage("")}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              severity={
                copyMessage === "Checkout image copied to clipboard."
                  ? "success"
                  : "warning"
              }
              variant="filled"
              onClose={() => setCopyMessage("")}
              sx={{ width: "100%" }}
            >
              {copyMessage}
            </Alert>
          </Snackbar>

          <Menu
            anchorEl={clearMenu?.anchorEl ?? null}
            open={Boolean(clearMenu)}
            onClose={closeClearMenu}
          >
            {clearMenu?.actions.map((action) => (
              <MenuItem
                key={action.label}
                onClick={() => runClearAction(action)}
              >
                <ListItemIcon>
                  <ClearIcon color="error" fontSize="small" />
                </ListItemIcon>
                <ListItemText>{action.label}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <SafeBillCounter />
      )}
    </>
  );
}
