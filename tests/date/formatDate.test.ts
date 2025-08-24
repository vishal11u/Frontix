import { describe, it, expect } from "vitest";
import { formatDate } from "../../src/date/formatDate";

describe("formatDate", () => {
  it("should format dates with default format (DD/MM/YYYY)", () => {
    expect(formatDate("2025-01-15")).toBe("15/01/2025");
    expect(formatDate("2025-12-31")).toBe("31/12/2025");
    expect(formatDate("2025-06-05")).toBe("05/06/2025");
  });

  it("should format dates with custom formats", () => {
    expect(formatDate("2025-01-15", "MMMM D, YYYY")).toBe("January 15, 2025");
    expect(formatDate("2025-12-31", "MMM DD, YYYY")).toBe("Dec 31, 2025");
    expect(formatDate("2025-06-05", "YYYY-MM-DD")).toBe("2025-06-05");
    expect(formatDate("2025-01-15", "D MMMM YYYY")).toBe("15 January 2025");
  });

  it("should handle Date objects", () => {
    const date = new Date("2025-01-15T12:00:00Z");
    expect(formatDate(date)).toBe("15/01/2025");
    expect(formatDate(date, "MMMM D, YYYY")).toBe("January 15, 2025");
  });

  it("should handle different date string formats", () => {
    expect(formatDate("2025-01-15T12:00:00Z")).toBe("15/01/2025");
    expect(formatDate("2025/01/15")).toBe("15/01/2025");
    expect(formatDate("01-15-2025")).toBe("15/01/2025");
  });

  it("should handle edge cases", () => {
    expect(formatDate("")).toBe("");
    expect(formatDate("invalid-date")).toBe("");
  });

  it("should handle null and undefined gracefully", () => {
    expect(formatDate(null as any)).toBe("");
    expect(formatDate(undefined as any)).toBe("");
  });
});
