import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AssetDialog from ".";

describe("AssetDialog", () => {
  it("submits edited quantity and the recalculated value", async () => {
    const user = userEvent.setup();
    const submitted = vi.fn();
    render(
      <AssetDialog
        open
        onOpenChange={vi.fn()}
        initialValues={{ id: "asset-1", name: "Index Fund", type: "stocks", abb: "ETF", quantity: 2, baseValue: 100, value: 200, isDeleted: false }}
        onSubmit={(event) => {
          event.preventDefault();
          submitted(Object.fromEntries(new FormData(event.currentTarget)));
        }}
      />,
    );

    const units = screen.getByLabelText("Units *");
    await user.clear(units);
    await user.type(units, "3");
    await user.type(screen.getByLabelText("Total Cost Basis"), "240");
    expect(screen.getByLabelText("Current Value (calculated)")).toHaveValue(300);
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(submitted).toHaveBeenCalledWith(expect.objectContaining({ name: "Index Fund", quantity: "3", value: "300.00", costBasis: "240" }));
  });
});
