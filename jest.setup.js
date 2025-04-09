import "@testing-library/jest-dom";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ priority, ...props }) => {
    // Convert priority to string if it's a boolean
    const priorityProp =
      typeof priority === "boolean" ? priority.toString() : priority;
    return <img {...props} priority={priorityProp} />;
  },
}));

// Mock useVisibility hook
jest.mock("@/hooks/use-visibility", () => ({
  useVisibility: () => ({
    ref: { current: null },
    isVisible: true,
  }),
}));
