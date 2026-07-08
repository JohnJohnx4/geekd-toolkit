type NetlifyEvent = {
  httpMethod: string;
  headers: Record<string, string | undefined>;
  body: string | null;
};

type SupabaseUser = {
  id: string;
  email?: string;
};

type ReservationProfile = {
  id: string;
  display_name: string;
  contact: string | null;
  is_admin: boolean;
  staff_profile_id?: string | null;
  role?: EmployeeRole;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
};

type EmployeeRole =
  | "buy_intake"
  | "staff"
  | "lead"
  | "card_supervisor"
  | "manager"
  | "owner"
  | "admin";

const EMPLOYEE_ROLES = new Set<EmployeeRole>([
  "buy_intake",
  "staff",
  "lead",
  "card_supervisor",
  "manager",
  "owner",
  "admin",
]);

const jsonResponse = (statusCode: number, body: unknown) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

const textResponse = (statusCode: number, body: string) => ({
  statusCode,
  headers: { "Content-Type": "text/plain" },
  body,
});

const getRequiredEnv = (name: string) => {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value.replace(/\/$/, "");
};

const parseBody = (body: string | null) => {
  if (!body) throw new Error("Request body is required.");

  const parsed = JSON.parse(body) as {
    email?: string;
    password?: string;
    display_name?: string;
    is_admin?: boolean;
    role?: string;
    is_active?: boolean;
  };

  const email = parsed.email?.trim().toLowerCase() ?? "";
  const password = parsed.password ?? "";
  const displayName = parsed.display_name?.trim() ?? "";

  if (!email || !email.includes("@")) {
    throw new Error("Enter a valid email address.");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  if (!displayName) {
    throw new Error("Name is required.");
  }

  return {
    email,
    password,
    displayName,
    isAdmin: Boolean(parsed.is_admin),
    role:
      Boolean(parsed.is_admin) || parsed.role === "admin"
        ? "admin"
        : EMPLOYEE_ROLES.has(parsed.role as EmployeeRole)
          ? (parsed.role as EmployeeRole)
          : "staff",
    isActive: parsed.is_active ?? true,
  };
};

const readRequester = async (
  supabaseUrl: string,
  publishableKey: string,
  token: string
) => {
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Admin login could not be verified.");
  }

  return response.json() as Promise<SupabaseUser>;
};

const readRequesterProfile = async (
  supabaseUrl: string,
  secretKey: string,
  requesterId: string
) => {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/reservation_profiles?id=eq.${encodeURIComponent(
      requesterId
    )}&select=*`,
    {
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Unable to verify admin profile.");
  }

  const profiles = (await response.json()) as ReservationProfile[];
  const profile = profiles[0];

  if (!profile?.is_admin) {
    throw new Error("Admin access is required to create users.");
  }
};

const createAuthUser = async (
  supabaseUrl: string,
  secretKey: string,
  email: string,
  password: string,
  displayName: string
) => {
  const response = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
    method: "POST",
    headers: {
      apikey: secretKey,
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        display_name: displayName,
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Unable to create Supabase auth user.");
  }

  return response.json() as Promise<SupabaseUser>;
};

const upsertProfile = async (
  supabaseUrl: string,
  secretKey: string,
  profile: {
    id: string;
    display_name: string;
    contact: string;
    is_admin: boolean;
  }
) => {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/reservation_profiles?on_conflict=id`,
    {
      method: "POST",
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(profile),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Unable to create employee profile.");
  }

  const profiles = (await response.json()) as ReservationProfile[];
  return profiles[0];
};

const upsertLootStaffProfile = async (
  supabaseUrl: string,
  secretKey: string,
  profile: {
    user_id: string;
    display_name: string;
    role: EmployeeRole;
    is_active: boolean;
  }
) => {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/loot_staff_profiles?on_conflict=user_id`,
    {
      method: "POST",
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(profile),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Unable to create loot staff profile.");
  }

  const profiles = (await response.json()) as Array<{
    id: string;
    role: EmployeeRole;
    is_active: boolean;
  }>;
  return profiles[0];
};

export const handler = async (event: NetlifyEvent) => {
  if (event.httpMethod !== "POST") {
    return textResponse(405, "Method not allowed");
  }

  try {
    const supabaseUrl = getRequiredEnv("SUPABASE_URL");
    const publishableKey = getRequiredEnv("SUPABASE_PUBLISHABLE_KEY");
    const secretKey = getRequiredEnv("SUPABASE_SECRET_KEY");
    const token = (
      event.headers.authorization ?? event.headers.Authorization
    )?.replace(/^Bearer\s+/i, "");

    if (!token) {
      return textResponse(401, "Admin login is required.");
    }

    const input = parseBody(event.body);
    const requester = await readRequester(supabaseUrl, publishableKey, token);

    await readRequesterProfile(supabaseUrl, secretKey, requester.id);

    const user = await createAuthUser(
      supabaseUrl,
      secretKey,
      input.email,
      input.password,
      input.displayName
    );
    const profile = await upsertProfile(supabaseUrl, secretKey, {
      id: user.id,
      display_name: input.displayName,
      contact: user.email ?? input.email,
      is_admin: input.isAdmin,
    });
    const staffProfile = await upsertLootStaffProfile(supabaseUrl, secretKey, {
      user_id: user.id,
      display_name: input.displayName,
      role: input.role,
      is_active: input.isActive,
    });

    return jsonResponse(200, {
      ...profile,
      staff_profile_id: staffProfile.id,
      role: staffProfile.role,
      is_active: staffProfile.is_active,
    });
  } catch (err) {
    return textResponse(
      err instanceof SyntaxError ? 400 : 500,
      err instanceof Error ? err.message : "Unable to create user."
    );
  }
};
