/**
 * Throttles function calls to a maximum frequency.
 * Ensures the function is called at most once per specified time interval.
 *
 * @param fn - The function to throttle
 * @param ms - Minimum time interval between function calls in milliseconds
 * @returns A throttled version of the function
 *
 * @example
 * ```typescript
 * const throttledScroll = throttle(() => {
 *   console.log('Scroll event throttled');
 * }, 100);
 * 
 * window.addEventListener('scroll', throttledScroll);
 * ```
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    
    if (now - lastCall >= ms) {
      // Enough time has passed, execute immediately
      lastCall = now;
      fn(...args);
    } else {
      // Schedule execution for later
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        fn(...args);
        timeoutId = null;
      }, ms - (now - lastCall));
    }
  };
}
