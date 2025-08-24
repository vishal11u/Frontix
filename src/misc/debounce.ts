/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified wait time has elapsed since the last time it was invoked.
 *
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced version of the provided function
 *
 * @example
 * ```typescript
 * const debouncedSearch = debounce((query) => {
 *   console.log("Searching for:", query);
 * }, 300);
 *
 * // Only the last call will execute after 300ms
 * debouncedSearch("a");
 * debouncedSearch("ab");
 * debouncedSearch("abc"); // Only this will execute
 * ```
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof globalThis.setTimeout> | undefined;

  return (...args: Parameters<T>): void => {
    if (timeout) {
      globalThis.clearTimeout(timeout);
    }
    timeout = globalThis.setTimeout(() => func(...args), wait);
  };
}
