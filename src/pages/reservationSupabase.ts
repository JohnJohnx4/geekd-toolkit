export type ReleaseRecord = {
  id: string;
  title: string;
  game: string;
  release_date: string | null;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
};

export type ReleaseProductRecord = {
  id: string;
  release_id: string;
  name: string;
  description: string | null;
  release_date: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

export type ReservationStatus =
  | "pending"
  | "set_aside"
  | "picked_up"
  | "skipped"
  | "canceled";

export type ReservationProductStatus = ReservationStatus | "denied";

export type ReservationRecord = {
  id: string;
  user_id: string | null;
  release_id: string;
  employee_name: string;
  employee_contact: string | null;
  notes: string | null;
  status: ReservationStatus;
  created_at: string;
};

export type ReservationProductRecord = {
  reservation_id: string;
  product_id: string;
  status: ReservationProductStatus;
  created_at: string;
};

export type ReservationProfileRecord = {
  id: string;
  display_name: string;
  contact: string | null;
  is_admin: boolean;
  staff_profile_id: string | null;
  role: EmployeeRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type EmployeeRole =
  | "buy_intake"
  | "staff"
  | "lead"
  | "card_supervisor"
  | "manager"
  | "owner"
  | "admin";

export type LootStaffProfileRecord = {
  id: string;
  user_id: string | null;
  display_name: string;
  role: EmployeeRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type LootBuyCategoryRecord = {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  is_buying: boolean;
  sort_order: number;
  logo_bucket: string;
  logo_path: string | null;
  logo_updated_at: string | null;
  created_at: string;
  updated_at: string;
};

export type LootCustomerRecord = {
  id: string;
  name: string;
  phone: string | null;
  government_id_number: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type LootCustomerSummaryRecord = LootCustomerRecord & {
  buy_count: number;
  open_buy_count: number;
  latest_buy_date: string | null;
};

export type LootBuyTransactionRecord = {
  id: string;
  customer_id: string;
  transaction_date: string;
  submitted_at: string;
  buy_type: string;
  appraised_value: number;
  cash_offer: number;
  bulk_appraised_value: number;
  bulk_cash_offer: number;
  check_number: string | null;
  notes: string | null;
  priced_card_count: number;
  pricing_notes: string | null;
  is_in_progress: boolean;
  cash_ready: boolean;
  contact_status:
    | "not_contacted"
    | "contacted_awaiting_pickup"
    | "no_answer"
    | "picked_up";
  customer_decision: "accepted" | "declined" | null;
  intake_completed_at: string | null;
  pricing_completed_at: string | null;
  decision_recorded_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  total_appraised_value: number;
  total_cash_offer: number;
  store_margin: number;
  payout_percentage: number;
};

export type LootBuyLogRecord = Pick<
  LootBuyTransactionRecord,
  | "id"
  | "transaction_date"
  | "submitted_at"
  | "buy_type"
  | "appraised_value"
  | "cash_offer"
  | "bulk_appraised_value"
  | "bulk_cash_offer"
  | "total_appraised_value"
  | "total_cash_offer"
  | "payout_percentage"
  | "store_margin"
  | "check_number"
  | "notes"
  | "priced_card_count"
  | "pricing_notes"
  | "is_in_progress"
  | "cash_ready"
  | "contact_status"
  | "customer_decision"
  | "intake_completed_at"
  | "pricing_completed_at"
  | "decision_recorded_at"
> & {
  customer_id: string;
  customer_name: string;
  customer_phone: string | null;
  customer_id_number: string | null;
  accepted_by_staff_ids: string[];
  priced_by_staff_ids: string[];
  purchaser_staff_ids: string[];
  photo_urls: string[];
};

export type CustomerBuySubmissionRecord = {
  id: string;
  customer_name: string;
  phone: string;
  buy_categories: string[];
  description: string;
  government_id_type: string | null;
  government_id_issuing_state: string | null;
  government_id_number: string | null;
  consent_to_store_id: boolean;
  notes: string | null;
  status:
    | "submitted"
    | "reviewing"
    | "offer_ready"
    | "accepted"
    | "declined"
    | "complete"
    | "canceled";
  created_at: string;
  updated_at: string;
};

export type CustomerInterestSubmissionRecord = {
  id: string;
  customer_name: string;
  email: string;
  phone: string | null;
  description: string;
  notes: string | null;
  status:
    | "submitted"
    | "reviewing"
    | "interested"
    | "not_interested"
    | "complete"
    | "canceled";
  created_at: string;
  updated_at: string;
};

export type CustomerUploadBucket =
  | "tcg-logos"
  | "customer-buy-images"
  | "customer-interest-images"
  | "customer-pii";

export type CustomerBuyFileRecord = {
  id: string;
  submission_id: string;
  bucket: "customer-buy-images";
  object_path: string;
  image_kind: "cards" | "sealed_product" | "collection" | "other";
  original_filename: string | null;
  content_type: string | null;
  file_size: number | null;
  uploaded_by: string | null;
  created_at: string;
};

export type CustomerInterestFileRecord = {
  id: string;
  submission_id: string;
  bucket: "customer-interest-images";
  object_path: string;
  image_kind: "cards" | "sealed_product" | "collection" | "other";
  original_filename: string | null;
  content_type: string | null;
  file_size: number | null;
  uploaded_by: string | null;
  created_at: string;
};

export type CustomerPiiFileRecord = {
  id: string;
  buy_submission_id: string | null;
  interest_submission_id: string | null;
  bucket: "customer-pii";
  object_path: string;
  pii_type:
    | "drivers_license_photo"
    | "state_id_photo"
    | "passport_photo"
    | "military_id_photo"
    | "other_id_photo";
  original_filename: string | null;
  content_type: string | null;
  file_size: number | null;
  uploaded_by: string | null;
  created_at: string;
  deleted_at: string | null;
};

export type LootSafeCashEntryRecord = {
  id: string;
  buy_transaction_id: string | null;
  staff_id: string | null;
  staff_label: string | null;
  entry_at: string;
  direction: "in" | "out";
  amount: number;
  reason: string;
  notes: string | null;
  created_by: string | null;
  created_at: string;
};

export type LootActivityEventRecord = {
  id: string;
  action: string;
  description: string;
  actor_user_id: string | null;
  actor_label: string | null;
  customer_id: string | null;
  customer_name: string | null;
  buy_transaction_id: string | null;
  card_show_transaction_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type ReservationAuthSession = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: {
    id: string;
    email?: string;
  };
};

export type ReservationAuthUser = ReservationAuthSession["user"];

export type InfoArticleRecord = {
  id: string;
  title: string;
  summary: string | null;
  url: string | null;
  content_html: string;
  is_published: boolean;
  sort_order: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

type ReleaseInput = {
  title: string;
  game: string;
  release_date: string | null;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
};

type ReservationInput = {
  user_id: string;
  release_id: string;
  employee_name: string;
  employee_contact: string | null;
  notes: string | null;
  product_ids: string[];
};

type ReservationProfileInput = {
  id: string;
  display_name: string;
  contact: string | null;
  role?: EmployeeRole;
  is_active?: boolean;
};

type ReleaseProductInput = {
  name?: string;
  release_date?: string | null;
  sort_order?: number;
  is_active?: boolean;
};

export type ReleaseProductCreateInput = {
  name: string;
  release_date: string | null;
};

export type InfoArticleInput = {
  title: string;
  summary: string | null;
  url: string | null;
  content_html: string;
  is_published: boolean;
  sort_order: number;
};

export type ReservationEmployeeCreateInput = {
  email: string;
  password: string;
  display_name: string;
  is_admin: boolean;
  role: EmployeeRole;
  is_active: boolean;
};

type ReservationProfileRow = Omit<
  ReservationProfileRecord,
  "staff_profile_id" | "role" | "is_active"
>;

export const EMPLOYEE_ROLE_OPTIONS: Array<{
  value: EmployeeRole;
  label: string;
}> = [
  { value: "buy_intake", label: "Buy Intake Only" },
  { value: "staff", label: "Staff" },
  { value: "lead", label: "Lead" },
  { value: "card_supervisor", label: "Card Supervisor" },
  { value: "manager", label: "Manager" },
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
];

const OWNER_RESERVATION_NAME = "Linda";
const OWNER_RESERVATION_NOTE = "Automatically reserved for the owner.";

const isOwnerReservationGame = (game: string) =>
  game
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") === "pokemon";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
let reservationsAccessToken = "";

export const isReservationsConfigured = Boolean(
  supabaseUrl && publishableKey
);

export const setReservationsAccessToken = (accessToken: string) => {
  reservationsAccessToken = accessToken;
};

const getHeaders = (prefer?: string) => ({
  apikey: publishableKey ?? "",
  Authorization: `Bearer ${reservationsAccessToken || publishableKey || ""}`,
  "Content-Type": "application/json",
  ...(prefer ? { Prefer: prefer } : {}),
});

const encodeFilter = (value: string) => encodeURIComponent(value);

const encodeStoragePath = (path: string) =>
  path
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

const normalizePhoneNumber = (value: string | null | undefined) =>
  value?.replace(/\D/g, "").slice(0, 10) || null;

const createStorageObjectPath = (
  prefix: string,
  ownerId: string,
  fileName: string
) => {
  const extension = fileName.includes(".")
    ? fileName.split(".").pop()?.toLowerCase()
    : "";
  const suffix = extension ? `.${extension.replace(/[^a-z0-9]/g, "")}` : "";

  return `${prefix}/${ownerId}/${crypto.randomUUID()}${suffix}`;
};

const getDefaultEmployeeRole = (isAdmin?: boolean): EmployeeRole =>
  isAdmin ? "admin" : "staff";

const mergeEmployeeProfile = (
  reservationProfile: ReservationProfileRow | null,
  staffProfile: LootStaffProfileRecord | null,
  userId: string
): ReservationProfileRecord | null => {
  if (!reservationProfile && !staffProfile) return null;

  const isAdmin =
    reservationProfile?.is_admin ||
    staffProfile?.role === "admin" ||
    staffProfile?.role === "owner" ||
    false;
  const createdAt =
    reservationProfile?.created_at ?? staffProfile?.created_at ?? new Date().toISOString();
  const updatedAt =
    reservationProfile?.updated_at ?? staffProfile?.updated_at ?? createdAt;

  return {
    id: userId,
    display_name:
      staffProfile?.display_name ?? reservationProfile?.display_name ?? "Employee",
    contact: reservationProfile?.contact ?? null,
    is_admin: isAdmin,
    staff_profile_id: staffProfile?.id ?? null,
    role: staffProfile?.role ?? getDefaultEmployeeRole(isAdmin),
    is_active: staffProfile?.is_active ?? true,
    created_at: createdAt,
    updated_at: updatedAt,
  };
};

const mergeEmployeeProfiles = (
  reservationProfiles: ReservationProfileRow[],
  staffProfiles: LootStaffProfileRecord[]
) => {
  const reservationsById = new Map(
    reservationProfiles.map((profile) => [profile.id, profile])
  );
  const staffByUserId = new Map(
    staffProfiles
      .filter((profile) => profile.user_id)
      .map((profile) => [profile.user_id as string, profile])
  );
  const userIds = new Set<string>([
    ...reservationProfiles.map((profile) => profile.id),
    ...staffProfiles
      .map((profile) => profile.user_id)
      .filter((userId): userId is string => Boolean(userId)),
  ]);

  return [...userIds]
    .map((userId) =>
      mergeEmployeeProfile(
        reservationsById.get(userId) ?? null,
        staffByUserId.get(userId) ?? null,
        userId
      )
    )
    .filter((profile): profile is ReservationProfileRecord => Boolean(profile))
    .sort((left, right) => left.display_name.localeCompare(right.display_name));
};

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  if (!supabaseUrl || !publishableKey) {
    throw new Error("Supabase is not configured for reservations.");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      ...getHeaders(init?.headers ? undefined : undefined),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Supabase request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const body = await response.text();

  if (!body) {
    return undefined as T;
  }

  return JSON.parse(body) as T;
}

async function requestAuthJson<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  if (!supabaseUrl || !publishableKey) {
    throw new Error("Supabase is not configured for reservations.");
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/${path}`, {
    ...init,
    headers: {
      apikey: publishableKey,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Supabase auth request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const getPublicStorageUrl = (
  bucket: CustomerUploadBucket,
  objectPath: string
) => {
  if (!supabaseUrl) {
    throw new Error("Supabase is not configured for storage.");
  }

  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${encodeStoragePath(
    objectPath
  )}`;
};

export const uploadStorageObject = async (
  bucket: CustomerUploadBucket,
  objectPath: string,
  file: File,
  options: { upsert?: boolean } = {}
) => {
  if (!supabaseUrl || !publishableKey) {
    throw new Error("Supabase is not configured for storage.");
  }

  const response = await fetch(
    `${supabaseUrl}/storage/v1/object/${bucket}/${encodeStoragePath(objectPath)}`,
    {
      method: "POST",
      headers: {
        apikey: publishableKey,
        Authorization: `Bearer ${reservationsAccessToken || publishableKey}`,
        "Content-Type": file.type || "application/octet-stream",
        ...(options.upsert ? { "x-upsert": "true" } : {}),
      },
      body: file,
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Supabase storage upload failed: ${response.status}`);
  }

  return {
    bucket,
    object_path: objectPath,
    original_filename: file.name,
    content_type: file.type || null,
    file_size: file.size,
  };
};

type SupabaseAuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  expires_at?: number;
  user: {
    id: string;
    email?: string;
  };
};

type SupabaseAuthUserResponse = {
  id: string;
  email?: string;
};

const normalizeAuthSession = (
  response: SupabaseAuthResponse
): ReservationAuthSession => ({
  access_token: response.access_token,
  refresh_token: response.refresh_token,
  expires_at:
    response.expires_at ??
    Math.floor(Date.now() / 1000) + (response.expires_in ?? 3600),
  user: {
    id: response.user.id,
    email: response.user.email,
  },
});

export const createReservationsSession = (
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
  user: ReservationAuthUser
): ReservationAuthSession => {
  const session = {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: Math.floor(Date.now() / 1000) + expiresIn,
    user,
  };
  setReservationsAccessToken(session.access_token);

  return session;
};

export const fetchReservationsAuthUser = async (accessToken: string) => {
  const user = await requestAuthJson<SupabaseAuthUserResponse>("user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    id: user.id,
    email: user.email,
  };
};

export const signInReservationsUser = async (
  email: string,
  password: string
) => {
  const response = await requestAuthJson<SupabaseAuthResponse>(
    "token?grant_type=password",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }
  );
  const session = normalizeAuthSession(response);
  setReservationsAccessToken(session.access_token);

  return session;
};

export const verifyReservationsPassword = async (
  email: string,
  password: string
) => {
  await requestAuthJson<SupabaseAuthResponse>("token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const sendReservationsPasswordReset = async (
  email: string,
  redirectTo: string
) => {
  if (!supabaseUrl || !publishableKey) {
    throw new Error("Supabase is not configured for reservations.");
  }

  const redirectQuery = redirectTo
    ? `?redirect_to=${encodeURIComponent(redirectTo)}`
    : "";

  const response = await fetch(
    `${supabaseUrl}/auth/v1/recover${redirectQuery}`,
    {
      method: "POST",
      headers: {
        apikey: publishableKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Supabase auth request failed: ${response.status}`);
  }
};

export const updateReservationsPassword = async (
  accessToken: string,
  password: string
) => {
  const user = await requestAuthJson<SupabaseAuthUserResponse>("user", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ password }),
  });

  return {
    id: user.id,
    email: user.email,
  };
};

export const refreshReservationsSession = async (refreshToken: string) => {
  const response = await requestAuthJson<SupabaseAuthResponse>(
    "token?grant_type=refresh_token",
    {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
    }
  );
  const session = normalizeAuthSession(response);
  setReservationsAccessToken(session.access_token);

  return session;
};

export const signOutReservationsUser = async (accessToken: string) => {
  if (!supabaseUrl || !publishableKey) return;

  await fetch(`${supabaseUrl}/auth/v1/logout`, {
    method: "POST",
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  setReservationsAccessToken("");
};

export const fetchLootStaffProfiles = () =>
  requestJson<LootStaffProfileRecord[]>(
    "loot_staff_profiles?select=*&order=display_name.asc,created_at.asc"
  );

export const fetchLootStaffProfileForUser = async (userId: string) => {
  const rows = await requestJson<LootStaffProfileRecord[]>(
    `loot_staff_profiles?user_id=eq.${encodeFilter(userId)}&select=*`
  );

  return rows[0] ?? null;
};

export const fetchReservationProfile = async (userId: string) => {
  const [reservationRows, staffProfile] = await Promise.all([
    requestJson<ReservationProfileRow[]>(
      `reservation_profiles?id=eq.${encodeFilter(userId)}&select=*`
    ),
    fetchLootStaffProfileForUser(userId),
  ]);

  return mergeEmployeeProfile(reservationRows[0] ?? null, staffProfile, userId);
};

export const fetchReservationProfiles = async () => {
  const [reservationProfiles, staffProfiles] = await Promise.all([
    requestJson<ReservationProfileRow[]>(
    "reservation_profiles?select=*&order=display_name.asc,created_at.asc"
    ),
    fetchLootStaffProfiles(),
  ]);

  return mergeEmployeeProfiles(reservationProfiles, staffProfiles);
};

export const upsertLootStaffProfile = async (
  profile: {
    user_id: string;
    display_name: string;
    role: EmployeeRole;
    is_active: boolean;
  }
) => {
  const rows = await requestJson<LootStaffProfileRecord[]>(
    "loot_staff_profiles?on_conflict=user_id",
    {
      method: "POST",
      headers: getHeaders("resolution=merge-duplicates,return=representation"),
      body: JSON.stringify(profile),
    }
  );

  return rows[0];
};

export const upsertReservationProfile = async (
  profile: ReservationProfileInput
) => {
  const rows = await requestJson<ReservationProfileRow[]>(
    "reservation_profiles?on_conflict=id",
    {
      method: "POST",
      headers: getHeaders("resolution=merge-duplicates,return=representation"),
      body: JSON.stringify({
        id: profile.id,
        display_name: profile.display_name,
        contact: profile.contact,
      }),
    }
  );
  const reservationProfile = rows[0];
  const role = profile.role ?? getDefaultEmployeeRole(reservationProfile.is_admin);
  const staffProfile = await upsertLootStaffProfile({
    user_id: profile.id,
    display_name: profile.display_name,
    role,
    is_active: profile.is_active ?? true,
  });
  const mergedProfile = mergeEmployeeProfile(
    reservationProfile,
    staffProfile,
    profile.id
  );

  if (!mergedProfile) {
    throw new Error("Unable to save employee profile.");
  }

  return mergedProfile;
};

export const updateEmployeeProfileAccess = async (
  id: string,
  input: {
    is_admin: boolean;
    role: EmployeeRole;
    is_active: boolean;
  }
) => {
  const rows = await requestJson<ReservationProfileRow[]>(
    `reservation_profiles?id=eq.${encodeFilter(id)}`,
    {
      method: "PATCH",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({ is_admin: input.is_admin }),
    }
  );
  const reservationProfile = rows[0];
  const staffProfile = await upsertLootStaffProfile({
    user_id: id,
    display_name: reservationProfile.display_name,
    role: input.role,
    is_active: input.is_active,
  });
  const mergedProfile = mergeEmployeeProfile(reservationProfile, staffProfile, id);

  if (!mergedProfile) {
    throw new Error("Unable to update employee profile.");
  }

  return mergedProfile;
};

export const updateReservationProfileAdmin = (id: string, isAdmin: boolean) =>
  updateEmployeeProfileAccess(id, {
    is_admin: isAdmin,
    role: getDefaultEmployeeRole(isAdmin),
    is_active: true,
  });

export const fetchLootBuyCategories = () =>
  requestJson<LootBuyCategoryRecord[]>(
    "loot_buy_categories?select=*&order=sort_order.asc,name.asc"
  );

export const fetchActiveLootBuyCategories = () =>
  requestJson<LootBuyCategoryRecord[]>(
    "loot_buy_categories?is_active=eq.true&is_buying=eq.true&select=*&order=sort_order.asc,name.asc"
  );

export const fetchLootBuyLog = () =>
  requestJson<LootBuyLogRecord[]>(
    "loot_buy_transaction_summary?select=*&order=transaction_date.asc,submitted_at.asc&limit=250"
  );

export const fetchLootCustomerSummary = () =>
  requestJson<LootCustomerSummaryRecord[]>(
    "loot_customer_summary?select=*&order=updated_at.desc,name.asc&limit=500"
  );

export const fetchLootSafeCashEntries = () =>
  requestJson<LootSafeCashEntryRecord[]>(
    "loot_safe_cash_entries?select=*&order=entry_at.desc,created_at.desc&limit=500"
  );

export const createLootSafeCashEntry = async (entry: {
  entry_at: string;
  direction: LootSafeCashEntryRecord["direction"];
  amount: number;
  reason: string;
  notes?: string | null;
  staff_label?: string | null;
  buy_transaction_id?: string | null;
}) => {
  const rows = await requestJson<LootSafeCashEntryRecord[]>(
    "loot_safe_cash_entries",
    {
      method: "POST",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({
        entry_at: entry.entry_at,
        direction: entry.direction,
        amount: entry.amount,
        reason: entry.reason.trim(),
        notes: entry.notes?.trim() || null,
        staff_label: entry.staff_label?.trim() || null,
        buy_transaction_id: entry.buy_transaction_id || null,
      }),
    }
  );

  return rows[0];
};

export const deleteLootSafeCashEntry = async (id: string) => {
  await requestJson<void>(`loot_safe_cash_entries?id=eq.${encodeFilter(id)}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
};

export const fetchLootActivityEvents = () =>
  requestJson<LootActivityEventRecord[]>(
    "loot_activity_event_summary?select=*&order=created_at.desc&limit=500"
  );

const createLootActivityEvent = async (event: {
  action: string;
  description: string;
  actor_label?: string | null;
  customer_id?: string | null;
  buy_transaction_id?: string | null;
  metadata?: Record<string, unknown>;
}) => {
  await requestJson("loot_activity_events", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      action: event.action,
      description: event.description,
      actor_label: event.actor_label || null,
      customer_id: event.customer_id || null,
      buy_transaction_id: event.buy_transaction_id || null,
      metadata: event.metadata ?? {},
    }),
  });
};

export const updateLootPickupWorkflow = async (
  row: LootBuyLogRecord,
  update: Partial<
    Pick<
      LootBuyTransactionRecord,
      "cash_ready" | "contact_status" | "customer_decision" | "is_in_progress"
    >
  >,
  event: {
    action: string;
    description: string;
    actor_label?: string | null;
  }
) => {
  if (
    update.contact_status === "picked_up" &&
    update.customer_decision === "accepted"
  ) {
    await completeLootBuyPickup(row, { actor_label: event.actor_label });
    return;
  }

  const body: Record<string, unknown> = {
    ...update,
    updated_at: new Date().toISOString(),
  };

  if (update.customer_decision) {
    body.decision_recorded_at = new Date().toISOString();
  }

  await requestJson<LootBuyTransactionRecord[]>(
    `loot_buy_transactions?id=eq.${encodeFilter(row.id)}`,
    {
      method: "PATCH",
      headers: getHeaders("return=representation"),
      body: JSON.stringify(body),
    }
  );

  await createLootActivityEvent({
    action: event.action,
    description: event.description,
    actor_label: event.actor_label,
    customer_id: row.customer_id,
    buy_transaction_id: row.id,
    metadata: { update },
  });
};

export const completeLootBuyPickup = async (
  row: LootBuyLogRecord,
  input: {
    actor_label?: string | null;
  }
) => {
  await requestJson<void>("rpc/complete_loot_buy_pickup", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      p_transaction_id: row.id,
      p_actor_label: input.actor_label || null,
    }),
  });
};

export const assignLootBuyForPricing = async (
  row: LootBuyLogRecord,
  input: {
    staff_profile_id: string | null;
    actor_label: string | null;
  }
) => {
  await requestJson<LootBuyTransactionRecord[]>(
    `loot_buy_transactions?id=eq.${encodeFilter(row.id)}`,
    {
      method: "PATCH",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({
        is_in_progress: true,
        updated_at: new Date().toISOString(),
      }),
    }
  );

  await requestJson<void>(
    `loot_buy_transaction_staff?transaction_id=eq.${encodeFilter(
      row.id
    )}&role=eq.priced_by`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (input.staff_profile_id) {
    await requestJson("loot_buy_transaction_staff", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        transaction_id: row.id,
        staff_id: input.staff_profile_id,
        role: "priced_by",
        sort_order: 0,
      }),
    });
  }

  await createLootActivityEvent({
    action: "buy_pricing_started",
    description: `${input.actor_label || "Employee"} started pricing ${
      row.customer_name
    }'s buy`,
    actor_label: input.actor_label,
    customer_id: row.customer_id,
    buy_transaction_id: row.id,
    metadata: {
      assigned_staff_profile_id: input.staff_profile_id,
      previous_priced_by_staff_ids: row.priced_by_staff_ids,
    },
  });
};

export const updateLootBuyPricingProgress = async (
  row: LootBuyLogRecord,
  input: {
    priced_card_count: number;
    pricing_notes: string | null;
    actor_label: string | null;
  }
) => {
  await requestJson<LootBuyTransactionRecord[]>(
    `loot_buy_transactions?id=eq.${encodeFilter(row.id)}`,
    {
      method: "PATCH",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({
        priced_card_count: Math.max(0, input.priced_card_count),
        pricing_notes: input.pricing_notes?.trim() || null,
        updated_at: new Date().toISOString(),
      }),
    }
  );

  await createLootActivityEvent({
    action: "buy_pricing_progress_updated",
    description: `${input.actor_label || "Employee"} updated pricing progress for ${
      row.customer_name
    }'s buy`,
    actor_label: input.actor_label,
    customer_id: row.customer_id,
    buy_transaction_id: row.id,
    metadata: {
      before: {
        priced_card_count: row.priced_card_count,
        pricing_notes: row.pricing_notes,
      },
      after: {
        priced_card_count: Math.max(0, input.priced_card_count),
        pricing_notes: input.pricing_notes?.trim() || null,
      },
    },
  });
};

export const completeLootBuyPricing = async (
  row: LootBuyLogRecord,
  input: {
    priced_card_count: number;
    pricing_notes: string | null;
    actor_label: string | null;
  }
) => {
  const completedAt = new Date().toISOString();

  await requestJson<LootBuyTransactionRecord[]>(
    `loot_buy_transactions?id=eq.${encodeFilter(row.id)}`,
    {
      method: "PATCH",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({
        is_in_progress: false,
        priced_card_count: Math.max(0, input.priced_card_count),
        pricing_notes: input.pricing_notes?.trim() || null,
        pricing_completed_at: completedAt,
        updated_at: completedAt,
      }),
    }
  );

  await createLootActivityEvent({
    action: "buy_pricing_completed",
    description: `${input.actor_label || "Employee"} completed pricing for ${
      row.customer_name
    }'s buy`,
    actor_label: input.actor_label,
    customer_id: row.customer_id,
    buy_transaction_id: row.id,
    metadata: {
      priced_card_count: Math.max(0, input.priced_card_count),
      pricing_notes: input.pricing_notes?.trim() || null,
      completed_at: completedAt,
    },
  });
};

export const notifyLootBuyCustomerPlaceholder = async (
  row: LootBuyLogRecord,
  input: {
    actor_label: string | null;
  }
) => {
  await requestJson<LootBuyTransactionRecord[]>(
    `loot_buy_transactions?id=eq.${encodeFilter(row.id)}`,
    {
      method: "PATCH",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({
        contact_status: "contacted_awaiting_pickup",
        updated_at: new Date().toISOString(),
      }),
    }
  );

  await createLootActivityEvent({
    action: "customer_notification_placeholder",
    description: `${input.actor_label || "Employee"} marked ${
      row.customer_name
    } as notified that their buy is ready`,
    actor_label: input.actor_label,
    customer_id: row.customer_id,
    buy_transaction_id: row.id,
    metadata: {
      notification_channel: "placeholder",
      previous_contact_status: row.contact_status,
    },
  });
};

const slugifyBuyCategory = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const createLootBuyCategory = async (category: {
  name: string;
  is_active: boolean;
  is_buying: boolean;
  sort_order: number;
}) => {
  const name = category.name.trim();

  if (!name) {
    throw new Error("TCG name is required.");
  }

  const rows = await requestJson<LootBuyCategoryRecord[]>(
    "loot_buy_categories",
    {
      method: "POST",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({
        ...category,
        name,
        slug: slugifyBuyCategory(name),
        is_buying: category.is_active && category.is_buying,
      }),
    }
  );

  return rows[0];
};

export const updateLootBuyCategory = async (
  id: string,
  category: Partial<
    Pick<
      LootBuyCategoryRecord,
      | "name"
      | "is_active"
      | "is_buying"
      | "sort_order"
      | "logo_bucket"
      | "logo_path"
      | "logo_updated_at"
    >
  >
) => {
  const body =
    typeof category.name === "string"
      ? {
          ...category,
          name: category.name.trim(),
          slug: slugifyBuyCategory(category.name),
        }
      : category;

  const rows = await requestJson<LootBuyCategoryRecord[]>(
    `loot_buy_categories?id=eq.${encodeFilter(id)}`,
    {
      method: "PATCH",
      headers: getHeaders("return=representation"),
      body: JSON.stringify(body),
    }
  );

  return rows[0];
};

export const uploadLootBuyCategoryLogo = async (
  categoryId: string,
  file: File
) => {
  const objectPath = createStorageObjectPath("tcg-logos", categoryId, file.name);
  await uploadStorageObject("tcg-logos", objectPath, file);

  return updateLootBuyCategory(categoryId, {
    logo_bucket: "tcg-logos",
    logo_path: objectPath,
    logo_updated_at: new Date().toISOString(),
  });
};

const findLootCustomer = async (customer: {
  name: string;
  phone: string | null;
}) => {
  const phone = normalizePhoneNumber(customer.phone);

  if (phone) {
    const rows = await requestJson<LootCustomerRecord[]>(
      `loot_customers?phone=eq.${encodeFilter(phone)}&select=*&limit=1`
    );

    if (rows[0]) return rows[0];
  }

  const nameFilter = `name=eq.${encodeFilter(customer.name)}`;
  const phoneFilter = phone
    ? `phone=eq.${encodeFilter(phone)}`
    : "phone=is.null";
  const rows = await requestJson<LootCustomerRecord[]>(
    `loot_customers?${nameFilter}&${phoneFilter}&select=*&limit=1`
  );

  return rows[0] ?? null;
};

const createOrUpdateLootCustomer = async (customer: {
  name: string;
  phone: string | null;
  government_id_number?: string | null;
}) => {
  const name = customer.name.trim();
  const phone = normalizePhoneNumber(customer.phone);

  if (!name) {
    throw new Error("Customer name is required.");
  }

  const existing = await findLootCustomer({ name, phone });

  if (existing) {
    const shouldUpdate =
      existing.name !== name ||
      existing.phone !== phone ||
      (customer.government_id_number &&
        existing.government_id_number !== customer.government_id_number);

    if (!shouldUpdate) return existing;

    const rows = await requestJson<LootCustomerRecord[]>(
      `loot_customers?id=eq.${encodeFilter(existing.id)}`,
      {
        method: "PATCH",
        headers: getHeaders("return=representation"),
        body: JSON.stringify({
          name,
          phone,
          government_id_number:
            customer.government_id_number ?? existing.government_id_number,
        }),
      }
    );

    return rows[0];
  }

  const rows = await requestJson<LootCustomerRecord[]>("loot_customers", {
    method: "POST",
    headers: getHeaders("return=representation"),
    body: JSON.stringify({
      name,
      phone,
      government_id_number: customer.government_id_number || null,
    }),
  });

  return rows[0];
};

export const createLootBuyEntry = async (entry: {
  customer_name: string;
  customer_phone?: string | null;
  customer_id_number?: string | null;
  date: string;
  buy_type: string;
  staff_profile_id?: string | null;
  notes?: string | null;
  is_in_progress?: boolean;
}) => {
  const customer = await createOrUpdateLootCustomer({
    name: entry.customer_name,
    phone: entry.customer_phone || null,
    government_id_number: entry.customer_id_number || null,
  });

  const rows = await requestJson<LootBuyTransactionRecord[]>(
    "loot_buy_transactions",
    {
      method: "POST",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({
        customer_id: customer.id,
        transaction_date: entry.date,
        buy_type: entry.buy_type.trim(),
        notes: entry.notes?.trim() || null,
        is_in_progress: Boolean(entry.is_in_progress),
        intake_completed_at: new Date().toISOString(),
      }),
    }
  );
  const transaction = rows[0];

  if (transaction && entry.staff_profile_id) {
    await requestJson(
      "loot_buy_transaction_staff",
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          transaction_id: transaction.id,
          staff_id: entry.staff_profile_id,
          role: "accepted_by",
          sort_order: 0,
        }),
      }
    );
  }

  return {
    ...transaction,
    customer,
  };
};

