import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import LootCustomerPortalPage from "./LootCustomerPortalPage";

const navigate = vi.fn();
const login = vi.fn();
const requestPasswordReset = vi.fn();
const setError = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigate,
}));

vi.mock("../hooks/useEmployeeAuth", () => ({
  useEmployeeAuth: () => ({
    authSession: null,
    authLoading: false,
    error: "",
    message: "",
    isConfigured: true,
    setError,
    login,
    requestPasswordReset,
  }),
}));

describe("LootCustomerPortalPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("keeps employee login collapsed by default", () => {
    render(<LootCustomerPortalPage />);

    expect(
      screen.getByRole("heading", { name: "Geek'd Customer Portal" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /employee login/i })
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(/employee email/i)).not.toBeInTheDocument();
  });

  it("expands the compact employee login when requested", async () => {
    const user = userEvent.setup();

    render(<LootCustomerPortalPage />);
    await user.click(screen.getByRole("button", { name: /employee login/i }));

    expect(screen.getByLabelText(/employee email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("requires employee credentials before login", async () => {
    const user = userEvent.setup();

    render(<LootCustomerPortalPage />);
    await user.click(screen.getByRole("button", { name: /employee login/i }));
    await user.click(screen.getByRole("button", { name: /^log in$/i }));

    expect(setError).toHaveBeenCalledWith("Enter your email and password.");
    expect(login).not.toHaveBeenCalled();
  });
});
