import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

type EmployeeRole =
  | "buy_intake"
  | "staff"
  | "lead"
  | "card_supervisor"
  | "manager"
  | "owner"
  | "admin";

const employeeRoles = new Set<EmployeeRole>([
  "buy_intake",
  "staff",
  "lead",
  "card_supervisor",
  "manager",
  "owner",
  "admin",
]);

const readBody = (request: import("node:http").IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });

const jsonResponse = (
  response: import("node:http").ServerResponse,
  statusCode: number,
  body: unknown
) => {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(body));
};

const textResponse = (
  response: import("node:http").ServerResponse,
  statusCode: number,
  body: string
) => {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "text/plain");
  response.end(body);
};

const createReservationUserDevPlugin = (env: Record<string, string>): Plugin => {
  const supabaseUrl = (env.SUPABASE_URL || env.VITE_SUPABASE_URL || "").replace(
    /\/$/,
    ""
  );
  const publishableKey =
    env.SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY || "";
  const secretKey = env.SUPABASE_SECRET_KEY || "";

  return {
    name: "geekd-local-netlify-functions",
    configureServer(server) {
      server.middlewares.use(
        "/.netlify/functions/create-reservation-user",
        async (request, response) => {
          if (request.method !== "POST") {
            textResponse(response, 405, "Method not allowed");
            return;
          }

          if (!supabaseUrl || !publishableKey || !secretKey) {
            textResponse(
              response,
              500,
              "Local user creation requires SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, and SUPABASE_SECRET_KEY."
            );
            return;
          }

          try {
            const token = request.headers.authorization?.replace(
              /^Bearer\s+/i,
              ""
            );

            if (!token) {
              textResponse(response, 401, "Admin login is required.");
              return;
            }

            const parsed = JSON.parse(await readBody(request)) as {
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
            const isAdmin = Boolean(parsed.is_admin);
            const role =
              isAdmin || parsed.role === "admin"
                ? "admin"
                : employeeRoles.has(parsed.role as EmployeeRole)
                  ? (parsed.role as EmployeeRole)
                  : "staff";

            if (!email || !email.includes("@")) {
              throw new Error("Enter a valid email address.");
            }

            if (password.length < 8) {
              throw new Error("Password must be at least 8 characters.");
            }

            if (!displayName) {
              throw new Error("Name is required.");
            }

            const requesterResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
              headers: {
                apikey: publishableKey,
                Authorization: `Bearer ${token}`,
              },
            });

            if (!requesterResponse.ok) {
              throw new Error("Admin login could not be verified.");
            }

            const requester = (await requesterResponse.json()) as { id: string };
            const requesterProfileResponse = await fetch(
              `${supabaseUrl}/rest/v1/reservation_profiles?id=eq.${encodeURIComponent(
                requester.id
              )}&select=*`,
              {
                headers: {
                  apikey: secretKey,
                  Authorization: `Bearer ${secretKey}`,
                },
              }
            );

            if (!requesterProfileResponse.ok) {
              throw new Error("Unable to verify admin profile.");
            }

            const requesterProfiles =
              (await requesterProfileResponse.json()) as Array<{
                is_admin: boolean;
              }>;

            if (!requesterProfiles[0]?.is_admin) {
              throw new Error("Admin access is required to create users.");
            }

            const userResponse = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
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

            if (!userResponse.ok) {
              throw new Error(await userResponse.text());
            }

            const user = (await userResponse.json()) as {
              id: string;
              email?: string;
            };
            const profileResponse = await fetch(
              `${supabaseUrl}/rest/v1/reservation_profiles?on_conflict=id`,
              {
                method: "POST",
                headers: {
                  apikey: secretKey,
                  Authorization: `Bearer ${secretKey}`,
                  "Content-Type": "application/json",
                  Prefer: "resolution=merge-duplicates,return=representation",
                },
                body: JSON.stringify({
                  id: user.id,
                  display_name: displayName,
                  contact: user.email ?? email,
                  is_admin: isAdmin,
                }),
              }
            );

            if (!profileResponse.ok) {
              throw new Error(await profileResponse.text());
            }

            const staffResponse = await fetch(
              `${supabaseUrl}/rest/v1/loot_staff_profiles?on_conflict=user_id`,
              {
                method: "POST",
                headers: {
                  apikey: secretKey,
                  Authorization: `Bearer ${secretKey}`,
                  "Content-Type": "application/json",
                  Prefer: "resolution=merge-duplicates,return=representation",
                },
                body: JSON.stringify({
                  user_id: user.id,
                  display_name: displayName,
                  role,
                  is_active: parsed.is_active ?? true,
                }),
              }
            );

            if (!staffResponse.ok) {
              throw new Error(await staffResponse.text());
            }

            const profiles = (await profileResponse.json()) as Array<{
              id: string;
              display_name: string;
              contact: string | null;
              is_admin: boolean;
              created_at: string;
              updated_at: string;
            }>;
            const staffProfiles = (await staffResponse.json()) as Array<{
              id: string;
              role: EmployeeRole;
              is_active: boolean;
            }>;

            jsonResponse(response, 200, {
              ...profiles[0],
              staff_profile_id: staffProfiles[0]?.id ?? null,
              role: staffProfiles[0]?.role ?? role,
              is_active: staffProfiles[0]?.is_active ?? true,
            });
          } catch (error) {
            textResponse(
              response,
              error instanceof SyntaxError ? 400 : 500,
              error instanceof Error ? error.message : "Unable to create user."
            );
          }
        }
      );
    },
  };
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), createReservationUserDevPlugin(env)],
  };
});
