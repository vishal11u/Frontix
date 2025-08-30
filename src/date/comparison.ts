/**
 * Date comparison utility functions for common date checks.
 * Provides easy ways to check if dates fall within specific time periods.
 */

/**
 * Checks if a date is today.
 *
 * @param date - The date to check
 * @returns true if the date is today, false otherwise
 *
 * @example
 * ```typescript
 * isToday(new Date());                    // true
 * isToday(new Date('2023-01-01'));       // false
 * ```
 */
export function isToday(date: Date | number): boolean {
  const targetDate = new Date(date);
  const today = new Date();
  
  return (
    targetDate.getDate() === today.getDate() &&
    targetDate.getMonth() === today.getMonth() &&
    targetDate.getFullYear() === today.getFullYear()
  );
}

/**
 * Checks if a date is yesterday.
 *
 * @param date - The date to check
 * @returns true if the date is yesterday, false otherwise
 *
 * @example
 * ```typescript
 * const yesterday = new Date();
 * yesterday.setDate(yesterday.getDate() - 1);
 * isYesterday(yesterday);                 // true
 * ```
 */
export function isYesterday(date: Date | number): boolean {
  const targetDate = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  return (
    targetDate.getDate() === yesterday.getDate() &&
    targetDate.getMonth() === yesterday.getMonth() &&
    targetDate.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * Checks if a date is within the current week.
 *
 * @param date - The date to check
 * @returns true if the date is within the current week, false otherwise
 *
 * @example
 * ```typescript
 * isThisWeek(new Date());                 // true
 * isThisWeek(new Date('2023-01-01'));    // false
 * ```
 */
export function isThisWeek(date: Date | number): boolean {
  const targetDate = new Date(date);
  const today = new Date();
  
  // Get start of current week (Sunday = 0, Monday = 1, etc.)
  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
  startOfWeek.setDate(today.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);
  
  // Get end of current week (Saturday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  // Ensure targetDate is within the week boundaries
  return targetDate >= startOfWeek && targetDate <= endOfWeek;
}

/**
 * Checks if a date is within the current month.
 *
 * @param date - The date to check
 * @returns true if the date is within the current month, false otherwise
 *
 * @example
 * ```typescript
 * isThisMonth(new Date());                // true
 * isThisMonth(new Date('2023-01-01'));   // false
 * ```
 */
export function isThisMonth(date: Date | number): boolean {
  const targetDate = new Date(date);
  const today = new Date();
  
  return (
    targetDate.getMonth() === today.getMonth() &&
    targetDate.getFullYear() === today.getFullYear()
  );
}

/**
 * Checks if a date is within the current year.
 *
 * @param date - The date to check
 * @returns true if the date is within the current year, false otherwise
 *
 * @example
 * ```typescript
 * isThisYear(new Date());                 // true
 * isThisYear(new Date('2023-01-01'));    // false
 * ```
 */
export function isThisYear(date: Date | number): boolean {
  const targetDate = new Date(date);
  const today = new Date();
  
  return targetDate.getFullYear() === today.getFullYear();
}
