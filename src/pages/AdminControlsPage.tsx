import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Paper,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";

import { useEmployeeAuth } from "../hooks/useEmployeeAuth";
import {
  createReservationEmployeeAccount,
  createLootBuyCategory,
  EMPLOYEE_ROLE_OPTIONS,
  fetchLootBuyCategories,
  fetchReservationProfiles,
  getPublicStorageUrl,
  type EmployeeRole,
  type LootBuyCategoryRecord,
  type ReservationProfileRecord,
  updateEmployeeProfileAccess,
  updateLootBuyCategory,
  uploadLootBuyCategoryLogo,
} from "./reservationSupabase";
import { TCG_OPTIONS } from "./timerControllerUtils";

const DEFAULT_NEW_USER_PASSWORD = "Geekd1234!";

const blankNewUserForm = {
  displayName: "",
  email: "",
  password: DEFAULT_NEW_USER_PASSWORD,
  isAdmin: false,
  role: "staff" as EmployeeRole,
  isActive: true,
};

type NewCategoryForm = {
  name: string;
  isActive: boolean;
  isBuying: boolean;
};

const blankNewCategoryForm = {
  name: "",
  isActive: true,
  isBuying: false,
} satisfies NewCategoryForm;

const normalizeTcgName = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "");

const getCategoryLogoOption = (name: string) => {
  const normalizedName = normalizeTcgName(name);

  return TCG_OPTIONS.find((option) => {
    const normalizedOptionName = normalizeTcgName(option.name);
    return (
      normalizedName === normalizedOptionName ||
      normalizedName.includes(normalizedOptionName) ||
      normalizedOptionName.includes(normalizedName)
    );
  });
};

const getCategoryInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "TCG";

const getCategoryLogoUrl = (category: LootBuyCategoryRecord) =>
  category.logo_path
    ? getPublicStorageUrl("tcg-logos", category.logo_path)
    : null;

