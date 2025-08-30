/**
 * Replaces null, undefined, or empty string values with a fallback value.
 * Useful for displaying "N/A" or "---" in UI components.
 *
 * @param value - The value to check
 * @param fallback - The fallback value to use if the original is null/undefined/empty
 * @returns The original value if valid, otherwise the fallback value
 *
 * @example
 * ```typescript
 * safeValue(null, "N/A");           // "N/A"
 * safeValue(undefined, "---");      // "---"
 * safeValue("", "Empty");           // "Empty"
 * safeValue("Hello", "World");      // "Hello"
 * safeValue(42, "N/A");            // 42
 * ```
 */
export function safeValue<T>(value: T, fallback: T): T {
  // Check if value is null, undefined, or empty string
  if (value === null || value === undefined) {
    return fallback;
  }
  
  // Check for empty string
  if (typeof value === 'string' && value.trim() === '') {
    return fallback;
  }
  
  return value;
}