export const updateLootBuyTransactionWithEvent = async (
  current: LootBuyLogRecord,
  input: {
    customer_name: string;
    customer_phone: string | null;
    transaction_date: string;
    buy_type: string;
    appraised_value: number;
    cash_offer: number;
    bulk_appraised_value: number;
    bulk_cash_offer: number;
    notes: string | null;
    is_in_progress: boolean;
    cash_ready: boolean;
    contact_status: LootBuyTransactionRecord["contact_status"];
    customer_decision: LootBuyTransactionRecord["customer_decision"];
    edit_reason: string;
    actor_label: string | null;
  }
) => {
  const editReason = input.edit_reason.trim();

  if (!editReason) {
    throw new Error("An edit reason is required.");
  }

  await requestJson<void>("rpc/update_loot_buy_transaction_with_event", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      p_transaction_id: current.id,
      p_customer_name: input.customer_name,
      p_customer_phone: normalizePhoneNumber(input.customer_phone),
      p_transaction_date: input.transaction_date,
      p_buy_type: input.buy_type,
      p_appraised_value: input.appraised_value,
      p_cash_offer: input.cash_offer,
      p_bulk_appraised_value: input.bulk_appraised_value,
      p_bulk_cash_offer: input.bulk_cash_offer,
      p_notes: input.notes,
      p_is_in_progress: input.is_in_progress,
      p_cash_ready: input.cash_ready,
      p_contact_status: input.contact_status,
      p_customer_decision: input.customer_decision,
      p_edit_reason: editReason,
      p_actor_label: input.actor_label,
    }),
  });
};

