/**
 * Truncates a string to a specified length with an optional custom suffix.
 *
 * @param str - The input string to truncate
 * @param length - The maximum length of the truncated string (excluding suffix)
 * @param suffix - The suffix to append when truncating (default: "...")
 * @returns The truncated string with suffix if truncated, or the original string if no truncation needed
 *
 * @example
 * ```typescript
 * truncate("Hello World", 5);        // "Hello..."
 * truncate("Short", 10);             // "Short"
 * truncate("Very Long Text", 7, "~"); // "Very Lo~"
 * ```
 */
export function truncate(
  str: string,
  length: number,
  suffix: string = "..."
): string {
  if (!str || typeof str !== "string") return "";
  if (length < 0) return str;

  return str.length > length ? str.slice(0, length) + suffix : str;
}
