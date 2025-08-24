/**
 * Safely converts a value to a number with fallback to 0.
 *
 * @param value - The value to convert (string, number, or any other type)
 * @returns A number, or 0 if the conversion fails
 *
 * @example
 * ```typescript
 * toNumber("42");     // 42
 * toNumber("abc");    // 0
 * toNumber(123);      // 123
 * toNumber(null);     // 0
 * toNumber(undefined); // 0
 * ```
 */
export function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

/**
 * Safely converts a value to a string with fallback to empty string.
 *
 * @param value - The value to convert (string, number, or any other type)
 * @returns A string representation of the value, or empty string if null/undefined
 *
 * @example
 * ```typescript
 * toString(42);       // "42"
 * toString("hello");  // "hello"
 * toString(null);     // ""
 * toString(undefined); // ""
 * ```
 */
export function toString(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value);
}
