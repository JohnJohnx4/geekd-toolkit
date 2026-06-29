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
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
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
import EditIcon from "@mui/icons-material/Edit";
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
const DRAWER_COUNT = 3;
const REVIEW_STEP = DRAWER_COUNT;
const TILL_BILL_TARGET_COUNTS: Record<number, number> = {
  20: 5,
  10: 6,
  5: 8,
  1: 25,
};
const TILL_BILL_MINIMUM_COUNTS: Record<number, number> = {
  20: 2,
  10: 4,
  5: 4,
  1: 9,
};
const TILL_BILL_VALUES = [20, 10, 5, 1];

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

const readSavedCompletedDrawers = () => {
  if (typeof window === "undefined") {
    return Array.from({ length: DRAWER_COUNT }, () => false);
  }

  try {
    const storedValue = window.localStorage.getItem(DEPOSIT_PROGRESS_STORAGE_KEY);
    if (!storedValue) return Array.from({ length: DRAWER_COUNT }, () => false);

    const parsedValue = JSON.parse(storedValue);
    if (!isRecord(parsedValue) || !Array.isArray(parsedValue.completedDrawers)) {
      return Array.from({ length: DRAWER_COUNT }, () => false);
    }
    const savedCompletedDrawers = parsedValue.completedDrawers;

    return Array.from(
      { length: DRAWER_COUNT },
      (_, index) => savedCompletedDrawers[index] === true
    );
  } catch {
    return Array.from({ length: DRAWER_COUNT }, () => false);
  }
};

const getBillTotal = (drawer: RegisterDrawer) =>
  drawer.bills.reduce((sum, d) => sum + parseCount(d.count) * d.value, 0);

const getCoinTotal = (drawer: RegisterDrawer) =>
  drawer.coins.reduce((sum, d) => sum + parseCount(d.count) * d.value, 0);

const getBillLabel = (value: number) =>
  BILL_DENOMS.find((bill) => bill.value === value)?.label ?? `$${value}`;

const getBillCounts = (drawer: RegisterDrawer) => {
  const counts: Record<number, number> = {};

  BILL_DENOMS.forEach((bill) => {
    counts[bill.value] = 0;
  });

  drawer.bills.forEach((bill) => {
    counts[bill.value] = parseCount(bill.count);
  });

  return counts;
};

const getTransferTotal = (
  transfers: Array<{ value: number; count: number }>
) => transfers.reduce((sum, transfer) => sum + transfer.value * transfer.count, 0);

const getLeaveBillTotal = (leaveCounts: Record<number, number>) =>
  TILL_BILL_VALUES.reduce(
    (sum, value) => sum + value * (leaveCounts[value] ?? 0),
    0
  );

const getTillPlanScore = (counts: Record<number, number>) => {
  const minimumDeficit = TILL_BILL_VALUES.reduce(
    (sum, value) =>
      sum + Math.max(0, TILL_BILL_MINIMUM_COUNTS[value] - (counts[value] ?? 0)),
    0
  );
  const targetDistance = TILL_BILL_VALUES.reduce(
    (sum, value) =>
      sum + Math.abs((counts[value] ?? 0) - TILL_BILL_TARGET_COUNTS[value]),
    0
  );
  const lowerBillPreference = [...TILL_BILL_VALUES]
    .reverse()
    .reduce((sum, value, index) => sum + (counts[value] ?? 0) * (index + 1), 0);

  return minimumDeficit * 100000 + targetDistance * 100 - lowerBillPreference;
};

const getBestTillLeaveCounts = (
  availableCounts: Record<number, number>,
  targetBillAmount: number,
  maxBillAmount: number
) => {
  const emptyCounts = TILL_BILL_VALUES.reduce<Record<number, number>>(
    (counts, value) => {
      counts[value] = 0;
      return counts;
    },
    {}
  );
  const possible = new Map<number, Record<number, number>>();
  possible.set(0, emptyCounts);

  TILL_BILL_VALUES.forEach((value) => {
    const currentPlans = Array.from(possible.entries());
    const availableCount = availableCounts[value] ?? 0;

    currentPlans.forEach(([amount, counts]) => {
      for (let count = 1; count <= availableCount; count += 1) {
        const nextAmount = amount + value * count;
        if (nextAmount > maxBillAmount) break;

        const nextCounts = { ...counts, [value]: (counts[value] ?? 0) + count };
        const existingCounts = possible.get(nextAmount);

        if (
          !existingCounts ||
          getTillPlanScore(nextCounts) < getTillPlanScore(existingCounts)
        ) {
          possible.set(nextAmount, nextCounts);
        }
      }
    });
  });

  if (possible.has(targetBillAmount)) {
    return possible.get(targetBillAmount) ?? emptyCounts;
  }

  for (let amount = Math.min(targetBillAmount, maxBillAmount); amount >= 0; amount -= 1) {
    const counts = possible.get(amount);
    if (counts) return counts;
  }

  return emptyCounts;
};