export const updateLootCustomerWithEvent = async (
  current: LootCustomerSummaryRecord,
  input: {
    name: string;
    phone: string | null;
    government_id_number: string | null;
    notes: string | null;
    actor_label: string | null;
  }
) => {
  await requestJson<void>("rpc/update_loot_customer_with_event", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      p_customer_id: current.id,
      p_name: input.name,
      p_phone: normalizePhoneNumber(input.phone),
      p_government_id_number: input.government_id_number,
      p_notes: input.notes,
      p_actor_label: input.actor_label,
    }),
  });
};

export const createCustomerBuySubmission = async (submission: {
  customer_name: string;
  phone: string;
  buy_categories: string[];
  description: string;
  government_id_type?: string | null;
  government_id_issuing_state?: string | null;
  government_id_number?: string | null;
  consent_to_store_id?: boolean;
  notes?: string | null;
}) => {
  const rows = await requestJson<CustomerBuySubmissionRecord[]>(
    "loot_customer_buy_submissions",
    {
      method: "POST",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({
        ...submission,
        phone: normalizePhoneNumber(submission.phone) ?? "",
      }),
    }
  );

  return rows[0];
};

export const createCustomerInterestSubmission = async (submission: {
  customer_name: string;
  email: string;
  phone?: string | null;
  description: string;
  notes?: string | null;
}) => {
  const rows = await requestJson<CustomerInterestSubmissionRecord[]>(
    "loot_customer_interest_submissions",
    {
      method: "POST",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({
        ...submission,
        phone: normalizePhoneNumber(submission.phone) ?? null,
      }),
    }
  );

  return rows[0];
};

