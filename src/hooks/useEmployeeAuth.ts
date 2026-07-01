import { useCallback, useEffect, useState } from "react";

import {
  fetchReservationProfile,
  isReservationsConfigured,
  refreshReservationsSession,
  sendReservationsPasswordReset,
  setReservationsAccessToken,
  signInReservationsUser,
  signOutReservationsUser,
  type ReservationAuthSession,
  type ReservationProfileRecord,
  updateReservationsPassword,
  upsertReservationProfile,
  verifyReservationsPassword,
} from "../pages/reservationSupabase";

export const EMPLOYEE_AUTH_SESSION_KEY = "geekd.reservations.authSession";

const readStoredSession = () => {
  const stored = window.localStorage.getItem(EMPLOYEE_AUTH_SESSION_KEY);

  if (!stored) return null;

  try {
    return JSON.parse(stored) as ReservationAuthSession;
  } catch {
    window.localStorage.removeItem(EMPLOYEE_AUTH_SESSION_KEY);
    return null;
  }
};

export const useEmployeeAuth = () => {
  const [authSession, setAuthSession] =
    useState<ReservationAuthSession | null>(null);
  const [profile, setProfile] = useState<ReservationProfileRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const persistSession = useCallback((session: ReservationAuthSession | null) => {
    setAuthSession(session);

    if (session) {
      setReservationsAccessToken(session.access_token);
      window.localStorage.setItem(
        EMPLOYEE_AUTH_SESSION_KEY,
        JSON.stringify(session)
      );
    } else {
      setReservationsAccessToken("");
      window.localStorage.removeItem(EMPLOYEE_AUTH_SESSION_KEY);
      setProfile(null);
    }
  }, []);

  const loadProfile = useCallback(async (session: ReservationAuthSession) => {
    const profileRow = await fetchReservationProfile(session.user.id);
    setProfile(profileRow);
    return profileRow;
  }, []);

  useEffect(() => {
    let mounted = true;

    const boot = async () => {
      if (!isReservationsConfigured) {
        setLoading(false);
        return;
      }

      const storedSession = readStoredSession();

      if (!storedSession) {
        setLoading(false);
        return;
      }

      try {
        const now = Math.floor(Date.now() / 1000);
        const session =
          storedSession.expires_at <= now + 60
            ? await refreshReservationsSession(storedSession.refresh_token)
            : storedSession;

        if (!mounted) return;

        persistSession(session);
        await loadProfile(session);
      } catch (err) {
        if (!mounted) return;

        persistSession(null);
        setError(
          err instanceof Error ? err.message : "Unable to restore your session."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    boot();

    return () => {
      mounted = false;
    };
  }, [loadProfile, persistSession]);

  const login = async (email: string, password: string) => {
    setAuthLoading(true);
    setError("");
    setMessage("");

    try {
      const session = await signInReservationsUser(email.trim(), password);
      persistSession(session);
      await loadProfile(session);
      setMessage("Logged in.");
      return session;
    } catch (err) {
      const nextError = err instanceof Error ? err.message : "Unable to log in.";
      setError(nextError);
      throw new Error(nextError);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    const accessToken = authSession?.access_token;
    setAuthLoading(true);
    setError("");
    setMessage("");

    try {
      if (accessToken) {
        await signOutReservationsUser(accessToken);
      }
    } finally {
      persistSession(null);
      setAuthLoading(false);
    }
  };

  const saveProfile = async (displayName: string, contact: string) => {
    if (!authSession) {
      throw new Error("Log in before saving your profile.");
    }

    setAuthLoading(true);
    setError("");
    setMessage("");

    try {
      const savedProfile = await upsertReservationProfile({
        id: authSession.user.id,
        display_name: displayName.trim(),
        contact: contact.trim() || null,
      });
      setProfile(savedProfile);
      setMessage("Profile saved.");
      return savedProfile;
    } catch (err) {
      const nextError =
        err instanceof Error ? err.message : "Unable to save profile.";
      setError(nextError);
      throw new Error(nextError);
    } finally {
      setAuthLoading(false);
    }
  };

  const changePassword = async (
    currentPassword: string,
    password: string,
    confirmPassword: string
  ) => {
    if (!authSession) {
      throw new Error("Log in before changing your password.");
    }

    if (!authSession.user.email) {
      throw new Error("Your account email is required to change your password.");
    }

    if (!currentPassword) {
      throw new Error("Enter your current password first.");
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    setAuthLoading(true);
    setError("");
    setMessage("");

    try {
      await verifyReservationsPassword(authSession.user.email, currentPassword);
      const user = await updateReservationsPassword(
        authSession.access_token,
        password
      );
      persistSession({ ...authSession, user });
      setMessage("Password changed.");
    } catch (err) {
      const nextError =
        err instanceof Error ? err.message : "Unable to change password.";
      setError(nextError);
      throw new Error(nextError);
    } finally {
      setAuthLoading(false);
    }
  };

  const requestPasswordReset = async (email: string) => {
    if (!email.trim()) {
      const nextError = "Enter your email first, then request a reset link.";
      setError(nextError);
      throw new Error(nextError);
    }

    setAuthLoading(true);
    setError("");
    setMessage("");

    try {
      await sendReservationsPasswordReset(
        email.trim(),
        `${window.location.origin}${window.location.pathname}${window.location.search}`
      );
      setMessage("Password reset link sent. Check your email.");
    } catch (err) {
      const nextError =
        err instanceof Error
          ? err.message
          : "Unable to send password reset link.";
      setError(nextError);
      throw new Error(nextError);
    } finally {
      setAuthLoading(false);
    }
  };

  return {
    authSession,
    profile,
    loading,
    authLoading,
    error,
    message,
    isConfigured: isReservationsConfigured,
    setError,
    setMessage,
    login,
    logout,
    saveProfile,
    changePassword,
    requestPasswordReset,
  };
};
