import dayjs from "dayjs";

/**
 * Formats a date with custom format and locale support.
 *
 * @param date - The date to format (string, Date object, or dayjs object)
 * @param format - The format string (default: "DD/MM/YYYY")
 * @param locale - The locale for formatting (default: "en")
 * @returns Formatted date string
 *
 * @example
 * ```typescript
 * formatDate("2025-01-15");                    // "15/01/2025"
 * formatDate("2025-01-15", "MMMM D, YYYY");   // "January 15, 2025"
 * formatDate("2025-01-15", "DD/MM/YYYY", "fr"); // "15/01/2025"
 * ```
 */
export function formatDate(
  date: string | Date | dayjs.Dayjs,
  format: string = "DD/MM/YYYY",
  locale: string = "en"
): string {
  try {
    // Handle empty strings and null/undefined
    if (!date || (typeof date === "string" && date.trim() === "")) {
      return "";
    }

    const dayjsDate = dayjs(date);

    // Check if the date is valid
    if (!dayjsDate.isValid()) {
      return "";
    }

    return dayjsDate.locale(locale).format(format);
  } catch {
    console.warn("Invalid date provided to formatDate:", date);
    return "";
  }
}
