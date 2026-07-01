import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
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
import InventoryIcon from "@mui/icons-material/Inventory";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import LockResetIcon from "@mui/icons-material/LockReset";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";

import {
  createReservationsSession,
  createReleaseProducts,
  createReleaseWithProducts,
  createReservation,
  fetchReservationsAuthUser,
  fetchReleaseProducts,
  fetchReleases,
  fetchReservationProfile,
  fetchReservationProfiles,
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
  updateReservationProfileAdmin,
  updateReservationsPassword,
  updateReservationStatus,
  upsertReservationProfile,
} from "./reservationSupabase";
import { TCG_OPTIONS } from "./timerControllerUtils";

const AUTH_SESSION_KEY = "geekd.reservations.authSession";
const PROFILE_REQUIRED_KEY = "geekd.reservations.profileRequired";

type ReservationProductDetail = ReleaseProductRecord & {
  reservationProductStatus: ReservationProductStatus;
};

const blankReleaseForm = {
  title: "",
  game: "",
  gameIsOther: false,
  release_date: "",
  description: "",
  products: [""] as string[],
};

type ReleaseProductFormItem = {
  id?: string;
  name: string;
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
    .sort((left, right) =>
      left.game.localeCompare(right.game, undefined, { sensitivity: "base" })
    );
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
    useState(blankPasswordForm);
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
  const [profiles, setProfiles] = useState<ReservationProfileRecord[]>([]);
  const [releaseForm, setReleaseForm] = useState(blankReleaseForm);
  const [editingReleaseId, setEditingReleaseId] = useState("");
  const [editReleaseForm, setEditReleaseForm] =
    useState<ReleaseEditForm | null>(null);
  const [reservationForms, setReservationForms] = useState<
    Record<string, typeof blankReservationForm>
  >({});
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
    return products.reduce<Record<string, ReleaseProductRecord[]>>(
      (groups, product) => {
        if (!product.is_active) return groups;

        groups[product.release_id] = [...(groups[product.release_id] ?? []), product];
        return groups;
      },
      {}
    );
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

  const currentUserReservations = useMemo(() => {
    if (!authSession) return [];

    return reservations
      .filter((reservation) => reservation.user_id === authSession.user.id)
      .sort((left, right) => {
        const leftRelease = releasesById[left.release_id];
        const rightRelease = releasesById[right.release_id];

        if (leftRelease && rightRelease) {
          return compareReleasesByDisplayDate(leftRelease, rightRelease);
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

  const reservationQueueGroups = useMemo(
    () => groupReleasesByGame(releases),
    [releases]
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
          profileRows,
        ] = await Promise.all([
          fetchReleases(includeReservations),
          fetchReleaseProducts(),
          fetchReservations(),
          fetchReservationProducts(),
          includeReservations
            ? fetchReservationProfiles()
            : Promise.resolve<ReservationProfileRecord[]>([]),
        ]);

        setReleases(releaseRows);
        setProducts(productRows);
        setReservations(reservationRows);
        setReservationProducts(reservationProductRows);
        setProfiles(profileRows);
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

  const validatePasswordForm = (form: typeof blankPasswordForm) => {
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
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
    if (!authSession || !validatePasswordForm(changePasswordForm)) {
      return;
    }

    setAuthLoading(true);
    setError("");
    setMessage("");

    try {
      const user = await updateReservationsPassword(
        authSession.access_token,
        changePasswordForm.password
      );
      persistAuthSession({
        ...authSession,
        user,
      });
      setChangePasswordForm(blankPasswordForm);
      setChangePasswordOpen(false);
      setMessage("Password changed.");
    } catch (err) {
      setError(
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
    setProfiles([]);
    setReservationForms({});

    if (currentAccessToken) {
      await signOutReservationsUser(currentAccessToken).catch(() => {});
    }
  };

  const saveProfile = async () => {
    if (!authSession) return;

    const displayName = profileForm.display_name.trim();
    const contact = profileForm.contact.trim();

    if (!displayName) {
      setError("Your name is required before using reservations.");
      return;
    }

    setProfileSaving(true);
    setError("");
    setMessage("");

    try {
      const savedProfile = await upsertReservationProfile({
        id: authSession.user.id,
        display_name: displayName,
        contact: contact || null,
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

    const productNames = releaseForm.products
      .map((product) => product.trim())
      .filter(Boolean);

    if (!releaseForm.title.trim() || !releaseForm.game.trim()) {
      setError("Release name and game are required.");
      return;
    }

    if (!productNames.length) {
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
        productNames
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
          }))
        : [{ name: "" }],
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

      const newProductNames = productItems
        .filter((product) => !product.id)
        .map((product) => product.name);

      const createdProducts = await createReleaseProducts(
        release.id,
        newProductNames,
        productItems.length - newProductNames.length
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
          employee_contact: profile.contact,
          notes: form.notes.trim() || null,
          product_ids: form.productIds,
        });
      } else {
        await createReservation({
          user_id: authSession.user.id,
          release_id: releaseId,
          employee_name: profile.display_name,
          employee_contact: profile.contact,
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
        employee_contact: profile.contact,
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

  const changeProfileAdmin = async (
    targetProfile: ReservationProfileRecord,
    checked: boolean
  ) => {
    if (!isAdmin) {
      setError("Admin access is required to manage profiles.");
      return;
    }

    if (targetProfile.id === authSession?.user.id && !checked) {
      setError("You cannot remove your own admin access.");
      return;
    }

    setError("");
    setMessage("");

    try {
      const updatedProfile = await updateReservationProfileAdmin(
        targetProfile.id,
        checked
      );

      setProfiles((prev) =>
        prev.map((item) => (item.id === updatedProfile.id ? updatedProfile : item))
      );

      if (profile?.id === updatedProfile.id) {
        setProfile(updatedProfile);
      }

      setMessage(
        checked
          ? `${updatedProfile.display_name} is now an admin.`
          : `${updatedProfile.display_name} is no longer an admin.`
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update profile access."
      );
    }
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
                  label="Contact or initials"
                  value={profileForm.contact}
                  onChange={(event) =>
                    setProfileForm((prev) => ({
                      ...prev,
                      contact: event.target.value,
                    }))
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      saveProfile();
                    }
                  }}
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
                onClick={() => setChangePasswordOpen(true)}
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
                <CardContent>
                  <Stack spacing={1.5}>
                    <Typography variant="h5">Your Reservations</Typography>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "repeat(2, minmax(0, 1fr))",
                          lg: "repeat(3, minmax(0, 1fr))",
                        },
                        gap: 1,
                      }}
                    >
                      {currentUserReservations.map((reservation) => {
                        const release = releases.find(
                          (item) => item.id === reservation.release_id
                        );

                        return (
                          <Paper
                            key={reservation.id}
                            variant="outlined"
                            component="button"
                            type="button"
                            onClick={() => openReservationEditor(reservation)}
                            sx={{
                              p: 1.5,
                              textAlign: "left",
                              borderColor: "divider",
                              cursor: "pointer",
                              bgcolor: "background.paper",
                              minHeight: 132,
                            }}
                          >
                            <Stack
                              spacing={1}
                              sx={{ height: "100%" }}
                              justifyContent="space-between"
                            >
                              <Box>
                                {release ? (
                                  <Box sx={{ mb: 0.75 }}>
                                    <GameBadge game={release.game} size="small" />
                                  </Box>
                                ) : null}
                                <Typography sx={{ fontWeight: 900 }}>
                                  {release?.title ?? "Release"}
                                </Typography>
                                <Typography color="text.secondary">
                                  {formatReleaseDate(
                                    release?.release_date ?? null
                                  )}
                                </Typography>
                                <Stack
                                  direction="row"
                                  spacing={0.75}
                                  flexWrap="wrap"
                                  useFlexGap
                                  sx={{ mt: 0.75 }}
                                >
                                  {(
                                    productsByReservation[reservation.id] ?? []
                                  ).map((product) => (
                                    <Chip
                                      key={product.id}
                                      label={`${product.name}: ${
                                        productStatusLabels[
                                          product.reservationProductStatus
                                        ]
                                      }`}
                                      color={getStatusColor(
                                        product.reservationProductStatus
                                      )}
                                      size="small"
                                      variant="outlined"
                                    />
                                  ))}
                                  {!productsByReservation[reservation.id]
                                    ?.length ? (
                                    <Typography color="text.secondary">
                                      No products selected
                                    </Typography>
                                  ) : null}
                                </Stack>
                              </Box>
                              <Stack
                                direction="row"
                                spacing={1}
                                flexWrap="wrap"
                                useFlexGap
                              >
                                <Chip
                                  label={statusLabels[reservation.status]}
                                  color={getStatusColor(reservation.status)}
                                  size="small"
                                />
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
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ) : null}

            <Stack spacing={2}>
            {unrequestedReleaseGroups.map((group) => (
              <Card key={group.game}>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1}
                      alignItems={{ xs: "flex-start", sm: "center" }}
                      justifyContent="space-between"
                    >
                      <GameBadge game={group.game} />
                      <Chip
                        label={`${group.releases.length} releases`}
                        variant="outlined"
                      />
                    </Stack>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          md: "repeat(2, minmax(0, 1fr))",
                          xl: "repeat(3, minmax(0, 1fr))",
                        },
                        gap: { xs: 2, lg: 2.5 },
                        alignItems: "stretch",
                      }}
                    >
                    {group.releases.map((release) => {
                      const form = reservationForms[release.id] ?? blankReservationForm;
                      const releaseProducts = productsByRelease[release.id] ?? [];
                      const isSavingReservation =
                        savingReservationReleaseId === release.id;

                      return (
                        <Card
                          key={release.id}
                          sx={{ height: "100%", position: "relative", overflow: "hidden" }}
                        >
                          <CardContent
                            sx={{
                              height: "100%",
                              p: { xs: 2, lg: 2.5 },
                            }}
                          >
                            <Stack spacing={2} sx={{ height: "100%" }}>
                              <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{ minWidth: 0 }}>
                                  <Typography variant="h5">
                                    {release.title}
                                  </Typography>
                                  <Typography color="text.secondary">
                                    {formatReleaseDate(release.release_date)}
                                  </Typography>
                                </Box>
                              </Stack>

                              {release.description ? (
                                <Typography>{release.description}</Typography>
                              ) : null}

                              <Divider />

                              <Box>
                                <Typography sx={{ fontWeight: 900, mb: 1 }}>
                                  Products
                                </Typography>
                                {releaseProducts.length ? (
                                  <FormGroup
                                    sx={{
                                      display: "grid",
                                      gridTemplateColumns: {
                                        xs: "1fr",
                                        lg: "repeat(2, minmax(0, 1fr))",
                                      },
                                      columnGap: 1,
                                    }}
                                  >
                                    {releaseProducts.map((product) => (
                                      <FormControlLabel
                                        key={product.id}
                                        control={
                                          <Checkbox
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
                                        label={product.name}
                                      />
                                    ))}
                                  </FormGroup>
                                ) : (
                                  <Alert severity="info">
                                    Products have not been added for this release yet.
                                  </Alert>
                                )}
                              </Box>

                              <Paper
                                variant="outlined"
                                sx={{ p: 1.5, bgcolor: "background.default" }}
                              >
                                <Stack
                                  direction={{ xs: "column", sm: "row" }}
                                  spacing={0.75}
                                  justifyContent="space-between"
                                >
                                  <Typography sx={{ fontWeight: 900 }}>
                                    Requesting as {profile.display_name}
                                  </Typography>
                                  {profile.contact ? (
                                    <Typography color="text.secondary">
                                      {profile.contact}
                                    </Typography>
                                  ) : null}
                                </Stack>
                              </Paper>
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
                                minRows={2}
                              />
                              <Button
                                variant="contained"
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
                                  ? "Request Reservation"
                                  : "Select a Product First"}
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
                                <CircularProgress />
                                <Typography sx={{ fontWeight: 900 }}>
                                  Saving reservation...
                                </Typography>
                              </Stack>
                            </Box>
                          ) : null}
                        </Card>
                      );
                    })}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}

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
          </Stack>
        ) : null}

        {tab === 1 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "280px 1fr" },
              gap: 2,
              alignItems: "start",
            }}
          >
                <Card sx={{ position: { lg: "sticky" }, top: { lg: 88 } }}>
                  <CardContent>
                    <Stack spacing={1.5}>
                      <Typography variant="h5">Queue Controls</Typography>
                      <Chip
                        label={`${reservationQueueGroups.length} games`}
                        variant="outlined"
                      />
                      <Chip label={`${releases.length} releases`} />
                      <Chip
                        label={`${reservations.length} reservations`}
                        color="primary"
                      />
                      <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={() => loadData(true)}
                        disabled={loading}
                      >
                        Refresh
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>

                <Stack spacing={2} sx={{ minWidth: 0 }}>
                {reservationQueueGroups.map((group) => (
                  <Card key={group.game}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          spacing={1}
                          alignItems={{ xs: "flex-start", sm: "center" }}
                          justifyContent="space-between"
                        >
                          <GameBadge game={group.game} />
                          <Chip
                            label={`${group.releases.length} releases`}
                            variant="outlined"
                          />
                        </Stack>

                        <Stack spacing={1.5}>
                          {group.releases.map((release) => {
                            const releaseReservations =
                              reservationsByRelease[release.id] ?? [];

                            return (
                              <Paper
                                key={release.id}
                                variant="outlined"
                                sx={{ p: { xs: 1.5, sm: 2 } }}
                              >
                                <Stack spacing={1.5}>
                                  <Stack
                                    direction={{ xs: "column", md: "row" }}
                                    spacing={1}
                                    alignItems={{
                                      xs: "flex-start",
                                      md: "center",
                                    }}
                                    justifyContent="space-between"
                                  >
                                    <Box>
                                      <Typography variant="h5">
                                        {release.title}
                                      </Typography>
                                      <Typography color="text.secondary">
                                        {formatReleaseDate(
                                          release.release_date
                                        )}
                                      </Typography>
                                    </Box>
                                    <Chip
                                      label={`${releaseReservations.length} reservations`}
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

                                  <Stack spacing={1.25}>
                                    {releaseReservations.map(
                                      (reservation, index) => (
                                        <Paper
                                          key={reservation.id}
                                          variant="outlined"
                                          sx={{
                                            p: { xs: 1.5, sm: 2 },
                                            bgcolor: "background.default",
                                          }}
                                        >
                                          <Stack
                                            direction={{
                                              xs: "column",
                                              md: "row",
                                            }}
                                            spacing={1.5}
                                            alignItems={{
                                              xs: "stretch",
                                              md: "center",
                                            }}
                                            justifyContent="space-between"
                                          >
                                            <Box>
                                              <Stack
                                                direction="row"
                                                spacing={1}
                                                alignItems="center"
                                                flexWrap="wrap"
                                              >
                                                <Chip label={`#${index + 1}`} />
                                                <Typography
                                                  variant="h6"
                                                  sx={{ fontWeight: 900 }}
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
                                                />
                                              </Stack>
                                              <Typography color="text.secondary">
                                                {formatRequestTime(
                                                  reservation.created_at
                                                )}
                                                {reservation.employee_contact
                                                  ? ` - ${reservation.employee_contact}`
                                                  : ""}
                                              </Typography>
                                              <Stack
                                                spacing={0.75}
                                                sx={{ mt: 0.75 }}
                                              >
                                                {(
                                                  productsByReservation[
                                                    reservation.id
                                                  ] ?? []
                                                ).map((product) => (
                                                  <Paper
                                                    key={product.id}
                                                    variant="outlined"
                                                    sx={{ p: 1 }}
                                                  >
                                                    <Stack
                                                      direction={{
                                                        xs: "column",
                                                        sm: "row",
                                                      }}
                                                      spacing={1}
                                                      alignItems={{
                                                        xs: "stretch",
                                                        sm: "center",
                                                      }}
                                                      justifyContent="space-between"
                                                    >
                                                      <Typography
                                                        sx={{ fontWeight: 800 }}
                                                      >
                                                        {product.name}
                                                      </Typography>
                                                      <FormControl
                                                        size="small"
                                                        sx={{ minWidth: 160 }}
                                                      >
                                                        <InputLabel>
                                                          Product Status
                                                        </InputLabel>
                                                        <Select
                                                          label="Product Status"
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
                                                            ([value, label]) => (
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
                                                ))}
                                              </Stack>
                                              {reservation.notes ? (
                                                <Typography sx={{ mt: 0.5 }}>
                                                  {reservation.notes}
                                                </Typography>
                                              ) : null}
                                            </Box>

                                            <FormControl sx={{ minWidth: 190 }}>
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
                          onChange={(event) =>
                            setReleaseForm((prev) => ({
                              ...prev,
                              release_date: event.target.value,
                            }))
                          }
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
                                value={product}
                                onChange={(event) =>
                                  setReleaseForm((prev) => ({
                                    ...prev,
                                    products: prev.products.map(
                                      (currentProduct, productIndex) =>
                                        productIndex === index
                                          ? event.target.value
                                          : currentProduct
                                    ),
                                  }))
                                }
                                fullWidth
                              />
                              <Button
                                variant="outlined"
                                color="warning"
                                onClick={() =>
                                  setReleaseForm((prev) => ({
                                    ...prev,
                                    products:
                                      prev.products.length <= 1
                                        ? [""]
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
                                products: [...prev.products, ""],
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

                  <Card>
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          spacing={1}
                          justifyContent="space-between"
                          alignItems={{ xs: "stretch", sm: "center" }}
                        >
                          <Typography variant="h5">Admin Accounts</Typography>
                          <Button
                            variant="outlined"
                            startIcon={<RefreshIcon />}
                            onClick={() => loadData(true)}
                            disabled={loading}
                          >
                            Refresh
                          </Button>
                        </Stack>

                        <Stack spacing={1}>
                          {profiles.map((item) => (
                            <Paper
                              key={item.id}
                              variant="outlined"
                              sx={{ p: 1.25 }}
                            >
                              <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1}
                                justifyContent="space-between"
                                alignItems={{ xs: "stretch", sm: "center" }}
                              >
                                <Box sx={{ minWidth: 0 }}>
                                  <Typography sx={{ fontWeight: 900 }}>
                                    {item.display_name}
                                  </Typography>
                                  <Typography color="text.secondary">
                                    {item.contact || "No contact saved"}
                                  </Typography>
                                </Box>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={item.is_admin}
                                      onChange={(event) =>
                                        changeProfileAdmin(
                                          item,
                                          event.target.checked
                                        )
                                      }
                                      disabled={
                                        item.id === authSession.user.id &&
                                        item.is_admin
                                      }
                                    />
                                  }
                                  label="Admin"
                                />
                              </Stack>
                            </Paper>
                          ))}

                          {!profiles.length ? (
                            <Typography color="text.secondary">
                              No profiles have been created yet.
                            </Typography>
                          ) : null}
                        </Stack>
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
                        <Typography variant="h5">Current Releases</Typography>
                        <Button
                          variant="outlined"
                          startIcon={<RefreshIcon />}
                          onClick={() => loadData(true)}
                          disabled={loading}
                        >
                          Refresh
                        </Button>
                      </Stack>

                      <Stack spacing={1.25}>
                        {releases.map((release) => {
                          const isEditing = editingReleaseId === release.id;

                          return (
                          <Paper
                            key={release.id}
                            variant="outlined"
                            sx={{ p: { xs: 1.5, sm: 2 } }}
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
                                                          ? [{ name: "" }]
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
                                                  { name: "" },
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
                              spacing={1.5}
                              justifyContent="space-between"
                              alignItems={{ xs: "stretch", md: "center" }}
                              sx={{ display: isEditing ? "none" : "flex" }}
                            >
                              <Box>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                  flexWrap="wrap"
                                >
                                  <Typography variant="h6">
                                    {release.title}
                                  </Typography>
                                  <GameBadge game={release.game} size="small" />
                                  <Chip
                                    label={
                                      release.is_active ? "Active" : "Archived"
                                    }
                                    color={
                                      release.is_active ? "success" : "default"
                                    }
                                  />
                                </Stack>
                                <Typography color="text.secondary">
                                  {formatReleaseDate(release.release_date)} •{" "}
                                  {reservationsByRelease[release.id]?.length ??
                                    0}{" "}
                                  requests
                                </Typography>
                                <Stack
                                  direction="row"
                                  spacing={0.75}
                                  flexWrap="wrap"
                                  useFlexGap
                                  sx={{ mt: 1 }}
                                >
                                  {(productsByRelease[release.id] ?? []).map(
                                    (product) => (
                                      <Chip
                                        key={product.id}
                                        label={product.name}
                                        size="small"
                                        variant="outlined"
                                      />
                                    )
                                  )}
                                </Stack>
                              </Box>

                              <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1}
                              >
                                <Button
                                  variant="outlined"
                                  startIcon={<EditIcon />}
                                  onClick={() => startEditingRelease(release)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outlined"
                                  startIcon={<SaveIcon />}
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
                          </Paper>
                          );
                        })}
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
            setChangePasswordForm(blankPasswordForm);
          }
        }}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
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
              setChangePasswordForm(blankPasswordForm);
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
              <Typography sx={{ fontWeight: 900, mb: 1 }}>
                Products
              </Typography>
              <FormGroup>
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
                    label={product.name}
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
