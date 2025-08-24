import { describe, it, expect } from "vitest";
import { toDropdown } from "../../src/array/toDropdown";

describe("toDropdown", () => {
  it("should convert string arrays to dropdown format", () => {
    const result = toDropdown(["Apple", "Banana", "Cherry"]);
    expect(result).toEqual([
      { label: "Apple", value: "Apple" },
      { label: "Banana", value: "Banana" },
      { label: "Cherry", value: "Cherry" },
    ]);
  });

  it("should convert number arrays to dropdown format", () => {
    const result = toDropdown([1, 2, 3, 4, 5]);
    expect(result).toEqual([
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 },
      { label: 5, value: 5 },
    ]);
  });

  it("should convert mixed type arrays to dropdown format", () => {
    const result = toDropdown(["Hello", 42, true, null]);
    expect(result).toEqual([
      { label: "Hello", value: "Hello" },
      { label: 42, value: 42 },
      { label: true, value: true },
      { label: null, value: null },
    ]);
  });

  it("should handle empty arrays", () => {
    const result = toDropdown([]);
    expect(result).toEqual([]);
  });

  it("should handle single element arrays", () => {
    const result = toDropdown(["Single"]);
    expect(result).toEqual([{ label: "Single", value: "Single" }]);
  });

  it("should handle arrays with duplicate values", () => {
    const result = toDropdown(["A", "A", "B", "A"]);
    expect(result).toEqual([
      { label: "A", value: "A" },
      { label: "A", value: "A" },
      { label: "B", value: "B" },
      { label: "A", value: "A" },
    ]);
  });

  it("should return empty array for non-array inputs", () => {
    expect(toDropdown(null as any)).toEqual([]);
    expect(toDropdown(undefined as any)).toEqual([]);
    expect(toDropdown("not an array" as any)).toEqual([]);
    expect(toDropdown(42 as any)).toEqual([]);
    expect(toDropdown({} as any)).toEqual([]);
  });
});
