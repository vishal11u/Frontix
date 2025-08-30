/**
 * Converts a date to a specific timezone.
 * Returns the date in the target timezone with proper formatting.
 *
 * @param date - The date to convert
 * @param timeZone - The target timezone (e.g., 'America/New_York', 'Europe/London')
 * @param options - Intl.DateTimeFormatOptions for formatting
 * @returns Formatted date string in the target timezone
 *
 * @example
 * ```typescript
 * toTimeZone(new Date(), 'America/New_York');           // "1/15/2024, 10:30:00 AM EST"
 * toTimeZone(new Date(), 'Europe/London', { 
 *   dateStyle: 'full' 
 * });                                                    // "Monday, January 15, 2024"
 * ```
 */
export function toTimeZone(
  date: Date | number,
  timeZone: string,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const targetDate = new Date(date);
  
  try {
    // Use Intl.DateTimeFormat for timezone conversion
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      ...options
    });
    
    return formatter.format(targetDate);
  } catch (error) {
    // Fallback if timezone is invalid
    console.warn(`Invalid timezone: ${timeZone}. Using local timezone.`);
    const fallbackFormatter = new Intl.DateTimeFormat('en-US', options);
    return fallbackFormatter.format(targetDate);
  }
}