export const uploadCustomerBuyImage = async (
  submissionId: string,
  file: File,
  imageKind: CustomerBuyFileRecord["image_kind"] = "cards"
) => {
  const objectPath = createStorageObjectPath(
    "buy-submissions",
    submissionId,
    file.name
  );
  const upload = await uploadStorageObject(
    "customer-buy-images",
    objectPath,
    file
  );
  const rows = await requestJson<CustomerBuyFileRecord[]>(
    "loot_customer_buy_files",
    {
      method: "POST",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({
        submission_id: submissionId,
        bucket: upload.bucket,
        object_path: upload.object_path,
        image_kind: imageKind,
        original_filename: upload.original_filename,
        content_type: upload.content_type,
        file_size: upload.file_size,
      }),
    }
  );

  return rows[0];
};

export const uploadCustomerInterestImage = async (
  submissionId: string,
  file: File,
  imageKind: CustomerInterestFileRecord["image_kind"] = "cards"
) => {
  const objectPath = createStorageObjectPath(
    "interest-submissions",
    submissionId,
    file.name
  );
  const upload = await uploadStorageObject(
    "customer-interest-images",
    objectPath,
    file
  );
  const rows = await requestJson<CustomerInterestFileRecord[]>(
    "loot_customer_interest_files",
    {
      method: "POST",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({
        submission_id: submissionId,
        bucket: upload.bucket,
        object_path: upload.object_path,
        image_kind: imageKind,
        original_filename: upload.original_filename,
        content_type: upload.content_type,
        file_size: upload.file_size,
      }),
    }
  );

  return rows[0];
};

