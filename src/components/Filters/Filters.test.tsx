import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Filters from ".";

describe("Filters", () => {
  it("exposes the active type and sends filter changes", async () => {
    const user = userEvent.setup();
    const onToggleType = vi.fn();
    render(<Filters showDeleted={false} onToggleDeleted={vi.fn()} selectedTypes={["stocks"]} onToggleType={onToggleType} />);

    expect(screen.getByRole("button", { name: "Stocks" })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "Crypto" }));
    expect(onToggleType).toHaveBeenCalledWith("crypto");
  });
});
