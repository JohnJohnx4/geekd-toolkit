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
  created_at: string;
  updated_at: string;
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
};

type ReleaseProductInput = {
  name?: string;
  sort_order?: number;
  is_active?: boolean;
};

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

  return response.json() as Promise<T>;
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

export const fetchReservationProfile = async (userId: string) => {
  const rows = await requestJson<ReservationProfileRecord[]>(
    `reservation_profiles?id=eq.${encodeFilter(userId)}&select=*`
  );

  return rows[0] ?? null;
};

export const fetchReservationProfiles = () =>
  requestJson<ReservationProfileRecord[]>(
    "reservation_profiles?select=*&order=display_name.asc,created_at.asc"
  );

export const upsertReservationProfile = async (
  profile: ReservationProfileInput
) => {
  const rows = await requestJson<ReservationProfileRecord[]>(
    "reservation_profiles?on_conflict=id",
    {
      method: "POST",
      headers: getHeaders("resolution=merge-duplicates,return=representation"),
      body: JSON.stringify(profile),
    }
  );

  return rows[0];
};

export const updateReservationProfileAdmin = async (
  id: string,
  isAdmin: boolean
) => {
  const rows = await requestJson<ReservationProfileRecord[]>(
    `reservation_profiles?id=eq.${encodeFilter(id)}`,
    {
      method: "PATCH",
      headers: getHeaders("return=representation"),
      body: JSON.stringify({ is_admin: isAdmin }),
    }
  );

  return rows[0];
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
  productNames: string[],
  startOrder = 0
) => {
  const products = productNames
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name, index) => ({
      release_id: releaseId,
      name,
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
  productNames: string[]
) => {
  const createdRelease = await createRelease(release);
  const createdProducts = await createReleaseProducts(
    createdRelease.id,
    productNames
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
    "release_products?select=*&order=sort_order.asc,created_at.asc"
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
