/**
 * Retries a failed async function with configurable retry attempts and delay.
 * Useful for handling network failures or temporary errors.
 *
 * @param fn - The async function to retry
 * @param retries - Maximum number of retry attempts (default: 3)
 * @param delay - Base delay between retries in milliseconds (default: 1000)
 * @returns Promise that resolves with the function result or rejects after all retries
 *
 * @example
 * ```typescript
 * const fetchData = retry(async () => {
 *   const response = await fetch('/api/data');
 *   if (!response.ok) throw new Error('Failed to fetch');
 *   return response.json();
 * }, 3, 2000);
 * ```
 */
export function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    const attempt = async () => {
      try {
        attempts++;
        const result = await fn();
        resolve(result);
      } catch (error) {
        if (attempts >= retries) {
          reject(error);
          return;
        }
        
        // Exponential backoff: delay * 2^(attempts-1)
        const backoffDelay = delay * Math.pow(2, attempts - 1);
        
        // Use setTimeout with a callback to ensure proper async behavior
        setTimeout(() => {
          attempt();
        }, backoffDelay);
      }
    };
    
    // Start the first attempt
    attempt();
  });
}
