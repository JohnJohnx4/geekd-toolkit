import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InventoryIcon from "@mui/icons-material/Inventory";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import LockResetIcon from "@mui/icons-material/LockReset";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";

import {
  createReservationsSession,
  createReleaseProducts,
  createReleaseWithProducts,
  createReservation,
  fetchReservationsAuthUser,
  fetchReleaseProducts,
  fetchReleases,
  fetchReservationProfile,
  fetchReservationProducts,
  fetchReservations,
  ensureOwnerReservationProducts,
  isReservationsConfigured,
  refreshReservationsSession,
  sendReservationsPasswordReset,
  type ReservationAuthSession,
  setReservationsAccessToken,
  signInReservationsUser,
  signOutReservationsUser,
  type ReleaseProductRecord,
  type ReleaseRecord,
  type ReservationProductRecord,
  type ReservationProductStatus,
  type ReservationProfileRecord,
  type ReservationRecord,
  type ReservationStatus,
  updateRelease,
  updateReleaseProduct,
  updateReservation,
  updateReservationProductStatus,
  updateReservationsPassword,
  updateReservationStatus,
  upsertReservationProfile,
  verifyReservationsPassword,
} from "./reservationSupabase";
import {
  EMPLOYEE_AUTH_SESSION_EVENT,
  EMPLOYEE_LOGOUT_REDIRECT_PATH,
} from "../hooks/useEmployeeAuth";
import { TCG_OPTIONS } from "./timerControllerUtils";

const AUTH_SESSION_KEY = "geekd.reservations.authSession";
const PROFILE_REQUIRED_KEY = "geekd.reservations.profileRequired";
const QUEUE_SORT_OPTIONS = {
  set: "Group by set",
  urgent: "Urgent first",
  release_desc: "Furthest away",
  release_asc: "Most recent",
  alpha: "Release name A-Z",
} as const;

type QueueSortOption = keyof typeof QUEUE_SORT_OPTIONS;

const getTcgSortRank = (game: string) => {
  const normalizedGame = game.toLowerCase();

  if (normalizedGame.includes("pokemon")) return 0;
  if (normalizedGame.includes("magic")) return 1;
  if (normalizedGame.includes("one piece")) return 2;

  return 3;
};

const compareTcgNames = (left: string, right: string) => {
  const leftRank = getTcgSortRank(left);
  const rightRank = getTcgSortRank(right);
  const rankSort = leftRank - rightRank;

  if (rankSort !== 0) return rankSort;

  return left.localeCompare(right, undefined, { sensitivity: "base" });
};

