import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import List from "./list";

describe("List Component", () => {
  const mockItems = Array(3)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      title: `Item ${index + 1}`,
      images: {
        artwork_portrait: `https://test.com/image${index + 1}.jpg`,
      },
    }));

  const pressKeyAndWait = async (key: "ArrowRight" | "ArrowLeft") => {
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key }));
    });
    await waitFor(() => {
      expect(screen.getByTestId("list")).toHaveAttribute(
        "data-pending",
        "false"
      );
    });
  };

  const getFocusedItem = (title: string) => {
    return screen.getByText(title).closest('[data-focus="true"]');
  };

  it("renders list items correctly", () => {
    render(<List items={mockItems} />);

    mockItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it("handles keyboard navigation correctly", async () => {
    render(<List items={mockItems} />);

    // Initial state should have first item focused
    const firstItem = getFocusedItem("Item 1");
    expect(firstItem).toBeInTheDocument();

    // Press right arrow
    await pressKeyAndWait("ArrowRight");
    expect(getFocusedItem("Item 2")).toBeInTheDocument();

    // Press left arrow
    await pressKeyAndWait("ArrowLeft");
    expect(getFocusedItem("Item 1")).toBeInTheDocument();
  });

  it("does not navigate beyond list boundaries", async () => {
    render(<List items={mockItems} />);

    // Try to navigate left at the start
    await pressKeyAndWait("ArrowLeft");
    expect(getFocusedItem("Item 1")).toBeInTheDocument();

    // Navigate to the end
    mockItems.forEach(async () => {
      await pressKeyAndWait("ArrowRight");
    });
    expect(getFocusedItem("Item 3")).toBeInTheDocument();
  });

  it("applies correct transform style", async () => {
    render(<List items={mockItems} />);

    const list = screen.getByTestId("list");

    // Initial transform should be 0
    expect(list).toHaveStyle({ transform: "translate3d(-0px, 0, 0)" });

    // After right arrow press, transform should be -340px
    await pressKeyAndWait("ArrowRight");
    await waitFor(() => {
      expect(list).toHaveStyle({
        transform: "translate3d(-340px, 0, 0)",
      });
    });

    // After second right arrow press, transform should be -680px
    await pressKeyAndWait("ArrowRight");
    await waitFor(() => {
      expect(list).toHaveStyle({
        transform: "translate3d(-680px, 0, 0)",
      });
    });

    // After left arrow press, transform should be -340px again
    await pressKeyAndWait("ArrowLeft");
    await waitFor(() => {
      expect(list).toHaveStyle({
        transform: "translate3d(-340px, 0, 0)",
      });
    });
  });
});
