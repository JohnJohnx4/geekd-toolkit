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

export const fetchReservations = () =>
  requestJson<ReservationRecord[]>(
    "reservations?select=*&order=created_at.asc"
  );

export const createReservation = async (reservation: ReservationInput) => {
  const rows = await requestJson<ReservationRecord[]>("reservations", {
    method: "POST",
    headers: getHeaders("return=representation"),
    body: JSON.stringify(reservation),
  });

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