export default function AdminControlsPage() {
  const {
    authSession,
    profile,
    loading,
    error,
    message,
    setError,
    setMessage,
  } = useEmployeeAuth();
  const [profiles, setProfiles] = useState<ReservationProfileRecord[]>([]);
  const [profilesLoading, setProfilesLoading] = useState(false);
  const [newUserForm, setNewUserForm] = useState(blankNewUserForm);
  const [creatingUser, setCreatingUser] = useState(false);
  const [buyCategories, setBuyCategories] = useState<LootBuyCategoryRecord[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [adminTab, setAdminTab] = useState(0);
  const [newCategoryForm, setNewCategoryForm] =
    useState<NewCategoryForm>(blankNewCategoryForm);
  const [newCategoryLogoFile, setNewCategoryLogoFile] = useState<File | null>(
    null
  );
  const [newCategoryDialogOpen, setNewCategoryDialogOpen] = useState(false);
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const [editingCategoryLogoFile, setEditingCategoryLogoFile] =
    useState<File | null>(null);
  const [savingCategoryId, setSavingCategoryId] = useState<string | null>(null);

  const isAdmin = Boolean(profile?.is_admin);

  const loadProfiles = useCallback(async () => {
    if (!isAdmin) return;

    setProfilesLoading(true);
    setError("");

    try {
      const profileRows = await fetchReservationProfiles();
      setProfiles(profileRows);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load employee profiles."
      );
    } finally {
      setProfilesLoading(false);
    }
  }, [isAdmin, setError]);

  useEffect(() => {
    if (isAdmin) {
      loadProfiles();
    } else {
      setProfiles([]);
    }
  }, [isAdmin, loadProfiles]);

  const loadBuyCategories = useCallback(async () => {
    if (!isAdmin) return;

    setCategoriesLoading(true);
    setError("");

    try {
      const rows = await fetchLootBuyCategories();
      setBuyCategories(rows);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load active TCG settings."
      );
    } finally {
      setCategoriesLoading(false);
    }
  }, [isAdmin, setError]);

  useEffect(() => {
    if (isAdmin) {
      loadBuyCategories();
    } else {
      setBuyCategories([]);
    }
  }, [isAdmin, loadBuyCategories]);

  const handleCreateUser = async () => {
    if (!isAdmin) {
      setError("Admin access is required to create employee accounts.");
      return;
    }

    if (!newUserForm.displayName.trim()) {
      setError("Employee name is required.");
      return;
    }

    if (!newUserForm.email.trim() || !newUserForm.email.includes("@")) {
      setError("Enter a valid employee email.");
      return;
    }

    if (newUserForm.password.length < 8) {
      setError("Default password must be at least 8 characters.");
      return;
    }

    setCreatingUser(true);
    setError("");
    setMessage("");

    try {
      await createReservationEmployeeAccount({
        email: newUserForm.email.trim(),
        password: newUserForm.password,
        display_name: newUserForm.displayName.trim(),
        is_admin: newUserForm.isAdmin,
        role: newUserForm.isAdmin ? "admin" : newUserForm.role,
        is_active: newUserForm.isActive,
      });
      setNewUserForm(blankNewUserForm);
      setMessage("Employee account created.");
      await loadProfiles();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to create employee account."
      );
    } finally {
      setCreatingUser(false);
    }
  };

  const changeProfileAccess = async (
    targetProfile: ReservationProfileRecord,
    patch: Partial<{
      is_admin: boolean;
      role: EmployeeRole;
      is_active: boolean;
    }>
  ) => {
    if (!isAdmin) {
      setError("Admin access is required to manage profiles.");
      return;
    }

    if (targetProfile.id === authSession?.user.id && patch.is_admin === false) {
      setError("You cannot remove your own admin access.");
      return;
    }

    if (targetProfile.id === authSession?.user.id && patch.is_active === false) {
      setError("You cannot deactivate your own account.");
      return;
    }

    setError("");
    setMessage("");

    try {
      const nextProfile = {
        is_admin: patch.is_admin ?? targetProfile.is_admin,
        role: patch.role ?? targetProfile.role,
        is_active: patch.is_active ?? targetProfile.is_active,
      };
      const updatedProfile = await updateEmployeeProfileAccess(
        targetProfile.id,
        nextProfile
      );

      setProfiles((prev) =>
        prev.map((item) => (item.id === updatedProfile.id ? updatedProfile : item))
      );

      setMessage(`${updatedProfile.display_name} was updated.`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update profile access."
      );
    }
  };

  const changeBuyCategory = async (
    category: LootBuyCategoryRecord,
    patch: Partial<Pick<LootBuyCategoryRecord, "is_active" | "is_buying">>
  ) => {
    setError("");
    setMessage("");

    const nextPatch = {
      ...patch,
      ...(patch.is_active === false ? { is_buying: false } : {}),
    };

    try {
      const updatedCategory = await updateLootBuyCategory(category.id, nextPatch);
      setBuyCategories((prev) =>
        prev.map((item) =>
          item.id === updatedCategory.id ? updatedCategory : item
        )
      );
      setMessage(`${updatedCategory.name} was updated.`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update active TCG settings."
      );
    }
  };

  const startEditingBuyCategory = (category: LootBuyCategoryRecord) => {
    setEditingCategoryId(category.id);
    setEditingCategoryName(category.name);
    setEditingCategoryLogoFile(null);
    setError("");
    setMessage("");
  };

  const cancelEditingBuyCategory = () => {
    setEditingCategoryId(null);
    setEditingCategoryName("");
    setEditingCategoryLogoFile(null);
  };

  const closeNewCategoryDialog = () => {
    if (creatingCategory) return;

    setNewCategoryDialogOpen(false);
    setNewCategoryForm(blankNewCategoryForm);
    setNewCategoryLogoFile(null);
  };

  const saveBuyCategory = async (category: LootBuyCategoryRecord) => {
    const nextName = editingCategoryName.trim();

    if (!nextName) {
      setError("TCG name is required.");
      return;
    }

    setSavingCategoryId(category.id);
    setError("");
    setMessage("");

    try {
      let updatedCategory = await updateLootBuyCategory(category.id, {
        name: nextName,
      });

      if (editingCategoryLogoFile) {
        updatedCategory = await uploadLootBuyCategoryLogo(
          updatedCategory.id,
          editingCategoryLogoFile
        );
      }

      setBuyCategories((prev) =>
        prev.map((item) =>
          item.id === updatedCategory.id ? updatedCategory : item
        )
      );
      setEditingCategoryId(null);
      setEditingCategoryName("");
      setEditingCategoryLogoFile(null);
      setMessage(`${updatedCategory.name} was updated.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update TCG.");
    } finally {
      setSavingCategoryId(null);
    }
  };

  const createBuyCategory = async () => {
    if (!newCategoryForm.name.trim()) {
      setError("TCG name is required.");
      return;
    }

    setCreatingCategory(true);
    setError("");
    setMessage("");

    try {
      const maxSortOrder = buyCategories.reduce(
        (max, category) => Math.max(max, category.sort_order),
        0
      );
      let createdCategory = await createLootBuyCategory({
        name: newCategoryForm.name,
        is_active: newCategoryForm.isActive,
        is_buying: newCategoryForm.isActive && newCategoryForm.isBuying,
        sort_order: maxSortOrder + 10,
      });

      if (newCategoryLogoFile) {
        createdCategory = await uploadLootBuyCategoryLogo(
          createdCategory.id,
          newCategoryLogoFile
        );
      }

      setBuyCategories((prev) =>
        [...prev, createdCategory].sort(
          (left, right) =>
            left.sort_order - right.sort_order ||
            left.name.localeCompare(right.name)
        )
      );
      setNewCategoryForm(blankNewCategoryForm);
      setNewCategoryLogoFile(null);
      setNewCategoryDialogOpen(false);
      setMessage(`${createdCategory.name} was added.`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to create TCG."
      );
    } finally {
      setCreatingCategory(false);
    }
  };

  const moveBuyCategory = async (
    category: LootBuyCategoryRecord,
    direction: -1 | 1
  ) => {
    const currentIndex = buyCategories.findIndex((item) => item.id === category.id);
    const swapIndex = currentIndex + direction;

    if (currentIndex < 0 || swapIndex < 0 || swapIndex >= buyCategories.length) {
      return;
    }

    const otherCategory = buyCategories[swapIndex];
    const currentSortOrder = category.sort_order;
    const otherSortOrder = otherCategory.sort_order;

    setError("");
    setMessage("");

    try {
      const [updatedCurrent, updatedOther] = await Promise.all([
        updateLootBuyCategory(category.id, { sort_order: otherSortOrder }),
        updateLootBuyCategory(otherCategory.id, { sort_order: currentSortOrder }),
      ]);

      setBuyCategories((prev) =>
        prev
          .map((item) => {
            if (item.id === updatedCurrent.id) return updatedCurrent;
            if (item.id === updatedOther.id) return updatedOther;
            return item;
          })
          .sort(
            (left, right) =>
              left.sort_order - right.sort_order ||
              left.name.localeCompare(right.name)
          )
      );
      setMessage("TCG sort order updated.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update TCG sort order."
      );
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Paper sx={{ p: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <CircularProgress size={24} />
            <Typography>Checking admin access...</Typography>
          </Stack>
        </Paper>
      </Container>
    );
  }

  if (!isAdmin) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Alert severity="warning">
          Admin access is required to manage employee accounts and toolkit
          settings.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Stack spacing={2.5}>
        <Paper sx={{ p: { xs: 2, md: 3 } }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <AdminPanelSettingsIcon color="primary" sx={{ fontSize: 38 }} />
            <Box>
              <Typography variant="h1">Admin Controls</Typography>
              <Typography color="text.secondary">
                Manage employee accounts, access, and admin-only toolkit
                settings.
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {message ? <Alert severity="success">{message}</Alert> : null}
        {error ? <Alert severity="error">{error}</Alert> : null}

        <Paper sx={{ overflow: "hidden" }}>
          <Tabs
            value={adminTab}
            onChange={(_, nextTab) => setAdminTab(nextTab)}
            variant="fullWidth"
          >
            <Tab label="User Management" />
            <Tab label="Supported TCGs" />
          </Tabs>
        </Paper>

        {adminTab === 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "420px minmax(0, 1fr)" },
              gap: 2,
              alignItems: "start",
            }}
          >
          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="h5">Create Employee Account</Typography>
                <Typography color="text.secondary">
                  Add a login with a default password they can change later.
                </Typography>
              </Box>
              <TextField
                label="Name"
                value={newUserForm.displayName}
                onChange={(event) =>
                  setNewUserForm((prev) => ({
                    ...prev,
                    displayName: event.target.value,
                  }))
                }
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                value={newUserForm.email}
                onChange={(event) =>
                  setNewUserForm((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                fullWidth
              />
              <TextField
                label="Default password"
                type="text"
                value={newUserForm.password}
                onChange={(event) =>
                  setNewUserForm((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
                helperText="Share this with the employee so they can log in once."
                fullWidth
              />
              <TextField
                select
                label="Loot role"
                value={newUserForm.role}
                onChange={(event) =>
                  setNewUserForm((prev) => ({
                    ...prev,
                    role: event.target.value as EmployeeRole,
                  }))
                }
                disabled={newUserForm.isAdmin}
                helperText={
                  newUserForm.isAdmin
                    ? "Admin accounts use the Admin loot role."
                    : "Used by loot tracker permissions and staff selection."
                }
                fullWidth
              >
                {EMPLOYEE_ROLE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <FormControlLabel
                control={
                  <Switch
                    checked={newUserForm.isAdmin}
                    onChange={(event) =>
                      setNewUserForm((prev) => ({
                        ...prev,
                        isAdmin: event.target.checked,
                      }))
                    }
                  />
                }
                label="Admin account"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={newUserForm.isActive}
                    onChange={(event) =>
                      setNewUserForm((prev) => ({
                        ...prev,
                        isActive: event.target.checked,
                      }))
                    }
                  />
                }
                label="Active staff account"
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateUser}
                disabled={creatingUser}
              >
                {creatingUser ? "Creating..." : "Create Account"}
              </Button>
            </Stack>
          </Paper>

          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={2}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                <Box>
                  <Typography variant="h5">Employee Access</Typography>
                  <Typography color="text.secondary">
                    Manage who can use admin tools.
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={loadProfiles}
                  disabled={profilesLoading}
                >
                  Refresh
                </Button>
              </Stack>

              <Stack spacing={1}>
                {profiles.map((item) => (
                  <Paper key={item.id} variant="outlined" sx={{ p: 1.25 }}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1}
                      justifyContent="space-between"
                      alignItems={{ xs: "stretch", sm: "center" }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Stack
                          direction="row"
                          spacing={0.75}
                          alignItems="center"
                          flexWrap="wrap"
                          useFlexGap
                        >
                          <Typography sx={{ fontWeight: 900 }}>
                            {item.display_name}
                          </Typography>
                          <Chip
                            size="small"
                            label={item.is_admin ? "Admin" : "Employee"}
                            color={item.is_admin ? "secondary" : "default"}
                          />
                          <Chip
                            size="small"
                            label={
                              EMPLOYEE_ROLE_OPTIONS.find(
                                (option) => option.value === item.role
                              )?.label ?? item.role
                            }
                            variant="outlined"
                          />
                          <Chip
                            size="small"
                            label={item.is_active ? "Active" : "Inactive"}
                            color={item.is_active ? "success" : "default"}
                            variant={item.is_active ? "filled" : "outlined"}
                          />
                        </Stack>
                        <Typography color="text.secondary">
                          {item.contact || "No email saved"}
                        </Typography>
                      </Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={item.is_admin}
                            onChange={(event) =>
                              changeProfileAccess(item, {
                                is_admin: event.target.checked,
                                role: event.target.checked ? "admin" : item.role,
                              })
                            }
                            disabled={
                              item.id === authSession?.user.id && item.is_admin
                            }
                          />
                        }
                        label="Admin"
                        sx={{ m: 0 }}
                      />
                      <TextField
                        select
                        size="small"
                        label="Loot role"
                        value={item.role}
                        onChange={(event) =>
                          changeProfileAccess(item, {
                            role: event.target.value as EmployeeRole,
                          })
                        }
                        sx={{ minWidth: 180 }}
                      >
                        {EMPLOYEE_ROLE_OPTIONS.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={item.is_active}
                            onChange={(event) =>
                              changeProfileAccess(item, {
                                is_active: event.target.checked,
                              })
                            }
                            disabled={
                              item.id === authSession?.user.id && item.is_active
                            }
                          />
                        }
                        label="Active"
                        sx={{ m: 0 }}
                      />
                    </Stack>
                  </Paper>
                ))}

                {!profiles.length ? (
                  <Typography color="text.secondary">
                    {profilesLoading
                      ? "Loading employee profiles..."
                      : "No profiles have been created yet."}
                  </Typography>
                ) : null}
              </Stack>
            </Stack>
          </Paper>
          </Box>
        ) : null}

        {adminTab === 1 ? (
        <Paper sx={{ p: { xs: 2, md: 3 } }}>
          <Stack spacing={2}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              justifyContent="space-between"
              alignItems={{ xs: "stretch", sm: "center" }}
            >
              <Box>
                <Typography variant="h5">Supported TCGs</Typography>
                <Typography color="text.secondary">
                  Control which TCGs are active in the store and which ones
                  appear on the customer buy intake form.
                </Typography>
              </Box>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setNewCategoryForm(blankNewCategoryForm);
                    setNewCategoryLogoFile(null);
                    setNewCategoryDialogOpen(true);
                  }}
                >
                  Add TCG
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={loadBuyCategories}
                  disabled={categoriesLoading}
                >
                  Refresh
                </Button>
              </Stack>
            </Stack>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(2, minmax(0, 1fr))",
                  xl: "repeat(3, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {buyCategories.map((category, index) => {
                const logoOption = getCategoryLogoOption(category.name);
                const uploadedLogoUrl = getCategoryLogoUrl(category);
                const isEditing = editingCategoryId === category.id;
                const isSaving = savingCategoryId === category.id;
                const logoSrc = uploadedLogoUrl ?? logoOption?.logoImage ?? null;

                return (
                  <Paper
                    key={category.id}
                    variant="outlined"
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        height: 116,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 1,
                        bgcolor: uploadedLogoUrl
                          ? "grey.50"
                          : logoOption?.background ?? "grey.100",
                        border: "1px solid",
                        borderColor: "divider",
                        overflow: "hidden",
                      }}
                    >
                      {logoSrc ? (
                        <Box
                          component="img"
                          src={logoSrc}
                          alt={`${category.name} logo`}
                          sx={{
                            maxWidth: "82%",
                            maxHeight: 84,
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <Typography
                          sx={{
                            color: "text.secondary",
                            fontSize: 34,
                            fontWeight: 950,
                            letterSpacing: 1,
                          }}
                        >
                          {getCategoryInitials(category.name)}
                        </Typography>
                      )}
                    </Box>

                    <Stack spacing={1}>
                      {isEditing ? (
                        <Stack spacing={1}>
                          <TextField
                            label="TCG name"
                            value={editingCategoryName}
                            onChange={(event) =>
                              setEditingCategoryName(event.target.value)
                            }
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                saveBuyCategory(category);
                              }
                              if (event.key === "Escape") {
                                cancelEditingBuyCategory();
                              }
                            }}
                            autoFocus
                            fullWidth
                          />
                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1}
                            alignItems={{ xs: "stretch", sm: "center" }}
                          >
                            <Button variant="outlined" component="label">
                              {editingCategoryLogoFile
                                ? "Change Logo"
                                : category.logo_path
                                  ? "Replace Logo"
                                  : "Choose Logo"}
                              <input
                                hidden
                                type="file"
                                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                                onChange={(event) =>
                                  setEditingCategoryLogoFile(
                                    event.target.files?.[0] ?? null
                                  )
                                }
                              />
                            </Button>
                            <Typography variant="body2" color="text.secondary">
                              {editingCategoryLogoFile
                                ? editingCategoryLogoFile.name
                                : category.logo_path
                                  ? "Custom logo saved"
                                  : "No custom logo"}
                            </Typography>
                          </Stack>
                        </Stack>
                      ) : (
                        <Typography variant="h6" sx={{ fontWeight: 900 }}>
                          {category.name}
                        </Typography>
                      )}

                      <Stack
                        direction="row"
                        spacing={0.75}
                        alignItems="center"
                        flexWrap="wrap"
                        useFlexGap
                      >
                        <Chip
                          size="small"
                          label={category.is_active ? "Active" : "Inactive"}
                          color={category.is_active ? "success" : "default"}
                          variant={category.is_active ? "filled" : "outlined"}
                        />
                        <Chip
                          size="small"
                          label={category.is_buying ? "Buying" : "Not Buying"}
                          color={category.is_buying ? "secondary" : "default"}
                          variant={category.is_buying ? "filled" : "outlined"}
                        />
                        <Chip
                          size="small"
                          label={`Order ${category.sort_order}`}
                          variant="outlined"
                        />
                        {category.logo_path ? (
                          <Chip
                            size="small"
                            label="Custom Logo"
                            color="info"
                            variant="outlined"
                          />
                        ) : null}
                      </Stack>
                    </Stack>

                    <Stack spacing={1} sx={{ mt: "auto" }}>
                      <Stack direction="row" spacing={0.75}>
                        {isEditing ? (
                          <>
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<SaveIcon />}
                              onClick={() => saveBuyCategory(category)}
                              disabled={isSaving}
                              fullWidth
                            >
                              {isSaving ? "Saving..." : "Save"}
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<CancelIcon />}
                              onClick={cancelEditingBuyCategory}
                              disabled={isSaving}
                              fullWidth
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => startEditingBuyCategory(category)}
                            fullWidth
                          >
                            Edit
                          </Button>
                        )}
                      </Stack>

                      <Stack direction="row" spacing={0.75}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<ArrowUpwardIcon />}
                          onClick={() => moveBuyCategory(category, -1)}
                          disabled={index === 0}
                          fullWidth
                        >
                          Up
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<ArrowDownwardIcon />}
                          onClick={() => moveBuyCategory(category, 1)}
                          disabled={index === buyCategories.length - 1}
                          fullWidth
                        >
                          Down
                        </Button>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="space-between"
                        flexWrap="wrap"
                        useFlexGap
                      >
                        <FormControlLabel
                          control={
                            <Switch
                              checked={category.is_active}
                              onChange={(event) =>
                                changeBuyCategory(category, {
                                  is_active: event.target.checked,
                                })
                              }
                            />
                          }
                          label="Active"
                          sx={{ m: 0 }}
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={category.is_buying}
                              disabled={!category.is_active}
                              onChange={(event) =>
                                changeBuyCategory(category, {
                                  is_buying: event.target.checked,
                                })
                              }
                            />
                          }
                          label="Buying"
                          sx={{ m: 0 }}
                        />
                      </Stack>
                    </Stack>
                  </Paper>
                );
              })}

              {!buyCategories.length ? (
                <Typography color="text.secondary">
                  {categoriesLoading
                    ? "Loading active TCG settings..."
                    : "No buy categories have been configured yet."}
                </Typography>
              ) : null}
            </Box>
          </Stack>
        </Paper>
        ) : null}

        <Dialog
          open={newCategoryDialogOpen}
          onClose={closeNewCategoryDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Add TCG</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Typography color="text.secondary">
                New entries can stay active in the store without appearing on
                buy intake until Buying is enabled.
              </Typography>
              <TextField
                label="TCG name"
                value={newCategoryForm.name}
                onChange={(event) =>
                  setNewCategoryForm((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    createBuyCategory();
                  }
                }}
                autoFocus
                fullWidth
              />
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                <Button variant="outlined" component="label">
                  {newCategoryLogoFile ? "Change Logo" : "Choose Logo"}
                  <input
                    hidden
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={(event) =>
                      setNewCategoryLogoFile(event.target.files?.[0] ?? null)
                    }
                  />
                </Button>
                <Typography variant="body2" color="text.secondary">
                  {newCategoryLogoFile
                    ? newCategoryLogoFile.name
                    : "PNG, JPG, WebP, or SVG up to 1MB"}
                </Typography>
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={newCategoryForm.isActive}
                      onChange={(event) =>
                        setNewCategoryForm((prev) => ({
                          ...prev,
                          isActive: event.target.checked,
                          isBuying: event.target.checked ? prev.isBuying : false,
                        }))
                      }
                    />
                  }
                  label="Active"
                  sx={{ m: 0 }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={newCategoryForm.isBuying}
                      disabled={!newCategoryForm.isActive}
                      onChange={(event) =>
                        setNewCategoryForm((prev) => ({
                          ...prev,
                          isBuying: event.target.checked,
                        }))
                      }
                    />
                  }
                  label="Buying"
                  sx={{ m: 0 }}
                />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeNewCategoryDialog} disabled={creatingCategory}>
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={createBuyCategory}
              disabled={creatingCategory}
            >
              {creatingCategory ? "Adding..." : "Add TCG"}
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
}