const getQueueSectionId = (key: string) =>
  `queue-section-${key
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;

const getReserveSectionId = (key: string) =>
  `reserve-section-${key
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;

type ReservationProductDetail = ReleaseProductRecord & {
  reservationProductStatus: ReservationProductStatus;
};

type ReleaseProductFormItem = {
  id?: string;
  name: string;
  release_date: string;
};

const blankReleaseForm = {
  title: "",
  game: "",
  gameIsOther: false,
  release_date: "",
  description: "",
  products: [{ name: "Booster Box", release_date: "" }] as ReleaseProductFormItem[],
};

type ReleaseEditForm = {
  title: string;
  game: string;
  gameIsOther: boolean;
  release_date: string;
  description: string;
  products: ReleaseProductFormItem[];
};

const blankReservationForm = {
  notes: "",
  productIds: [] as string[],
};

const blankPasswordForm = {
  password: "",
  confirmPassword: "",
};

const blankChangePasswordForm = {
  currentPassword: "",
  ...blankPasswordForm,
};

const statusLabels: Record<ReservationStatus, string> = {
  pending: "Pending",
  set_aside: "Set Aside",
  picked_up: "Picked Up",
  skipped: "Skipped",
  canceled: "Canceled",
};

const productStatusLabels: Record<ReservationProductStatus, string> = {
  ...statusLabels,
  denied: "Denied",
};

const formatReleaseDate = (value: string | null) => {
  if (!value) return "Date TBD";

  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatProductLabel = (product: ReleaseProductRecord) =>
  product.release_date
    ? `${product.name} - ${formatReleaseDate(product.release_date)}`
    : product.name;

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const getReleaseUrgency = (value: string | null) => {
  if (!value) return null;

  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const releaseDate = new Date(`${value}T12:00:00`);
  const daysAway = Math.ceil(
    (releaseDate.getTime() - todayStart.getTime()) / DAY_IN_MS
  );

  if (daysAway < 0 || daysAway > 30) return null;

  if (daysAway <= 7) {
    return {
      label: "Within 1 week",
      priority: 0,
      daysAway,
      color: "error" as const,
      bgcolor: "rgba(211, 47, 47, 0.08)",
      borderColor: "rgba(211, 47, 47, 0.35)",
    };
  }

  if (daysAway <= 14) {
    return {
      label: "Within 2 weeks",
      priority: 1,
      daysAway,
      color: "warning" as const,
      bgcolor: "rgba(237, 108, 2, 0.08)",
      borderColor: "rgba(237, 108, 2, 0.35)",
    };
  }

  return {
    label: "This month",
    priority: 2,
    daysAway,
    color: "info" as const,
    bgcolor: "rgba(2, 136, 209, 0.08)",
    borderColor: "rgba(2, 136, 209, 0.35)",
  };
};

const compareReleasesByDisplayDate = (
  left: ReleaseRecord,
  right: ReleaseRecord
) => {
  if (left.release_date && !right.release_date) return -1;
  if (!left.release_date && right.release_date) return 1;

  if (left.release_date && right.release_date) {
    const dateSort = right.release_date.localeCompare(left.release_date);

    if (dateSort !== 0) return dateSort;
  }

  return left.title.localeCompare(right.title, undefined, {
    sensitivity: "base",
  });
};

const getReleaseDateTime = (value: string | null) =>
  value ? new Date(`${value}T12:00:00`).getTime() : null;

const compareReleasesByUpcomingDate = (
  left: ReleaseRecord,
  right: ReleaseRecord
) => {
  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();
  const leftTime = getReleaseDateTime(left.release_date);
  const rightTime = getReleaseDateTime(right.release_date);
  const leftIsUpcoming = leftTime !== null && leftTime >= todayStart;
  const rightIsUpcoming = rightTime !== null && rightTime >= todayStart;

  if (leftIsUpcoming && rightIsUpcoming && leftTime !== rightTime) {
    return leftTime - rightTime;
  }

  if (leftIsUpcoming) return -1;
  if (rightIsUpcoming) return 1;

  if (leftTime !== null && rightTime !== null && leftTime !== rightTime) {
    return rightTime - leftTime;
  }

  if (leftTime !== null) return -1;
  if (rightTime !== null) return 1;

  return left.title.localeCompare(right.title, undefined, {
    sensitivity: "base",
  });
};

const groupReleasesByGame = (releasesToGroup: ReleaseRecord[]) => {
  const releaseGroups = releasesToGroup.reduce<
    Record<string, { game: string; releases: ReleaseRecord[] }>
  >((groups, release) => {
    const game = release.game.trim() || "Other";
    const groupKey = game.toLowerCase();

    groups[groupKey] = groups[groupKey] ?? { game, releases: [] };
    groups[groupKey].releases.push(release);
    return groups;
  }, {});

  return Object.values(releaseGroups)
    .map((group) => ({
      ...group,
      releases: group.releases.sort(compareReleasesByDisplayDate),
    }))
    .sort((left, right) => compareTcgNames(left.game, right.game));
};

const formatRequestTime = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const getStatusColor = (status: ReservationProductStatus) => {
  if (status === "pending") return "default";
  if (status === "set_aside") return "primary";
  if (status === "picked_up") return "success";
  if (status === "denied") return "error";
  if (status === "skipped" || status === "canceled") return "warning";
  return "default";
};

const getReleaseGameOption = (game: string) =>
  TCG_OPTIONS.find(
    (option) => option.name.toLowerCase() === game.trim().toLowerCase()
  );

const OTHER_GAME_VALUE = "__other__";
const RELEASE_STATUS_FILTERS = {
  all: "All",
  active: "Active",
  archived: "Archived",
} as const;

type ReleaseStatusFilter = keyof typeof RELEASE_STATUS_FILTERS;

const getGameSelectValue = (game: string, gameIsOther = false) => {
  if (gameIsOther) return OTHER_GAME_VALUE;
  if (!game) return "";

  return getReleaseGameOption(game)?.name ?? OTHER_GAME_VALUE;
};

const GameBadge = ({
  game,
  size = "medium",
}: {
  game: string;
  size?: "small" | "medium";
}) => {
  const gameOption = getReleaseGameOption(game);
  const logoWidth = size === "small" ? 58 : 76;
  const logoHeight = size === "small" ? 36 : 46;

  if (!gameOption) {
    return <Chip label={game} size={size === "small" ? "small" : "medium"} />;
  }

  return (
    <Stack direction="row" spacing={0.75} alignItems="center">
      <Box
        sx={{
          width: logoWidth,
          height: logoHeight,
          borderRadius: 1,
          bgcolor: gameOption.background,
          display: "grid",
          placeItems: "center",
          p: 0.35,
        }}
      >
        <Box
          component="img"
          src={gameOption.logoImage}
          alt=""
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
      <Chip
        label={gameOption.name}
        size={size === "small" ? "small" : "medium"}
      />
    </Stack>
  );
};

export default function ReservationsPage() {
  const [tab, setTab] = useState(0);
  const [authSession, setAuthSession] =
    useState<ReservationAuthSession | null>(null);
  const [passwordSetupSession, setPasswordSetupSession] =
    useState<ReservationAuthSession | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [passwordSetupForm, setPasswordSetupForm] =
    useState(blankPasswordForm);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [changePasswordForm, setChangePasswordForm] =
    useState(blankChangePasswordForm);
  const [changePasswordError, setChangePasswordError] = useState("");
  const [profile, setProfile] = useState<ReservationProfileRecord | null>(null);
  const [profileChecked, setProfileChecked] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({
    display_name: "",
    contact: "",
  });
  const [releases, setReleases] = useState<ReleaseRecord[]>([]);
  const [products, setProducts] = useState<ReleaseProductRecord[]>([]);
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);
  const [reservationProducts, setReservationProducts] = useState<
    ReservationProductRecord[]
  >([]);
  const [releaseForm, setReleaseForm] = useState(blankReleaseForm);
  const [editingReleaseId, setEditingReleaseId] = useState("");
  const [editReleaseForm, setEditReleaseForm] =
    useState<ReleaseEditForm | null>(null);
  const [expandedReleaseGame, setExpandedReleaseGame] = useState<string | null>(
    null
  );
  const [manageReleaseSearch, setManageReleaseSearch] = useState("");
  const [manageReleaseGameFilters, setManageReleaseGameFilters] = useState<
    string[] | null
  >(null);
  const [manageReleaseStatusFilter, setManageReleaseStatusFilter] =
    useState<ReleaseStatusFilter>("all");
  const [reservationForms, setReservationForms] = useState<
    Record<string, typeof blankReservationForm>
  >({});
  const [queueSort, setQueueSort] = useState<QueueSortOption>("set");
  const [editingReservationId, setEditingReservationId] = useState("");
  const [editingReservationForm, setEditingReservationForm] =
    useState(blankReservationForm);
  const [savingReservationReleaseId, setSavingReservationReleaseId] =
    useState("");
  const [loading, setLoading] = useState(false);
  const [savingRelease, setSavingRelease] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const activeReleases = useMemo(
    () =>
      releases
        .filter((release) => release.is_active)
        .sort(compareReleasesByDisplayDate),
    [releases]
  );

  const releasesById = useMemo(
    () =>
      releases.reduce<Record<string, ReleaseRecord>>((groups, release) => {
        groups[release.id] = release;
        return groups;
      }, {}),
    [releases]
  );

  const reservationsByRelease = useMemo(() => {
    return reservations.reduce<Record<string, ReservationRecord[]>>(
      (groups, reservation) => {
        groups[reservation.release_id] = [
          ...(groups[reservation.release_id] ?? []),
          reservation,
        ];
        return groups;
      },
      {}
    );
  }, [reservations]);

  const productsByRelease = useMemo(() => {
    const groups = products.reduce<Record<string, ReleaseProductRecord[]>>(
      (groups, product) => {
        if (!product.is_active) return groups;

        groups[product.release_id] = [...(groups[product.release_id] ?? []), product];
        return groups;
      },
      {}
    );

    Object.values(groups).forEach((group) =>
      group.sort((left, right) => {
        if (left.release_date && !right.release_date) return -1;
        if (!left.release_date && right.release_date) return 1;

        if (left.release_date && right.release_date) {
          const dateSort = left.release_date.localeCompare(right.release_date);
          if (dateSort !== 0) return dateSort;
        }

        const orderSort = left.sort_order - right.sort_order;
        if (orderSort !== 0) return orderSort;

        return left.name.localeCompare(right.name, undefined, {
          sensitivity: "base",
        });
      })
    );

    return groups;
  }, [products]);

  const productsByReservation = useMemo(() => {
    return reservationProducts.reduce<Record<string, ReservationProductDetail[]>>(
      (groups, reservationProduct) => {
        const product = products.find(
          (item) => item.id === reservationProduct.product_id
        );

        if (!product) return groups;

        groups[reservationProduct.reservation_id] = [
          ...(groups[reservationProduct.reservation_id] ?? []),
          {
            ...product,
            reservationProductStatus: reservationProduct.status,
          },
        ];
        return groups;
      },
      {}
    );
  }, [products, reservationProducts]);

  const isAdmin = Boolean(profile?.is_admin);
  const accountEmail = authSession?.user.email ?? profile?.contact ?? "";

  const currentUserReservations = useMemo(() => {
    if (!authSession) return [];

    return reservations
      .filter((reservation) => reservation.user_id === authSession.user.id)
      .sort((left, right) => {
        const leftRelease = releasesById[left.release_id];
        const rightRelease = releasesById[right.release_id];

        if (leftRelease && rightRelease) {
          return compareReleasesByUpcomingDate(leftRelease, rightRelease);
        }

        if (leftRelease) return -1;
        if (rightRelease) return 1;

        return left.created_at.localeCompare(right.created_at);
      });
  }, [authSession, releasesById, reservations]);

  const currentUserReservationsByRelease = useMemo(() => {
    return currentUserReservations.reduce<Record<string, ReservationRecord>>(
      (groups, reservation) => {
        groups[reservation.release_id] = reservation;
        return groups;
      },
      {}
    );
  }, [currentUserReservations]);

  const unrequestedActiveReleases = useMemo(
    () =>
      activeReleases.filter(
        (release) => !currentUserReservationsByRelease[release.id]
      ),
    [activeReleases, currentUserReservationsByRelease]
  );

  const unrequestedReleaseGroups = useMemo(
    () => groupReleasesByGame(unrequestedActiveReleases),
    [unrequestedActiveReleases]
  );

  const reserveTocItems = useMemo(
    () =>
      unrequestedReleaseGroups.map((group) => ({
        id: getReserveSectionId(group.game),
        label: group.game,
        meta: `${group.releases.length} release${
          group.releases.length === 1 ? "" : "s"
        }`,
        game: group.game,
      })),
    [unrequestedReleaseGroups]
  );

  const selectedReserveGroup = useMemo(
    () =>
      unrequestedReleaseGroups.find(
        (group) => group.game === expandedReleaseGame
      ) ?? null,
    [expandedReleaseGame, unrequestedReleaseGroups]
  );

  const reservationQueueGroups = useMemo(() => {
    const getReleaseUrgencySort = (release: ReleaseRecord) => {
      const releaseProducts = productsByRelease[release.id] ?? [];
      const urgencyItems = releaseProducts
        .map((product) => getReleaseUrgency(product.release_date))
        .filter((urgency): urgency is NonNullable<typeof urgency> =>
          Boolean(urgency)
        )
        .sort((left, right) => {
          const prioritySort = left.priority - right.priority;
          if (prioritySort !== 0) return prioritySort;

          return left.daysAway - right.daysAway;
        });

      return urgencyItems[0] ?? null;
    };

    const sortedReleases = [...releases].sort((left, right) => {
      if (queueSort === "urgent") {
        const leftReservationCount =
          reservationsByRelease[left.id]?.length ?? 0;
        const rightReservationCount =
          reservationsByRelease[right.id]?.length ?? 0;
        const reservationSort =
          Number(rightReservationCount > 0) - Number(leftReservationCount > 0);

        if (reservationSort !== 0) return reservationSort;

        const leftUrgency = getReleaseUrgencySort(left);
        const rightUrgency = getReleaseUrgencySort(right);

        if (leftUrgency && rightUrgency) {
          const prioritySort = leftUrgency.priority - rightUrgency.priority;
          if (prioritySort !== 0) return prioritySort;

          const daySort = leftUrgency.daysAway - rightUrgency.daysAway;
          if (daySort !== 0) return daySort;
        }

        if (leftUrgency) return -1;
        if (rightUrgency) return 1;

        return compareReleasesByDisplayDate(left, right);
      }

      if (queueSort === "release_asc") {
        if (left.release_date && !right.release_date) return -1;
        if (!left.release_date && right.release_date) return 1;

        if (left.release_date && right.release_date) {
          const dateSort = left.release_date.localeCompare(right.release_date);
          if (dateSort !== 0) return dateSort;
        }

        return left.title.localeCompare(right.title, undefined, {
          sensitivity: "base",
        });
      }

      if (queueSort === "alpha") {
        return left.title.localeCompare(right.title, undefined, {
          sensitivity: "base",
        });
      }

      return compareReleasesByDisplayDate(left, right);
    });

    if (queueSort !== "set") {
      return sortedReleases.map((release) => ({
        key: release.id,
        game: release.game.trim() || "Other",
        releases: [release],
        grouped: false,
      }));
    }

    const releaseGroups = sortedReleases.reduce<
      Record<
        string,
        { game: string; releases: ReleaseRecord[]; order: number; grouped: true }
      >
    >((groups, release, index) => {
      const game = release.game.trim() || "Other";
      const groupKey = game.toLowerCase();

      groups[groupKey] = groups[groupKey] ?? {
        game,
        releases: [],
        order: index,
        grouped: true,
      };
      groups[groupKey].releases.push(release);
      return groups;
    }, {});

    return Object.values(releaseGroups)
      .sort((left, right) => {
        const leftRank = getTcgSortRank(left.game);
        const rightRank = getTcgSortRank(right.game);
        const rankSort = leftRank - rightRank;
        if (rankSort !== 0) return rankSort;

        if (leftRank > 2 && rightRank > 2) {
          const gameSort = compareTcgNames(left.game, right.game);

          if (gameSort !== 0) return gameSort;
        }

        return left.order - right.order;
      })
      .map((group) => ({
        game: group.game,
        key: group.game,
        releases: group.releases,
        grouped: group.grouped,
      }));
  }, [productsByRelease, queueSort, releases, reservationsByRelease]);

  const reservationQueueTocItems = useMemo(
    () =>
      reservationQueueGroups.map((group) => {
        const firstRelease = group.releases[0];
        const releaseReservations = firstRelease
          ? reservationsByRelease[firstRelease.id] ?? []
          : [];

        return {
          id: getQueueSectionId(group.key),
          label: group.grouped
            ? group.game
            : firstRelease?.title ?? group.game,
          meta: group.grouped
            ? `${group.releases.length} releases`
            : `${releaseReservations.length} reservations`,
        };
      }),
    [reservationQueueGroups, reservationsByRelease]
  );

  const manageReleaseGameOptions = useMemo(
    () =>
      [...new Set(releases.map((release) => release.game.trim() || "Other"))]
        .sort(compareTcgNames),
    [releases]
  );

  useEffect(() => {
    setManageReleaseGameFilters((currentFilters) => {
      if (!manageReleaseGameOptions.length) return currentFilters ?? [];
      if (currentFilters === null) return manageReleaseGameOptions;

      return currentFilters.filter((game) =>
        manageReleaseGameOptions.includes(game)
      );
    });
  }, [manageReleaseGameOptions]);

  const activeManageReleaseGameFilters =
    manageReleaseGameFilters ?? manageReleaseGameOptions;

  const filteredManageReleases = useMemo(() => {
    const normalizedSearch = manageReleaseSearch.trim().toLowerCase();

    return releases.filter((release) => {
      if (
        !activeManageReleaseGameFilters.includes(release.game.trim() || "Other")
      ) {
        return false;
      }

      if (
        manageReleaseStatusFilter === "active" &&
        !release.is_active
      ) {
        return false;
      }

      if (
        manageReleaseStatusFilter === "archived" &&
        release.is_active
      ) {
        return false;
      }

      if (!normalizedSearch) return true;

      const releaseProducts = productsByRelease[release.id] ?? [];
      const searchText = [
        release.title,
        release.game,
        release.release_date ?? "",
        release.description ?? "",
        release.is_active ? "active" : "archived",
        ...releaseProducts.map(formatProductLabel),
      ]
        .join(" ")
        .toLowerCase();

      return searchText.includes(normalizedSearch);
    });
  }, [
    activeManageReleaseGameFilters,
    manageReleaseSearch,
    manageReleaseStatusFilter,
    productsByRelease,
    releases,
  ]);

  const managedReleaseGroups = useMemo(
    () => groupReleasesByGame(filteredManageReleases),
    [filteredManageReleases]
  );

  const persistAuthSession = useCallback(
    (session: ReservationAuthSession | null) => {
      setAuthSession(session);

      if (session) {
        setReservationsAccessToken(session.access_token);
        window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
      } else {
        setReservationsAccessToken("");
        window.localStorage.removeItem(AUTH_SESSION_KEY);
        window.localStorage.removeItem(PROFILE_REQUIRED_KEY);
        setProfile(null);
        setProfileChecked(false);
        setProfileForm({ display_name: "", contact: "" });
      }

      window.dispatchEvent(
        new CustomEvent(EMPLOYEE_AUTH_SESSION_EVENT, {
          detail: { session },
        })
      );
    },
    []
  );

  useEffect(() => {
    const restoreSession = async () => {
      const authParams = new URLSearchParams(
        window.location.hash.startsWith("#")
          ? window.location.hash.slice(1)
          : window.location.hash
      );
      const inviteAccessToken = authParams.get("access_token");
      const inviteRefreshToken = authParams.get("refresh_token");
      const inviteExpiresIn = Number(authParams.get("expires_in") ?? 3600);
      const inviteType = authParams.get("type");

      if (
        inviteAccessToken &&
        inviteRefreshToken &&
        (inviteType === "invite" || inviteType === "recovery")
      ) {
        try {
          setReservationsAccessToken(inviteAccessToken);
          const user = await fetchReservationsAuthUser(inviteAccessToken);
          const session = createReservationsSession(
            inviteAccessToken,
            inviteRefreshToken,
            Number.isFinite(inviteExpiresIn) ? inviteExpiresIn : 3600,
            user
          );

          setPasswordSetupSession(session);
          window.history.replaceState(
            null,
            document.title,
            `${window.location.pathname}${window.location.search}`
          );
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to read invitation link."
          );
        } finally {
          setAuthChecked(true);
        }

        return;
      }

      const storedValue = window.localStorage.getItem(AUTH_SESSION_KEY);

      if (!storedValue) {
        setAuthChecked(true);
        return;
      }

      try {
        const storedSession = JSON.parse(
          storedValue
        ) as ReservationAuthSession;
        const expiresSoon = storedSession.expires_at < Date.now() / 1000 + 60;

        if (expiresSoon) {
          const refreshedSession = await refreshReservationsSession(
            storedSession.refresh_token
          );
          persistAuthSession(refreshedSession);
        } else {
          persistAuthSession(storedSession);
        }
      } catch {
        persistAuthSession(null);
      } finally {
        setAuthChecked(true);
      }
    };

    restoreSession();
  }, [persistAuthSession]);

  const loadProfile = useCallback(async () => {
    if (!authSession) return;

    if (!isReservationsConfigured) {
      setProfileChecked(true);
      return;
    }

    setProfileChecked(false);
    setError("");

    try {
      const profileRow = await fetchReservationProfile(authSession.user.id);

      setProfile(profileRow);
      setProfileForm({
        display_name: profileRow?.display_name ?? "",
        contact: profileRow?.contact ?? "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load profile.");
    } finally {
      setProfileChecked(true);
    }
  }, [authSession]);

  useEffect(() => {
    if (authChecked && authSession) {
      loadProfile();
    }
  }, [authChecked, authSession, loadProfile]);

  useEffect(() => {
    const shouldBlockNavigation = Boolean(
      authSession && profileChecked && !profile
    );

    if (!shouldBlockNavigation) {
      window.localStorage.removeItem(PROFILE_REQUIRED_KEY);
      return;
    }

    window.localStorage.setItem(PROFILE_REQUIRED_KEY, "true");

    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", warnBeforeLeaving);

    return () => {
      window.removeEventListener("beforeunload", warnBeforeLeaving);
    };
  }, [authSession, profileChecked, profile]);

  const loadData = useCallback(
    async (includeReservations = isAdmin) => {
      if (!isReservationsConfigured || !authSession || !profile) return;

      setLoading(true);
      setError("");

      try {
        const [
          releaseRows,
          productRows,
          reservationRows,
          reservationProductRows,
        ] = await Promise.all([
          fetchReleases(includeReservations),
          fetchReleaseProducts(),
          fetchReservations(),
          fetchReservationProducts(),
        ]);

        setReleases(releaseRows);
        setProducts(productRows);
        setReservations(reservationRows);
        setReservationProducts(reservationProductRows);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load data.");
      } finally {
        setLoading(false);
      }
    },
    [authSession, isAdmin, profile]
  );

  useEffect(() => {
    if (authChecked && authSession && profile) {
      loadData();
    }
  }, [authChecked, authSession, profile, loadData]);

  useEffect(() => {
    if (!isAdmin && tab > 0) {
      setTab(0);
    }
  }, [isAdmin, tab]);

  const login = async () => {
    if (!loginForm.email.trim() || !loginForm.password) {
      setError("Email and password are required.");
      return;
    }

    setAuthLoading(true);
    setError("");
    setMessage("");

    try {
      const session = await signInReservationsUser(
        loginForm.email.trim(),
        loginForm.password
      );
      persistAuthSession(session);
      setLoginForm({ email: "", password: "" });
      setMessage("Logged in.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to log in."
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const validatePasswordForm = (
    form: typeof blankPasswordForm,
    reportError = setError
  ) => {
    if (form.password.length < 8) {
      reportError("Password must be at least 8 characters.");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      reportError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const requestPasswordReset = async () => {
    const email = loginForm.email.trim();

    if (!email) {
      setError("Enter your email first, then request a reset link.");
      return;
    }

    setAuthLoading(true);
    setError("");
    setMessage("");

    try {
      await sendReservationsPasswordReset(
        email,
        `${window.location.origin}${window.location.pathname}${window.location.search}`
      );
      setMessage("Password reset link sent. Check your email.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send password reset link."
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const completePasswordSetup = async () => {
    if (!passwordSetupSession || !validatePasswordForm(passwordSetupForm)) {
      return;
    }

    setAuthLoading(true);
    setError("");
    setMessage("");

    try {
      const user = await updateReservationsPassword(
        passwordSetupSession.access_token,
        passwordSetupForm.password
      );
      const session = {
        ...passwordSetupSession,
        user,
      };

      persistAuthSession(session);
      setPasswordSetupSession(null);
      setPasswordSetupForm(blankPasswordForm);
      setMessage("Password saved. You are logged in.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to set password."
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const changeLoggedInPassword = async () => {
    if (!authSession) {
      return;
    }

    const accountEmail = authSession.user.email;

    if (!accountEmail) {
      setChangePasswordError("Your account email is required to change your password.");
      return;
    }

    if (!changePasswordForm.currentPassword) {
      setChangePasswordError("Enter your current password first.");
      return;
    }

    if (!validatePasswordForm(changePasswordForm, setChangePasswordError)) {
      return;
    }

    setAuthLoading(true);
    setChangePasswordError("");
    setMessage("");

    try {
      await verifyReservationsPassword(
        accountEmail,
        changePasswordForm.currentPassword
      );
      const user = await updateReservationsPassword(
        authSession.access_token,
        changePasswordForm.password
      );
      persistAuthSession({
        ...authSession,
        user,
      });
      setChangePasswordForm(blankChangePasswordForm);
      setChangePasswordOpen(false);
      setMessage("Password changed.");
    } catch (err) {
      setChangePasswordError(
        err instanceof Error ? err.message : "Unable to change password."
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    const currentAccessToken = authSession?.access_token;

    persistAuthSession(null);
    setPasswordSetupSession(null);
    setReleases([]);
    setProducts([]);
    setReservations([]);
    setReservationProducts([]);
    setReservationForms({});

    if (currentAccessToken) {
      await signOutReservationsUser(currentAccessToken).catch(() => {});
    }

    window.location.assign(EMPLOYEE_LOGOUT_REDIRECT_PATH);
  };

  const saveProfile = async () => {
    if (!authSession) return;

    const displayName = profileForm.display_name.trim();

    if (!displayName) {
      setError("Your name is required before using reservations.");
      return;
    }

    if (!authSession.user.email) {
      setError("Your account email is required before using reservations.");
      return;
    }

    setProfileSaving(true);
    setError("");
    setMessage("");

    try {
      const savedProfile = await upsertReservationProfile({
        id: authSession.user.id,
        display_name: displayName,
        contact: authSession.user.email,
      });

      setProfile(savedProfile);
      setProfileForm({
        display_name: savedProfile.display_name,
        contact: savedProfile.contact ?? "",
      });
      window.localStorage.removeItem(PROFILE_REQUIRED_KEY);
      setMessage("Profile saved.");
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save profile.");
    } finally {
      setProfileSaving(false);
    }
  };

  const saveRelease = async () => {
    if (!isAdmin) {
      setError("Admin access is required to manage releases.");
      return;
    }

    const productItems = releaseForm.products
      .map((product) => ({
        name: product.name.trim(),
        release_date: product.release_date || releaseForm.release_date || null,
      }))
      .filter((product) => product.name);

    if (!releaseForm.title.trim() || !releaseForm.game.trim()) {
      setError("Release name and game are required.");
      return;
    }

    if (!productItems.length) {
      setError("Add at least one product for this release.");
      return;
    }

    setSavingRelease(true);
    setError("");
    setMessage("");

    try {
      await createReleaseWithProducts(
        {
          title: releaseForm.title.trim(),
          game: releaseForm.game.trim(),
          release_date: releaseForm.release_date || null,
          description: releaseForm.description.trim() || null,
          image_url: null,
          is_active: true,
        },
        productItems
      );
      setReleaseForm(blankReleaseForm);
      setMessage("Release added.");
      await loadData(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to add release.");
    } finally {
      setSavingRelease(false);
    }
  };

  const startEditingRelease = (release: ReleaseRecord) => {
    const releaseProducts = productsByRelease[release.id] ?? [];

    setEditingReleaseId(release.id);
    setEditReleaseForm({
      title: release.title,
      game: release.game,
      gameIsOther: !getReleaseGameOption(release.game),
      release_date: release.release_date ?? "",
      description: release.description ?? "",
      products: releaseProducts.length
        ? releaseProducts.map((product) => ({
            id: product.id,
            name: product.name,
            release_date: product.release_date ?? release.release_date ?? "",
          }))
        : [{ name: "", release_date: release.release_date ?? "" }],
    });
  };

  const cancelEditingRelease = () => {
    setEditingReleaseId("");
    setEditReleaseForm(null);
  };

  const saveEditedRelease = async (release: ReleaseRecord) => {
    if (!isAdmin) {
      setError("Admin access is required to manage releases.");
      return;
    }

    if (!editReleaseForm) return;

    const productItems = editReleaseForm.products
      .map((product) => ({
        id: product.id,
        name: product.name.trim(),
        release_date: product.release_date || editReleaseForm.release_date || null,
      }))
      .filter((product) => product.name);

    if (!editReleaseForm.title.trim() || !editReleaseForm.game.trim()) {
      setError("Release name and game are required.");
      return;
    }

    if (!productItems.length) {
      setError("At least one product is required for each release.");
      return;
    }

    setSavingRelease(true);
    setError("");
    setMessage("");

    try {
      await updateRelease(release.id, {
        title: editReleaseForm.title.trim(),
        game: editReleaseForm.game.trim(),
        release_date: editReleaseForm.release_date || null,
        description: editReleaseForm.description.trim() || null,
        image_url: release.image_url,
      });

      const existingProducts = productsByRelease[release.id] ?? [];
      const keptProductIds = new Set(
        productItems
          .map((product) => product.id)
          .filter((id): id is string => Boolean(id))
      );

      await Promise.all([
        ...productItems.map((product, index) =>
          product.id
            ? updateReleaseProduct(product.id, {
                name: product.name,
                release_date: product.release_date,
                sort_order: index,
                is_active: true,
              })
            : Promise.resolve(null)
        ),
        ...existingProducts
          .filter((product) => !keptProductIds.has(product.id))
          .map((product) =>
            updateReleaseProduct(product.id, { is_active: false })
          ),
      ]);

      const newProductItems = productItems
        .filter((product) => !product.id)
        .map((product) => ({
          name: product.name,
          release_date: product.release_date,
        }));

      const createdProducts = await createReleaseProducts(
        release.id,
        newProductItems,
        productItems.length - newProductItems.length
      );
      await ensureOwnerReservationProducts(
        release.id,
        editReleaseForm.game.trim(),
        [
          ...productItems
            .map((product) => product.id)
            .filter((id): id is string => Boolean(id)),
          ...createdProducts.map((product) => product.id),
        ]
      );

      cancelEditingRelease();
      setMessage("Release updated.");
      await loadData(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update release."
      );
    } finally {
      setSavingRelease(false);
    }
  };

  const submitReservation = async (releaseId: string) => {
    const form = reservationForms[releaseId] ?? blankReservationForm;
    const existingReservation = currentUserReservationsByRelease[releaseId];

    if (!authSession) {
      setError("Log in before submitting a reservation.");
      return;
    }

    if (!profile) {
      setError("Create your profile before submitting a reservation.");
      return;
    }

    if (!form.productIds.length) {
      setError("Select at least one product to request.");
      return;
    }

    setError("");
    setMessage("");
    setSavingReservationReleaseId(releaseId);

    try {
      if (existingReservation) {
        await updateReservation(existingReservation.id, {
          employee_name: profile.display_name,
          employee_contact: accountEmail || null,
          notes: form.notes.trim() || null,
          product_ids: form.productIds,
        });
      } else {
        await createReservation({
          user_id: authSession.user.id,
          release_id: releaseId,
          employee_name: profile.display_name,
          employee_contact: accountEmail || null,
          notes: form.notes.trim() || null,
          product_ids: form.productIds,
        });
      }

      setReservationForms((prev) => ({
        ...prev,
        [releaseId]: {
          notes: form.notes,
          productIds: form.productIds,
        },
      }));
      setMessage(
        existingReservation
          ? "Reservation request updated."
          : "Reservation request saved."
      );
      await loadData();
    } catch (err) {
      const details = err instanceof Error ? err.message : "";
      setError(
        details.includes("duplicate")
          ? "That employee already has a request for this release."
          : details || "Unable to save reservation."
      );
    } finally {
      setSavingReservationReleaseId("");
    }
  };

  const setReleaseActive = async (release: ReleaseRecord, isActive: boolean) => {
    if (!isAdmin) {
      setError("Admin access is required to manage releases.");
      return;
    }

    setError("");
    setMessage("");

    try {
      await updateRelease(release.id, { is_active: isActive });
      setMessage(isActive ? "Release reactivated." : "Release archived.");
      await loadData(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update release.");
    }
  };

  const changeReservationStatus = async (
    reservation: ReservationRecord,
    status: ReservationStatus
  ) => {
    if (!isAdmin) {
      setError("Admin access is required to update reservations.");
      return;
    }

    setError("");
    setMessage("");

    try {
      const updated = await updateReservationStatus(reservation.id, status);
      setReservations((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update reservation."
      );
    }
  };

  const changeReservationProductStatus = async (
    reservationId: string,
    productId: string,
    status: ReservationProductStatus
  ) => {
    if (!isAdmin) {
      setError("Admin access is required to update product requests.");
      return;
    }

    try {
      const updated = await updateReservationProductStatus(
        reservationId,
        productId,
        status
      );
      setReservationProducts((prev) =>
        prev.map((product) =>
          product.reservation_id === updated.reservation_id &&
          product.product_id === updated.product_id
            ? updated
            : product
        )
      );
      setMessage("Product request status updated.");
      setError("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update product request status."
      );
    }
  };

  const openReservationEditor = (reservation: ReservationRecord) => {
    const selectedProducts = (productsByReservation[reservation.id] ?? []).map(
      (product) => product.id
    );

    setEditingReservationId(reservation.id);
    setEditingReservationForm({
      notes: reservation.notes ?? "",
      productIds: selectedProducts,
    });
    setError("");
    setMessage("");
  };

  const closeReservationEditor = () => {
    setEditingReservationId("");
    setEditingReservationForm(blankReservationForm);
  };

  const updateEditingReservationProduct = (
    productId: string,
    checked: boolean
  ) => {
    setEditingReservationForm((prev) => ({
      ...prev,
      productIds: checked
        ? [...prev.productIds, productId]
        : prev.productIds.filter((id) => id !== productId),
    }));
  };

  const saveEditingReservation = async () => {
    const reservation = currentUserReservations.find(
      (item) => item.id === editingReservationId
    );

    if (!profile || !reservation) return;

    if (!editingReservationForm.productIds.length) {
      setError("Select at least one product to request.");
      return;
    }

    setError("");
    setMessage("");

    try {
      await updateReservation(reservation.id, {
        employee_name: profile.display_name,
        employee_contact: accountEmail || null,
        notes: editingReservationForm.notes.trim() || null,
        product_ids: editingReservationForm.productIds,
      });
      closeReservationEditor();
      setMessage("Reservation request updated.");
      await loadData();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update reservation."
      );
    }
  };

  const updateReservationProduct = (
    releaseId: string,
    productId: string,
    checked: boolean
  ) => {
    const existingReservation = currentUserReservationsByRelease[releaseId];
    const existingProductIds = existingReservation
      ? (productsByReservation[existingReservation.id] ?? []).map(
          (product) => product.id
        )
      : [];
    const form = reservationForms[releaseId] ?? {
      notes: existingReservation?.notes ?? "",
      productIds: existingProductIds,
    };

    setReservationForms((prev) => ({
      ...prev,
      [releaseId]: {
        ...form,
        productIds: checked
          ? [...form.productIds, productId]
          : form.productIds.filter((id) => id !== productId),
      },
    }));
  };

  if (!authChecked) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
        <Card>
          <CardContent>
            <Stack spacing={2} alignItems="center">
              <CircularProgress />
              <Typography>Checking reservation access...</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (passwordSetupSession) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 3, md: 8 } }}>
        <Stack spacing={2.5}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <LockResetIcon color="primary" sx={{ fontSize: 36 }} />
                <Box>
                  <Typography variant="h1">Set Your Password</Typography>
                  <Typography color="text.secondary">
                    Finish setting up your reservation account.
                  </Typography>
                </Box>
              </Stack>

              {passwordSetupSession.user.email ? (
                <Chip
                  label={passwordSetupSession.user.email}
                  sx={{ alignSelf: "flex-start" }}
                />
              ) : null}

              {message ? <Alert severity="success">{message}</Alert> : null}
              {error ? <Alert severity="error">{error}</Alert> : null}
            </Stack>
          </Paper>

          <Card>
            <CardContent>
              <Stack spacing={2}>
                <TextField
                  label="New password"
                  type="password"
                  value={passwordSetupForm.password}
                  onChange={(event) =>
                    setPasswordSetupForm((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  fullWidth
                />
                <TextField
                  label="Confirm password"
                  type="password"
                  value={passwordSetupForm.confirmPassword}
                  onChange={(event) =>
                    setPasswordSetupForm((prev) => ({
                      ...prev,
                      confirmPassword: event.target.value,
                    }))
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      completePasswordSetup();
                    }
                  }}
                  fullWidth
                />
                <Button
                  variant="contained"
                  startIcon={<LockResetIcon />}
                  onClick={completePasswordSetup}
                  disabled={authLoading}
                >
                  {authLoading ? "Saving..." : "Set Password"}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    );
  }

  if (!authSession) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 3, md: 8 } }}>
        <Stack spacing={2.5}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <EventAvailableIcon color="primary" sx={{ fontSize: 36 }} />
                <Box>
                  <Typography variant="h1">Employee Reservations</Typography>
                  <Typography color="text.secondary">
                    Sign in to view and submit release requests.
                  </Typography>
                </Box>
              </Stack>

              {!isReservationsConfigured ? (
                <Alert severity="warning">
                  Supabase is not configured. Add VITE_SUPABASE_URL and
                  VITE_SUPABASE_PUBLISHABLE_KEY to the app environment.
                </Alert>
              ) : null}

              {message ? <Alert severity="success">{message}</Alert> : null}
              {error ? <Alert severity="error">{error}</Alert> : null}
            </Stack>
          </Paper>

          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h5">Login</Typography>
                <TextField
                  label="Email"
                  type="email"
                  value={loginForm.email}
                  onChange={(event) =>
                    setLoginForm((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  value={loginForm.password}
                  onChange={(event) =>
                    setLoginForm((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      login();
                    }
                  }}
                  fullWidth
                />
                <Button
                  variant="contained"
                  startIcon={<LoginIcon />}
                  onClick={login}
                  disabled={authLoading || !isReservationsConfigured}
                >
                  {authLoading ? "Logging In..." : "Log In"}
                </Button>
                <Button
                  variant="text"
                  startIcon={<LockResetIcon />}
                  onClick={requestPasswordReset}
                  disabled={
                    authLoading ||
                    !isReservationsConfigured ||
                    !loginForm.email.trim()
                  }
                >
                  Send Reset Link
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    );
  }

  if (!profileChecked) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
        <Card>
          <CardContent>
            <Stack spacing={2} alignItems="center">
              <CircularProgress />
              <Typography>Checking reservation profile...</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 3, md: 8 } }}>
        <Stack spacing={2.5}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <EventAvailableIcon color="primary" sx={{ fontSize: 36 }} />
                <Box>
                  <Typography variant="h1">Create Your Profile</Typography>
                  <Typography color="text.secondary">
                    Add your name before submitting release reservations.
                  </Typography>
                </Box>
              </Stack>

              {message ? <Alert severity="success">{message}</Alert> : null}
              {error ? <Alert severity="error">{error}</Alert> : null}
            </Stack>
          </Paper>

          <Card>
            <CardContent>
              <Stack spacing={2}>
                <TextField
                  label="Name"
                  value={profileForm.display_name}
                  onChange={(event) =>
                    setProfileForm((prev) => ({
                      ...prev,
                      display_name: event.target.value,
                    }))
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      saveProfile();
                    }
                  }}
                  required
                  autoFocus
                  fullWidth
                />
                <TextField
                  label="Email"
                  type="email"
                  value={authSession.user.email ?? ""}
                  helperText="This is pulled from your login."
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={saveProfile}
                  disabled={profileSaving || !profileForm.display_name.trim()}
                >
                  {profileSaving ? "Saving..." : "Save Profile"}
                </Button>
                <Button
                  variant="text"
                  startIcon={<LogoutIcon />}
                  onClick={logout}
                >
                  Log Out
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    );
  }

  const editingReservation = currentUserReservations.find(
    (reservation) => reservation.id === editingReservationId
  );
  const editingRelease = editingReservation
    ? releases.find((release) => release.id === editingReservation.release_id)
    : undefined;
  const editingReleaseProducts = editingReservation
    ? productsByRelease[editingReservation.release_id] ?? []
    : [];

  return (
    <Container
      maxWidth="xl"
      sx={{
        pt: { xs: 2, md: 4 },
        pb: { xs: isAdmin ? 11 : 2, md: 4 },
      }}
    >
      <Stack spacing={2.5}>
        <Paper sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <EventAvailableIcon color="primary" sx={{ fontSize: 36 }} />
              <Box>
                <Typography variant="h1">Employee Reservations</Typography>
                <Typography color="text.secondary">
                  Track employee requests for upcoming releases by request time.
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
              sx={{ justifyContent: { xs: "flex-start", md: "flex-end" } }}
            >
              <Chip label={profile.display_name} color="success" />
              <Chip
                label={isAdmin ? "Admin" : "Employee"}
                color={isAdmin ? "secondary" : "default"}
                icon={isAdmin ? <AdminPanelSettingsIcon /> : undefined}
              />
              <Button
                variant="outlined"
                startIcon={<LockResetIcon />}
                onClick={() => {
                  setChangePasswordForm(blankChangePasswordForm);
                  setChangePasswordError("");
                  setChangePasswordOpen(true);
                }}
              >
                Change Password
              </Button>
              <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={logout}
              >
                Log Out
              </Button>
            </Stack>

            {!isReservationsConfigured ? (
              <Alert severity="warning">
                Supabase is not configured. Add VITE_SUPABASE_URL and
                VITE_SUPABASE_PUBLISHABLE_KEY to the app environment.
              </Alert>
            ) : null}

            {message ? <Alert severity="success">{message}</Alert> : null}
            {error ? <Alert severity="error">{error}</Alert> : null}
          </Stack>
        </Paper>

        {isAdmin ? (
          <Paper
            sx={(theme) => ({
              overflow: "hidden",
              position: { xs: "fixed", md: "static" },
              right: { xs: 0, md: "auto" },
              bottom: { xs: 0, md: "auto" },
              left: { xs: 0, md: "auto" },
              zIndex: { xs: theme.zIndex.appBar, md: "auto" },
              borderRadius: { xs: "12px 12px 0 0", md: 1 },
              borderTop: { xs: `1px solid ${theme.palette.divider}`, md: 0 },
              boxShadow: {
                xs: "0 -10px 28px rgba(15, 23, 42, 0.16)",
                md: theme.shadows[1],
              },
            })}
          >
            <Tabs
              value={tab}
              onChange={(_, nextTab) => setTab(nextTab)}
              variant="fullWidth"
              sx={{
                px: { md: 1 },
                ".MuiTabs-flexContainer": {
                  justifyContent: { md: "center" },
                },
                ".MuiTab-root": {
                  flex: { xs: "0 0 33.3333%", md: "0 1 auto" },
                  maxWidth: { xs: "33.3333%", md: 360 },
                  minWidth: { xs: 0, md: 90 },
                  width: { xs: "33.3333%", md: "auto" },
                  minHeight: { xs: 66, md: 48 },
                  px: { xs: 0.5, md: 2 },
                  py: { xs: 0.75, md: 1.25 },
                  fontSize: { xs: "0.68rem", sm: "0.75rem", md: "0.875rem" },
                  lineHeight: 1.1,
                  flexDirection: { xs: "column", md: "row" },
                  gap: { xs: 0.35, md: 0 },
                },
                ".MuiTab-iconWrapper": {
                  mr: { xs: 0, md: 0.75 },
                  mb: { xs: 0.25, md: 0 },
                  fontSize: { xs: 23, md: 24 },
                },
              }}
            >
              <Tab
                icon={<EventAvailableIcon />}
                iconPosition="start"
                label="Reserve"
              />
              <Tab
                icon={<InventoryIcon />}
                iconPosition="start"
                label="Reservation Queue"
              />
              <Tab
                icon={<AdminPanelSettingsIcon />}
                iconPosition="start"
                label="Manage Releases"
              />
            </Tabs>
          </Paper>
        ) : null}

        {tab === 0 ? (
          <Stack spacing={2}>
            {!isAdmin ? (
              <Card>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="h5">Make a Reservation</Typography>
                    <Typography color="text.secondary">
                      Select the products you want from an available release,
                      add any notes, then submit your request. Releases you
                      already requested move into Your Reservations, where you
                      can tap the card to edit it.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ) : null}

            {currentUserReservations.length ? (
              <Card>
                <CardContent
                  sx={{
                    p: { xs: 1.25, sm: 2 },
                    "&:last-child": { pb: { xs: 1.25, sm: 2 } },
                  }}
                >
                  <Stack spacing={{ xs: 0.75, sm: 1.5 }}>
                    <Typography
                      variant="h5"
                      sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }}
                    >
                      Your Reservations
                    </Typography>
                    <Stack spacing={{ xs: 0.4, sm: 0.75 }}>
                      {currentUserReservations.map((reservation) => {
                        const release = releases.find(
                          (item) => item.id === reservation.release_id
                        );
                        const reservedProducts =
                          productsByReservation[reservation.id] ?? [];

                        return (
                          <Paper
                            key={reservation.id}
                            variant="outlined"
                            component="button"
                            type="button"
                            onClick={() => openReservationEditor(reservation)}
                            sx={{
                              p: { xs: 0.75, sm: 1.25 },
                              textAlign: "left",
                              borderColor: "divider",
                              cursor: "pointer",
                              bgcolor: "background.paper",
                              transition: "border-color 120ms ease, background-color 120ms ease",
                              "&:hover": {
                                borderColor: "primary.main",
                                bgcolor: "action.hover",
                              },
                            }}
                          >
                            <Stack
                              direction="row"
                              spacing={{ xs: 0.5, sm: 0.75 }}
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Box sx={{ minWidth: 0 }}>
                                <Stack
                                  direction="row"
                                  spacing={0.5}
                                  alignItems="center"
                                  sx={{ minWidth: 0 }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: 900,
                                      fontSize: { xs: "0.9rem", sm: "1rem" },
                                    }}
                                    noWrap
                                  >
                                    {release?.title ?? "Release"}
                                  </Typography>
                                  <Chip
                                    label={statusLabels[reservation.status]}
                                    color={getStatusColor(reservation.status)}
                                    size="small"
                                    sx={{
                                      flexShrink: 0,
                                      height: { xs: 20, sm: 24 },
                                      "& .MuiChip-label": {
                                        px: { xs: 0.6, sm: 1 },
                                        fontSize: { xs: "0.68rem", sm: "0.8125rem" },
                                      },
                                    }}
                                  />
                                </Stack>
                                <Typography
                                  color="text.secondary"
                                  variant="body2"
                                  noWrap
                                  sx={{ fontSize: { xs: "0.76rem", sm: "0.875rem" } }}
                                >
                                  {formatReleaseDate(
                                    release?.release_date ?? null
                                  )}{" "}
                                  - {reservedProducts.length} product
                                  {reservedProducts.length === 1 ? "" : "s"}
                                </Typography>
                              </Box>
                              <Box
                                aria-hidden="true"
                                sx={{
                                  width: 28,
                                  height: 28,
                                  display: { xs: "grid", sm: "none" },
                                  placeItems: "center",
                                  flexShrink: 0,
                                  borderRadius: "50%",
                                  color: "primary.main",
                                  bgcolor: "action.selected",
                                  border: "1px solid",
                                  borderColor: "primary.light",
                                }}
                              >
                                <EditIcon sx={{ fontSize: 16 }} />
                              </Box>
                              <Stack
                                direction="row"
                                spacing={0.75}
                                alignItems="center"
                                justifyContent="flex-end"
                                sx={{ flexShrink: 0, display: { xs: "none", sm: "flex" } }}
                              >
                                <Chip
                                  label="Edit"
                                  icon={<EditIcon />}
                                  size="small"
                                  variant="outlined"
                                />
                              </Stack>
                            </Stack>
                          </Paper>
                        );
                      })}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ) : null}

            {reserveTocItems.length ? (
              <Card>
                <CardContent
                  sx={{
                    p: { xs: 1.25, sm: 2 },
                    "&:last-child": { pb: { xs: 1.25, sm: 2 } },
                  }}
                >
                  <Stack spacing={1}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="h5"
                        sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }}
                      >
                        Available Releases
                      </Typography>
                      <Chip
                        label={`${unrequestedActiveReleases.length} releases`}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "repeat(2, minmax(0, 1fr))",
                          sm: "repeat(3, minmax(0, 1fr))",
                          lg: "repeat(4, minmax(0, 1fr))",
                        },
                        gap: 0.75,
                      }}
                    >
                      {reserveTocItems.map((item) => (
                        <Button
                          key={item.id}
                          size="small"
                          variant={
                            expandedReleaseGame === item.game
                              ? "contained"
                              : "outlined"
                          }
                          onClick={() => setExpandedReleaseGame(item.game)}
                          sx={{
                            justifyContent: "space-between",
                            textAlign: "left",
                            px: 1,
                            textTransform: "none",
                            gap: 0.75,
                            minWidth: 0,
                          }}
                        >
                          <Typography
                            component="span"
                            noWrap
                            sx={{
                              minWidth: 0,
                              fontWeight: 800,
                              fontSize: { xs: "0.76rem", sm: "0.82rem" },
                            }}
                          >
                            {item.label}
                          </Typography>
                          <Typography
                            component="span"
                            noWrap
                            sx={{
                              flexShrink: 0,
                              fontSize: { xs: "0.68rem", sm: "0.72rem" },
                              color:
                                expandedReleaseGame === item.game
                                  ? "primary.contrastText"
                                  : "text.secondary",
                            }}
                          >
                            {item.meta}
                          </Typography>
                        </Button>
                      ))}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ) : null}

            {reserveTocItems.length && !selectedReserveGroup ? (
              <Card>
                <CardContent sx={{ p: { xs: 1.25, sm: 2 } }}>
                  <Typography color="text.secondary">
                    Choose a TCG above to view available releases.
                  </Typography>
                </CardContent>
              </Card>
            ) : null}

            {selectedReserveGroup ? (
              <Stack spacing={1.25}>
                {[selectedReserveGroup].map((group) => (
                <Accordion
                  key={group.game}
                  id={getReserveSectionId(group.game)}
                  expanded
                  sx={{
                    borderRadius: 1,
                    overflow: "hidden",
                    scrollMarginTop: { xs: 16, md: 96 },
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      minHeight: 58,
                      px: { xs: 1.5, sm: 2 },
                      "& .MuiAccordionSummary-content": {
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1.5,
                        my: 1,
                      },
                    }}
                  >
                    <GameBadge game={group.game} />
                    <Chip
                      label={`${group.releases.length} releases`}
                      size="small"
                      variant="outlined"
                    />
                  </AccordionSummary>

                  <AccordionDetails sx={{ px: { xs: 1, sm: 1.5 }, pt: 0, pb: 1.5 }}>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          md: "repeat(2, minmax(0, 1fr))",
                          xl: "repeat(3, minmax(0, 1fr))",
                        },
                        gap: { xs: 1, md: 1.25 },
                        alignItems: "stretch",
                      }}
                    >
                      {group.releases.map((release) => {
                        const form =
                          reservationForms[release.id] ?? blankReservationForm;
                        const releaseProducts =
                          productsByRelease[release.id] ?? [];
                        const isSavingReservation =
                          savingReservationReleaseId === release.id;

                        return (
                          <Card
                            key={release.id}
                            variant="outlined"
                            sx={{
                              height: "100%",
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            <CardContent
                              sx={{
                                height: "100%",
                                p: { xs: 1.25, sm: 1.5 },
                                "&:last-child": { pb: { xs: 1.25, sm: 1.5 } },
                              }}
                            >
                              <Stack spacing={1.25} sx={{ height: "100%" }}>
                                <Box sx={{ minWidth: 0 }}>
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="flex-start"
                                    justifyContent="space-between"
                                  >
                                    <Typography
                                      variant="h6"
                                      sx={{
                                        fontWeight: 900,
                                        fontSize: { xs: "1rem", sm: "1.1rem" },
                                      }}
                                    >
                                      {release.title}
                                    </Typography>
                                    <Chip
                                      label={formatReleaseDate(
                                        release.release_date
                                      )}
                                      size="small"
                                      variant="outlined"
                                    />
                                  </Stack>
                                </Box>

                                {releaseProducts.length ? (
                                  <Box>
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems="center"
                                      justifyContent="space-between"
                                      sx={{ mb: 0.5 }}
                                    >
                                      <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 900 }}
                                      >
                                        Choose Products
                                      </Typography>
                                      <Chip
                                        label={`${form.productIds.length}/${releaseProducts.length} selected`}
                                        size="small"
                                        variant={
                                          form.productIds.length
                                            ? "filled"
                                            : "outlined"
                                        }
                                        color={
                                          form.productIds.length
                                            ? "primary"
                                            : "default"
                                        }
                                      />
                                    </Stack>
                                    <FormGroup
                                      sx={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr",
                                        gap: 0.25,
                                        maxHeight: 260,
                                        overflowY: "auto",
                                        border: "1px solid",
                                        borderColor: "divider",
                                        borderRadius: 1,
                                        p: 0.75,
                                        "& .MuiFormControlLabel-root": {
                                          mr: 0,
                                          alignItems: "flex-start",
                                        },
                                        "& .MuiFormControlLabel-label": {
                                          fontSize: "0.9rem",
                                          lineHeight: 1.25,
                                        },
                                        "& .MuiCheckbox-root": {
                                          py: 0.25,
                                        },
                                      }}
                                    >
                                      {releaseProducts.map((product) => (
                                        <FormControlLabel
                                          key={product.id}
                                          control={
                                            <Checkbox
                                              size="small"
                                              checked={form.productIds.includes(
                                                product.id
                                              )}
                                              onChange={(event) =>
                                                updateReservationProduct(
                                                  release.id,
                                                  product.id,
                                                  event.target.checked
                                                )
                                              }
                                            />
                                          }
                                          label={formatProductLabel(product)}
                                        />
                                      ))}
                                    </FormGroup>
                                  </Box>
                                ) : (
                                  <Alert severity="info">
                                    Products have not been added yet.
                                  </Alert>
                                )}

                                <TextField
                                  label="Notes"
                                  value={form.notes}
                                  onChange={(event) =>
                                    setReservationForms((prev) => ({
                                      ...prev,
                                      [release.id]: {
                                        ...form,
                                        notes: event.target.value,
                                      },
                                    }))
                                  }
                                  fullWidth
                                  multiline
                                  minRows={1}
                                  size="small"
                                />
                                <Button
                                  variant="contained"
                                  size="small"
                                  startIcon={<CheckCircleIcon />}
                                  onClick={() => submitReservation(release.id)}
                                  disabled={
                                    !isReservationsConfigured ||
                                    !releaseProducts.length ||
                                    !form.productIds.length ||
                                    isSavingReservation
                                  }
                                  sx={{ mt: "auto" }}
                                >
                                  {isSavingReservation
                                    ? "Saving..."
                                    : form.productIds.length
                                    ? "Request"
                                    : "Select Product"}
                                </Button>
                              </Stack>
                            </CardContent>
                            {isSavingReservation ? (
                              <Box
                                sx={{
                                  position: "absolute",
                                  inset: 0,
                                  zIndex: 1,
                                  display: "grid",
                                  placeItems: "center",
                                  bgcolor: "rgba(255, 255, 255, 0.78)",
                                  backdropFilter: "blur(2px)",
                                }}
                              >
                                <Stack spacing={1} alignItems="center">
                                  <CircularProgress size={28} />
                                  <Typography sx={{ fontWeight: 900 }}>
                                    Saving...
                                  </Typography>
                                </Stack>
                              </Box>
                            ) : null}
                          </Card>
                        );
                      })}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
              </Stack>
            ) : null}

            {!activeReleases.length ? (
              <Card>
                <CardContent>
                  <Typography>No active releases are open right now.</Typography>
                </CardContent>
              </Card>
            ) : null}
            {activeReleases.length && !unrequestedActiveReleases.length ? (
              <Card>
                <CardContent>
                  <Typography>
                    You have already requested every active release.
                  </Typography>
                </CardContent>
              </Card>
            ) : null}
          </Stack>
        ) : null}

        {tab === 1 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "280px 1fr" },
              gap: { xs: 1.25, md: 2 },
              alignItems: "start",
            }}
          >
                <Card sx={{ position: { lg: "sticky" }, top: { lg: 88 } }}>
                  <CardContent sx={{ p: { xs: 1.25, sm: 2 } }}>
                    <Stack
                      direction={{ xs: "row", lg: "column" }}
                      spacing={1}
                      alignItems={{ xs: "center", lg: "stretch" }}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      <Typography
                        variant="h5"
                        sx={{ display: { xs: "none", lg: "block" } }}
                      >
                        Queue Controls
                      </Typography>
                      <Chip
                        label={
                          queueSort === "set"
                            ? `${reservationQueueGroups.length} groups`
                            : `${reservationQueueGroups.length} releases`
                        }
                        size="small"
                        variant="outlined"
                      />
                      <Chip label={`${releases.length} releases`} size="small" />
                      <Chip
                        label={`${reservations.length} reservations`}
                        color="primary"
                        size="small"
                      />
                      <FormControl
                        size="small"
                        sx={{
                          minWidth: { xs: 160, lg: "100%" },
                          ml: { xs: "auto", lg: 0 },
                        }}
                      >
                        <InputLabel>Sort</InputLabel>
                        <Select
                          label="Sort"
                          value={queueSort}
                          onChange={(event) =>
                            setQueueSort(event.target.value as QueueSortOption)
                          }
                        >
                          {Object.entries(QUEUE_SORT_OPTIONS).map(
                            ([value, label]) => (
                              <MenuItem key={value} value={value}>
                                {label}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<RefreshIcon />}
                        onClick={() => loadData(true)}
                        disabled={loading}
                      >
                        Refresh
                      </Button>
                      {reservationQueueTocItems.length ? (
                        <Box
                          sx={{
                            width: "100%",
                            display: { xs: "none", lg: "block" },
                            pt: 1,
                            borderTop: "1px solid",
                            borderColor: "divider",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 900, mb: 0.75 }}
                          >
                            Jump To
                          </Typography>
                          <Stack
                            spacing={0.35}
                            sx={{
                              maxHeight: "calc(100vh - 330px)",
                              overflowY: "auto",
                              pr: 0.5,
                            }}
                          >
                            {reservationQueueTocItems.map((item) => (
                              <Button
                                key={item.id}
                                component="a"
                                href={`#${item.id}`}
                                size="small"
                                variant="text"
                                sx={{
                                  justifyContent: "space-between",
                                  textAlign: "left",
                                  px: 1,
                                  py: 0.5,
                                  minHeight: 0,
                                  textTransform: "none",
                                  gap: 1,
                                }}
                              >
                                <Typography
                                  component="span"
                                  noWrap
                                  sx={{
                                    minWidth: 0,
                                    fontWeight: 800,
                                    fontSize: "0.82rem",
                                  }}
                                >
                                  {item.label}
                                </Typography>
                                <Typography
                                  component="span"
                                  color="text.secondary"
                                  noWrap
                                  sx={{
                                    flexShrink: 0,
                                    fontSize: "0.72rem",
                                  }}
                                >
                                  {item.meta}
                                </Typography>
                              </Button>
                            ))}
                          </Stack>
                        </Box>
                      ) : null}
                    </Stack>
                  </CardContent>
                </Card>

                <Stack spacing={{ xs: 1.25, md: 2 }} sx={{ minWidth: 0 }}>
                {reservationQueueGroups.map((group) => (
                  <Card
                    key={group.key}
                    id={getQueueSectionId(group.key)}
                    sx={{ scrollMarginTop: { xs: 16, lg: 96 } }}
                  >
                    <CardContent sx={{ p: { xs: 1.25, sm: 2 } }}>
                      <Stack spacing={{ xs: 1.25, md: 2 }}>
                        {group.grouped ? (
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <GameBadge game={group.game} />
                            <Chip
                              label={`${group.releases.length} releases`}
                              size="small"
                              variant="outlined"
                            />
                          </Stack>
                        ) : null}

                        <Stack spacing={{ xs: 1, md: 1.5 }}>
                          {group.releases.map((release) => {
                            const releaseReservations =
                              reservationsByRelease[release.id] ?? [];

                            return (
                              <Paper
                                key={release.id}
                                variant="outlined"
                                sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}
                              >
                                <Stack spacing={{ xs: 1, md: 1.5 }}>
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    justifyContent="space-between"
                                  >
                                    <Box sx={{ minWidth: 0 }}>
                                      <Typography
                                        variant="h5"
                                        sx={{
                                          fontSize: {
                                            xs: "1rem",
                                            sm: "1.25rem",
                                          },
                                        }}
                                      >
                                        {release.title}
                                      </Typography>
                                      <Typography
                                        color="text.secondary"
                                        sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                                      >
                                        {formatReleaseDate(
                                          release.release_date
                                        )}
                                      </Typography>
                                    </Box>
                                    <Chip
                                      label={`${releaseReservations.length} reservations`}
                                      size="small"
                                      color={
                                        releaseReservations.length
                                          ? "primary"
                                          : "default"
                                      }
                                      variant={
                                        releaseReservations.length
                                          ? "filled"
                                          : "outlined"
                                      }
                                    />
                                  </Stack>

                                  <Stack spacing={{ xs: 0.75, md: 1.25 }}>
                                    {releaseReservations.map(
                                      (reservation, index) => (
                                        <Paper
                                          key={reservation.id}
                                          variant="outlined"
                                          sx={{
                                            p: { xs: 1, sm: 1.5, md: 2 },
                                            bgcolor: "background.default",
                                          }}
                                        >
                                          <Stack
                                            direction={{
                                              xs: "column",
                                              md: "row",
                                            }}
                                            spacing={{ xs: 1, md: 1.5 }}
                                            alignItems={{
                                              xs: "stretch",
                                              md: "center",
                                            }}
                                            justifyContent="space-between"
                                          >
                                            <Box>
                                              <Stack
                                                direction="row"
                                                spacing={0.75}
                                                alignItems="center"
                                                flexWrap="wrap"
                                              >
                                                <Chip
                                                  label={`#${index + 1}`}
                                                  size="small"
                                                />
                                                <Typography
                                                  variant="h6"
                                                  sx={{
                                                    fontWeight: 900,
                                                    fontSize: {
                                                      xs: "1rem",
                                                      sm: "1.125rem",
                                                    },
                                                  }}
                                                >
                                                  {reservation.employee_name}
                                                </Typography>
                                                <Chip
                                                  label={
                                                    statusLabels[
                                                      reservation.status
                                                    ]
                                                  }
                                                  color={getStatusColor(
                                                    reservation.status
                                                  )}
                                                  size="small"
                                                />
                                              </Stack>
                                              <Typography
                                                color="text.secondary"
                                                sx={{
                                                  fontSize: {
                                                    xs: "0.78rem",
                                                    sm: "0.875rem",
                                                  },
                                                }}
                                              >
                                                {formatRequestTime(
                                                  reservation.created_at
                                                )}
                                                {reservation.employee_contact
                                                  ? ` - ${reservation.employee_contact}`
                                                  : ""}
                                              </Typography>
                                              <Stack
                                                spacing={0.5}
                                                sx={{ mt: 0.5 }}
                                              >
                                                {(
                                                  productsByReservation[
                                                    reservation.id
                                                  ] ?? []
                                                ).map((product) => {
                                                  const releaseUrgency =
                                                    getReleaseUrgency(
                                                      product.release_date
                                                    );

                                                  return (
                                                    <Paper
                                                      key={product.id}
                                                      variant="outlined"
                                                      sx={{
                                                        p: { xs: 0.75, sm: 1 },
                                                        bgcolor:
                                                          releaseUrgency
                                                            ?.bgcolor ??
                                                          "background.paper",
                                                        borderColor:
                                                          releaseUrgency
                                                            ?.borderColor ??
                                                          "divider",
                                                      }}
                                                    >
                                                      <Stack
                                                        direction="row"
                                                        spacing={0.75}
                                                        alignItems="center"
                                                        justifyContent="space-between"
                                                      >
                                                        <Stack
                                                          direction="row"
                                                          spacing={0.75}
                                                          alignItems="center"
                                                          flexWrap="wrap"
                                                          sx={{ minWidth: 0 }}
                                                        >
                                                          <Typography
                                                            sx={{
                                                              fontWeight: 800,
                                                              minWidth: 0,
                                                              fontSize: {
                                                                xs: "0.86rem",
                                                                sm: "0.95rem",
                                                              },
                                                            }}
                                                          >
                                                            {formatProductLabel(
                                                              product
                                                            )}
                                                          </Typography>
                                                          {releaseUrgency ? (
                                                            <Chip
                                                              label={
                                                                releaseUrgency.label
                                                              }
                                                              color={
                                                                releaseUrgency.color
                                                              }
                                                              size="small"
                                                              sx={{
                                                                height: 22,
                                                                "& .MuiChip-label":
                                                                  {
                                                                    px: 0.8,
                                                                    fontSize:
                                                                      "0.72rem",
                                                                  },
                                                              }}
                                                            />
                                                          ) : null}
                                                        </Stack>
                                                        <FormControl
                                                          size="small"
                                                          sx={{
                                                            minWidth: {
                                                              xs: 126,
                                                              sm: 160,
                                                            },
                                                          }}
                                                        >
                                                          <InputLabel>
                                                            Status
                                                          </InputLabel>
                                                          <Select
                                                            label="Status"
                                                            value={
                                                              product.reservationProductStatus
                                                            }
                                                            onChange={(event) =>
                                                              changeReservationProductStatus(
                                                                reservation.id,
                                                                product.id,
                                                                event.target
                                                                  .value as ReservationProductStatus
                                                              )
                                                            }
                                                          >
                                                            {Object.entries(
                                                              productStatusLabels
                                                            ).map(
                                                              ([
                                                                value,
                                                                label,
                                                              ]) => (
                                                                <MenuItem
                                                                  key={value}
                                                                  value={value}
                                                                >
                                                                  {label}
                                                                </MenuItem>
                                                              )
                                                            )}
                                                          </Select>
                                                        </FormControl>
                                                      </Stack>
                                                    </Paper>
                                                  );
                                                })}
                                              </Stack>
                                              {reservation.notes ? (
                                                <Typography
                                                  sx={{
                                                    mt: 0.5,
                                                    fontSize: {
                                                      xs: "0.86rem",
                                                      sm: "0.95rem",
                                                    },
                                                  }}
                                                >
                                                  {reservation.notes}
                                                </Typography>
                                              ) : null}
                                            </Box>

                                            <FormControl
                                              size="small"
                                              sx={{
                                                minWidth: { xs: "100%", md: 190 },
                                              }}
                                            >
                                              <InputLabel>Status</InputLabel>
                                              <Select
                                                label="Status"
                                                value={reservation.status}
                                                onChange={(event) =>
                                                  changeReservationStatus(
                                                    reservation,
                                                    event.target
                                                      .value as ReservationStatus
                                                  )
                                                }
                                              >
                                                {Object.entries(
                                                  statusLabels
                                                ).map(([value, label]) => (
                                                  <MenuItem
                                                    key={value}
                                                    value={value}
                                                  >
                                                    {label}
                                                  </MenuItem>
                                                ))}
                                              </Select>
                                            </FormControl>
                                          </Stack>
                                        </Paper>
                                      )
                                    )}

                                    {!releaseReservations.length ? (
                                      <Typography color="text.secondary">
                                        No requests have been submitted for this
                                        release.
                                      </Typography>
                                    ) : null}
                                  </Stack>
                                </Stack>
                              </Paper>
                            );
                          })}
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}

                {!reservationQueueGroups.length ? (
                  <Card>
                    <CardContent>
                      <Typography>
                        No releases are available in the queue yet.
                      </Typography>
                    </CardContent>
                  </Card>
                ) : null}
                </Stack>
          </Box>
        ) : null}

        {tab === 2 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", xl: "minmax(420px, 520px) 1fr" },
              gap: 2,
              alignItems: "start",
            }}
          >
                <Stack spacing={2} sx={{ position: { xl: "sticky" }, top: { xl: 88 } }}>
                  <Card>
                    <CardContent>
                      <Stack spacing={2}>
                      <Typography variant="h5">Add Release</Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, minmax(0, 1fr))",
                            xl: "1fr",
                          },
                          gap: 1.5,
                        }}
                      >
                        <TextField
                          label="Release name"
                          value={releaseForm.title}
                          onChange={(event) =>
                            setReleaseForm((prev) => ({
                              ...prev,
                              title: event.target.value,
                            }))
                          }
                        />
                        <TextField
                          select
                          label="Game / category"
                          value={getGameSelectValue(
                            releaseForm.game,
                            releaseForm.gameIsOther
                          )}
                          onChange={(event) => {
                            const value = event.target.value;
                            setReleaseForm((prev) => ({
                              ...prev,
                              game: value === OTHER_GAME_VALUE ? "" : value,
                              gameIsOther: value === OTHER_GAME_VALUE,
                            }));
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select a game
                          </MenuItem>
                          {TCG_OPTIONS.map((option) => (
                            <MenuItem key={option.key} value={option.name}>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <Box
                                  component="img"
                                  src={option.logoImage}
                                  alt=""
                                  sx={{
                                    width: 42,
                                    height: 24,
                                    objectFit: "contain",
                                    bgcolor: option.background,
                                    borderRadius: 0.75,
                                    p: 0.35,
                                  }}
                                />
                                <span>{option.name}</span>
                              </Stack>
                            </MenuItem>
                          ))}
                          <MenuItem value={OTHER_GAME_VALUE}>Other</MenuItem>
                        </TextField>
                        {releaseForm.gameIsOther ? (
                          <TextField
                            label="Custom game name"
                            value={releaseForm.game}
                            onChange={(event) =>
                              setReleaseForm((prev) => ({
                                ...prev,
                                game: event.target.value,
                              }))
                            }
                          />
                        ) : null}
                        <TextField
                          label="Release date"
                          type="date"
                          value={releaseForm.release_date}
                          onChange={(event) => {
                            const releaseDate = event.target.value;

                            setReleaseForm((prev) => ({
                              ...prev,
                              release_date: releaseDate,
                              products: prev.products.map((product, index) =>
                                index === 0 &&
                                (!product.release_date ||
                                  product.release_date === prev.release_date)
                                  ? {
                                      ...product,
                                      release_date: releaseDate,
                                    }
                                  : product
                              ),
                            }));
                          }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Box>
                      <TextField
                        label="Notes"
                        value={releaseForm.description}
                        onChange={(event) =>
                          setReleaseForm((prev) => ({
                            ...prev,
                            description: event.target.value,
                          }))
                        }
                        multiline
                        minRows={2}
                      />
                      <Box>
                        <Typography sx={{ fontWeight: 900, mb: 1 }}>
                          Products Releasing
                        </Typography>
                        <Stack spacing={1}>
                          {releaseForm.products.map((product, index) => (
                            <Stack
                              key={index}
                              direction={{ xs: "column", sm: "row" }}
                              spacing={1}
                            >
                              <TextField
                                label={`Product ${index + 1}`}
                                value={product.name}
                                onChange={(event) =>
                                  setReleaseForm((prev) => ({
                                    ...prev,
                                    products: prev.products.map(
                                      (currentProduct, productIndex) =>
                                        productIndex === index
                                          ? {
                                              ...currentProduct,
                                              name: event.target.value,
                                            }
                                          : currentProduct
                                    ),
                                  }))
                                }
                                fullWidth
                              />
                              <TextField
                                label="Product date"
                                type="date"
                                value={product.release_date}
                                onChange={(event) =>
                                  setReleaseForm((prev) => ({
                                    ...prev,
                                    products: prev.products.map(
                                      (currentProduct, productIndex) =>
                                        productIndex === index
                                          ? {
                                              ...currentProduct,
                                              release_date: event.target.value,
                                            }
                                          : currentProduct
                                    ),
                                  }))
                                }
                                InputLabelProps={{ shrink: true }}
                                sx={{ minWidth: { sm: 180 } }}
                              />
                              <Button
                                variant="outlined"
                                color="warning"
                                onClick={() =>
                                  setReleaseForm((prev) => ({
                                    ...prev,
                                    products:
                                      prev.products.length <= 1
                                        ? [{ name: "", release_date: "" }]
                                        : prev.products.filter(
                                            (_, productIndex) =>
                                              productIndex !== index
                                          ),
                                  }))
                                }
                              >
                                Remove
                              </Button>
                            </Stack>
                          ))}
                          <Button
                            variant="outlined"
                            onClick={() =>
                              setReleaseForm((prev) => ({
                                ...prev,
                                products: [
                                  ...prev.products,
                                  {
                                    name: "",
                                    release_date: prev.release_date,
                                  },
                                ],
                              }))
                            }
                          >
                            Add Product
                          </Button>
                        </Stack>
                      </Box>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={saveRelease}
                        disabled={savingRelease}
                      >
                        Add Release
                      </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>

                <Card>
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        justifyContent="space-between"
                        alignItems={{ xs: "stretch", sm: "center" }}
                      >
                        <Box>
                          <Typography variant="h5">Current Releases</Typography>
                          <Typography color="text.secondary">
                            {filteredManageReleases.length} of {releases.length} shown
                          </Typography>
                        </Box>
                        <Button
                          variant="outlined"
                          startIcon={<RefreshIcon />}
                          onClick={() => loadData(true)}
                          disabled={loading}
                        >
                          Refresh
                        </Button>
                      </Stack>

                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "1fr",
                            md: "minmax(220px, 1fr) 160px",
                          },
                          gap: 1,
                        }}
                      >
                        <TextField
                          label="Search releases"
                          value={manageReleaseSearch}
                          onChange={(event) =>
                            setManageReleaseSearch(event.target.value)
                          }
                          size="small"
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon fontSize="small" />
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                        <TextField
                          select
                          label="Status"
                          value={manageReleaseStatusFilter}
                          onChange={(event) =>
                            setManageReleaseStatusFilter(
                              event.target.value as ReleaseStatusFilter
                            )
                          }
                          size="small"
                        >
                          {Object.entries(RELEASE_STATUS_FILTERS).map(
                            ([value, label]) => (
                              <MenuItem key={value} value={value}>
                                {label}
                              </MenuItem>
                            )
                          )}
                        </TextField>
                      </Box>

                      {manageReleaseGameOptions.length ? (
                        <Card variant="outlined">
                          <CardContent
                            sx={{
                              p: { xs: 1, sm: 1.25 },
                              "&:last-child": { pb: { xs: 1, sm: 1.25 } },
                            }}
                          >
                            <Stack spacing={1}>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Typography
                                  variant="subtitle2"
                                  sx={{ fontWeight: 900 }}
                                >
                                  TCG Filters
                                </Typography>
                                <Stack direction="row" spacing={0.75}>
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() =>
                                      setManageReleaseGameFilters([])
                                    }
                                  >
                                    Clear
                                  </Button>
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() =>
                                      setManageReleaseGameFilters(
                                        manageReleaseGameOptions
                                      )
                                    }
                                  >
                                    All
                                  </Button>
                                </Stack>
                              </Stack>
                              <Box
                                sx={{
                                  display: "grid",
                                  gridTemplateColumns: {
                                    xs: "repeat(2, minmax(0, 1fr))",
                                    sm: "repeat(3, minmax(0, 1fr))",
                                    lg: "repeat(4, minmax(0, 1fr))",
                                  },
                                  gap: 0.75,
                                }}
                              >
                                {manageReleaseGameOptions.map((game) => {
                                  const isEnabled =
                                    activeManageReleaseGameFilters.includes(
                                      game
                                    );

                                  return (
                                    <Button
                                      key={game}
                                      size="small"
                                      variant={
                                        isEnabled ? "contained" : "outlined"
                                      }
                                      onClick={() =>
                                        setManageReleaseGameFilters(
                                          (currentFilters) => {
                                            const currentEnabled =
                                              currentFilters ??
                                              manageReleaseGameOptions;

                                            return currentEnabled.includes(game)
                                              ? currentEnabled.filter(
                                                  (item) => item !== game
                                                )
                                              : [...currentEnabled, game];
                                          }
                                        )
                                      }
                                      sx={{
                                        justifyContent: "space-between",
                                        textAlign: "left",
                                        textTransform: "none",
                                        px: 1,
                                        gap: 0.75,
                                        minWidth: 0,
                                      }}
                                    >
                                      <Typography
                                        component="span"
                                        noWrap
                                        sx={{
                                          minWidth: 0,
                                          fontWeight: 800,
                                          fontSize: {
                                            xs: "0.76rem",
                                            sm: "0.82rem",
                                          },
                                        }}
                                      >
                                        {game}
                                      </Typography>
                                      <Typography
                                        component="span"
                                        noWrap
                                        sx={{
                                          flexShrink: 0,
                                          fontSize: {
                                            xs: "0.68rem",
                                            sm: "0.72rem",
                                          },
                                          color: isEnabled
                                            ? "primary.contrastText"
                                            : "text.secondary",
                                        }}
                                      >
                                        {
                                          releases.filter(
                                            (release) =>
                                              (release.game.trim() ||
                                                "Other") === game
                                          ).length
                                        }
                                      </Typography>
                                    </Button>
                                  );
                                })}
                              </Box>
                            </Stack>
                          </CardContent>
                        </Card>
                      ) : null}

                      <Stack spacing={1.25}>
                        {managedReleaseGroups.map((group) => (
                          <Paper
                            key={group.game}
                            variant="outlined"
                            sx={{ p: { xs: 1, sm: 1.25 } }}
                          >
                            <Stack spacing={1}>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <GameBadge game={group.game} size="small" />
                                <Chip
                                  label={`${group.releases.length} releases`}
                                  size="small"
                                  variant="outlined"
                                />
                              </Stack>

                              <Stack spacing={0.75}>
                                {group.releases.map((release) => {
                                  const isEditing =
                                    editingReleaseId === release.id;

                                  return (
                          <Paper
                            key={release.id}
                            variant="outlined"
                            sx={{ p: { xs: 1, sm: 1.25 } }}
                          >
                            {isEditing && editReleaseForm ? (
                              <Stack spacing={2}>
                                <Stack
                                  direction={{ xs: "column", sm: "row" }}
                                  spacing={1}
                                  justifyContent="space-between"
                                  alignItems={{ xs: "stretch", sm: "center" }}
                                >
                                  <Typography variant="h6">
                                    Edit Release
                                  </Typography>
                                  <Stack direction="row" spacing={1}>
                                    <Button
                                      variant="contained"
                                      startIcon={<SaveIcon />}
                                      onClick={() => saveEditedRelease(release)}
                                      disabled={savingRelease}
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      startIcon={<CancelIcon />}
                                      onClick={cancelEditingRelease}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      color={
                                        release.is_active
                                          ? "warning"
                                          : "success"
                                      }
                                      onClick={() =>
                                        setReleaseActive(
                                          release,
                                          !release.is_active
                                        )
                                      }
                                    >
                                      {release.is_active
                                        ? "Archive"
                                        : "Reactivate"}
                                    </Button>
                                  </Stack>
                                </Stack>

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
                                  <TextField
                                    label="Release name"
                                    value={editReleaseForm.title}
                                    onChange={(event) =>
                                      setEditReleaseForm((prev) =>
                                        prev
                                          ? {
                                              ...prev,
                                              title: event.target.value,
                                            }
                                          : prev
                                      )
                                    }
                                  />
                                  <TextField
                                    select
                                    label="Game / category"
                                    value={getGameSelectValue(
                                      editReleaseForm.game,
                                      editReleaseForm.gameIsOther
                                    )}
                                    onChange={(event) => {
                                      const value = event.target.value;
                                      setEditReleaseForm((prev) =>
                                        prev
                                          ? {
                                              ...prev,
                                              game:
                                                value === OTHER_GAME_VALUE
                                                  ? ""
                                                  : value,
                                              gameIsOther:
                                                value === OTHER_GAME_VALUE,
                                            }
                                          : prev
                                      );
                                    }}
                                  >
                                    <MenuItem value="" disabled>
                                      Select a game
                                    </MenuItem>
                                    {TCG_OPTIONS.map((option) => (
                                      <MenuItem
                                        key={option.key}
                                        value={option.name}
                                      >
                                        <Stack
                                          direction="row"
                                          spacing={1}
                                          alignItems="center"
                                        >
                                          <Box
                                            component="img"
                                            src={option.logoImage}
                                            alt=""
                                            sx={{
                                              width: 42,
                                              height: 24,
                                              objectFit: "contain",
                                              bgcolor: option.background,
                                              borderRadius: 0.75,
                                              p: 0.35,
                                            }}
                                          />
                                          <span>{option.name}</span>
                                        </Stack>
                                      </MenuItem>
                                    ))}
                                    <MenuItem value={OTHER_GAME_VALUE}>
                                      Other
                                    </MenuItem>
                                  </TextField>
                                  {editReleaseForm.gameIsOther ? (
                                    <TextField
                                      label="Custom game name"
                                      value={editReleaseForm.game}
                                      onChange={(event) =>
                                        setEditReleaseForm((prev) =>
                                          prev
                                            ? {
                                                ...prev,
                                                game: event.target.value,
                                              }
                                            : prev
                                        )
                                      }
                                    />
                                  ) : null}
                                  <TextField
                                    label="Release date"
                                    type="date"
                                    value={editReleaseForm.release_date}
                                    onChange={(event) =>
                                      setEditReleaseForm((prev) =>
                                        prev
                                          ? {
                                              ...prev,
                                              release_date: event.target.value,
                                            }
                                          : prev
                                      )
                                    }
                                    InputLabelProps={{ shrink: true }}
                                  />
                                </Box>

                                <TextField
                                  label="Notes"
                                  value={editReleaseForm.description}
                                  onChange={(event) =>
                                    setEditReleaseForm((prev) =>
                                      prev
                                        ? {
                                            ...prev,
                                            description: event.target.value,
                                          }
                                        : prev
                                    )
                                  }
                                  multiline
                                  minRows={2}
                                />

                                <Box>
                                  <Typography sx={{ fontWeight: 900, mb: 1 }}>
                                    Products
                                  </Typography>
                                  <Stack spacing={1}>
                                    {editReleaseForm.products.map(
                                      (product, index) => (
                                        <Stack
                                          key={product.id ?? index}
                                          direction={{
                                            xs: "column",
                                            sm: "row",
                                          }}
                                          spacing={1}
                                        >
                                          <TextField
                                            label={`Product ${index + 1}`}
                                            value={product.name}
                                            onChange={(event) =>
                                              setEditReleaseForm((prev) =>
                                                prev
                                                  ? {
                                                      ...prev,
                                                      products:
                                                        prev.products.map(
                                                          (
                                                            currentProduct,
                                                            productIndex
                                                          ) =>
                                                            productIndex ===
                                                            index
                                                              ? {
                                                                  ...currentProduct,
                                                                  name: event
                                                                    .target
                                                                    .value,
                                                                }
                                                              : currentProduct
                                                        ),
                                                    }
                                                  : prev
                                              )
                                            }
                                            fullWidth
                                          />
                                          <TextField
                                            label="Product date"
                                            type="date"
                                            value={product.release_date}
                                            onChange={(event) =>
                                              setEditReleaseForm((prev) =>
                                                prev
                                                  ? {
                                                      ...prev,
                                                      products:
                                                        prev.products.map(
                                                          (
                                                            currentProduct,
                                                            productIndex
                                                          ) =>
                                                            productIndex ===
                                                            index
                                                              ? {
                                                                  ...currentProduct,
                                                                  release_date:
                                                                    event.target
                                                                      .value,
                                                                }
                                                              : currentProduct
                                                        ),
                                                    }
                                                  : prev
                                              )
                                            }
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ minWidth: { sm: 180 } }}
                                          />
                                          <Button
                                            variant="outlined"
                                            color="warning"
                                            onClick={() =>
                                              setEditReleaseForm((prev) =>
                                                prev
                                                  ? {
                                                      ...prev,
                                                      products:
                                                        prev.products.length <=
                                                        1
                                                          ? [
                                                              {
                                                                name: "",
                                                                release_date:
                                                                  prev.release_date,
                                                              },
                                                            ]
                                                          : prev.products.filter(
                                                              (
                                                                _,
                                                                productIndex
                                                              ) =>
                                                                productIndex !==
                                                                index
                                                            ),
                                                    }
                                                  : prev
                                              )
                                            }
                                          >
                                            Remove
                                          </Button>
                                        </Stack>
                                      )
                                    )}
                                    <Button
                                      variant="outlined"
                                      onClick={() =>
                                        setEditReleaseForm((prev) =>
                                          prev
                                            ? {
                                                ...prev,
                                                products: [
                                                  ...prev.products,
                                                  {
                                                    name: "",
                                                    release_date:
                                                      prev.release_date,
                                                  },
                                                ],
                                              }
                                            : prev
                                        )
                                      }
                                    >
                                      Add Product
                                    </Button>
                                  </Stack>
                                </Box>
                              </Stack>
                            ) : null}
                            <Stack
                              direction={{ xs: "column", md: "row" }}
                              spacing={1}
                              justifyContent="space-between"
                              alignItems={{ xs: "stretch", md: "center" }}
                              sx={{ display: isEditing ? "none" : "flex" }}
                            >
                              <Box sx={{ minWidth: 0 }}>
                                <Stack
                                  direction="row"
                                  spacing={0.75}
                                  alignItems="center"
                                  flexWrap="wrap"
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: 900,
                                      maxWidth: { md: 300, lg: 390 },
                                    }}
                                    noWrap
                                  >
                                    {release.title}
                                  </Typography>
                                  <Chip
                                    label={formatReleaseDate(
                                      release.release_date
                                    )}
                                    size="small"
                                    variant="outlined"
                                  />
                                  <Chip
                                    label={
                                      release.is_active ? "Active" : "Archived"
                                    }
                                    color={
                                      release.is_active ? "success" : "default"
                                    }
                                    size="small"
                                  />
                                  <Chip
                                    label={`${
                                      reservationsByRelease[release.id]
                                        ?.length ?? 0
                                    } requests`}
                                    size="small"
                                    variant="outlined"
                                  />
                                  <Chip
                                    label={`${
                                      productsByRelease[release.id]?.length ?? 0
                                    } products`}
                                    size="small"
                                    variant="outlined"
                                  />
                                </Stack>
                              </Box>

                              <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={0.75}
                              >
                                <Button
                                  variant="outlined"
                                  size="small"
                                  startIcon={<EditIcon />}
                                  onClick={() => startEditingRelease(release)}
                                >
                                  Edit
                                </Button>
                              </Stack>
                            </Stack>
                          </Paper>
                          );
                        })}
                              </Stack>
                            </Stack>
                          </Paper>
                        ))}

                        {!managedReleaseGroups.length ? (
                          <Paper
                            variant="outlined"
                            sx={{ p: 2, textAlign: "center" }}
                          >
                            <Typography color="text.secondary">
                              No releases match those filters.
                            </Typography>
                          </Paper>
                        ) : null}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
          </Box>
        ) : null}
      </Stack>

      <Dialog
        open={changePasswordOpen}
        onClose={() => {
          if (!authLoading) {
            setChangePasswordOpen(false);
            setChangePasswordForm(blankChangePasswordForm);
            setChangePasswordError("");
          }
        }}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            {changePasswordError ? (
              <Alert severity="error">{changePasswordError}</Alert>
            ) : null}
            <TextField
              label="Current password"
              type="password"
              value={changePasswordForm.currentPassword}
              onChange={(event) =>
                setChangePasswordForm((prev) => ({
                  ...prev,
                  currentPassword: event.target.value,
                }))
              }
              fullWidth
            />
            <TextField
              label="New password"
              type="password"
              value={changePasswordForm.password}
              onChange={(event) =>
                setChangePasswordForm((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              fullWidth
            />
            <TextField
              label="Confirm password"
              type="password"
              value={changePasswordForm.confirmPassword}
              onChange={(event) =>
                setChangePasswordForm((prev) => ({
                  ...prev,
                  confirmPassword: event.target.value,
                }))
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  changeLoggedInPassword();
                }
              }}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setChangePasswordOpen(false);
              setChangePasswordForm(blankChangePasswordForm);
              setChangePasswordError("");
            }}
            disabled={authLoading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<LockResetIcon />}
            onClick={changeLoggedInPassword}
            disabled={authLoading}
          >
            {authLoading ? "Saving..." : "Change Password"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={Boolean(editingReservation)}
        onClose={closeReservationEditor}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Reservation</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h5">
                {editingRelease?.title ?? "Release"}
              </Typography>
              <Typography color="text.secondary">
                {editingRelease
                  ? formatReleaseDate(editingRelease.release_date)
                  : ""}
              </Typography>
              {editingRelease ? (
                <Box sx={{ mt: 1 }}>
                  <GameBadge game={editingRelease.game} size="small" />
                </Box>
              ) : null}
            </Box>

            <Box>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography sx={{ fontWeight: 900 }}>Choose Products</Typography>
                <Chip
                  label={`${editingReservationForm.productIds.length}/${editingReleaseProducts.length} selected`}
                  size="small"
                  color={
                    editingReservationForm.productIds.length
                      ? "primary"
                      : "default"
                  }
                  variant={
                    editingReservationForm.productIds.length
                      ? "filled"
                      : "outlined"
                  }
                />
              </Stack>
              <FormGroup
                sx={{
                  maxHeight: { xs: 320, sm: 420 },
                  overflowY: "auto",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 1,
                }}
              >
                {editingReleaseProducts.map((product) => (
                  <FormControlLabel
                    key={product.id}
                    control={
                      <Checkbox
                        checked={editingReservationForm.productIds.includes(
                          product.id
                        )}
                        onChange={(event) =>
                          updateEditingReservationProduct(
                            product.id,
                            event.target.checked
                          )
                        }
                      />
                    }
                    label={formatProductLabel(product)}
                  />
                ))}
              </FormGroup>
            </Box>

            <TextField
              label="Notes"
              value={editingReservationForm.notes}
              onChange={(event) =>
                setEditingReservationForm((prev) => ({
                  ...prev,
                  notes: event.target.value,
                }))
              }
              fullWidth
              multiline
              minRows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeReservationEditor}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={saveEditingReservation}
            disabled={!editingReservationForm.productIds.length}
          >
            Save Reservation
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
