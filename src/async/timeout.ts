/**
 * Executes a function with a timeout. If the function doesn't complete within
 * the specified time, it rejects with a timeout error.
 *
 * @param fn - The async function to execute
 * @param ms - Timeout in milliseconds
 * @returns Promise that resolves with the function result or rejects on timeout
 *
 * @example
 * ```typescript
 * const result = await timeout(
 *   async () => await fetch('/api/slow-endpoint'),
 *   5000
 * );
 * ```
 */
export function timeout<T>(
  fn: () => Promise<T>,
  ms: number
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Operation timed out after ${ms}ms`));
    }, ms);
    
    fn()
      .then((result) => {
        clearTimeout(timer);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}
