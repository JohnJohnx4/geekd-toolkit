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

export type ReservationRecord = {
  id: string;
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
  created_at: string;
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
  release_id: string;
  employee_name: string;
  employee_contact: string | null;
  notes: string | null;
  product_ids: string[];
};

type ReleaseProductInput = {
  name?: string;
  sort_order?: number;
  is_active?: boolean;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const reservationsAdminPin = import.meta.env
  .VITE_RESERVATION_ADMIN_PIN;

export const isReservationsConfigured = Boolean(
  supabaseUrl && publishableKey
);

const getHeaders = (prefer?: string) => ({
  apikey: publishableKey ?? "",
  Authorization: `Bearer ${publishableKey ?? ""}`,
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
  await createReleaseProducts(createdRelease.id, productNames);

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

export const createReservation = async (reservation: ReservationInput) => {
  const rows = await requestJson<ReservationRecord[]>("reservations", {
    method: "POST",
    headers: getHeaders("return=representation"),
    body: JSON.stringify({
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
      }))
    ),
  });

  return createdReservation;
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
