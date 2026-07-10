import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import LootLegacyRedirectPage from "./LootLegacyRedirectPage";

const navigate = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigate,
}));

describe("LootLegacyRedirectPage", () => {
  beforeEach(() => {
    navigate.mockClear();
  });

  it("redirects old loot tracker routes to the toolkit dashboard", async () => {
    render(<LootLegacyRedirectPage />);

    expect(screen.getByText(/redirecting to loot dashboard/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith({
        to: "/loot-tracker",
        replace: true,
      });
    });
  });
});