const getRegisterSummaries = (
  drawers: RegisterDrawer[],
  allowTransfers: boolean
) => {
  const adjustedCounts = drawers.map(getBillCounts);
  const transferIns = drawers.map(() => [] as Array<{
    label: string;
    value: number;
    count: number;
    total: number;
    drawerName: string;
  }>);
  const transferOuts = drawers.map(() => [] as Array<{
    label: string;
    value: number;
    count: number;
    total: number;
    drawerName: string;
  }>);

  if (allowTransfers) {
    TILL_BILL_VALUES.forEach((value) => {
      drawers.forEach((drawer, receiverIndex) => {
        let needed =
          TILL_BILL_MINIMUM_COUNTS[value] -
          (adjustedCounts[receiverIndex][value] ?? 0);

        if (needed <= 0) return;

        drawers.forEach((donor, donorIndex) => {
          if (needed <= 0 || donorIndex === receiverIndex) return;

          const donorExtra =
            (adjustedCounts[donorIndex][value] ?? 0) -
            TILL_BILL_MINIMUM_COUNTS[value];
          const countToTransfer = Math.min(needed, Math.max(0, donorExtra));

          if (countToTransfer <= 0) return;

          adjustedCounts[donorIndex][value] -= countToTransfer;
          adjustedCounts[receiverIndex][value] += countToTransfer;
          needed -= countToTransfer;

          const transfer = {
            label: getBillLabel(value),
            value,
            count: countToTransfer,
            total: countToTransfer * value,
          };

          transferOuts[donorIndex].push({
            ...transfer,
            drawerName: drawer.name,
          });
          transferIns[receiverIndex].push({
            ...transfer,
            drawerName: donor.name,
          });
        });
      });
    });
  }

  return drawers.map((drawer, drawerIndex) => {
    const billTotal = getBillTotal(drawer);
    const coinTotal = getCoinTotal(drawer);
    const target = DEFAULT_DRAWER_TARGET;
    const coinCents = Math.round(coinTotal * 100);
    const targetBillAmount = Math.max(
      0,
      Math.ceil((DEFAULT_DRAWER_TARGET * 100 - coinCents) / 100)
    );
    const maxBillsToLeave = Math.max(0, Math.floor((30099 - coinCents) / 100));
    const leaveCounts = getBestTillLeaveCounts(
      adjustedCounts[drawerIndex],
      targetBillAmount,
      maxBillsToLeave
    );
    const billsLeft = getLeaveBillTotal(leaveCounts);
    const transferInTotal = getTransferTotal(transferIns[drawerIndex]);
    const transferOutTotal = getTransferTotal(transferOuts[drawerIndex]);
    const adjustedBillTotal = billTotal + transferInTotal - transferOutTotal;
    const deposit = Math.max(0, adjustedBillTotal - billsLeft);
    const leftInDrawer = coinTotal + billsLeft;

    return {
      drawer,
      totals: {
        billTotal,
        adjustedBillTotal,
        coinTotal,
        target,
        countedTotal: billTotal + coinTotal,
        billsLeft,
        billsLeftPlan: TILL_BILL_VALUES.map((value) => ({
          label: getBillLabel(value),
          value,
          count: leaveCounts[value],
          total: leaveCounts[value] * value,
        })).filter((bill) => bill.count > 0),
        transferIns: transferIns[drawerIndex],
        transferOuts: transferOuts[drawerIndex],
        transferInTotal,
        transferOutTotal,
        leftInDrawer,
        deposit,
      },
    };
  });
};