export const uploadCustomerPiiImage = async (
  input: {
    buySubmissionId?: string;
    interestSubmissionId?: string;
    piiType: CustomerPiiFileRecord["pii_type"];
  },
  file: File
) => {
  const ownerId = input.buySubmissionId ?? input.interestSubmissionId;

  if (!ownerId) {
    throw new Error("A customer submission id is required for PII uploads.");
  }

  const objectPath = createStorageObjectPath(
    input.buySubmissionId ? "buy-submissions" : "interest-submissions",
    ownerId,
    file.name
  );
  const upload = await uploadStorageObject("customer-pii", objectPath, file);
  const rows = await requestJson<CustomerPiiFileRecord[]>(
    "loot_customer_pii_files",
    {
      method: "POST",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({
        buy_submission_id: input.buySubmissionId ?? null,
        interest_submission_id: input.interestSubmissionId ?? null,
        bucket: upload.bucket,
        object_path: upload.object_path,
        pii_type: input.piiType,
        original_filename: upload.original_filename,
        content_type: upload.content_type,
        file_size: upload.file_size,
      }),
    }
  );

  return rows[0];
};

export const createReservationEmployeeAccount = async (
  input: ReservationEmployeeCreateInput
) => {
  if (!reservationsAccessToken) {
    throw new Error("Log in as an admin before creating users.");
  }

  const response = await fetch("/.netlify/functions/create-reservation-user", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${reservationsAccessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Unable to create user: ${response.status}`);
  }

  return response.json() as Promise<ReservationProfileRecord>;
};

export const fetchReleases = (includeInactive = false) => {
  const activeFilter = includeInactive ? "" : "&is_active=eq.true";
  return requestJson<ReleaseRecord[]>(
    `releases?select=*&order=release_date.asc.nullslast,created_at.asc${activeFilter}`
  );
};

export const createRelease = async (release: ReleaseInput) => {
  const rows = await requestJson<ReleaseRecord[]>("releases", {
    method: "POST",
    headers: getHeaders("return=representation"),
    body: JSON.stringify(release),
  });

  return rows[0];
};

export const createReleaseProducts = async (
  releaseId: string,
  productItems: ReleaseProductCreateInput[],
  startOrder = 0
) => {
  const products = productItems
    .map((product) => ({
      name: product.name.trim(),
      release_date: product.release_date || null,
    }))
    .filter((product) => product.name)
    .map((product, index) => ({
      release_id: releaseId,
      name: product.name,
      release_date: product.release_date,
      sort_order: startOrder + index,
      is_active: true,
    }));

  if (!products.length) {
    return [];
  }

  return requestJson<ReleaseProductRecord[]>("release_products", {
    method: "POST",
    headers: getHeaders("return=representation"),
    body: JSON.stringify(products),
  });
};

export const createReleaseWithProducts = async (
  release: ReleaseInput,
  productItems: ReleaseProductCreateInput[]
) => {
  const createdRelease = await createRelease(release);
  const createdProducts = await createReleaseProducts(
    createdRelease.id,
    productItems
  );
  await ensureOwnerReservationProducts(
    createdRelease.id,
    createdRelease.game,
    createdProducts.map((product) => product.id)
  );

  return createdRelease;
};

export const updateRelease = async (
  id: string,
  release: Partial<ReleaseInput>
) => {
  const rows = await requestJson<ReleaseRecord[]>(
    `releases?id=eq.${encodeFilter(id)}`,
    {
      method: "PATCH",
      headers: getHeaders("return=representation"),
      body: JSON.stringify(release),
    }
  );

  return rows[0];
};

export const fetchReleaseProducts = () =>
  requestJson<ReleaseProductRecord[]>(
    "release_products?select=*&order=release_date.asc.nullslast,sort_order.asc,created_at.asc"
  );

export const updateReleaseProduct = async (
  id: string,
  product: ReleaseProductInput
) => {
  const rows = await requestJson<ReleaseProductRecord[]>(
    `release_products?id=eq.${encodeFilter(id)}`,
    {
      method: "PATCH",
      headers: getHeaders("return=representation"),
      body: JSON.stringify(product),
    }
  );

  return rows[0];
};

export const fetchReservations = () =>
  requestJson<ReservationRecord[]>(
    "reservations?select=*&order=created_at.asc"
  );

export const fetchReservationProducts = () =>
  requestJson<ReservationProductRecord[]>(
    "reservation_products?select=*&order=created_at.asc"
  );

export const ensureOwnerReservationProducts = async (
  releaseId: string,
  releaseGame: string,
  productIds: string[]
) => {
  if (!isOwnerReservationGame(releaseGame)) return null;

  const uniqueProductIds = [...new Set(productIds)].filter(Boolean);

  if (!uniqueProductIds.length) return null;

  const ownerRows = await requestJson<ReservationRecord[]>(
    `reservations?release_id=eq.${encodeFilter(
      releaseId
    )}&employee_name=eq.${encodeFilter(OWNER_RESERVATION_NAME)}&select=*`
  );

  let ownerReservation = ownerRows[0];

  if (!ownerReservation) {
    const createdRows = await requestJson<ReservationRecord[]>("reservations", {
      method: "POST",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({
        user_id: null,
        release_id: releaseId,
        employee_name: OWNER_RESERVATION_NAME,
        employee_contact: null,
        notes: OWNER_RESERVATION_NOTE,
        status: "pending",
      }),
    });

    ownerReservation = createdRows[0];
  }

  const existingProducts = await requestJson<ReservationProductRecord[]>(
    `reservation_products?reservation_id=eq.${encodeFilter(
      ownerReservation.id
    )}&select=*`
  );
  const existingProductIds = new Set(
    existingProducts.map((product) => product.product_id)
  );
  const productsToAdd = uniqueProductIds.filter(
    (productId) => !existingProductIds.has(productId)
  );

  if (productsToAdd.length) {
    await requestJson<ReservationProductRecord[]>("reservation_products", {
      method: "POST",
      headers: getHeaders("return=representation"),
      body: JSON.stringify(
        productsToAdd.map((productId) => ({
          reservation_id: ownerReservation.id,
          product_id: productId,
          status: "pending",
        }))
      ),
    });
  }

  return ownerReservation;
};

export const createReservation = async (reservation: ReservationInput) => {
  const rows = await requestJson<ReservationRecord[]>("reservations", {
    method: "POST",
    headers: getHeaders("return=representation"),
    body: JSON.stringify({
      user_id: reservation.user_id,
      release_id: reservation.release_id,
      employee_name: reservation.employee_name,
      employee_contact: reservation.employee_contact,
      notes: reservation.notes,
    }),
  });

  const createdReservation = rows[0];

  await requestJson<ReservationProductRecord[]>("reservation_products", {
    method: "POST",
    headers: getHeaders("return=representation"),
    body: JSON.stringify(
      reservation.product_ids.map((productId) => ({
        reservation_id: createdReservation.id,
        product_id: productId,
        status: "pending",
      }))
    ),
  });

  return createdReservation;
};

export const updateReservation = async (
  id: string,
  reservation: Omit<ReservationInput, "release_id" | "user_id">
) => {
  const rows = await requestJson<ReservationRecord[]>(
    `reservations?id=eq.${encodeFilter(id)}`,
    {
      method: "PATCH",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({
        employee_name: reservation.employee_name,
        employee_contact: reservation.employee_contact,
        notes: reservation.notes,
      }),
    }
  );

  const existingProducts = await requestJson<ReservationProductRecord[]>(
    `reservation_products?reservation_id=eq.${encodeFilter(id)}&select=*`
  );
  const existingStatusByProductId = new Map(
    existingProducts.map((product) => [product.product_id, product.status])
  );

  await requestJson<void>(
    `reservation_products?reservation_id=eq.${encodeFilter(id)}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (reservation.product_ids.length) {
    await requestJson<ReservationProductRecord[]>("reservation_products", {
      method: "POST",
      headers: getHeaders("return=representation"),
      body: JSON.stringify(
        reservation.product_ids.map((productId) => ({
          reservation_id: id,
          product_id: productId,
          status: existingStatusByProductId.get(productId) ?? "pending",
        }))
      ),
    });
  }

  return rows[0];
};

export const updateReservationProductStatus = async (
  reservationId: string,
  productId: string,
  status: ReservationProductStatus
) => {
  const rows = await requestJson<ReservationProductRecord[]>(
    `reservation_products?reservation_id=eq.${encodeFilter(
      reservationId
    )}&product_id=eq.${encodeFilter(productId)}`,
    {
      method: "PATCH",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({ status }),
    }
  );

  return rows[0];
};

export const updateReservationStatus = async (
  id: string,
  status: ReservationStatus
) => {
  const rows = await requestJson<ReservationRecord[]>(
    `reservations?id=eq.${encodeFilter(id)}`,
    {
      method: "PATCH",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({ status }),
    }
  );

  return rows[0];
};

export const fetchInfoArticles = (includeDrafts = false) => {
  const draftFilter = includeDrafts ? "" : "&is_published=eq.true";
  return requestJson<InfoArticleRecord[]>(
    `info_articles?select=*&order=sort_order.asc,updated_at.desc${draftFilter}`
  );
};

export const createInfoArticle = async (article: InfoArticleInput) => {
  const rows = await requestJson<InfoArticleRecord[]>("info_articles", {
    method: "POST",
    headers: getHeaders("return=representation"),
    body: JSON.stringify(article),
  });

  return rows[0];
};

export const updateInfoArticle = async (
  id: string,
  article: Partial<InfoArticleInput>
) => {
  const rows = await requestJson<InfoArticleRecord[]>(
    `info_articles?id=eq.${encodeFilter(id)}`,
    {
      method: "PATCH",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({
        ...article,
        updated_at: new Date().toISOString(),
      }),
    }
  );

  return rows[0];
};

export const deleteInfoArticle = async (id: string) => {
  await requestJson<void>(`info_articles?id=eq.${encodeFilter(id)}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
};
