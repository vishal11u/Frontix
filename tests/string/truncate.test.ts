import { describe, it, expect } from "vitest";
import { truncate } from "../../src/string/truncate";

describe("truncate", () => {
  it("should truncate a string longer than the specified length", () => {
    expect(truncate("Hello World", 5)).toBe("Hello...");
    expect(truncate("Very Long Text", 7)).toBe("Very Lo...");
    expect(truncate("JavaScript is awesome", 10)).toBe("JavaScript...");
  });

  it("should not truncate a string shorter than the specified length", () => {
    expect(truncate("Short", 10)).toBe("Short");
    expect(truncate("", 5)).toBe("");
    expect(truncate("Hi", 2)).toBe("Hi");
  });

  it("should use custom suffix when provided", () => {
    expect(truncate("Hello World", 5, "~")).toBe("Hello~");
    expect(truncate("Long Text", 4, "***")).toBe("Long***");
    expect(truncate("Test", 3, "@")).toBe("Tes@");
  });

  it("should handle edge cases", () => {
    expect(truncate("", 5)).toBe("");
    expect(truncate("", 0)).toBe("");
    expect(truncate("Hello", 0)).toBe("...");
    expect(truncate("Hello", -1)).toBe("Hello");
  });

  it("should handle non-string inputs", () => {
    expect(truncate(null as any, 5)).toBe("");
    expect(truncate(undefined as any, 5)).toBe("");
    expect(truncate(123 as any, 5)).toBe("");
  });

  it("should handle exact length matches", () => {
    expect(truncate("Hello", 5)).toBe("Hello");
    expect(truncate("Test", 4)).toBe("Test");
  });
});
