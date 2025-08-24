import { describe, it, expect } from "vitest";
import { toNumber, toString } from "../../src/number/convert";

describe("toNumber", () => {
  it("should convert valid string numbers to numbers", () => {
    expect(toNumber("42")).toBe(42);
    expect(toNumber("123.45")).toBe(123.45);
    expect(toNumber("0")).toBe(0);
    expect(toNumber("-10")).toBe(-10);
  });

  it("should return the same number for number inputs", () => {
    expect(toNumber(42)).toBe(42);
    expect(toNumber(123.45)).toBe(123.45);
    expect(toNumber(0)).toBe(0);
    expect(toNumber(-10)).toBe(-10);
  });

  it("should return 0 for invalid string numbers", () => {
    expect(toNumber("abc")).toBe(0);
    expect(toNumber("12abc")).toBe(0);
    expect(toNumber("")).toBe(0);
    expect(toNumber(" ")).toBe(0);
  });

  it("should return 0 for null and undefined", () => {
    expect(toNumber(null)).toBe(0);
    expect(toNumber(undefined)).toBe(0);
  });

  it("should return 0 for other types", () => {
    expect(toNumber({})).toBe(0);
    expect(toNumber([])).toBe(0);
    expect(toNumber(true)).toBe(0);
    expect(toNumber(false)).toBe(0);
  });
});

describe("toString", () => {
  it("should convert numbers to strings", () => {
    expect(toString(42)).toBe("42");
    expect(toString(123.45)).toBe("123.45");
    expect(toString(0)).toBe("0");
    expect(toString(-10)).toBe("-10");
  });

  it("should return the same string for string inputs", () => {
    expect(toString("hello")).toBe("hello");
    expect(toString("")).toBe("");
    expect(toString("123")).toBe("123");
  });

  it("should return empty string for null and undefined", () => {
    expect(toString(null)).toBe("");
    expect(toString(undefined)).toBe("");
  });

  it("should convert other types to strings", () => {
    expect(toString({})).toBe("[object Object]");
    expect(toString([])).toBe("");
    expect(toString(true)).toBe("true");
    expect(toString(false)).toBe("false");
  });
});