export default function CashCalculator() {
  const [activeTab, setActiveTab] = useState(0);
  const [drawers, setDrawers] = useState<RegisterDrawer[]>(() =>
    readSavedDepositDrawers() ??
    Array.from({ length: DRAWER_COUNT }, (_, index) => createRegister(index))
  );
  const [currentStep, setCurrentStep] = useState(readSavedDepositStep);
  const [completedDrawers, setCompletedDrawers] = useState(
    readSavedCompletedDrawers
  );
  const [calculatingDrawerId, setCalculatingDrawerId] = useState<number | null>(
    null
  );
  const [copyMessage, setCopyMessage] = useState("");
  const [totalsExpanded, setTotalsExpanded] = useState(false);

  const repeatDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const repeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const repeatPointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const tipHideRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressClickRef = useRef(false);
  const showedHoldTipThisLoadRef = useRef(false);
  const calculateDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [openHoldTipId, setOpenHoldTipId] = useState<string | null>(null);
  const [clearMenu, setClearMenu] = useState<ClearMenuState>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        DEPOSIT_PROGRESS_STORAGE_KEY,
        JSON.stringify({
          drawers,
          currentStep,
          completedDrawers,
          updatedAt: Date.now(),
        })
      );
    } catch {
      // Keep counting usable if storage is full or unavailable.
    }
  }, [completedDrawers, currentStep, drawers]);

  const allowRegisterTransfers =
    activeTab === 1 || currentStep === REVIEW_STEP;
  const registerSummaries = useMemo(
    () => getRegisterSummaries(drawers, allowRegisterTransfers),
    [allowRegisterTransfers, drawers]
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
  const activeDrawerTotals = registerSummaries[currentStep]?.totals;
  const showGuidedDrawerTotal = activeTab === 0 && currentStep !== REVIEW_STEP;
  const footerTotalLabel = showGuidedDrawerTotal
    ? "Current drawer"
    : "Deposit";
  const footerTotalValue = showGuidedDrawerTotal
    ? activeDrawerTotals?.countedTotal ?? 0
    : overallTotals.deposit;

  const updateDrawer = (
    drawerId: number,
    updater: (drawer: RegisterDrawer) => RegisterDrawer
  ) => {
    setDrawers((prev) =>
      prev.map((drawer) => (drawer.id === drawerId ? updater(drawer) : drawer))
    );
  };

  const markDrawerIncomplete = (drawerId: number) => {
    if (calculateDelayRef.current) {
      clearTimeout(calculateDelayRef.current);
      calculateDelayRef.current = null;
    }
    setCalculatingDrawerId(null);
    setCompletedDrawers((prev) =>
      prev.map((completed, index) =>
        index === drawerId - 1 ? false : completed
      )
    );
  };

  const completeCurrentDrawer = () => {
    if (currentStep >= REVIEW_STEP) return;

    if (calculateDelayRef.current) {
      clearTimeout(calculateDelayRef.current);
    }

    const drawerIndex = currentStep;
    const drawerId = drawerIndex + 1;
    setCalculatingDrawerId(drawerId);
    calculateDelayRef.current = setTimeout(() => {
      setCompletedDrawers((prev) =>
        prev.map((completed, index) =>
          index === drawerIndex ? true : completed
        )
      );
      setCalculatingDrawerId(null);
      calculateDelayRef.current = null;
    }, 1000);
  };

  const updateDenom = (
    drawerId: number,
    type: "bills" | "coins",
    index: number,
    count: CountValue
  ) => {
    markDrawerIncomplete(drawerId);
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
    markDrawerIncomplete(drawerId);
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
    markDrawerIncomplete(drawerId);
    updateDrawer(drawerId, (drawer) => ({
      ...drawer,
      [type]: drawer[type].map((denom) => ({ ...denom, count: 0 })),
    }));
  };

  const clearDrawer = (drawerId: number) => {
    markDrawerIncomplete(drawerId);
    updateDrawer(drawerId, (drawer) => ({
      ...drawer,
      bills: drawer.bills.map((denom) => ({ ...denom, count: 0 })),
      coins: drawer.coins.map((denom) => ({ ...denom, count: 0 })),
    }));
  };

  const clearAll = () => {
    setCompletedDrawers(Array.from({ length: DRAWER_COUNT }, () => false));
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

      if (calculateDelayRef.current) {
        clearTimeout(calculateDelayRef.current);
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
          sum +
          174 +
          Math.max(1, totals.billsLeftPlan.length) * 18 +
          (totals.transferIns.length + totals.transferOuts.length) * 18,
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

      if (totals.transferIns.length || totals.transferOuts.length) {
        y += 6;
        context.textAlign = "left";
        context.font = "700 14px Rubik, Arial, sans-serif";
        context.fillStyle = "#1f1f1f";
        context.fillText("Move bills between registers", 48, y);
        y += 20;
        context.font = "400 13px Rubik, Arial, sans-serif";

        totals.transferIns.forEach((transfer) => {
          context.textAlign = "left";
          context.fillStyle = "#555";
          context.fillText(
            `Receive ${transfer.label} x ${transfer.count} from ${transfer.drawerName}`,
            64,
            y
          );
          y += 18;
        });

        totals.transferOuts.forEach((transfer) => {
          context.textAlign = "left";
          context.fillStyle = "#555";
          context.fillText(
            `Send ${transfer.label} x ${transfer.count} to ${transfer.drawerName}`,
            64,
            y
          );
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
      <Card key={denom.value} variant="outlined" sx={{ borderRadius: 1.5, p: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack sx={{ flex: 1, minWidth: 0 }}>
            <Typography fontWeight={800} noWrap>
              {denom.label}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ${formatMoney(total)}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.5}>
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
                size="small"
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
                sx={{ width: 34, height: 34 }}
              >
                <RemoveIcon />
              </IconButton>
            </Tooltip>

            <TextField
              aria-label={`${denom.label} ${type === "bills" ? "bills" : "coins"}`}
              size="small"
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
                style: { textAlign: "center", fontSize: 16, padding: "8px 6px" },
              }}
              sx={{ width: 76 }}
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
                size="small"
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
                sx={{ width: 34, height: 34 }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Card>
    );
  };

  const stepLabel =
    currentStep === REVIEW_STEP
      ? "Review"
      : `Register ${currentStep + 1} of ${DRAWER_COUNT}`;
  const currentDrawerCompleted =
    currentStep === REVIEW_STEP || completedDrawers[currentStep] === true;
  const currentDrawerCalculating =
    currentStep !== REVIEW_STEP && calculatingDrawerId === currentStep + 1;
  const nextStepLabel =
    currentDrawerCalculating
      ? "Calculating"
      : currentStep === REVIEW_STEP - 1
      ? "Review"
      : currentStep === REVIEW_STEP
        ? "Start Over"
        : "Next";
  const headerGuidance =
    activeTab === 1
      ? "Count all three drawers from one screen. Coins stay in each drawer, then leave enough bills to land at $300.xx."
      : currentStep === REVIEW_STEP
        ? "Review the completed drawer counts and total deposit before exporting."
        : currentDrawerCalculating
          ? `Calculating what should stay in drawer ${currentStep + 1}.`
          : currentDrawerCompleted
            ? `Count complete. Total left in drawer should be $${formatMoney(
                activeDrawerTotals?.leftInDrawer ?? 0
              )}. Press Next to continue.`
            : `Calculate bills and coins in drawer ${currentStep + 1}.`;

  const handleGuidedStepAction = () => {
    if (currentDrawerCalculating) return;

    setCurrentStep((step) =>
      step === REVIEW_STEP ? 0 : Math.min(REVIEW_STEP, step + 1)
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
                {headerGuidance}
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
                {registerSummaries
                  .filter((_, index) =>
                    activeTab === 1 || currentStep === REVIEW_STEP
                      ? true
                      : index === currentStep
                  )
                  .map(({ drawer, totals }) => {
                  const drawerIndex = drawer.id - 1;
                  const showDrawerPlan =
                    activeTab === 1 ||
                    currentStep === REVIEW_STEP ||
                    completedDrawers[drawerIndex] === true;
                  const isDrawerCalculating =
                    activeTab === 0 && calculatingDrawerId === drawer.id;
                  const showEditableCounters =
                    activeTab === 1 || (!showDrawerPlan && !isDrawerCalculating);
                  const billCounterSection = (
                    <>
                      <Stack spacing={0.5}>
                        <Typography fontWeight={800}>Bills</Typography>
                      </Stack>

                      <Stack spacing={0.75}>
                        {drawer.bills.map((denom, index) =>
                          renderCounterRow(drawer, "bills", denom, index)
                        )}
                      </Stack>
                    </>
                  );
                  const coinCounterRows = (
                    <Stack spacing={0.75}>
                      {drawer.coins.map((denom, index) =>
                        renderCounterRow(drawer, "coins", denom, index)
                      )}
                    </Stack>
                  );
                  const coinCounterSection =
                    activeTab === 0 ? (
                      <Stack spacing={0.75}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <MonetizationOnIcon fontSize="small" />
                          <Typography fontWeight={800}>Coins</Typography>
                        </Stack>
                        {coinCounterRows}
                      </Stack>
                    ) : (
                      <Accordion
                        variant="outlined"
                        sx={{
                          borderRadius: 2,
                          mt: 1.5,
                          "&:before": { display: "none" },
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <MonetizationOnIcon fontSize="small" />
                            <Typography fontWeight={800}>Coins</Typography>
                          </Stack>
                        </AccordionSummary>
                        <AccordionDetails>{coinCounterRows}</AccordionDetails>
                      </Accordion>
                    );

                  if (activeTab === 0) {
                    return (
                      <Paper
                        key={drawer.id}
                        variant="outlined"
                        sx={{ borderRadius: 2, p: 2 }}
                      >
                        <Stack spacing={2}>
                          <Stack spacing={1}>
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
                                  {currentStep === REVIEW_STEP
                                    ? "Completed drawer"
                                    : `Step ${drawerIndex + 1} of ${DRAWER_COUNT}`}
                                </Typography>
                              </Stack>
                              <Chip
                                size="small"
                                color="primary"
                                label={
                                  showDrawerPlan
                                    ? `Deposit $${formatMoney(totals.deposit)}`
                                    : `Counted $${formatMoney(
                                        totals.countedTotal
                                      )}`
                                }
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
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Counted ${formatMoney(totals.countedTotal)}
                                {showDrawerPlan
                                  ? ` | Left $${formatMoney(
                                      totals.leftInDrawer
                                    )}`
                                  : ""}
                              </Typography>
                            </Stack>
                          </Stack>

                          {showEditableCounters ? (
                            <>
                              {coinCounterSection}
                              {billCounterSection}
                            </>
                          ) : null}

                          {isDrawerCalculating ? (
                            <Card
                              variant="outlined"
                              sx={{ borderRadius: 2, p: 2.5 }}
                            >
                              <Stack
                                spacing={1.25}
                                alignItems="center"
                                textAlign="center"
                              >
                                <CircularProgress size={28} />
                                <Typography fontWeight={800}>
                                  Calculating drawer plan
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Checking the counted cash and choosing what
                                  should stay in this register.
                                </Typography>
                              </Stack>
                            </Card>
                          ) : showDrawerPlan ? (
                            <Card
                              variant="outlined"
                              sx={{ borderRadius: 2, p: 2 }}
                            >
                              <Stack spacing={0.75}>
                                {currentStep !== REVIEW_STEP ? (
                                  <Stack spacing={0.5}>
                                    <Typography fontWeight={800}>
                                      Drawer overview
                                    </Typography>
                                  </Stack>
                                ) : null}
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
                                  {totals.leftInDrawer <
                                  DEFAULT_DRAWER_TARGET ? (
                                    <Typography
                                      variant="body2"
                                      color="error"
                                      fontWeight={700}
                                    >
                                      Minimum drawer amount not reached.
                                    </Typography>
                                  ) : null}
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
                                {totals.transferIns.length ||
                                totals.transferOuts.length ? (
                                  <>
                                    <Divider />
                                    <Stack spacing={0.5}>
                                      <Typography fontWeight={800}>
                                        Move bills between registers
                                      </Typography>
                                      {totals.transferIns.map((transfer) => (
                                        <Stack
                                          key={`in-${transfer.drawerName}-${transfer.value}`}
                                          direction="row"
                                          justifyContent="space-between"
                                          spacing={1}
                                        >
                                          <Typography color="text.secondary">
                                            Get {transfer.label} x{" "}
                                            {transfer.count} from{" "}
                                            {transfer.drawerName}
                                          </Typography>
                                          <Typography>
                                            ${formatMoney(transfer.total)}
                                          </Typography>
                                        </Stack>
                                      ))}
                                      {totals.transferOuts.map((transfer) => (
                                        <Stack
                                          key={`out-${transfer.drawerName}-${transfer.value}`}
                                          direction="row"
                                          justifyContent="space-between"
                                          spacing={1}
                                        >
                                          <Typography color="text.secondary">
                                            Send {transfer.label} x{" "}
                                            {transfer.count} to{" "}
                                            {transfer.drawerName}
                                          </Typography>
                                          <Typography>
                                            ${formatMoney(transfer.total)}
                                          </Typography>
                                        </Stack>
                                      ))}
                                    </Stack>
                                  </>
                                ) : null}
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
                                  <Typography fontWeight={900}>
                                    Deposit
                                  </Typography>
                                  <Typography fontWeight={900}>
                                    ${formatMoney(totals.deposit)}
                                  </Typography>
                                </Stack>
                                {currentStep !== REVIEW_STEP ? (
                                  <>
                                    <Divider />
                                    <Button
                                      fullWidth
                                      variant="outlined"
                                      startIcon={<EditIcon />}
                                      onClick={() =>
                                        markDrawerIncomplete(drawer.id)
                                      }
                                    >
                                      Edit Register Count
                                    </Button>
                                  </>
                                ) : null}
                              </Stack>
                            </Card>
                          ) : (
                            <Card
                              variant="outlined"
                              sx={{ borderRadius: 2, p: 2 }}
                            >
                              <Stack spacing={0.75}>
                                <Typography fontWeight={800}>
                                  Drawer count in progress
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Complete this drawer count to calculate what
                                  should stay in the register.
                                </Typography>
                                <Divider />
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography color="text.secondary">
                                    Counted so far
                                  </Typography>
                                  <Typography fontWeight={700}>
                                    ${formatMoney(totals.countedTotal)}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Card>
                          )}

                          {currentStep !== REVIEW_STEP &&
                          showEditableCounters ? (
                            <Button
                              fullWidth
                              variant="contained"
                              onClick={completeCurrentDrawer}
                              sx={{ py: 1.15 }}
                            >
                              Finish Till {drawer.id}
                            </Button>
                          ) : null}
                        </Stack>
                      </Paper>
                    );
                  }

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
                                Closing drawer
                              </Typography>
                            </Stack>
                            <Chip
                              size="small"
                              color="primary"
                              label={
                                showDrawerPlan
                                  ? `Deposit $${formatMoney(totals.deposit)}`
                                  : `Counted $${formatMoney(
                                      totals.countedTotal
                                    )}`
                              }
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
                              Counted ${formatMoney(totals.countedTotal)}
                              {showDrawerPlan
                                ? ` | Left $${formatMoney(totals.leftInDrawer)}`
                                : ""}
                            </Typography>
                          </Stack>
                        </Stack>
                      </AccordionSummary>

                      <AccordionDetails>
                        <Stack spacing={2}>
                          {showEditableCounters ? (
                            <>
                              {billCounterSection}
                              {coinCounterSection}
                            </>
                          ) : null}

                          {isDrawerCalculating ? (
                            <Card
                              variant="outlined"
                              sx={{ borderRadius: 2, p: 2.5 }}
                            >
                              <Stack
                                spacing={1.25}
                                alignItems="center"
                                textAlign="center"
                              >
                                <CircularProgress size={28} />
                                <Typography fontWeight={800}>
                                  Calculating drawer plan
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Checking the counted cash and choosing what
                                  should stay in this register.
                                </Typography>
                              </Stack>
                            </Card>
                          ) : showDrawerPlan ? (
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
                                {totals.leftInDrawer <
                                DEFAULT_DRAWER_TARGET ? (
                                  <Typography
                                    variant="body2"
                                    color="error"
                                    fontWeight={700}
                                  >
                                    Minimum drawer amount not reached.
                                  </Typography>
                                ) : null}
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
                              {totals.transferIns.length ||
                              totals.transferOuts.length ? (
                                <>
                                  <Divider />
                                  <Stack spacing={0.5}>
                                    <Typography fontWeight={800}>
                                      Move bills between registers
                                    </Typography>
                                    {totals.transferIns.map((transfer) => (
                                      <Stack
                                        key={`in-${transfer.drawerName}-${transfer.value}`}
                                        direction="row"
                                        justifyContent="space-between"
                                        spacing={1}
                                      >
                                        <Typography color="text.secondary">
                                          Get {transfer.label} x{" "}
                                          {transfer.count} from{" "}
                                          {transfer.drawerName}
                                        </Typography>
                                        <Typography>
                                          ${formatMoney(transfer.total)}
                                        </Typography>
                                      </Stack>
                                    ))}
                                    {totals.transferOuts.map((transfer) => (
                                      <Stack
                                        key={`out-${transfer.drawerName}-${transfer.value}`}
                                        direction="row"
                                        justifyContent="space-between"
                                        spacing={1}
                                      >
                                        <Typography color="text.secondary">
                                          Send {transfer.label} x{" "}
                                          {transfer.count} to{" "}
                                          {transfer.drawerName}
                                        </Typography>
                                        <Typography>
                                          ${formatMoney(transfer.total)}
                                        </Typography>
                                      </Stack>
                                    ))}
                                  </Stack>
                                </>
                              ) : null}
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
                          ) : (
                            <Card variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
                              <Stack spacing={0.75}>
                                <Typography fontWeight={800}>
                                  Drawer count in progress
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Complete this drawer count to calculate what
                                  should stay in the register.
                                </Typography>
                                <Divider />
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography color="text.secondary">
                                    Counted so far
                                  </Typography>
                                  <Typography fontWeight={700}>
                                    ${formatMoney(totals.countedTotal)}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Card>
                          )}
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
            py={1}
            mt={4}
            sx={{
              borderTop: "1px solid",
              borderColor: "divider",
              boxShadow: "0 -8px 24px rgba(15, 23, 42, 0.08)",
            }}
          >
            <Stack spacing={1} px={2} maxWidth={620} mx="auto">
              {activeTab === 0 ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Button
                    variant="outlined"
                    disabled={currentStep === 0}
                    onClick={() =>
                      setCurrentStep((step) => Math.max(0, step - 1))
                    }
                    sx={{ minWidth: 72 }}
                  >
                    Back
                  </Button>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ flex: 1, minWidth: 0 }}
                  >
                    <Typography fontWeight={900} noWrap>
                      {stepLabel}
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                      {[0, 1, 2, 3].map((step) => (
                        <Box
                          key={step}
                          sx={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            bgcolor:
                              step === currentStep
                                ? "primary.main"
                                : "divider",
                          }}
                        />
                      ))}
                    </Stack>
                  </Stack>
                  <Button
                    variant="contained"
                    onClick={handleGuidedStepAction}
                    disabled={
                      currentDrawerCalculating || !currentDrawerCompleted
                    }
                    sx={{ minWidth: 124 }}
                  >
                    {nextStepLabel}
                  </Button>
                </Stack>
              ) : null}

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Button
                  size="small"
                  variant="text"
                  onClick={() => setTotalsExpanded((expanded) => !expanded)}
                  endIcon={
                    <ExpandMoreIcon
                      sx={{
                        transform: totalsExpanded
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 160ms ease",
                      }}
                    />
                  }
                  sx={{
                    color: "text.secondary",
                    fontWeight: 800,
                    minWidth: 0,
                    px: 0,
                  }}
                >
                  Totals
                </Button>
                <Stack direction="row" spacing={1} alignItems="baseline">
                  <Typography color="text.secondary">
                    {footerTotalLabel}
                  </Typography>
                  <Typography fontSize={18} fontWeight={900}>
                    ${formatMoney(footerTotalValue)}
                  </Typography>
                </Stack>
              </Stack>

              <Collapse in={totalsExpanded} timeout="auto" unmountOnExit>
                <Stack spacing={0.75}>
                  <Divider />
                  {showGuidedDrawerTotal ? (
                    <>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography color="text.secondary">
                          Drawer counted
                        </Typography>
                        <Typography fontWeight={700}>
                          ${formatMoney(activeDrawerTotals?.countedTotal ?? 0)}
                        </Typography>
                      </Stack>
                      {currentDrawerCompleted ? (
                        <>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography color="text.secondary">
                              Drawer left
                            </Typography>
                            <Typography fontWeight={700}>
                              $
                              {formatMoney(
                                activeDrawerTotals?.leftInDrawer ?? 0
                              )}
                            </Typography>
                          </Stack>
                          <Divider />
                          <Stack direction="row" justifyContent="space-between">
                            <Typography color="text.secondary">
                              Total cash counted
                            </Typography>
                            <Typography fontWeight={700}>
                              ${formatMoney(overallTotals.countedTotal)}
                            </Typography>
                          </Stack>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography fontWeight={900}>
                              Total deposit
                            </Typography>
                            <Typography fontWeight={900}>
                              ${formatMoney(overallTotals.deposit)}
                            </Typography>
                          </Stack>
                        </>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Complete this drawer to calculate what stays in the
                          register.
                        </Typography>
                      )}
                    </>
                  ) : (
                    <>
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
                        <Typography fontWeight={900}>Deposit</Typography>
                        <Typography fontWeight={900}>
                          ${formatMoney(overallTotals.deposit)}
                        </Typography>
                      </Stack>
                    </>
                  )}
                </Stack>
              </Collapse>
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
